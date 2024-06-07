import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HelpIcon from "@mui/icons-material/Help";
import TextEditor from "../../components/TextEditor";
import { FormControl, MenuItem, Select } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { ImageAttach } from "../../components/ImageAttach.tsx";

export const MailFormWidget = () => {
  const [age] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    console.log(selectedFile);
    setSelectedFile(file);
  };

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    console.log(event.target.value);
  };

  return (
    <Paper
      sx={{
        maxWidth: 500,
        margin: "auto",
        alignSelf: "flex-start",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "fit-content",
          backgroundImage: "url('assets/bg.webp')",
          backgroundSize: "300px",
          backgroundRepeat: "repeat",
          zIndex: 1,
        }}
      ></div>
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
          Сообщение участникам
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            size={"small"}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Group 1</MenuItem>
            <MenuItem value={20}>Group 2</MenuItem>
            <MenuItem value={30}>Group 3</MenuItem>
            <MenuItem value={40}>Group 4</MenuItem>
            <MenuItem value={50}>Group 5</MenuItem>
          </Select>
        </FormControl>
        {/*Выбор группы*/}
        <Tooltip
          title={"Сообщение будет отправлено всем участникам выбранной группы"}
        >
          <IconButton>
            <HelpIcon color="inherit" sx={{ display: "block" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        style={{
          padding: "10px",
          height: "250px",
        }}
      >
        <TextEditor
          loading={false}
          placeholder={"Сообщение участникам группы"}
          currentValue={""}
          style={{ height: "calc(100% - 50px)" }}
          onChange={() => {}}
        />
      </Box>
      <ImageAttach onFileChange={handleFileChange} />
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
            <Grid xs></Grid>
            <Grid item>
              <Tooltip title="Отправить сообщение">
                <Button variant="contained" sx={{ mr: 2 }}>
                  Отправить
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};
