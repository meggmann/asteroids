"use client"

import { useCallback, useState } from "react";
import { useGetAsteroidsQuery } from "../lib/asteroids-api";
import { IAsteroid } from "@asteroids/shared/schemas";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface IUseAsteroids {
  initialAsteroids: IAsteroid[];
  initialStartDate: string | undefined;
  initialEndDate: string | undefined;
  initialSortBy: string | undefined;
  initialSortOrder: "asc" | "desc" | undefined;
}

export const useAsteroids = ({
  initialAsteroids,
  initialStartDate,
  initialEndDate,
  initialSortBy,
  initialSortOrder,
}: IUseAsteroids) => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    initialStartDate ? new Date(Number(initialStartDate)) : new Date()
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    initialEndDate ? new Date(Number(initialEndDate)) : new Date()
  );
  const [sortBy, setSortBy] = useState<string | undefined>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    initialSortOrder
  );
  const [skip, setSkip] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const removeQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);

      return params.toString();
    },
    [searchParams]
  );

  const {
    data: asteroids = initialAsteroids,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAsteroidsQuery(
    {
      startDate: startDate?.getTime(),
      endDate: endDate?.getTime(),
      sortBy,
      sortOrder,
    },
    {
      skip,
    }
  );

  const refetchAsteroids = () => {
    if (skip) {
      setSkip(false);

      return;
    }

    refetch();
  };

  const setStartDateAndUpdateUrl = (date: Date) => {
    setStartDate(date);

    if (startDate) {
      router.push(
        `${pathname}?${createQueryString("startDate", String(date.getTime()))}`
      );
      return;
    }
    router.push(`${pathname}?${removeQueryString("startDate")}`);
  };

  const setEndDateAndUpdateUrl = (date: Date) => {
    setEndDate(date);

    if (endDate) {
      router.push(
        `${pathname}?${createQueryString("endDate", String(date.getTime()))}`
      );
      return;
    }

    router.push(`${pathname}?${removeQueryString("endDate")}`);
  };

  const setSortByAndUpdateUrl = (by: string | undefined) => {
    setSortBy(by);

    if (by) {
      router.push(`${pathname}?${createQueryString("sortBy", by)}`);
      return;
    }

    router.push(`${pathname}?${removeQueryString("sortBy")}`);
  };

  const setSortOrderAndUpdateUrl = (order: "asc" | "desc" | undefined) => {
    setSortOrder(order);

    if (order) {
      router.push(`${pathname}?${createQueryString("sortOrder", order)}`);
      return;
    }
    router.push(`${pathname}?${removeQueryString("sortOrder")}`);
  };

  const clearQuery = () => {
    setEndDate(undefined);
    setStartDate(undefined);
    setSortBy(undefined);
    setSortOrder(undefined);

    router.push(`${pathname}`);
  }

  return {
    asteroids,
    isLoading,
    isFetching,
    isError,
    setStartDate: setStartDateAndUpdateUrl,
    startDate,
    setEndDate: setEndDateAndUpdateUrl,
    endDate,
    setSortBy: setSortByAndUpdateUrl,
    sortBy,
    setSortOrder: setSortOrderAndUpdateUrl,
    sortOrder,
    refetchAsteroids,
    clearQuery
  };
};
