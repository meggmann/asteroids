import { AsteroidsFavourites } from "../components/asteroids-favourites";

export default async function Favourites() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Your Favourite Asteroids ☄️</h1>

        <AsteroidsFavourites />
      </div>
    </div>
  );
}
