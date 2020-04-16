import React, { Fragment, useState, useRef, useEffect } from "react";
import "../css/styles.scss";

var calendarData = {
  bsMonths: ["बैशाख", "जेठ", "असार", "सावन", "भदौ", "असोज", "कार्तिक", "मंसिर", "पौष", "माघ", "फागुन", "चैत"],
  bsDays: ["आईत", "सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि"],
  nepaliNumbers: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"],
  bsMonthUpperDays: [
      [30, 31],
      [31, 32],
      [31, 32],
      [31, 32],
      [31, 32],
      [30, 31],
      [29, 30],
      [29, 30],
      [29, 30],
      [29, 30],
      [29, 30],
      [30, 31]
  ],
  extractedBsMonthData: [
      [0, 1, 1, 22, 1, 3, 1, 1, 1, 3, 1, 22, 1, 3, 1, 3, 1, 22, 1, 3, 1, 19, 1, 3, 1, 1, 3, 1, 2, 2, 1, 3, 1],
      [1, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 3, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 3, 1, 1, 2],
      [0, 1, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 3, 1, 1, 2],
      [1, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 2, 2, 1, 3, 1, 2, 2, 2, 1, 2],
      [59, 1, 26, 1, 28, 1, 2, 1, 12],
      [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 1, 2, 2, 1, 3, 1, 2, 1, 2],
      [0, 12, 1, 3, 1, 3, 1, 5, 1, 11, 1, 3, 1, 3, 1, 18, 1, 3, 1, 3, 1, 18, 1, 3, 1, 3, 1, 27, 1, 2],
      [1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 15, 2, 4],
      [0, 1, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 3, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 15, 2, 4],
      [1, 1, 3, 1, 3, 1, 14, 1, 3, 1, 1, 1, 3, 1, 14, 1, 3, 1, 3, 1, 3, 1, 18, 1, 3, 1, 3, 1, 3, 1, 14, 1, 3, 15, 1, 2, 1, 1],
      [0, 1, 1, 3, 1, 3, 1, 10, 1, 3, 1, 3, 1, 1, 1, 3, 1, 3, 1, 10, 1, 3, 1, 3, 1, 3, 1, 3, 1, 14, 1, 3, 1, 3, 1, 3, 1, 3, 1, 10, 1, 20, 1, 1, 1],
      [1, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 20, 3]
  ],
  minBsYear: 1970,
  maxBsYear: 2100,
  minAdDateEqBsDate: {
      "ad": {
          "year": 1913, "month": 3, "date": 13
      },
      "bs": {
          "year": 1970, "month": 1, "date": 1
      }
  }
};

var englishDigits = {
  "०": "0",
  "१": "1",
  "२": "2",
  "३": "3",
  "४": "4",
  "५": "5",
  "६": "6",
  "७": "7",
  "८": "8",
  "९": "9",
};

var devanagariDigits = {
  "0": "०",
  "1": "१",
  "2": "२",
  "3": "३",
  "4": "४",
  "5": "५",
  "6": "६",
  "7": "७",
  "8": "८",
  "9": "९",
};


