import React from "react";

const Loading = () => {
  return (
    <div className="mx-auto  w-full max-w-4xl px-4">
      <div className="flex flex-col gap-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border border-gray-700 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-700"></div>

              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-gray-700 sm:w-40"></div>
                <div className="h-3 w-24 rounded bg-gray-700 sm:w-28"></div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-4 w-full rounded bg-gray-700"></div>
              <div className="h-4 w-5/6 rounded bg-gray-700"></div>
            </div>

            <div className="mt-4 h-52 rounded bg-gray-700 sm:h-72"></div>

            <div className="mt-5 flex items-center justify-between">
              <div className="h-4 w-12 rounded bg-gray-700 sm:w-20"></div>
              <div className="h-4 w-12 rounded bg-gray-700 sm:w-20"></div>
              <div className="h-4 w-12 rounded bg-gray-700 sm:w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;