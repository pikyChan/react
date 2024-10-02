import React from "react";
import Slider from "react-slick";
import banner1 from '../assets/banner4.jpeg';
import banner2 from '../assets/banner.jpeg';
import banner3 from '../assets/banner2.jpeg';
import banner4 from '../assets/banner3.jpeg';

const HomeBanner = ()=>{

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        autoplay:true,
       
    };

    return (
        <div className='homeBannerSection'>
        <Slider {...settings}>
        <div className='homeBannerSection'>
  <img src={banner1} alt="Banner 1" style={{ width: "100%", height: "400px", borderRadius: "15px" }} />
  <img src={banner2} alt="Banner 2" style={{ width: "100%", height: "400px", borderRadius: "15px" }} />
  <img src={banner3} alt="Banner 3" style={{ width: "100%", height: "400px", borderRadius: "15px" }} />
  <img src={banner4} alt="Banner 4" style={{ width: "100%", height: "400px", borderRadius: "15px" }} />
</div>

        </Slider>
        </div>
    )
}
export default HomeBanner;