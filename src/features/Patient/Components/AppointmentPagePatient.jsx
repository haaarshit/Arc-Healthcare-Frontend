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
import { doctorProfile, getDoctorProfileAsync, patientDashBoard } from '../patientSlice'




function AppointmentPagePatient() {
    const dashboard = useSelector(patientDashBoard)
    const [appointment, setAppointment] = useState({})
    const { id } = useParams()
    const DoctorProfile = useSelector(doctorProfile)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        // get the appointmet whose id matches with current id(param id)
        dashboard?.appointmentList.forEach(e => {
            if (e.id === id) setAppointment(e)
        })
    }, [dispatch, appointment, dashboard])


    return (
        <div>
            <>
                {
                    appointment.status === 'completed'  &&
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

                }
            </>

        </div>
    )
}

export default AppointmentPagePatient
