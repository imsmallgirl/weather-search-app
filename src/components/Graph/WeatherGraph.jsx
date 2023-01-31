import React, { useContext } from "react";
import {
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { WeatherContext } from "../../WeatherProvider/WeatherProvider";

const formatXAxis = (data) => `${new Date(data * 1000).getHours()}시`;

const CustomizedDot = ({ payload, cx, cy }) => {
  return (
    <image
      x={cx - 20}
      y={cy - 20}
      width={40}
      height={40}
      xlinkHref={payload.icon}
      alt={payload.text}
    />
  );
};

const CustomizedLabel = ({ x, y, value }) => (
  <text x={x} y={y} dy={-20} fontSize={15} textAnchor="middle" fill="#fff">
    {value}°
  </text>
);

const LineGraph = ({ num }) => {
  const { hour } = useContext(WeatherContext);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={hour
            ?.slice(num * 12, (num + 1) * 12)
            .map(({ time_epoch, temp_c, condition }) => ({
              time_epoch,
              temp_c,
              icon: condition.icon,
              text: condition.text,
            }))}
          margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="time_epoch"
            fontSize={15}
            tickFormatter={formatXAxis}
            stroke="#fff"
          />
          <Line
            dataKey="temp_c"
            stroke="#fff"
            strokeWidth={2}
            dot={<CustomizedDot />}
          >
            <LabelList content={<CustomizedLabel />} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const WeatherGraph = () => {
  const slides = [];

  for (let i = 0; i < 2; i++) {
    slides.push(
      <SwiperSlide key={i}>
        <LineGraph num={i} />
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

export default WeatherGraph;
