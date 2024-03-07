
import { Typography, useSelect } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { createDoctorAsync, isDoctor, doctorData } from '../doctorSlice';
import { useDispatch, useSelector } from 'react-redux';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { LocalizationProvider, TimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { extractTime } from '../../../Utils/UtilFunctions';

function DoctorRegister() {
  const dispatch = useDispatch()

  const { control, register, handleSubmit, formState: { errors }, setValue } = useForm();
  const isDoctorRegistered = useSelector(isDoctor)
  const doctorInfo = useSelector(doctorData)
  const navigate = useNavigate()


  const onSubmit = async (data) => {
    console.log(data);
    // const file = data.avatar[0];
    dispatch(createDoctorAsync(data))

  };

  useEffect(() => {
    if (isDoctorRegistered === true && doctorInfo !== null) {
      navigate('/')

      console.log("isregistered______________")
    }
  }, [isDoctorRegistered])

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-[10px] py-2 bg-gray-200">


      {/* ---------------------------------------------------------------------- */}
      {/* component */}
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

          {/* ---------------------------------------------------------------------- */}
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
                <input
                  placeholder='clinic name'
                  type="tel"
                  id="phone"
                  {...register('clinicName', { required: 'clinicName is required' })}
                  className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                    }`}
                />
                {errors.clinicName && (
                  <span className="text-red-500 text-sm">{errors.clinicName.message}</span>
                )}
              </div>
              <div className="mb-4">
                <input
                  placeholder='consultation Fees'
                  type="tel"
                  id="phone"
                  {...register('consultationFees', { required: 'consultation fees is required' })}
                  className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                    }`}
                />
                {errors.consultationFees && (
                  <span className="text-red-500 text-sm">{errors.consultationFees.message}</span>
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
                />
                {errors.avatar && (
                  <span className="text-red-500 text-sm">{errors.avatar.message}</span>
                )}
              </div>
              <h1 className="block text-gray-700 md:text-md text-xl font-bold mb-2">Personal Info</h1>
              <PersonalInfo errors={errors} register={register} />
              <h1 className="block text-gray-700 md:text-md text-xl font-bold mb-2">Address</h1>
              <Address errors={errors} register={register} />
              <h1 className="block text-gray-700 md:text-md text-xl font-bold mb-2">Professional Info</h1>
              <ProfessionalInfo register={register} errors={errors} />
              <h1 className="block text-gray-700 md:text-md text-xl font-bold mb-2">Availability</h1>
              <Availability register={register} errors={errors} control={control} setValue={setValue} />
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
    </div >
  );
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
    </div>
  );
};

// Address component
const Address = ({ register, errors }) => {
  return (
    <div>
      <div className='mb-4'>
        {/* <label htmlFor="street" className="block text-gray-700 md:text-sm text-md font-bold mb-2">Street:</label> */}
        <input type="text" placeholder='Street' id="street" name="address.street" {...register('address.street', { required: 'Street is required' })}
          className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
            }`}
        />
        {errors.address && errors.address.street && (
          <span className="text-red-500 text-sm">{errors.address.street.message}</span>
        )}
      </div>
      <div className='mb-4'>
        {/* <label htmlFor="city" className="block text-gray-700 md:text-sm text-md font-bold mb-2">City :</label> */}
        <input type="text" placeholder='City' id="city" name="address.city" {...register('address.city', { required: 'Cityname is required' })}
          className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
            }`}
        />
        {errors.address && errors.address.city && (
          <span className="text-red-500 text-sm">{errors.address.city.message}</span>
        )}
      </div>
      <div className='mb-4'>

        {/* <label htmlFor="state" className="block text-gray-700 md:text-sm text-md font-bold mb-2">State:</label> */}
        <input type="text" placeholder='State' id="state" name="address.state" {...register('address.state', { required: 'State name is required' })}
          className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
            }`}
        />
        {errors.address && errors.address.state && (
          <span className="text-red-500 text-sm">{errors.address.state.message}</span>
        )}

      </div>
      <div className='mb-4'>
        {/* <label htmlFor="zipcode" className="block text-gray-700 md:text-sm text-md font-bold mb-2">Zipcode:</label> */}
        <input type="number" placeholder='Zipcode' id="zipcode" name="address.zipcode" {...register('address.zipcode', { required: 'zipcode is required' })}
          className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
            }`}
        />
        {errors.address && errors.address.zipcode && (
          <span className="text-red-500 text-sm">{errors.address.zipcode.message}</span>
        )}
      </div>
    </div>
  );
};

