import Link from "next/link";
import React from "react";

interface AuthFormProps {
  type: "login" | "register";
  action: (formData: FormData) => void;
}

export default function AuthForm({ type, action }: AuthFormProps) {
  return (
    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#3c3b3b] rounded-2xl shadow-xl">
      <div className="flex flex-col justify-center mx-auto items-center gap-3 pb-4">
        <h1 className="text-3xl font-bold my-auto">Cinelog</h1>
      </div>
      <div className="text-md pb-8 mx-auto">
        {type === "login" ? (
          <p>Login to your account on Cinelog.</p>
        ) : (
          <p>Register for your account on Cinelog</p>
        )}
      </div>
      <form
        action={action}
        className="flex flex-col"
        data-bitwarden-watching="1"
      >
        <div className="pb-2">
          <label className="block mb-2 text-sm font-medium" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg
                className="lucide lucide-mail"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="16" rx="2" width="20" x="2" y="4" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <input
              autoComplete="off"
              className="pl-12 mb-2 bg-gray-50 border focus:border-transparent text-black border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
              id="email"
              name="email"
              placeholder="name@company.com"
              type="email"
            />
          </div>
        </div>
        <div className="pb-2">
          <label className="block mb-2 text-sm font-medium" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg
                className="lucide lucide-square-asterisk"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="18" rx="2" width="18" x="3" y="3" />
                <path d="M12 8v8" />
                <path d="m8.5 14 7-4" />
                <path d="m8.5 10 7 4" />
              </svg>
            </span>
            <input
              autoComplete="new-password"
              className="pl-12 mb-2 bg-gray-50 text-black border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
              id="password"
              name="password"
              placeholder="••••••••••"
              type="password"
            />
          </div>
        </div>
        {type === "register" ? (
          <div className="pb-6">
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="password-confirm"
            >
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <svg
                  className="lucide lucide-square-asterisk"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect height="18" rx="2" width="18" x="3" y="3" />
                  <path d="M12 8v8" />
                  <path d="m8.5 14 7-4" />
                  <path d="m8.5 10 7 4" />
                </svg>
              </span>
              <input
                className="pl-12 mb-2 bg-gray-50 text-black border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                id="password-confirm"
                name="passwordConfirm"
                placeholder="••••••••••"
                type="password"
              />
            </div>
          </div>
        ) : <></>}

        <button
          className="w-full bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
          type="submit"
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
        {type === "login" ? (
          <div className="text-lg font-semibold text-center">
            Don&apos;t have an account yet?{" "}
            <Link
              className="font-medium text-[#4F46E5] hover:underline"
              href="/register"
            >
              Sign Up
            </Link>
          </div>
        ): <></>}
      </form>
    </div>
  );
}
