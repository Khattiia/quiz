import React, { useEffect, useState } from "react";
import classes from "./Slider.module.css";

const Slider = ({
  images = [],
  autoPlay = true,
  autoPlayTime = 3000,
  children,
  ...props
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newSlideIndex =
        currentSlide >= images.length - 1 ? 0 : currentSlide + 1;
      setCurrentSlide(newSlideIndex);
    }, autoPlayTime);

    return () => clearTimeout(timer);
  }, [currentSlide, autoPlayTime, images.length]);

  return (
    <div className={classes.wrapper} {...props}>
      {images.map((imageUrl, index) => (
        <div
          className={classes.slide}
          key={index}
          style={{
            backgroundImage: `url(${imageUrl})`,
            marginLeft: index === 0 ? `-${currentSlide * 100}%` : undefined,
          }}
        ></div>
      ))}

      <div className={classes.gradient}></div>
    </div>
  );
};

export default Slider;
