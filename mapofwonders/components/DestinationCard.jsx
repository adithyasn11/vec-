import Image from 'next/image';

export default function DestinationCard({ title, image, description }) {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      <div className="relative w-full h-64">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2">{description}</p>
      </div>
    </div>
  );
}