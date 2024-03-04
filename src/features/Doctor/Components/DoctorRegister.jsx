
import { Typography, useSelect } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { createDoctorAsync, isDoctor, doctorData } from '../doctorSlice';
import { useDispatch, useSelector } from 'react-redux';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

function DoctorRegister() {
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm();
  const isDoctorRegistered = useSelector(isDoctor)
  const doctorInfo = useSelector(doctorData)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    console.log(data);
    const file = data.avatar[0];
    dispatch(createDoctorAsync(data))
    // const avatarBase64 = await imageToBase64(file)
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   email: data.email,
    //   password: data.password,
    //   avatar: avatarBase64,
    //   professionalInfo: {
    //     ...prevFormData.professionalInfo,
    //     qualifications: [...prevFormData.professionalInfo.qualifications, data.professionalInfo.qualifications],
    //   },
    // }));
    // console.log(formData);
  };

  // const addQualification = (data) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     professionalInfo: {
  //       ...prevFormData.professionalInfo,
  //       qualifications: [...prevFormData.professionalInfo.qualifications, data.professionalInfo.qualifications],
  //     },
  //   }));
  // }

  // const handleAvatar = async (avatar) => {
  //   console.log(avatar)
  //   const avatarBase64 = await imageToBase64(avatar)
  //   console.log("Base64 =   " + avatarBase64)
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     avatar: avatarBase64
  //   }));
  // }

  useEffect(() => {
    if (isDoctorRegistered === true && doctorData !== null ) {
      navigate('/')

      console.log("isregistered______________")
    }
  }, [isDoctorRegistered])

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-[10px] py-2 bg-gray-200">


      {/* ---------------------------------------------------------------------- */}
      {/* component */}
      {/* This form uses the fabform.io form backend service */}
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

          {/* </div>
      </div> */}

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
                //       class="file:bg-white file:text-gray-500 file:border file:border-gray-300 file:rounded
                //  file:hover:bg-gray-100 file:focus:bg-white file:focus:border-indigo-500 file:focus:outline-none"
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
              <Availability register={register} errors={errors} />
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
        {/* <label htmlFor="registrationNumber" className="block text-gray-700 md:text-sm text-md font-bold mb-2">Degree:</label> */}
        <input type="text" placeholder='degree' id="degree" name="professionalInfo.qualifications.degree" {...register('professionalInfo.qualifications.degree', { required: 'degree is required' })}
          className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
            }`}
        />
        {errors.professionalInfo && errors.professionalInfo.qualifications && errors.professionalInfo.qualifications.degree && (
          <span className="text-red-500 text-sm">{errors.professionalInfo.qualifications.degree.message}</span>
        )}
      </div>
      <div className='mb-4'>
        {/* <label htmlFor="registrationNumber" className="block text-gray-700 md:text-sm text-md font-bold mb-2">University Name:</label> */}
        <input type="text" placeholder='university' id="university" name="professionalInfo.qualifications.university" {...register('professionalInfo.qualifications.university', { required: 'university is required' })}
          className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
            }`}
        />
        {errors.professionalInfo && errors.professionalInfo.qualifications && errors.professionalInfo.qualifications.university && (
          <span className="text-red-500 text-sm">{errors.professionalInfo.qualifications.university.message}</span>
        )}
      </div>
      <div className='mb-4'>
        {/* <label htmlFor="registrationNumber" className="block text-gray-700 md:text-sm text-md font-bold mb-2">Passing Year:</label> */}
        <input type="number" placeholder='Passing Year' id="year" name="professionalInfo.qualifications.year" {...register('professionalInfo.qualifications.year', { required: 'Year is required' })}
          className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
            }`}
        />
        {errors.professionalInfo && errors.professionalInfo.qualifications && errors.professionalInfo.qualifications.year && (
          <span className="text-red-500 text-sm">{errors.professionalInfo.qualifications.year.message}</span>
        )}
      </div>
      {/* <button>Add Qualification</button> */}
      {/* specialization */}
      <div className='mb-4'>
        {/* <label htmlFor="specializations" className="block text-gray-700 md:text-sm text-md font-bold mb-2">Specialization:</label> */}
        <input type="text" placeholder="Specialization" id="specializations" name="professionalInfo.specializations" {...register('professionalInfo.specializations', { required: 'Year is required' })}
          className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
            }`}
        />
        {errors.professionalInfo && errors.professionalInfo.qualifications && errors.professionalInfo.qualifications.year && (
          <span className="text-red-500 text-sm">{errors.professionalInfo.qualifications.year.message}</span>
        )}
      </div>
      {/* work experience */}
      <h1 className="block text-gray-700 md:text-md text-xl font-bold mb-2">Work Experience</h1>
      <div className='mb-4'>
        {/* <label htmlFor="workExperience" className="block text-gray-700 md:text-sm text-md font-bold mb-2">HospitalName:</label> */}
        <input type="text" placeholder='Hospital Name' id="hospitalName" name="workExperience" {...register('professionalInfo.workExperience.hospitalName', { required: 'Hospital Name is required' })}
          className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
            }`}
        />
        {errors.professionalInfo && errors.professionalInfo.workExperience && errors.professionalInfo.workExperience.hospitalName && (
          <span className="text-red-500 text-sm">{errors.professionalInfo.workExperience.hospitalName.message}</span>
        )}
      </div>
      <div className='mb-4'>
        {/* <label htmlFor="position" className="block text-gray-700 md:text-sm text-md font-bold mb-2">Position:</label> */}
        <input type="text" placeholder="Position" id="position" name="position" {...register('professionalInfo.workExperience.position', { required: 'Hospital Name is required' })}
          className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
            }`}
        />
        {errors.professionalInfo && errors.professionalInfo.workExperience && errors.professionalInfo.workExperience.position && (
          <span className="text-red-500 text-sm">{errors.professionalInfo.workExperience.position.message}</span>
        )}
      </div>
      <div className='mb-4'>
        <label htmlFor="startdate" className="block text-gray-700 md:text-sm text-md font-bold mb-2">Start Date:</label>
        <input type="date" id="startdate" name="startdate" {...register('professionalInfo.workExperience.startDate', { required: 'StartDate is required' })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
            }`}
        />
        {errors.professionalInfo && errors.professionalInfo.workExperience && errors.professionalInfo.workExperience.startDate && (
          <span className="text-red-500 text-sm">{errors.professionalInfo.workExperience.startDate.message}</span>
        )}
      </div>
      <div className='mb-4'>
        <label htmlFor="startdate" className="block text-gray-700 md:text-sm text-md font-bold mb-2">End Date:</label>
        <input type="date" id="startdate" name="startdate" {...register('professionalInfo.workExperience.endDate', { required: 'Hospital Name is required' })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
            }`}
        />
        {errors.professionalInfo && errors.professionalInfo.workExperience && errors.professionalInfo.workExperience.endDate && (
          <span className="text-red-500 text-sm">{errors.professionalInfo.workExperience.endDate.message}</span>
        )}
      </div>
    </div>
  );
}

