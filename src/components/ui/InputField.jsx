import TextField from '@mui/material/TextField';

const InputField = ({ name, value, onChange, placeholder, type = 'text', error }) => {
  return (
    <div className="mb-4">
      <TextField
        fullWidth
        variant="outlined"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        label={placeholder}
        error={Boolean(error)}
        helperText={error}
        InputProps={{
          className: 'bg-white rounded-lg',
        }}
        InputLabelProps={{
          className: 'text-gray-700',
        }}
      />
    </div>
  );
};

export default InputField;
