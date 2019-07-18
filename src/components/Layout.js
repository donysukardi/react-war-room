/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";
import { useColorMode } from "theme-ui";
import { Link } from "react-router-dom";
import {
  Layout as ViewportLayout,
  Header,
  Main,
  Container,
  Footer
} from "theme-ui";
import Toggle from "./Toggle";
import { Button } from "./common";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";

function Layout({ allowLogout = true, children }) {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <ViewportLayout>
      <Header>
        <Flex
          sx={{
            p: 3,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Box
            as={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "primary",
              fontWeight: "bold",
              fontSize: 3
            }}
            aria-label="React War Room"
          >
            {"<ReactWarRoom />"}
          </Box>
          <Flex
            sx={{
              alignItems: "center"
            }}
          >
            <Toggle
              icons={{
                checked: (
                  <img
                    src={moon}
                    width="16"
                    height="16"
                    alt=""
                    style={{ pointerEvents: "none" }}
                  />
                ),
                unchecked: (
                  <img
                    src={sun}
                    width="16"
                    height="16"
                    alt=""
                    style={{ pointerEvents: "none" }}
                  />
                )
              }}
              checked={colorMode === "dark"}
              onChange={e => setColorMode(e.target.checked ? "dark" : "light")}
            />
            {allowLogout && (
              <Button
                sx={{
                  ml: 3
                }}
                as={Link}
                to="/logout"
                variant="secondary"
              >
                Logout
              </Button>
            )}
          </Flex>
        </Flex>
      </Header>
      <Main>
        <Container>{children}</Container>
      </Main>
      <Footer />
    </ViewportLayout>
  );
}

export default Layout;
