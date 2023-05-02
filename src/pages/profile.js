import DashboardHeader from "../components/DashboardHeader";
import ProgressVisualization from "../components/ProgressVisualization";
import Footer from "../components/Footer";

import { Box, Text } from "@chakra-ui/react";

const dailyQuestData = [
  { date: "2023-01-01", completed: 2, failed: 1 },
  { date: "2023-01-02", completed: 5, failed: 0 },
  { date: "2023-01-03", completed: 3, failed: 1 },
  { date: "2023-01-04", completed: 4, failed: 0 },
  { date: "2023-01-05", completed: 1, failed: 2 },
  { date: "2023-01-06", completed: 6, failed: 0 },
  { date: "2023-01-07", completed: 2, failed: 1 },
  { date: "2023-01-08", completed: 3, failed: 0 },
  { date: "2023-01-09", completed: 7, failed: 0 },
  { date: "2023-01-10", completed: 4, failed: 1 },
  { date: "2023-01-11", completed: 2, failed: 2 },
  { date: "2023-01-12", completed: 5, failed: 0 },
  { date: "2023-01-13", completed: 3, failed: 1 },
  { date: "2023-01-14", completed: 6, failed: 0 },
  { date: "2023-01-15", completed: 5, failed: 1 },
  { date: "2023-01-16", completed: 4, failed: 0 },
  { date: "2023-01-17", completed: 3, failed: 2 },
  { date: "2023-01-18", completed: 7, failed: 0 },
  { date: "2023-01-19", completed: 6, failed: 1 },
  { date: "2023-01-20", completed: 5, failed: 0 },
  { date: "2023-01-21", completed: 4, failed: 1 },
  { date: "2023-01-22", completed: 3, failed: 0 },
  { date: "2023-01-23", completed: 2, failed: 1 },
  { date: "2023-01-24", completed: 6, failed: 0 },
  { date: "2023-01-25", completed: 5, failed: 1 },
  { date: "2023-01-26", completed: 4, failed: 0 },
  { date: "2023-01-27", completed: 3, failed: 2 },
  { date: "2023-01-28", completed: 7, failed: 0 },
  { date: "2023-01-29", completed: 2, failed: 1 },
  { date: "2023-01-30", completed: 5, failed: 0 },
  { date: "2023-01-31", completed: 4, failed: 1 },
];

const heatmapData = dailyQuestData.map((data) => ({
  date: data.date,
  completed: data.completed,
  failed: data.failed,
}));

const lineChartData = dailyQuestData.map((data) => ({
  date: data.date,
  completed: data.completed,
  failed: data.failed,
}));

const Profile = () => {
  return (
    <Box boxSize="100%" bgColor="orange.50">
      <DashboardHeader />
      <Box boxSize="80%" align="center">
        <ProgressVisualization
          heatmapData={heatmapData}
          lineChartData={lineChartData}
        />
      </Box>

      <Footer />
    </Box>
  );
};

export default Profile;
