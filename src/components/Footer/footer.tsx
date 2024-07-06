"use client"
import { AcmeLogo } from "../Navbar/AcmeLogo"
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

export const Footer = () =>{
    return(
        <>
        <div className="w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="py-14 grid grid-cols-12 gap-x-5 gap-y-8">
                    <div className="col-span-full xl:col-span-3 relative bg-gradient-to-tr  from-violet-600 bg-secondary rounded-2xl gap-12 p-6 xl:w-72 h-96 flex flex-col justify-center items-center">
                        
                        <a href="https://pagedone.io/" className="flex justify-center items-center lg:justify-start">
                            <AcmeLogo/> E-com
                        </a>
                        <p className="text-center text-gray-200">Trusted in more than 100 countries & 5 million customers.
                            Have any query? contact us we are here for you.</p>
                    
                        <div className="flex  space-x-4 sm:justify-center  ">
                            <a href="#"
                                className="w-9 h-9 rounded-full bg-white flex justify-center items-center hover:shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"
                                    fill="none">
                                    <g id="Social Media">
                                        <path id="Vector"
                                            d="M11.8214 9.81691L16.9919 3.93591H15.7667L11.2772 9.0423L7.6914 3.93591H3.55566L8.97803 11.6577L3.55566 17.8248H4.78097L9.522 12.4323L13.3088 17.8248H17.4446L11.8211 9.81691H11.8214ZM10.1432 11.7257L9.59382 10.9568L5.22246 4.83846H7.10445L10.6322 9.77615L11.1816 10.5451L15.7672 16.9633H13.8852L10.1432 11.726V11.7257Z"
                                            fill="url(#paint0_linear_9147_17049)" />
                                    </g>
                                </svg>


                            </a>
                            <a href="#"
                                className="w-9 h-9 rounded-full bg-white flex justify-center items-center hover:shadow-md">
                                <svg className="w-[1.25rem] h-[1.125rem]" viewBox="0 0 15 15" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.20975 7.81944C5.20975 6.54106 6.26102 5.50444 7.5582 5.50444C8.85537 5.50444 9.90721 6.54106 9.90721 7.81944C9.90721 9.09783 8.85537 10.1344 7.5582 10.1344C6.26102 10.1344 5.20975 9.09783 5.20975 7.81944ZM3.93991 7.81944C3.93991 9.78889 5.55982 11.3853 7.5582 11.3853C9.55658 11.3853 11.1765 9.78889 11.1765 7.81944C11.1765 5.85 9.55658 4.25356 7.5582 4.25356C5.55982 4.25356 3.93991 5.85 3.93991 7.81944ZM10.4741 4.11217C10.4741 4.27698 10.5236 4.43812 10.6165 4.5752C10.7093 4.71228 10.8413 4.81914 10.9958 4.88227C11.1503 4.94541 11.3203 4.96198 11.4844 4.92989C11.6484 4.8978 11.7991 4.81849 11.9174 4.70199C12.0357 4.58549 12.1163 4.43704 12.149 4.2754C12.1817 4.11376 12.165 3.9462 12.1011 3.79391C12.0371 3.64161 11.9288 3.51142 11.7898 3.41979C11.6508 3.32817 11.4873 3.27923 11.3201 3.27917H11.3197C11.0955 3.27927 10.8806 3.36705 10.722 3.52324C10.5635 3.67943 10.4743 3.89124 10.4741 4.11217ZM4.71142 13.4721C4.02442 13.4412 3.65101 13.3284 3.40286 13.2332C3.07387 13.1069 2.83914 12.9566 2.59235 12.7137C2.34555 12.4708 2.19278 12.2397 2.06527 11.9155C1.96854 11.6711 1.8541 11.3029 1.82287 10.6259C1.78871 9.89389 1.78189 9.674 1.78189 7.8195C1.78189 5.965 1.78927 5.74572 1.82287 5.01311C1.85416 4.33606 1.96944 3.96867 2.06527 3.7235C2.19335 3.39928 2.34589 3.16794 2.59235 2.92472C2.8388 2.6815 3.07331 2.53094 3.40286 2.40528C3.6509 2.30994 4.02442 2.19717 4.71142 2.16639C5.45417 2.13272 5.67729 2.126 7.5582 2.126C9.4391 2.126 9.66244 2.13328 10.4058 2.16639C11.0928 2.19722 11.4656 2.31083 11.7144 2.40528C12.0434 2.53094 12.2781 2.68183 12.5249 2.92472C12.7717 3.16761 12.9239 3.39928 13.052 3.7235C13.1487 3.96794 13.2631 4.33606 13.2944 5.01311C13.3285 5.74572 13.3354 5.965 13.3354 7.8195C13.3354 9.674 13.3285 9.89328 13.2944 10.6259C13.2631 11.3029 13.1481 11.6709 13.052 11.9155C12.9239 12.2397 12.7714 12.4711 12.5249 12.7137C12.2784 12.9564 12.0434 13.1069 11.7144 13.2332C11.4663 13.3285 11.0928 13.4413 10.4058 13.4721C9.66306 13.5057 9.43994 13.5124 7.5582 13.5124C5.67645 13.5124 5.45395 13.5057 4.71142 13.4721ZM4.65307 0.917056C3.90294 0.950722 3.39035 1.06794 2.9427 1.23961C2.4791 1.41689 2.08663 1.65472 1.69446 2.04061C1.30228 2.4265 1.06157 2.81389 0.881687 3.27078C0.707498 3.71222 0.588554 4.21711 0.554392 4.95639C0.519667 5.69683 0.511719 5.93356 0.511719 7.81944C0.511719 9.70533 0.519667 9.94206 0.554392 10.6825C0.588554 11.4218 0.707498 11.9267 0.881687 12.3681C1.06157 12.8247 1.30233 13.2126 1.69446 13.5983C2.08658 13.984 2.4791 14.2215 2.9427 14.3993C3.39119 14.5709 3.90294 14.6882 4.65307 14.7218C5.40479 14.7555 5.6446 14.7639 7.5582 14.7639C9.4718 14.7639 9.712 14.7561 10.4633 14.7218C11.2135 14.6882 11.7258 14.5709 12.1737 14.3993C12.637 14.2215 13.0298 13.9842 13.4219 13.5983C13.8141 13.2124 14.0543 12.8247 14.2347 12.3681C14.4089 11.9267 14.5284 11.4218 14.562 10.6825C14.5962 9.9415 14.6041 9.70533 14.6041 7.81944C14.6041 5.93356 14.5962 5.69683 14.562 4.95639C14.5278 4.21706 14.4089 3.71194 14.2347 3.27078C14.0543 2.81417 13.8135 2.42711 13.4219 2.04061C13.0304 1.65411 12.637 1.41689 12.1743 1.23961C11.7258 1.06794 11.2135 0.950167 10.4639 0.917056C9.71256 0.883389 9.47236 0.875 7.55876 0.875C5.64516 0.875 5.40479 0.882833 4.65307 0.917056Z"
                                        fill="url(#paint0_linear_9147_17049)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_9147_17049" x1="14.6041" y1="1.67072"
                                            x2="0.399812" y2="14.3286" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#7C3AED" />
                                            <stop offset="0.993738" stopColor="#4F46E5" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                            </a>
                            <a href="#"
                                className="w-9 h-9 rounded-full bg-white flex justify-center items-center hover:shadow-md">

                                <svg className="w-[1rem] h-[1rem]" viewBox="0 0 13 12" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3.3794 11.4355V3.75116H0.818893V11.4355H3.37967H3.3794ZM2.09968 2.70218C2.9924 2.70218 3.54817 2.11211 3.54817 1.37469C3.53146 0.620473 2.9924 0.046875 2.11666 0.046875C1.24032 0.046875 0.667969 0.620473 0.667969 1.37463C0.667969 2.11204 1.22354 2.70211 2.0829 2.70211H2.09948L2.09968 2.70218ZM4.79668 11.4355H7.35698V7.14468C7.35698 6.91532 7.37369 6.68536 7.44134 6.52154C7.62635 6.06249 8.04764 5.5873 8.75514 5.5873C9.68141 5.5873 10.0522 6.29192 10.0522 7.32503V11.4355H12.6124V7.02953C12.6124 4.66933 11.3494 3.57101 9.66483 3.57101C8.28372 3.57101 7.67715 4.34103 7.34014 4.86549H7.35718V3.75143H4.79681C4.83023 4.47231 4.79661 11.4358 4.79661 11.4358L4.79668 11.4355Z"
                                        fill="url(#paint0_linear_9147_19261)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_9147_19261" x1="12.6124" y1="0.699364"
                                            x2="0.926912" y2="11.4629" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#7C3AED" />
                                            <stop offset="0.993738" stopColor="#4F46E5" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                            </a>
                            <a href="#"
                                className="w-9 h-9 rounded-full bg-white flex justify-center items-center hover:shadow-md">

                                <svg className="w-[1.25rem] h-[0.875rem]" viewBox="0 0 16 12" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M13.4346 1.0181C14.0684 1.18926 14.5665 1.68869 14.7349 2.32177C15.0413 3.47069 15.0413 5.86935 15.0413 5.86935C15.0413 5.86935 15.0413 8.26801 14.7349 9.41693C14.5642 10.0524 14.0661 10.5518 13.4346 10.7206C12.2886 11.0278 7.69058 11.0278 7.69058 11.0278C7.69058 11.0278 3.09491 11.0278 1.94657 10.7206C1.31277 10.5494 0.814613 10.05 0.646222 9.41693C0.339844 8.26801 0.339844 5.86935 0.339844 5.86935C0.339844 5.86935 0.339844 3.47069 0.646222 2.32177C0.816952 1.68635 1.31511 1.18692 1.94657 1.0181C3.09491 0.710938 7.69058 0.710938 7.69058 0.710938C7.69058 0.710938 12.2886 0.710938 13.4346 1.0181ZM10.041 5.86935L6.22178 8.08043V3.65827L10.041 5.86935Z"
                                        fill="url(#paint0_linear_9147_18425)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_9147_18425" x1="15.0413" y1="1.30201" x2="4.68186"
                                            y2="14.2671" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#7C3AED" />
                                            <stop offset="0.993738" stopColor="#4F46E5" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                            </a>
                        </div>
                    </div>

                    <div className="block text-center xl:text-left xl:py-16 col-span-full min-[500px]:col-span-6 md:col-span-4 xl:col-span-3 xl:pl-5">
                        <h4 className="text-lg  font-bold mb-9">Get In Touch</h4>
                        <ul className=" transition-all duration-500 grid gap-6">
                            <li>support@e-com.com</li>
                            <li>+977 9898 9898 98</li>
                            <li>Kupondol, Kathmandu, Nepal.</li>
                        </ul>
                    </div>
                    <div className="xl:py-16 col-span-full min-[500px]:col-span-6 md:col-span-4 xl:col-span-3 flex flex-col items-center">
                        <h4 className="text-lg  font-bold mb-9 text-center xl:text-left">Quick Links</h4>
                        <div className="flex gap-6 xl:gap-12 max-xl:justify-center">
                            <ul className="text-white transition-all duration-500 grid gap-6">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">FAQs</a></li>
                                <li><a href="#">Price Plan</a></li>
                                <li><a href="#">Features</a></li>
                            </ul>
                            <ul className="text-white transition-all duration-500 grid gap-6">
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">About </a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">Products</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="block xl:py-16 col-span-full md:col-span-4 xl:col-span-3">
                        <h4 className="text-lg font-bold mb-9 text-center xl:text-left">we accept</h4>
                        <div className="mt-6 flex flex-col gap-4 sm:mt-0">
                            <div className="flex gap-4 flex-row max-sm:flex-col items-center justify-center">
                                <a target="_blank" href="#">
                                <Image
                                        isBlurred
                                        as={NextImage}
                                        width={80}
                                        height={40}
                                        src="/master.png"
                                        alt="NextUI Album Cover"
                                        className="object-cover"
                                        />
                                </a>
                                <a target="_blank" href="#">
                                    <Image
                                            isBlurred
                                            as={NextImage}
                                            width={80}
                                            height={40}
                                            src="/visa.jpg"
                                            alt="NextUI Album Cover"
                                            className="object-cover"
                                    />
                                </a>
                                <a target="_blank" href="#">
                                    <Image
                                            isBlurred
                                            as={NextImage}
                                            width={80}
                                            height={40}
                                            src="/esewa.jpg"
                                            alt="NextUI Album Cover"
                                            className="object-cover"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="grid gap-7 ">
                        </div>
                    </div>

                </div>
            </div>
            <div className="py-4">
                <div className="flex items-center justify-center">
                    <span className="text-sm text-white ">Copyright@2024 All Right Reserved  by <a href="#">E-com</a></span>
                </div>
            </div>

        </div>
        </>
    )
}