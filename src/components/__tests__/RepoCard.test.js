import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider, wait } from "@apollo/react-testing";
import RepoCard from "../RepoCard";
import { GET_REPOSITORY_STATS_QUERY } from "../RepoCard";
import { getMockRepoData } from "../../utils/testData";

const mocks = [
  getMockRepoData(GET_REPOSITORY_STATS_QUERY, "facebook", "react", 1)
];

describe("RepoCard", () => {
  it("should render info and stats for given repo", async () => {
    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RepoCard owner="facebook" name="react" />
      </MockedProvider>
    );

    expect(component.getByText("Loading...")).toBeInTheDocument();

    await wait(() => component.getByText("repo react"));
    expect(component.getByText("description for react")).toBeInTheDocument();
    expect(component.getByAltText("Open Graph of react").src).toBe(
      "http://react-image/"
    );

    expect(component.getByLabelText("Stars count")).toBeInTheDocument();
    expect(component.getByTestId("Stars count").textContent).toBe("11");

    expect(component.getByLabelText("Forks count")).toBeInTheDocument();
    expect(component.getByTestId("Forks count").textContent).toBe("12");

    expect(component.getByLabelText("Open issues count")).toBeInTheDocument();
    expect(component.getByTestId("Open issues count").textContent).toBe("13");

    expect(
      component.getByLabelText("Open pull requests count")
    ).toBeInTheDocument();
    expect(component.getByTestId("Open pull requests count").textContent).toBe(
      "14"
    );
  });
});
