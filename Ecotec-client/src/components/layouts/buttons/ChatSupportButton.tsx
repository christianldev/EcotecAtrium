export default function ChatSupportButton() {
  function showChat() {
    // this.$crisp.push(["do", "chat:show"]);
    // this.$crisp.push(["do", "chat:open"]);
  }
  return (
    <div className="relative">
      <div className="relative">
        <div className="inline-flex shadow-none rounded-sm divide-x divide-gray-300">
          <div className="text-sm relative z-0 inline-flex shadow-none rounded-full">
            <button onClick={showChat} className="flex py-3 text-sm rounded-full focus:outline-none" id="messages">
              <div className="relative inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6 bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"></path>
                </svg>

                <span className="flex justify-center absolute -top-2 ltr:-right-1 rtl:-left-1 text-center bg-blue-500 px-1 text-white rounded-full text-xs">
                  <span className="align-self-center">3</span>
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
