import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

function Crousal() {
    return (
        <Carousel data-bs-theme="light" className='md:w-[1100px] w-[400px] h-[500px] mt-20 ml-2 md:ml-20'>
            <Carousel.Item className='flex justify-center'>
                <img
                    className="w-[1500px] brightness-50 img-fluid"
                    src="https://wallpaperaccess.com/full/1534857.jpg"
                    alt="First slide"
                />
                <Carousel.Caption className='w-100 left-0 top-0 p-4 flex justify-start'>
                    <div className='mt-10'>
                        <h5 style={{ fontFamily: 'Outfit, sans-serif' }} className='md:text-6xl text-xl font-semibold'>The world is yours to explore</h5>
                        <div className='flex justify-start mt-4'>
                            <button className='w-[150px] h-[50px] btn btn-light rounded-xl font-extrabold left-0 p-2 text-lg'>Learn More</button>

                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="w-[1500px] md:h-[600px] h-[240px] brightness-50 img-fliud"
                    src="https://wallpaperaccess.com/full/1431723.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption className='w-100 left-0 top-0 p-4 flex justify-start'>
                    <div className='mt-10'>
                        <h5 style={{ fontFamily: 'Outfit, sans-serif' }} className='md:text-6xl text-xl font-semibold'>Travel far enough, you meet yourself</h5>
                        <div className='flex justify-start mt-3'>
                            <button className='w-[150px] h-[50px] btn btn-light rounded-xl font-extrabold left-0 p-2'>Learn More</button>

                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="w-[1500px] brightness-50 img-fliud"
                    src="https://th.bing.com/th/id/OIP.zP23tgT-5gGqRxUiJoEX7QHaEK?w=315&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                    alt="Third slide"
                />
                <Carousel.Caption className='w-100 left-0 top-0 p-4 flex justify-start'>
                    <div className='mt-10'>
                        <h5 style={{ fontFamily: 'Outfit, sans-serif' }} className='md:text-6xl text-xl font-semibold'>The Journey Starts Here </h5>
                        <div className='flex justify-start mt-3'>
                            <button className='w-[150px] h-[50px] btn btn-light rounded-xl font-extrabold left-0 p-2'>Learn More</button>

                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>)
}

export default Crousal