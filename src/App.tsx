import React, { useState } from "react";
import "./App.css";
import Weather from "./components/Weather/Weather";
import { Variables } from "./utils/types";

function App() {
  const [variables, setVariables] = useState<Variables[]>([
    Variables.rain_sum,
    Variables.snowfall_sum,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (e.target as HTMLSelectElement).value as Variables;

    if (Object.values(Variables).includes(value)) {
      if (!variables.includes(value)) {
        // добавляем
        setVariables((prev) => [...prev, value]);
      } else {
        // удаляем
        setVariables((prev) => prev.filter((variable) => variable !== value));
      }
    }

    e.target.value = "";
  };

  return (
    <main className="main">
      <section className="weather-section">
        <div>
          <label htmlFor="weatherVariablesSelect">
            Выберите&nbsp;
            <span>
              (Повторным нажатием на элемент можно удалить колонку&#42;)
            </span>
            &nbsp;
          </label>
          <select
            id="weatherVariablesSelect"
            defaultValue=""
            name="variables"
            onChange={handleChange}
          >
            <option value="" disabled>
              Выберите
            </option>
            {Object.values(Variables).map((variable) => (
              <option key={variable} value={variable}>
                {variables.includes(variable) && <>&#10003;</>} {variable}
              </option>
            ))}
          </select>
        </div>
        <Weather lat={55.751244} long={37.618423} variables={variables} />
      </section>
    </main>
  );
}

export default App;
