import React, { useEffect, useState } from 'react';
import Auth from './provider'; // Import the Auth class

import LoadingPage from './loading_page'
import AuthPage from "./auth_page"

const RequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      if (Auth.checkToken()) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      // Auth.getUserData().then(() => {
      //   setIsAuthenticated(true);
      // })
      // .catch((error) => {
      //   console.log("Not logged in");
      //   setIsAuthenticated(false);
      // });
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <LoadingPage text="One second, please"/>; // You can replace this with any loading animation or component
  }

  // If user is not authenticated, render nothing or a message
  if (!isAuthenticated) {
    return <AuthPage />; // You can replace this with any UI component or message indicating authentication is required
  }

  // If user is authenticated, render the children components
  return <>{children}</>;
};

export default RequireAuth;