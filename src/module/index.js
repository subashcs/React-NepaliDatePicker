import React ,{useState}from 'react';
import { NepaliCalender } from '../lib';

const App =()=>{
 const [date, setDate] = useState("");
 const handleChange=(e)=>{
   setDate(e.target.value);
   console.log("latest date",date);
 }
    return(
                <NepaliCalender
                        value={date}
                        readOnly={false}
                        default = {"१२-१२-१९९९"}
                        format={"MM-DD-YYYY"}
                        onChangeHandler={handleChange}
                    />
    );
};

export default App;