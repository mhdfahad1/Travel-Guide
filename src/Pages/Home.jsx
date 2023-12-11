import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import trip from '../trip.jpeg'
import Footer from '../components/Footer'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Explore from '../components/Explore';
import Crousal from '../components/Crousal';
import Slider from '../components/Slider';
import { Link } from 'react-router-dom'
import { getallAgencyAPI } from '../services/allApi'
import "aos/dist/aos.css";
import AOS from "aos";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

  const [packages, setPackages] = useState([])

  const getPackages = async () => {
    const result = await getallAgencyAPI()
    // console.log(result);
    if (result.status === 200) {
      setPackages(result.data)
    } else {
      toast.error(result.response.data)
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
      <div className='md:flex mr-10 ml-10'>
        <h1 style={{ fontFamily: 'Outfit, sans-serif' }} className='md:text-5xl text-2xl font-bold p-3 md:mt-10 mt-6'>Life is short and the world is wide!!</h1>
        <img className='mr-16 mt-10 rounded-lg peer-hover:' width={'450px'} src={trip} alt="" />
      </div>

      {/* cROUsal */}
      <Crousal />

      <h1 style={{ fontFamily: 'Outfit, sans-serif' }} className='md:mt-40 -mt-20 md:text-3xl text-xl font-bold text-center'>Popular Packages</h1>

      <Slider />
      <h1 style={{ fontFamily: 'Outfit, sans-serif' }} className='md:mt-20 text-3xl font-bold text-center'>Agencies</h1>

      {/* packages */}
      <div className='row mt-20 ml-10'>
        {packages.length > 0 ?
          packages.map((item) => (
            <div className='col-lg-4'>
              <Card className='shadow md:mr-10 md:w-[350px] w-[300px] md:mt-0 mt-10 mb-4' data-aos="zoom-in-up">
              <CardHeader

                title={item.name}
                subheader={item.placename}
              />
              <CardMedia style={{ height: '250px' }} src={item.image}
                component="img"
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions className='flex justify-between'>
                <p>Contact :{item.phone} </p>
                <Link to={`/packages/${item._id}`} className='btn btn-primary'>More Packages</Link>

              </CardActions>


            </Card>
            </div>
          ))
          :
          <p>Not Available</p>
        }

      </div>



      <Explore />

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

export default Home