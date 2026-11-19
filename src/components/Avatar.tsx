import { imageUrl } from "@/lib/imageUrl";
interface AvatarProps {
  img: string | undefined | null;
  className?: string;
  isBlob?: boolean;
}
function Avatar({ img, className, isBlob = false }: AvatarProps) {
  return isBlob ? (
    <img
      className={`rounded-md object-cover ${className}`}
      src={img || ""}
      alt=""
    />
  ) : (
    <img
      className={`rounded-md object-cover ${className}`}
      src={imageUrl(img)}
      alt=""
    />
  );
}

export default Avatar;
