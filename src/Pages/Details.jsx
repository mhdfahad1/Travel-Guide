import React, { useContext, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, useParams } from 'react-router-dom';
import logo from '../logo.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Footer from '../components/Footer';
import { bookPackageAPI, getApackageAPI } from '../services/allApi';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { InputAdornment, TextField } from '@mui/material';
import "aos/dist/aos.css";
import AOS from "aos";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminLogincontext } from '../context/ContextShare';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Details() {
    const { adminLoggin, setAdminloggin } = useContext(adminLogincontext)

    const [apackage, setAPackage] = useState([])
    // console.log(apackage);
    const { _id } = useParams()
    const [adults, setadults] = useState(0)

    const adultsCount = (e) => {
        setadults(e.target.value)
        setAPackage({ ...apackage, adults: e.target.value })
    }

    const getApackage = async () => {
        const result = await getApackageAPI(_id)
        // console.log(result);
        if (result.status === 200) {
            setAPackage(result.data)
        } else {
            toast.error(result.response.message)
        }
    }

    const confirmbooking = (e) => {
        e.preventDefault()
        if (sessionStorage.token && sessionStorage.Role === "User") {
            // setAPackage({ ...apackage,email:JSON.parse(sessionStorage.getItem("existingUser")).email})
            setAPackage({ ...apackage, phone: JSON.parse(sessionStorage.getItem("existingUser")).phone })
            // console.log(JSON.parse(sessionStorage.getItem("existingUser")).phone);
            handleOpen()

        } else {
            toast.warning('please Login')
        }

    }
    const bookpackage = async () => {
        const { _id, packagename, image, foodDescription, foodimage, activityDescription, activityimages, stayDescription, stayimage, adults, placename, price, custId, description, datefrom, dateto, phone } = apackage
        if (!_id || !packagename || !image || !foodDescription || !foodimage || !activityDescription || !activityDescription || !activityimages || !stayDescription || !stayimage || !adults || !placename || !price || !custId || !description || !datefrom || !dateto || !phone) {
            toast.info('Fill the booking Form')
        } else {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const result = await bookPackageAPI(apackage, reqHeader)
            console.log(result);
            if (result.status === 200) {
                toast.success(`${apackage.packagename} Booking Successfully`)
                handleClose()
            } else {
                toast.error(result.response.data)
            }
        }
    }

    const currentDate = new Date().toISOString().slice(0, 10);
    useEffect(() => {
        getApackage()
    }, [])
    useEffect(() => {
        AOS.init({
            disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
        });
    }, []);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)};
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            {adminLoggin?"":<MenuItem onClick={handleProfileMenuOpen}>

                <button className='btn btn-primary' onClick={(e) => confirmbooking(e)}>Book Now</button>
            </MenuItem>}
        </Menu>
    );
    return (
        <div>
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar className='fixed shadow' position="static" color=''>
                        <Toolbar>

                            <Link to={'/'}><img width={'120px'} height={'20px'} src={logo} alt="" />
                            </Link>

                            <Box sx={{ flexGrow: 1 }} />
                            <Box className='ml-12' sx={{ display: { xs: 'none', md: 'flex' } }}>

                                <div className='mr-10'>

                                    <div className='ml-2 '>
                                        {adminLoggin?"":<button className='btn btn-primary' onClick={(e) => confirmbooking(e)}>Book Now</button>
                                        }
                                    </div>
                                </div>
                            </Box>


                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    {renderMobileMenu}
                    {renderMenu}
                </Box>
                <hr className='mt-2' />
            </div>

            <h1 style={{ fontFamily: 'Outfit, sans-serif' }} className='p-5 md:text-5xl text-xl font-bold'>Explore {apackage.packagename}</h1>
            <p className='md:pl-10 pl-2 md:text-lg text-sm'>{apackage.description}</p>
            {/* <h2></h2> */ }
            <div className='p-10 md:flex justify-center'>
                {apackage.image?.map(pkgimage => (
                    <img data-aos="zoom-in-up" width={'550px'} className='mr-10 md:mt-0 mt-4' src={pkgimage} alt="" />
                ))
                }

            </div>

            <div className=''>
                <div style={{ fontFamily: 'Outfit, sans-serif' }} className='text-4xl font-bold ml-10'>Do</div>
                <div>
                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        loop={false}
                        // pagination={true}
                        modules={[
                            Navigation,
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
                        <div>
                            {apackage?.activityimages?.map((product, index) => (
                                <SwiperSlide className=''>
                                    <div className=' hover:scale-95 transition'>
                                        <img className='rounded shadow' style={{ width: "350px", height: "250px" }} src={product} alt="" />
                                        <div className='flex justify-center'>
                                            {<p className='mt-2 text-black text-xl font-extrabold'>{apackage.activityDescription[index]}</p>
                                            }
                                        </div>

                                    </div>
                                </SwiperSlide>
                            ))}
                        </div>
                    </Swiper>
                </div>

            </div>

            <div className=''>
                <div style={{ fontFamily: 'Outfit, sans-serif' }} className='text-4xl font-bold ml-10'>Eat</div>
                <div>
                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        loop={false}
                        modules={[
                            Navigation,
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
                        <div>
                            {apackage?.foodimage?.map((product, index) => (
                                <SwiperSlide className=''>
                                    <div className=' hover:scale-95 transition'>
                                        <img className='rounded shadow' style={{ width: "350px", height: "250px" }} src={product} alt="" />
                                        <div className='flex justify-center'>
                                            {<p className='mt-2 text-black text-xl font-extrabold'>{apackage.foodDescription[index]}</p>
                                            }
                                        </div>

                                    </div>
                                </SwiperSlide>
                            ))}
                        </div>
                    </Swiper>
                </div>

            </div>

            <div className=''>
                <div style={{ fontFamily: 'Outfit, sans-serif' }} className='text-4xl font-bold ml-10'>Stay</div>
                <div>
                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        loop={false}
                        modules={[
                            Navigation,
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
                        <div>
                            {apackage?.stayimage?.map((product, index) => (
                                <SwiperSlide className=''>
                                    <div className=' hover:scale-95 transition'>
                                        <img className='rounded shadow' style={{ width: "350px", height: "250px" }} src={product} alt="" />
                                        <div className='flex justify-center'>
                                            {<p className='mt-2 text-black text-xl font-extrabold'>{apackage.stayDescription[index]}</p>
                                            }
                                        </div>

                                    </div>
                                </SwiperSlide>
                            ))}
                        </div>
                    </Swiper>
                </div>

            </div>

            <Footer />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirm Booking
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField className='form-control mb-3' value={apackage.packagename}
                            label="Package Name"
                            sx={{ m: 0, width: '41ch' }}

                        />
                        <TextField type='number' className='form-control mb-3'
                            label="Adults" onChange={(e) => adultsCount(e)} value={adults}
                            sx={{ m: 0, width: '41ch' }}
                        />
                        <div className='flex'>
                            <TextField onChange={(e) => setAPackage({ ...apackage, datefrom: e.target.value })} type='date' className='form-control mb-3'
                                label="Date from" defaultValue={(currentDate)}
                                sx={{ m: 0, width: '21ch' }}
                            />
                            <TextField onChange={(e) => setAPackage({ ...apackage, dateto: e.target.value })} type='date' className='form-control mb-3'
                                label="Date to" defaultValue={('2024-11-17')}
                                sx={{ m: 0, width: '21ch' }}
                            />
                        </div>
                        <TextField type='text' className='form-control mb-3' value={parseInt(apackage.price?.replace(/,/g, "")) * parseInt(adults)}
                            label="Price" onChange={(e) => setAPackage({ ...apackage, price: e.target.value })}
                            sx={{ m: 0, width: '41ch' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            }}
                        />
                        <div className='flex mt-2'>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => bookpackage()}>Confirm</Button>

                        </div>
                    </Typography>
                </Box>
            </Modal>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                theme="colored"
            />
        </div >
    )
}

export default Details