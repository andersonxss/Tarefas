import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
function Loader() {
  return (
    <Box
      mt={5}
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
}

export default Loader;
