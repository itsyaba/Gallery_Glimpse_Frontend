import { Link, NavLink } from "react-router-dom";
import { categories } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/app/hooks";
import { AvatarWithFallback } from "./AvatarWithFallback";

export const SideNav = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  if (!userInfo || !userInfo.data || !userInfo.data.user) {
    return null; 
  }

  return (
    <div className="fixed top-0 left-0 w-1/6 h-screen dark:bg-slate-800 p-4 shadow-2xl hidden lg:flex flex-col">
      <ScrollArea className="w-full h-full overflow-y-auto">
        {/* FOR DESKTOP */}
        <div className="flex flex-col items-start justify-between gap-4 w-full h-max">
          <Link to="/">
            <h1 className="scroll-m-20 text-lg font-extrabold tracking-tight lg:text-xl">
              Gallery Glimpse
            </h1>
          </Link>

          <div className="w-full">
            <h1 className="text-xl font-semibold capitalize font-poiret mb-4">categories</h1>
            <ul className="flex flex-col gap-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <NavLink
                    to={`/category/${category.name.toLowerCase()}`}
                    
                    className={({ isActive }) =>
                      isActive
                        ? "underline dark:text-white text-black"
                        : "hover:underline dark:text-gray-300 text-gray-800 "
                    }
                  >
                    <span className="flex items-start gap-2">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="shadow-lg rounded-md aspect-auto w-8 h-8"
                      />
                      <h1 className="text-md font-quicksand capitalize tracking-wide">
                        {category.name}
                      </h1>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="dark:bg-black w-full mt-2 rounded-md py-2 px-2 flex items-center gap-2 bg-white  shadow-inner">
            <div className="scale-90">
              <AvatarWithFallback />
            </div>
            <Link to={`/profile/${userInfo.data.user._id}`}>
              <h5 className="text-md font-poiret font-semibold">{userInfo.data.user.name}</h5>
            </Link>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
