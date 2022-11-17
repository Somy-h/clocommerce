import './button.styles.scss';

export const BUTTON_TYPE = {
  google: 'google-sign-in',
  inverted: 'inverted'
};

const Button = ({
  children,
  buttonType,
  isLoading = false,
  ...otherProps
}) => {

  const spinner = <div className='spinner-container'></div>;

  return (
    <button
      className={`button-container ${BUTTON_TYPE[buttonType]}`}
      {...otherProps}
    >
      {isLoading ? spinner : children}
    </button>
  )
};
export default Button;