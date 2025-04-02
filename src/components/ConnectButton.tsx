import { Button, Tooltip } from "@mui/material";
import ContactPageIcon from "@mui/icons-material/ContactPage";

export default function ConnectButton() {
  return (
    <Tooltip title="Contact Me">
      <Button
        variant="contained"
        href="/about#contact-section"
        sx={{
          background: "linear-gradient(45deg, #FF3366 30%, #6C63FF 90%)",
          color: "white",
          "&:hover": {
            background: "linear-gradient(45deg, #FF3366 20%, #6C63FF 80%)",
            transform: "scale(1.05)",
          },
          transition: "transform 0.2s ease-in-out",
        }}
      >
        <ContactPageIcon />
      </Button>
    </Tooltip>
  );
}
