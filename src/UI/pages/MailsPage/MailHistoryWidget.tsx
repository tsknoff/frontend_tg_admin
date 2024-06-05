import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { InputBase, ListItemAvatar } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";

const mails = [
  {
    id: 1,
    title: "Brunch this weekend?",
    author: "Ali Connors",
    text: "I'll be in your neighborhood doing errands this…",
  },
  {
    id: 2,
    title: "Summer BBQ",
    author: "to Scott, Alex, Jennifer",
    text: "Wish I could come, but I'm out of town this…",
  },
  {
    id: 3,
    title: "Oui Oui",
    author: "Sandra Adams",
    text: "Do you have Paris recommendations? Have you ever…",
  },
  {
    id: 4,
    title: "Oui Oui",
    author: "Sandra Adams",
    text: "Do you have Paris recommendations? Have you ever…",
  },
  {
    id: 5,
    title: "Oui Oui",
    author: "Sandra Adams",
    text: "Do you have Paris recommendations? Have you ever…",
  },
  {
    id: 6,
    title: "Oui Oui",
    author: "Sandra Adams",
    text: "Do you have Paris recommendations? Have you ever…",
  },
  {
    id: 7,
    title: "Oui Oui",
    author: "Sandra Adams",
    text: "Do you have Paris recommendations? Have you ever…",
  },
  {
    id: 8,
    title: "Oui Oui",
    author: "Sandra Adams",
    text: "Do you have Paris recommendations? Have you ever…",
  },
  {
    id: 9,
    title: "Oui Oui",
    author: "Sandra Adams",
    text: "Do you have Paris recommendations? Have you ever…",
  },
  {
    id: 10,
    title: "Oui Oui",
    author: "Sandra Adams",
    text: "Do you have Paris recommendations? Have you ever…",
  },
  {
    id: 11,
    title: "Oui Oui",
    author: "Sandra Adams",
    text: "Do you have Paris recommendations? Have you ever…",
  },
];

export const MailHistoryWidget = () => {
  return (
    <Paper
      sx={{
        borderRadius: 0,
        flex: 1,
        maxWidth: 600,
        height: "100%",
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
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Поиск по истории рассылок"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Tooltip title={"История всех рассылок, отправленных из этой системы"}>
          <IconButton>
            <HelpIcon color="inherit" sx={{ display: "block" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <List
        sx={{
          maxWidth: 500,
          height: "calc(100vh - 150px)",
          overflowY: "scroll",
          bgcolor: "background.paper",
        }}
      >
        {mails.map((mail) => (
          <div key={mail.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={mail.title}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {mail.author}
                    </Typography>
                    {" — " + mail.text}
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </Paper>
  );
};
