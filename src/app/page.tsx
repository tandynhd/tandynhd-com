"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Layout from "@/components/Layout";
import GenericCard from "@/components/GenericCard";

interface Game {
  title: string;
  link: string;
  description: string;
  image: string;
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
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
            <GenericCard key={index} cardDetails={game} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
}
