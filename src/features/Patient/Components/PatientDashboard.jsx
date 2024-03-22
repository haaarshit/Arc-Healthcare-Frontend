import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatientDashboardAsync, patientDashBoard } from '../patientSlice';
import { Link } from 'react-router-dom';
import ImageModal from '../../../Components/ImageModal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar } from '@material-tailwind/react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export function PatientDashBoard() {
  const dashboard = useSelector(patientDashBoard)
  const [isAvatarModal, setAvatarModal] = useState(false)
  const handleClick = () => { setAvatarModal(!isAvatarModal) }

  const dispatch = useDispatch()

  useEffect(() => {
    if (dashboard == null) dispatch(getPatientDashboardAsync())
  }, [dispatch])

  return (
    <>
      {dashboard &&
        <div className='flex flex-col'>

          {/* Content */}
          <div className="p-6 flex flex-col ">
            <Link to="/" className='flex text-white bg-[#7371fc] w-[75px] p-1 rounded-[10px]'><ArrowBackIcon /> Home</Link>
            {/* Profile */}
            <div className="container mx-auto my-5 p-5 ">
              <div className="md:flex no-wrap md:-mx-2 ">
                {/* Left Side */}
                <div className="w-full md:w-3/12 md:mx-2">
                  {/* Profile Card */}
                  <div className="bg-white p-3 flex flex-col items-center border-green-400">
                    <div className="image overflow-hidden">
                      <Avatar src={dashboard.patientInfo?.avatar} alt="avatar" className='rounded-full h-[100px] w-[100px]' onClick={handleClick} />
                    </div>
                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                      {dashboard.patientInfo?.personalInfo?.firstName}  {dashboard.patientInfo?.personalInfo?.lastName}
                    </h1>
                    <h3 className="text-gray-600 font-lg text-semibold leading-6">
                      {dashboard.patientInfo?.professionalInfo?.specializations[0]}
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
                          <div className="px-4 py-2"> {dashboard.patientInfo?.personalInfo.firstName}  {dashboard.patientInfo?.personalInfo.lastName}</div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Gender</div>
                          <div className="px-4 py-2">Male</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Contact No.</div>
                          <div className="px-4 py-2">  <a href="whatsapp://send?abid=phonenumber&text=Hello%2C%20World!"> {dashboard.patientInfo?.phone} </a></div>

                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Address</div>
                          <div className="px-4 py-2">{dashboard.patientInfo?.personalInfo?.address?.street}, {dashboard.patientInfo?.personalInfo?.address?.city}, {dashboard.patientInfo?.personalInfo?.address?.state}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Nationality</div>
                          <div className="px-4 py-2">{dashboard.patientInfo?.personalInfo?.nationality}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Email</div>
                          <div className="px-4 py-2">
                            <a className="text-blue-800" href={`mailto:${dashboard.patientInfo?.email}`}>
                              {dashboard.patientInfo?.email}
                            </a>
                          </div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Birthday</div>
                          <div className="px-4 py-2">{dashboard.patientInfo?.personalInfo.dateOfBirth}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Blood Group</div>
                          <div className="px-4 py-2">{dashboard.patientInfo?.bloodType}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Height</div>
                          <div className="px-4 py-2">{dashboard.patientInfo?.height} cm</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Weight</div>
                          <div className="px-4 py-2">{dashboard.patientInfo?.weight} kg</div>
                        </div>
                      </div>
                    </div>

                  </div>
                  {/* End of about section */}
                  <div className="my-4" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 mb-6 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                <div className="flex justify-between mb-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <div className="text-2xl font-semibold">{dashboard.appointmentList?.length}</div>
                      {/* <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">
                      +30%
                    </div> */}
                    </div>
                    <div className="text-sm font-medium text-gray-400">Total Appointments</div>
                  </div>
                </div>

              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols gap-6 mb-6">
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
                            Status
                          </th>
                          <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            See Appointmet
                          </th>
                          <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px" />
                        </tr>
                      </thead>
                      <tbody>
                        {
                          dashboard.appointmentList?.map(e =>

                            <tr className="text-gray-700 dark:text-gray-100">
                              <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm  whitespace-nowrap p-4 text-left">
                                {e.appointmentDate}
                              </th>
                              <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm  whitespace-nowrap p-4">
                                {e.status}
                              </td>
                              <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <Link to={`/patient/appointment/${e.id}`} className='bg-[#7371fc] text-white rounded-sm text-sm px-2 py-1'>Visit</Link>
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
          </div>

    
          {/* modals */}
          <ImageModal isAvatarModal={isAvatarModal} handleClick={handleClick} avatar={dashboard.patientInfo?.avatar} />
          {/* End Content */}
        </div>
      }
    </>
  );
}
