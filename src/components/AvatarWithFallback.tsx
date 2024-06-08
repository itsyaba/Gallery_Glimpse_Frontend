import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

export const AvatarWithFallback = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  return (
    <Link to={`profile/${userInfo.data.user._id}`}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>YT</AvatarFallback>
      </Avatar>
    </Link>
  );
};
