import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from 'react-router-dom';
import "aos/dist/aos.css";
import AOS from "aos";

function Slider() {
    
    useEffect(() => {
        AOS.init({
            disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
        });
    }, []);
    return (
        <Swiper
            spaceBetween={10}
            navigation={true}
            loop={false}
            // pagination={true}
            modules={[
                Navigation,
                // Pagination
            ]}
            className="swiper flex mt-10 p-4 w-[100%]"
            
            breakpoints={{
                450: {
                    slidesPerView: 1,
                },
                630: {
                    slidesPerView: 2,
                },
                920: {
                    slidesPerView: 3,
                },
                1520: {
                    slidesPerView: 4,
                },
            }}
        >
            <SwiperSlide >
                <div className='relative -ml-10 hover:scale-95 transition'>
                    <p className='absolute mt-36 ml-10 text-white text-3xl font-extrabold'>Dubai,<br />United Arab Emirates</p>
                    <img className='' width={'400px'} height={'250px'} src="https://wallpapercave.com/wp/wp8543611.jpg" alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide >
                <div className='relative -ml-8 hover:scale-95 transition'>
                    <p className='absolute mt-36 ml-8 text-white text-3xl font-extrabold'>New York,<br />Time Square</p>
                    <img className='' width={'360px'} height={'250px'} src="https://wallpapercave.com/dwp2x/wp10281977.jpg" alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide >
                <div className='relative -ml-9 hover:scale-95 transition'>
                    <p className='absolute mt-36 ml-8 text-white text-3xl font-extrabold'>Paris,<br />Eiffel Tower</p>
                    <img className='' width={'345px'} height={'250px'} src="https://th.bing.com/th/id/R.66f87d43ce28c55175dfdcab288920e9?rik=TKMzRxaHg1oZ5w&riu=http%3a%2f%2fwallsdesk.com%2fwp-content%2fuploads%2f2016%2f11%2fEiffel-Tower-Wallpaper.jpg&ehk=UbLhXdx%2bDU91mzFHumcaQXrn34vdbHfegyztooxW9EU%3d&risl=1&pid=ImgRaw&r=0" alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide >
                <div className='relative -ml-14 hover:scale-95 transition'>
                    <p className='absolute mt-36 ml-5 text-white text-3xl font-extrabold'>Maldives</p>
                    <img className='' width={'405px'} height={'250px'} src="https://th.bing.com/th/id/R.96ed969318ae9fec164d0fb0b6166c68?rik=O2CwhDO4qMPR7Q&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fe%2f0%2f7%2f1111915-widescreen-maldives-wallpaper-1920x1080-full-hd.jpg&ehk=8D5wU7G%2bEBeRhrt8dSahcBAXVQs%2fEAeubGXKj3416R8%3d&risl=&pid=ImgRaw&r=0" alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide >
                <div className='relative -ml-5 hover:scale-95 transition'>
                    <p className='absolute mt-36 ml-8 text-white text-3xl font-extrabold'>Sydney,<br />Australia</p>
                    <img className='' width={'307px'} height={'250px'} src="https://th.bing.com/th/id/OIP.rcULyV6pHRjLoVWRZFTm_QHaFj?rs=1&pid=ImgDetMain" alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide >
                <div className='relative -ml-20 hover:scale-95 transition'>
                    <p className='absolute mt-36 ml-8 text-white text-3xl font-extrabold'>Bangkok,<br />Thailand</p>
                    <img className='' width={'367px'} height={'250px'} src="https://th.bing.com/th/id/OIP.XViIEATLVS_zwK-DTp9yiwHaEo?rs=1&pid=ImgDetMain" alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide >
                <div className='relative -ml-20 hover:scale-95 transition'>
                    <p className='absolute mt-36 ml-8 text-white text-3xl font-extrabold'>India Gate,<br />India</p>
                    <img className='' width={'307px'} height={'250px'} src="https://wallpaperaccess.com/full/1896207.jpg" alt="" />
                </div>
            </SwiperSlide>
        </Swiper>
    )
}

export default Slider