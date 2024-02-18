'use client'

import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter()

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
                Create account
            </h1>

            <form className="space-y-4 md:space-y-6" action="#">
                <div>
                    <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="email" className="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Confirm password</label>
                    <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                </div>

                <button type="submit" className="w-full py-3 rounded-xl border border-green-500 bg-green-600 hover:bg-green-500">Register</button>
            </form>
            
          </div>


        </div>
      </div>
    </section>
  );
};