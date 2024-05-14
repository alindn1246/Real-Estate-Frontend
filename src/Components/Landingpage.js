import React from 'react'
import './Landingpage.css'
import MyHeader from './Header/MyHeader'
import PropertyCard3 from './property/PropertyCard3'
import PropertyList3 from './property/PropertyList3'
import AboutUs from './About/AboutUs'
import WhyChooseUs from './About/WhyChooseUs'
import Footer from './MyFooter/Footer'
import NewsCardList from './News/NewsCardList'
import AgencyCarsoul from './Agency/AgencyCarsoul'

const Landingpage = () => {
  return (
    <div>
      <div className='firstSection'>
      <MyHeader/>
      </div>
      <br/>
     <div  className='SecondSection'>
      <div className='titleHeading'>
      <h1 style={{marginLeft: '20px'}}>Dream House</h1>
      </div>
    
     <PropertyList3/>
     </div>
    
     <br/>
     <div className='ThridSection'>

     <div className='titleHeading'>
       <h1 style={{marginLeft: '20px'}}>About Us</h1>
     </div>
      <AboutUs/>
     </div>

    <br/>
     <div className='fifthSection'>
     
     <div className='titleHeading'>
     <h1 style={{marginLeft: '20px'  }}>News & Tips</h1>
     </div>
    
     <NewsCardList/>
     </div>
    <br/>
    
     <br/>
     <div>
    <Footer/>
     </div>
    
     
    </div>
  )
}

export default Landingpage
