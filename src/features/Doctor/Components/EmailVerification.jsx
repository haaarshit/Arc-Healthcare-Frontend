import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { doctorData, doctorOtpVerificationAsync, isDoctorError } from '../doctorSlice'
import { Box, Modal } from '@mui/material'
import { useForm } from 'react-hook-form'

export function EmailVerification({ isOtpModal, handleClick, email }) {
    const { control, register, handleSubmit, formState: { errors }, setValue } = useForm();
    const isError = useSelector(isDoctorError)
    const doctor = useSelector(doctorData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
       const req = {
            email: email,
            otp: data.otp
        }
        console.log(req)
        dispatch(doctorOtpVerificationAsync(req))
    };


    useEffect(() => {
        if (isError) {
            navigate('/')
        }
        if (doctor !== null) {
            navigate('/doctor/login')
        }
    }, [])

    return (
        <div>
            <Modal
                open={isOtpModal}
                onClose={handleClick}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                className='flex items-center justify-center p-1 '
            >
                <Box className='relative border h-[200px] flex items-center  bg-white  border-none p-2 rounded-[5px]'>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <input
                            placeholder='otp'
                            type="otp"
                            id="otp"
                            {...register('otp', { required: 'Password is required' })}
                            className={`p-1 shadow appearance-none border rounded w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''
                                }`}
                        />
                        <button className='text-white p-2 bg-[#7371fc]  ' type='submit'>Submit OTP</button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default EmailVerification
