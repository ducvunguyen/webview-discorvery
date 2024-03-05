import classNames from 'classnames';

const Button = ({ type = 'button', outlined = false, children, className, ...props }) => {
  return (
    <button
      className={classNames('w-full rounded-lg align-center py-3 ' + className, {
        'bg-white text-primary border border-primary': outlined,
        'bg-primary text-white': !outlined,
      })}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
