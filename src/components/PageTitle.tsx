import { Typography } from "@mui/material";

export default function PageTitle({ title }: { title: string }) {
  return (
    <Typography
      variant="h2"
      sx={(theme) => ({
        fontSize: 28,
        fontWeight: 400,
        color: theme.palette.text.primary,
        marginBottom: 2,
      })}>
      {title}
    </Typography>
  );
}
