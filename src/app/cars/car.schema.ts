import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const carSchema = z.object({
  carModel: z.string().min(3, "required"),
  price: z.number().min(3, "required"),
  color: z.enum(["Blue", "White", "Black", "Red"], {
    errorMap: () => ({ message: "Please select a valid color" }),
  }),
  manufactureDate: z.string().min(4),
});

export type CarSchemaType = z.infer<typeof carSchema>;
export const carResolver = zodResolver(carSchema);
