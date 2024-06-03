import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HelpIcon from "@mui/icons-material/Help";
import TextField from "@mui/material/TextField";

export const GreetingWidget = () => {
  return (
    <Paper
      sx={{
        maxWidth: 380,
        margin: "0",
        overflow: "hidden",
        alignSelf: "flex-start",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Typography
          sx={{ my: 1, mx: 2 }}
          color="text.secondary"
          align="left"
          variant="h6"
        >
          Привественное сообщение
        </Typography>
        <Tooltip
          title={
            "Приветственное сообщение, которое будет отправлено новым пользователям. \n"
          }
        >
          <IconButton>
            <HelpIcon color="inherit" sx={{ display: "block" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <TextField
        placeholder="Привет! Я бот-помощник. Чем могу помочь?"
        multiline
        rows={10}
        rowsMax={Infinity}
        defaultValue="Привет! Данный бот предназначен для помощи вам в использовании нашего сервиса. Чем могу помочь?"
        style={{
          padding: "10px",
          width: "100%",
        }}
      />

      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <Grid item>
              <Tooltip title="Сохранить новое приветственное сообщение">
                <Button variant="contained" sx={{ mr: 2 }}>
                  Сохранить
                </Button>
              </Tooltip>
              <IconButton>
                <RefreshIcon color="inherit" sx={{ display: "block" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};
