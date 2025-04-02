import { Button } from "@mui/material";
import ContactPageIcon from "@mui/icons-material/ContactPage";

export default function ConnectButton() {
  return (
    <Button
      variant="contained"
      startIcon={<ContactPageIcon />}
      onClick={() => (window.location.href = "/about#contact-section")}
      sx={{
        display: { xs: "none", md: "flex" },
        background: "linear-gradient(45deg, #FF3366 30%, #6C63FF 90%)",
        color: "white",
        padding: "8px 24px",
        "&:hover": {
          background: "linear-gradient(45deg, #FF3366 20%, #6C63FF 80%)",
          transform: "scale(1.05)",
        },
        transition: "all 0.3s ease-in-out",
      }}
    >
      Contact Me
    </Button>
  );
}
