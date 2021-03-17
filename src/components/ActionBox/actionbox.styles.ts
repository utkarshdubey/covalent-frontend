import { css } from "catom";
export const actionBox = css({
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  background: "var(--dark)",
  borderRadius: "20px",
});

export const branding = css({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  fontSize: "2rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "4px",
});

export const actionButton = css({
  width: "95%",
  padding: "1rem",
  borderRadius: "100px",
  color: "#242424",
  fontWeight: "bold",
  marginTop: "10px",
  marginBottom: "10px",
});

export const addPerson = [actionButton, css({ background: "var(--skyblue)" })];
export const addRelation = [actionButton, css({ background: "white" })];
