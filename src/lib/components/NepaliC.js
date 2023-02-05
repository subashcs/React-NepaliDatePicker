import React, { Fragment, useState, useRef, useEffect } from "react";
import "../css/styles.scss";

var calendarData = {
  bsMonths: [
    "बैशाख",
    "जेठ",
    "असार",
    "सावन",
    "भदौ",
    "असोज",
    "कार्तिक",
    "मंसिर",
    "पौष",
    "माघ",
    "फागुन",
    "चैत",
  ],
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
    [30, 31],
  ],
  extractedBsMonthData: {
    // YEAR-----Ba--Je--As--Sh--Bh--Ah--Ka--Ma--Po--Ma--Fa--Ch---
    1970: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    1971: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365],
    1972: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    1973: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
    1974: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    1975: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    1976: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    // Acc to ashes 1977 poush has 29 and magh has 30 but acc to nepalipatro poush has 30 and magh has 29
    1977: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
    1978: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    1979: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    1980: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    // Acc to ashes 1981 falgun has 30 and chaitra has 30 but acc to nepalipatro falgun has 29 and chaitra has 31
    1981: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
    1982: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    1983: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    1984: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    1985: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
    1986: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    1987: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    1988: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    1989: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    1990: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    // YEAR-----Ba--Je--As--Sh--Bh--Ah--Ka--Ma--Po--Ma--Fa--Ch---
    1991: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
    1992: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
    1993: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    1994: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    1995: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
    1996: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
    1997: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    // Acc to ashes 1981 bhadra has 31 and ashoj has 30 but acc to nepalipatro bhadra has 32 and ashoj has 30
    1998: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365],
    1999: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
    // Tested till 2000 BS according to nepalipatro.com.np
    2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
    2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
    2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
    2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
    2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2018: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
    2020: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2022: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
    2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
    2024: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2027: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
    2028: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365],
    2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2031: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
    2032: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2033: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2035: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
    2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2037: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2039: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
    2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2041: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2043: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
    2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2045: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2047: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2049: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
    2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
    2051: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2052: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2053: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
    2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
    2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2056: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365],
    2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2058: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
    2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2060: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    2061: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2062: [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31, 365],
    2063: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2064: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    2065: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2066: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
    2067: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2068: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    2069: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2070: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
    2071: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2072: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    2073: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
    2074: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
    2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
    2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
    2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
    2081: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366],
    2082: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    2083: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    2084: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    2085: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30, 366],
    2086: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    2087: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366],
    2088: [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30, 365],
    2089: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    2090: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    2091: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366],
    2092: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366],
    2093: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    2094: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365],
    2095: [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30, 366],
    2096: [30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 364],
    2097: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366],
    2098: [31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 29, 31, 365],
    2099: [31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30, 365],
    2100: [31, 32, 31, 32, 30, 31, 30, 29, 30, 29, 30, 30, 365],
  },
  minBsYear: 1970,
  maxBsYear: 2100,
  minAdDateEqBsDate: {
    ad: {
      year: 1913,
      month: 3,
      date: 13,
    },
    bs: {
      year: 1970,
      month: 1,
      date: 1,
    },
  },
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
  0: "०",
  1: "१",
  2: "२",
  3: "३",
  4: "४",
  5: "५",
  6: "६",
  7: "७",
  8: "८",
  9: "९",
};

