/** @jsx jsx */
import { jsx } from "theme-ui";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import { Box, Flex } from "theme-ui";
import Octicon, {
  Star,
  RepoForked,
  IssueOpened,
  GitPullRequest
} from "@primer/octicons-react";

export const GET_REPOSITORY_STATS_QUERY = gql`
  query getRepositoryStats($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      description
      openGraphImageUrl
      stargazers {
        totalCount
      }
      forkCount
      issues(states: [OPEN]) {
        totalCount
      }
      pullRequests(states: [OPEN]) {
        totalCount
      }
    }
  }
`;

function RepoCard({ name, owner, children }) {
  const { data, loading } = useQuery(GET_REPOSITORY_STATS_QUERY, {
    variables: {
      name,
      owner
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const {
    name: repoName,
    description,
    openGraphImageUrl,
    stargazers: { totalCount: stargazersCount },
    forkCount,
    issues: { totalCount: openIssuesCount },
    pullRequests: { totalCount: openPullRequestsCount }
  } = data.repository;

  const stats = [
    {
      label: "Stars count",
      icon: Star,
      count: stargazersCount
    },
    {
      label: "Forks count",
      icon: RepoForked,
      count: forkCount
    },
    {
      label: "Open issues count",
      icon: IssueOpened,
      count: openIssuesCount
    },
    {
      label: "Open pull requests count",
      icon: GitPullRequest,
      count: openPullRequestsCount
    }
  ];

  return (
    <Box
      as="section"
      sx={{
        p: [3, 4],
        variant: "cards.default"
      }}
    >
      <Flex
        sx={{
          flexDirection: ["column", "row"]
        }}
      >
        <img
          sx={{
            width: ["64px", "96px"],
            height: ["64px", "96px"],
            p: 2,
            bg: "white",
            objectFit: "cover",
            borderRadius: "lg",
            mr: 3
          }}
          src={openGraphImageUrl}
          alt={`Open Graph of ${name}`}
        />
        <Box
          sx={{
            mt: [3, 0]
          }}
        >
          <Box
            sx={{
              fontSize: [3, 4],
              lineHeight: "tight"
            }}
          >
            {repoName}
          </Box>
          <Box
            sx={{
              mt: 1
            }}
          >
            {description}
          </Box>
        </Box>
      </Flex>

      <Box
        sx={{
          mt: 4,
          display: "grid",
          gridAutoFlow: ["row", "column"],
          rowGap: 2
        }}
      >
        {stats.map(stat => (
          <Box key={stat.label}>
            <span
              sx={{
                color: "secondary"
              }}
              aria-label={stat.label}
            >
              <Octicon icon={stat.icon} />
            </span>
            <Box
              data-testid={stat.label}
              sx={{
                display: "inline-block",
                ml: 2,
                position: "relative",
                top: "2px"
              }}
            >
              {stat.count}
            </Box>
          </Box>
        ))}
      </Box>
      {children && (
        <Box
          sx={{
            mt: 4
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

export default RepoCard;
