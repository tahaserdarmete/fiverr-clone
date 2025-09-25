import React from "react";
import {notFound} from "../../utils/constants";

const CustomImage = (props) => {
  return (
    <img
      src={props.src}
      alt={`${props.alt}`}
      onError={(e) => (e.currentTarget.src = notFound)}
      {...props}
    />
  );
};

export default CustomImage;
