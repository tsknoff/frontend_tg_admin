import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextEditor from "../../../components/TextEditor";
import { useAgreementWidgetStyles } from "./styles";
import { HeaderComponent } from "./HeaderComponent";
import { useAgreementViewModel } from "./useAgreementViewModel.ts";

export const AgreementWidget = () => {
  const { classes } = useAgreementWidgetStyles();
  const {
    message,
    status,
    draftMessage,
    handleChange,
    handleFetchAgreement,
    handleUpdateAgreement,
    clearFromPTags,
  } = useAgreementViewModel();

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
          onChange={handleChange}
          style={{ height: "calc(100% - 50px)" }}
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
                onClick={handleUpdateAgreement}
                variant="contained"
                sx={{ mr: 2 }}
                disabled={
                  status === "loading" ||
                  draftMessage === "<p><br></p>" ||
                  clearFromPTags(draftMessage) === message
                }
              >
                Сохранить
              </Button>
              <IconButton onClick={handleFetchAgreement}>
                <RefreshIcon color="inherit" sx={{ display: "block" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};
