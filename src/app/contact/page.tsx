"use client";

import { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";

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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <Layout>
      <Box sx={{ minHeight: "100vh", py: 8 }}>
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
            Get in Touch
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            style={{
              fontSize: "2rem",
              color: "#B3B3B3",
              marginBottom: "2rem",
            }}
          >
            Let&apos;s work together on something amazing
          </motion.h2>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <motion.div variants={fadeInUp} initial="initial" animate="animate" style={{ flex: 1 }}>
            <Paper
              sx={{
                p: 4,
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Typography variant="h3" gutterBottom>
                Contact Form
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "text.secondary",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "text.secondary",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  margin="normal"
                  multiline
                  rows={4}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "text.secondary",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    background: "linear-gradient(45deg, #FF3366 30%, #6C63FF 90%)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #FF3366 50%, #6C63FF 100%)",
                    },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Paper>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            style={{ width: "300px" }}
          >
            <Paper
              sx={{
                p: 4,
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Typography variant="h3" gutterBottom>
                Connect With Me
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
                <Button
                  startIcon={<GitHubIcon />}
                  variant="outlined"
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    color: "text.primary",
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.main",
                    },
                  }}
                >
                  GitHub
                </Button>
                <Button
                  startIcon={<LinkedInIcon />}
                  variant="outlined"
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    color: "text.primary",
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.main",
                    },
                  }}
                >
                  LinkedIn
                </Button>
                <Button
                  startIcon={<TwitterIcon />}
                  variant="outlined"
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    color: "text.primary",
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.main",
                    },
                  }}
                >
                  Twitter
                </Button>
                <Button
                  startIcon={<EmailIcon />}
                  variant="outlined"
                  href="mailto:your.email@example.com"
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    color: "text.primary",
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.main",
                    },
                  }}
                >
                  Email
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Box>
      </Box>
    </Layout>
  );
}
