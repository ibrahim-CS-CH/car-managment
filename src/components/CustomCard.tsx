import Paper from "@mui/material/Paper";
import { SxProps } from "@mui/material/styles";
import { FC, ReactElement } from "react";
import PageTitle from "./PageTitle";

const CustomCard: FC<CustomCardProps> = ({ children, title = "", sx = {} }) => {
  return (
    <>
      {title && <PageTitle title={title} />}
      <Paper
        sx={{
          width: {
            lg: "50%",
          },
          p: {
            xs: 1,
            md: 2,
            lg: 3,
          },
          ...sx,
        }}>
        {children}
      </Paper>
    </>
  );
};

interface CustomCardProps {
  children: ReactElement[] | ReactElement;
  title?: string;
  sx?: SxProps;
}

export default CustomCard;
