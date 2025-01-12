import EditIcon from "@mui/icons-material/Edit";
import { Box, Checkbox, IconButton, Tooltip, Typography } from "@mui/material";

export default function CarItem({
  car,
  onEdit,
  onSelect,
  selectedCars,
}: {
  car: Car;
  onEdit: (carId: string) => void;
  onSelect: (carId: string, remove: boolean) => void;
  selectedCars: string[];
}) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onSelect(car.id, true);
    } else {
      onSelect(car.id, false);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      <Checkbox
        checked={selectedCars.includes(car.id)}
        onChange={handleCheckboxChange}
        color="primary"
        size="small"
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", color: "primary.main" }}>
          {car.carModel}
        </Typography>
      </Box>
      <Tooltip title="Edit">
        <IconButton
          aria-label="edit"
          color="primary"
          onClick={() => onEdit(car.id)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
