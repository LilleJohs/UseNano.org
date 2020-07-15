import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4A90E2",
    },
    secondary: {
      main: "#FFFFFF",
    },
    textSecondary: {
      main: "#D2E3F8",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#ffffff",
      paper: "#4A90E2",
    },
  },
});

export default theme;
