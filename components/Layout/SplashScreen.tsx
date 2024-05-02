import React, { useEffect, useState } from "react";

const SplashScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show the splash screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="splash-screen">
      <img src="/assets/logo.png" alt="Logo" />
    </div>
  );
};

export default SplashScreen;
