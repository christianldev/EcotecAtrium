const ModalProfileForm = ({ setShowModal }) => {
  return (
    <div className="z-50 overflow-auto inset-0 w-full h-full fixed py-6">
      <div
        className="z-50 relative p-3 mx-auto my-0 max-w-full"
        style={{ maxWidth: '600px' }}
        x-show="open"
        x-transition:enter="transition duration-500"
        x-transition:enter-start="transform opacity-0 -translate-y-4"
        x-transition:enter-end="transform opacity-100 translate-y-0"
        x-transition:leave="transition -translate-y-4"
        x-transition:leave-start="transform opacity-100 translate-y-0"
        x-transition:leave-end="transform opacity-0 -translate-y-4"
      >
        <form className="valid-form bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-800 flex flex-col overflow-hidden">
          <button className="fill-current h-6 w-6 absolute ltr:right-0 rtl:left-0 top-0 m-6 font-3xl font-bold">
            ×
          </button>

          <div className="px-6 py-3 text-xl border-b dark:border-gray-800 font-bold">Edit profile</div>

          <div className="p-6 flex-grow">
            <div className="flex flex-wrap flex-row -mx-4">
              <div className="flex-shrink max-w-full px-4 w-full">
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden pb-8">
                  <div className="h-40 overflow-hidden relative">
                    <img src="src/img/blog/bg.jpg" className="w-full" />
                  </div>
                  <div className="flex justify-center -mt-10 relative">
                    <img
                      src="src/img/avatar/avatar.png"
                      className="rounded-full w-24 h-24 bg-gray-200 border-solid border-white border-2 -mt-3"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-6">
                <div className="inline-block mb-2">Avatar (80x80)</div>
                <div id="avatar-upload" className="dropzone single-dropzone mb-6 dz-clickable">
                  <div className="dz-message" data-dz-message="">
                    <div className="pre-upload flex flex-col justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="mx-auto text-gray-500 inline-block w-10 h-10 bi bi-cloud-arrow-up"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                        ></path>
                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"></path>
                      </svg>
                      <div className="py-3">
                        <span>Drag &amp; drop images here</span>
                      </div>
                    </div>
                    <div className="pre-upload text-center">
                      <button className="py-1.5 px-3 inline-block text-center rounded leading-normal text-gray-800 bg-gray-100 border border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:ring-0 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 ltr:mr-2 rtl:ml-2 dark:bg-gray-300">
                        Browse file
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-6">
                <div className="inline-block mb-2">Cover (1287x160)</div>
                <div id="cover-upload" className="dropzone single-dropzone mb-6 dz-clickable">
                  <div className="dz-message" data-dz-message="">
                    <div className="pre-upload flex flex-col justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="mx-auto text-gray-500 inline-block w-10 h-10 bi bi-cloud-arrow-up"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                        ></path>
                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"></path>
                      </svg>
                      <div className="py-3">
                        <span>Drag &amp; drop images here</span>
                      </div>
                    </div>
                    <div className="pre-upload text-center">
                      <button className="py-1.5 px-3 inline-block text-center rounded leading-normal text-gray-800 bg-gray-100 border border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:ring-0 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 ltr:mr-2 rtl:ml-2 dark:bg-gray-300">
                        Browse file
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-6 has-danger">
                <label htmlFor="inputname" className="inline-block mb-2">
                  Firs name
                </label>
                <input
                  type="text"
                  className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
                  id="inputname"
                />
                <div className="pristine-error text-help">This field is required</div>
              </div>
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-6 has-success">
                <label htmlFor="inputlast" className="inline-block mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
                  id="inputlast"
                />
                <div className="pristine-error text-help" style={{ display: 'none' }}></div>
              </div>
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-6 has-danger">
                <label htmlFor="inputEmail4" className="inline-block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
                  id="inputEmail4"
                />
                <div className="pristine-error text-help">This field is required</div>
              </div>
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-6 has-danger">
                <label htmlFor="inputPassword4" className="inline-block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
                  id="inputPassword4"
                />
                <div className="pristine-error text-help">This field is required</div>
              </div>
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-6 has-success">
                <label htmlFor="inputnumber" className="inline-block mb-2">
                  Phone number
                </label>
                <input
                  type="text"
                  className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
                  id="inputnumber"
                />
                <div className="pristine-error text-help" style={{ display: 'none' }}></div>
              </div>
              <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-6 has-success">
                <label htmlFor="inputlocation" className="inline-block mb-2">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
                  id="inputlocation"
                />
                <div className="pristine-error text-help" style={{ display: 'none' }}></div>
              </div>
              <div className="form-group flex-shrink max-w-full px-4 w-full mb-6 has-success">
                <label htmlFor="inputshort" className="inline-block mb-2">
                  Short description
                </label>
                <input
                  type="text"
                  className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
                  id="inputshort"
                />
                <div className="pristine-error text-help" style={{ display: 'none' }}></div>
              </div>
              <div className="form-group flex-shrink max-w-full px-4 w-full mb-6 has-success">
                <label htmlFor="inputlong" className="inline-block mb-2">
                  About description
                </label>
                <textarea
                  type="text"
                  className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
                  id="inputlong"
                ></textarea>
                <div className="pristine-error text-help" style={{ display: 'none' }}></div>
              </div>
            </div>
          </div>
          <div className="px-6 py-3 border-t dark:border-gray-800 flex justify-end">
            <button
              type="button"
              className="py-2 px-4 inline-block text-center rounded leading-5 text-gray-800 bg-gray-100 border border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:ring-0 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 ltr:mr-2 rtl:ml-2"
            >
              Close
            </button>
            <button
              type="submit"
              className="py-2 px-4 inline-block text-center rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0"
            >
              Saves
            </button>
          </div>
        </form>
      </div>
      <div className="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50"></div>
    </div>
  );
};

export default ModalProfileForm;
