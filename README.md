## React Nepali Date Picker
Nepali date picker UI input field component for React 

## Usage


```
import { NepaliC } from "ndp-react";

```

```
   <NepaliC.Calendar
        value={date}
        readOnly={false}
        defaultDate={"१२-१२-१९९९"}
        format={"MM-DD-YYYY"}
        onChangeHandler={handleChange}
      />
```

## Date Converters

### BS to AD Converter
```
  NepaliC.getBsDateByAdDate(today.year, today.month, today.day)
```

### AD to BS Converter

```
NepaliC.getAdDateByBsDate(bsYear, bsMonth, bsDate);
```
