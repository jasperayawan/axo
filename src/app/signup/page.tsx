"use client";

import { FormEvent, useEffect, useReducer } from "react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialState = {
  username: "",
  email: "",
  password: "",
  isLoading: false,
};

export default function page() {
  const { data, status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if(status === 'authenticated'){
        push('/main')
    }
  },[push, status])

  const reducer = (state: any, action: any) => ({
    ...state,
    ...action,
  });
  const [{ username, email, password, isLoading }, dispatchState] = useReducer(
    reducer,
    initialState
  );

  const registerHandling = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      username,
      email,
      password,
    };

    try {
      dispatchState({ isLoading: true });
      await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      signIn("credentials", { email, password }); //use this if you want to navigate directly to your desire page.
      toast.success("User successfully created!");
    } catch (error) {
      console.error(
        "Error while signing up at handleSignUp SignUp.tsx: ",
        error
      );
      toast.error("Something went wrong while signing up! ");
    } finally {
      dispatchState({ isLoading: false });
    }
  };

  return (
    <main className="flex flex-col gap-y-5 justify-center items-center min-h-screen bg-primary text-secondary font-QuickSand">
      <h1 className="text-[32px] font-semibold">AXO</h1>
      <div className="mx-auto max-w-lg w-full">
        <form
          className="w-full flex flex-col gap-y-2"
          onSubmit={registerHandling}
        >
          <div className="flex w-full flex-col gap-y-2">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => dispatchState({ username: e.target.value })}
              placeholder="Enter your username"
              className="rounded-[12px] px-4 py-2 text-slate-700 outline-none"
            />
          </div>
          <div className="flex w-full flex-col gap-y-2">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => dispatchState({ email: e.target.value })}
              placeholder="Enter your email"
              className="rounded-[12px] px-4 py-2 text-slate-700 outline-none"
            />
          </div>
          <div className="flex w-full flex-col gap-y-2">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => dispatchState({ password: e.target.value })}
              placeholder="Enter your password"
              className="rounded-[12px] px-4 py-2 text-slate-700 outline-none"
            />
          </div>
          <span className="text-end">Already have an account? <Link href='/' className="underline">Log in</Link></span>
          <button
            type="submit"
            className="border-[1px] mt-2 border-slate-600 bg-slate-400/20 rounded-[12px] py-2"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </main>
  );
}
