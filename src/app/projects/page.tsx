"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import GenericCard, { fadeInUp } from "@/components/GenericCard";

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
    image: "/images/tandynhd-computer.png",
    technologies: ["Next.js", "TypeScript", "Material-UI"],
    link: "https://github.com/tandynhd/tandynhd-com",
  },
  {
    title: "Impressions.one",
    description: "Full-stack application with real-time features",
    image: "/images/impressions-one.png",
    technologies: ["React", "Node.js", "Socket.io"],
    link: "https://impressions.one",
  },
];

export default function Projects() {
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
            A collection of my recent work and side projects
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
            <GenericCard key={index} cardDetails={project} buttonText="View Project" />
          ))}
        </Box>
      </Box>
    </Layout>
  );
}
