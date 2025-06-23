import API_BASE_URL from "../config/config";
import Person from "../assets/person.png";
import { useEffect } from "react";
function Avatar({ img, className, isBlob = false }) {
  return isBlob ? (
    <img
      className={`rounded-[50%] object-cover ${className}`}
      src={img}
      alt=""
    />
  ) : (
    <img
      className={`rounded-[50%] object-cover ${className}`}
      src={`${img ? `${API_BASE_URL}/uploads/${img}` : Person}`}
      alt=""
    />
  );
}

export default Avatar;
