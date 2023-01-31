import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WeatherGraph from "../Graph/WeatherGraph";
import "swiper/css";
import "swiper/css/navigation";
import HumidityGraph from "../Graph/HumidityGraph";
import WindGraph from "../Graph/WindGraph";

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const CurrentWeatherTab = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            style={{ marginTop: "30px" }}
            variant="fullWidth"
          >
            <Tab label="온도" />
            <Tab label="습도" />
            <Tab label="바람" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <WeatherGraph />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <HumidityGraph />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <WindGraph />
        </TabPanel>
      </Box>
    </div>
  );
};

export default CurrentWeatherTab;
