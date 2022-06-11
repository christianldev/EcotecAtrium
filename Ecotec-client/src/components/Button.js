const Button = ({ type = 'submit', className, ...props }) => (
  <button
    type={type}
    className={`${className} bg-fblue-100 text-white opacity-70 transition-all shadow-sm shadow-transparent hover:shadow-blue-500 hover:opacity-100 py-3 rounded-2xl ml-4 mt-4`}
    {...props}
  />
);

export default Button;
