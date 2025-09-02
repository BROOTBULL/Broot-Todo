"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function SignUpPage() {
  const [registering, setRegistering] = useState(false);
  const route = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [strength, setStrength] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  function calculateStrength(password: string): number {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "password") {
      setStrength(calculateStrength(value));
    }
  };

  function displayError(error: string) {
    setError(error);

    // Auto-clear error after 3 seconds (3000 ms)
    setTimeout(() => {
      setError(null);
    }, 3000);
    setRegistering(false);
    return;
  }

  async function handleSubmit(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setRegistering(true);
    const emailError = validateEmail(formData.email);
    if (emailError) {
      displayError(emailError);
    }

    try {
      const UserInput = await axios.post("/api/auth/signup", formData);

      console.log("SignUp response:", UserInput);

      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.ok) {
        route.push("/home"); // redirect to Home
      } else {
        alert("Login failed after signup");
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      displayError("Username or Email Already exists..!!");
    }
    setRegistering(false);
  }

  async function handleGuest(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    try {
      const randomId = uuidv4().slice(0, 8);
      const UserInput = await axios.post("/api/auth/signup", {
        username: "Guest-" + randomId,
        email: "guest-" + randomId + "@gmail.com",
        password: randomId,
      });

      console.log("SignUp response:", UserInput);

      const result = await signIn("credentials", {
        redirect: false,
        email: "guest-" + randomId + "@gmail.com",
        password: randomId,
      });

      if (result?.ok) {
        route.push("/home"); // redirect to Home
      } else {
        alert("Login failed after signup");
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      displayError("Username or Email Already exists..!!");
    }
  }

  function validateEmail(email: string): string | null {
    if (!email.trim()) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";

    return null; // No error
  }

  function handlePasswordType(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setPasswordType(passwordType === "password" ? "text" : "password");
  }

  return (
    <>
      <div className="absolute flex flex-row h-full w-full background bg-cover bg-no-repeat bg-center bg-linear-to-bl from-black via-slate-900 to-black ">
        <div className="flex flex-col justify-center items-center bg-gradient-to-r h-full w-full md:w-[60%] lg:w-[50%] z-3">
          {error && (
            <div className="bg-red-400 h-10 w-[60%] rounded-lg absolute top-0 mt-5 text-center p-2 text-white ">
              {error}
            </div>
          )}
          <Image
            className="lg:h-20 lg:w-13 md:h-18 md:w-12 h-14 w-10 mx-4"
            src={`/media/BrootW.png`}
            height={60}
            width={60}
            alt=""
          />
          <div className="text-2xl flex md:text-3xl items-end lg:text-4xl font-bold text-white text-shadow-lg/80">
            SignUp
          </div>
          <div className="w-[80%] h-fit flex m-3 text-center justify-center items-center">
            <form className="flex flex-col w-[90%]" action="">
              <div className="text-base mb-5 items-end text-indigo-200 drop-shadow-lg">
                Enter your email and a password
              </div>
              <div className=" pl-2 rounded-t-lg border-2 border-b-0 border-indigo-400/20">
                <input
                  className="ph emailInput w-full h-10 text-sm lg:h-14 lg:text-[18px] p-2 focus:outline-none"
                  placeholder="Email"
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className=" pl-2 border-2 border-y-0 border-indigo-400/20">
                <input
                  className="ph UserInput w-full h-10 text-sm lg:h-14 lg:text-[18px] p-2 focus:outline-none"
                  placeholder="Name"
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className=" pl-2 rounded-b-lg flex flex-row border-2 border-t-0 border-indigo-400/20">
                <input
                  className="ph passInput w-[90%] h-10 text-sm lg:h-14 lg:text-[18px] p-2 focus:outline-none"
                  placeholder="Password"
                  type={passwordType}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleChange(e)}
                  autoComplete="off"
                />
                <button className="cursor-pointer" onClick={handlePasswordType}>
                  <Image
                    className="size-6 mx-4 invert"
                    src={`/media/${
                      passwordType === "password" ? "eyeClosed" : "eye"
                    }.png`}
                    height={60}
                    width={60}
                    alt=""
                  />
                </button>
              </div>
              <div className="h-2 mt-1 w-full rounded px-1">
                <div
                  className={`h-full rounded transition-all duration-300 ${
                    strength === 1
                      ? "bg-red-500 w-1/4"
                      : strength === 2
                      ? "bg-yellow-500 w-1/2"
                      : strength === 3
                      ? "bg-blue-500 w-3/4"
                      : strength === 4
                      ? "bg-green-500 w-full"
                      : "w-0"
                  }`}
                ></div>
              </div>
              <div className="text-xs text-zinc-700">
                {strength === 0 && ""}
                {strength === 1 && "Weak"}
                {strength === 2 && "Medium"}
                {strength === 3 && "Strong"}
                {strength === 4 && "Very Strong"}
              </div>

              <button
                onClick={(e) => handleSubmit(e)}
                className="text-center bg-linear-to-br from-slate-900 to-indigo-950 md:px-15 lg:px-20 h-fit items-center px-10 py-2 my-2 rounded-lg shadow-lg/30 text-zinc-100 font-serif cursor-pointer hover:to-slate-800 duration-200 hover:from-indigo-900 "
              >
                {!registering ? (
                  <div className="text-sm md:text-md lg:text-lg ">Submit</div>
                ) : (
                  <div className="flex flex-row justify-center text-sm md:text-md lg:text-lg">
                    Signing Up...
                  </div>
                )}
              </button>
            </form>
          </div>
          <div className=" items-end text-sm text-indigo-200 drop-shadow-lg">
            Play as guest OR signup with Google
          </div>
          <div className="flex flex-row w-[80%] lg:w-[68%]">
            <button
              onClick={(e) => handleGuest(e)}
              className="flex text-[15px] rounded-lg md:text-[18px] w-full lg:text-lg md:px-5 lg:px-10 h-fit justify-center items-center  bg-indigo-400/50 px-10 py-2 m-3 shadow-lg/30 text-zinc-100 font-serif cursor-pointer hover:bg-indigo-300/50 "
            >
              <div> Guest</div>
            </button>
            <button
              onClick={() => signIn("google", { callbackUrl: "/home" })}
              className="flex text-[15px] rounded-lg md:text-[18px] w-full lg:text-lg md:px-5 lg:px-10 h-fit justify-center items-center  bg-indigo-400/50 px-10 py-2 m-3 shadow-lg/30 text-zinc-100 font-serif cursor-pointer hover:bg-indigo-300/50 "
            >
              <Image
                className="size-4 mx-0.5"
                src={`/media/google.png`}
                height={60}
                width={60}
                alt=""
              />
              <div>Google</div>
            </button>
          </div>
          <div className="text-[12px] font-serif text-indigo-200">
            If already signed In ....Try{" "}
            <button
              onClick={() => route.push("/login")}
              className="text-blue-400 cursor-pointer"
            >
              LogIn
            </button>
          </div>
        </div>
        <div className="bg-[url(/media/hero/floatbox2.png)] hidden md:flex absolute right-0 w-[65%] md:w-[55%] lg:w-[62%] opacity-35 z-1 h-full bg-left bg-cover bg-no-repeat"></div>
      </div>
    </>
  );
}
