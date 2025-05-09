// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { cookies } from 'next/headers';

// Create a single prisma instance to be reused across requests
const prisma = new PrismaClient();

// Optional: Simple in-memory rate limiting (consider using a proper rate limiting library in production)
const loginAttempts = {};
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

export async function POST(request) {
  try {
    const { email, password, rememberMe } = await request.json();
    
    // Input validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Get client IP for rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || request.ip || 'unknown';
    
    // Check rate limiting
    if (loginAttempts[clientIp]) {
      const { count, timestamp } = loginAttempts[clientIp];
      const now = Date.now();
      
      // If locked and time hasn't expired
      if (count >= MAX_LOGIN_ATTEMPTS && now - timestamp < LOCK_TIME) {
        const minutesLeft = Math.ceil((LOCK_TIME - (now - timestamp)) / (60 * 1000));
        return NextResponse.json(
          { error: `Too many failed attempts. Please try again in ${minutesLeft} minutes` }, 
          { status: 429 }
        );
      }
      
      // Reset if lock time expired
      if (now - timestamp >= LOCK_TIME) {
        loginAttempts[clientIp] = { count: 0, timestamp: now };
      }
    } else {
      // Initialize attempt tracking for this IP
      loginAttempts[clientIp] = { count: 0, timestamp: Date.now() };
    }
    
    // Find user by email (case insensitive)
    const user = await prisma.user.findFirst({ 
      where: { 
        email: { equals: email, mode: 'insensitive' } 
      }
    });
    
    // Check if user exists and verify password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Increment failed attempts
      loginAttempts[clientIp].count += 1;
      loginAttempts[clientIp].timestamp = Date.now();
      
      // Record failed login attempt
      if (user) {
        await prisma.activity.create({
          data: {
            userId: user.id,
            action: 'login',
            details: JSON.stringify({ status: 'FAILED', reason: 'Invalid password' }),
            ipAddress: clientIp,
            userAgent: request.headers.get('user-agent') || 'unknown'
          }
        });
      }
      
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    // Update remember me setting
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        rememberMe,
        updatedAt: new Date() // Explicitly update the timestamp
      }
    });
    
    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        // Add a unique session identifier
        sessionId: crypto.randomUUID()
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: rememberMe ? '30d' : '24h',
        algorithm: 'HS256'
      }
    );
    
    // Record login activity
    await prisma.activity.create({
      data: {
        userId: user.id,
        action: 'login',
        details: JSON.stringify({ status: 'SUCCESS' }),
        ipAddress: clientIp,
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    });
    
    // Reset failed login attempts on successful login
    if (loginAttempts[clientIp]) {
      loginAttempts[clientIp].count = 0;
    }
    
    // Create response with token and set cookie
    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
    
    // Set the JWT token as an HTTP-only cookie
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 24 hours in seconds
      path: '/',
    });
    
    // Also set a non-HTTP-only cookie for client-side access if needed
    response.cookies.set({
      name: 'auth-status',
      value: 'authenticated',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
      path: '/',
    });
    
    // Add security headers
    response.headers.set('Content-Type', 'application/json');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    
    return response;
    
  } catch (error) {
    console.error('Login error:', error.message);
    
    // Log the full error internally but return a generic message
    return NextResponse.json({ 
      error: 'An error occurred during login. Please try again later.' 
    }, { status: 500 });
  } finally {
    // No need to disconnect for Next.js API routes as the connection is reused
    // Only disconnect if you're creating a new PrismaClient instance per request
    // await prisma.$disconnect();
  }
}