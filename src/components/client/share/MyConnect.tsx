import { Facebook, PhoneCall } from "lucide-react";
import React from "react";

const MyConnect = () => {
  return (
    <section className="fixed bottom-0 right-0  z-50 shadow-sm py-2 ">
      <div className="flex flex-col gap-2 items-center justify-center ">
        <div className=" p-2 rounded-full bg-gray-100 shadow-md flex gap-4 items-center justify-center">
          <Facebook
            href=""
            className="w-10 h-10 hover:text-red-500 cursor-pointer rounded-full "
          />
        </div>
        <div className=" p-2 rounded-full bg-gray-100 shadow-md flex gap-4 items-center justify-center">
          <Facebook
            href=""
            className="w-10 h-10 hover:text-red-500 cursor-pointer rounded-full "
          />
        </div>
      </div>
    </section>
  );
};

export default MyConnect;
