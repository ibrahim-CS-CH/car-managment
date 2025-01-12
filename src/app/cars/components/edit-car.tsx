import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import CustomCard from "@/components/CustomCard";
import CustomTextField from "@/components/CustomTextFieldX";
import MuiXDatePicker from "@/components/MuiXDatePicker";
import MySelect from "@/components/MySelect";
import Spacing from "@/components/Spacing";
import { useUpdateCar } from "@/lib/react-query/car-query";
import { carResolver, CarSchemaType } from "../car.schema";

type EditCarProps = {
  open: boolean;
  car?: Car;
  onClose: () => void;
  refetch: any;
};

export default function EditCar({ open, car, onClose, refetch }: EditCarProps) {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<CarSchemaType>({
    mode: "onChange",
    resolver: carResolver,
    values: car
      ? {
          carModel: car.carModel,
          color: car.color,
          manufactureDate: car.manufactureDate,
          price: car.price,
        }
      : undefined,
  });

  const { mutate: updateCar, isPending } = useUpdateCar();

  const onSubmit = async (data: CarSchemaType) => {
    if (car) {
      try {
        updateCar(
          {
            id: car.id,
            ...data,
          },
          {
            onSuccess: () => {
              console.log("Car updated ");
              toast.success("Car updated successfully!");
              onClose();
              refetch();
            },
            onError: () => {
              toast.error("Oops !");
            },
          }
        );
      } catch (error) {
        console.error("Error submitting car data:", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Car {car && car.carModel}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomCard sx={{ width: "full" }}>
            <Spacing>
              <CustomTextField
                controllerProps={{
                  control: control as any,
                  name: "carModel",
                }}
                textFieldProps={{
                  label: "carModel",
                  disabled: isPending,
                }}
              />
              <CustomTextField
                controllerProps={{
                  control: control as any,
                  name: "price",
                }}
                textFieldProps={{
                  label: "price",
                  type: "number",
                  disabled: isPending,
                }}
              />
            </Spacing>
            <Spacing>
              <MySelect
                defaultValue={car?.color}
                label="Color"
                items={[
                  { id: "White", value: "White" },
                  { id: "Black", value: "Black" },
                  { id: "Red", value: "Red" },
                  { id: "Blue", value: "Blue" },
                ]}
                controllerProps={{
                  control,
                  name: "color",
                  disabled: isPending,
                }}
              />
              <Controller
                name="manufactureDate"
                control={control}
                render={({ field }) => (
                  <MuiXDatePicker
                    {...field}
                    views={["year"]}
                    maxDate={dayjs().add(2, "year")}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(newValue) =>
                      field.onChange(
                        newValue ? dayjs(newValue).format("YYYY") : ""
                      )
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.manufactureDate,
                        helperText: errors.manufactureDate?.message,
                      },
                    }}
                    disabled={isPending}
                  />
                )}
              />
            </Spacing>
          </CustomCard>
          <DialogActions>
            <Button
              onClick={onClose}
              color="secondary"
              sx={{
                mt: 2,
              }}>
              Cancel
            </Button>

            <Button
              sx={{
                mt: 2,
              }}
              type="submit"
              disabled={isPending || !isValid}
              color="primary"
              variant="contained"
              startIcon={isPending && <CircularProgress size={14} />}>
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
