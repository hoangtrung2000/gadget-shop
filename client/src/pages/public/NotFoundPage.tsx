import React from "react";
import { NotFoundImg } from "../../assets";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white  ">
      <div className="container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500">
            Sorry, the page you are looking for doesn't exist.Here are some
            helpful links:
          </p>

          <div className="mt-6 flex items-center gap-x-3">
            <button
              onClick={() => navigate(-1)}
              className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go back</span>
            </button>

            <button
              onClick={() => navigate(path.HOME)}
              className="w-1/2 shrink-0 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 sm:w-auto"
            >
              Take me home
            </button>
          </div>
        </div>

        <div className="relative mt-8 w-full lg:mt-0 lg:w-1/2">
          <img
            className=" h-80 w-full rounded-lg object-cover md:h-96 lg:h-[32rem] "
            src={NotFoundImg}
            alt="thumbnail"
          />
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
