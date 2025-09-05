// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0px", 
        },
      },
    //   defaultProps: {
    //     disableElevation: true, // remove shadow by default
    //     variant: "contained",   // make contained the default
    //   },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
        },
      },
    },
    MuiOutlinedInput: {
       styleOverrides: {
        root: {
          borderRadius: "0px",
        },
      }, 
    }
  },
});

export default theme;
