import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MaintenancePage() {
  return (
    <div className="dark:bg-dark bg-slate-300 h-screen dark:text-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <FontAwesomeIcon
          icon={faHammer}
          className="text-[80px] text-purple-500/50 animate-bounce"
        />
        <div className="flex flex-col gap-2 items-center">
          <div className="md:text-3xl text-2xl uppercase font-bold text-center">Website is under maintenance</div>
          <div className="md:text-2xl text-xl uppercase">We'll be back shortly</div>
        </div>
      </div>
    </div>
  );
}

export default MaintenancePage;
