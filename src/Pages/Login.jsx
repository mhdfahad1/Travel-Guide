import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo1.png'
import { loginuserAPI } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginContext } from '../context/ContextShare';

function Login() {
    const {loggined,setLoggined}=useContext(loginContext)
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState({
        email: "", password: ""
    })
    // console.log(userLogin);
    const [email, setEmail] = useState(false)

    const validateUser = (e) => {
        const { value, name } = e.target
        if (name === "email") {
            if (value.endsWith("@gmail.com")) {
                setEmail(false)
                setUserLogin({ ...userLogin, email: value })
            } else {
                setEmail(true)
            }
        }
        else if (name === "password") {
            setUserLogin({ ...userLogin, password: value })

        }

    }
    const loginUser = async (e) => {
        e.preventDefault()
        // console.log(userLogin);
        const { email, password } = userLogin
        // console.log(email, password);
        if (!email || !password) {
            toast.info('please fill the form completely')
        } else {

            const result = await loginuserAPI(userLogin)
            // console.log(result);
            if (result.status === 200) {
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("Role", result.data.role)
                sessionStorage.setItem("token", result.data.token)
                toast.success('Logined successully')
                setLoggined(true)
                navigate('/')
            } else {
                toast.warning('incorrect email or password')
            }


        }

    }
    return (
        <>
        <div className='md:flex md:justify-center h-[90vh]'>
            <div className='backgroundImg shadow md:mt-20 mt-40 md:w-[750px] rounded-xl h-[450px] flex justify-between'>
                <div className='md:w-[330px] w-[0px] bg-sky-600 '>
                <Link to={'/'} className='p-2 text-lg text-white' ><i className="fa-solid fa-arrow-left"></i></Link>

                    {/* <h1 style={{ fontFamily: 'Libre Baskerville, sans-serif' }} className='text-5xl p-3 text-white mt-16'>Discover <br /> <span className='text-6xl'>the world</span></h1> */}
                    <div className='flex justify-center mt-20'>
                        <img width={'120px'} height={'20px'} src={logo} alt="" />

                    </div>
                </div>
                <div className='w-[400px]'>
                    <h1 className='text-3xl p-5 text-center'>LOGIN</h1>
                    <Box className='ml-10 '
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '35ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className='flex'>
                            <i className="fa-solid fa-envelope mt-8 "></i>

                            <TextField className=''
                                type='email'
                                onChange={(e) => validateUser(e)}
                                name='email'
                                error={email === true}
                                id="standard-error-helper-text"
                                label="Email"
                                helperText={email === true ? "Incorrect entry." : ""}
                                variant="standard"
                            />
                        </div>
                        <div className='flex'>
                            <i className="fa-solid fa-lock mt-8"></i>

                            <TextField className=''
                                onChange={(e) => validateUser(e)}
                                name='password'
                                id="standard-error-helper-text"
                                label="Password"
                                type='password'
                                variant="standard"
                            />
                        </div>
                    </Box>
                    <div className='flex justify-center mt-6'>
                        <Button onClick={(e) => loginUser(e)} to={'/'} className=' w-[310px] rounded' variant='contained' size="large" disabled={email === true}>LOGIN</Button>

                    </div>
                    <div className='flex justify-center mt-6'>
                        <p>Don't have an Account?<Link to='/register' className='no-underline text-blue-600' href="">Register Here!</Link></p>

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
        </div>
        </>
    )
}

export default Login