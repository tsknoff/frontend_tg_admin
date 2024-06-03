import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const ErrorPage = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        gap: "2rem",
      }}
    >
      <Box>
        <Typography variant="h5">
          Если вы видите эту страницу, значит что-то пошло не так.
        </Typography>
        <Typography variant="h5">
          Попробуйте обновить страницу или вернуться на{" "}
          <a>
            <a href="/">главную</a>
          </a>
          .
        </Typography>
      </Box>

      {/*Cute gif from https://giphy.com/gifs/404-error-page-5pBo4f8z8eZwKf1q3s*/}
      <img src="https://i.gifer.com/AfSJ.gif" alt="Page not found" />
    </Box>
  );
};
