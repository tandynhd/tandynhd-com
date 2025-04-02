"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useThemeContext } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import LightToggleButton from "@/components/LightToggleButton/page";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from "@mui/icons-material/Person";

const pages = [
  { name: "Mini Games", path: "/", icon: <SportsEsportsIcon /> },
  { name: "Projects", path: "/projects", icon: <FolderIcon /> },
  { name: "About", path: "/about", icon: <PersonIcon /> },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const { toggleTheme } = useThemeContext();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (path: string) => {
    handleCloseNavMenu();
    router.push(path);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background:
          theme.palette.mode === "dark" ? "rgba(18, 18, 18, 0.8)" : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${
          theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
        }`,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: theme.palette.mode === "dark" ? "inherit" : "primary.main",
                textDecoration: "none",
                background: "linear-gradient(45deg, #FF3366 30%, #6C63FF 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              tandynhd
            </Typography>
          </motion.div>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(18, 18, 18, 0.95)"
                      : "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => handleNavigation(page.path)}
                  sx={{
                    color: theme.palette.mode === "dark" ? "inherit" : "text.primary",
                    "&:hover": {
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.05)",
                    },
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    {page.icon} {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              background: "linear-gradient(45deg, #FF3366 30%, #6C63FF 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            tandynhd
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {pages.map((page) => (
              <motion.div key={page.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => handleNavigation(page.path)}
                  sx={{
                    my: 2,
                    mx: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color:
                      pathname === page.path
                        ? theme.palette.primary.main
                        : theme.palette.mode === "dark"
                          ? "inherit"
                          : "text.primary",
                    fontWeight: pathname === page.path ? 600 : 400,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: pathname === page.path ? "100%" : "0%",
                      height: "2px",
                      bottom: 0,
                      left: 0,
                      backgroundColor: theme.palette.primary.main,
                      transition: "width 0.3s ease-in-out",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {page.icon} {page.name}
                </Button>
              </motion.div>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <LightToggleButton isDark={theme.palette.mode === "dark"} onToggle={toggleTheme} />
            </motion.div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
