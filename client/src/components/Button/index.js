import React from 'react';

const Button = (props) => {
  return <Button onClick={props.handleClick}>{props.text}</Button>;
};

export default Button;
