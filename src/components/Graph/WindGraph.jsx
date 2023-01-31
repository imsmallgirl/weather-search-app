import React, { useContext } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { WeatherContext } from "../../WeatherProvider/WeatherProvider";
import {
  WiDirectionDown,
  WiDirectionDownLeft,
  WiDirectionDownRight,
  WiDirectionLeft,
  WiDirectionRight,
  WiDirectionUp,
  WiDirectionUpLeft,
  WiDirectionUpRight,
} from "react-icons/wi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

function WindDirection({ degree, ...props }) {
  switch (true) {
    case (337.5 <= degree && degree <= 360) || (0 <= degree && degree < 22.5):
      return <WiDirectionDown {...props} />;
    case 22.5 <= degree && degree < 67.5:
      return <WiDirectionDownLeft {...props} />;
    case 67.5 <= degree && degree < 112.5:
      return <WiDirectionLeft {...props} />;
    case 112.5 <= degree && degree < 157.5:
      return <WiDirectionUpLeft {...props} />;
    case 157.5 <= degree && degree < 202.5:
      return <WiDirectionUp {...props} />;
    case 202.5 <= degree && degree < 247.5:
      return <WiDirectionUpRight {...props} />;
    case 247.5 <= degree && degree < 292.5:
      return <WiDirectionRight {...props} />;
    case 292.5 <= degree && degree < 337.5:
      return <WiDirectionDownRight {...props} />;
    default:
      return;
  }
}

const formatXAxis = (data) => `${new Date(data * 1000).getHours()}시`;

const CustomizedContent = ({ value, x, y }) => {
  return <WindDirection degree={value} x={x + 5} y={y} fontSize={30} />;
};

const CustomizedLabel = ({ x, y, value }) => (
  <text x={x + 22} y={y} dy={-20} fontSize={15} textAnchor="middle" fill="#fff">
    {value}m/s
  </text>
);

const WindLineGraph = ({ num }) => {
  const { hour } = useContext(WeatherContext);
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={hour
            ?.slice(num * 12, (num + 1) * 12)
            .map(({ time_epoch, wind_degree }) => ({
              time_epoch,
              wind_degree,
            }))}
          margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="time_epoch"
            fontSize={15}
            tickFormatter={formatXAxis}
            stroke="#fff"
          />
          <Bar dataKey="wind_degree" label={<CustomizedLabel />} fill="#a5d3fb">
            <LabelList content={<CustomizedContent />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const WindGraph = () => {
  const slides = [];

  for (let i = 0; i < 2; i++) {
    slides.push(
      <SwiperSlide key={i}>
        <WindLineGraph num={i} />
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

export default WindGraph;
