import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextEditor from "../../../components/TextEditor.tsx";
import { useAgreeWidgetStyles } from "./styles.ts";
import { HeaderComponent } from "./HeaderComponent.tsx";
import { useGreetingViewModel } from "./useGreetingViewModel.ts";

export const AgreeWidget = () => {
  const { classes } = useAgreeWidgetStyles();
  const {
    message,
    status,
    newMessage,
    setNewMessage,
    handleUpdateGreeting,
    handleFetchGreeting,
  } = useGreetingViewModel();

  return (
    <Paper
      sx={{
        maxWidth: 400,
        margin: "0",
        alignSelf: "flex-start",
      }}
    >
      <HeaderComponent />
      <Box className={classes.textEditorWrapper}>
        <TextEditor
          loading={status === "loading"}
          currentValue={message}
          onChange={setNewMessage}
        />
      </Box>

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
                <Button
                  onClick={handleUpdateGreeting}
                  variant="contained"
                  sx={{ mr: 2 }}
                  disabled={
                    status === "loading" ||
                    newMessage === "<p><br></p>" ||
                    newMessage === message
                  }
                >
                  Сохранить
                </Button>
              </Tooltip>
              <IconButton onClick={handleFetchGreeting}>
                <RefreshIcon color="inherit" sx={{ display: "block" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};
