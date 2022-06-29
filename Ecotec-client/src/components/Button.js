const Button = ({ type = 'submit', className, ...props }) => (
  <button
    type={type}
    className={`${className} inline-block w-full px-6 py-2 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-xl cursor-pointer drop-shadow-lg text-sm bg-gradient-to-r from-blue-500 to-indigo-700`}
    {...props}
  />
);

export default Button;
