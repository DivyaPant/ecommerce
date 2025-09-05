import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export const InputField = (props) => {
    const { label, type, name, value, onChange } = props;
    return (
 <TextField id={name} variant="outlined" margin="normal" fullWidth size="small"
 type={type}
 label={label} 
  name={name} 
  onChange={onChange}
 value={value} />
    )
};

export const CustomButton = (props) => {
    const { label, disabled, loading, sx, otherProps, onClick } = props;
    return (
        <Button 
        loading={loading}
        variant="contained" fullWidth disabled={disabled} size="large" 
        color='none'
        onClick={onClick}
        disableElevation
        {...otherProps}
        sx={{...sx, bgcolor: 'var(--color-brand-light)', 
        color: '#fff', fontWeight: '600'
    }}
        >
            {label}
        </Button>
    )
};
