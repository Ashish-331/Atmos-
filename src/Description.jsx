import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const MY_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
import Day1 from "./Forecast/Day1.jsx"
import "./Description.css";

function Forecast({ city }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!city) return;

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${MY_API_KEY}&units=metric`
        );

        const final = await res.json();

        if (!res.ok) {
          throw new Error(final.message);
        }

        setData(final);
      }
      catch (e) {
        setError(e.message);
      }
      finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [city]);

  if (loading) return <h2>Loading Forecast...</h2>;

  if (error) return <h2>{error}</h2>;

  if (!data) return null;

  const daily =
    data.list?.filter(item =>
      item.dt_txt.includes("12:00")
    ) || [];

  const icons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Fog: "🌫️",
    Haze: "🌫️"
  };

  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {daily.map(day => (
          <Link to="/Forecast/Day1" state={{Forecastdata : data, DAY : day.dt_txt.slice(0,10) }}>
          <div
            key={day.dt}
            className="forecast-card"
          >
              <h1>
              {new Date(day.dt_txt).toLocaleDateString(
                "en-US",
                { weekday: "short" }
              )}
              </h1>
            

            <div className="forecast-icon">
              {icons[day.weather[0].main] || "🌍"}
            </div>

            <h2>
              {Math.round(day.main.temp)}°C
            </h2>

            <p>
              {day.weather[0].main}
            </p>
          </div>
          </Link>
        ))}
        
      </div>
      
    </div>
  );
}


function GeoData(props)
{
  const [geo,setGeo] = useState(null);
  const [geoLoad,setGeoload] = useState(false);
  const [geoError,setGeoError] = useState(null);

  useEffect(() => {

    async function fetchGeoData() {
      try {
        setGeoload(true);

        const resGeo = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${props.place}&count=1&language=en&format=json`
        );

        const finalGeo = await resGeo.json();

        if (!resGeo.ok) {
          throw new Error("Failed to fetch geography data");
        }

        setGeo(finalGeo);
      }
      catch(e) {
        setGeoError(e.message);
      }
      finally {
        setGeoload(false);
      }
    }

    fetchGeoData();

  }, [props.place]);

  if (geoLoad) return <h3>Loading Geography...</h3>;

  if (geoError) return <h3>{geoError}</h3>;

  if (!geo || !geo.results || geo.results.length === 0)
    return <h3>No geography data found</h3>;

    const city = geo.results[0];

return (
  <p className="geo-description">
    {city.name}, {city.country}, is situated at {city.latitude}° latitude
    and {city.longitude}° longitude. The city has an estimated population
    of {city.population?.toLocaleString() ?? "N/A"} and an elevation of{" "}
    {city.elevation ?? "N/A"} meters above sea level. It operates in the{" "}
    {city.timezone} timezone.
  </p>
);
}

function Description() {
  const location = useLocation();

  const [data, setData] = useState(
    location.state?.weather || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!location.state?.city) return;

      try {
        setLoading(true);

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location.state.city}&appid=${MY_API_KEY}&units=metric`
        );

        const final = await res.json();

        if (!res.ok) {
          throw new Error(final.message);
        }

        setData(final);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    if (!data && location.state?.city) {
      fetchData();
    }
  }, [location.state, data]);

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>{error}</h1>;

  if (!data) {
    return <h1>No weather data found</h1>;
  }

  const sunrise = new Date(
    data.sys.sunrise * 1000
  ).toLocaleTimeString();

  const sunset = new Date(
    data.sys.sunset * 1000
  ).toLocaleTimeString();
  const icons = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "🌤️",
    "02n": "☁️",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌧️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️"
  };

  return (
    <div className="description-page">

      <div className="weather-card">
        <h1>{data.name}</h1>
        <h3>{data.sys.country}</h3>

        <div className="main-weather">

            <div className="weather-emoji">
                {icons[data.weather[0].icon]}
            </div>

          <h2>{Math.round(data.main.temp)}°C</h2>
          <h3>{data.weather[0].main}</h3>
          <p>{data.weather[0].description}</p>
        </div>

        <div className="grid">
          <div className="info-box">
            <h4>Feels Like</h4>
            <p>{data.main.feels_like}°C</p>
          </div>

          <div className="info-box">
            <h4>Humidity</h4>
            <p>{data.main.humidity}%</p>
          </div>

          <div className="info-box">
            <h4>Pressure</h4>
            <p>{data.main.pressure} hPa</p>
          </div>

          <div className="info-box">
            <h4>Wind</h4>
            <p>{data.wind.speed} m/s</p>
          </div>

          <div className="info-box">
            <h4>Max Temp</h4>
            <p>{data.main.temp_max}°C</p>
          </div>

          <div className="info-box">
            <h4>Min Temp</h4>
            <p>{data.main.temp_min}°C</p>
          </div>

          <div className="info-box">
            <h4>Visibility</h4>
            <p>{data.visibility / 1000} km</p>
          </div>

          <div className="info-box">
            <h4>Coordinates</h4>
            <p>
              {data.coord.lat}, {data.coord.lon}
            </p>
          </div>

          <div className="info-box">
            <h4>Sunrise</h4>
            <p>{sunrise}</p>
          </div>

          <div className="info-box">
            <h4>Sunset</h4>
            <p>{sunset}</p>
          </div>
        </div>
      </div>
      {/* <div className="geo-card"> 
          <GeoData place={location.state.city}/>
      </div> */}
      <div className="Forecast">
          <Forecast city={data.name}/>
      </div>
    </div>
  );
}

export default Description;