/** @jsx jsx */
import { jsx, Box } from "theme-ui";
import { useEffect, useContext } from "react";
import AccessTokenContext from "../components/AccessTokenContext";
function AuthCallbackScreen(props) {
  const { location, history } = props;
  const [, setAccessToken] = useContext(AccessTokenContext);
  const params = new URLSearchParams(location.search);
  const code = params.get("code");
  const tokenEndpoint = process.env.REACT_APP_GITHUB_TOKEN_ENDPOINT;
  useEffect(() => {
    async function getToken() {
      if (code) {
        try {
          const response = await fetch(`${tokenEndpoint}/${code}`);
          const result = await response.json();
          const { token } = result;
          if (token) {
            setAccessToken(token);
            history.push("/");
          } else {
            alert("Error getting access token");
          }
        } catch (e) {
          alert("Error getting access token");
        }
      }
    }
    getToken();
  }, [code, setAccessToken, history, tokenEndpoint]);

  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "100vw",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      Logging you in...
    </Box>
  );
}

export default AuthCallbackScreen;
