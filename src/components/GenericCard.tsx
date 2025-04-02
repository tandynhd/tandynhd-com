import { Paper, Typography, Box } from "@mui/material";
import Image from "next/image";

import { motion } from "framer-motion";

interface CardDetails {
  title: string;
  description: string;
  link: string;
  image: string;
  technologies?: string[];
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function GenericCard({
  cardDetails,
  newPage = false,
}: {
  key: number;
  cardDetails: CardDetails;
  newPage?: boolean;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={() => window.open(cardDetails.link, newPage ? "_blank" : "_self")}
      style={{ cursor: "pointer" }}
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
            src={cardDetails.image}
            alt={cardDetails.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Typography variant="h5" gutterBottom>
          {cardDetails.title}
        </Typography>
        <Typography color="text.secondary" paragraph>
          {cardDetails.description}
        </Typography>
        <Box sx={{ mt: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {cardDetails.technologies?.map((tech: string) => (
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
        </Box>
      </Paper>
    </motion.div>
  );
}
