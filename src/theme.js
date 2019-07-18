import { tailwind } from "@theme-ui/presets";

const { colors } = tailwind;

const theme = {
  ...tailwind,
  initialColorMode: "light",
  useCustomProperties: true,

  colors: {
    ...colors,
    text: colors.text,
    background: colors.gray[2],
    cardBackground: colors.white,

    primary: colors.orange[5],
    primaryHover: colors.orange[6],
    primaryActive: colors.orange[7],

    modes: {
      dark: {
        text: colors.light,
        background: colors.gray[9],
        cardBackground: colors.gray[8]
      }
    }
  },

  cards: {
    default: {
      bg: "cardBackground",
      borderRadius: "lg",
      boxShadow: "default"
    }
  },

  buttons: {
    primary: {
      border: "none",
      color: "white",
      bg: "primary",
      "&:hover": {
        bg: "primaryHover"
      },
      "&:active": {
        bg: "primaryActive"
      }
    },
    secondary: {
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "primary",
      color: "primary",
      "&:hover": {
        borderColor: "primaryHover",
        color: "primaryHover"
      },
      "&:active": {
        borderColor: "primaryActive",
        color: "primaryActive"
      }
    }
  }
};

export default theme;