var validationFunctions = {
  validateRequiredParameters: function (requiredParameters) {
    var keys = Object.keys(requiredParameters);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (
        typeof requiredParameters[key] === "undefined" ||
        requiredParameters[key] === null
      ) {
        throw new ReferenceError(
          "Missing required parameters: " +
            Object.keys(requiredParameters).join(", ")
        );
      }
    }
  },
  validateBsYear: function (bsYear) {
    if (typeof bsYear !== "number" || bsYear === null) {
      throw new TypeError("Invalid parameter bsYear value");
    } else if (
      bsYear < calendarData.minBsYear ||
      bsYear > calendarData.maxBsYear
    ) {
      throw new RangeError(
        "Parameter bsYear value should be in range of " +
          calendarData.minBsYear +
          " to " +
          calendarData.maxBsYear
      );
    }
  },
  validateAdYear: function (adYear) {
    if (typeof adYear !== "number" || adYear === null) {
      throw new TypeError("Invalid parameter adYear value");
    } else if (
      adYear < calendarData.minBsYear - 57 ||
      adYear > calendarData.maxBsYear - 57
    ) {
      throw new RangeError(
        "Parameter adYear value should be in range of " +
          (calendarData.minBsYear - 57) +
          " to " +
          (calendarData.maxBsYear - 57)
      );
    }
  },
  validateBsMonth: function (bsMonth) {
    if (typeof bsMonth !== "number" || bsMonth === null) {
      throw new TypeError("Invalid parameter bsMonth value");
    } else if (bsMonth < 1 || bsMonth > 12) {
      throw new RangeError(
        "Parameter bsMonth value should be in range of 1 to 12"
      );
    }
  },
  validateAdMonth: function (adMonth) {
    if (typeof adMonth !== "number" || adMonth === null) {
      throw new TypeError("Invalid parameter adMonth value");
    } else if (adMonth < 1 || adMonth > 12) {
      throw new RangeError(
        "Parameter adMonth value should be in range of 1 to 12"
      );
    }
  },
  validateBsDate: function (bsDate) {
    if (typeof bsDate !== "number" || bsDate === null) {
      throw new TypeError("Invalid parameter bsDate value");
    } else if (bsDate < 1 || bsDate > 32) {
      throw new RangeError(
        "Parameter bsDate value should be in range of 1 to 32"
      );
    }
  },
  validateAdDate: function (adDate) {
    if (typeof adDate !== "number" || adDate === null) {
      throw new TypeError("Invalid parameter adDate value");
    } else if (adDate < 1 || adDate > 31) {
      throw new RangeError(
        "Parameter adDate value should be in range of 1 to 31"
      );
    }
  },
  validatePositiveNumber: function (numberParameters) {
    let keys = Object.keys(numberParameters);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (
        typeof numberParameters[key] !== "number" ||
        numberParameters[key] === null ||
        numberParameters[key] < 0
      ) {
        throw new ReferenceError(
          "Invalid parameters: " + Object.keys(numberParameters).join(", ")
        );
      } else if (
        key === "yearDiff" &&
        numberParameters[key] >
          calendarData.maxBsYear - calendarData.minBsYear + 1
      ) {
        throw new RangeError(
          "Parameter yearDiff value should be in range of 0 to " +
            (calendarData.maxBsYear - calendarData.minBsYear + 1)
        );
      }
    }
  },
};

function getBsMonthDays(year, month) {
  let bsYear = getYear(year).yearInt;
  let bsMonth = getMonth(month).monthInt;

  validationFunctions.validateRequiredParameters({
    bsYear: bsYear,
    bsMonth: bsMonth,
  });
  validationFunctions.validateBsYear(bsYear);
  validationFunctions.validateBsMonth(bsMonth);

  if (bsYear >= calendarData.minBsYear && bsYear <= calendarData.maxBsYear) {
    return calendarData.extractedBsMonthData[bsYear][bsMonth - 1];
  }
  return null;
}

function getMonth(month) {
  let bsMonthNepali = month;
  let bsMonthEnglish = bsMonthNepali
    .toString()
    .replace(/[०१२३४५६७८९]/g, function (s) {
      return englishDigits[s];
    });
  let monthInt = parseInt(bsMonthEnglish, 10);

  return { bsMonthNepali, bsMonthEnglish, monthInt };
}
function getYear(year) {
  let bsYearNepali = year;
  let bsYearEnglish = bsYearNepali
    .toString()
    .replace(/[०१२३४५६७८९]/g, function (s) {
      return englishDigits[s];
    });
  let yearInt = parseInt(bsYearEnglish, 10);

  return { bsYearNepali, bsYearEnglish, yearInt };
}
function getDay(day) {
  let bsDayNepali = day;
  let bsDayEnglish = bsDayNepali
    .toString()
    .replace(/[०१२३४५६७८९]/g, function (s) {
      return englishDigits[s];
    });
  let dayInt = parseInt(bsDayEnglish, 10);

  return { bsDayNepali, bsDayEnglish, dayInt };
}

function getWeekDay(year, month, day) {
  let bsYear = getYear(year).yearInt;
  let bsMonth = getMonth(month).monthInt;

  let bsDate = getDay(day).dayInt;
  let eqAdDate = getAdDateByBsDate(bsYear, bsMonth, bsDate);
  console.debug("my birthday", getAdDateByBsDate(2055, 11, 11));
  console.debug("equivalent Ad Date , while getting weekday is", eqAdDate);
  let weekDayInt = eqAdDate.getDay();
  let weekDay = calendarData.bsDays[weekDayInt];
  console.debug("weekDay", weekDay);
  return { weekDayInt, weekDay };
}

function getBsDateByAdDate(adYear, adMonth, adDate) {
  validationFunctions.validateRequiredParameters({
    adYear: adYear,
    adMonth: adMonth,
    adDate: adDate,
  });
  validationFunctions.validateAdYear(adYear);
  validationFunctions.validateAdMonth(adMonth);
  validationFunctions.validateAdDate(adDate);

  var bsYear = adYear + 57;
  var bsMonth = (adMonth + 9) % 12;
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
    bsMonth = bsMonth !== 1 ? bsMonth - 1 : 12;
    var bsMonthDays = getBsMonthDays(bsYear, bsMonth);
    bsDate = bsMonthDays - (bsMonthFirstAdDate.getDate() - adDate) + 1;
  } else {
    bsDate = adDate - bsMonthFirstAdDate.getDate() + 1;
  }

  return {
    bsYear: bsYear,
    bsMonth: bsMonth,
    bsDate: bsDate,
  };
}

