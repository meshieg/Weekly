import React, { useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import styles from "./SuperInputField.style";
import "./SuperInputField.css";
import "../../general.css";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { fieldsTypes } from "../../utils/constants";
import moment from "moment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

// import "moment-timezone";

interface IProps {
  id: string;
  label: string;
  type: fieldsTypes;
  value: any;
  onChange: (key: string, newValue: string) => void;
  options?: IOption[];
  required?: boolean;
  placeholder?: string;
}

const SuperInputField: React.FC<IProps> = (props) => {
  const handleInputChanged = (event: any, val?: any) => {
    let changeValue;
    switch (props.type) {
      case fieldsTypes.TextField:
        changeValue = event?.target.value;
        break;

      case fieldsTypes.Autocomplete:
        changeValue = val ? val.id : "";
        break;

      case fieldsTypes.Checkbox:
        changeValue = !props.value;
        break;

      case fieldsTypes.DatePicker:
        changeValue = moment(event).utcOffset(0, true).format();
        break;

      case fieldsTypes.TimePicker:
        changeValue = val;
        break;

      // case fieldsTypes.FileUpload:
      //   changeValue = event.target.files[0]; //URL.createObjectURL(event.target.files[0]);
      //   break;

      case fieldsTypes.Password:
        changeValue = event?.target.value;
        break;
    }

    props.onChange(props.id, changeValue);
  };

  useEffect(() => {
    console.log("autocomplete", props.options, props.value);
  }, []);

  switch (props.type) {
    case fieldsTypes.Autocomplete:
      return (
        <Autocomplete
          key={props.id}
          // sx={styles.field}
          defaultValue={
            props.options?.find((option) => option.id === props.value) || null
          }
          value={
            props.options?.find((option) => option.id === props.value) || null
          }
          onChange={handleInputChanged}
          options={props.options!}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params: any) => (
            <TextField
              {...params}
              label={props.label}
              required={props.required}
            />
          )}
        />
      );

    case fieldsTypes.Checkbox:
      return (
        <button
          key={props.id}
          className={`checkbox ${props.value && "selected"}`}
          onClick={handleInputChanged}
        >
          {props.label}
        </button>
      );

    case fieldsTypes.DatePicker:
      return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="he_IL">
          <DesktopDatePicker
            key={props.id}
            label={props.label}
            value={props.value ? moment(props.value).utcOffset(0, true) : null}
            // inputFormat="DD/MM/YYYY"
            onChange={handleInputChanged}
            disablePast={true}
            renderInput={(params: any) => (
              <TextField
                {...params}
                error={false}
                // sx={styles.field}
                // value={moment(props.value).tz("GMT")}
                required={props.required}
              />
            )}
          />
        </LocalizationProvider>
      );

    // case fieldsTypes.FileUpload:
    //   return (
    //     <TextField
    //       key={props.id}
    //       type="file"
    //       placeholder={props.label}
    //       onChange={handleInputChanged}
    //       sx={styles.field}
    //       required={props.required}
    //     />
    //   );

    case fieldsTypes.Password:
      return (
        <TextField
          key={props.id}
          label={props.label}
          onChange={handleInputChanged}
          required={props.required}
          placeholder={props.placeholder}
          type="password"
        />
      );
    case fieldsTypes.TimePicker:
      return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="he_IL">
          <TimePicker
            renderInput={(params: any) => (
              <TextField {...params} error={false} required={props.required} />
            )}
            label={props.label}
            value={props.value}
            onChange={handleInputChanged}
          />
        </LocalizationProvider>
      );

    default:
      return (
        <TextField
          key={props.id}
          label={props.label}
          value={props.value}
          onChange={handleInputChanged}
          // sx={styles.field}
          required={props.required}
          placeholder={props.placeholder}
          multiline={props.label === "Description" ? true : false}
          maxRows={props.label === "Description" ? 6 : 1}
        />
      );
  }
};

export default SuperInputField;
