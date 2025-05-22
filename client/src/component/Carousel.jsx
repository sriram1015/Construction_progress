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
            
          </CCarouselCaption>
        </CCarouselItem>

        <CCarouselItem>
          <CImage className="d-block w-100" src="education.jpg" alt="slide 2" />
          <CCarouselCaption className="d-none d-md-block">
            <h5 style={{color:"#fff"}}>Higher education</h5>
            <p style={{color: "#fff"}}>Oversees the development, regulation, and quality assurance of universities and colleges to promote advanced learning and research.</p>
          </CCarouselCaption>
        </CCarouselItem>

        <CCarouselItem>
          <CImage className="d-block w-100" src="health.jpeg" alt="slide 3" />
          <CCarouselCaption className="d-none d-md-block">
            <h5 style={{color:"#fff"}}>Health Care</h5>
            <p style={{color:"#fff"}}>Manages public health systems, medical services, and infrastructure to provide accessible and quality healthcare for all.</p>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100" src="transport.jpeg" alt="slide 3" />
          <CCarouselCaption className="d-none d-md-block">
            <h5 style={{color:"#fff"}}>High Ways</h5>
            <p style={{color:"#fff"}}>Plans, constructs, and maintains road networks to ensure efficient, safe, and sustainable transportation infrastructure.</p>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100" src="rural.webp" alt="slide 3" />
          <CCarouselCaption className="d-none d-md-block">
            <h5 style={{color:"#fff"}}>Transport</h5>
            <p style={{color:"#fff"}}> Regulates and develops urban and regional transport systems to ensure efficient mobility and reduce congestion.</p>
          </CCarouselCaption>
        </CCarouselItem>
      </CCarousel>
    </div>
  );
};

export default Carousel;
