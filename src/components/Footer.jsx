import React from 'react'
import logo from '../logo.png'

function Footer() {
  return (
    <div className='w-[100%] mt-20 mb-10'>
      <hr />
        <div className='row mt-10 p-10'>
            <div className="col-lg-3 mt-10 p-10">
            <img width={'120px'} height={'20px'} src={logo} alt="" />

            </div>
            <div className="col-lg-3">
                <p>About Travel Guide</p>
                <p>About Us</p>
                <p>Press</p>
                <p>Resources and Policies</p>
                <p>Careers</p>
                <p>Trust & Safety</p>
                <p>Contact us</p>
            </div>
            <div className="col-lg-3">
                <p>Explore Packages</p>
                <p>Add to wishlist</p>
                <p>Book Package</p>
                <p>Agency's </p>
                <p>Travellers' Choice</p>
            </div>
            <div className="col-lg-3 mt-10">
            <i className="fa-brands fa-facebook fs-3"></i>
            <i className="fa-brands fa-twitter ml-7 fs-3"></i>
            <i className="fa-brands fa-instagram ml-7 fs-3"></i>
            <i className="fa-brands fa-whatsapp ml-7 fs-3"></i>
            </div>
        </div>
        <div className='flex justify-center mt-10'>
        © 2023 TravelGuide LLC All rights reserved.
        </div>
    </div>
  )
}

export default Footer