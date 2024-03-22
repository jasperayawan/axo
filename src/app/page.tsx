"use client";

import Nav from "@/components/Nav";
import { FormEvent, useEffect, useReducer } from "react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialState = {
  email: "",
  password: "",
  isLoading: false,
};

export default function Home() {
  const { data, status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      push("/main");
    }
  }, [push, status]);

  const reducer = (state: any, action: any) => ({
    ...state,
    ...action,
  });
  const [{ email, password, isLoading }, dispatchState] = useReducer(
    reducer,
    initialState
  );


  const loginHandling = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchState({ isLoading: true });

    const formData = {
      email,
      password,
    };

    try {
      dispatchState({ isLoading: true });

      const callback = await signIn("credentials", {
        ...formData,
        redirect: false,
      });

      if (callback?.error) {
        toast.error("Invalid credentials");
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Logged in!");
        push("/main");
      }
    } catch (error) {
      console.error("Error while signing in:", error);
      toast.error("An error occurred while signing in");
    } finally {
      dispatchState({ isLoading: false });
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      push("/main");
    }
  }, [push, status]);

  return (
    status === "unauthenticated" && (
      <>
        <main className="flex flex-col gap-y-5 justify-center items-center min-h-screen bg-primary text-secondary font-QuickSand">
          <h1 className="text-[32px] font-semibold">AXO</h1>
          <div className="mx-auto max-w-lg w-full">
            <form
              className="w-full flex flex-col gap-y-2"
              onSubmit={loginHandling}
            >
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
              <span className="text-end">Don't have an account? <Link href='/signup' className="underline">Sign up</Link></span>
              <button
                type="submit"
                className="border-[1px] mt-2 border-slate-600 bg-slate-400/20 rounded-[12px] py-2"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </main>
      </>
    )
  );
}
