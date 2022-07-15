import React from 'react';
import AccordionOption from 'components/AccordionOption';
import { RiSlideshow3Line } from 'react-icons/ri';

export default function Events() {
  return (
    <>
      <AccordionOption
        title="Eventos"
        Icon={<RiSlideshow3Line className="h-6 w-6" />}
      />
      <div className="scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-500 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
        <div className=" px-4 py-6 flex items-center ">
          <div className="flex ml-4">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=046c29138c1335ef8edee7daf521ba50"
              className="w-10 h-10 object-cover rounded object-top"
            />
            <div className="flex flex-col pl-4">
              <h2 className="font-medium text-xs">Phoebe Roy</h2>
              <h3 className="text-gray-500 text-sm">Financial Analyst</h3>
            </div>
          </div>
          <button className="text-gray-500 flex items-center text-sm focus:outline-none rounded ml-auto py-2 leading-none">
            <svg
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-4 h-4 mr-2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
            Edit
          </button>
        </div>

        <div className="px-4 py-6 flex items-center ">
          <div className="flex ml-4">
            <img
              src="https://randomuser.me/api/portraits/women/63.jpg"
              className="w-10 h-10 object-cover rounded object-top"
            />
            <div className="flex flex-col pl-4">
              <h2 className="font-medium text-sm">Sadie McDaniel</h2>
              <h3 className="text-gray-500 text-xs">Product Manager</h3>
            </div>
          </div>
          <button className="text-gray-500 flex items-center text-sm focus:outline-none rounded ml-auto py-2 leading-none">
            <svg
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-4 h-4 mr-2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
            Edit
          </button>
        </div>
        <div className=" px-4 py-6 flex items-center ">
          <div className="flex ml-4">
            <img
              src="https://pbs.twimg.com/profile_images/1157046181698011136/xZ4wg2Xj.jpg"
              className="w-10 h-10 object-cover rounded object-top"
            />
            <div className="flex flex-col pl-4">
              <h2 className="font-medium text-xs">Maggie White</h2>
              <h3 className="text-gray-500 text-sm">Financial Analyst</h3>
            </div>
          </div>
          <button className="text-gray-500 flex items-center text-sm focus:outline-none rounded ml-auto py-2 leading-none">
            <svg
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-4 h-4 mr-2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
            Edit
          </button>
        </div>
      </div>
    </>
  );
}
