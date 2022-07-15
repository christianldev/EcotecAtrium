import React from 'react';

export default function AccordionOption({ Icon, ...props }) {
  return (
    <h2 id="accordion-color-heading-1">
      <button
        type="button"
        className="flex items-center justify-between w-full p-3 font-medium text-left text-blue-500  dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800"
        data-accordion-target="#accordion-color-body-1"
        aria-expanded="true"
        aria-controls="accordion-color-body-1"
      >
        {Icon}
        <span>{props.title}</span>
        <svg
          data-accordion-icon
          className="w-6 h-6 rotate-180 shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </h2>
  );
}
