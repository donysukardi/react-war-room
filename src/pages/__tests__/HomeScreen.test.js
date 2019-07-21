import React from "react";
import { visit } from "../../utils/test";

jest.mock("../LoginScreen", () => () => <div>Login screen</div>);
jest.mock("../DashboardScreen", () => () => <div>Dashboard screen</div>);

let getItemSpy;

describe("HomeScreen", () => {
  beforeEach(() => {
    getItemSpy = jest.spyOn(window.localStorage.__proto__, "getItem");
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should render LoginScreen for unauthorized user", () => {
    getItemSpy.mockImplementation(() => null);
    const page = visit("/");
    expect(page.getByText("Login screen")).toBeInTheDocument();
  });

  it("should render DashboardScreen for authorized user", async () => {
    getItemSpy.mockImplementation(() => "someaccesstoken");
    const page = visit("/");
    expect(page.getByText("Dashboard screen")).toBeInTheDocument();
  });
});
