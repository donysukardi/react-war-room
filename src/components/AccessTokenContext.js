import React, { useState, useEffect } from "react";

const AccessTokenContext = React.createContext(null);
const ACCESS_TOKEN_KEY = "access_token";

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function AccessTokenProvider({ children }) {
  const accessTokenState = useState(getAccessToken);
  const [accessToken, setAccessToken] = accessTokenState;

  /* Sync accessToken between different browser tabs */
  useEffect(() => {
    function syncAccessToken(event) {
      if (event.key === ACCESS_TOKEN_KEY) {
        setAccessToken(event.newValue);
      }
    }
    window.addEventListener("storage", syncAccessToken);
    return () => {
      window.removeEventListener("storage", syncAccessToken);
    };
  }, [setAccessToken]);

  /* Save accessToken to localStorage upon logging in */
  useEffect(() => {
    let storedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (storedAccessToken !== accessToken) {
      if (accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      } else {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      }
    }
  }, [accessToken]);

  return (
    <AccessTokenContext.Provider value={accessTokenState}>
      {children}
    </AccessTokenContext.Provider>
  );
}

export { AccessTokenProvider };
export default AccessTokenContext;
