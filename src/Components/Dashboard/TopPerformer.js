import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import user from '../../images/user.svg'
import './TopPerformer.css'

//Owl Carousel Settings
const options = {
  margin: 15,
  responsiveClass: true,
  nav: true,
  loop:true,
  autoplay: true,
  smartSpeed: 1000,
  responsive: {
      0: {
          items: 1,
      },
      400: {
          items: 1,
      },
      600: {
          items: 2,
      },
      1024: {
          items: 4,
      }
  },
};

const TopPerformer = () => {
  return (
    // <OwlCarousel 
    // className='owl-theme'
    // items="4"
    // autoplay
    // loop
    // dots={false}
    // margin={15}
    // id='top-performer-id'
    // >
    <OwlCarousel className="slider-items owl-carousel owl-theme" id='top-performer-id' {...options}>
      <div className='item'>
         <div className='user-name'>
            <div className='user-status'><div className='user-icon'><img src={user} alt='user'/></div><h5>Antanio</h5></div>
            <span>8.5</span>
         </div>
         <div className='user-vol-percent'>
           <div className='user-vol-left'>
             <div className='user-vol-increase-percent'><ArrowUpwardIcon/><h5>500 %</h5></div>
             <p>Vol 250 K</p>
             <span>+10.55%</span>
           </div>
           <div className='user-vol-right'>

           </div>
         </div>
      </div>
      
      <div className='item'>
         <div className='user-name'>
            <div className='user-status'><div className='user-icon'><img src={user} alt='user'/></div><h5>Devin</h5></div>
            <span>3.5</span>
         </div>
         <div className='user-vol-percent'>
           <div className='user-vol-left'>
             <div className='user-vol-increase-percent'><ArrowUpwardIcon/><h5>200 %</h5></div>
             <p>Vol 250 K</p>
             <span>+10.55%</span>
           </div>
           <div className='user-vol-right'>

           </div>
         </div>
      </div>

      <div className='item'>
         <div className='user-name'>
            <div className='user-status'><div className='user-icon'><img src={user} alt='user'/></div><h5>Laurent</h5></div>
            <span>7.5</span>
         </div>
         <div className='user-vol-percent'>
           <div className='user-vol-left'>
             <div className='user-vol-increase-percent'><ArrowUpwardIcon/><h5>300 %</h5></div>
             <p>Vol 250 K</p>
             <span>+10.55%</span>
           </div>
           <div className='user-vol-right'>

           </div>
         </div>
      </div>

      <div className='item'>
         <div className='user-name'>
            <div className='user-status'><div className='user-icon'><img src={user} alt='user'/></div><h5>Moshe</h5></div>
            <span>8.5</span>
         </div>
         <div className='user-vol-percent'>
           <div className='user-vol-left'>
             <div className='user-vol-increase-percent'><ArrowUpwardIcon/><h5>400 %</h5></div>
             <p>Vol 250 K</p>
             <span>+10.55%</span>
           </div>
           <div className='user-vol-right'>

           </div>
         </div>
      </div>

      <div className='item'>
         <div className='user-name'>
            <div className='user-status'><div className='user-icon'><img src={user} alt='user'/></div><h5>Syed</h5></div>
            <span>5.5</span>
         </div>
         <div className='user-vol-percent'>
           <div className='user-vol-left'>
             <div className='user-vol-increase-percent'><ArrowUpwardIcon/><h5>500 %</h5></div>
             <p>Vol 250 K</p>
             <span>+10.55%</span>
           </div>
           <div className='user-vol-right'>

           </div>
         </div>
      </div>

      <div className='item'>
         <div className='user-name'>
            <div className='user-status'><h5>Cathenna</h5></div>
            <span>8.5</span>
         </div>
         <div className='user-vol-percent'>
           <div className='user-vol-left'>
             <div className='user-vol-increase-percent'><ArrowUpwardIcon/><h5>500 %</h5></div>
             <p>Vol 250 K</p>
             <span>+10.55%</span>
           </div>
           <div className='user-vol-right'>

           </div>
         </div>
      </div>

      <div className='item'>
         <div className='user-name'>
            <div className='user-status'><h5>Zahra</h5></div>
            <span>8.5</span>
         </div>
         <div className='user-vol-percent'>
           <div className='user-vol-left'>
             <div className='user-vol-increase-percent'><ArrowUpwardIcon/><h5>500 %</h5></div>
             <p>Vol 250 K</p>
             <span>+10.55%</span>
           </div>
           <div className='user-vol-right'>

           </div>
         </div>
      </div>

    </OwlCarousel>
  )
}

export default TopPerformer
