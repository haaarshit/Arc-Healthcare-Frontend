import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Avatar } from '@material-tailwind/react'
import { useFieldArray, useForm } from "react-hook-form";
import ImageModal from '../../../Components/ImageModal'
import { extractTime } from '../../../Utils/UtilFunctions'

import { LocalizationProvider, TimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import AppointmentPdf from '../../../Components/AppointmentPdf'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { doctorProfile, getDoctorProfileAsync, getPatientDashboardAsync, patientDashBoard } from '../patientSlice'




function AppointmentPagePatient() {
    const dashboard = useSelector(patientDashBoard)
    const [appointment, setAppointment] = useState({})
    const { id } = useParams()
    const DoctorProfile = useSelector(doctorProfile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isAvatarModal, setAvatarModal] = useState(false)

    const handleClick = () => { setAvatarModal(!isAvatarModal) }

    useEffect(() => {
        // get the appointmet whose id matches with current id(param id)
        if (dashboard === null) dispatch(getPatientDashboardAsync())

        if (DoctorProfile === null && appointment.doctorId) {
            dispatch(getDoctorProfileAsync(appointment.doctorId))
        }
        dashboard?.appointmentList?.forEach(e => {
            if (e.id === id) setAppointment(e)
        })



    }, [dispatch, appointment, dashboard, id])


    return (
        <div>
            <>



                <main className="flex-1 md:p-0  lg:px-4 md:ml- flex flex-col">

                    <div className="container mx-auto my-5 p-5 flex flex-col justify-center  ">
                        <div className="md:flex no-wrap md:-mx-2 ">
                            <div className="container mx-auto my-5 p-5 ">
                                <div className="md:flex no-wrap md:-mx-2 ">
                                    {/* Left Side */}
                                    <div className="w-full md:w-3/12 md:mx-2">
                                        {/* Profile Card */}
                                        <div className="bg-white p-3 flex flex-col items-center border-green-400">
                                            <div className="image overflow-hidden">
                                                <Avatar src={DoctorProfile?.doctorInfo?.avatar} alt="avatar" className='rounded-full h-[100px] w-[100px]' onClick={handleClick} />
                                            </div>
                                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                                                {DoctorProfile?.doctorInfo.personalInfo.firstName}    {DoctorProfile?.doctorInfo.personalInfo.lastName}
                                            </h1>
                                            <h3 className="text-gray-600 font-lg text-semibold leading-6 mt-2">
                                            <Link to={`/doctor/${DoctorProfile?.doctorInfo.id}`} className='bg-[#7371fc] text-white rounded-sm text-sm px-2 py-1' >Visit Profile</Link>
                                            </h3>


                                        </div>
                                        {/* End of profile card */}
                                        <div className="my-4" />

                                    </div>

                                    {/* Right Side */}
                                    <div className="w-full md:w-9/12 mx-2 ">
                                        {/* Profile tab */}
                                        {/* About Section */}
                                        <div className="bg-white p-3 shadow-sm rounded-sm">
                                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                                <span clas="text-green-500">
                                                    <svg
                                                        className="h-5"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                        />
                                                    </svg>
                                                </span>
                                                <span className="tracking-wide">About</span>
                                            </div>
                                            <div className="text-gray-700">
                                                <div className="grid md:grid-cols-2 text-sm">
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Name</div>
                                                        <div className="px-4 py-2">{DoctorProfile?.doctorInfo.personalInfo.firstName}    {DoctorProfile?.doctorInfo.personalInfo.lastName}</div>
                                                    </div>

                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Gender</div>
                                                        <div className="px-4 py-2">{DoctorProfile?.doctorInfo.personalInfo.gender}</div>
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Contact No.</div>
                                                        <div className="px-4 py-2">  <a href="whatsapp://send?abid=phonenumber&text=Hello%2C%20World!"> {DoctorProfile?.doctorInfo.phone}   </a></div>

                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Address</div>
                                                        <div className="px-4 py-2">{DoctorProfile?.doctorInfo.address.street}, {DoctorProfile?.doctorInfo.address.city}, {DoctorProfile?.doctorInfo.address.state}</div>
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Email</div>
                                                        <div className="px-4 py-2">
                                                            <a className="text-blue-800" href={`mailto:${DoctorProfile?.doctorInfo.email}`}>
                                                                {DoctorProfile?.doctorInfo.email}
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Birthday</div>
                                                        <div className="px-4 py-2">{DoctorProfile?.doctorInfo.personalInfo.dateOfBirth}</div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        {/* End of about section */}
                                        <div className="my-4" />
                                    </div>
                                </div>
                                <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
                                    <div className="rounded-t mb-0 px-0 border-0">
                                        <div className="flex flex-wrap items-center px-4 py-2">
                                            <div className="relative w-full max-w-full flex-grow flex-1">
                                                <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                                                    Your Appointments with {DoctorProfile?.doctorInfo.personalInfo.firstName}    {DoctorProfile?.doctorInfo.personalInfo.lastName}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="block w-full overflow-x-auto">
                                            <table className="items-center w-full bg-transparent border-collapse">
                                                <thead>
                                                    <tr>
                                                        <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                            Date
                                                        </th>
                                                        <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                            See Appointmet
                                                        </th>
                                                        <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        DoctorProfile?.appointmentList?.map(e =>

                                                            <tr className="text-gray-700 dark:text-gray-100">
                                                                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                                    {e.appointmentDate}
                                                                </th>
                                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    {
                                                                        e.id !== id ?
                                                                            <Link to={`/patient/appointment/${e.id}`} className='bg-[#7371fc] text-white rounded-sm text-sm px-2 py-1' >Visit</Link>
                                                                            :
                                                                            <p>Current Appointment</p>
                                                                    }
                                                                </td>
                                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <div className="flex items-center">
                                                                        <span className="mr-2">{e.status}</span>
                                                                        <div className="relative w-full">
                                                                            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                                                                <div
                                                                                    style={{ width: "100%" }}
                                                                                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-}-600`}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Right Side */}
                          
                        </div>
                    </div>
                    {
                                appointment.status === 'completed' &&
                                <div>
                                    <div className="container mx-auto my-5 p-5 flex flex-col justify-center  ">
                                        <div className="md:flex no-wrap md:-mx-2 ">

                                            {/* Right Side */}
                                            <div className="w-full  mx-2 ">
                                                {/* Profile tab */}
                                                {/* About Section */}
                                                <div className="bg-white p-3 shadow-sm rounded-sm">
                                                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                                        <span clas="text-green-500">
                                                        </span>
                                                    </div>
                                                    <div className="text-gray-700 text-center">
                                                        <div className="tracking-wide text-xl font-semibold mb-4">Appointment Info</div>
                                                        <div className="grid md:grid-cols-2 text-sm text-start">
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-4 py-2 font-semibold">Date of Appointment</div>
                                                                <div className="px-4 py-2">{appointment?.appointmentDate} </div>
                                                            </div>

                                                            <div className="grid grid-cols-2">
                                                                <div className="px-4 py-2 font-semibold">Consultantion Time</div>
                                                                <div className="px-4 py-2">{appointment.startTime} to {appointment.endTime}</div>
                                                            </div>
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-4 py-2 font-semibold">Symptoms</div>
                                                                <div className="px-4 py-2">  {appointment.symptoms}</div>
                                                            </div>
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-4 py-2 font-semibold">Diagnosis</div>
                                                                <div className="px-4 py-2">{appointment.diagnosis}</div>
                                                            </div>
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-4 py-2 font-semibold">Prescription</div>
                                                                <div className="px-4 py-2">{appointment.prescription}</div>
                                                            </div>
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-4 py-2 font-semibold">Notes</div>
                                                                <div className="px-4 py-2">{appointment.notes}</div>
                                                            </div>
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-4 py-2 font-semibold">Follow Up Date</div>
                                                                <div className="px-4 py-2">{appointment.followUpDate}</div>
                                                            </div>
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-4 py-2 font-semibold">Follow Up Instructions</div>
                                                                <div className="px-4 py-2">{appointment.followUpInstructions}</div>
                                                            </div>
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-4 py-2 font-semibold">Medicines</div>
                                                                <div className="px-4 py-2">
                                                                    {
                                                                        appointment.prescribedMedications.map(e => (
                                                                            <p>{e}</p>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-4 py-2 font-semibold">Test's</div>
                                                                <div className="px-4 py-2">
                                                                    {
                                                                        appointment.labTestRequests.map(e => (
                                                                            <p>{e}</p>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                {/* End of about section */}
                                                <div className="my-4" />
                                            </div>
                                        </div>
                                        <div className=' pl-5'>
                                            <PDFDownloadLink document={<AppointmentPdf data={appointment} doctorData={DoctorProfile} />} fileName="appointment_details.pdf" className='bg-[#7371fc] text-white rounded-sm text-sm px-2 py-1 w-[110px]'>
                                                {({ loading }) => (loading ? 'Loading...' : 'Generate PDF')}
                                            </PDFDownloadLink>
                                        </div>
                                    </div>
                                </div>
                            }
                    {
                        appointment.status === 'pending' &&
                        <div>
                            <div className="container mx-auto my-5 p-5 flex flex-col justify-center  ">
                                <div className="md:flex no-wrap md:-mx-2 ">

                                    {/* Right Side */}
                                    <div className="w-full  mx-2 ">
                                        {/* Profile tab */}
                                        {/* About Section */}
                                        <div className="bg-white p-3 shadow-sm rounded-sm">
                                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                                <span clas="text-green-500">
                                                </span>
                                            </div>
                                            <div className="text-gray-700 text-center">
                                                <div className="tracking-wide text-xl font-semibold mb-4">Appointment is Pending</div>
                                                <div className="grid md:grid-cols-2 text-sm text-start">
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Date of Appointment</div>
                                                        <div className="px-4 py-2">{appointment?.appointmentDate} </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        {/* End of about section */}
                                        <div className="my-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </main>

            </>

        </div>
    )
}

export default AppointmentPagePatient
