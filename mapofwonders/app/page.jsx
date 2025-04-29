import DestinationCard from '../components/DestinationCard';

export default function Home() {
  const destinations = [
    {
      title: 'Himalayas',
      image: '/destinations/himalayas.jpg',
      description: 'Majestic mountain ranges and pristine landscapes'
    },
    {
      title: 'Jaipur',
      image: '/destinations/jaipur.jpg',
      description: 'The pink city with royal heritage and architecture'
    },
    {
      title: 'Varanasi',
      image: '/destinations/varanasi.jpg',
      description: 'The spiritual capital of India'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <DestinationCard
            key={dest.title}
            title={dest.title}
            image={dest.image}
            description={dest.description}
          />
        ))}
      </div>
    </div>
  );
}