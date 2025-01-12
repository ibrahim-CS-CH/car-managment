const LOCAL_STORAGE_KEY = "cars";

export const getCarsFromLocalStorage = async (): Promise<Car[]> => {
  const cars = localStorage.getItem(LOCAL_STORAGE_KEY);
  return cars ? JSON.parse(cars) : [];
};

export const saveCarsToLocalStorage = (cars: Car[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cars));
};

export const addCarToLocalStorage = async (newCar: Car): Promise<Car> => {
  const cars = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  cars.push(newCar);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cars));

  return newCar;
};

export const updateCarInLocalStorage = async (
  updatedCar: Car
): Promise<Car[]> => {
  const cars = await getCarsFromLocalStorage();
  const updatedCars = cars.map((car) =>
    car.id === updatedCar.id ? updatedCar : car
  );
  saveCarsToLocalStorage(updatedCars);
  return updatedCars;
};

export const deleteCarFromLocalStorage = async (id: string): Promise<Car[]> => {
  const cars = await getCarsFromLocalStorage();
  const filteredCars = cars.filter((car) => car.id !== id);
  saveCarsToLocalStorage(filteredCars);
  return filteredCars;
};
