import { css } from "catom";
export const desktopContainer = css({
  background: "var(--darker)",
  width: "85vw",
  height: "80vh",
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto",
  borderRadius: "20px",
  display: "grid",
  gridTemplateColumns: ".5fr 1fr",
  padding: "2rem",
});

export const mobileContainer = css({
  height: "95vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
