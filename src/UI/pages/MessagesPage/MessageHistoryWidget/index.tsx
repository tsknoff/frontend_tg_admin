import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  List,
  InputBase,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Snackbar,
  Alert,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store.ts";
import {
  fetchMessages,
  deleteMessage,
  IMessage,
} from "../../../../features/messages/messagesSlice.ts";
import { useMessageHistoryWidgetStyles } from "./styles.ts";
import ListItemButton from "@mui/material/ListItemButton";

export const MessageHistoryWidget = () => {
  const { classes } = useMessageHistoryWidgetStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { messages, status, deleteStatus } = useSelector(
    (state: RootState) => state.messages,
  );

  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMessages, setFilteredMessages] = useState(messages);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMessages());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      setFilteredMessages(
        messages.filter((message) => {
          const matchesSearchTerm = (message.text || "")
            .toLowerCase()
            .includes((searchTerm || "").toLowerCase());
          const matchesGroup =
            selectedGroup === "" || message.group_name === selectedGroup;
          return matchesSearchTerm && matchesGroup;
        }),
      );
    }
  }, [messages, searchTerm, selectedGroup]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleGroupChange = (event: SelectChangeEvent<string>) => {
    setSelectedGroup(event.target.value);
  };

  const handleDelete = (messageId: number) => {
    dispatch(deleteMessage(messageId)).then(() => {
      setSelectedMessage(null);
      setSnackbarMessage("Сообщение успешно удалено");
      setSnackbarOpen(true);
    });
  };

  const handleOpenDialog = (message: IMessage) => {
    setSelectedMessage(message);
  };

  const handleCloseDialog = () => {
    setSelectedMessage(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const uniqueGroups = Array.from(
    new Set(messages.map((message) => message.group_name)),
  );

  return (
    <Paper
      style={{
        width: "100%",
      }}
    >
      <Box className={classes.searchWrapper}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            margin: "10px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Поиск по истории рассылок"
            inputProps={{ "aria-label": "search messages" }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel id="group-select-label">Группа</InputLabel>
          <Select
            labelId="group-select-label"
            value={selectedGroup}
            onChange={handleGroupChange}
            sx={{ maxWidth: 150 }}
            label="Группа"
          >
            <MenuItem value="">
              <em>Все группы</em>
            </MenuItem>
            {uniqueGroups.map((group, index) => (
              <MenuItem key={group + index} value={group}>
                {group}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title={"История всех рассылок, отправленных из этой системы"}>
          <IconButton>
            <HelpIcon color="inherit" sx={{ display: "block" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <List className={classes.list}>
        {status === "loading" ? (
          <CircularProgress
            sx={{ position: "absolute", top: "50%", left: "50%" }}
          />
        ) : (
          filteredMessages.map((message) => (
            <div key={message.id}>
              <ListItemButton
                alignItems="flex-start"
                onClick={() => handleOpenDialog(message)}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={message.author}
                    src="/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={message.group_name}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {message.button_name && message.button_name}
                      </Typography>
                      {" — " + message.text}
                    </>
                  }
                />
              </ListItemButton>
              <Divider variant="inset" component="li" />
            </div>
          ))
        )}
      </List>
      <Dialog open={!!selectedMessage} onClose={handleCloseDialog}>
        {selectedMessage && (
          <>
            <DialogTitle>Подробная информация</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography variant="body1">
                  Группа: {selectedMessage.group_name}
                </Typography>
                <br />
                <Typography variant="body1">
                  Текст: {selectedMessage.text}
                </Typography>
                <br />
                {selectedMessage.button_url && (
                  <Typography variant="body1">
                    Текст кнопки: {selectedMessage.button_name}
                    <br />
                    Ссылка: {selectedMessage.button_url}
                  </Typography>
                )}
                <br />
                <Typography variant="body1">
                  {selectedMessage.author}, {selectedMessage.datetime}
                </Typography>
                {selectedMessage.file_url && (
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <img
                      src={selectedMessage.file_url}
                      alt="file"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "300px",
                        alignSelf: "center",
                      }}
                    />
                  </Box>
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Закрыть
              </Button>
              <Button
                onClick={() => handleDelete(selectedMessage.id)}
                variant={"contained"}
                disabled={deleteStatus === "loading"}
              >
                {deleteStatus === "loading" ? (
                  <CircularProgress size={24} />
                ) : (
                  "Удалить"
                )}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
