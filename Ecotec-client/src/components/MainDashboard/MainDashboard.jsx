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
      <div className="grid grid-cols-12 gap-6  mb-6 m-4">
        <div className="col-span-12 sm:col-span-12 xl:col-span-9 lg:col-span-9">
          <div className="bg-white flex items-center justify-center">
            <div className="mx-auto w-full max-w-screen-lg bg-blue-700 px-5 py-4">
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
                    <h3 className="text-4xl font-bold text-white">Subscribe</h3>
                    <p className="mt-2 max-w-[20rem] text-lg text-white/80">
                      Join our weekly digest. You'll also receive some of our
                      best posts today.
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
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 lg:col-span-3 ">
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
