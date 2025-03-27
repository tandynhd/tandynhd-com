"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Image from "next/image";
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface Game {
  name: string;
  path: string;
  description: string;
  image: string;
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const theme = useTheme();

  useEffect(() => {
    // Fetch games from the API
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Error fetching games:", err));
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          style={{ marginBottom: "2rem" }}
        >
          <motion.h1
            variants={fadeInUp}
            style={{
              fontSize: "4rem",
              fontWeight: 700,
              background: "linear-gradient(45deg, #FF3366 30%, #6C63FF 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1rem",
            }}
          >
            Welcome to My Games
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            style={{
              fontSize: "2rem",
              color: theme.palette.text.secondary,
              marginBottom: "2rem",
            }}
          >
            A collection of fun and interactive web games
          </motion.h2>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          {games.map((game, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Paper
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)"
                  }`,
                  boxShadow:
                    theme.palette.mode === "dark" ? "none" : "0 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: 200,
                    mb: 2,
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <Image src={game.image} alt={game.name} fill style={{ objectFit: "cover" }} />
                </Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                  }}
                >
                  {game.name}
                </Typography>
                <Typography
                  color="text.secondary"
                  paragraph
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  {game.description}
                </Typography>
                <Box sx={{ mt: "auto" }}>
                  <Button
                    variant="contained"
                    href={game.path}
                    sx={{
                      background: "linear-gradient(45deg, #FF3366 30%, #6C63FF 90%)",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(45deg, #FF3366 20%, #6C63FF 80%)",
                      },
                    }}
                  >
                    Play Now
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Layout>
  );
}
