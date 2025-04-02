"use client";

import { useState } from "react";
import { Box, Typography, Paper, Tabs, Tab } from "@mui/material";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const categories: Record<string, string[]> = {
  All: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "Flask",
    "GraphQL",
    "MongoDB",
    "AWS",
    "Google Cloud",
    "Firebase",
    "Supabase",
    "JavaScript",
    "Python",
    "C#",
    "C++",
    "Java",
    "SQL",
    "Docker",
    "UI/UX Design",
    "Responsive Design",
    "Web Design",
    "App Development",
    "Game Development",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing",
    "Augmented Reality",
    "Unity",
    "Unreal Engine",
    "Blender",
    "Maya",
    "3D Modeling",
    "3D Animation",
    "3D Rendering",
  ],
  "Web Development": [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "GraphQL",
    "MongoDB",
    "AWS",
  ],
  "Programming Languages": ["JavaScript", "Python", "C#", "C++", "Java", "SQL"],
  "Game Development": [
    "Unity",
    "Unreal Engine",
    "Blender",
    "Maya",
    "3D Modeling",
    "3D Animation",
    "3D Rendering",
  ],
  "AI/ML": ["Machine Learning", "Deep Learning", "Computer Vision", "Natural Language Processing"],
};

type CategoriesType = keyof typeof categories;

export default function AboutMe() {
  const [selectedCategory, setSelectedCategory] = useState<CategoriesType>("All");

  return (
    <Layout>
      <Box sx={{ minHeight: "100vh", py: 8 }}>
        <motion.div initial="initial" animate="animate" style={{ marginBottom: "2rem" }}>
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
            I like building things.
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            style={{ fontSize: "2rem", color: "#B3B3B3", marginBottom: "2rem" }}
          >
            Every good miner needs a diamond pickaxe, these are mine.
          </motion.h2>
        </motion.div>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Paper
            sx={{
              p: 4,
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography variant="h3" gutterBottom>
              Skills & Expertise (WIP)
            </Typography>
            <Tabs
              value={selectedCategory}
              onChange={(e, newValue: CategoriesType) => setSelectedCategory(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ marginBottom: 2 }}
            >
              {Object.keys(categories).map((category) => (
                <Tab key={category} label={category} value={category} />
              ))}
            </Tabs>
            <Box sx={{ position: "relative", width: "100%", height: 400, overflow: "hidden" }}>
              {categories[selectedCategory].map((skill) => (
                <motion.div
                  key={skill}
                  drag
                  dragConstraints={{ left: 0, right: 150, top: 0, bottom: 300 }} // Dragging within half width
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  initial={{
                    x: Math.random() * 150, // Random position within half the container width
                    y: Math.random() * 300, // Random position for vertical space
                  }}
                  dragElastic={0.2} // Reduced inertia
                  dragMomentum={false} // Disabled momentum
                  style={{ position: "absolute" }}
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
        </Box>
      </Box>
    </Layout>
  );
}
