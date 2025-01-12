import { Navigate } from "react-router-dom";

import AppInitialization from "@/app-initialization";
import BaseRouterProvider from "@/app-initialization/base-router.provider.tsx";
import { appRoutesDefinition } from "@/constants/app-routes.definition";
import { carsConfig } from "./cars/cars-config";
import RootLayout from "./layouts";

export default function App() {
  return (
    <AppInitialization>
      <BaseRouterProvider
        renderRoutes={() => [
          {
            path: appRoutesDefinition.root,
            errorElement: <p>Root error</p>,
            children: [
              {
                path: "",
                element: <RootLayout />,
                children: [
                  {
                    path: "",
                    element: <Navigate to={appRoutesDefinition.cars.root} />,
                  },
                  carsConfig.routes,
                ],
              },

              {
                path: "*",
                element: <p>Page not found</p>,
                errorElement: <p>Error here</p>,
              },
            ],
          },
        ]}
      />
    </AppInitialization>
  );
}
