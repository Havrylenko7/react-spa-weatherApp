import './index.scss';

import * as Icon from 'react-bootstrap-icons';
import dayjs from 'dayjs';

import { weatherCode } from '../../iconsData';

const Weather = ({ weather, ip }) => {
  const now = (format) => dayjs().format(format);  
  const rotate = `rotate(${weather?.current_weather.winddirection}deg)`;
  const nightHours = ['21', '22', '23', '0', '1', '2', '3', '4', '5'];
  
  return (
  <div className="mainContentContainer">
    {now('h A')} | {now('dddd')} | {now('MMM DD')}

    <div className="primaryText">
      {ip.city ? (
        <div className="locationContainer">
          {ip.city}
          <span className="codeWrapper">{ip.country_code}</span>
        </div>
      ) : (
        ip.country
      )}
    </div>

    <div>
      {weatherCode
        .filter((item) => item.id === weather.current_weather.weathercode)
        .map((item) => (
          <div key={item.name}>
            {item.nightIcon && nightHours.includes(now("H"))
              ? item.nightIcon
              : item.icon}
            <div className="secondaryText">{item.name}</div>
          </div>
        ))}
    </div>

    <div className="weatherContainer">
      <div className="primaryText">
        {weather.current_weather.temperature}°
      </div>
      <div className="secondaryText">
        Wind
        <br />
        <Icon.ArrowDown style={{ transform: rotate }} />
        {weather.current_weather.windspeed} m/s
      </div>
    </div>
  </div>
  )
};

export default Weather
