import useAuth from 'hooks/useAuth';
import React from 'react';
import './MainDashboard.css';

export default function MainDashboard({ users }) {
  const { auth } = useAuth();

  return (
    <>
      <section className="px-6 sm:px-0 mb-6 flex items-center justify-between">
        <div className="flex items-center justify-start">
          <span className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-white text-black dark:bg-slate-900/70 dark:text-white mr-3">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="inline-block"
            >
              <path
                fill="currentColor"
                d="M3,14L3.5,14.07L8.07,9.5C7.89,8.85 8.06,8.11 8.59,7.59C9.37,6.8 10.63,6.8 11.41,7.59C11.94,8.11 12.11,8.85 11.93,9.5L14.5,12.07L15,12C15.18,12 15.35,12 15.5,12.07L19.07,8.5C19,8.35 19,8.18 19,8A2,2 0 0,1 21,6A2,2 0 0,1 23,8A2,2 0 0,1 21,10C20.82,10 20.65,10 20.5,9.93L16.93,13.5C17,13.65 17,13.82 17,14A2,2 0 0,1 15,16A2,2 0 0,1 13,14L13.07,13.5L10.5,10.93C10.18,11 9.82,11 9.5,10.93L4.93,15.5L5,16A2,2 0 0,1 3,18A2,2 0 0,1 1,16A2,2 0 0,1 3,14Z"
              ></path>
            </svg>
          </span>
          <h1 className="text-3xl leading-tight">Overview</h1>
        </div>
        <a
          className="inline-flex cursor-pointer justify-center items-center whitespace-nowrap ring-blue-700 focus:outline-none transition-colors duration-150 border bg-gray-800 text-white dark:bg-white dark:text-black border-gray-900 dark:border-gray-100 hover:bg-gray-900 hover:dark:bg-gray-100 text-sm px-3 py-1 focus:ring rounded-full"
          href="https://justboil.me/tailwind-admin-templates/vue-dashboard/"
        >
          <span className="pl-2 pr-2">Buy dashboard</span>
        </a>
      </section>
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-12 sm:col-span-6 xl:col-span-3">
          <div className="md:rounded-xl dark:bg-slate-900/70 block bg-gray-100 mx-6 md:mx-0 shadow-xl">
            <div className="p-6">
              <div className="justify-between items-center flex mb-3">
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <div className="inline-flex items-center capitalize border py-1 px-4 text-xs rounded-full bg-emerald-500 border-emerald-500 text-white mr-1.5 last:mr-0">
                    <span className="inline-flex justify-center items-center w-4 h-4 mr-1">
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        className="inline-block"
                      >
                        <path
                          fill="currentColor"
                          d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
                        ></path>
                      </svg>
                    </span>
                    <span>12%</span>
                  </div>
                </div>
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        className="inline-flex cursor-pointer justify-center items-center whitespace-nowrap ring-blue-700 focus:outline-none transition-colors duration-150 border bg-white text-black border-gray-100 hover:bg-gray-50 text-sm p-1 focus:ring rounded"
                        type="button"
                      >
                        <span className="inline-flex justify-center items-center w-6 h-6">
                          <svg
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            className="inline-block"
                          >
                            <path
                              fill="currentColor"
                              d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="justify-between items-center flex">
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <div>
                    <h3 className="text-lg leading-tight text-gray-500 dark:text-gray-400">
                      Clients
                    </h3>
                    <h1 className="text-3xl leading-tight font-semibold">
                      <div>512</div>
                    </h1>
                  </div>
                </div>
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <span className="inline-flex justify-center items-center h-16 text-emerald-500">
                    <svg
                      viewBox="0 0 24 24"
                      width="48"
                      height="48"
                      className="inline-block"
                    >
                      <path
                        fill="currentColor"
                        d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 xl:col-span-3">
          <div className="md:rounded-xl dark:bg-slate-900/70 block bg-gray-100 mx-6 md:mx-0 shadow-xl">
            <div className="p-6">
              <div className="justify-between items-center flex mb-3">
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <div className="inline-flex items-center capitalize border py-1 px-4 text-xs rounded-full bg-red-500 border-red-500 text-white mr-1.5 last:mr-0">
                    <span className="inline-flex justify-center items-center w-4 h-4 mr-1">
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        className="inline-block"
                      >
                        <path
                          fill="currentColor"
                          d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                        ></path>
                      </svg>
                    </span>
                    <span>12%</span>
                  </div>
                </div>
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        className="inline-flex cursor-pointer justify-center items-center whitespace-nowrap ring-blue-700 focus:outline-none transition-colors duration-150 border bg-white text-black border-gray-100 hover:bg-gray-50 text-sm p-1 focus:ring rounded"
                        type="button"
                      >
                        <span className="inline-flex justify-center items-center w-6 h-6">
                          <svg
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            className="inline-block"
                          >
                            <path
                              fill="currentColor"
                              d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="justify-between items-center flex">
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <div>
                    <h3 className="text-lg leading-tight text-gray-500 dark:text-gray-400">
                      Sales
                    </h3>
                    <h1 className="text-3xl leading-tight font-semibold">
                      <div>$7,770</div>
                    </h1>
                  </div>
                </div>
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <span className="inline-flex justify-center items-center h-16 text-blue-500">
                    <svg
                      viewBox="0 0 24 24"
                      width="48"
                      height="48"
                      className="inline-block"
                    >
                      <path
                        fill="currentColor"
                        d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 xl:col-span-3">
          <div className="md:rounded-xl dark:bg-slate-900/70 block bg-gray-100 mx-6 md:mx-0 shadow-xl">
            <div className="p-6">
              <div className="justify-between items-center flex mb-3">
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <div className="inline-flex items-center capitalize border py-1 px-4 text-xs rounded-full bg-yellow-500 border-yellow-500 text-white mr-1.5 last:mr-0">
                    <span className="inline-flex justify-center items-center w-4 h-4 mr-1">
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        className="inline-block"
                      >
                        <path
                          fill="currentColor"
                          d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"
                        ></path>
                      </svg>
                    </span>
                    <span>Overflow</span>
                  </div>
                </div>
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        className="inline-flex cursor-pointer justify-center items-center whitespace-nowrap ring-blue-700 focus:outline-none transition-colors duration-150 border bg-white text-black border-gray-100 hover:bg-gray-50 text-sm p-1 focus:ring rounded"
                        type="button"
                      >
                        <span className="inline-flex justify-center items-center w-6 h-6">
                          <svg
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            className="inline-block"
                          >
                            <path
                              fill="currentColor"
                              d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="justify-between items-center flex">
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <div>
                    <h3 className="text-lg leading-tight text-gray-500 dark:text-gray-400">
                      Performance
                    </h3>
                    <h1 className="text-3xl leading-tight font-semibold">
                      <div>256%</div>
                    </h1>
                  </div>
                </div>
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <span className="inline-flex justify-center items-center h-16 text-red-500">
                    <svg
                      viewBox="0 0 24 24"
                      width="48"
                      height="48"
                      className="inline-block"
                    >
                      <path
                        fill="currentColor"
                        d="M3,14L3.5,14.07L8.07,9.5C7.89,8.85 8.06,8.11 8.59,7.59C9.37,6.8 10.63,6.8 11.41,7.59C11.94,8.11 12.11,8.85 11.93,9.5L14.5,12.07L15,12C15.18,12 15.35,12 15.5,12.07L19.07,8.5C19,8.35 19,8.18 19,8A2,2 0 0,1 21,6A2,2 0 0,1 23,8A2,2 0 0,1 21,10C20.82,10 20.65,10 20.5,9.93L16.93,13.5C17,13.65 17,13.82 17,14A2,2 0 0,1 15,16A2,2 0 0,1 13,14L13.07,13.5L10.5,10.93C10.18,11 9.82,11 9.5,10.93L4.93,15.5L5,16A2,2 0 0,1 3,18A2,2 0 0,1 1,16A2,2 0 0,1 3,14Z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 xl:col-span-3">
          <div className="md:rounded-xl dark:bg-slate-900/70 block bg-gray-100 mx-6 md:mx-0 shadow-xl">
            <div className="p-6">
              <div className="justify-between items-center flex mb-3">
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <div className="inline-flex items-center capitalize border py-1 px-4 text-xs rounded-full bg-blue-500 border-blue-500 text-white mr-1.5 last:mr-0">
                    <span>Last 24 hours</span>
                  </div>
                </div>
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        className="inline-flex cursor-pointer justify-center items-center whitespace-nowrap ring-blue-700 focus:outline-none transition-colors duration-150 border bg-white text-black border-gray-100 hover:bg-gray-50 text-sm p-1 focus:ring rounded"
                        type="button"
                      >
                        <span className="inline-flex justify-center items-center w-6 h-6">
                          <svg
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            className="inline-block"
                          >
                            <path
                              fill="currentColor"
                              d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="justify-between items-center flex">
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <div>
                    <h3 className="text-lg leading-tight text-gray-500 dark:text-gray-400">
                      Alerts
                    </h3>
                    <h1 className="text-3xl leading-tight font-semibold">
                      <div>24</div>
                    </h1>
                  </div>
                </div>
                <div className="flex shrink-1 grow-9 items-center justify-center">
                  <span className="inline-flex justify-center items-center h-16 text-yellow-500">
                    <svg
                      viewBox="0 0 24 24"
                      width="48"
                      height="48"
                      className="inline-block"
                    >
                      <path
                        fill="currentColor"
                        d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
