import Box from "@mui/material/Box";
import { FC } from "react";
import TextEditor from "../../../components/TextEditor.tsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";

interface IEditButtonModal {
  buttonId: number;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "400px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column" as "column",
  gap: 2,
  pt: 2,
  px: 4,
  pb: 3,
};

export const EditButtonModal: FC<IEditButtonModal> = ({ buttonId }) => {
  return (
    <Box sx={{ ...style }}>
      <h2 id="parent-modal-title">Button {buttonId}</h2>
      <TextEditor
        loading={false}
        currentValue={""}
        placeholder="Сообщение которое будет отправлено, когда пользователь нажмет на кнопку"
        style={{ height: "calc(100% - 200px)" }}
        onChange={() => {}}
      />
      <AppBar
        position="relative"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid
            container
            alignItems="center"
            style={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <Grid item>
              <Button variant="contained" sx={{ mr: 2 }} disabled={true}>
                Сохранить
              </Button>
              <IconButton>
                <RefreshIcon color="inherit" sx={{ display: "block" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
