import ApplicationLogo from 'components/ApplicationLogo';
import React from 'react';

export const Sidebar = () => {
  return (
    <aside
      className="h-screen overflow-y-auto overflow-x-hidden text-white top-0 lg:absolute bg-gray-900 lg:block lg:z-40 right-0 lg:left-0 
    duration-700 ease-out hidden transition-all lg:w-24 style_scrollbar__20XZQ"
    >
      <div className="pb-32 lg:pt-4">
        <div className="bg-gray-900 flex items-center justify-center mb-6 pb-6 pt-3 sticky top-0 z-10">
          <ApplicationLogo className="w-32 h-18 fill-current text-gray-500" />
        </div>
        <ul className="md:pl-3">
          <li>
            <a href="/">
              <span className="flex items-center justify-start my-1 p-3 w-full hover:text-white">
                <div className="p-2 bg-gray-700 rounded-full">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      ></path>
                    </svg>
                  </span>
                </div>
                <span className="mx-4 text-sm lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all text-gray-200">
                  Home
                </span>
              </span>
            </a>
            <a href="/admin/status">
              <span className="flex items-center justify-start my-1 p-3 w-full hover:text-white">
                <div className="p-2 ">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      ></path>
                    </svg>
                  </span>
                </div>
                <span className="mx-4 text-sm lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all">
                  Status
                </span>
              </span>
            </a>
            <a href="/admin/archives">
              <span className="flex items-center justify-start my-1 p-3 w-full hover:text-white">
                <div className="p-2 ">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      ></path>
                    </svg>
                  </span>
                </div>
                <span className="mx-4 text-sm lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all">
                  Archives
                </span>
              </span>
            </a>
            <a href="/admin/credits">
              <span className="flex items-center justify-start my-1 p-3 w-full hover:text-white">
                <div className="p-2 ">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      ></path>
                    </svg>
                  </span>
                </div>
                <span className="mx-4 text-sm lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all">
                  Credits
                </span>
              </span>
            </a>
            <a href="/admin/settings">
              <span className="flex items-center justify-start my-1 p-3 w-full hover:text-white">
                <div className="p-2 ">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </span>
                </div>
                <span className="mx-4 text-sm lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all">
                  Settings
                </span>
              </span>
            </a>
            <a href="/admin/documentation">
              <span className="flex items-center justify-start my-1 p-3 w-full hover:text-white">
                <div className="p-2 ">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      ></path>
                    </svg>
                  </span>
                </div>
                <span className="mx-4 text-sm lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all">
                  Documentation
                </span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};
