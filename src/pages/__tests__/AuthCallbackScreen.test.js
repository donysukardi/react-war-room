import React from "react";
import { act } from "@testing-library/react";
import { visit, flushPromises } from "../../utils/test";

jest.mock("../DashboardScreen", () => () => <div>Dashboard screen</div>);

const fetchSpy = jest.fn();
const alertSpy = jest.fn();

describe("AuthCallbackScreen", () => {
  beforeAll(() => {
    global.alert = alertSpy;
    global.fetch = fetchSpy;
  });

  afterAll(() => {
    delete global.alert;
    delete global.fetch;
  });

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("should exchange code with access token, store it and redirects to Dashboard", async () => {
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            token: "sometoken"
          })
      })
    );
    const page = visit("/auth/callback?code=auth-code");
    expect(page.getByText("Logging you in...")).not.toBeNull();

    await act(async () => {
      await flushPromises();
    });

    expect(page.getByText("Dashboard screen")).toBeInTheDocument();
    expect(localStorage.getItem("access_token")).toBe("sometoken");
  });

  it("should alert user when failing to exchange access_token", async () => {
    fetchSpy.mockImplementationOnce(() => Promise.reject());
    visit("/auth/callback?code=auth-code");
    await flushPromises();

    expect(alertSpy).toHaveBeenCalledWith("Error getting access token");
  });
});
