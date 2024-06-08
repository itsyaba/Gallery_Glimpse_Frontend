import { AlignJustify, PlusIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import Search from "./Search";
import { Button } from "./ui/button";
import { AvatarWithFallback } from "./AvatarWithFallback";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, NavLink } from "react-router-dom";
import { categories } from "@/lib/data";

export const Navbar = () => {
  // const getFirstLetter = () => {
  //   const fullName = userInfo?.data?.user?.name.split(" ");
  //   const firstLetterOfName = fullName[0][0];
  //   const firstLetterOfFatherName = fullName[1][0];
  //   return firstLetterOfName.toUpperCase() + firstLetterOfFatherName.toUpperCase();
  // };

  // console.log(userInfo.data.user._id);

  return (
    <>
      {/* FOR MOBILE */}
      <div className="lg:hidden flex items-center justify-between my-4">
        <Link to="/">
          <h1 className="font-extrabold tracking-tight text-3xl ">Gallery Glimpse</h1>
        </Link>
        <Sheet>
          <SheetTrigger>
            <AlignJustify />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <h3 className="text-xl font-semibold capitalize  font-poiret ">categories</h3>
              </SheetTitle>
              <SheetDescription>
                <div className="w-full">
                  <ul className="flex flex-col gap-3">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <NavLink
                          to={`/category/${category.name.toLowerCase()}`}
                          className={({ isActive }) =>
                            isActive
                              ? "dark:text-white  underline"
                              : "hover:underline dark:text-gray-300 text-gray-400"
                          }
                        >
                          <SheetClose>
                            <span className="flex items-start gap-2 hover:underline">
                              <img
                                src={category.image}
                                alt={category.name}
                                className=" shadow-lg rounded-md aspect-auto w-8 h-8"
                              />
                              <h1 className="text-md font-quicksand capitalize tracking-wide">
                                {category.name}
                              </h1>
                            </span>
                          </SheetClose>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="w-full h-20 flex justify-between gap-3 flex-col lg:flex-row lg:mb-4 mb-12">
        <Search />
        <div className="flex items-center justify-between gap-4">
          <AvatarWithFallback />
          <Link to="create">
            <Button variant="secondary" className="p-6 ">
              <PlusIcon />
            </Button>
          </Link>

          <ModeToggle />
        </div>
      </div>
    </>
  );
};
