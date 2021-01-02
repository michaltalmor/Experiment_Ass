
const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/exp",
    name: "exp",
    component: () => import("./pages/ExperimentPage"),
  },
];

export default routes;
