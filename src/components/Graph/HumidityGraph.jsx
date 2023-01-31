import React, { useContext } from "react";
import { ResponsiveContainer, AreaChart, XAxis, Area, Tooltip } from "recharts";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { WeatherContext } from "../../WeatherProvider/WeatherProvider";

const formatXAxis = (data) => `${new Date(data * 1000).getHours()}시`;

const HumidityAreaChart = ({ num }) => {
  const { hour } = useContext(WeatherContext);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={hour
            ?.slice(num * 12, (num + 1) * 12)
            .map(({ time_epoch, humidity }) => ({
              time_epoch,
              humidity,
            }))}
          margin={{
            top: 50,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="time_epoch"
            fontSize={15}
            tickFormatter={formatXAxis}
            stroke="#fff"
          />
          <Tooltip />
          <Area type="monotone" dataKey="humidity" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const HumidityGraph = () => {
  const slides = [];

  for (let i = 0; i < 2; i++) {
    slides.push(
      <SwiperSlide key={i}>
        <HumidityAreaChart num={i} />
      </SwiperSlide>
    );
  }
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      style={{ marginTop: "50px" }}
    >
      {slides}
    </Swiper>
  );
};

export default HumidityGraph;
