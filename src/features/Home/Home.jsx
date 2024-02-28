import { Avatar } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const arr = [1, 2, 3, 4, 5, 6]
    return (
        <div className='overflow-hidden'>
            <>
                <section className="px-2   pb-12 lg:pb-[90px]">
                    <div className="container">
                        <div className="flex h-[50vh]  -mx-4 items-center">
                 
                            <div className="w-[100%] px-4">
                                <div className="text-center mx-auto mb-12 mt-20 lg:mb-20 max-w-[510px]">
                                    <span className="font-semibold text-lg text-primary mb-2 block">
                                        {/* Welcome To <span className='text-[#7371fc]'>HEALTH ARC</span> */}
                                    </span>
                                    <h2
                                        className=" font-bold text-3xl sm:text-5xl md:text-[40px] text-dark mb-4 "
                                    >
                                        Welcome To <span className='text-[#7371fc]'>HEALTH ARC</span>
                                        {/* Open Your <br /><span className='text-[#7371fc]'>HEALTH ACCOUNT</span> */}
                                    </h2>
                                    <p className="text-base text-body-color">
                                        There are many variations of passages of Lorem Ipsum available but
                                        the majority have suffered alteration in some form.
                                    </p>
                                </div>
                            </div>
                          
                        </div>
                    
                        <div className="flex flex-col items-center">
                        <h2
                            className="font-bold text-3xl sm:text-4xl text-dark mt-12 mb-6"
                        >
                            Connect with best  <span className='text-[#7371fc]'>Doctors</span>
                        </h2>
                            <div className="flex flex-wrap -mx-4">
                                {arr.map(e =>
                                    <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                                        <div className=" p-10 md:px-7 xl:px-10 rounded-[20px] flex flex-col items-center bg-white shadow-md hover:shadow-lg mb-8 ">
                                            <div className=" w-[70px] h-[70px] flex items-center justify-center bg-primary rounded-2xl mb-8">
                                                <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                                            </div>
                                            <h4 className="font-semibold text-xl text-dark mb-3">
                                                Refreshing Design
                                            </h4>
                                            <p className="text-body-color">
                                                Qualification
                                            </p>
                                            <p>
                                                Specialization
                                            </p>
                                            <Link className='bg-[#7371fc] text-white text-xl mt-3 p-2 rounded-[15px]'>Visit Profile</Link>
                                        </div>
                                    </div>

                                )
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </div>
    )
}

export default Home
