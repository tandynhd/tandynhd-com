"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        pt: { xs: 8, sm: 9 },
      }}
    >
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default Layout;
