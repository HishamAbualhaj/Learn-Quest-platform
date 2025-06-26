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
    const url = currentUrl.pathname.toLowerCase();

    const isInSetFound = (url, routes) => routes.has(url);
    const isPrefixPath = (url, routes) =>
      [...routes].some((route) => url.startsWith(route));
    // only for admin
    const isAdminRoutes = new Set(["/dashboard"]);

    const loggedInSharedRoutes = new Set(["/student/coursepage"]);

    // allow these while not logined in
    const allowedRoutesWhileNotLogin = new Set([
      "/login",
      "/signup",
      "/forgotpassword",
      "/verifycode",
      "/confirmpass",
    ]);

    const allowedForBoth = new Set(["/student/allcourses", "/student/blog"]);

    const isAllowedForBoth = isPrefixPath(url, allowedForBoth);

    const isAdmin = isPrefixPath(url, isAdminRoutes);

    const isAllowedNotLogin = isInSetFound(url, allowedRoutesWhileNotLogin);

    // both user and admin can access it ONLY WHILE LOGIN
    const isLoggedInShared = isPrefixPath(url, loggedInSharedRoutes);

    // allow landing page while system is running
    if (url === "/" && !isMaintenance) {
      setIsLoading(false);
      return;
    }
    // allow maintenance page
    if (url === "/maintenance" && !isMaintenance) {
      navigate("/");
      return;
    }

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

    // NOT LOGIN CASE
    if (!loggedIn) {
      if (isAllowedNotLogin || isAllowedForBoth) {
        setIsLoading(false);
        return;
      }
      navigate("/login");
      return;
    }

    // LOGIN CASE
    if (isAllowedNotLogin) {
      navigate("/");
      return;
    }

 
    if (isLoggedInShared || isAllowedForBoth) {
      setIsLoading(false);
      return;
    }

    // ALLOW ADMIN PAGES
    if ((isAdmin && role !== "admin") || (!isAdmin && role === "admin")) {
      navigate("/");
      return;
    }
    setIsLoading(false);
  }, [isMaintenance, currentUrl.pathname, loggedIn, role, navigate]);

  return <>{isLoading ? <Loading /> : children}</>;
}

export default IsAuthRoute;
