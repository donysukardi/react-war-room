import React from "react";
import { wait, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { GET_REPOSITORY_STATS_QUERY } from "../../components/RepoCard";
import { GET_STARGAZERS_QUERY } from "../StargazersScreen";
import { visit } from "../../utils/test";
import { getMockRepoData, getMockStargazersData } from "../../utils/testData";

let getItemSpy;

jest.mock("../../utils/hooks", () => ({
  useMeasurements: () => ({
    measurements: {
      container: {
        width: 1280
      }
    },
    getRef: () => {}
  }),
  useAuthState: () => true
}));

const mocks = [
  getMockRepoData(GET_REPOSITORY_STATS_QUERY, "facebook", "react", 1),
  getMockStargazersData(GET_STARGAZERS_QUERY, "facebook", "react"),
  getMockStargazersData(GET_STARGAZERS_QUERY, "facebook", "react", 95)
];

jest.mock("../../components/ApolloClientProvider", () => props => (
  <MockedProvider mocks={mocks} addTypename={false} {...props} />
));

describe("StargazersScreen", () => {
  beforeEach(() => {
    getItemSpy = jest.spyOn(window.localStorage.__proto__, "getItem");
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should render StargazersScreen with loading state for authorized user", () => {
    getItemSpy.mockImplementation(() => "someaccesstoken");
    const page = visit("/facebook/react");
    expect(page.queryAllByText("Loading...").length).toBe(2);
  });

  it("should render StargazersScreen with loaded state for authorized user", async () => {
    window.innerHeight = 1280;

    getItemSpy.mockImplementation(() => "someaccesstoken");

    const page = visit("/facebook/react");
    act(() => {
      jest.runAllTimers();
    });

    await wait(() => page.getByText("repo react"));
    const currentCount = page.queryAllByText(/^Github profile of login /)
      .length;
    expect(currentCount).toBeGreaterThan(1);
  });
});