// ProfessionalInfo
const ProfessionalInfo = ({ register, errors }) => {
  const { control } = useForm()
  const { fields: qualificationFields, append: qualificationAppend, remove: removeQualification } = useFieldArray({ control, name: 'professionalInfo.qualifications' });
  const { fields: specializationsFields, append: specializationsAppend, remove: removeSpecialization } = useFieldArray({ control, name: 'professionalInfo.specializations' });
  const { fields: workExperienceFields, append: workExperienceAppend, remove: removeWorkExperience } = useFieldArray({ control, name: 'professionalInfo.workExperience' });
  return (
    <div className='mb-4'>
      <div className='mb-4'>
        {/* <label htmlFor="registrationNumber" className="block text-gray-700 md:text-sm text-md font-bold mb-2">Registration Number:</label> */}
        <input type="number" placeholder='registrationNumber' id="registrationNumber" name="professionalInfo.registrationNumber" {...register('professionalInfo.registrationNumber', { required: 'registrationNumber is required' })}
          className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
            }`}
        />
        {errors.professionalInfo && errors.professionalInfo.registrationNumber && (
          <span className="text-red-500 text-sm">{errors.professionalInfo.registrationNumber.message}</span>
        )}

      </div>
      {/* qualification */}
      <h1 className="block text-gray-700 md:text-md text-md font-bold mb-2">Qualification</h1>
      <div className='mb-4'>
        {qualificationFields.map((field, index) => (
          <div key={field.id} className="flex flex-col space-y-1 border rounded-md p-2">
            <label htmlFor={field.id} className="text-sm font-medium">
              Degree:
            </label>
            <input
              {...register(`professionalInfo.qualifications.${index}.degree`)}
              id={field.id}
              placeholder="Enter your degree"
              className="px-3 py-2 rounded-md border focus:outline-none focus:ring-blue-500 focus:ring-1"
            />

            <label htmlFor={`${field.id}-university`} className="text-sm font-medium">
              University:
            </label>
            <input
              {...register(`professionalInfo.qualifications.${index}.university`)}
              id={`${field.id}-university`}
              placeholder="Enter university name"
              className="px-3 py-2 rounded-md border focus:outline-none focus:ring-blue-500 focus:ring-1"
            />

            <label htmlFor={`${field.id}-year`} className="text-sm font-medium">
              Year of Graduation:
            </label>
            <input
              {...register(`professionalInfo.qualifications.${index}.year`, { value: '', required: 'Year is required' })}
              type="number"
              id={`${field.id}-year`}
              placeholder="Enter graduation year"
              className="px-3 py-2 rounded-md border focus:outline-none focus:ring-blue-500 focus:ring-1"
            />

            <button
              type="button"
              onClick={() => removeQualification(index)}
              className="bg-red-500 my-1 text-white p-1 px-2 rounded-[10px]"
            >
              Remove Qualification
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => qualificationAppend({ degree: '', university: '', year: 0 })}
          className="bg-[#7371fc] text-white px-4 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-1"
        >
          Add Qualification
        </button>
      </div>

      {/* specialization */}


      <div className='mb-4'>

        {specializationsFields.map((field, index) => (

          <div key={field.id} className="flex flex-col space-y-1 border rounded-md p-2">
            <input

              {...register(`professionalInfo.specializations.${index}`)}
              id={`professionalInfo.specializations${field.id}`}
              placeholder="Enter Specialization (ex:- Cardiologist)"
              className="px-3 py-2 rounded-md border focus:outline-none focus:ring-blue-500 focus:ring-1"
            />


            <br />
            <button type="button" className='bg-red-500 my-1 text-white p-1 px-2 rounded-[10px]' onClick={() => removeSpecialization(index)}>
              Remove Specilization
            </button>
          </div>
        ))}
        <button type="button" className='bg-[#7371fc] text-white px-4 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-1' onClick={() => specializationsAppend('')}>
          Add Specilization
        </button>
        {errors.professionalInfo && errors.professionalInfo.qualifications && errors.professionalInfo.qualifications.year && (
          <span className="text-red-500 text-sm">{errors.professionalInfo.qualifications.year.message}</span>
        )}
      </div>

      {/* work experience */}
      <h1 className="block text-gray-700 md:text-md text-xl font-bold mb-2">Work Experience</h1>

      <div className='mb-4'>
        {workExperienceFields.map((field, index) => (
          <div key={field.id} className="flex flex-col space-y-1 border rounded-md p-2">

            <input
              {...register(`professionalInfo.workExperience.${index}.hospitalName`)}
              id={field.id}
              placeholder="Enter hospital name"
              className="px-3 py-2 rounded-md border focus:outline-none focus:ring-blue-500 focus:ring-1"
            />

            <input
              {...register(`professionalInfo.workExperience.${index}.position`)}
              id={`${field.id}-position`}
              placeholder="Enter position"
              className="px-3 py-2 rounded-md border focus:outline-none focus:ring-blue-500 focus:ring-1"
            />

            <label htmlFor={`${field.id}-year`} className="text-sm font-medium">
              Start Date:
            </label>
            <input
              {...register(`professionalInfo.workExperience.${index}.startDate`, { value: '', required: 'Year is required' })}
              type="date"
              id={`${field.id}-startDate`}
              className="px-3 py-2 rounded-md border focus:outline-none focus:ring-blue-500 focus:ring-1"
            />
            <label htmlFor={`${field.id}-year`} className="text-sm font-medium">
              End Date:
            </label>
            <input
              {...register(`professionalInfo.workExperience.${index}.endDate`)}
              type="date"
              id={`${field.id}-endDate`}
              placeholder="Enter graduation year"
              className="px-3 py-2 rounded-md border focus:outline-none focus:ring-blue-500 focus:ring-1"
            />

            <button
              type="button"
              onClick={() => removeWorkExperience(index)}
              className="bg-red-500 my-1 text-white p-1 px-2 rounded-[10px]"
            >
              Remove Work Experience
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => workExperienceAppend({ hospitalName: '', position: '', startDate: null, endDate: null })}
          className="bg-[#7371fc] text-white px-4 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-1"
        >
          Add Work Experience
        </button>
      </div>
    </div >
  );
}

// Avaibility component
const Availability = ({ register, errors, control, setValue }) => {



  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className='mb-4'>

      <div className='mb-4'>
        <label htmlFor="street" className="block text-gray-700 md:text-sm text-md font-bold mb-2">Available Days:</label>
        {days.map((day) => (
          <label key={day} className="flex items-center">
            <input
              type="checkbox"
              {...register(`availability.availableDays.${day}`)}
              className="mr-2 focus:ring-blue-500 focus:ring-2"
            />
            {day}
          </label>
        ))}
      </div>

      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className='my-2'>
            <TimePicker
              label="Select Opening Time"
              renderInput={(params) => <TextField {...params} />}
              format="hh:mm a"
              onChange={(time) => {
                const selectedTime = extractTime(time)
                console.log(selectedTime)

                setValue('availability.availableTime.startTime', selectedTime)
              }}
            />
          </div>
          <div className='my-2'>
            <TimePicker
              label="Select Closing Time"
              renderInput={(params) => <TextField {...params} />}
              format="hh:mm a"
              onChange={(time) => {
                const selectedTime = extractTime(time)
                console.log(selectedTime)

                setValue('availability.availableTime.endTime', selectedTime)
              }}

            />
          </div>
        </LocalizationProvider>
      </div>


    </div>
  );
};


export default DoctorRegister;
