export default function NotificationButton() {
  function showChat() {
    // this.$crisp.push(["do", "chat:show"]);
    // this.$crisp.push(["do", "chat:open"]);
  }
  return (
    <div className="relative">
      <div className="inline-flex shadow-none rounded-sm divide-x divide-gray-300">
        <div className="text-sm relative z-0 inline-flex shadow-none rounded-full">
          <button className="text-gray-500 menu-btn p-0 m-0 hover:text-gray-900 focus:text-gray-900 focus:outline-none transition-all ease-in-out duration-300">
            <i className="fad fa-bells text-base"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
