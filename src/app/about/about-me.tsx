"use client";

import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

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

export default function AboutMe() {
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
            About Me
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            style={{
              fontSize: "2rem",
              color: "#B3B3B3",
              marginBottom: "2rem",
            }}
          >
            Passionate about creating beautiful and functional web experiences
          </motion.h2>
        </motion.div>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
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
                My Story
              </Typography>
              <Typography color="text.secondary" paragraph>
                I&apos;m a passionate developer with a keen eye for design and a love for creating
                seamless user experiences. With years of experience in web development, I specialize
                in building modern, responsive, and performant applications that make a difference.
              </Typography>
            </Paper>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
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
                Skills & Expertise
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "MongoDB",
                  "GraphQL",
                  "AWS",
                  "Docker",
                  "UI/UX Design",
                  "Responsive Design",
                ].map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Paper
                      sx={{
                        px: 2,
                        py: 1,
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: 2,
                      }}
                    >
                      <Typography>{skill}</Typography>
                    </Paper>
                  </motion.div>
                ))}
              </Box>
            </Paper>
          </motion.div>
        </Box>
      </Box>
    </Layout>
  );
}
