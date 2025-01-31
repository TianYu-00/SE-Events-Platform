import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ImageScroller = ({ events }) => {
  const responsive = {
    superLarge: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    large: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3,
    },
    medium: {
      breakpoint: { max: 1200, min: 900 },
      items: 3,
    },
    small: {
      breakpoint: { max: 900, min: 600 },
      items: 2,
    },
    xsmall: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  // https://github.com/YIZHUANG/react-multi-carousel?tab=readme-ov-file#specific-props
  return (
    <div>
      <Carousel
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        responsive={responsive}
        showDots={false}
        swipeable={false}
        draggable={false}
        pauseOnHover={false}
        arrows={false}
      >
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index}>
              <img
                src={event.event_thumbnail}
                className="w-full h-96 object-cover"
                alt={event.event_name ? `Thumbnail for ${event.event_name}` : "Event thumbnail"}
              />
            </div>
          ))
        ) : (
          <div className="w-full h-96" />
        )}
      </Carousel>
    </div>
  );
};

export default ImageScroller;
