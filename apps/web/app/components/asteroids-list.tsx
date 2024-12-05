"use client";

import { IAsteroid } from "@asteroids/shared/schemas";
import { Asteroid } from "./asteroid";
import { useAsteroids } from "../hooks/use-asteroids";
import withRedux from "../lib/redux-provider";
import DateRangePicker from "./date-range-picker";
import { useMemo } from "react";
import debounce from "lodash/debounce";
import { SortingSelector } from "./sorting-selector";
import { AsteroidSkeleton } from "./asteroid-skeleton";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";

interface AsteroidsListProps {
  initialAsteroids: IAsteroid[];
  initialStartDate: string | undefined;
  initialEndDate: string | undefined;
  initialSortBy: string | undefined;
  initialSortOrder: "asc" | "desc" | undefined;
}

const sortingOptions = [
  {
    label: "Name",
    value: "name",
  },
];

export const AsteroidsList = withRedux(
  ({
    initialAsteroids,
    initialStartDate,
    initialEndDate,
    initialSortBy,
    initialSortOrder,
  }: AsteroidsListProps) => {
    const {
      asteroids,
      isLoading,
      isFetching,
      isError,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      setSortBy,
      sortBy,
      sortOrder,
      setSortOrder,
      refetchAsteroids,
      clearQuery,
    } = useAsteroids({
      initialAsteroids,
      initialStartDate,
      initialEndDate,
      initialSortBy,
      initialSortOrder,
    });

    const debouncedSetStartDate = useMemo(
      () =>
        debounce((date) => {
          setStartDate(date);

          refetchAsteroids();
        }, 50),
      [setStartDate, refetchAsteroids]
    );
    const debouncedSetEndDate = useMemo(
      () =>
        debounce((date) => {
          setEndDate(date);

          refetchAsteroids();
        }, 50),
      [setEndDate, refetchAsteroids]
    );

    const handleSortByChange = (by: string | undefined) => {
      setSortBy(by);

      refetchAsteroids();
    };

    const handleSortOrderChange = (order: "asc" | "desc" | undefined) => {
      setSortOrder(order);

      refetchAsteroids();
    };

    const asteroidsIds = useSelector(
      (state: RootState) => state.asteroids.asteroidsIds
    );


    return (
      <div>
        <div className="flex gap-2 items-end mb-4">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={debouncedSetStartDate}
            onEndDateChange={debouncedSetEndDate}
          />
          <SortingSelector
            onSetSortBy={handleSortByChange}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSetSortOrder={handleSortOrderChange}
            sortingOptions={sortingOptions}
          />
          <button onClick={clearQuery} className="h-[42] px-4 inline-flex items-center py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
            Clear Query
          </button>
          <Link
            href={`/favourites`}
            className="h-[42] px-4 inline-flex items-center py-2 bg-green-500 text-white rounded hover:bg-blue-600"
          >
            Go to your saved asteroids
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading || isFetching
            ? Array.from({ length: 6 }).map((_, index) => (
                <AsteroidSkeleton key={index} />
              ))
            : null}

          {isError && <div className="text-center">Error fetching data</div>}

          {!isLoading && !isFetching && !isError && asteroids.length > 0
            ? asteroids.map((asteroid) => (
                <Asteroid
                  key={asteroid.id}
                  asteroid={asteroid}
                  isSaved={asteroidsIds.includes(asteroid.id)}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
);
