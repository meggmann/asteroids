import { AsteroidsList } from "./components/asteroids-list";
import { getAsteroids } from "./lib/asteroids-api";

type SearchParams = { [key: string]: string | undefined };

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { startDate, endDate, sortBy, sortOrder } = await searchParams;

  const asteroids = await getAsteroids({
    startDate,
    endDate,
    sortBy,
    sortOrder,
  });

  if (!asteroids) {
    return <div className="h-[100svh] w-100 flex items-center justify-center text-2xl">Error occurred</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Asteroids ☄️</h1>

        {!asteroids.length ? (
          <p className="text-lg text-gray-500">No asteroids found or error occurred</p>
        ) : null}

        <AsteroidsList
          initialAsteroids={asteroids}
          initialStartDate={startDate}
          initialEndDate={endDate}
          initialSortBy={sortBy}
          initialSortOrder={sortOrder}
        />
      </div>
    </div>
  );
}
