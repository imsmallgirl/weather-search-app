import React, { useContext, useMemo, useRef, useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  OutlinedInput,
  useFormControl,
} from "@mui/material";
import { debounce } from "underscore";
import { WeatherContext } from "../../WeatherProvider/WeatherProvider";

function MyFormHelperText() {
  const { filled } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (!filled) {
      return "검색어를 입력하세요.";
    } else if (filled) {
      return "입력중입니다...";
    }
  }, [filled]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

const CountrySearch = () => {
  const [newLocation, setNewLocation] = useState("seoul");
  const { getLocationName } = useContext(WeatherContext);

  const handleChange = useMemo(
    () =>
      debounce((e) => {
        if (e.target.value === "") {
          return;
        } else {
          setNewLocation(e.target.value);
        }
      }, 200),
    [setNewLocation]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    getLocationName(newLocation);
  };

  return (
    <div className="search-country">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{ width: "50%" }}
      >
        <FormControl sx={{ width: "100%" }}>
          <OutlinedInput
            required
            placeholder="Please enter text"
            onChange={handleChange}
            fullWidth
            style={{ border: "none" }}
          />
          <MyFormHelperText />
        </FormControl>
      </Box>
    </div>
  );
};

export default CountrySearch;