const NepaliCalender = ({
  
  onChangeHandler,
  value,
  ...props
}) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [day, setDay] = useState("०१");
  const [month, setMonth] = useState("०१");
  const [year, setYear] = useState("१९७०");

  const { modalInvisible, modalVisible } = styles;
  const wrapperRef = useRef(null);

  useEffect(() => {
    let dnew = year + "/" + month + "/" + day;
    let e = {
      target: {
        name: props.name,
        value: dnew,
      },
    };
    onChangeHandler(e);
  }, [year, day, month, props.name, onChangeHandler]);

  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsPickerVisible(false);
      }
    }

    useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }

  var validationFunctions = {
    validateRequiredParameters: function (requiredParameters) {
      var keys = Object.keys(requiredParameters);
      for(let i=0; i<keys.length; i++){
          let key = keys[i];
          if (typeof requiredParameters[key] === "undefined" || requiredParameters[key] === null) {
            throw new ReferenceError("Missing required parameters: " + Object.keys(requiredParameters).join(", "));
        }
      }
    },
    validateBsYear: function (bsYear) {
        if (typeof bsYear !== "number" || bsYear === null) {
            throw new TypeError("Invalid parameter bsYear value");
        } else if (bsYear < calendarData.minBsYear || bsYear > calendarData.maxBsYear) {
            throw new RangeError("Parameter bsYear value should be in range of " + calendarData.minBsYear + " to " + calendarData.maxBsYear);
        }
    },
    validateAdYear: function (adYear) {
        if (typeof adYear !== "number" || adYear === null) {
            throw new TypeError("Invalid parameter adYear value");
        } else if (adYear < calendarData.minBsYear - 57 || adYear > calendarData.maxBsYear - 57) {
            throw new RangeError("Parameter adYear value should be in range of " + (calendarData.minBsYear - 57) + " to " + (calendarData.maxBsYear - 57));
        }
    },
    validateBsMonth: function (bsMonth) {
        if (typeof bsMonth !== "number" || bsMonth === null) {
            throw new TypeError("Invalid parameter bsMonth value");
        } else if (bsMonth < 1 || bsMonth > 12) {
            throw new RangeError("Parameter bsMonth value should be in range of 1 to 12");
        }
    },
    validateAdMonth: function (adMonth) {
        if (typeof adMonth !== "number" || adMonth === null) {
            throw new TypeError("Invalid parameter adMonth value");
        } else if (adMonth < 1 || adMonth > 12) {
            throw new RangeError("Parameter adMonth value should be in range of 1 to 12");
        }
    },
    validateBsDate: function (bsDate) {
        if (typeof bsDate !== "number" || bsDate === null) {
            throw new TypeError("Invalid parameter bsDate value");
        } else if (bsDate < 1 || bsDate > 32) {
            throw new RangeError("Parameter bsDate value should be in range of 1 to 32");
        }
    },
    validateAdDate: function (adDate) {
        if (typeof adDate !== "number" || adDate === null) {
            throw new TypeError("Invalid parameter adDate value");
        } else if (adDate < 1 || adDate > 31) {
            throw new RangeError("Parameter adDate value should be in range of 1 to 31");
        }
    },
    validatePositiveNumber: function (numberParameters) {
      let keys = Object.keys(numberParameters);
        for(let i=0;i<keys.length;i++){
          let key = keys[i];
          if (typeof numberParameters[key] !== "number" || numberParameters[key] === null || numberParameters[key] < 0) {
            throw new ReferenceError("Invalid parameters: " + Object.keys(numberParameters).join(", "));
        } else if (key === "yearDiff" && value > (calendarData.maxBsYear - calendarData.minBsYear + 1)) {
            throw new RangeError("Parameter yearDiff value should be in range of 0 to " + (calendarData.maxBsYear - calendarData.minBsYear + 1));
        }
        }
    }
  };
  
  function getMonth(month){
    let bsMonthNepali = month;
    let bsMonthEnglish = bsMonthNepali.toString().replace(/[०१२३४५६७८९]/g, function (s) {
      return englishDigits[s];
    });
    let monthInt =  parseInt(bsMonthEnglish,10);

    return ({bsMonthNepali,bsMonthEnglish,monthInt});

  }
  function getYear(year){
    let bsYearNepali = year;
    let bsYearEnglish = bsYearNepali.toString().replace(/[०१२३४५६७८९]/g, function (s) {
      return englishDigits[s];
    });
    let yearInt =  parseInt(bsYearEnglish,10);

    return ({bsYearNepali,bsYearEnglish,yearInt});

  }
  function getDay(day){
    let bsDayNepali = day;
    let bsDayEnglish = bsDayNepali.toString().replace(/[०१२३४५६७८९]/g, function (s) {
      return englishDigits[s];
    });
    let dayInt =  parseInt(bsDayEnglish,10);

    return ({bsDayNepali,bsDayEnglish,dayInt});
  }

  function getWeekDay(year,month,day){
   
    let bsYear = getYear(year).yearInt;
    let bsMonth = getMonth(month).monthInt;
    
    let bsDate = getDay(day).dayInt;
    let eqAdDate = getAdDateByBsDate(bsYear,bsMonth,bsDate);
    console.log("equivalent Ad Date , while getting weekday is",eqAdDate);
    let weekDayInt  = eqAdDate.getDay() ;
    let weekDay= calendarData.bsDays[weekDayInt];
     console.log("weekDay",weekDay);
    return {weekDayInt,weekDay};
  }
   function getBsDateByAdDate(adYear, adMonth, adDate) {
    validationFunctions.validateRequiredParameters({"adYear": adYear, "adMonth": adMonth, "adDate": adDate});
    validationFunctions.validateAdYear(adYear);
    validationFunctions.validateAdMonth(adMonth);
    validationFunctions.validateAdDate(adDate);

    var bsYear = adYear + 57;
    var bsMonth = (adMonth + 9 ) % 12;
    bsMonth = bsMonth === 0 ? 12 : bsMonth;
    var bsDate = 1;

    if (adMonth < 4) {
        bsYear -= 1;
    } else if (adMonth === 4) {
        var bsYearFirstAdDate = getAdDateByBsDate(bsYear, 1, 1);
        if (adDate < bsYearFirstAdDate.getDate()) {
            bsYear -= 1;
        }
    }

    var bsMonthFirstAdDate = getAdDateByBsDate(bsYear, bsMonth, 1);
    if (adDate >= 1 && adDate < bsMonthFirstAdDate.getDate()) {
        bsMonth = (bsMonth !== 1) ? bsMonth - 1 : 12;
        var bsMonthDays = getBsMonthDays(bsYear, bsMonth);
        bsDate = bsMonthDays - (bsMonthFirstAdDate.getDate() - adDate) + 1;
    } else {
        bsDate = adDate - bsMonthFirstAdDate.getDate() + 1;
    }

    return {
        bsYear: bsYear,
        bsMonth: bsMonth,
        bsDate: bsDate
    };
}

   function getAdDateByBsDate(bsYear, bsMonth, bsDate) {
    validationFunctions.validateRequiredParameters({"bsYear": bsYear, "bsMonth": bsMonth, "bsDate": bsDate});
    validationFunctions.validateBsYear(bsYear);
    validationFunctions.validateBsMonth(bsMonth);
    validationFunctions.validateBsDate(bsDate);
    var daysNumFromMinBsYear = getTotalDaysNumFromMinBsYear(bsYear, bsMonth, bsDate);
    var adDate = new Date(calendarData.minAdDateEqBsDate.ad.year, calendarData.minAdDateEqBsDate.ad.month, calendarData.minAdDateEqBsDate.ad.date - 1);
    adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);
    return adDate;
}

  const yearLoad = () => {
    let list = [];
    for (let i = calendarData.minBsYear; i <= calendarData.maxBsYear; i++) {
      let in_np = i.toString().replace(/[0123456789]/g, function (s) {
        return devanagariDigits[s];
      });
      list.push(
        <li
          key={i}
          onClick={() => {
            setYear(in_np);
          }}
        >
          {in_np}
        </li>
      );
    }
    return list;
  };
  function getMonthDaysNumFormMinBsYear(bsMonth, yearDiff) {
    validationFunctions.validateRequiredParameters({"bsMonth": bsMonth, "yearDiff": yearDiff});
    validationFunctions.validateBsMonth(bsMonth);
    validationFunctions.validatePositiveNumber({"yearDiff": yearDiff});

    var yearCount = 0;
    var monthDaysFromMinBsYear = 0;
    if (yearDiff === 0) {
        return 0;
    }

    var bsMonthData = calendarData.extractedBsMonthData[bsMonth - 1];
    for (var i = 0; i < bsMonthData.length; i++) {
        if (bsMonthData[i] === 0) {
            continue;
        }

        var bsMonthUpperDaysIndex = i % 2;
        if (yearDiff > yearCount + bsMonthData[i]) {
            yearCount += bsMonthData[i];
            monthDaysFromMinBsYear += calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] * bsMonthData[i];
        } else {
            monthDaysFromMinBsYear += calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] * (yearDiff - yearCount);
            yearCount = yearDiff - yearCount;
            break;
        }
    }

    return monthDaysFromMinBsYear;
}

   function getTotalDaysNumFromMinBsYear (year,month,day) {
     let bsYear =getYear(year).yearInt ;
     let bsMonth=getMonth(month).monthInt;
     let bsDate=getDay(day).dayInt;

    validationFunctions.validateRequiredParameters({"bsYear": bsYear, "bsMonth": bsMonth, "bsDate": bsDate});
    validationFunctions.validateBsYear(bsYear);
    validationFunctions.validateBsMonth(bsMonth);
    validationFunctions.validateBsDate(bsDate);

    if (bsYear < calendarData.minBsYear || bsYear > calendarData.maxBsYear) {
        return null;
    }

    var daysNumFromMinBsYear = 0;
    var diffYears = bsYear - calendarData.minBsYear;
    for (let month = 1; month <= 12; month++) {
        if (month < bsMonth) {
            daysNumFromMinBsYear += getMonthDaysNumFormMinBsYear(month, diffYears + 1);
        } else {
            daysNumFromMinBsYear += getMonthDaysNumFormMinBsYear(month, diffYears);
        }
    }

    if (bsYear > 2085 && bsYear < 2088) {
        daysNumFromMinBsYear += bsDate - 2;
    } else if (bsYear === 2085 && bsMonth > 5) {
        daysNumFromMinBsYear += bsDate - 2;
    } else if (bsYear > 2088) {
        daysNumFromMinBsYear += bsDate - 4;
    } else if (bsYear === 2088 && bsMonth > 5) {
        daysNumFromMinBsYear += bsDate - 4;
    } else {
        daysNumFromMinBsYear += bsDate;
    }

    return daysNumFromMinBsYear;
}


   function getBsMonthDays () {
    let bsYear=getYear(year).yearInt;
    let bsMonth=getMonth(month).monthInt;
    console.log("got bs month",bsMonth);
    //let bsMonthUpperDaysIndex = 1;



    validationFunctions.validateRequiredParameters({"bsYear": bsYear, "bsMonth": bsMonth});
    validationFunctions.validateBsYear(bsYear);
    validationFunctions.validateBsMonth(bsMonth);

    var yearCount = 0;
    var totalYears = (bsYear + 1) - calendarData.minBsYear;
    var bsMonthData = calendarData.extractedBsMonthData[bsMonth - 1];
    for (var i = 0; i < bsMonthData.length; i++) {
        if (bsMonthData[i] === 0) {
            continue;
        }

        var bsMonthUpperDaysIndex = i % 2;
        yearCount += bsMonthData[i];
        if (totalYears <= yearCount) {
            if ((bsYear === 2085 && bsMonth === 5) || (bsYear === 2088 && bsMonth === 5)) {
                return calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] - 2;
            } else {
                return calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex];
            }
        }
    }

    return null;
}

  const dayLoad = () => {
    let list = [];
    let weekDays = [];

    let weekDayStartFrom=getWeekDay(year,month,"01").weekDayInt; //note:to make weeday start from  base 0
    console.log("weekday start from ",weekDayStartFrom);
   
    let bsMonthUpperDay = getBsMonthDays();

    console.log("bs month upper day",bsMonthUpperDay);


    for (let i = 0; i < 7; i++) {
      weekDays.push(<th key={`weekDay ${i}`}>{calendarData.bsDays[i]}</th>);
    }

    list.push(weekDays);

    let weekDayTracker = 0;

    for (let i = 1; i <= bsMonthUpperDay; ) {
      let tempdays = [];

      for (let j = 0; j < 7 && i <= bsMonthUpperDay; j++) {
        let in_np = i.toString();
        if(i<10){
          in_np=0+i.toString();
        }
        in_np=in_np.replace(/[0123456789]/g, function (s) {
          return devanagariDigits[s];
        });

        if (weekDayTracker < weekDayStartFrom) {
          tempdays.push(<td key={weekDayTracker + "emptycell"}> </td>);
          weekDayTracker++;
        } else {
          tempdays.push(
            <td
              key={i}
              onClick={() => {
                setDay(in_np);
              }}
            >
              {in_np}
            </td>
          );
          i++;
        }
      }
      list.push(<tr>{tempdays}</tr>);
    }
    let table = [];
    table.push(<table>{list}</table>);
    return table;
  };

  const monthLoad = () => {
    let list = [];

    calendarData.bsMonths.map((element, key) => {
      let in_np = (key + 1).toString();
      if((key+1)<10){
        in_np=0+(key+1).toString();
      }
      in_np=in_np.replace(/[0123456789]/g, function (s) {
        return devanagariDigits[s];
      });

      list.push(
        <li
          key={key}
          onClick={() => {
            setMonth(in_np);
          }}
        >
          {element}
        </li>
      );
      return null;
    });
    return list;
  };

  return (
    <Fragment>
      <input
        type="text"
        name={props.name}
        value={value}
        onFocus={() => setIsPickerVisible(true)}
        onChange={null}
        className={props.className ? props.className : null}
        readOnly
      />

      <div
        className="modal"
        ref={wrapperRef}
        style={isPickerVisible ? modalVisible : modalInvisible}
      >
        <div className="pick apply-shadow">{yearLoad()}</div>
        <div className="pick">{monthLoad()}</div>

        <div className="day-pick apply-shadow">{dayLoad()}</div>
      </div>
    </Fragment>
  );
};
const styles = {
  modalVisible: {
    visibility: "visible",
  },
  modalInvisible: {
    visibility: "hidden",
  },
};
export default NepaliCalender;
