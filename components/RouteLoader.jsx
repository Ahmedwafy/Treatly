"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const RouteLoader = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800); // Adjust the timeout duration as needed

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="route-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="route-loader"
        >
          <div className="spinner" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteLoader;
