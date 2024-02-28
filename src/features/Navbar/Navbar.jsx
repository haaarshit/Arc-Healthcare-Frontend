import React, { useState } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from "react-router-dom";
function MyNavbar() {
    const [openNav, setOpenNav] = useState(false);
    const [isLogin, setLogin] = useState(true)

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6  p-2 ">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium hover:bg-[#7371fc]  rounded-full hover:text-white p-2 duration-200"
            >
                <HomeIcon />

                <Link className="flex items-center" to='/'>
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex  items-center gap-x-2 p-1 font-medium hover:bg-[#7371fc]  rounded-full hover:text-white p-2 duration-200"
            >
                <DashboardIcon />
                <Link  className="flex items-center" to='/doctor/dashboard'>
                    Dashboard
                </Link>
            </Typography>

            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex  items-center gap-x-2 p-1 font-medium hover:bg-[#7371fc]  rounded-full hover:text-white p-2 duration-200"
            >
                <InfoIcon className="" />
                <Link className="flex items-center" to='/about'>
                    About Us
                </Link>
            </Typography>

        </ul>
    );

    return (
        <Navbar className=" w-full mx-auto top-0 bg-white z-10  px-4 py-2 lg:px-8 lg:py-4 sticky   text-black">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900 ">
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 cursor-pointer py-1.5 font-medium text-3xl"
                >
                    <span className="font-bold ">Health</span>
                    <span className="font-bold text-[#7371fc]">Arc</span>
                </Typography>
                <div className="hidden lg:block  rounded-full border-[1px] hover:shadow-md px-5">{navList}</div>
                <div className="flex items-center gap-x-1">
                    {isLogin ?
                        <div>
                            <Link className=" hidden lg:inline-block p-2  hover:bg-[#7371fc]  rounded-full hover:text-white duration-200">
                                User Login <LoginIcon />
                            </Link>
                            <Link to='/doctor/login' className="hidden lg:inline-block p-2  hover:bg-[#7371fc]  rounded-full hover:text-white duration-200">
                                Doctor Login <LoginIcon />
                            </Link>
                        </div>
                        :
                        <Link className="hidden lg:inline-block p-2  rounded-full hover:bg-[#7371fc]  rounded-full hover:text-white duration-200">
                            Logout <LogoutIcon />
                        </Link>
                    }
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <MobileNav open={openNav}>
                <div className="container mx-auto ">
                    {navList}

                    <div className="flex items-center gap-x-1">
                        {isLogin ?
                            <div>
                                <Link className=" p-2  hover:bg-[#7371fc]  rounded-full hover:text-white duration-200">
                                    User Login <LoginIcon />
                                </Link>
                                <Link to='/doctor/login' className=" p-2 hover:bg-[#7371fc]  rounded-full hover:text-white duration-200">
                                    Doctor Login <LoginIcon />
                                </Link>
                            </div>
                            :
                            <Link className=" p-2  rounded-full hover:bg-[#7371fc]  rounded-full hover:text-white duration-200">
                                Logout <LogoutIcon />
                            </Link>
                        }

                    </div>
                </div>
            </MobileNav>
        </Navbar>
    );
}

export default MyNavbar