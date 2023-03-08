import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RelationCardLoading() {
  return (
    <div
      className="flex items-center ml-5 phone:mr-0 phone:ml-0 superWideDesktop:mr-[15%]"
      data-test-id="link-div"
    >
      <div className="text-left bg-white border-transparent mb-3 p-3 pl-10 flex items-center w-full phone:ml-0 phone:pr-0 superWideDesktop:ml-[15%]">
        <div className="pr-24 phone:mr-10">
          <p>
            <Skeleton height={50} width={200} className="m-[20px] " />
          </p>
          <p>
            <Skeleton count={3} className="ml-[20px] mr-[15px]" width={550} />
          </p>
        </div>
      </div>
      <div className="mr-5 -ml-12 mb-[0.8%] phone:-ml-32 phone:mr-8 " data-test-id="img container">
        <div className="w-24 h-24">
          <Skeleton circle className="rounded-full object-cover h-full w-full" />
        </div>
      </div>
    </div>
  );
}
