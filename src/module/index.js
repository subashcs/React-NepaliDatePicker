import React ,{useState}from 'react';
import { NepaliCalender } from '../lib';

const App =()=>{
 const [date, setDate] = useState("");
 const handleChange=(e)=>{
   setDate(e.target.value);
   console.log(date);
 }
    return(
                <NepaliCalender
                        min_year={1950}
                        value={date}
                        onChangeHandler={handleChange}
                    />
    );
};

export default App;