import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

export function visit(path, options) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
    options
  );
}

export function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}
