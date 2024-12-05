"use client";

import { IAsteroid } from "@asteroids/shared/schemas";
import Link from "next/link";
import { AsteroidSvg } from "./asteroid-svg";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { removeAsteroid, saveAsteroid } from "../lib/asteroids-slice";

interface AsteroidProps {
  asteroid: IAsteroid;
  isSaved: boolean;
}

export const Asteroid = ({ asteroid, isSaved }: AsteroidProps) => {
  const closeApproachData =
    asteroid.close_approach_data[asteroid.close_approach_data.length - 1];

  const closeApproachDate = closeApproachData?.close_approach_date;
  const distanceToEarth = closeApproachData?.miss_distance.astronomical;
  const speedPerSecond = parseFloat(
    closeApproachData?.relative_velocity.kilometers_per_second ?? ""
  );

  const dispatch = useDispatch();

  const save = useCallback(() => {
    dispatch(saveAsteroid(asteroid));
  }, [asteroid, dispatch]);

  const remove = useCallback(() => {
    dispatch(removeAsteroid(asteroid.id));
  }, [asteroid]);

  return (
    <div className="relative">
      <Link
        href={`/asteroids/${asteroid.id}`}
        className="bg-white p-4 rounded shadow block"
      >
        <h2 className="text-xl font-bold mb-2">{asteroid.name}</h2>
        <div className="flex justify-center items-center h-[240] hover:animate-shake">
          <AsteroidSvg
            diameter={
              asteroid.estimated_diameter.kilometers.estimated_diameter_max
            }
            speed={speedPerSecond}
          />
        </div>

        <p>
          <strong>Clost Approach Date:</strong> {closeApproachDate}
        </p>

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
            <strong>Speed:</strong> {speedPerSecond.toFixed(2)} km/s
          </p>
        ) : null}

        {distanceToEarth ? (
          <p>
            <strong>Distance:</strong> {parseFloat(distanceToEarth).toFixed(2)}{" "}
            astro. units
          </p>
        ) : null}

        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          View Details
        </button>
      </Link>

      <button
        onClick={isSaved ? remove : save}
        className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white p-2 px-4 py-2 shadow"
      >
        {isSaved ? "Unsave" : "Save"}
      </button>
    </div>
  );
};
