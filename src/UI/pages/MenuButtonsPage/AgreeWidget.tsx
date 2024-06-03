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
import TextEditor from "../../components/TextAreaQuil.tsx";

export const AgreeWidget = () => {
  return (
    <Paper
      sx={{
        maxWidth: 400,
        margin: "0",
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
          color="text.primary"
          align="left"
          variant="h6"
        >
          Сообщение о согласии
        </Typography>
        <Tooltip
          title={"Сообщение о согласии на обработку персональных данных"}
        >
          <IconButton>
            <HelpIcon color="inherit" sx={{ display: "block" }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        style={{
          padding: "10px",
          height: "400px",
        }}
      >
        <TextEditor
          currentValue={
            '<p><b>раз</b> <i>два</i> <u>три</u> <s>четыре</s> <a href="https://sendpulse.com/knowledge-base/chatbot/telegram/format-text" rel="noopener noreferrer" target="_blank">пять</a></p>'
          }
          onChange={(value) => {
            console.log(value);
          }}
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
