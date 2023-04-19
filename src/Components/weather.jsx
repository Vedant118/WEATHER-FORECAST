import React, { useEffect, useState } from 'react'
import "./CSS/Style.css";
import axios from 'axios';


export default function Weather() {
    
   const [name, getName] = useState("Indore");
   const [city, getCity] = useState();
   const [current, getCurrent] = useState();
   const [max, getMax] = useState();
   const [min, getMin] = useState();
   const [weather, getWeather] = useState();
    const onHandleChange = (event) => {
      console.log({name});
        getName(event.target.value);
    }
    // For the API Calling
    useEffect(() => {
      async function apicall (){
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=b557b81bfce51dcf3fa7076bb98374dc`)
        console.log(response);
        getCity(response.data.name);
        getCurrent(response.data.main.temp);
        getMax(response.data.main.temp_max);
        getMin(response.data.main.temp_min);
        getWeather(response.data.weather[0].description);
      }
      apicall();
    },[name] )

  return (
    <>
              {/* For the Search bar */}
            <div className="box">
                <div className='inputData'>
                    <input
                    value={name}
                    placeholder='Location'
                    type='search'
                    className='inputField'
                    onChange={onHandleChange}
                    />
                </div>
                { ! city ? (
                    <p className='errorMsg'>NO DATA FOUND</p>
                  ) : (
                      <div>
                        {/* For the Text Layout */}
                <div className='info'>
                <h2 className='location'>
                <i className="fa-solid fa-cloud"></i>
                {name}
                </h2>
                <h1 className="temp">
                  {current}°Cel
                </h1>
                <h3 className="tempin_max">
                Max : {max}°Cel | Min : {min}°Cel
                </h3>
                <h2 className='location1'>
                  {weather}
                </h2>
                 {/* Now for the Wave Animation */}
              </div>
              <div className="wave -one"></div>
              <div className="wave -two"></div>
              <div className="wave -three"></div>
                      </div>
                  )
                }
            </div>
    </>
  )
}
