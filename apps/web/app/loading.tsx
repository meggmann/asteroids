import { AsteroidSkeleton } from "./components/asteroid-skeleton";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Asteroids ☄️</h1>

        <div>
          <div className="flex gap-2 mb-4 h-[68]">
            <div className="bg-white w-32 p-4 rounded shadow animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
            </div>
            <div className="bg-white w-32 p-4 rounded shadow animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <AsteroidSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
