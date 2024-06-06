import { BarChart } from "./BarChart.tsx";
import Box from "@mui/material/Box";

export const StatChartPage = () => {
  return (
    <Box
      style={{
        padding: "20px",
      }}
    >
      <BarChart />
      <BarChart />
    </Box>
  );
};
