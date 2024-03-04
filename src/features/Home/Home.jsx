import { Avatar } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllDoctorAsync, getAllDoctors, getDoctorDashboardAsync, isDoctor } from '../Doctor/doctorSlice'
import { isPatient } from '../Patient/patientSlice'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";


function Home() {
    const doctors = useSelector(getAllDoctors)
    const dispatch = useDispatch()
    const isPatientLoggedIn = useSelector(isPatient)
    const isDoctorLoggedIn = useSelector(isDoctor)
    useEffect(() => {
        dispatch(getAllDoctorAsync())
        if (isDoctorLoggedIn) {
            dispatch(getDoctorDashboardAsync())
        }
        if (isPatientLoggedIn) {
            // dispatch(getDoctorDashboardAsync())
        }

    }, [])
    return (
        <div className='overflow-hidden'>
            <>
                <section className="px-2">
                    <div className="container">
                        <>
                            {/* component */}
                            <div className="">
                                <div className="flex  bg-white md:h-auto h-[100vh] " >
                                    <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                                        <div>
                                            <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
                                                Welcome To <span className='text-[#7371fc]'>HEALTH ARC</span>
                                            </h2>

                                            <p className="text-base text-body-color">
                                                A platform which connects you with the right doctors. <br />
                                                And enable patients and doctors to connect with each other.
                                            </p>
                                            <div className="flex justify-center lg:justify-start mt-6">
                                                {!isDoctorLoggedIn && !isPatientLoggedIn &&
                                                    <>
                                                        <Link
                                                            className="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800"
                                                            href="#"
                                                        >
                                                            Get Started
                                                        </Link>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="hidden lg:block w-[50%]  "
                                        style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)" }}
                                    >

                                        <img src="https://img.freepik.com/free-vector/doctor-taking-blood-sample-old-patient-hospital-man-doing-checkup-examination-clinic-senior-sitting-chair_575670-1318.jpg?w=740&t=st=1709570480~exp=1709571080~hmac=4eac7bcda45055aa30c87fb56572a00f5c1f6d70729e3f6b0c69d784ed356ddf" alt="" className='h-[]' />
                                    </div>
                                </div>
                            </div>

                        </>

                        {isPatientLoggedIn &&
                            <div className="flex flex-col items-center ">
                                <h2
                                    className="font-bold text-3xl sm:text-4xl sm:text-start text-center text-dark mt-12 mb-6"
                                >
                                    Connect with best  <span className='text-[#7371fc]'>Doctors</span>
                                </h2>
                                <div className="flex flex-wrap justify-between px-2">

                                    <DoctorCards doctors={doctors} />
                                </div>


                            </div>
                        }
                    </div>
                </section>
            </>
        </div>
    )
}

const DoctorCards = ({ doctors }) => {
    return (
        <>


            {
                doctors && doctors.map(doctor =>
                    // <div className="w-full px-4 sm:w-[25vw]">
                    //     <div className=" p-10 md:px-7 xl:px-10 rounded-[20px] flex flex-col items-center bg-white shadow-md hover:shadow-lg mb-8 ">
                    //         <div className=" w-[70px] h-[70px] flex items-center justify-center bg-primary rounded-2xl mb-8">
                    //             <Avatar src={doctor.avatar} alt="avatar" />
                    //         </div>
                    //         <h4 className="font-semibold text-xl text-dark mb-3">
                    //             {doctor.personalInfo.firstName} {doctor.personalInfo.lastName}
                    //         </h4>
                    //         <p className="text-body-color">
                    //             {doctor.professionalInfo.qualifications[0].degree}
                    //         </p>
                    //         <p>
                    //             {doctor.professionalInfo.specializations[0]}
                    //         </p>
                    //         <Link to={`/doctor/${doctor.id}`} className='bg-[#7371fc] text-white text-xl mt-3 p-2 rounded-[15px]'>Visit Profile</Link>
                    //     </div>
                    // </div>
                    <>
                        <Card className="mx-2 my-2 w-full px-4 sm:w-[22vw] rounded-[10px] ">
                            <CardHeader color="blue-gray" className="relative ">
                                <img
                                    src={doctor.avatar}
                                    alt="card-image"
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {doctor.personalInfo.firstName} {doctor.personalInfo.lastName}
                                </Typography>
                                <Typography>
                                    {doctor.professionalInfo.specializations[0]}
                                </Typography>
                                <Typography>
                                    {doctor.professionalInfo.qualifications[0].degree}
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <Link to={`/doctor/${doctor.id}`}>
                                    <Button className='bg-[#7371fc] px-1'>Read More</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </>
                )
            }
        </>
    )

}

export default Home