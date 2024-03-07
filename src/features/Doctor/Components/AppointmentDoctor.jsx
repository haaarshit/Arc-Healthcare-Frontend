import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doctorDashBoard, getPatientProfileAsync, patientProfile, updateAppointmentAsync } from '../doctorSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Avatar } from '@material-tailwind/react'
import { useFieldArray, useForm } from "react-hook-form";
import ImageModal from '../../../Components/ImageModal'
import { extractTime } from '../../../Utils/UtilFunctions'

import { LocalizationProvider, TimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';




function AppointmentDoctor() {
    const dashboard = useSelector(doctorDashBoard)
    const [appointment, setAppointment] = useState({})
    const { id } = useParams()
    const patient = useSelector(patientProfile)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isAvatarModal, setAvatarModal] = useState(false)

    const handleClick = () => { setAvatarModal(!isAvatarModal) }

    const {
        setValue,
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //  manage medicine
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'medicines',
    });
    // manage array of tests
    const { fields: fields1, append: append1, remove: remove1 } = useFieldArray({
        control,
        name: 'tests',
    });

    const submitHandler = (data) => {
        dispatch(updateAppointmentAsync(appointment.id,data))
        console.log(data)
    }

    useEffect(() => {
        // get the appointmet whose id matches with current id(param id)
        dashboard?.appointmentList.forEach(e => {
            if (e.id === id) setAppointment(e)
        })

        console.log(appointment)
        // fetch the patient of the appointment
        if (appointment.patientId) dispatch(getPatientProfileAsync(appointment.patientId))

        const beforeUnloadListener = (event) => {
            navigate(-1)
            // event.preventDefault();
            // event.returnValue = ""; // Chrome requires a non-empty string as return value
        };
        window.addEventListener("beforeunload", beforeUnloadListener);

    
    }, [dispatch, appointment])


    return (
        <div>
            <>
                {/* patient profil */}
                {
                    patient &&
                    <div className="container mx-auto my-5 p-5 ">
                        <div className="md:flex no-wrap md:-mx-2 ">
                            {/* Left Side */}
                            <div className="w-full md:w-3/12 md:mx-2">
                                {/* Profile Card */}
                                <div className="bg-white p-3 flex flex-col items-center border-green-400">
                                    <div className="image overflow-hidden">
                                        <Avatar src={patient.patientInfo.avatar} alt="avatar" className='rounded-full h-[100px] w-[100px]' onClick={handleClick} />
                                    </div>
                                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                                        {patient.patientInfo.personalInfo.firstName}    {patient.patientInfo.personalInfo.lastName}
                                    </h1>
                                    <h3 className="text-gray-600 font-lg text-semibold leading-6 bg-">
                                        {patient.patientInfo.personalInfo.gender}
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
                                                <div className="px-4 py-2">{patient.patientInfo.personalInfo.firstName}    {patient.patientInfo.personalInfo.lastName}</div>
                                            </div>

                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Gender</div>
                                                <div className="px-4 py-2">{patient.patientInfo.personalInfo.gender}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Contact No.</div>
                                                <div className="px-4 py-2">  <a href="whatsapp://send?abid=phonenumber&text=Hello%2C%20World!"> {patient.patientInfo.phone}   </a></div>

                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Address</div>
                                                <div className="px-4 py-2">{patient.patientInfo.personalInfo.address.street}, {patient.patientInfo.personalInfo.address.city}, {patient.patientInfo.personalInfo.address.state}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Nationality</div>
                                                <div className="px-4 py-2">{patient.patientInfo.personalInfo.nationality}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Email</div>
                                                <div className="px-4 py-2">
                                                    <a className="text-blue-800" href={`mailto:${patient.patientInfo.email}`}>
                                                        {patient.patientInfo.email}
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Birthday</div>
                                                <div className="px-4 py-2">{patient.patientInfo.personalInfo.dateOfBirth}</div>
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
                                            Appointments
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
                                                patient.appointmentList.map(e =>

                                                    <tr className="text-gray-700 dark:text-gray-100">
                                                        <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                            {e.appointmentDate}
                                                        </th>
                                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            <Link to={`/doctor/appointment/${e.id}`} className='bg-[#7371fc] p-1 rounded-md'>Visit</Link>
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

                }
                {/* current appointment */}
                <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
                    <section className="bg-cream-lighter p-4 shadow">
                        <div className="md:flex">
                            <h2 className="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">
                                Update Appointmet
                            </h2>
                        </div>
                        {
                            appointment.status === 'pending' && // show iff status is pending

                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="md:flex mb-8">
                                    <div className="md:w-1/3">
                                        <legend className="uppercase tracking-wide text-sm">
                                            Date of Appointment
                                        </legend>
                                        <p className="text-xs font-light text-red">
                                            {appointment.appointmentDate}
                                        </p>
                                    </div>
                                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                                        <div className="md:flex mb-4">

                                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                <div className='m-2'>
                                                    <TimePicker
                                                        label="Select Opening Time"
                                                        renderInput={(params) => <TextField {...params} />}
                                                        format="hh:mm a"
                                                        onChange={(time) => {
                                                            const selectedTime = extractTime(time)
                                                            console.log(selectedTime)

                                                            setValue('startTime', selectedTime)
                                                        }}
                                                    />
                                                </div>
                                                <div className='m-2'>
                                                    <TimePicker
                                                        label="Select Closing Time"
                                                        renderInput={(params) => <TextField {...params} />}
                                                        format="hh:mm a"
                                                        onChange={(time) => {
                                                            const selectedTime = extractTime(time)
                                                            console.log(selectedTime)

                                                            setValue('endTime', selectedTime)
                                                        }}

                                                    />
                                                </div>
                                            </LocalizationProvider>
                                        </div>
                                        <div className="md:flex mb-4">
                                            <div className="md:flex-1 md:pr-3">
                                                <input
                                                    className="w-full shadow-inner p-4 border-0"
                                                    type="text"
                                                    {...register("symptoms", { required: true })}
                                                    placeholder="Enter symptomps"
                                                />
                                                {errors.endTime && <span className="text-xs text-red">{errors.endTime.message}</span>}
                                            </div>
                                            <div className="md:flex-1 md:pr-3">

                                                <input
                                                    className="w-full shadow-inner p-4 border-0"
                                                    type="text"
                                                    {...register("diagnosis", { required: true })}
                                                    placeholder="Diagnosis data"
                                                />
                                                {errors.endTime && <span className="text-xs text-red">{errors.endTime.message}</span>}
                                            </div>
                                        </div>
                                        <div className="md:flex mb-4">
                                            <div className="md:flex-1 md:pr-3">

                                                <input
                                                    className="w-full shadow-inner p-4 border-0"
                                                    type="text"
                                                    {...register("prescription", { required: true })}
                                                    placeholder="Prescription"
                                                />
                                                {errors.prescription && <span className="text-xs text-red">{errors.prescription.message}</span>}
                                            </div>
                                            <div className="md:flex-1 md:pr-3">

                                                <input
                                                    className="w-full shadow-inner p-4 border-0"
                                                    type="text"
                                                    {...register("notes", { required: true })}
                                                    placeholder="Notes if any"
                                                />
                                                {errors.endTime && <span className="text-xs text-red">{errors.endTime.message}</span>}
                                            </div>
                                        </div>
                                        <div className="md:flex mb-4">
                                            <div className="md:flex-1 md:pr-3">
                                                <label className="block uppercase tracking-wide text-charcoal-darker text-xs    ">
                                                    Follow Up Date
                                                </label>
                                                <input
                                                    className="w-full shadow-inner p-4 border-0"
                                                    type="date"
                                                    {...register("followUpDate", { required: true })}
                                                    placeholder="Follow Up Date"
                                                />
                                                {errors.followUpDate && <span className="text-xs text-red">{errors.followUpDate.message}</span>}
                                            </div>
                                            <div className="md:flex-1 md:pr-3">
                                                <label className="block uppercase tracking-wide text-charcoal-darker text-xs    ">
                                                    Follow Up Instructions
                                                </label>
                                                <input
                                                    className="w-full shadow-inner p-4 border-0"
                                                    type="text"
                                                    {...register("followUpInstructions", { required: true })}
                                                    placeholder="Follow Up Instructions"
                                                />
                                                {errors.followUpInstructions && <span className="text-xs text-red">{errors.followUpInstructions.message}</span>}
                                            </div>
                                        </div>
                                        <div className="md:flex mb-4">
                                            <div className="md:flex-1 md:pr-3 mb-1">
                                                {fields.map((field, index) => (
                                                    <div key={field.id} className="flex mb-4">
                                                        <label htmlFor={`medicines.${index}`} className="w-1/4 mr-2 text-sm">Medicine Name:</label>
                                                        <input
                                                            {...register(`medicines.${index}`)}
                                                            id={`medicines.${index}`}
                                                            placeholder="Enter medicine name"
                                                            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                        // Add required or other validation attributes
                                                        />
                                                        {errors[`medicines.${index}`] && <p className="text-red-500 text-xs ml-2">{errors[`medicines.${index}`]?.message}</p>}

                                                        {/* ... Other input fields for dosage, frequency, etc. */}

                                                        <button type="button" className="ml-1 py-1 px-2 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none"
                                                            onClick={() => remove(index)}>Remove</button>
                                                    </div>
                                                ))}
                                                <button type="button" className='bg-[#7371fc] text-white py-1 px-2 rounded-md' onClick={() => append('')}>Add Medicine</button>
                                            </div>
                                            <div className="md:flex-1 md:pr-3">

                                                {fields1.map((field, index) => (
                                                    <div key={field.id} className="flex mb-4">
                                                        <label htmlFor={`tests.${index}`} className="w-1/4 mr-2 text-sm">
                                                            Test Name:
                                                        </label>
                                                        <input
                                                            {...register(`tests.${index}`)}
                                                            id={`tests.${index}`}
                                                            placeholder="Enter test name"
                                                            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                        // Add required or other validation attributes
                                                        />
                                                        {errors[`tests.${index}`] && (
                                                            <p className="text-red-500 text-xs ml-2">{errors[`tests.${index}`]?.message}</p>
                                                        )}

                                                        {/* ... Other input fields for dosage, frequency, etc. */}

                                                        <button
                                                            type="button"
                                                            className="ml-auto py-1 px-2 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none ml-1"
                                                            onClick={() => remove1(index)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}

                                                <button type="button" className='bg-[#7371fc] text-white p-1 px-2 rounded-md' onClick={() => append1('')}>Add Test</button>
                                            </div>
                                        </div>
                                        <button type='submit' className='bg-[#7371fc] text-white p-1 px-2 rounded-md'>Update Appointment</button>
                                    </div>
                                </div>

                            </form>
                        }
                        {
                        }
                    </section>

                </main>
                <ImageModal isAvatarModal={isAvatarModal} handleClick={handleClick} avatar={patient?.patientInfo.avatar} />
            </>

        </div>
    )
}

export default AppointmentDoctor
