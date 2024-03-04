import React, { useEffect } from 'react'
import {
    Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { isPatient, loginPatientAsync } from '../patientSlice';

function PatientLogin() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isPatientLogin = useSelector(isPatient)

    const onSubmit = (data) => {
        console.log(data);
        dispatch(loginPatientAsync(data))
    };

    useEffect(()=>{
        if(isPatientLogin === true) navigate('/')
    },[isPatientLogin])
    return (
        <div className='w-full flex items-center justify-center py-2 h-[100vh] bg-gradient-to-r from-[#7371fc] to-blue-500 '>
            <div className="w-[90%] md:w-[400px]  flex-col items-center justify-center bg-gray-100 rounded-[10px]">
                <div className="bg-white  rounded-lg px-2 py-6">
                    <h2 className="md:text-2xl text-3xl font-semibold text-gray-800 mb-4">Login</h2>
                    <Typography color="gray" className="mt-1 font-normal  text-gray-400 pb-2">
                        Enter your login credentials.
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 md:text-sm text-md font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register('email', { required: 'Email is required' })}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                                    }`}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">{errors.email.message}</span>
                            )}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 md:text-sm text-md font-bold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register('password', { required: 'Password is required' })}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''
                                    }`}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm">{errors.password.message}</span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                    </form>
                </div>
                <div className="my-6 text-center">
                    <span className="md:text-sm text-md text-gray-700">Don't have an account? </span>
                    <Link to="/patient/register" className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-700">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PatientLogin
