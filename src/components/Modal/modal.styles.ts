import { css } from "catom";

export const closeButton = css({
  position: "absolute",
  right: "0",
  top: "0",
});

export const modal = css({
  boxShadow: "var(--box-shadow)",
  background: "var(--skyblue)",
  width: "70%",
  maxWidth: "450px",
  padding: "2rem",
  borderRadius: "10px",
  animation: "scale_anim 0.1s linear",
  animationFillMode: "forwards",
  overflowY: "auto",position:"relative"
});
export const mask = css({
  height: "100vh",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  position: "fixed",
  width: "100vw",
  margin: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  zIndex: 5,
});

export const actionButton = css({
  display: "inline-flex",
  alignContent: "center",
  fontSize: "1.1rem",
  color: "white",
  background: "transparent",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  transition: "0.3s linear",
  pseudo: {
    ":hover": { background: "var(--current-alpha)" },
    ":focus": { background: "var(--current-alpha)" },
  },
});
