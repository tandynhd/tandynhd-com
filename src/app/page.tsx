"use client";

import { useEffect, useState } from "react";
import { Box, Button, Paper, TextField, Tooltip, Typography } from "@mui/material";
import Layout from "@/components/Layout";
import GenericCard, { fadeInUp } from "@/components/GenericCard";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
interface Game {
  title: string;
  link: string;
  description: string;
  image: string;
}

interface Greeting {
  text: string;
  lang: string;
}

const defaultGreetings: Greeting[] = [
  { text: "Hola", lang: "Spanish" },
  { text: "Hello", lang: "English" },
  { text: "Bonjour", lang: "French" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "안녕하세요", lang: "Korean" },
  { text: "Ciao", lang: "Italian" },
  { text: "Hallo", lang: "German" },
  { text: "Olá", lang: "Portuguese" },
  { text: "Merhaba", lang: "Turkish" },
  { text: "Привет", lang: "Russian" },
];

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [greetings, setGreetings] = useState<Greeting[]>(defaultGreetings);
  const [isAddingGreeting, setIsAddingGreeting] = useState(false);
  const [newGreeting, setNewGreeting] = useState({ text: "", lang: "" });

  const nextGreeting = () => {
    setCurrentGreeting((prev) => (prev + 1) % greetings.length);
  };

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Error fetching games:", err));

    // Load custom greetings from localStorage
    const savedGreetings = localStorage.getItem("customGreetings");
    if (savedGreetings) {
      setGreetings([...defaultGreetings, ...JSON.parse(savedGreetings)]);
    }
  }, []);

  useEffect(() => {
    if (greetings.length === 0) return;

    const interval = setInterval(() => {
      nextGreeting();
    }, 10000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [greetings.length]);

  const handleAddGreeting = () => {
    if (newGreeting.text && newGreeting.lang) {
      const updatedGreetings = [...greetings, newGreeting];
      setGreetings(updatedGreetings);
      localStorage.setItem(
        "customGreetings",
        JSON.stringify([...greetings.slice(defaultGreetings.length), newGreeting])
      );
      setNewGreeting({ text: "", lang: "" });
      setIsAddingGreeting(false);
    }
  };

  return (
    <>
      {isAddingGreeting && (
        <>
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(5px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsAddingGreeting(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
              width: "100vw",
              height: "100vh",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: "20%",
              left: "40%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              width: "90%",
              maxWidth: "500px",
            }}
          >
            <Paper
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                maxHeight: "60vh",
                overflow: "hidden",
              }}
            >
              <Box sx={{ flexShrink: 0 }}>
                <h3 style={{ marginBottom: "1rem", fontWeight: 600, color: "white" }}>
                  Add Your Greeting
                </h3>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <TextField
                    label="Greeting"
                    placeholder="Enter your greeting"
                    required
                    value={newGreeting.text}
                    onChange={(e) => setNewGreeting({ ...newGreeting, text: e.target.value })}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.2)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.3)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                        "&.Mui-focused": {
                          color: "rgba(255, 255, 255, 0.9)",
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Language"
                    placeholder="Enter language name"
                    required
                    value={newGreeting.lang}
                    onChange={(e) => setNewGreeting({ ...newGreeting, lang: e.target.value })}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.2)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.3)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                        "&.Mui-focused": {
                          color: "rgba(255, 255, 255, 0.9)",
                        },
                      },
                    }}
                  />
                  <Box sx={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                    <Button
                      onClick={() => setIsAddingGreeting(false)}
                      sx={{
                        color: "white",
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddGreeting}
                      variant="contained"
                      sx={{
                        background: "white",
                        color: "#6C63FF",
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.9)",
                        },
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
              </Box>

              {/* Custom Greetings List */}
              <Box
                sx={{
                  mt: 3,
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  pt: 2,
                  flex: 1,
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "4px",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.3)",
                    },
                  },
                }}
              >
                <h4 style={{ marginBottom: "1rem", fontWeight: 600, color: "white" }}>
                  Custom Greetings
                </h4>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {greetings.slice(defaultGreetings.length).map((greeting, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          "&:hover": {
                            background: "rgba(255, 255, 255, 0.08)",
                          },
                        }}
                      >
                        <Box>
                          <Typography sx={{ color: "white", fontWeight: 500 }}>
                            {greeting.text}
                          </Typography>
                          <Typography
                            sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.875rem" }}
                          >
                            {greeting.lang}
                          </Typography>
                        </Box>
                        <Button
                          onClick={() => {
                            const updatedGreetings = greetings.filter(
                              (_, i) => i !== index + defaultGreetings.length
                            );
                            setGreetings(updatedGreetings);
                            localStorage.setItem(
                              "customGreetings",
                              JSON.stringify(updatedGreetings.slice(defaultGreetings.length))
                            );
                          }}
                          sx={{
                            color: "#ff4444",
                            "&:hover": {
                              background: "rgba(255, 68, 68, 0.1)",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </Paper>
                    </motion.div>
                  ))}
                  {greetings.length === defaultGreetings.length && (
                    <Typography sx={{ color: "rgba(255, 255, 255, 0.5)", textAlign: "center" }}>
                      No custom greetings yet
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </>
      )}
      <Layout>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <motion.div initial="initial" animate="animate" style={{ marginBottom: "2rem" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                marginBottom: "1rem",
                overflow: "hidden",
              }}
            >
              {greetings.length > 0 && (
                <motion.h1
                  key={currentGreeting}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    fontSize: "4rem",
                    fontWeight: 700,
                    background: "linear-gradient(45deg, #FF3366 30%, #6C63FF 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: "1rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  onClick={nextGreeting}
                >
                  {greetings[currentGreeting].text}
                </motion.h1>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  marginBottom: "1rem",
                }}
              >
                {greetings.length > 0 && (
                  <motion.span
                    key={currentGreeting}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "rgba(108, 99, 255, 0.1)",
                      borderRadius: "2rem",
                      fontSize: "0.9rem",
                      color: "#6C63FF",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {greetings[currentGreeting].lang}
                  </motion.span>
                )}
                <Tooltip title="Add a custom greeting">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAddingGreeting(true)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#6C63FF",
                      fontSize: "1.5rem",
                      padding: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    +
                  </motion.button>
                </Tooltip>
              </Box>
            </Box>
            <motion.h2
              variants={fadeInUp}
              style={{
                fontSize: "1.2rem",
                color: "#B3B3B3",
                marginBottom: "2rem",
                fontStyle: "italic",
              }}
            >
              Have fun exploring!
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
              <GenericCard key={index} cardDetails={game} />
            ))}
          </Box>
        </Box>
      </Layout>
    </>
  );
}
