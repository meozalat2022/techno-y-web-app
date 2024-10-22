"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

import { useSelector } from "react-redux";

const Modal = () => {
  const { loading, error, allCategories } = useSelector(
    (state) => state.category
  );
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();

  const sortedCategories = [];

  for (let i in allCategories) {
    sortedCategories.push(allCategories[i]);
  }

  sortedCategories.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return -1;
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  });
  return (
    <>
      {modal && (
        <dialog className="fixed w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex flex-row-reverse ">
          <div className="bg-white w-80">
            <div className="flex flex-col  mt-4">
              <div className="flex w-full items-center px-2 justify-between">
                <div className="flex-1">
                  <p className="text-lg font-bold">All Categories</p>
                </div>
                <Link className="" href={pathname}>
                  <button type="button" className=" p-2 text-2xl font-bold">
                    X
                  </button>
                </Link>
              </div>
              {/* horizontal line break */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slat-900 mx-4"></div>
              </div>
            </div>
            {sortedCategories &&
              sortedCategories?.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col py-4  ml-4 items-end px-6"
                >
                  <Link
                    className="hover:text-primary hover:underline"
                    href={`/productByCategory/:${item._id}`}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
          </div>
        </dialog>
      )}
    </>
  );
};

export default Modal;
