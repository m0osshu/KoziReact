const Input = ({ type, placeholder, value, onChange, required, icon }) => {
  return (
    <div className="input-box">
      <input 
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      {icon && <i className={icon}></i>}
    </div>
  );
};

export default Input;