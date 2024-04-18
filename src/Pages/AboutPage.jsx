import React from 'react'

function AboutPage() {
  return (
    <div>
      <>
        {/* component */}
        <div className="bg-white relative   flex items-center  n justify-center overflow-hidden z-50 ">
          <div className="relative mx-auto h-full px-4  pb-20   md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
            <div className="flex flex-col items-center justify-between lg:flex-row py-16">
              <div className=" relative ">

                <div className="lg:max-w-xl lg:pr-5 relative z-40">
                  <p className="flex text-sm uppercase text-g1  ">About Us</p>
                  <h2 className="mb-6 max-w-lg text-5xl font-light leading-snug tracking-tight text-g1 sm:text-7xl sm:leading-snug">
                    Simplifying Your Healthcare
                    <span className="my-1  border-b-8 border-g4 bg-white px-4 font-bold text-g4 text-[#7371fc] animate__animated animate__flash">
                      Journey
                    </span>
                  </h2>
                  <p className="text-base text-gray-700">
                    At HealthArc, we believe everyone deserves convenient access to quality healthcare. That's why we created a streamlined appointment booking app that puts you in control of your well-being.
                  </p>
                  <div className="mt-10 flex flex-col items-center md:flex-row">
                    {/* <button
                      className=" mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-[#7371fc] px-6 font-medium tracking-wide text-white shadow-md transition hover:bg-[#7373ff] focus:outline-none md:mr-4 md:mb-0 md:w-auto"
                    >
                      View More
                    </button> */}

                  </div>
                </div>
              </div>
              <div className="relative hidden lg:ml-32 lg:block lg:w-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-6 mx-auto h-10 w-10 animate-bounce rounded-full bg-white p-2 lg:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 17l-4 4m0 0l-4-4m4 4V3"
                  />
                </svg>
                <div className="abg-orange-400 mx-auto w-fit overflow-hidden rounded-[6rem] rounded-br-none rounded-tl-none">
                  <img src="https://www.apifirst.in/wp-content/uploads/2021/05/about.png" className=' w-[400px] h-[400px]' />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden text-9xl varien absolute top-6 left-1/4 text-g/10 z-40    ">
            About Us
          </div>
          <div className=" absolute -bottom-24 left-10 z-0  opacity-10 ">

          </div>

          <div className=" absolute top-10 left-3/4 z-0  opacity-10 ">
          </div>
        </div>
      </>

    </div>
  )
}

export default AboutPage
