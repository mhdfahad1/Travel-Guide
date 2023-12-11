import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo1.png'
import { registerUserAPI } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState(false)
    const [email, setEmail] = useState(false)
    const [phone, setPhone] = useState(false)
    const [password, setPassword] = useState(false)

    const [values, setValues] = useState({
        name: "", phone: "", email: "", password: ""
    })
    // console.log(values);

    const registerUser = async (e) => {
        e.preventDefault()
        const { name, phone, email, password } = values
        if (!name || !phone || !email || !password) {
            toast.info('Please fill the form')
        } else {
            const response = await registerUserAPI(values)
            // console.log(response);
            if (response.status == 200) {
                toast.success('Register successfull')
                navigate('/login')
            } else {
                toast.error(response.response.data)
            }
        }
    }

    const validateUser = (e) => {
        const { value, name } = e.target
        if (name === "name") {
            if (!!value.match(/^[A-Za-z" "]+$/)) {
                setName(false)
                setValues({ ...values, name: e.target.value })
            } else {
                setName(true)
            }
        } else if (name === "email") {
            if (value.endsWith("@gmail.com")) {
                setEmail(false)
                setValues({ ...values, email: e.target.value })

            } else {
                setEmail(true)
            }
        } else if (name === "phone") {
            if (!!value.match(/^[0-9" "]+$/)) {
                setPhone(false)
                setValues({ ...values, phone: e.target.value })

            } else {
                setPhone(true)
            }
        } else if (name === "password") {
            setValues({ ...values, password: e.target.value })

        }

    }

    return (
        <div className='md:flex md:justify-center h-[90vh]'>
            <div className='backgroundImg shadow md:mt-20 mt-40 md:w-[750px] rounded-xl h-[500px] flex justify-between overflow-y-hidden'>
                <div className='md:w-[330px] w-[0px] bg-sky-600'>
                    <div className='flex justify-center mt-20'>
                        <img width={'120px'} height={'20px'} src={logo} alt="" />

                    </div>                </div>
                <div className='w-[400px]'>
                    <h1 className='text-3xl p-4 text-center'>REGISTER</h1>
                    <Box className='ml-6'
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '35ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className='flex ml-5'>
                            <i className="fa-solid fa-pen mt-8 ml-2"></i>

                            <TextField onChange={(e) => validateUser(e)} className=''
                                name='name'
                                error={name === true}
                                id="standard-error-helper-text"
                                label="Name"
                                helperText={name === true ? "Incorrect entry." : ""}

                                variant="standard"
                            />
                        </div>
                        <div className='flex ml-5'>
                            <i className="fa-solid fa-phone mt-8 ml-2"></i>
                            <TextField onChange={(e) => validateUser(e)}
                                name='phone'
                                error={phone === true}
                                id="standard-error-helper-text"
                                label="Phone No"
                                helperText={phone === true ? "Incorrect entry." : ""}
                                variant="standard"
                            />
                        </div>
                        <div className='flex ml-5'>
                            <i className="fa-solid fa-envelope mt-8 ml-2"></i>
                            <TextField onChange={(e) => validateUser(e)}
                                name='email'
                                type='email'
                                error={email === true}
                                id="standard-error-helper-text"
                                label="Email"
                                helperText={email === true ? "Incorrect entry." : ""}
                                variant="standard"
                            />
                        </div>
                        <div className='flex ml-5'>
                            <i className="fa-solid fa-lock mt-8 ml-2"></i>
                            <TextField onChange={(e) => validateUser(e)}
                                name='password'
                                error={password === true}
                                id="standard-error-helper-text"
                                label="Password"
                                type='password'
                                helperText={password === true ? "Password contains one Capital letter and start with @ or #,It should be alphanumeric,Length between 8 to 14." : ""}
                                variant="standard"
                            />
                        </div>
                    </Box>
                    <div className='flex justify-center mt-3'>
                        <Button onClick={(e) => registerUser(e)} className=' w-[310px] rounded' variant='contained' size="large" disabled={email || password || name || phone === true}>REGISTER</Button>

                    </div>
                    <div className='flex justify-center mt-3'>
                        <p>Have an Account?<Link to='/login' className='no-underline  text-blue-600' href="">Login Here!</Link></p>

                    </div>

                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                theme="colored"
            />
        </div>)
}

export default Register