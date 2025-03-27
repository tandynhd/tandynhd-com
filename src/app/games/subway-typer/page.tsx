"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const words = [
  "hello",
  "world",
  "coding",
  "game",
  "type",
  "fast",
  "quick",
  "learn",
  "react",
  "next",
  "typescript",
  "javascript",
  "python",
  "java",
  "swift",
  "html",
  "css",
  "node",
  "express",
  "mongodb",
  "sql",
  "git",
  "docker",
];

export default function SubwayTyper() {
  const [currentWord, setCurrentWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameOver]);

  useEffect(() => {
    if (!currentWord && !gameOver) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setCurrentWord(randomWord);
      setTimeLeft(5);
    }
  }, [currentWord, gameOver]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value === currentWord) {
      setScore((prev) => prev + 1);
      setInput("");
      setCurrentWord("");
    }
  };

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
    setInput("");
    setCurrentWord("");
    setTimeLeft(5);
    inputRef.current?.focus();
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          py: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "4rem",
              fontWeight: 700,
              background: "linear-gradient(45deg, #FF3366 30%, #6C63FF 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1rem",
            }}
          >
            Subway Typer
          </Typography>
          <Typography variant="h2" sx={{ color: "#B3B3B3" }}>
            Type the words before they disappear!
          </Typography>
        </motion.div>

        <Paper
          sx={{
            p: 4,
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            width: "100%",
            maxWidth: 600,
            textAlign: "center",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Score: {score}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Time Left: {timeLeft}s
          </Typography>

          {gameOver ? (
            <Box>
              <Typography variant="h4" gutterBottom>
                Game Over!
              </Typography>
              <Button
                variant="contained"
                onClick={handleRestart}
                sx={{
                  background:
                    "linear-gradient(45deg, #FF3366 30%, #6C63FF 90%)",
                  color: "white",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #FF3366 20%, #6C63FF 80%)",
                  },
                }}
              >
                Play Again
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography
                variant="h2"
                sx={{
                  marginBottom: "2rem",
                  color: timeLeft <= 2 ? "#FF3366" : "inherit",
                }}
              >
                {currentWord}
              </Typography>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                autoFocus
                style={{
                  width: "100%",
                  padding: "1rem",
                  fontSize: "1.5rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "4px",
                  color: "white",
                  outline: "none",
                }}
              />
            </Box>
          )}
        </Paper>
      </Box>
    </Layout>
  );
}
