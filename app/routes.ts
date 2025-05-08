import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  route("/login", "routes/login.tsx"),
  route("/users/register", "routes/users/register.tsx")
] satisfies RouteConfig
