import { useEffect, useState } from 'react';
import './index.scss';

import axios from 'axios';

import Loader from './components/Loader';
import Weather from './components/Weather';

const App = () => {
  const [weather, setWeather] = useState();
  const [ip, setIp] = useState();

  const ipUrl = 'https://get.geojs.io/v1/ip/geo.json';
  const weatherUrl = 'https://api.open-meteo.com/v1/forecast?' +
    `latitude=${ip?.latitude}&longitude=${ip?.longitude}` +
    '&current_weather=true&windspeed_unit=ms&timezone=Europe%2FLondon'
  ;

  const fetch = async () => {
    try {
      const ipRes = await axios.get(ipUrl);

      setIp(ipRes.data);
      if (ip) {
        const weatherRes = await axios.get(weatherUrl);

        setWeather(weatherRes.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [weatherUrl]);

  return (
    <div className="appWrapper">
      {!weather ? 
        <Loader />
      : 
        <Weather 
          ip={ip}
          weather={weather}
        />
      }
    </div>
  )
};

export default App
