import React, { useRef, useCallback } from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import { FixedSizeGrid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { WindowScroller } from "react-virtualized";
import { produce } from "immer";

import { GridContainer, GridItem } from "../components/common";
import Layout from "../components/Layout";
import RepoCard from "../components/RepoCard";
import UserCard from "../components/UserCard";

import { noop, setRefs, mapGridToListOnItemsRendered } from "../utils/helpers";
import { useMeasurements } from "../utils/hooks";

export const GET_STARGAZERS_QUERY = gql`
  query getRepository($owner: String!, $name: String!, $cursor: String) {
    repository(name: $name, owner: $owner) {
      stargazers(first: 96, after: $cursor) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            login
            name
            avatarUrl
            url
          }
        }
      }
    }
  }
`;

function Item({ data, columnIndex, rowIndex, style }) {
  const { items, columnCount } = data;
  let content;
  const index = rowIndex * columnCount + columnIndex;
  if (index >= items.length) {
    content = "Loading...";
  } else {
    const { node } = items[index];
    content = (
      <UserCard
        avatarUrl={node.avatarUrl}
        username={node.login}
        name={node.name}
        url={node.url}
      />
    );
  }
  return <GridItem style={style}>{content}</GridItem>;
}

function StargazersList(props) {
  const { name, owner } = props;
  const variables = {
    name,
    owner
  };

  const { measurements, getRef } = useMeasurements();
  const containerWidth = measurements.container
    ? measurements.container.width
    : 0;

  let columnCount =
    containerWidth <= 480
      ? 1
      : containerWidth <= 720
      ? 2
      : containerWidth <= 1024
      ? 3
      : 4;

  const listRef = useRef(null);
  const syncWindowToListScroll = useCallback(({ scrollTop }) => {
    if (listRef.current) {
      listRef.current.scrollTo({ scrollTop });
    }
  }, []);

  const { data, loading, error, fetchMore } = useQuery(GET_STARGAZERS_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables
  });

  if (error) return <p>{error.message}</p>;

  const { repository: { stargazers = {} } = {} } = data;
  const { pageInfo: { hasNextPage } = {}, edges: items } = stargazers;

  if (loading && !items) {
    return "Loading...";
  }

  // If there are more items to be loaded then add an extra item/row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const rowCount = Math.ceil(itemCount / columnCount);
  const isRowLoaded = index => !hasNextPage || index < rowCount;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = loading
    ? noop
    : () =>
        fetchMore({
          variables: {
            ...variables,
            cursor: stargazers.pageInfo.endCursor
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            if (fetchMoreResult.repository.stargazers.edges.length === 0) {
              return prevResult;
            }
            const nextState = produce(fetchMoreResult, draftState => {
              draftState.repository.stargazers.edges = [
                ...prevResult.repository.stargazers.edges,
                ...draftState.repository.stargazers.edges
              ];
            });
            return nextState;
          }
        });

  return (
    <div>
      <div ref={getRef("container")} />
      <WindowScroller onScroll={syncWindowToListScroll}>
        {() => <div />}
      </WindowScroller>
      <InfiniteLoader
        isItemLoaded={isRowLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => {
          const onGridItemsRendered = gridData => {
            onItemsRendered(mapGridToListOnItemsRendered(gridData));
          };
          return (
            <FixedSizeGrid
              ref={setRefs(ref, listRef)}
              itemData={{ items, columnCount }}
              columnCount={columnCount}
              columnWidth={containerWidth / columnCount}
              rowCount={rowCount}
              onItemsRendered={onGridItemsRendered}
              width={containerWidth}
              height={window.innerHeight}
              rowHeight={96}
              className="window-scroller-override"
            >
              {Item}
            </FixedSizeGrid>
          );
        }}
      </InfiniteLoader>
    </div>
  );
}

const StargazersScreen = props => {
  const { repoOwner, repoName } = props.match.params;

  return (
    <Layout>
      <RepoCard owner={repoOwner} name={repoName} />
      <GridContainer>
        <StargazersList owner={repoOwner} name={repoName} />
      </GridContainer>
    </Layout>
  );
};

export default StargazersScreen;
