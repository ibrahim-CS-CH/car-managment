import { Button, CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import CustomCard from "@/components/CustomCard";
import CustomTextField from "@/components/CustomTextFieldX";
import MuiXDatePicker from "@/components/MuiXDatePicker";
import MySelect from "@/components/MySelect";
import Spacing from "@/components/Spacing";
import { appRoutes } from "@/constants/app-routes";
import { useAddCar } from "@/lib/react-query/car-query";
import { carResolver, CarSchemaType } from "./car.schema";

export function Component() {
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CarSchemaType>({
    mode: "onChange",
    resolver: carResolver,
  });

  const { mutate: addCar, isPending } = useAddCar();

  const onSubmit = async (data: CarSchemaType) => {
    const generatedId = `${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}-${data.carModel}`;

    try {
      addCar(
        {
          id: generatedId,
          ...data,
        },
        {
          onSuccess: () => {
            toast.success("Car added successfully!");
            navigate(appRoutes.car.root);
          },
        }
      );
    } catch (error) {
      console.error("Error submitting car data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomCard title="Add car">
        <Spacing>
          <CustomTextField
            controllerProps={{
              control: control as any,
              name: "carModel",
            }}
            textFieldProps={{
              label: "carModel",
              disabled: isPending,
              sx: { width: "100%" },
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
              sx: { width: "100%" },
            }}
          />
        </Spacing>
        <Spacing>
          <MySelect
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
                  field.onChange(newValue ? dayjs(newValue).format("YYYY") : "")
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

      <Button
        sx={{
          mt: 2,
        }}
        type="submit"
        disabled={isPending}
        color="primary"
        variant="contained"
        startIcon={isPending && <CircularProgress size={14} />}>
        {isPending ? "Adding car" : "Add car"}
      </Button>
    </form>
  );
}

Component.displayName = "AddCar";
