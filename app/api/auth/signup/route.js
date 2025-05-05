// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Make sure you have a JWT_SECRET defined either in .env or here (for development only)
const JWT_SECRET = process.env.JWT_SECRET || 'temporary_development_secret';

export async function POST(request) {
  try {
    const { firstName, lastName, email, password } = await request.json();
    
    // Input validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ 
        error: 'All fields are required' 
      }, { status: 400 });
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ 
      where: { email } 
    });
    
    if (existingUser) {
      return NextResponse.json({ 
        error: 'User already exists' 
      }, { status: 409 });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword
      }
    });
    
    // Generate JWT token with fallback secret for development
    const token = jwt.sign(
      { 
        userId: newUser.id,
        email: newUser.email 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Record signup activity
    await prisma.activity.create({
      data: {
        userId: newUser.id,
        action: 'signup',
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    });
    
    // Return success with token and user info
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      }
    });
    
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}