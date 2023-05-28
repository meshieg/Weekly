import { Autocomplete } from "@mui/material";
import React from "react";

interface ITimePickerListProps {
  key: React.Key;
  style?: any;
  onChange: (event: any, val?: any) => void;
}

const TimePickerList: React.FC = () => {
  return (
    <></>
    // <Autocomplete
    //   key={props.id}
    //   sx={styles.field}
    //   defaultValue={
    //     props.options?.find((option) => option.id === props.value) || null
    //   }
    //   value={props.options?.find((option) => option.id === props.value) || null}
    //   onChange={handleInputChanged}
    //   options={props.options!}
    //   getOptionLabel={(option) => option.label}
    //   isOptionEqualToValue={(option, value) => option.id === value.id}
    //   renderInput={(params: any) => (
    //     <TextField {...params} label={props.label} required={props.required} />
    //   )}
    // />
  );
};

export default TimePickerList;
