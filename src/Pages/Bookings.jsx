import React, { useEffect, useState } from 'react'
import { deleteBookingAPI, getBookingsAPI } from '../services/allApi'
import Header from '../components/Header'
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import "aos/dist/aos.css";
import AOS from "aos";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Bookings() {
    const [bookings, setBookings] = useState()
    const getAllBookings = async () => {
        if (sessionStorage.getItem("token") && sessionStorage.Role === "User") {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const result = await getBookingsAPI(reqHeader)
            // console.log(result);
            if (result.status === 200) {
                setBookings(result.data)
            } else {
                toast.error(result.response.data)
            }

        } else {
            toast.warning('Please login')
        }

    }

    const Bookingdelete=async(item)=>{
        const result=await deleteBookingAPI(item._id)
        if(result.status===200){
            toast.success(`${item.packagename} Booking Cancelled`)
            getAllBookings()
        }else{
            toast.error(result.response.data)
        }
    }
    useEffect(() => {
        getAllBookings()
    }, [])
    useEffect(() => {
        AOS.init({
            disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
        });
    }, []);
    return (
        <div>
            <Header />
            <div className='row '>
                {bookings?.length > 0 ?
                    bookings.map((item) => (
                        <div className='col-lg-4 p-10'>
                            <Card sx={{ maxWidth: 345 }} className='shadow w-100 md:mt-0 mt-5' data-aos="zoom-in-up">
                            <CardHeader
                                action={
                                    <IconButton>
                                        <button onClick={()=>Bookingdelete(item)} className='btn btn-dark'>Cancel</button>
                                    </IconButton>
                                }
                               
                                title={item.packagename}
                                subheader={item.placename}
                            />
                            <CardMedia style={{ height: '250px' }} src={item.image[0]}
                                component="img"
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description.slice(0,40)}
                                </Typography>
                            </CardContent>
                            <CardActions className='flex justify-between'>
                                <p>From ₹{item.price} per person</p>
                                <button className='btn btn-primary' disabled>Booked</button>

                            </CardActions>


                        </Card>
                        </div>
                    ))
                    :
                    <div className='flex justify-center'>
                        <p className='text-2xl'>No Bookings</p>

                    </div>
                }

            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                theme="colored"
            />
        </div>
    )
}

export default Bookings