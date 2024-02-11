'use client'

import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { useState } from "react";

import Auth from '../auth.js'

const Login = () => {
  const router = useRouter()

  // if (Auth.getUserData()) {
  //   router.push("/dashboard")
  // }

  async function LoginFormAction(formData) {
    let email = formData.get("email")
    let pass = formData.get("password")

    if (await Auth.login(email, pass)) {
      router.push("/dashboard")
    } else {
      //TODO
    }
  }

  return (
    <section className="bg-zinc-50 dark:bg-zinc-900">

      <button type="button" className="flex absolute items-center self-center ml-4 mt-4 p-2 px-4 mb-10  text-white" onClick={() => router.back()}>
        <IoMdArrowRoundBack/> 
        <p className="ml-4">Back</p>
      </button>


      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
        <h1 className="mb-10 font-bold text-3xl">edev</h1>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-zinc-800 dark:border-zinc-700">
          <div className="p-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-zinc-900 md:text-2xl dark:text-white text-center mb-4">
              Sign in to your account
            </h1>

            <form className="space-y-4 md:space-y-6" action={LoginFormAction}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                </div>

                <button type="submit" className="w-full py-3 rounded-xl border border-green-500 bg-green-600 hover:bg-green-500">Log-in</button>

                <div className="flex items-center justify-between">
                  <div>
                  Don’t have an account yet?
                  <a href="/register" className="text-blue-500"> Sign up</a>
                  </div>
                </div>
            </form>
            
          </div>


        </div>
      </div>
    </section>
  );
};
  
export default Login;