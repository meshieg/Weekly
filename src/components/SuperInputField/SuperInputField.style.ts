const styles = {
  field: {
    width: "100%",
    marginBottom: "1rem",
    "& label.Mui-focused": {
      color: "var(--primary-color)"
    },
    "& label.Mui-disabled": {
      color: "var(--primary-color)"
    },
    "& .MuiOutlinedInput-root": {
      paddingRight: "0px",
      borderRadius: "15px",
      "&.Mui-focused fieldset": {
        borderColor: "var(--primary-color)"
      },
      alignItems: "unset"
    },
    "& .MuiOutlinedInput-input": {
      "&.Mui-disabled": {
        WebkitTextFillColor: "var(--primary-color)"
      },
    },
    "& .MuiSvgIcon-root": {
      margin: "auto",
    },
    "& .MuiInputAdornment-root": {
      position: "absolute",
      right: "15px",
      top: "50%"
    },
    "& .MuiFormLabel-asterisk": {
      display: "none"
    }
  }

} as const;

export default styles;
