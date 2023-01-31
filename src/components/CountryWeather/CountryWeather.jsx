import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useCallback, useContext } from "react";
import { WeatherContext } from "../../WeatherProvider/WeatherProvider";
import CountrySearch from "./CountrySearch";
import { IoIosWater } from "react-icons/io";

const dayArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CountryWeather = () => {
  const { name, country, forecastday } = useContext(WeatherContext);

  const getWeatherWeek = useCallback((date) => {
    return new Date(date).getDay();
  }, []);

  return (
    <div className="country">
      <CountrySearch />
      <h2>
        {name} <span>{country}</span>
      </h2>
      <TableContainer style={{ marginTop: "30px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{ "td,th": { border: 0, fontSize: "18px", color: "#555" } }}
            >
              <TableCell>날짜</TableCell>
              <TableCell>습도</TableCell>
              <TableCell>날씨</TableCell>
              <TableCell>최저온도</TableCell>
              <TableCell>최고온도</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forecastday.map((fcd) => (
              <TableRow
                key={fcd.date_epoch}
                sx={{
                  "td,th": { border: 0, fontSize: "18px" },
                  th: { color: "#444", letterSpacing: "1px" },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {dayArray[getWeatherWeek(fcd.date)]}
                  <span style={{ fontSize: "14px" }}>{fcd.date}</span>
                </TableCell>
                <TableCell>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <IoIosWater style={{ color: "#4392ed" }} />
                    {fcd.day.avghumidity}%
                  </span>
                </TableCell>
                <TableCell>
                  <img
                    style={{ width: "50px" }}
                    src={fcd.day.condition.icon}
                    alt={fcd.day.condition.text}
                  />
                </TableCell>
                <TableCell>{fcd.day.mintemp_c}℃</TableCell>
                <TableCell>{fcd.day.maxtemp_c}℃</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CountryWeather;
