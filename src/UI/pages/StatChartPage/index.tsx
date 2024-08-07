import { BarChart } from "./BarChart.tsx";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store.ts";
import {
  fetchStatData,
  fetchUsersStatData,
} from "../../../features/stats/statSlice.ts";
import { CircularProgress } from "@mui/material";

export const StatChartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, usersData, status } = useSelector(
    (state: RootState) => state.stat,
  );

  useEffect(() => {
    dispatch(fetchStatData());
    dispatch(fetchUsersStatData());
  }, [dispatch]);

  if (!data || !usersData) {
    return null;
  }

  if (status === "loading") {
    return (
      <Box
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "60vw",
        gap: "2vw",
        padding: "20px",
      }}
    >
      {data && <BarChart data={data} />}
      {usersData && <BarChart data={usersData} />}
    </Box>
  );
};
