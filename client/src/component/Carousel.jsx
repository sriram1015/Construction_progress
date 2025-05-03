// src/component/Carousel.jsx
import React from "react";
import {
  CCarousel,
  CCarouselItem,
  CCarouselCaption,
  CImage
} from "@coreui/react";

const Carousel = () => {
  return (
    <div className="carousel-wrapper" style={{ maxWidth: '900px', margin: 'auto', paddingTop: '2rem' }}>
      <CCarousel controls indicators dark>
        <CCarouselItem>
          <CImage className="d-block w-100" src="housing.jpg" alt="slide 1" />
          <CCarouselCaption className="d-none d-md-block">
            <h5>First Slide</h5>
            <p>Description of the first slide.</p>
          </CCarouselCaption>
        </CCarouselItem>

        <CCarouselItem>
          <CImage className="d-block w-100" src="dcirs.avif" alt="slide 2" />
          <CCarouselCaption className="d-none d-md-block">
            <h5>Second Slide</h5>
            <p>Description of the second slide.</p>
          </CCarouselCaption>
        </CCarouselItem>

        <CCarouselItem>
          <CImage className="d-block w-100" src="dws.jpg" alt="slide 3" />
          <CCarouselCaption className="d-none d-md-block">
            <h5>Third Slide</h5>
            <p>Description of the third slide.</p>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100" src="transport.jpeg" alt="slide 3" />
          <CCarouselCaption className="d-none d-md-block">
            <h5>Third Slide</h5>
            <p>Description of the third slide.</p>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100" src="rural.webp" alt="slide 3" />
          <CCarouselCaption className="d-none d-md-block">
            <h5>Third Slide</h5>
            <p>Description of the third slide.</p>
          </CCarouselCaption>
        </CCarouselItem>
      </CCarousel>
    </div>
  );
};

export default Carousel;
