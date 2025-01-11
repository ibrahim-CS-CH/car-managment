import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";

export default function CarItem({
  car,
  onEdit,
}: {
  car: Car;
  onEdit: (carId: string) => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        marginBottom: 2,
        boxShadow: 2,
        borderRadius: "16px",
      }}>
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
          title="Edit"
          color="primary"
          onClick={() => onEdit(car.id)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
