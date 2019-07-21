/** @jsx jsx */
import { jsx, Box } from "theme-ui";
import { Button } from "../components/common";
import Layout from "../components/Layout";

function LoginScreen() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const baseRedirectUri =
    process.env.REACT_APP_PUBLIC_URL || window.location.origin;
  const redirectUri = `${baseRedirectUri}/auth/callback`;

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("redirect_uri", redirectUri);
  params.append("scope", "user");
  const loginUrl = `https://github.com/login/oauth/authorize?${params}`;

  return (
    <Layout allowLogout={false}>
      <Box
        sx={{
          fontSize: 2,
          maxWidth: 540,
          lineHeight: "tight"
        }}
      >
        <Box
          as="p"
          sx={{
            fontSize: 4,
            color: "secondary"
          }}
        >
          In a galaxy far far away…
        </Box>
        <p>During The Battle of Krowemarf between React, Vue, and Angular.</p>
        <p>
          You, as a React warrior, are assigned the ultimate mission from our
          React supreme leader "Vomarba" that will determine the future of our
          clan.
        </p>
        <p>Let's log you in to find out how you fare against your enemies!</p>
      </Box>

      <Box
        sx={{
          mt: 5
        }}
      >
        <Button as="a" href={loginUrl}>
          Login with Github
        </Button>
      </Box>
    </Layout>
  );
}

export default LoginScreen;
