import React, { useEffect } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import "aos/dist/aos.css";
import AOS from "aos";

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };

}
function Explore() {
    useEffect(() => {
        AOS.init({
            disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
        });
    }, []);
    return (
        <>
            <div className='mt-20 md:w-[100%] md:h-[700px] h-[1600px] bg-slate-300 '>
                <h1 style={{ fontFamily: 'Outfit, sans-serif' }} className='pt-10 md:text-3xl text-xl font-bold text-center'>Explore More</h1>

                <div className='md:flex pt-20'>
                    <ImageList data-aos="zoom-in-up"
                        sx={{ width: 400, height: 450 }}
                        variant="quilted"
                        cols={4}
                        rowHeight={121}
                    >
                        {itemData.map((item) => (
                            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                <img
                                    {...srcset(item.img, 121, item.rows, item.cols)}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList >

                    <ImageList data-aos="zoom-in-up" className='md:ml-10'
                        sx={{ width: 400, height: 450 }}
                        variant="quilted"
                        cols={4}
                        rowHeight={121}
                    >
                        {natureData.map((item) => (
                            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                <img
                                    {...srcset(item.img, 121, item.rows, item.cols)}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>

                    <ImageList data-aos="zoom-in-up" className='md:ml-10'
                        sx={{ width: 400, height: 450 }}
                        variant="quilted"
                        cols={4}
                        rowHeight={121}
                    >
                        {FoodData.map((item) => (
                            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                <img
                                    {...srcset(item.img, 121, item.rows, item.cols)}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </div>
        </>
    );
}

const itemData = [
    {
        img: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Burger',
    },
    {
        img: 'https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Camera',
    },
    {
        img: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Coffee',
        cols: 2,
    },
    {
        img: 'https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Hats',
        cols: 2,
    },
    {
        img: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.pexels.com/photos/2311713/pexels-photo-2311713.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Basketball',
    },
    {
        img: 'https://images.pexels.com/photos/948199/pexels-photo-948199.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Fern',
    },
];

const natureData = [
    {
        img: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.pexels.com/photos/2086622/pexels-photo-2086622.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Burger',
    },
    {
        img: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Camera',
    },
    {
        img: 'https://images.pexels.com/photos/534164/pexels-photo-534164.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Coffee',
        cols: 2,
    },
    {
        img: 'https://images.pexels.com/photos/629162/pexels-photo-629162.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Hats',
        cols: 2,
    },
    {
        img: 'https://images.pexels.com/photos/165537/pexels-photo-165537.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.pexels.com/photos/1424239/pexels-photo-1424239.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Basketball',
    },
    {
        img: 'https://images.pexels.com/photos/1192671/pexels-photo-1192671.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Fern',
    },
];

const FoodData = [
    {
        img: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Burger',
    },
    {
        img: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Camera',
    },
    {
        img: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Coffee',
        cols: 2,
    },
    {
        img: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Hats',
        cols: 2,
    },
    {
        img: 'https://images.pexels.com/photos/954677/pexels-photo-954677.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.pexels.com/photos/1424239/pexels-photo-1424239.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Basketball',
    },
    {
        img: 'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Fern',
    },
];


export default Explore