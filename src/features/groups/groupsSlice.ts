import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Group {
  id: string;
  name: string;
  color: string;
  author: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
}

export interface GroupState {
  groups: Group[];
  groupUsers: { in: User[]; out: User[] };
  status: "idle" | "loading" | "succeeded" | "failed";
  groupUsersLoading?: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  groupUsers: { in: [], out: [] },
  status: "idle",
  error: null,
};

export const fetchGroups = createAsyncThunk("groups/fetchGroups", async () => {
  const response = await axios.get(
    "https://nse-work.ru/test/ssb/api/groups.php",
  );
  return response.data.data;
});

export const addGroup = createAsyncThunk(
  "groups/addGroup",
  async (group: Partial<Group>) => {
    const response = await axios.post(
      "https://nse-work.ru/test/ssb/api/groups.php",
      group,
    );
    return response.data.data;
  },
);

export const updateGroup = createAsyncThunk(
  "groups/updateGroup",
  async (group: Partial<Group>) => {
    const response = await axios.patch(
      "https://nse-work.ru/test/ssb/api/groups.php",
      group,
    );
    return response.data.data;
  },
);

export const deleteGroup = createAsyncThunk(
  "groups/deleteGroup",
  async (id: string) => {
    const response = await axios.delete(
      "https://nse-work.ru/test/ssb/api/groups.php",
      { data: { id } },
    );
    return response.data.data;
  },
);

export const fetchGroupUsers = createAsyncThunk(
  "groups/fetchGroupUsers",
  async (groupId: string) => {
    const response = await axios.get(
      `https://nse-work.ru/test/ssb/api/userGroups.php?id=${groupId}`,
    );
    return response.data.data;
  },
);

export const updateGroupUsers = createAsyncThunk(
  "groups/updateGroupUsers",
  async (data: { group_id: string; users: User[] }) => {
    const response = await axios.post(
      "https://nse-work.ru/test/ssb/api/userGroups.php",
      {
        group_id: data.group_id,
        users: data.users.map((user) => user.id),
      },
    );
    return response.data.data;
  },
);

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchGroups.fulfilled,
        (state, action: PayloadAction<Group[]>) => {
          state.status = "succeeded";
          state.groups = action.payload;
        },
      )
      .addCase(fetchGroups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(addGroup.fulfilled, (state, action: PayloadAction<Group[]>) => {
        state.groups = action.payload;
      })
      .addCase(
        updateGroup.fulfilled,
        (state, action: PayloadAction<Group[]>) => {
          state.groups = action.payload;
        },
      )
      .addCase(
        deleteGroup.fulfilled,
        (state, action: PayloadAction<Group[]>) => {
          state.groups = action.payload;
        },
      )
      .addCase(fetchGroupUsers.pending, (state) => {
        state.groupUsersLoading = "loading";
      })
      .addCase(
        fetchGroupUsers.fulfilled,
        (state, action: PayloadAction<{ in: User[]; out: User[] }>) => {
          state.groupUsers = action.payload;
          state.groupUsersLoading = "succeeded";
        },
      )
      .addCase(
        updateGroupUsers.fulfilled,
        (state, action: PayloadAction<{ in: User[]; out: User[] }>) => {
          state.groupUsers = action.payload;
        },
      );
  },
});

export default groupsSlice.reducer;

// {id: 141551874, name: "Sergey Nyusha", username: "Oleg Ivano"}
// {id: 141551875, name: "Ivan Pretrov", username: "Ivan Petrov"}
// {id: 141551876, name: "Petr Ivanov", username: "Petr Ivanov"}
// {id: 141551877, name: "Ivan Petrov", username: "Ivan Petrov"}
// {id: 141551878, name: "Petr Ivanov", username: "Petr Ivanov"}
// {id: 141551879, name: "Ivan Petrov", username: "Ivan Petrov"}
// {id: 141551880, name: "Petr Ivanov", username: "Petr Ivanov"}
// {id: 141551881, name: "Ivan Petrov", username: "Ivan Petrov"}
// {id: 141551882, name: "Petr Ivanov", username: "Petr Ivanov"}
// {id: 141551883, name: "Ivan Petrov", username: "Ivan Petrov"}
// {id: 141551884, name: "Petr Ivanov", username: "Petr Ivanov"}
// {id: 141551885, name: "Ivan Petrov", username: "Ivan Petrov"}
// {id: 141551886, name: "Petr Ivanov", username: "Petr Ivanov"}
// {id: 141551887, name: "Ivan Petrov", username: "Ivan Petrov"}
// {id: 141551888, name: "Petr Ivanov", username: "Petr Ivanov"}
// {id: 141551889, name: "Ivan Petrov", username: "Ivan Petrov"}
// {id: 141551890, name: "Petr Ivanov", username: "Petr Ivanov"}
// {id: 141551891, name: "Ivan Petrov", username: "Ivan Petrov"}
