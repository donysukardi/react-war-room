import mockedEnv from "mocked-env";
import { visit } from "../../utils/test";

let getItemSpy;

describe("LoginScreen", () => {
  beforeEach(() => {
    getItemSpy = jest.spyOn(window.localStorage.__proto__, "getItem");
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("should render LoginScreen for unauthorized user", () => {
    getItemSpy.mockImplementation(() => null);
    const restoreEnv = mockedEnv({
      REACT_APP_CLIENT_ID: "clientId",
      REACT_APP_PUBLIC_URL: "appPublicUrl"
    });
    const page = visit("/");
    const loginButton = page.getByText("Login with Github");
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.href).toMatchInlineSnapshot(
      `"https://github.com/login/oauth/authorize?client_id=clientId&redirect_uri=appPublicUrl%2Fauth%2Fcallback&scope=user"`
    );
    restoreEnv();
  });
});
