import config from "../config";

// The application assumes that the "component" name matches the page file name (without the .js or .jsx extension)

const pages = [
  {
    menu: true,
    to: config.server.siteRoot,
    component: "GettingStartedPage",
    text: "Getting Started"
  },
  {
    menu: true,
    text: "Documentation",
    children: [
      {
        menu: true,
        to: "/pushynavbar/getting-started",
        component: "GettingStartedPage",
        text: "Getting Started"
      },
      {
        menu: true,
        to: "/theming",
        component: "PushyNavBarThemingPage",
        text: "Theming the NavBar"
      }
    ]
  },
  {
    menu: true,
    to: "/private-example",
    component: () => (
      <>
        <h1>Example Private Page</h1>
        <p>
          This page is only accessible to users in the "administrator" role.
        </p>
      </>
    ),
    text: "Example Private Page",
    private: true,
    roles: ["administrator"]
  },
  { menu: false, to: "/login", component: "LoginPage" }
];

// Prepend the siteRoot to the paths to handle deployment to a subdirectory.
const ROUTES_PAGES = pages.map((page) => {
  const path =
    page.path?.substr(0, 1) === "/"
      ? config.server.siteRoot + page.path.slice(1)
      : config.server.siteRoot + page.path;
  return { ...page, ...{ path: path } };
});

export default ROUTES_PAGES;
