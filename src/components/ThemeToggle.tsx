"use client";

import { IconButton, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "@/context/ThemeContext";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { toggleTheme } = useThemeContext();
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.15)"
            : "rgba(0, 0, 0, 0.08)",
        width: 48,
        height: 48,
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.25)"
              : "rgba(0, 0, 0, 0.15)",
          transform: "scale(1.1)",
        },
        "&:active": {
          transform: "scale(0.95)",
        },
      }}
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon sx={{ color: "#FFD700", fontSize: 28 }} />
      ) : (
        <Brightness4Icon sx={{ color: "#666666", fontSize: 28 }} />
      )}
    </IconButton>
  );
}
