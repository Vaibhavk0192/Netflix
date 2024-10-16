"use client";
import Input from "@/components/input";
import axios from "axios";
import { useState, useCallback } from "react";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoIosWarning } from "react-icons/io";
import { useSearchParams } from "next/navigation";

const Auth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailPromProps = searchParams.get("email")?.toString();
  const [email, setEmail] = useState(emailPromProps);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const [showError, setShowError] = useState("");

  const { status } = useSession();

  if (status === "authenticated") {
    router.replace("profile");
  }

  const togglevariant = useCallback(() => {
    setVariant((currentvariant) =>
      currentvariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profile",
        redirect: false,
      });
      if (res?.status == 200) {
        router.replace("/profile");
      } else if (res?.status == 401) {
        // console.log(res?.status);
        setShowError("Invalid credentials");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      const res = await axios.post("/api/register", {
        email,
        name,
        password,
      });

      if (res?.status == 200) {
        login();
      } else if (res.status == 422) {
        setShowError("Email Already Registered");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 422) {
        setShowError("Email Already Registered");
      } else {
        setShowError("Something went wrong. Please try again.");
        console.log(err);
      }
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center  lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign In" : "Sign Up"}
            </h2>
            {showError && (
              <div className="h-18 flex mb-4 text-sm bg-[#d89c30] w-full rounded px-4 py-4 items-center gap-4 ">
                <IoIosWarning className="h-7 w-7" />
                <p>
                  <strong>{showError}.</strong> Please try again.
                </p>
              </div>
            )}
            <form className="flex flex-col gap-4" autoComplete="true">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={(email && email) || ""}
              />
              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </form>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "http://localhost:3000/profile",
                  })
                }
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-95 transition-shadow"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() =>
                  signIn("github", {
                    callbackUrl: "http://localhost:3000/profile",
                  })
                }
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-shadow"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-10">
              {variant === "login"
                ? "New to Netflix?"
                : "Already have an Account?"}

              <span
                onClick={togglevariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Sign Up now" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
