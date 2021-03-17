import { css } from "catom";

export const bold = css({ fontWeight: "bold" });
export const grey = css({ color: "grey" });

export const spacerText = css({ fontSize: "1.5rem", cursor: "pointer" });

export const container = css({
  paddingLeft: "2rem",
  paddingRight: "2rem",
  margin: "1rem",
  display: "flex",
  flexDirection: "column",
});

export const spacer = css({ marginLeft: "5px", marginRight: "5px" });

export const scrollableFlexContainer = css({
  flex: "1 1 auto",
  height: "0px",
  overflowY: "auto",
});
export const userListBox = [
  css({
    padding: "1rem",
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    borderRadius: "20px",
    background: "var(--dark)",
    marginTop: ".5rem",
  }),
  scrollableFlexContainer,
];

export const usersWrap = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
});

export const circle = css({
  height: "3rem",
  width: "3rem",
  borderRadius: "50%",
  background: "white",
});

export const personWrap = css({
  margin: "10px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  cursor: "pointer",
});

export const fetchButton = css({
  borderRadius: "50px",
  backgroundColor: "var(--skyblue)",
  padding: "12px 24px",
  margin: "10px",
  color: "white",
  transition: "0.3s linear",
  pseudo: {
    ":hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 11px 4px rgb(0 0 0 / 30%), 0 15px 12px rgb(0 0 0 / 22%)",
    },
  },
});
