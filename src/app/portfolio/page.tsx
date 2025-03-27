"use client";

import { Box, Typography, Paper, Button } from "@mui/material";
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

const projects = [
  {
    title: "tandynhd.com",
    description: "A modern web application built with Next.js and TypeScript",
    image: "https://placehold.co/800x600",
    technologies: ["Next.js", "TypeScript", "Material-UI"],
    link: "https://github.com/tandynhd/tandynhd-com",
  },
  {
    title: "Impressions.one",
    description: "Full-stack application with real-time features",
    image: "https://placehold.co/800x600",
    technologies: ["React", "Node.js", "Socket.io"],
    link: "https://impressions.one",
  },
];

export default function Portfolio() {
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
            My Portfolio
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            style={{
              fontSize: "2rem",
              color: "#B3B3B3",
              marginBottom: "2rem",
            }}
          >
            A showcase of my recent work and side projects
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
          {projects.map((project, index) => (
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
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
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
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Typography variant="h5" gutterBottom>
                  {project.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                <Box sx={{ mt: "auto" }}>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    {project.technologies.map((tech) => (
                      <Paper
                        key={tech}
                        sx={{
                          px: 1,
                          py: 0.5,
                          background: "rgba(255, 255, 255, 0.1)",
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="caption">{tech}</Typography>
                      </Paper>
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      background: "linear-gradient(45deg, #FF3366 30%, #6C63FF 90%)",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(45deg, #FF3366 20%, #6C63FF 80%)",
                      },
                    }}
                  >
                    View Project
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
