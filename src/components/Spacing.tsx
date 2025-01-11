import { FC, memo, ReactElement, Children } from "react";
import Box from "@mui/material/Box";

const childSpacing = 2;

const Spacing: FC<SpacingProps> = ({ children }) => {
  const renderChildren = Children.map(children, (child) => {
    return (
      <Box
        sx={{
          flex: 1,
          m: childSpacing,
        }}>
        {child}
      </Box>
    );
  });

  return (
    <Box
      sx={{
        marginInline: -childSpacing,
        marginY: {
          md: 0,
          xs: 2.5,
        },
        display: {
          md: "flex",
          xs: "block",
        },
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}>
      {renderChildren}
    </Box>
  );
};

interface SpacingProps {
  children: ReactElement | ReactElement[];
}

export default memo(Spacing);
