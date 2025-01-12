import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addCarToLocalStorage,
  getCarsFromLocalStorage,
  saveCarsToLocalStorage,
  updateCarInLocalStorage,
} from "@/api/local-storage.api";

export const useCars = (
  params: { orderBy?: "asc" | "desc" } = { orderBy: "desc" }
) => {
  const { orderBy = "desc" } = params;

  return useQuery({
    queryKey: ["cars", params],
    queryFn: getCarsFromLocalStorage,
    select: (data) => {
      return data.sort((a, b) => {
        const timestampA = parseInt(a.id.split("-")[0]);
        const timestampB = parseInt(b.id.split("-")[0]);
        return orderBy === "asc"
          ? timestampA - timestampB
          : timestampB - timestampA;
      });
    },
  });
};

export const useAddCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCar: Car) => {
      return addCarToLocalStorage(newCar);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
    onError: (error) => {
      console.error("Error adding car: ", error);
    },
  });
};

export const useUpdateCar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCar: Car) => {
      return await updateCarInLocalStorage(newCar);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
  });
};

export const useDeleteCars = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ids: string[]) => {
      const cars = await getCarsFromLocalStorage();
      const filteredCars = cars.filter((car) => !ids.includes(car.id));
      saveCarsToLocalStorage(filteredCars);
      return filteredCars;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
  });
};
