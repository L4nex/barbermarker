import { Box, CircularProgress } from "@mui/material";

interface LoadingProgressProps {
  visible: boolean;
}

export default function LoadingProgress({ visible }: LoadingProgressProps) {
  return (
    <>
      {visible ? (
        <Box sx={{ display: "flex", justifyContent: "center"}}>
          <CircularProgress />
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}
