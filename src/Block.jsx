import { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
const MY_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
import "./Block.css"

function Location(props)
{
  const data1=props.data;
  return(
    <Link
  to="/location"
  state={{ weather: data1 }}
  className="location-link">

    <div className="location">
      <div className="location-left">
      <h2>{data1.name}</h2>
      <h4>Country: {data1.sys.country}</h4>
      <h4>{data1.coord.lon}</h4>
      <h4>{data1.coord.lat}</h4>
      </div>

      <div className="location-right">
        <h4>Temp: {data1.main.temp} C</h4>
        <h4>Real Feel: {data1.main.feels_like} C</h4>
      </div>
    </div>
    </Link>
  )

}

function Block(props)
{ const city=props.name;
  const[isload,setIsload]=useState(false);
  const[error,setError]=useState(null);
  const[data,setData]=useState(null);

  useEffect(()=>{
    async function Fetchdata(){
      setError(null);
      setIsload(true);
      try{
      const res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MY_API_KEY}&units=metric`)
      console.log(res.status);

      const final = await res.json();
      console.log(final);

      if (!res.ok) throw new Error(final.message);
      setData(final);
      }
      catch(e)
      {
        setError(e.message);
      }
      finally{
        setIsload(false);
      }
    }
    Fetchdata();
  },[city] )

    if(isload)return <h1>Loading....</h1>
    if(error)return<h1>{error}</h1>
    if(data===null)return null;


  return(
    <div className="container">
    
    <Location data={data}/>
   
    {/* <div className={props.className}>
    <h2>Temp: {data.main.temp} C</h2>
    <h2>Real Feel: {data.main.feels_like} C</h2>
    <h2>Max: {data.main.temp_max} C</h2>
    <h2>Min: {data.main.temp_min} C</h2>
    <h2>Humidity: {data.main.humidity} %</h2>

    </div> */}
    </div>

  )
    
}
export default Block;