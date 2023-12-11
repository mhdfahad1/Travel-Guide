import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { deleteWishlistAPI, getWishlistAPI } from '../services/allApi'
import "aos/dist/aos.css";
import AOS from "aos";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Wishlist() {

    const [packages, setPackages] = useState([])
    // console.log();
    const _id = packages[0]?.custId

    const getWishlistpackage = async () => {
        if (sessionStorage.getItem("token") && sessionStorage.Role === "User") {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const result = await getWishlistAPI(reqHeader)
            console.log(result);
            if (result.status === 200) {
                setPackages(result.data)
            } else {
                toast.error(result.response.data)
            }
        } else {
            toast.warning('please login')
        }
    }

    const deletewishlistpackage = async (id) => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await deleteWishlistAPI(id, reqHeader)
        if (result.status === 200) {
            getWishlistpackage()
            toast.success('Removed succssfully')
        } else {
            toast.error(result.response.data)
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem("token") && sessionStorage.Role === "User") {
            getWishlistpackage()
        } else {
            toast.warning('please login')
        }

    }, [])
    useEffect(() => {
        AOS.init({
            disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
        });
    }, []);
    return (
        <>
            <Header />
            <div className='row ml-20'>
                {packages.length > 0 ?
                    packages.map((item) => (
                       <div className='col-lg-4'>
                         <Card data-aos="zoom-in-up" sx={{ maxWidth: 345 }} className='shadow mr-10 w-100 md:mt-0 mt-5'>
                            <CardHeader
                                avatar={
                                    <Avatar >
                                    </Avatar>
                                }
                                action={
                                    <IconButton>
                                        <button onClick={() => deletewishlistpackage(item._id)} className='btn'> <i className='fa-solid fa-heart text-rose-700' ></i></button>
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
                                <Link to={`/details/${_id}/${item._id}`} className='btn btn-primary'>Details</Link>

                            </CardActions>


                        </Card>
                       </div>
                    ))
                    :
                    <div>
                        <p className='text-2xl text-center'>Wislist is Empty</p>
                    </div>
                }

            </div>
            {/* <Footer /> */}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                theme="colored"
            />
        </>
    )
}

export default Wishlist