function getAdDateByBsDate(bsYear, bsMonth, bsDate) {
  validationFunctions.validateRequiredParameters({
    bsYear: bsYear,
    bsMonth: bsMonth,
    bsDate: bsDate,
  });
  validationFunctions.validateBsYear(bsYear);
  validationFunctions.validateBsMonth(bsMonth);
  validationFunctions.validateBsDate(bsDate);
  var daysNumFromMinBsYear = getTotalDaysNumFromMinBsYear(
    bsYear,
    bsMonth,
    bsDate
  );
  console.debug(
    "days num rom min bs year",
    getTotalDaysNumFromMinBsYear(1970, 1, 11)
  );
  var adDate = new Date(
    calendarData.minAdDateEqBsDate.ad.year,
    calendarData.minAdDateEqBsDate.ad.month,
    calendarData.minAdDateEqBsDate.ad.date - 1
  );
  adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);
  return adDate;
}

function getTotalDaysNumFromMinBsYear(year, month, day) {
  let bsYear = getYear(year).yearInt;
  let bsMonth = getMonth(month).monthInt;
  let bsDate = getDay(day).dayInt;

  validationFunctions.validateRequiredParameters({
    bsYear: bsYear,
    bsMonth: bsMonth,
    bsDate: bsDate,
  });
  validationFunctions.validateBsYear(bsYear);
  validationFunctions.validateBsMonth(bsMonth);
  validationFunctions.validateBsDate(bsDate);

  if (bsYear < calendarData.minBsYear || bsYear > calendarData.maxBsYear) {
    return null;
  }

  var daysNumFromMinBsYear = 0;
  for (let year = calendarData.minBsYear; year < bsYear; year++) {
    daysNumFromMinBsYear += calendarData.extractedBsMonthData[year][12];
  }
  let allMonthDays = calendarData.extractedBsMonthData[bsYear];

  for (let month = 1; month < bsMonth; month++) {
    daysNumFromMinBsYear += allMonthDays[month - 1];
  }

  //add the day from current month
  daysNumFromMinBsYear += bsDate;

  return daysNumFromMinBsYear;
}

/**
 *
 * @param {onChangeHandler} onChangeHandler - The function that handles change in input date
 * @param {string} value - input date value
 * @param {boolean} [readOnly="false"] - Optional , boolean parameter to make input readOnly
 * @param {string} format - input date custom format
 * @param {string} defaultDate - default date value
 * @param {string} name - input field name
 * @param {string} className - custom className
 * @returns {JSX.Element} NepaliCaleder React Component
 */
