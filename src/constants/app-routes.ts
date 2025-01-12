import { appRoutesDefinition } from "@/constants/app-routes.definition.ts";

export const appRoutes = {
  root: "/",
  car: {
    root: appRoutesDefinition.cars.root,
    add: appRoutesDefinition.cars.add,
    post: (carId: string) => {
      return appRoutesDefinition.cars.car.replace(":carId", `${carId}`);
    },
  },
};
