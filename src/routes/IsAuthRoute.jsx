import React, { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
function IsAuthRoute({ children, isMaintenance = false }) {
  const [isLoading, setIsLoading] = useState(true);
  const dataFetched = useLoaderData();
  const { loggedIn, userData: [{ role }] = [{}] } = dataFetched;


  // isMaintenance is true which is server is went down
  const navigate = useNavigate();

  const currentUrl = useLocation();
  useEffect(() => {
    const url = currentUrl.pathname;

    // only for admin
    const isAdminRoutes = new Set(["/dashboard"]);
    // allow these while not logined in
    const isAllowedRoutesWhileNotLogin = new Set([
      "/login",
      "/signup",
      "/forgotpassword",
      "/verifycode",
      "/confirmpass",
    ]);

    if (url === "/maintenance" && !isMaintenance) {
      navigate("/");
      return;
    }
    if (url === "/" && !isMaintenance) {
      setIsLoading(false);
      return;
    }
    const isInSetOrStartsWith = (url, routes) =>
      routes.has(url) || [...routes].some((route) => url.startsWith(route));

    const isAdmin = isInSetOrStartsWith(url, isAdminRoutes);

    const isAllowed = isInSetOrStartsWith(url, isAllowedRoutesWhileNotLogin);

    // Only while system is shut down
    if (isMaintenance) {
      if (url === "/maintenance") {
        setIsLoading(false);
        return;
      }

      // go to admin dashboard
      if (role === "admin" && isAdmin) {
        setIsLoading(false);
        return;
      }

      navigate("/maintenance");
      return;
    }

    // While NOT login check allowed routes
    if (!loggedIn) {
      if (isAllowed) {
        setIsLoading(false);
        return;
      }
      navigate("/");
      return;
    }

    // if user is logged in, then check allowed routes
    if (isAllowed) {
      navigate("/");
      return;
    }

    if ((isAdmin && role !== "admin") || (!isAdmin && role === "admin")) {
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [isMaintenance, currentUrl.pathname, loggedIn, role, navigate]);

  return <>{isLoading ? <Loading /> : children}</>;
}

export default IsAuthRoute;
