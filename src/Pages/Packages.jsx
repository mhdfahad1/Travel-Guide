import React from 'react'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Footer from '../components/Footer';
import { addWishlistAPI, agencyPackageAPI } from '../services/allApi';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Packages() {

  const { _id } = useParams()
  // console.log(_id);
  const user = { custId: _id }
  const [packages, setPackages] = useState([])
  // console.log(packages);

  const getPackages = async () => {
    const result = await agencyPackageAPI(user)
    // console.log(result);
    if (result.status === 200) {
      setPackages(result.data)
    } else {
      toast.error(result.response.data)
    }
  }

  const addwishlist = async (item) => {
    if (sessionStorage.getItem("token") && sessionStorage.Role === "User") {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const result = await addWishlistAPI(item, reqHeader)
      // console.log(result);
      if (result.status === 200) {
        toast.success(`${result.data.packagename} added successfully`)
      } else {
        toast.error(result.response.data)
      }
    } else {
      toast.warning('please login')
    }

  }
  useEffect(() => {
    getPackages()
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
      <h1 style={{ fontFamily: 'Outfit, sans-serif' }} className='p-5 md:text-5xl text-xl font-bold'>Packages</h1>
      <div className='row md:ml-20 ml-5 '>
        {packages.length > 0 ?
          packages.map((item) => (
            <div className='col-lg-4'>
              <Card sx={{ maxWidth: 345 }} className='shadow mr-10 md:mt-0 mt-5 w-100' data-aos="zoom-in-up">
                <CardHeader

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
                    {item.description.slice(0, 70)}
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
          "not available"
        }

      </div>
      <Footer />
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

export default Packages