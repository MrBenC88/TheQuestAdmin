import React, { useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Text } from "@chakra-ui/react";
import styled from "styled-components";

const StyledHeatmap = styled(CalendarHeatmap)`
  .color-empty {
    fill: #ebedf0;
  }

  rect {
    width: 10px;
    height: 10px;
    rx: 2;
    ry: 2;
  }

  text {
    font-size: 10px;
  }

  .month-path {
    stroke: #aaa;
    stroke-width: 1;
  }
`;

const ProgressVisualization = ({ heatmapData, lineChartData }) => {
  const generateHeatmapGradient = (completed, failed) => {
    const total = completed + failed;
    const successRatio = completed / total;

    const red = Math.round(255 * (1 - successRatio));
    const green = Math.round(255 * successRatio);

    return `rgb(${red}, ${green}, 0)`;
  };

  useEffect(() => {
    for (let completed = 0; completed <= 10; completed++) {
      for (let failed = 0; failed <= 10; failed++) {
        const gradientColor = generateHeatmapGradient(completed, failed);
        const styleElement = document.createElement("style");
        styleElement.textContent = `.color-scale-${completed}-${failed} { fill: ${gradientColor}; }`;
        document.head.appendChild(styleElement);
      }
    }
  }, []);

  return (
    <Box pt="10%" boxSize="80%">
      <h2>Calendar Heatmap</h2>
      <StyledHeatmap
        startDate={
          new Date(new Date().getFullYear() - 1, new Date().getMonth() + 1)
        }
        endDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1)}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-scale-${value.completed}-${value.failed}`;
        }}
      />

      <h2>Line Chart</h2>
      <LineChart
        width={800}
        height={250}
        data={lineChartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="completed" stroke="#8884d8" />
        <Line type="monotone" dataKey="failed" stroke="#82ca9d" />
      </LineChart>
    </Box>
  );
};

export default ProgressVisualization;