// Avaibility component
const Availability = ({ register, errors }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hrs = ['01 AM', '02 AM', '03 AM', '04 AM', '05 AM', '06 AM', '07 AM', '08 AM', '09 AM', '10 AM', '11 AM', '12 AM', '01 PM', '02 PM', '03 PM', '04 PM', '05 PM', '06 PM', '07 PM', '08 PM', '09 PM', '10 PM', '11 PM', '12 PM'];
  return (
    <div className='mb-4'>

      <div className='mb-4'>
        <label htmlFor="street" className="block text-gray-700 md:text-sm text-md font-bold mb-2">Available Days:</label>
        {days.map((day) => (
          <label key={day} className='mr-1'>
            <input
              type="checkbox"
              {...register(`availability.availableDays.${day}`, { onChange: () => console.log(day) })}

            />
            {day}
          </label>
        ))}
      </div>
      <div>
        <label htmlFor="city" className="block text-gray-700 md:text-sm text-md font-bold mb-2">Start Timing :</label>
        <select
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
            }`}
        >
          {
            hrs.map((hr) => (
              <option value={hr} {...register('availability.availableTime.startTime', { required: 'Timing is required' })}>{hr}</option>
            ))
          }
        </select>
        {errors.availability && errors.availability.availableTime && errors.availability.availableTime.startTime && (
          <span className="text-red-500 text-sm">{errors.availability.availableTime.startTime.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="city" className="block text-gray-700 md:text-sm text-md font-bold mb-2">End Timing :</label>
        <select
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
            }`}
        >
          {
            hrs.map((hr) => (
              <option value={hr} {...register('availability.availableTime.endTime', { required: 'Timing is required' })}>{hr}</option>
            ))
          }
        </select>
        {errors.address && errors.address.city && (
          <span className="text-red-500 text-sm">{errors.address.city.message}</span>
        )}
      </div>
    </div>
  );
};


export default DoctorRegister;
