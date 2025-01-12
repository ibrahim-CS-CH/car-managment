import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { appRoutes } from "@/constants/app-routes";
import { useCars, useDeleteCars } from "@/lib/react-query/car-query";
import CarItem from "./components/car-item";
import EditCar from "./components/edit-car";

export function Component() {
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("desc");
  const { data, isLoading, isError, refetch } = useCars({
    orderBy: orderBy,
  });

  const { mutate: deleteCars } = useDeleteCars();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [carEdit, setCarEdit] = useState<Car | undefined>(undefined);
  const [selectedCars, setSelectedCars] = useState<string[]>([]);

  const filteredCars = useMemo(() => {
    return data?.filter((car) =>
      car.carModel.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleEdit = (car: Car) => {
    setOpen(true);
    setCarEdit(car);
  };

  const handleDelete = () => {
    if (selectedCars.length) {
      deleteCars(selectedCars, {
        onSuccess: () => {
          toast.success("Selected cars deleted successfully!");
          setSelectedCars([]);
        },
        onError: (error: any) => {
          console.error("Error deleting cars:", error);
          toast.error("Failed to delete selected cars.");
        },
      });
    }
  };

  const handleSelectCar = (carId: string, remove: boolean) => {
    if (!remove) {
      setSelectedCars((prev) => prev.filter((id) => id !== carId));
    } else {
      setSelectedCars((prev) => [...prev, carId]);
    }
  };
  const toggleSortOrder = () => {
    setOrderBy((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  if (isLoading) return <>LOADING...</>;
  if (isError) return <>{toast.error("Error")}</>;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: {
          lg: "50%",
        },
        margin: "auto",
      }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Typography variant="h4">Cars List</Typography>
        <Link to={appRoutes.car.add}>Add car</Link>
      </Box>

      <Box sx={{ p: 2 }}>
        <TextField
          label="Search by Car Model"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{
            p: 2,
          }}>
          Total: {filteredCars?.length}
        </Typography>
        {selectedCars.length > 0 && (
          <IconButton
            aria-label="Delete"
            title="Delete"
            color="error"
            onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
      <Button onClick={toggleSortOrder}>
        Sort {orderBy === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </Button>
      <Box>
        {filteredCars?.length ? (
          filteredCars.map((car) => (
            <Box
              key={car.id}
              sx={{
                backgroundColor: carEdit?.id === car.id ? "lightgray" : "",
              }}>
              <CarItem
                car={car}
                onEdit={() => {
                  handleEdit(car);
                }}
                onSelect={handleSelectCar}
                selectedCars={selectedCars}
              />
            </Box>
          ))
        ) : (
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            No cars found
          </Typography>
        )}
      </Box>

      {EditCar != null && (
        <EditCar
          car={carEdit}
          open={open}
          onClose={() => {
            setOpen(false);
            setCarEdit(undefined);
          }}
          refetch={refetch}
        />
      )}
    </Box>
  );
}

Component.displayName = "ListCar";
