/** @jsx jsx */
import { jsx, Box } from "theme-ui";

const absoluteFill = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

const textOverflowEllipsis = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
};

function GridItem(props) {
  return (
    <Box
      sx={{
        p: 2
      }}
      {...props}
    />
  );
}

function GridContainer(props) {
  return (
    <Box
      sx={{
        mt: 2,
        mx: -2
      }}
      {...props}
    />
  );
}

function Button({ as: Component = "button", variant = "primary", ...props }) {
  return (
    <Component
      sx={{
        display: "inline-block",
        py: 2,
        px: 3,
        borderRadius: "sm",
        textDecoration: "none",
        fontSize: 0,
        variant: `buttons.${variant}`
      }}
      {...props}
    />
  );
}

function VisuallyHidden(props) {
  return (
    <Box
      sx={{
        position: "absolute !important",
        height: "1px",
        width: "1px",
        overflow: "hidden",
        clip: "rect(1px, 1px, 1px, 1px)"
      }}
      {...props}
    />
  );
}

export {
  absoluteFill,
  Button,
  GridContainer,
  GridItem,
  textOverflowEllipsis,
  VisuallyHidden
};
