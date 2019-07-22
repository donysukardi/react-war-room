/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "react-router-dom";
import { Button, VisuallyHidden } from "../components/common";
import Layout from "../components/Layout";
import RepoCard from "../components/RepoCard";

function DashboardGrid(props) {
  return (
    <div
      sx={{
        display: "grid",
        gridRowGap: [3, 4],
        rowGap: [3, 4]
      }}
      {...props}
    />
  );
}

function Heading({ children, ...props }) {
  return (
    <h2
      sx={{
        m: 0,
        color: "secondary",
        textTransform: "uppercase",
        fontSize: 1,
        letterSpacing: 2
      }}
      {...props}
    >
      {children}
    </h2>
  );
}

function DashboardScreen() {
  return (
    <Layout>
      <VisuallyHidden as="h1">Dashboard</VisuallyHidden>
      <DashboardGrid>
        <Heading>Allies</Heading>
        <RepoCard name="react" owner="facebook">
          <Button as={Link} to={`/facebook/react`} data-testid="view-react">
            View Stargazers
          </Button>
        </RepoCard>
        <Heading>Enemies</Heading>
        <RepoCard name="vue" owner="vuejs">
          <Button as={Link} to={`/vuejs/vue`} data-testid="view-vue">
            View Stargazers
          </Button>
        </RepoCard>
        <RepoCard name="angular" owner="angular">
          <Button as={Link} to={`/angular/angular`} data-testid="view-angular">
            View Stargazers
          </Button>
        </RepoCard>
      </DashboardGrid>
    </Layout>
  );
}

export default DashboardScreen;
