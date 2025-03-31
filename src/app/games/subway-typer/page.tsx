"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const words = [
  ["apple", "banana", "cherry"],
  ["dragon", "elephant", "flower"],
  ["guitar", "hammer", "island"],
  ["jacket", "knight", "lemon"],
  ["mango", "needle", "orange"],
  ["pencil", "queen", "rabbit"],
  ["sunset", "tiger", "umbrella"],
  ["violet", "window", "xylophone"],
  ["yellow", "zebra", "anchor"],
];

const OBSTACLE_TYPES = ["🌳", "🚂", "🪨", "🚧"];
const COIN = "🪙";
const PLAYER = "🏃";
const TRACK_WIDTH = 100;
const TRACK_HEIGHT = 400;
const CELL_HEIGHT = TRACK_HEIGHT / 20;

export default function SubwayTyper() {
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [playerPosition, setPlayerPosition] = useState(1);
  const [currentInput, setCurrentInput] = useState("");
  const [obstacles, setObstacles] = useState<
    Array<{ type: string; track: number; position: number }>
  >([]);
  const [coins, setCoins] = useState<Array<{ track: number; position: number }>>([]);

  useEffect(() => {
    if (!gameOver) {
      // Generate initial words
      const randomWordSet = words[Math.floor(Math.random() * words.length)];
      setCurrentWords(randomWordSet);

      // Generate obstacles
      const obstacleInterval = setInterval(() => {
        setObstacles((prev) => {
          const newObstacles = prev
            .map((obs) => ({ ...obs, position: obs.position + 1 }))
            .filter((obs) => obs.position < 20);

          // Only add new obstacle if there isn't one in the same track at position 0
          if (Math.random() < 0.3 && !newObstacles.some((obs) => obs.position === 0)) {
            newObstacles.push({
              type: OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)],
              track: Math.floor(Math.random() * 3),
              position: 0,
            });
          }

          return newObstacles;
        });

        // Generate coins
        setCoins((prev) => {
          const newCoins = prev
            .map((coin) => ({ ...coin, position: coin.position + 1 }))
            .filter((coin) => coin.position < 20);

          // Only add new coin if there isn't one in the same track at position 0
          if (Math.random() < 0.2 && !newCoins.some((coin) => coin.position === 0)) {
            newCoins.push({
              track: Math.floor(Math.random() * 3),
              position: 0,
            });
          }

          return newCoins;
        });

        // Check collisions
        const playerTrack = playerPosition;
        const playerRow = 19; // Player is at the bottom

        // Check obstacle collisions
        const hitObstacle = obstacles.some(
          (obs) => obs.track === playerTrack && obs.position === playerRow
        );

        // Check coin collections
        const collectedCoin = coins.some(
          (coin) => coin.track === playerTrack && coin.position === playerRow
        );

        if (hitObstacle) {
          setLives((prev) => {
            if (prev <= 1) {
              setGameOver(true);
              return 0;
            }
            return prev - 1;
          });
        }

        if (collectedCoin) {
          setScore((prev) => prev + 10);
          setCoins((prev) =>
            prev.filter((coin) => !(coin.track === playerTrack && coin.position === playerRow))
          );
        }

        // Add time-based points
        setScore((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(obstacleInterval);
    }
  }, [gameOver, playerPosition]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" && playerPosition > 0) {
      setPlayerPosition((prev) => prev - 1);
      setCurrentInput("");
    } else if (e.key === "ArrowRight" && playerPosition < 2) {
      setPlayerPosition((prev) => prev + 1);
      setCurrentInput("");
    } else {
      // Check if the key pressed matches any word's first letter
      const key = e.key.toLowerCase();
      const matchingWordIndex = currentWords.findIndex((word) => word.startsWith(key));
      if (matchingWordIndex !== -1) {
        setPlayerPosition(matchingWordIndex);
        setCurrentInput(key);
      } else if (currentInput) {
        // If we're already typing, append the key
        const newInput = currentInput + key;
        setCurrentInput(newInput);

        // Check if we've completed the word
        const currentWord = currentWords[playerPosition];
        if (newInput === currentWord) {
          setCurrentInput("");
          const randomWordSet = words[Math.floor(Math.random() * words.length)];
          setCurrentWords(randomWordSet);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playerPosition, currentWords, currentInput]);

  const handleRestart = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    setObstacles([]);
    setCoins([]);
    setPlayerPosition(1);
    setCurrentInput("");
    const randomWordSet = words[Math.floor(Math.random() * words.length)];
    setCurrentWords(randomWordSet);
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 8,
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
            Type the first letter to move to that track!
          </Typography>
        </motion.div>

        <Paper
          sx={{
            p: 4,
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            width: "100%",
            maxWidth: 800,
            textAlign: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h3">Score: {score}</Typography>
            <Typography variant="h3">Lives: {"❤️".repeat(lives)}</Typography>
          </Box>

          {gameOver ? (
            <Box>
              <Typography variant="h4" gutterBottom>
                Game Over!
              </Typography>
              <Button
                variant="contained"
                onClick={handleRestart}
                sx={{
                  background: "linear-gradient(45deg, #FF3366 30%, #6C63FF 90%)",
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(45deg, #FF3366 20%, #6C63FF 80%)",
                  },
                }}
              >
                Play Again
              </Button>
            </Box>
          ) : (
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                {currentWords.map((word, index) => (
                  <Typography
                    key={word}
                    variant="h4"
                    sx={{
                      color: playerPosition === index ? "#FF3366" : "inherit",
                      fontWeight: playerPosition === index ? 700 : 400,
                    }}
                  >
                    {word.split("").map((letter, letterIndex) => (
                      <span
                        key={letterIndex}
                        style={{
                          color:
                            playerPosition === index && letterIndex < currentInput.length
                              ? "#6C63FF"
                              : playerPosition === index
                                ? "#FF3366"
                                : "inherit",
                          fontWeight: playerPosition === index ? 700 : 400,
                        }}
                      >
                        {letter}
                      </span>
                    ))}
                  </Typography>
                ))}
              </Box>

              <Box
                sx={{
                  position: "relative",
                  height: TRACK_HEIGHT,
                  mb: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ position: "relative", width: TRACK_WIDTH * 3 }}>
                  {[0, 1, 2].map((track) => (
                    <Box
                      key={track}
                      sx={{
                        position: "absolute",
                        left: `${track * TRACK_WIDTH}px`,
                        width: `${TRACK_WIDTH}px`,
                        height: "100%",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {track === playerPosition && (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: "0",
                            fontSize: "2rem",
                            width: "100%",
                            textAlign: "center",
                            zIndex: 2,
                          }}
                        >
                          {PLAYER}
                        </Box>
                      )}
                      {obstacles
                        .filter((obs) => obs.track === track)
                        .map((obs, index) => (
                          <Box
                            key={index}
                            sx={{
                              position: "absolute",
                              top: `${obs.position * CELL_HEIGHT}px`,
                              fontSize: "2rem",
                              width: "100%",
                              textAlign: "center",
                              zIndex: 1,
                            }}
                          >
                            {obs.type}
                          </Box>
                        ))}
                      {coins
                        .filter((coin) => coin.track === track)
                        .map((coin, index) => (
                          <Box
                            key={index}
                            sx={{
                              position: "absolute",
                              top: `${coin.position * CELL_HEIGHT}px`,
                              fontSize: "2rem",
                              width: "100%",
                              textAlign: "center",
                              zIndex: 1,
                            }}
                          >
                            {COIN}
                          </Box>
                        ))}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </Layout>
  );
}
