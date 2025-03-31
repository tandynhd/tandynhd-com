"use client";

import { Box, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useLoadingContext } from "@/context/LoadingContext";
import Loader from "./loader/page";

export default function LoadingScreen() {
  const { isLoading } = useLoadingContext();
  const theme = useTheme();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.background.default,
            zIndex: 9999,
            pointerEvents: "auto",
            isolation: "isolate",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              position: "relative",
              zIndex: 10000,
            }}
          >
            <Loader />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
