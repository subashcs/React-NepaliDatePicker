import React,{useState} from 'react';
import ReactSelectInput  from '';

import "./style.css";

const App= ()=>{
    const [items,setItems]=useState([{
        name:"ram",
        value:"ram",
        },
        {
        name:"shyam",
        value:"shyam",
          }
        ]);
const [val,setVal]=useState("");

const handleChange=(e)=>{
    setVal(e.target.value);
}
const onSubmit=(e)=>{
    let item={
        name:val,
        value:val
    }
    let newitem=items;
    newitem.push(item);
    setItems(newitem);
}

    return (
        <React.Fragment>
            <ReactSelectInput
            items={items}
            value={val}
            onChangeHandler={handleChange} 
            NoOptionMessage={"Not Added"} 
            optionClass={"option-class"} 
            wrapperClass={"wrapper-class"}
            inputClass={"input-class"}
            />

            <div style={{width:'200px'}}>   
                <ReactSelectInput
                items={items}
                value={val}
                onChangeHandler={handleChange} 
                default
                />  
            </div>
              
            <br/>
            <input type="submit" onClick={onSubmit}/>
        </React.Fragment>
        
    )
}
export default App;