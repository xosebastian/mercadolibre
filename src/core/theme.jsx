import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffe600",
    },
    secondary: {
      main: "#3483fa",
    },
    common: {
      grey: {
        main: "#999999",
        light: "#eeeeee",
      },
    },
    text: {
      primary: "#333333",
    },
    background: {
      default: "#eee",
    },
  },
});

export default theme;
