import AccordionOption from 'components/AccordionOption';
import React from 'react';
import { RiUserLine } from 'react-icons/ri';

export default function OnlineUsers() {
  return (
    <>
      <AccordionOption
        title="Eventos"
        Icon={<RiUserLine className="h-6 w-6" />}
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
          <span className="text-gray-500 flex items-center text-xs focus:outline-none rounded ml-auto py-2 leading-none">
            <div className="w-2 h-2 rounded-full relative  right-1 bg-green-500 border-green-500 "></div>
            Activo
          </span>
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
          <span className="text-gray-500 flex items-center text-xs focus:outline-none rounded ml-auto py-2 leading-none">
            <div className="w-2 h-2 rounded-full relative  right-1 bg-green-500 border-green-500 "></div>
            Activo
          </span>
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
          <span className="text-gray-500 flex items-center text-xs focus:outline-none rounded ml-auto py-2 leading-none">
            <div className="w-2 h-2 rounded-full relative  right-1 bg-green-500 border-green-500 "></div>
            Activo
          </span>
        </div>
      </div>
    </>
  );
}