const NepaliCalendar = ({
  onChangeHandler,
  value,
  readOnly = false,
  format,
  name,
  className,
  defaultDate,
  ...props
}) => {
  let stripper = "/";
  let dateOrder = ["year", "month", "day"];
  let date = new Date();
  let today = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };

  console.debug("todddya,", today);
  today = getBsDateByAdDate(today.year, today.month, today.day);
  today = {
    year: toNepali(today.bsYear),
    month: toNepali(toDateFormat(today.bsMonth)),
    day: toNepali(toDateFormat(today.bsDate)),
  };
  console.debug("today in bs", today);

  let newDefault = defaultDate;

  if (typeof defaultDate === "string") {
    if (format) {
      if (format.charAt(0) === "Y") {
        stripper = defaultDate.charAt(4);
      } else {
        stripper = format.charAt(2);
      }

      try {
        if (format === "YYYY" + stripper + "MM" + stripper + "DD") {
          newDefault = newDefault.split(stripper);
          newDefault = {
            year: newDefault[0],
            month: newDefault[1],
            day: newDefault[2],
          };
          dateOrder = ["year", "month", "day"];

          console.debug("matched format", newDefault);
        } else if (format === "YYYY" + stripper + "DD" + stripper + "MM") {
          newDefault = newDefault.split(stripper);
          newDefault = {
            year: newDefault[0],
            day: newDefault[1],
            month: newDefault[2],
          };
          dateOrder = ["year", "day", "month"];
        } else if (format === "MM" + stripper + "YYYY" + stripper + "DD") {
          newDefault = newDefault.split(stripper);
          newDefault = {
            month: newDefault[0],
            year: newDefault[1],
            day: newDefault[2],
          };
          dateOrder = ["month", "year", "day"];
        } else if (format === "MM" + stripper + "DD" + stripper + "YYYY") {
          newDefault = newDefault.split(stripper);
          newDefault = {
            month: newDefault[0],
            day: newDefault[1],
            year: newDefault[2],
          };
          dateOrder = ["month", "day", "year"];
        } else if (format === "DD" + stripper + "MM" + stripper + "YYYY") {
          newDefault = newDefault.split(stripper);
          newDefault = {
            day: newDefault[0],
            month: newDefault[1],
            year: newDefault[2],
          };
          dateOrder = ["day", "month", "year"];
        } else {
          throw SyntaxError;
        }
      } catch (err) {
        alert(err);
      }
    } else {
      newDefault = newDefault.split(stripper);
      newDefault = {
        year: newDefault[0],
        month: newDefault[1],
        day: newDefault[2],
      };
    }
  }

  let defaultValue = newDefault || today;

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [day, setDay] = useState(defaultValue.day);
  const [month, setMonth] = useState(defaultValue.month);
  const [year, setYear] = useState(defaultValue.year);

  const { modalInvisible, modalVisible } = styles;
  const wrapperRef = useRef(null);

  useEffect(() => {
    let currentDate = {
      year,
      month,
      day,
    };
    let dnew =
      currentDate[dateOrder[0]] +
      stripper +
      currentDate[dateOrder[1]] +
      stripper +
      currentDate[dateOrder[2]];
    let e = {
      target: {
        name: name,
        value: dnew,
      },
    };
    onChangeHandler(e);
  }, [year, day, month, name, onChangeHandler, dateOrder, stripper]);

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

  function toDateFormat(dm) {
    if (dm < 10) {
      return "0" + dm;
    }
    return dm.toString();
  }
  function toNepali(str) {
    return str.toString().replace(/[0123456789]/g, function (s) {
      return devanagariDigits[s];
    });
  }

  const yearLoad = () => {
    let list = [];
    for (let i = calendarData.minBsYear; i <= calendarData.maxBsYear; i++) {
      let in_np = i.toString().replace(/[0123456789]/g, function (s) {
        return devanagariDigits[s];
      });
      let currentYear = year === in_np;

      list.push(
        <li
          key={i}
          onClick={() => {
            setYear(in_np);
          }}
          className={currentYear ? "highlight" : ""}
        >
          {in_np}
        </li>
      );
    }
    return list;
  };

  const dayLoad = () => {
    let list = [];
    let daylist = [];
    let weekDays = [];

    let weekDayStartFrom = getWeekDay(year, month, "01").weekDayInt; //note:to make weeday start from  base 0
    console.debug("weekday start from ", weekDayStartFrom);

    let bsMonthUpperDay = getBsMonthDays(year, month);

    console.debug("bs month upper day", bsMonthUpperDay);

    for (let i = 0; i < 7; i++) {
      weekDays.push(<th key={`weekDay ${i}`}>{calendarData.bsDays[i]}</th>);
    }

    list.push(
      <thead key={bsMonthUpperDay}>
        <tr>{weekDays}</tr>
      </thead>
    );

    let weekDayTracker = 0;

    for (let i = 1; i <= bsMonthUpperDay; ) {
      let tempdays = [];

      for (let j = 0; j < 7 && i <= bsMonthUpperDay; j++) {
        let in_np = i.toString();

        if (i < 10) {
          in_np = 0 + i.toString();
        }
        in_np = in_np.replace(/[0123456789]/g, function (s) {
          return devanagariDigits[s];
        });
        let currentDay = day === in_np;
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
              className={currentDay ? "highlight" : ""}
            >
              {in_np}
            </td>
          );
          i++;
        }
      }
      daylist.push(<tr key={i}>{tempdays}</tr>);
    }
    let table = [];
    list.push(<tbody key={daylist.length}>{daylist}</tbody>);
    table.push(<table key={list.length}>{list}</table>);
    return table;
  };

  const monthLoad = () => {
    let list = [];

    calendarData.bsMonths.map((element, key) => {
      let in_np = (key + 1).toString();
      if (key + 1 < 10) {
        in_np = 0 + (key + 1).toString();
      }
      in_np = in_np.replace(/[0123456789]/g, function (s) {
        return devanagariDigits[s];
      });
      let currentMonth = month === in_np;

      list.push(
        <li
          key={key}
          onClick={() => {
            setMonth(in_np);
          }}
          className={currentMonth ? "highlight" : ""}
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
        name={name}
        value={value}
        onClick={() => setIsPickerVisible(!readOnly && !isPickerVisible)}
        onChange={null}
        className={className ? className : null}
        readOnly
        {...props}
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
export default {
  Calendar: NepaliCalendar,
  getBsDateByAdDate,
  getAdDateByBsDate,
};
