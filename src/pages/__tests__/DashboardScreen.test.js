import React from "react";
import { waitForElementToBeRemoved } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { GET_REPOSITORY_STATS_QUERY } from "../../components/RepoCard";
import { visit } from "../../utils/test";
import { getMockRepoData } from "../../utils/testData";

const mocks = [
  ["facebook", "react"],
  ["vuejs", "vue"],
  ["angular", "angular"]
].map(([owner, name], index) =>
  getMockRepoData(GET_REPOSITORY_STATS_QUERY, owner, name, index + 1)
);

jest.mock("../../components/ApolloClientProvider", () => props => (
  <MockedProvider mocks={mocks} addTypename={false} {...props} />
));

let getItemSpy;

describe("DashboardScreen", () => {
  beforeEach(() => {
    getItemSpy = jest.spyOn(window.localStorage.__proto__, "getItem");
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should render DashboardScreen with loading state for authorized user", () => {
    getItemSpy.mockImplementation(() => "someaccesstoken");
    const page = visit("/");

    expect(page.getByText("Dashboard")).toBeInTheDocument();
    expect(page.getByText("Allies")).toBeInTheDocument();
    expect(page.getByText("Enemies")).toBeInTheDocument();
    expect(page.queryAllByText("Loading...").length).toBe(3);
  });

  it("should render DashboardScreen with loaded state for authorized user", async () => {
    getItemSpy.mockImplementation(() => "someaccesstoken");
    const page = visit("/");

    await waitForElementToBeRemoved(
      () => page.queryAllByText("Loading...").length
    );

    expect(page.getByText("repo react")).toBeInTheDocument();
    expect(page.getByText("description for react")).toBeInTheDocument();

    expect(page.getByText("repo vue")).toBeInTheDocument();
    expect(page.getByText("description for vue")).toBeInTheDocument();

    expect(page.getByText("repo angular")).toBeInTheDocument();
    expect(page.getByText("description for angular")).toBeInTheDocument();

    expect(page.queryAllByText("View Stargazers").length).toBe(3);
  });
});
