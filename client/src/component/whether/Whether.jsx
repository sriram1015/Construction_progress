import React, { useState, useEffect } from "react";
import axios from "axios";
import cloud from "../assets/cloud.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import search from "../assets/search.png";
import location from "../assets/location.png";
import loadingimg from "../assets/loading.gif";
import "./whether.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 
const node_url = import.meta.env.VITE_NODE_URL;


const Weatherapp = () => {
  const [oldTab, setOldTab] = useState("userWeather");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFromSessionStorage();
  }, []);


  const getFromSessionStorage = () => {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (localCoordinates) {
      const coordinates = JSON.parse(localCoordinates);
      fetchUserWeatherInfo(coordinates);
    }
  };

  const fetchUserWeatherInfo = async (coordinates) => {
    const { lat, lon } = coordinates;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setWeatherInfo(response.data);
      console.log(response.data); // Print weather data in cmd

      // Send the weather data to Node.js backend for saving to .txt and MongoDB
      await axios.post(`${node_url}/saveWeatherData`, response.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchSearchWeatherInfo = async (city) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherInfo(response.data);
      console.log(response.data); // Print weather data in cmd

      // Send the weather data to Node.js backend for saving to .txt and MongoDB
      await axios.post(`${node_url}/saveWeatherData`, response.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };



  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    const userCoordinates = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
  };

  return (

    <div className="weather-container">
      {oldTab === "userWeather" && !weatherInfo && (
        <div className="sub-container grant-location-container active">
          <img src={location} alt="Location" />
          <p>Grant Location Access</p>
          <button className="btn" onClick={getLocation}>
            Grant Access
          </button>
        </div>
      )}

      {loading && (
        <div className="sub-container loading-container active">
          <img src={loadingimg} alt="Loading" className="loading-image" />
          <p>Loading</p>
        </div>
      )}

      {weatherInfo && (
        <div className="sub-container user-info-container active">
          <div className="name">
            <p>{weatherInfo.name}</p>
            <img
              src={`https://flagcdn.com/144x108/${weatherInfo.sys.country.toLowerCase()}.png`}
              alt="Country Flag"
            />
          </div>
          <p>{weatherInfo.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <p data-temp>{weatherInfo.main.temp} °C</p>
          <div className="parameter-container">
            <div className="parameter">
              <img src={wind} alt="Wind" />
              <p>Windspeed</p>
              <p>{weatherInfo.wind.speed} m/s</p>
            </div>
            <div className="parameter">
              <img src={humidity} alt="Humidity" />
              <p>Humidity</p>
              <p>{weatherInfo.main.humidity}%</p>
            </div>
            <div className="parameter">
              <img src={cloud} alt="Clouds" />
              <p>Cloudiness</p>
              <p>{weatherInfo.clouds.all}%</p>
            </div>
          </div>
        </div>
      )}

      {oldTab === "searchWeather" && (
        <form
          className="form-container active"
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery) fetchSearchWeatherInfo(searchQuery);
          }}
        >
          <input
            type="text"
            placeholder="Search for City..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn" type="submit">
            <img src={search} alt="Search" />
          </button>
        </form>
      )}
    </div>
  );
};

export default Weatherapp;
