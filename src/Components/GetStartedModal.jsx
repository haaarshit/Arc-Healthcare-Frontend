import { Box, Modal } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function GetStartedModal({ isGetStarted, handleClick }) {
    return (
        <div>
            <Modal
                open={isGetStarted}
                onClose={handleClick}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                className='flex items-center justify-center p-1 '
            >
                <Box className='relative border  border-none'>
                    <div className="w-[80vw] sm:w-[33vw] mx-auto rounded-lg bg-white shadow-md overflow-hidden">
                        <div className="modal-header px-4 py-5 border-b border-gray-200">
                            <h5 className="text-xl font-medium leading-tight text-gray-800 text-center" >
                                Connect With Us
                            </h5>
                        </div>
                        <div className="modal-body px-4 py-5">
                            <div className="flex flex-col space-y-2 w-full items-center">
                                <Link to="/doctor/register" className="text-white px-2 py-1 rounded-sm bg-[#7371fc]">
                                    Doctor Sign-Up
                                </Link>
                                <Link to="/patient/register"  className="text-white px-2 py-1 rounded-sm bg-[#7371fc]">
                                    Patient Sign-Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default GetStartedModal
