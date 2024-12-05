"use client";

import { Asteroid } from "./asteroid";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import withRedux from "../lib/redux-provider";

export const AsteroidsFavourites = withRedux(() => {
  const asteroidsIds = useSelector(
    (state: RootState) => state.asteroids.asteroidsIds
  );

  const asteroids = useSelector(
    (state: RootState) => state.asteroids.asteroids
  );

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Link
          href={`/`}
          className="h-[42] px-4 inline-flex items-center py-2 bg-green-500 text-white rounded hover:bg-blue-600"
        >
          Home
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {asteroids.length === 0 ? (
          <div className="text-center mt-16 text-gray-500">
            You have no favourite asteroids yet
          </div>
        ) : null}
        {asteroids.map((asteroid) => (
          <Asteroid
            key={asteroid.id}
            asteroid={asteroid}
            isSaved={asteroidsIds.includes(asteroid.id)}
          />
        ))}
      </div>
    </div>
  );
});
