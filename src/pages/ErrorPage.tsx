import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen light:bg-gray-100">
      <div className="max-w-md mx-auto p-6 light:bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex flex-col items-center">
          <svg
            className="w-16 h-16 text-red-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-3xl font-bold light:text-gray-800 mb-4 text-center">Oops! Something went wrong.</h1>
          <p className="light:text-gray-600 text-center mb-8">
            We're sorry, but an error occurred while processing your request. Please try again
            later.
          </p>
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
