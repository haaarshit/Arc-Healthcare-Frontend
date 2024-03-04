import { Twitter,LinkedIn,GitHub } from '@mui/icons-material'
import React from 'react'

function Footer() {
    return (
        <>
            {/* component */}
          
            <footer className="relative bg-gray-50 dark:bg-gray-800 text-white pt-8 pb-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap text-left lg:text-left">
                        <div className="w-full lg:w-6/12 px-4">
                            <h4 className="text-3xl fonat-semibold ">
                                Connect with us!!
                            </h4>
                            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                                Find us on any of these platforms.
                            </h5>
                            <div className="mt-6 lg:mb-0 mb-6">
                                <a
                                href='https://www.linkedin.com/in/harshit-tripathi-374046228/'
                                    className=" border-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                                    type="button"
                                >
                                    <Twitter className="text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
 />
                                </a>
                                <a
                                href='https://www.linkedin.com/in/harshit-tripathi-374046228/' target='_blank'
                                    className=" border-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                                    type="button"
                                >
                                    <LinkedIn className="text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
 />
                                </a>
                                <a
                                href='https://github.com/coderharsx1122' target='_blank'
                                    className=" border-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                                    type="button"
                                >
                                    <GitHub className="text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
 />
                                </a>
                  
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-blueGray-300" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                            <div className="text-sm  font-semibold py-1">
                                Made with ❤️ <span id="get-current-year">by </span>
                                <a
                                    href="https://www.linkedin.com/in/harshit-tripathi-374046228/"
                                    className=" hover:text-gray-400"
                                    target="_blank"
                                >
                                    {" "}
                                    Harshit Tripathi
                                </a>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>

    )
}

export default Footer
