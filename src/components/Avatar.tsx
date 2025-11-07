import API_BASE_URL from "../config/config";
interface AvatarProps {
  img: string | undefined | null;
  className?: string;
  isBlob?: boolean;
}
function Avatar({ img, className, isBlob = false }: AvatarProps) {
  return isBlob ? (
    <img
      className={`rounded-[50%] object-cover ${className}`}
      src={img || ""}
      alt=""
    />
  ) : (
    <img
      className={`rounded-[50%] object-cover ${className}`}
      src={`${img ? `${API_BASE_URL}/uploads/${img}` : `/person.png`}`}
      alt=""
    />
  );
}

export default Avatar;
