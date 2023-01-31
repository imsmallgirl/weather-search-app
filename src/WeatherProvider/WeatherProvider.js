import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { useGeoLocation } from "../lib/useGeoLocation";

export const WeatherContext = createContext({});
// export const Location = createContext

const WeatherProvider = ({ children }) => {
    const [weatherInfo, setWeatherInfo] = useState({});
    const [locationName, setLocationName] = useState("seoul");
    const [searchInfo, setSearchInfo] = useState({})
    const currentLocation = useGeoLocation();

    const getLocationName = useCallback((value) => {
        setLocationName(value)
    },[setLocationName])

    const searchWeatherInfo = async () => {
        try{
            const searchWeather = axios.get(`http://api.weatherapi.com/v1/forecast.json?key=67c93a63bb57419eadf60020233001&days=7&q=${locationName}&aqi=yes`).then((res) => res.data)

            const {forecast, location} = await searchWeather;
            const {name, country} = location
            const forecastday = forecast.forecastday

            setSearchInfo({
                name,
                country,
                forecastday
            })

        }catch(error){
            console.log(error)
        }
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getWeatherInfo = async() => {
        try{
            const hourlyWeatherInfo = axios.get(`http://api.weatherapi.com/v1/forecast.json?key=67c93a63bb57419eadf60020233001&q=${currentLocation.coordinates.lat},${currentLocation.coordinates.lon}&aqi=yes`).then((res) => res.data)

            const {
                current : { 
                    temp_c, // 온도
                    feelslike_c, // 체감온도
                    humidity, //습기 
                    condition : { text, icon }, // 날씨 상태
                    wind_degree, // 바람 방향
                    wind_kph // 바람세기 (킬로미터)
                },
                location : {
                    country : hereCountry, // 나라
                    name : hereName // 지역 이름
                },
                forecast : {
                    forecastday: [{
                        date,
                         day : {maxtemp_c, mintemp_c}, 
                         astro : { sunset },
                          hour
                        }]
                }
            } = await hourlyWeatherInfo;

            const { loaded } = currentLocation;

            setWeatherInfo({
                temp_c,
                feelslike_c,
                maxtemp_c,
                mintemp_c,
                sunset,
                humidity,
                text,
                wind_degree,
                wind_kph,
                hereCountry,
                hereName,
                date,
                hour,
                icon,
                loaded
            })

        }catch(error){
            console.error(error)
        }
    }
    
    useEffect(() => {
        getWeatherInfo()
    }, [currentLocation])

    useEffect(() => {
        searchWeatherInfo()
    }, [locationName])

    return(
        <WeatherContext.Provider value={{ ...weatherInfo, getLocationName, ...searchInfo}}>
            {children}
        </WeatherContext.Provider>
    )
}

export default WeatherProvider;