import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addCarToLocalStorage,
  deleteCarFromLocalStorage,
  getCarsFromLocalStorage,
  updateCarInLocalStorage,
} from "@/api/local-storage.api";

export const useCars = () => {
  return useQuery({
    queryKey: ["cars"],
    queryFn: getCarsFromLocalStorage,
    select: (data) => {
      return data.sort((a, b) => {
        const timestampA = parseInt(a.id.split("-")[0]);
        const timestampB = parseInt(b.id.split("-")[0]);
        return timestampB - timestampA;
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
        queryKey: ["addCars"], // Refetch the "cars" query after the mutation
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
        queryKey: ["updateCar"],
      });
    },
  });
};

export const useDeleteCar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => await deleteCarFromLocalStorage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
  });
};
