import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import moment from "moment";
import Table from "./component/table";
import Navbar from "./component/navbar";
import Chart from "./component/chart";
function App() {
  const [geocodingApiRes, setGeocodingApiRes] = useState([]);
  const [forcast3Days, setForcast3Days] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const geocodingApi = `https://geocoding-api.open-meteo.com/v1/search?name=${searchValue}`;
  const searchCity = (event) => {
    setSearchValue(event.target.value);
    localStorage.setItem("search", JSON.stringify(searchValue));
    let tempData = [];
    axios.get(geocodingApi).then((res) => {
      let test = awaitAll(res.data.results);
      const geoLocation = localStorage.getItem("geolocation");
      {
        setGeocodingApiRes == ""
          ? setGeocodingApiRes(geoLocation)
          : setGeocodingApiRes(tempData);
      }
    });
  };
  function awaitAll(geoCoding) {
    const promises = [];
    for (let i = 0; i < geoCoding.length; i++) {
      const tempratureApi = `https://api.open-meteo.com/v1/forecast?latitude=${geoCoding[i].latitude}&longitude=${geoCoding[i].longitude}&current_weather=true`;
      let backendCall = axios.get(tempratureApi).then((response) => {
        let singleSearch = {
          name: geoCoding[i].name,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          admin1: geoCoding[i].admin1,
          country: geoCoding[i].country,
          temperature: response.data.current_weather.temperature,
          time: response.data.current_weather.time,
        };
        promises.push(singleSearch);
        if (i == geoCoding.length - 1) {
          setGeocodingApiRes(promises);
          localStorage.setItem("geolocation", JSON.stringify(promises));
        }
      });
    }
  }
  useEffect(() => {
    const geoLocation = JSON.parse(localStorage.getItem("geolocation"));
    const name = JSON.parse(localStorage.getItem("search"));
    setGeocodingApiRes(geoLocation);
    setSearchValue(name);
  }, []);
  const forcast3days = (event) => {
    setChecked1(false)
    setForcast3Days([]);
    if (!checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    var date = new Date(geocodingApiRes[0].time);
    var startDate = moment(date).format("YYYY-MM-DD");
    var endDate = moment(date.setDate(date.getDate() + 3)).format("YYYY-MM-DD");
    const forcast = `https://api.open-meteo.com/v1/forecast?latitude=${geocodingApiRes[0].latitude}&longitude=${geocodingApiRes[0].longitude}&start_date=${startDate}&end_date=${endDate}&timezone=GMT&daily=temperature_2m_max,temperature_2m_min`;
    axios.get(forcast).then((response) => {
      setForcast3Days(response.data.daily);
    });
  };
  const weaklyForcast = (event) => {
    setForcast3Days([]);
    setChecked(false)
    if (!checked1) {
      setChecked1(true);
    } else {
      setChecked1(false);
    }
    var date = new Date(geocodingApiRes[0].time);
    var startDate = moment(date).format("YYYY-MM-DD");
    var endDate = moment(date.setDate(date.getDate() + 7)).format("YYYY-MM-DD");
    const forcast = `https://api.open-meteo.com/v1/forecast?latitude=${geocodingApiRes[0].latitude}&longitude=${geocodingApiRes[0].longitude}&start_date=${startDate}&end_date=${endDate}&timezone=GMT&daily=temperature_2m_max,temperature_2m_min`;
    axios.get(forcast).then((response) => {
      setForcast3Days(response.data.daily);
    });
  };
  return (
    <>
      <Navbar
        searchCity={searchCity}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        setChecked={setChecked}
        checked={checked}
        forcast3days={forcast3days}
        weaklyForcast={weaklyForcast}
        checked1={checked1}
      />
      <Table geocodingApiRes={geocodingApiRes} />
      {checked === true && forcast3Days.length !== 0 ? (
        <Chart forcast3Days={forcast3Days} checked={checked} />
      ) : checked1 === true && forcast3Days.length !== 0 ? (
        <Chart forcast3Days={forcast3Days} checked1={checked1} />
      ) : (
        ""
      )}
    </>
  );
}
export default App;
