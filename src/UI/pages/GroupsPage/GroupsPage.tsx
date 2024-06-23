//@ts-nocheck
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store.ts";
import {
  addGroup,
  deleteGroup,
  fetchGroups,
  fetchGroupUsers,
  updateGroup,
  updateGroupUsers,
} from "../../../features/groups/groupsSlice.ts";
import * as XLSX from "xlsx";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const not = (a, b) => {
  return a.filter((value) => b.indexOf(value) === -1);
};

const intersection = (a, b) => {
  return a.filter((value) => b.indexOf(value) !== -1);
};

const union = (a, b) => {
  return [...a, ...not(b, a)];
};

const TransferList = ({
  left,
  right,
  checked,
  handleToggle,
  handleToggleAll,
  leftChecked,
  rightChecked,
  handleCheckedRight,
  handleCheckedLeft,
}) => {
  const customList = (title, items) => (
    <Paper
      sx={{
        width: "100%",
        height: "600px",
        marginTop: "10px",
        marginBottom: "10px",
        overflow: "auto",
      }}
    >
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value.id}-label`;

          return (
            <ListItem
              key={value.id}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={5}>
        <Typography variant="h6">In Group</Typography>
        {customList("Choices", left)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 1 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 1 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Typography variant="h6">All users</Typography>
        {customList("Chosen", right)}
      </Grid>
    </Grid>
  );
};

export const GroupsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { groups, status } = useSelector((state: RootState) => state.groups);
  const { groupUsersLoading } = useSelector((state: RootState) => state.groups);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [open, setOpen] = useState(false);
  const [openUsersDialog, setOpenUsersDialog] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [isGroupUpdated, setIsGroupUpdated] = useState(false); // New state to track group updates

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  useEffect(() => {
    if (selectedGroup) {
      dispatch(fetchGroupUsers(selectedGroup.id)).then((result) => {
        if (fetchGroupUsers.fulfilled.match(result)) {
          setLeft(result.payload.in);
          setRight(result.payload.out);
        }
      });
    }
  }, [dispatch, selectedGroup, isGroupUpdated, openUsersDialog]);

  const handleOpen = (group = null) => {
    if (group) {
      setSelectedGroup(group);
      setName(group.name);
      setColor(group.color);
    } else {
      setSelectedGroup(null);
      setName("");
      setColor("#000000");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (selectedGroup) {
      dispatch(updateGroup({ id: selectedGroup.id, name, color })).then(
        (result) => {
          if (updateGroup.fulfilled.match(result)) {
            setIsGroupUpdated(true); // Set the flag to true on successful update
          }
        },
      );
    } else {
      dispatch(addGroup({ name, color }));
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteGroup(id));
  };

  const handleOpenUsersDialog = (group) => {
    setSelectedGroup(group);
    setOpenUsersDialog(true);
  };

  const handleCloseUsersDialog = () => {
    setOpenUsersDialog(false);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleUpdateUsers = () => {
    dispatch(updateGroupUsers({ group_id: selectedGroup.id, users: left }));
    setOpenUsersDialog(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelUsers = XLSX.utils
        .sheet_to_json(worksheet, { header: 1 })
        .flat()
        .filter((id) => Number.isInteger(id))
        .map((id) => ({ id }));

      console.log(excelUsers);

      if (excelUsers.length > 0) {
        dispatch(
          updateGroupUsers({ group_id: selectedGroup.id, users: excelUsers }),
        ).then((result) => {
          if (updateGroupUsers.fulfilled.match(result)) {
            setOpenUsersDialog(false);
          } else {
            alert("Failed to update users from file");
          }
        });
      } else {
        alert("No valid user IDs found in the file");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Box
      style={{
        width: "100%",
        padding: "10px",
      }}
    >
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Group
      </Button>

      {status === "loading" || groupUsersLoading === "loading" ? (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            width: "100%",
          }}
        >
          {groups.map((group) => (
            <Box
              key={group.id}
              style={{
                border: "2px solid #F8F8F8",
                borderRadius: "5px",
                backgroundColor: "#fff",
                padding: "10px",
                width: "fit-content",
              }}
            >
              <h3>{group.name}</h3>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  height: "50px",
                }}
              >
                <Button
                  endIcon={<EditIcon />}
                  variant={"contained"}
                  onClick={() => handleOpenUsersDialog(group)}
                  style={{
                    textWrap: "nowrap",
                  }}
                >
                  Manage Users
                </Button>
                <Button
                  endIcon={<EditIcon />}
                  onClick={() => handleOpen(group)}
                >
                  Edit
                </Button>
                <Button
                  endIcon={<DeleteIcon />}
                  onClick={() => handleDelete(group.id)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedGroup ? "Edit Group" : "Add Group"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Color"
            fullWidth
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUsersDialog}
        onClose={handleCloseUsersDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Manage Users</DialogTitle>
        <DialogContent
          style={{
            padding: 0,
            width: "100%",
          }}
        >
          {groupUsersLoading === "loading" ? (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TransferList
                left={left}
                right={right}
                checked={checked}
                handleToggle={handleToggle}
                handleToggleAll={handleToggleAll}
                leftChecked={leftChecked}
                rightChecked={rightChecked}
                handleCheckedRight={handleCheckedRight}
                handleCheckedLeft={handleCheckedLeft}
              />
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  style={{
                    marginTop: "10px",
                  }}
                >
                  Import from excel
                  <input
                    type="file"
                    accept=".xls,.xlsx"
                    hidden
                    onChange={handleFileUpload}
                  />
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUsersDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUsers} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
