"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

const withRedux = (Component: any) => {
  return function WrappedComponent(props: any) {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
};

export default withRedux;
