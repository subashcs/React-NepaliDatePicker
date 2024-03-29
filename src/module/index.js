import React, { useState } from "react";
import { NepaliCalendar, NepaliC } from "../lib";

const App = () => {
  const [date, setDate] = useState("");
  const handleChange = (e) => {
    setDate(e.target.value);
    console.log("latest date", date);
  };

  return (
    <div>
      {/* <NepaliCalendar.Calendar
        value={date}
        readOnly={false}
        defaultDate={"१२-१२-१९९९"}
        format={"MM-DD-YYYY"}
        onChangeHandler={handleChange}
      /> */}
      <NepaliC.Calendar
        value={date}
        readOnly={false}
        defaultDate={"१२-१२-१९९९"}
        format={"MM-DD-YYYY"}
        onChangeHandler={handleChange}
      />
      <h2>Selected Date</h2>
      <h2>{date}</h2>
    </div>
  );
};

export default App;
