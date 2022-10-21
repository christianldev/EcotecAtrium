export default function NotificationButton() {
  function showChat() {
    // this.$crisp.push(["do", "chat:show"]);
    // this.$crisp.push(["do", "chat:open"]);
  }
  return (
    <div className="relative">
      <div className="relative">
        <div className="inline-flex shadow-none rounded-sm divide-x divide-gray-300">
          <div className="text-sm relative z-0 inline-flex shadow-none rounded-full">
            <button className=" py-3 px-4 flex text-sm rounded-full focus:outline-none" id="notify">
              <div className="relative inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6 bi bi-bell"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"></path>
                </svg>

                <span className="flex justify-center absolute -top-2 ltr:-right-1 rtl:-left-1 text-center bg-blue-500 px-1 text-white rounded-full text-xs">
                  <span className="align-self-center">1</span>
                </span>
              </div>
            </button>
            {/* <button onClick={showChat} type="button" className="text-gray-800 bg-gray-50 border-gray-100 shadow-inner border relative inline-flex items-center p-2 rounded-full font-medium hover:bg-theme-300 hover:text-theme-800 focus:bg-theme-400 focus:text-theme-900 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-theme-50 focus:ring-theme-100" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="chat-label">
              <span className="sr-only">Chat</span>
         
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
