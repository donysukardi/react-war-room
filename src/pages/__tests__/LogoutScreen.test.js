import React from "react";
import { wait } from "@testing-library/react";
import { visit } from "../../utils/test";

jest.mock("../HomeScreen", () => () => <div>Home screen</div>);

describe("LogoutScreen", () => {
  it("should clear access token and redirects to Home", async () => {
    localStorage.setItem("access_token", "sometoken");
    const page = visit("/logout");
    await wait(() => page.getByText("Home screen"));
    expect(localStorage.getItem("access_token")).toBeNull();
  });
});
