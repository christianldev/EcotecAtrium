import Calendar from 'components/Calendar';
import Events from 'components/Calendar/Events';
import Task from 'components/Calendar/Task';
import OnlineUsers from 'components/OnlineUsers';
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
      <div className="flex flex-wrap flex-row">
        <div class="flex-shrink max-w-full w-full order-2 md:order-1 xl:w-3/4">
          <div class="flex flex-wrap flex-row">
            <div class="flex-shrink max-w-full px-2 w-full mb-6">
              <div className="bg-white flex items-center justify-center ">
                <div className="mx-auto w-full max-w-screen-lg bg-blue-700 px-5 py-4 rounded-xl">
                  <div className="grid gap-5 md:grid-cols-2 md:gap-10 ">
                    <div className="flex justify-center md:justify-end">
                      <img
                        className="w-full max-w-sm"
                        src="https://ouch-cdn2.icons8.com/sKnF2PmYhkmP28DzIm6KqWSknT03UVWjg3FLlGYIOp4/rs:fit:684:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTI3/L2U4OWQ2NmZiLTg0/NzEtNDc3NS1hNTA0/LTMwNWRiYmJkNzg0/MC5zdmc.png"
                        alt="Marketing newsletter via computer Illustration in PNG, SVG"
                      />
                    </div>
                    <div className="flex items-center">
                      <div className="mx-auto md:mx-0">
                        <h3 className="text-4xl font-bold text-white">
                          Subscribe
                        </h3>
                        <p className="mt-2 max-w-[20rem] text-lg text-white/80">
                          Join our weekly digest. You'll also receive some of
                          our best posts today.
                        </p>
                        <form action="" className="mt-4 flex flex-col">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full rounded border border-white/50 bg-transparent px-3 py-2 text-white placeholder:text-white/50 md:max-w-[18rem]"
                          />
                          <button
                            type="submit"
                            className="mt-4 w-full max-w-[14rem] rounded bg-white/30 px-14 py-2 text-center text-white"
                          >
                            Subscribe
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-shrink max-w-full px-2 w-full sm:w-1/3 mb-6">
              <div class="bg-gray-800 text-gray-500 rounded-xl shadow-xl py-5 px-5 h-full">
                <div class="flex flex-wrap flex-row items-center">
                  <h3 class="text-lg font-semibold leading-tight flex-1">
                    TOTAL SESSIONS
                  </h3>
                  <div class="relative h-5 leading-none">
                    <button class="text-xl text-gray-500 hover:text-gray-300 h-6 focus:outline-none">
                      <i class="mdi mdi-chevron-up"></i>
                    </button>
                  </div>
                </div>
                <div
                  class="relative overflow-hidden transition-all duration-500"
                  x-ref="card"
                  style={{ maxHeight: '148px', opacity: '1' }}
                >
                  <div>
                    <div class="pb-4 lg:pb-6">
                      <h4
                        class="text-2xl lg:text-3xl text-white font-semibold leading-tight inline-block"
                        x-ref="total"
                      >
                        11,602
                      </h4>
                    </div>
                    <div class="pb-4 lg:pb-6">
                      <div class="overflow-hidden rounded-full h-3 bg-gray-800 flex transition-all duration-500 w-full">
                        <template x-for="(item,index) in cardData.sessions">
                          <div class="h-full"></div>
                        </template>

                        <div
                          class="h-full bg-indigo-600"
                          style={{ width: '60%' }}
                        ></div>

                        <div
                          class="h-full bg-indigo-400"
                          style={{ width: '30%' }}
                        ></div>

                        <div
                          class="h-full bg-indigo-200"
                          style={{ width: '10%' }}
                        ></div>
                      </div>
                    </div>
                    <div class="flex -mx-4">
                      <template x-for="(item,index) in cardData.sessions">
                        <div class="w-1/3 px-4">
                          <div class="text-sm">
                            <span class="inline-block w-2 h-2 rounded-full mr-1 align-middle">
                              &nbsp;
                            </span>
                            <span class="align-middle" x-text="item.label">
                              &nbsp;
                            </span>
                          </div>
                          <div class="font-medium text-lg text-white">
                            <span>0</span>%
                          </div>
                        </div>
                      </template>

                      <div class="w-1/3 px-4">
                        <div class="text-sm">
                          <span class="inline-block w-2 h-2 rounded-full mr-1 align-middle bg-indigo-600">
                            &nbsp;
                          </span>
                          <span class="align-middle" x-text="item.label">
                            Phone
                          </span>
                        </div>
                        <div class="font-medium text-lg text-white">
                          <span x-ref="device0">60</span>%
                        </div>
                      </div>

                      <div class="w-1/3 px-4 border-l border-gray-700">
                        <div class="text-sm">
                          <span class="inline-block w-2 h-2 rounded-full mr-1 align-middle bg-indigo-400">
                            &nbsp;
                          </span>
                          <span class="align-middle" x-text="item.label">
                            Tablet
                          </span>
                        </div>
                        <div class="font-medium text-lg text-white">
                          <span x-ref="device1">30</span>%
                        </div>
                      </div>

                      <div class="w-1/3 px-2 border-l border-gray-700">
                        <div class="text-sm">
                          <span class="inline-block w-2 h-2 rounded-full mr-1 align-middle bg-indigo-200">
                            &nbsp;
                          </span>
                          <span class="align-middle" x-text="item.label">
                            Desktop
                          </span>
                        </div>
                        <div class="font-medium text-lg text-white">
                          <span x-ref="device2">10</span>%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-shrink max-w-full px-2 w-full sm:w-1/3 mb-6">
              <div class="bg-gray-800 text-gray-500 rounded-xl shadow-xl py-5 px-5 h-full">
                <div class="flex flex-wrap flex-row items-center">
                  <h3 class="text-lg font-semibold leading-tight flex-1">
                    TOTAL SESSIONS
                  </h3>
                  <div class="relative h-5 leading-none">
                    <button class="text-xl text-gray-500 hover:text-gray-300 h-6 focus:outline-none">
                      <i class="mdi mdi-chevron-up"></i>
                    </button>
                  </div>
                </div>
                <div
                  class="relative overflow-hidden transition-all duration-500"
                  x-ref="card"
                  style={{ maxHeight: '148px', opacity: '1' }}
                >
                  <div>
                    <div class="pb-4 lg:pb-6">
                      <h4
                        class="text-2xl lg:text-3xl text-white font-semibold leading-tight inline-block"
                        x-ref="total"
                      >
                        11,602
                      </h4>
                    </div>
                    <div class="pb-4 lg:pb-6">
                      <div class="overflow-hidden rounded-full h-3 bg-gray-800 flex transition-all duration-500 w-full">
                        <template x-for="(item,index) in cardData.sessions">
                          <div class="h-full"></div>
                        </template>

                        <div
                          class="h-full bg-indigo-600"
                          style={{ width: '60%' }}
                        ></div>

                        <div
                          class="h-full bg-indigo-400"
                          style={{ width: '30%' }}
                        ></div>

                        <div
                          class="h-full bg-indigo-200"
                          style={{ width: '10%' }}
                        ></div>
                      </div>
                    </div>
                    <div class="flex -mx-4">
                      <template x-for="(item,index) in cardData.sessions">
                        <div class="w-1/3 px-4">
                          <div class="text-sm">
                            <span class="inline-block w-2 h-2 rounded-full mr-1 align-middle">
                              &nbsp;
                            </span>
                            <span class="align-middle" x-text="item.label">
                              &nbsp;
                            </span>
                          </div>
                          <div class="font-medium text-lg text-white">
                            <span>0</span>%
                          </div>
                        </div>
                      </template>

                      <div class="w-1/3 px-4">
                        <div class="text-sm">
                          <span class="inline-block w-2 h-2 rounded-full mr-1 align-middle bg-indigo-600">
                            &nbsp;
                          </span>
                          <span class="align-middle" x-text="item.label">
                            Phone
                          </span>
                        </div>
                        <div class="font-medium text-lg text-white">
                          <span x-ref="device0">60</span>%
                        </div>
                      </div>

                      <div class="w-1/3 px-4 border-l border-gray-700">
                        <div class="text-sm">
                          <span class="inline-block w-2 h-2 rounded-full mr-1 align-middle bg-indigo-400">
                            &nbsp;
                          </span>
                          <span class="align-middle" x-text="item.label">
                            Tablet
                          </span>
                        </div>
                        <div class="font-medium text-lg text-white">
                          <span x-ref="device1">30</span>%
                        </div>
                      </div>

                      <div class="w-1/3 px-2 border-l border-gray-700">
                        <div class="text-sm">
                          <span class="inline-block w-2 h-2 rounded-full mr-1 align-middle bg-indigo-200">
                            &nbsp;
                          </span>
                          <span class="align-middle" x-text="item.label">
                            Desktop
                          </span>
                        </div>
                        <div class="font-medium text-lg text-white">
                          <span x-ref="device2">10</span>%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-shrink max-w-full px-2 w-full sm:w-1/3 mb-6">
              <div class="bg-gray-800 text-gray-500 rounded-xl shadow-xl py-5 px-5 h-full">
                <div class="flex flex-wrap flex-row items-center">
                  <h3 class="text-lg font-semibold leading-tight flex-1">
                    TOTAL SESSIONS
                  </h3>
                  <div class="relative h-5 leading-none">
                    <button class="text-xl text-gray-500 hover:text-gray-300 h-6 focus:outline-none">
                      <i class="mdi mdi-chevron-up"></i>
                    </button>
                  </div>
                </div>
                <div
                  class="relative overflow-hidden transition-all duration-500"
                  x-ref="card"
                  style={{ maxHeight: '148px', opacity: '1' }}
                >
                  <div>
                    <div class="pb-4 lg:pb-6">
                      <h4
                        class="text-2xl lg:text-3xl text-white font-semibold leading-tight inline-block"
                        x-ref="total"
                      >
                        11,602
                      </h4>
                    </div>
                    <div class="pb-4 lg:pb-6">
                      <div class="overflow-hidden rounded-full h-3 bg-gray-800 flex transition-all duration-500 w-full">
                        <template x-for="(item,index) in cardData.sessions">
                          <div class="h-full"></div>
                        </template>

                        <div
                          class="h-full bg-indigo-600"
                          style={{ width: '60%' }}
                        ></div>

                        <div
                          class="h-full bg-indigo-400"
                          style={{ width: '30%' }}
                        ></div>

                        <div
                          class="h-full bg-indigo-200"
                          style={{ width: '10%' }}
                        ></div>
                      </div>
                    </div>
                    <div class="flex -mx-4">
                      <template x-for="(item,index) in cardData.sessions">
                        <div class="w-1/3 px-4">
                          <div class="text-sm">
                            <span class="inline-block w-2 h-2 rounded-full mr-1 align-middle">
                              &nbsp;
                            </span>
                            <span class="align-middle" x-text="item.label">
                              &nbsp;
                            </span>
                          </div>
                          <div class="font-medium text-lg text-white">
                            <span>0</span>%
                          </div>
                        </div>
                      </template>

                      <div class="w-1/3 px-4">
                        <div class="text-sm">
                          <span class="inline-block w-2 h-2 rounded-full mr-1 align-middle bg-indigo-600">
                            &nbsp;
                          </span>
                          <span class="align-middle" x-text="item.label">
                            Phone
                          </span>
                        </div>
                        <div class="font-medium text-lg text-white">
                          <span x-ref="device0">60</span>%
                        </div>
                      </div>

                      <div class="w-1/3 px-4 border-l border-gray-700">
                        <div class="text-sm">
                          <span class="inline-block w-2 h-2 rounded-full mr-1 align-middle bg-indigo-400">
                            &nbsp;
                          </span>
                          <span class="align-middle" x-text="item.label">
                            Tablet
                          </span>
                        </div>
                        <div class="font-medium text-lg text-white">
                          <span x-ref="device1">30</span>%
                        </div>
                      </div>

                      <div class="w-1/3 px-2 border-l border-gray-700">
                        <div class="text-sm">
                          <span class="inline-block w-2 h-2 rounded-full mr-1 align-middle bg-indigo-200">
                            &nbsp;
                          </span>
                          <span class="align-middle" x-text="item.label">
                            Desktop
                          </span>
                        </div>
                        <div class="font-medium text-lg text-white">
                          <span x-ref="device2">10</span>%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink max-w-full px-4 w-full order-1 md:order-2 xl:w-1/4 mb-6">
          <div className="container mx-auto h-auto relative">
            <div className="flex w-4/3 rounded-lg h-full lg:overflow-hidden overflow-auto lg:flex-row  flex-col shadow-xl">
              <div className="lg:w-full bg-white text-gray-800 flex flex-col">
                <Calendar />
                <Task />
                <Events />
                <OnlineUsers users={users} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
