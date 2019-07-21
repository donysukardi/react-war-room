export function getMockRepoData(query, owner, name, index) {
  return {
    request: {
      query,
      variables: {
        owner,
        name
      }
    },
    result: {
      data: {
        repository: {
          name: `repo ${name}`,
          description: `description for ${name}`,
          openGraphImageUrl: `http://${name}-image`,
          stargazers: {
            totalCount: index * 10 + 1
          },
          forkCount: index * 10 + 2,
          issues: {
            totalCount: index * 10 + 3
          },
          pullRequests: {
            totalCount: index * 10 + 4
          }
        }
      }
    }
  };
}

export function getMockStargazersData(query, owner, name, after = -1) {
  const startCursor = after + 1;
  const endCursor = startCursor + 95;
  return {
    request: {
      query,
      variables: {
        owner,
        name,
        ...(after !== -1 && { cursor: after })
      }
    },
    result: {
      data: {
        repository: {
          stargazers: {
            pageInfo: {
              startCursor,
              endCursor,
              hasNextPage: true,
              hasPreviousPage: !!after
            },
            edges: Array.apply(null, { length: 96 }).map((_, idx) => {
              const itemIdx = startCursor + idx;
              return {
                node: {
                  login: `login ${itemIdx}`,
                  name: `name ${itemIdx}`,
                  avatarUrl: `http://avatar-${itemIdx}`,
                  url: `http://url-${itemIdx}`
                }
              };
            })
          }
        }
      }
    }
  };
}
