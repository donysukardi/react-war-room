import { useContext, useEffect } from "react";
import AccessTokenContext from "../components/AccessTokenContext";

function LogoutScreen(props) {
  const { history } = props;
  const [, setAccessToken] = useContext(AccessTokenContext);

  useEffect(() => {
    setAccessToken(null);
    history.push("/");
  });

  return "Logging you out";
}

export default LogoutScreen;
