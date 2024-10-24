import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBlog,
  faClock,
  faPersonChalkboard,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
export default function Analytics() {
  return (
    <>
      <div className="flex items-center justify-between sm:flex-row flex-col">
        <div>
          <div className="text-white font-semibold text-4xl ">
            Analytics Panel
          </div>
          <div className="text-gray-400 mt-2">
            Track users , courses, and much more
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="rounded-md border border-borderDark p-3">
          <Panel
            icon={
              <FontAwesomeIcon
                className="text-white text-xl  p-2 rounded-full"
                icon={faUser}
              />
            }
            text={"Total users"}
            number={1000}
          />
          <div className="flex gap-3 lg:flex-row flex-col mt-3 ">
            <Panel
              icon={<Ping color={"green"} />}
              text={"Active users"}
              number={500}
            />
            <Panel
              icon={<Ping color={"red"} />}
              text={"inactive users"}
              number={500}
            />
          </div>
        </div>

        <div className="rounded-md border border-borderDark p-3 mt-3">
          <Panel
            icon={
              <FontAwesomeIcon
                className="text-white text-xl  p-2 rounded-full"
                icon={faPersonChalkboard}
              />
            }
            text={"total courses"}
            number={25}
          />
        </div>

        <div className="rounded-md border border-borderDark p-3 mt-3">
          <Panel
            icon={
              <FontAwesomeIcon
                className="text-white text-xl  p-2 rounded-full"
                icon={faStar}
              />
            }
            text={"total reviews"}
            number={550}
          />
        </div>
        <div className="rounded-md border border-borderDark p-3 mt-3">
          <Panel
            icon={
              <FontAwesomeIcon
                className="text-white text-xl  p-2 rounded-full"
                icon={faBlog}
              />
            }
            text={"total blog posts"}
            number={15}
          />
        </div>
        <div className="rounded-md border border-borderDark p-3 mt-3">
          <Panel
            icon={
              <FontAwesomeIcon
                className="text-white text-xl  p-2 rounded-full"
                icon={faClock}
              />
            }
            text={"System up time"}
            number={'52:10'}
          />
        </div>
      </div>
    </>
  );
}
function Ping({ color }) {
  return (
    <>
      <span class="relative flex h-3 w-3">
        <span
          class={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${color}-400 opacity-75`}
        ></span>
        <span
          class={`relative inline-flex rounded-full h-3 w-3 bg-${color}-500`}
        ></span>
      </span>
    </>
  );
}
function Panel({ icon, text, number }) {
  return (
    <div className="p-5 bg-lightDark shadow-lg flex-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <div className="text-white xl:text-2xl text-xl uppercase">{text}</div>
        </div>

        <div className="text-2xl font-semibold text-white">{number}</div>
      </div>
    </div>
  );
}