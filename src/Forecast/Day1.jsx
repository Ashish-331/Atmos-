import {Link} from "react-router-dom"
import {useLocation} from "react-router-dom";
import "./Day1.css"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";


function WeatherGraph({ fullday }) {

  const chartData = fullday.map(e => ({
    time: e.dt_txt.slice(11,16),
    temp: Math.round(e.main.temp)
  }));

  return (
    <ResponsiveContainer
      width="100%"
      height={400}
    >
      <AreaChart data={chartData}>

        <defs>
          <linearGradient
            id="tempGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#ffffff"
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor="#ffffff"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          opacity={0.2}
        />

        <XAxis
          dataKey="time"
          tick={{ fill: "#fff" }}
        />

        <YAxis
          tick={{ fill: "#fff" }}
          unit="°"
        />

        <Tooltip
          contentStyle={{
            background:
              "rgba(15,23,42,0.95)",
            border: "none",
            borderRadius: "12px"
          }}
        />

        <Area
          type="monotone"
          dataKey="temp"
          stroke="#ffffff"
          strokeWidth={4}
          fill="url(#tempGradient)"
        />

      </AreaChart>
    </ResponsiveContainer>
  );
}


function Day1()
{
  const location = useLocation();
  const forecast=location.state.Forecastdata;
  const day=location.state.DAY;

  

  const fullday=forecast.list.filter(e=>e.dt_txt.startsWith(day));

  return(
    <div className="day-page">
      <div className="day-card">
  
        <h1>{forecast.city.name}</h1>
        <h2>{day}</h2>
  
        <div className="graph-container">
          <WeatherGraph fullday={fullday}/>
        </div>
  
        <div className="hourly-grid">
          {fullday.map(e => (
            <div
              key={e.dt}
              className="hour-card"
            >
              <h3>
                {e.dt_txt.slice(11,16)}
              </h3>
  
              <p>
                🌡️ {e.main.temp}°C
              </p>
  
              <p>
                💧 {e.main.humidity}%
              </p>
  
              <p>
                {e.weather[0].main}
              </p>
            </div>
          ))}
        </div>
  
      </div>
    </div>
  );
  

}
export default Day1;