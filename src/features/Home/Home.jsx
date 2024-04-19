import { Avatar } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getAllDoctorAsync, getAllDoctors, getDoctorByCityAsync, getDoctorDashboardAsync, isDoctor } from '../Doctor/doctorSlice'
import { getPatientDashboardAsync, isPatient } from '../Patient/patientSlice'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useForm } from 'react-hook-form'
import GetStartedModal from '../../Components/GetStartedModal'
import { Search } from '@mui/icons-material'


function Home() {

    const { control, register, handleSubmit, formState: { errors }, setValue } = useForm();
    const onSubmit = (data) => {
        console.log(data.cityname)
        dispatch(getDoctorByCityAsync(data.cityname))
    }

    const [isOpenGetStartedModal, setGetStartedModal] = useState(false)
    const handleIsOpenGetStartedModal = () => { setGetStartedModal(!isOpenGetStartedModal) }

    const doctors = useSelector(getAllDoctors)
    const dispatch = useDispatch()
    const isPatientLoggedIn = useSelector(isPatient)
    const isDoctorLoggedIn = useSelector(isDoctor)
    useEffect(() => {
        dispatch(getAllDoctorAsync())
        dispatch(getDoctorDashboardAsync())
        dispatch(getPatientDashboardAsync())

    }, [dispatch])
    return (
        <div className='overflow-hidden'>
            <>
                <section className="px-2">
                    <div className="container">
                        <>
                            {/* component */}
                            <div className="">
                                <div className="flex  bg-white  h-[100vh] " >
                                    <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                                        <div>
                                            <h1 class="col-start-1 row-start-2 mt-4 max-w-[36rem] text-4xl font-extrabold tracking-tight text-slate-900 sm:text-7xl xl:max-w-[43.5rem]">  Welcome To <span className='text-[#7371fc]'>HEALTH ARC</span></h1>

                                            <p class="col-start-1 row-start-3 mt-4 max-w-lg text-lg text-slate-700">  A platform which connects you with the right doctors. <br />
                                                And enable patients and doctors to connect with each other.</p>
                                            <div className="flex justify-center lg:justify-start mt-6">
                                                {!isDoctorLoggedIn && !isPatientLoggedIn &&
                                                    <>
                                                        <button
                                                            className="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800"
                                                            onClick={handleIsOpenGetStartedModal}
                                                        >
                                                            Get Started
                                                        </button>
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

                                {/* Filter doctor by city */}


                                <h2
                                    className="font-bold text-3xl sm:text-4xl sm:text-start text-center text-dark mt-12 mb-6"
                                >
                                    Connect with best  <span className='text-[#7371fc]'>Doctors</span>
                                </h2>
                                <FilterDoctorByCityForm onSubmit={onSubmit} register={register} handleSubmit={handleSubmit} />
                                <div className="flex flex-wrap justify-between px-2">
                                    {doctors && doctors.length > 0 && (
                                        <DoctorCards doctors={doctors} />
                                    )}
                                </div>


                            </div>
                        }
                    </div>
                    <GetStartedModal isGetStarted={isOpenGetStartedModal} handleClick={handleIsOpenGetStartedModal} />
                </section>
            </>
        </div>
    )
}

const DoctorCards = ({ doctors }) => {
    return (
        <>
            {doctors?.length > 0 ? (
                doctors?.map(doctor =>
                    <>
                        <Card className="mx-2 my-2 w-full px-4 sm:w-[22vw] rounded-[10px] my-4 ">
                            <CardHeader color="blue-gray" className="relative ">
                                <img
                                    src={doctor.avatar}
                                    alt="card-image"
                                    className='h-[30vh]'
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {doctor.personalInfo?.firstName} {doctor.personalInfo.lastName}
                                </Typography>
                                <Typography>
                                    {doctor.professionalInfo?.specializations[0]}
                                </Typography>
                                <Typography>
                                    {doctor.professionalInfo?.qualifications[0].degree}
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <Link to={`/doctor/${doctor.id}`}>
                                    <Button className='bg-[#7371fc] px-1 font-semibold'>Read More</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </>
                )
            )
                :
                (
                    <p>No doctors to display</p>
                )
            }
        </>
    )

}


const FilterDoctorByCityForm = ({ register, handleSubmit, onSubmit }) => {

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-2'>  <div className='flex w-full items-center'>
            <input
                type="text"
                placeholder='Filter Doctor by City'
                {...register(`cityname`)}
                className="w-full rounded-md shadow-sm border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button type='submit' className='bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700'>
                <Search />
            </button>
        </div>
        </form>

    )
}

export default Home
