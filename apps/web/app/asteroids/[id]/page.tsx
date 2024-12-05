import { getAsteroid } from "../../lib/asteroids-api";
import { notFound } from "next/navigation";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { AsteroidSvg } from "../../components/asteroid-svg";

export default async function Asteroid(context: GetServerSidePropsContext) {
  const { id } = await context.params!;

  const asteroid = await getAsteroid(id as string);

  if (!asteroid) {
    return notFound();
  }

  const closeApproachData =
    asteroid.close_approach_data[asteroid.close_approach_data.length - 1];

  const closeApproachDate = closeApproachData?.close_approach_date;
  const distanceToEarth = closeApproachData?.miss_distance.astronomical;
  const speedPerSecond =
    closeApproachData?.relative_velocity.kilometers_per_second;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href={`/`}
          className="mt-4 mb-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600"
        >
          Home
        </Link>

        <h1 className="text-4xl font-bold mb-6">{asteroid.name} ☄️</h1>
        <div>
          <AsteroidSvg
            diameter={
              asteroid.estimated_diameter.kilometers.estimated_diameter_max
            }
            speed={speedPerSecond}
          />
        </div>
        <p>
          <strong>Estimated Diameter:</strong>{" "}
          {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
            2
          )}{" "}
          km -{" "}
          {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
            2
          )}{" "}
          km
        </p>

        {speedPerSecond ? (
          <p>
            <strong>Speed:</strong> {parseFloat(speedPerSecond).toFixed(2)} km/s
          </p>
        ) : null}

        {distanceToEarth ? (
          <p>
            <strong>Distance:</strong> {parseFloat(distanceToEarth).toFixed(2)}{" "}
            astro. units
          </p>
        ) : null}

        <div className="text-lg mt-2">
          <p>{closeApproachDate}</p>
        </div>

        <a
          className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          target="_blank"
          href={asteroid.nasa_jpl_url}
        >
          View Details on NASA 🚀
        </a>
      </div>
    </div>
  );
}
