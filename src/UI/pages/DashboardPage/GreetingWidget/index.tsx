import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextEditor from "../../../components/TextEditor";
import { useGreetingWidgetStyles } from "./styles";
import { HeaderComponent } from "./HeaderComponent";
import { useGreetingActions, useGreetingState } from "./hooks";
import { useTextEditor } from "../../../components/TextEditor/useTextEditor.ts";
import { useEffect } from "react";

export const GreetingWidget = () => {
  const { classes } = useGreetingWidgetStyles();

  const { message, status } = useGreetingState();
  const { fetchGreetingData, updateGreetingData } = useGreetingActions();

  const { draftMessage, setDraftMessage, handleChange, clearFromPTags } =
    useTextEditor(message);

  useEffect(() => {
    if (status === "idle") {
      fetchGreetingData();
    }
  }, [status, fetchGreetingData]);

  useEffect(() => {
    setDraftMessage(message);
  }, [message, setDraftMessage, status]);

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
          currentValue={draftMessage}
          style={{ height: "calc(100% - 50px)" }}
          onChange={handleChange}
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
              <Button
                onClick={() => updateGreetingData(clearFromPTags(draftMessage))}
                variant={"contained"}
                sx={{ mr: 2 }}
                disabled={
                  status === "loading" ||
                  draftMessage === "<p><br></p>" ||
                  clearFromPTags(draftMessage) === message
                }
              >
                Сохранить
              </Button>
              <IconButton onClick={fetchGreetingData}>
                <RefreshIcon color="inherit" sx={{ display: "block" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};
