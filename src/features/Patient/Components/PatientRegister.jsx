import { Typography, useSelect } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { createPatientAsync, isPatient, patientData } from '../patientSlice';


function PatientRegister() {
    const { control, register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const patientInfo = useSelector(patientData)
    const isPatientRegistered = useSelector(isPatient)


    const { fields: alleryFields, append: alleryAppend, remove: removeAllery } = useFieldArray({ control, name: 'allergies' });
    const { fields: dietFields, append: dietAppend, remove: removeDiet } = useFieldArray({ control, name: 'dietPreferences' });

    const bloodGroupArray = [
        'A+',
        'A-',
        'B+',
        'B-',
        'O+',
        'O-',
        'AB+',
        'AB-',
    ]

    const onSubmit = async (data) => {
        console.log(data);
        dispatch(createPatientAsync(data))
    };

    useEffect(() => {
        if (isPatientRegistered === true && patientInfo !== null) {
            navigate('/')
            console.log("isregistered______________")
        }
    }, [isPatientRegistered])


    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-[10px] py-2 bg-gray-200">
            <div className=" sm:w-[80%] w-full">
                <div className="grid sm:grid-cols-2  gap-16 p-8 mx-auto w-full  bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] ">
                    <div>
                        <h1 className="text-3xl font-extrabold">Let's Connect</h1>
                        <p className="text-sm text-gray-400 mt-3">
                            Welcomt to Health Arc
                        </p>
                        <div className="mt-12">
                            <h2 className="text-lg font-extrabold">Email</h2>
                            <ul className="mt-3">
                                <li className="flex items-center">
                                    <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                        <EmailIcon />
                                    </div>
                                    <a
                                        target="blank"
                                        href="mailto:harshittripathi730@gmail.com"
                                        className="text-sm ml-3"
                                    >
                                        <small className="block">Mail</small>
                                        <strong>Mail us</strong>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-12">
                            <h2 className="text-lg font-extrabold">Socials</h2>
                            <ul className="flex mt-3 space-x-4">
                                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                    <a href="https://github.com/coderharsx1122" target='blank'>
                                        <InstagramIcon />
                                    </a>
                                </li>
                                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                    <a href="https://github.com/coderharsx1122" target='blank'>
                                        <GitHubIcon />
                                    </a>
                                </li>
                                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                    <a href="https://www.linkedin.com/in/harshit-tripathi-374046228/" target='blank'>
                                        <LinkedInIcon />
                                    </a>
                                </li>
                            </ul>
                            <div className="my-6 text-center">
                                <span className="md:text-sm text-md text-gray-700">Alreadt have an account? </span>
                                <Link to="/doctor/login" className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-700">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white  rounded-lg px-2 ">
                        <h2 className="md:text-2xl text-3xl text-center font-semibold text-gray-800 mb-4">Register</h2>
                        <Typography color="gray" className="mt-1 font-normal text-center text-gray-400 pb-2">
                            Create your id.
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="mb-4">

                                <input
                                    placeholder='email'
                                    type="email"
                                    id="email"
                                    {...register('email', { required: 'Email is required' })}
                                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                                        }`}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                                )}
                            </div>
                            <div className="mb-6">
                                <input
                                    placeholder='Password'
                                    type="password"
                                    id="password"
                                    {...register('password', { required: 'Password is required' })}
                                    className={`py-3 shadow appearance-none border rounded w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''
                                        }`}
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-sm">{errors.password.message}</span>
                                )}
                            </div>
                            <div className="mb-4">
                                <input
                                    placeholder='Phone'
                                    type="tel"
                                    id="phone"
                                    {...register('phone', { required: 'Phone is required' })}
                                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                                        }`}
                                />
                                {errors.phone && (
                                    <span className="text-red-500 text-sm">{errors.phone.message}</span>
                                )}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700 md:text-sm text-md font-bold mb-2">
                                    Image Avatar
                                </label>
                                <input
                                    placeholder='avatar'
                                    type="file"
                                    id="fileInput"
                                    name="file"
                                    {...register('avatar', { required: 'Avatar is required' })}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                                        }`}
                                //       class="file:bg-white file:text-gray-500 file:border file:border-gray-300 file:rounded
                                //  file:hover:bg-gray-100 file:focus:bg-white file:focus:border-indigo-500 file:focus:outline-none"
                                />
                                {errors.avatar && (
                                    <span className="text-red-500 text-sm">{errors.avatar.message}</span>
                                )}
                            </div>
                            <h1 className="block text-gray-700 md:text-md text-xl font-bold mb-2">Personal Info</h1>
                            <PersonalInfo register={register} errors={errors} />
                            {/* Allergies */}
                            <h1 className="block text-gray-700 md:text-md text-xl font-bold mb-2">Allergies</h1>
                            <div className='mb-4'>

                                {alleryFields.map((field, index) => (

                                    <div key={field.id} className="flex flex-col space-y-1 border rounded-md p-2">
                                        <h1>{index + 1}</h1>
                                        <input

                                            {...register(`allergies.${index}.allergen`)}
                                            id={field.id}
                                            placeholder="Enter allergen name"
                                            className="px-3 py-2 rounded-md border focus:outline-none focus:ring-blue-500 focus:ring-1"
                                        />
                                        <br />
                                        <label htmlFor={`${field.id}-severity`}>State of Allergy:</label>
                                        <select
                                            {...register(`allergies.${index}.severity`)}
                                            id={`${field.id}-severity`}
                                            className="px-3 py-2 rounded-md border focus:outline-none focus:ring-blue-500 focus:ring-1"
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                        <br />

                                        <textarea
                                            {...register(`allergies.${index}.notes`)}
                                            id={`${field.id}-notes`}
                                            placeholder="Enter additional notes (optional)"
                                            className="px-3 py-2 rounded-md border focus:outline-none focus:ring-blue-500 focus:ring-1"
                                        />
                                        <br />
                                        <button type="button" className='bg-red-500 my-1 text-white p-1 px-2 rounded-[10px]' onClick={() => removeAllery(index)}>
                                            Remove Allergy
                                        </button>
                                    </div>
                                ))}
                                <button type="button" className='bg-[#7371fc] text-white p-1 px-2 rounded-[10px] mt-1' onClick={() => alleryAppend({ allergen: '', severity: 'low' })}>
                                    Add Allergy
                                </button>
                            </div>

                            <div className='mb-4 flex flex-col space-y-1 border rounded-md p-2'>
                                <label htmlFor="phone" className="block text-gray-700 md:text-sm text-md font-bold mb-2">
                                    Blood Group
                                </label>
                                <select
                                    {...register(`bloodType`)}
                                    id={`bloodType`}
                                    className="px-3 py-2 rounded-md border focus:outline-none focus:ring-blue-500 focus:ring-1"
                                >
                                    {
                                        bloodGroupArray.map(e => (

                                            <option value={e}>{e}</option>
                                        ))
                                    }
                                </select>


                            </div>
                            <div className="mb-4">

                                <input
                                    placeholder='Height in cm'
                                    type="number"
                                    id="number"
                                    name="file"
                                    {...register('height', { required: 'Height is required'})}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                                        }`}
                                />
                                {errors.height && (
                                    <span className="text-red-500 text-sm">{errors.height.message}</span>
                                )}
                            </div>
                            <div className="mb-4">

                                <input
                                    placeholder='Weight in KG'
                                    type="number"
                                    id="number"
                                    name="file"
                                    {...register('weight', { required: 'Weight is required', max: { value: 200, message: "Weight can't exceed 200" } })}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                                        }`}
                                />
                                {errors.weight && (
                                    <span className="text-red-500 text-sm">{errors.weight.message}</span>
                                )}
                            </div>
                            <div className='mb-4'>

                                {dietFields.map((field, index) => (

                                    <div key={field.id} className="flex flex-col space-y-1 border rounded-md p-2">
                                        <h1>{index + 1}</h1>
                                        <input

                                            {...register(`dietPreferences.${index}`)}
                                            id={`dietPreferences${field.id}`}
                                            placeholder="Enter Diet Preference"
                                            className="px-3 py-2 rounded-md border focus:outline-none focus:ring-blue-500 focus:ring-1"
                                        />


                                        <br />
                                        <button type="button" className='bg-red-500 my-1 text-white p-1 px-2 rounded-[10px]' onClick={() => removeDiet(index)}>
                                            Remove Diet
                                        </button>
                                    </div>
                                ))}
                                <button type="button" className='bg-[#7371fc] text-white p-1 px-2 rounded-[10px] mt-1' onClick={() => dietAppend('')}>
                                    Add Diet Preferences
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="my-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                            >
                                Register
                            </button>

                        </form>
                    </div>
                </div>
            </div >

        </div>
    )
}

// PersonalInfo component
const PersonalInfo = ({ register, errors }) => {
    return (
        <div>
            <div className=''>
                <div className='mb-4'>
                    {/* <label htmlFor="firstName" className="block text-gray-700 md:text-sm text-md font-bold mb-2">First name:</label> */}
                    <input placeholder='First Name' type="text" id="firstName" name="personalInfo.firstName" {...register('personalInfo.firstName', { required: 'First Name is required' })}
                        className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.personalInfo && errors.personalInfo.firstName && (
                        <span className="text-red-500 text-sm">{errors.personalInfo.firstName.message}</span>
                    )}
                </div>
                <div className='mb-4'>


                    {/* <label htmlFor="lastName" className="block text-gray-700 md:text-sm text-md font-bold mb-2">Last name:</label> */}
                    <input type="text" placeholder='Last Name' id="lastName" name="personalInfo.firstName" {...register('personalInfo.lastName', { required: 'Last Name is required' })}
                        className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.personalInfo && errors.personalInfo.lastName && (
                        <span className="text-red-500 text-sm">{errors.personalInfo.lastName.message}</span>
                    )}
                </div>
            </div>

            <div className='mb-4'>
                <label htmlFor="gender" className="block text-gray-700 md:text-sm text-md font-bold mb-2">Gender:</label>
                <div className='flex flex-col  mb-2 w-[100px]'>
                    <div className='flex'>
                        <p className='mx-1 '>Male</p>
                        <input type="radio" value="male" id="gender" name="personalInfo.firstName" {...register('personalInfo.gender', { required: 'Gender is required' })}
                        />
                    </div>
                    <div className='flex'>
                        <p className='mx-1 '>Female</p><input type="radio" value="female" id="gender" name="personalInfo.firstName" {...register('personalInfo.gender', { required: 'Gender is required' })}
                        />
                    </div>
                </div>

                {errors.personalInfo && errors.personalInfo.gender && (
                    <span className="text-red-500 text-sm">{errors.personalInfo.gender.message}</span>
                )}

            </div>

            <div className='mb-4'>
                <label htmlFor="dob" className="block text-gray-700 md:text-sm text-md font-bold mb-2">DoB:</label>
                <input type="date" id="dob" name="personalInfo.dateOfBirth" {...register('personalInfo.dateOfBirth', { required: 'dateOfBirth is required' })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                        }`}
                />
                {errors.personalInfo && errors.personalInfo.dateOfBirth && (
                    <span className="text-red-500 text-sm">{errors.personalInfo.dateOfBirth.message}</span>
                )}
            </div>

            <div className='mb-4'>
                <input type="text" placeholder='Nationality' id="nationality" name="personalInfo.nationality" {...register('personalInfo.nationality', { required: 'nationality is required' })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                        }`}
                />
                {errors.personalInfo && errors.personalInfo.nationality && (
                    <span className="text-red-500 text-sm">{errors.personalInfo.nationality.message}</span>
                )}
            </div>
            <h1 className="block text-gray-700 md:text-md text-xl font-bold mb-2">Address</h1>
            <div className='mb-4'>
                <input type="text" placeholder='Street' id="nationality" name="personalInfo.address.street" {...register('personalInfo.address.street', { required: 'Street is required' })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                        }`}
                />
                {errors.personalInfo && errors.personalInfo.address && errors.personalInfo.address.street && (
                    <span className="text-red-500 text-sm">{errors.personalInfo.address.street.message}</span>
                )}
            </div>
            <div className='mb-4'>
                <input type="text" placeholder='City' id="City" name="personalInfo.address.city" {...register('personalInfo.address.city', { required: 'Street is required' })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                        }`}
                />
                {errors.personalInfo && errors.personalInfo.address && errors.personalInfo.address.city && (
                    <span className="text-red-500 text-sm">{errors.personalInfo.address.city.message}</span>
                )}
            </div>
            <div className='mb-4'>
                <input type="text" placeholder='State' id="State" name="personalInfo.address.city" {...register('personalInfo.address.state', { required: 'Street is required' })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                        }`}
                />
                {errors.personalInfo && errors.personalInfo.address && errors.personalInfo.address.state && (
                    <span className="text-red-500 text-sm">{errors.personalInfo.address.state.message}</span>
                )}
            </div>
            <div className='mb-4'>
                <input type="text" placeholder='Zip Code' id="zipCode" name="personalInfo.address.zipCode" {...register('personalInfo.address.zipCode', { required: 'Street is required' })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                        }`}
                />
                {errors.personalInfo && errors.personalInfo.address && errors.personalInfo.address.zipCode && (
                    <span className="text-red-500 text-sm">{errors.personalInfo.address.zipCode.message}</span>
                )}
            </div>
        </div>
    );
};

export default PatientRegister
