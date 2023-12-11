import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo1.png'
import { agencyLoginAPI } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import { adminLogincontext } from '../context/ContextShare';

function AgencyLogin() {
    const {adminLoggin,setAdminloggin}=useContext(adminLogincontext)
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState({
        email: "", password: ""
    })
    // console.log(userLogin);



    const loginUser = async (e) => {
        e.preventDefault()
        // console.log(userLogin);
        const { email, password } = userLogin
        // console.log(email, password);
        if (!email || !password) {
            toast.info('please fill the form completely')
        } else {
            const result = await agencyLoginAPI(userLogin)
            // console.log(result);
            if (result.status === 200) {
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("Role", result.data.role)
                setAdminloggin(true)
                // sessionStorage.setItem("token", JSON.stringify(result.data.token))
                toast.success('login success')
                navigate('/admin')
            } else {
                toast.error('incorrect email or password')
            }
        }

    }
    const [isAgency,setIsAgency]=useState(true)

    return (

        <>
        <Header isAgency={isAgency}/>
        <div className='md:flex md:justify-center h-[90vh]'>
            <div className='backgroundImg shadow md:mt-10 mt-40 md:w-[750px] rounded-xl h-[450px] flex justify-between'>
                <div className='md:w-[330px] w-[0px] bg-rose-600 '>
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
                                onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                                name='email'
                                id="standard-error-helper-text"
                                label="Email"
                                variant="standard"
                            />
                        </div>
                        <div className='flex'>
                            <i className="fa-solid fa-lock mt-8"></i>

                            <TextField className=''
                                onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                                name='password'
                                id="standard-error-helper-text"
                                label="Password"
                                type='password'
                                variant="standard"
                            />
                        </div>
                    </Box>
                    <div className='flex justify-center mt-6'>
                        <Button onClick={(e) => loginUser(e)} to={'/'} className=' w-[310px] rounded' variant='contained' size="large">LOGIN</Button>

                    </div>
                    <div className='flex justify-center mt-6'>
                        <p>Don't have an Account?<Link to='/agencyRegister' className='no-underline text-blue-600' href="">Register Here!</Link></p>

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

export default AgencyLogin