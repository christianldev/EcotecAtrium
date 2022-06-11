const Input = ({ disabled = false, className, ...props }) => (
  <input
    disabled={disabled}
    className={`${className} w-full border-2 border-gray-100 rounded-xl  mt-1 bg-transparent`}
    {...props}
  />
);

export default Input;
