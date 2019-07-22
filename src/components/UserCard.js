/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";
import { absoluteFill, textOverflowEllipsis } from "./common";

function UserCard({ avatarUrl, name, username, url, ...props }) {
  return (
    <Box
      sx={{
        position: "relative",
        p: [3],
        variant: "cards.default"
      }}
      {...props}
    >
      <Flex
        sx={{
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <img
          sx={{
            display: "block",
            width: "48px",
            height: "48px",
            objectFit: "cover",
            borderRadius: "default",
            bg: "muted"
          }}
          src={avatarUrl}
          alt={`Avatar of ${name}`}
        />
        <Box
          sx={{
            ml: 3
          }}
        >
          <Box
            sx={{
              ...textOverflowEllipsis,
              fontSize: 1,
              lineHeight: "relaxed"
            }}
          >
            {name}
          </Box>
          <Box
            sx={{
              ...textOverflowEllipsis,
              fontSize: 0,
              color: "textMuted"
            }}
          >
            {username}
          </Box>
        </Box>
      </Flex>
      <Box
        as="a"
        href={url}
        sx={{
          ...absoluteFill,
          opacity: 0
        }}
      >
        {`Github profile of ${username}`}
      </Box>
    </Box>
  );
}

export default UserCard;
