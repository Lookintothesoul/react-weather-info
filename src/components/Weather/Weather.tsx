import React, { useEffect, useState } from "react";
import { Variables } from "../../utils/types";
import "./Weather.css";

interface Props {
  lat: number;
  long: number;

  variables: Variables[];
}

type TWeather = {
  daily: {
    time: string[];
  } & {
    [key in Variables]: number[] | string[];
  };
};

const getWeatherData = <T,>(url: string): Promise<T> =>
  fetch(url, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    })
    .then((data) => {
      return data;
    });

const Weather: React.FC<Props> = ({ variables, lat, long }) => {
  const [weather, setWeather] = useState<TWeather>();
  const weatherKeys = (Object.keys(weather?.daily || {}) as Variables[]).filter(
    (key) => variables.includes(key),
  );

  useEffect(() => {
    getWeatherData<TWeather>(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=${variables.join(",")}&timezone=Europe/Moscow&past_days=0`,
    ).then((data) => setWeather(data));
  }, [variables, lat, long]);

  return (
    <div className="table_container">
      <table>
        <thead>
          <tr>
            <th>date</th>
            {weatherKeys.map((variable) => (
              <th key={variable}>{variable}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weather?.daily.time.map((time, index) => (
            <tr key={time}>
              <td align="center">{time}</td>
              {weatherKeys.map((key) => (
                <td align="center" key={time + key}>
                  {weather.daily[key][index]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Weather;
