import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { addWishlistAPI, getallPackagesAPI } from '../services/allApi'
import "aos/dist/aos.css";
import AOS from "aos";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Allpackages() {
    const [packages, setpackages] = useState()
    // const _id = packages[0]?.custId

    const addwishlist = async (item) => {
        console.log(item);
        if (sessionStorage.getItem("token") && sessionStorage.Role === "User") {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const result = await addWishlistAPI(item, reqHeader)
            console.log(result);
            if (result.status === 200) {
                toast.success(`${result.data.packagename} added successfully`)
            } else {
                toast.error(result.response.data)
            }
        } else {
            toast.info('please login')
        }

    }

    const getAllPackages = async () => {
        const result = await getallPackagesAPI()
        if (result.status === 200) {
            setpackages(result.data)
        } else {
            toast.warning(result.response.data)
        }
    }
    useEffect(() => {
        getAllPackages()
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
            <div className='row'>

                {packages?.length > 0 ?
                    packages.map((item) => (
                        <div className='p-10 col-lg-4'>

                            <Card md={3} sx={{ maxWidth: 345 }} className='shadow md:mt-0 mt-5 w-100' data-aos="zoom-in-up">
                                <CardHeader
                                    avatar={
                                        <Avatar >
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton>
                                            <button onClick={() => addwishlist(item)} className='btn'> <i className='fa-solid fa-heart text-rose-700' ></i></button>
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
                                        {item.description.slice(0, 40)}
                                    </Typography>
                                </CardContent>
                                <CardActions className='flex justify-between'>
                                    <p>From ₹{item.price} per person</p>
                                    <Link to={`/details/${item.custId}/${item._id}`} className='btn btn-primary'>Details</Link>

                                </CardActions>


                            </Card>
                        </div>
                    ))
                    :
                    <div>
                        <p className='text-2xl text-center'>Packages is Empty</p>
                    </div>
                }

                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    rtl={false}
                    theme="colored"
                />
            </div>

        </div>
    )
}

export default Allpackages