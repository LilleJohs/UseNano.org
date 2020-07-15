import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./App";
import reducers from "./reducers";
import theme from "./theme";

import { CssBaseline, ThemeProvider } from "@material-ui/core";

const store = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Provider store={store(reducers)}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.querySelector("#root")
);
