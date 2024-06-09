import React from "react";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";

interface PinItem {
  image: string;
  title: string;
  _id: string;
}

interface MasonryLayoutProps {
  pins: PinItem[];
}

export const MasonryLayout: React.FC<MasonryLayoutProps> = ({ pins }) => {

  const breakpointCols = {
    default: 6,
    1100: 4,
    700: 3,
    500: 1,
  };

  return pins?.length > 0 ? (
    <Masonry
      breakpointCols={breakpointCols}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {pins.map((item) => (
        <div key={item._id} className="relative overflow-hidden group shadow-2xl" id="pinContainer">
          <Link to={`/pin/${item._id}`}>
            <img
              src={`http://localhost:3000/Images/${item.image}`}
              alt={`Image ${item._id}`}
              className="group-hover:scale-110 transition-all duration-700 ease-in-out object-cover w-full h-full"
            />
            <h1 className="absolute dark:bg-slate-900 bg-slate-300 opacity-70 slide-out-to-bottom-10 left-0 right-0 font-quicksand py-2 pl-2 capitalize group-hover:transition-all group-hover:ease-in group-hover:bottom-0 ">
              {item.title}
            </h1>
          </Link>
        </div>
      ))}
    </Masonry>
  ) : (
    <div className="font-quicksand font-bold text-2xl text-center mt-6">No Image Found!</div>
  );
};
