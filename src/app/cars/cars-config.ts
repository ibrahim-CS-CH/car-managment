import { appRoutes } from "@/constants/app-routes";

export const carsConfig = {
  routes: {
    path: "",
    children: [
      {
        path: appRoutes.car.root,
        lazy: () => import("@/app/cars/list-car"),
      },
      {
        path: appRoutes.car.add,
        lazy: () => import("@/app/cars/add-car"),
      },
    ],
  },
};
