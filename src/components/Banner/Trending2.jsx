import React from 'react';
import pic from "../../img/hero.jpg";
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa';

const Trending2 = () => {
  return (

    <>
        <div className='container'>
            <h3>Trending</h3>
            <div className='flex-slider'>
                <span className='flex-slider__arrow'><FaArrowAltCircleLeft/></span> 
                <div className='flex-slider__row'>
                    <img src={pic} alt=""/>
                </div>
                <div className='flex-slider__row'>
                    <img src={pic} alt=""/>
                </div>
                <div className='flex-slider__row'>
                    <img src={pic} alt=""/>
                </div>
                <div className='flex-slider__row'>
                    <img src={pic} alt=""/>
                </div>
                <div className='flex-slider__row'>
                    <img src={pic} alt=""/>
                </div>
                <span className='flex-slider__arrow'><FaArrowAltCircleRight/></span> 
            </div>
       </div>
    </>
    
    )
}

export default Trending2
