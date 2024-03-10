'use client'

import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

import { toast } from 'react-toastify';

import Api from './api'

import LoadingPage from "./loading_page";



function RegisterPage({setLoading, setRegisterPage}) {
  async function RegisterFormAction(formData) {
    let email = formData.get("email");
    let password = formData.get("password");
    let nickname = formData.get("nickname");
    let confirm_pass = formData.get("confirm-password");

    if (password != confirm_pass) {
      toast.error("Password and confirm password not matching");
      return
    }

    setLoading(true);

    Api.register(email, password, nickname).then((response) => {
      setLoading(false);
      window.location.reload();
    }).catch((error) => {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <Link href="/" className="flex text-white font-bold text-2xl items-center mb-6">
        edev
        <p className="text-gray-500 pl-2 font-light">register</p>
      </Link>

      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-zinc-800 dark:border-zinc-700">
        <div className="p-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-zinc-900 md:text-2xl dark:text-white text-center mb-4">
              Create account
          </h1>

          <form className="space-y-4 md:space-y-6" action={RegisterFormAction}>
              <div>
                <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Email</label>
                <input type="email" name="email" id="email" className="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="name@company.com"/>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Nickname</label>
                <input type="nickname" name="nickname" id="nickname" className="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Your best name"/>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" required placeholder="••••••••" className="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Confirm password</label>
                <input type="password" name="confirm-password" id="confirm-password" required placeholder="••••••••" className="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              </div>

              <button type="submit" className="w-full py-3 rounded-xl border border-green-500 bg-green-600 hover:bg-green-500">Register</button>
              
          </form>

          <div className="flex items-center mt-4">
            Have account?
            <button onClick={() => setRegisterPage(false)} className="text-blue-500 ml-2">Log in</button>
          </div>
          
        </div>


      </div>
    </div>
  );
};


function LoginPage({setLoading, setRegisterPage}) {
  async function LoginFormAction(formData) {
    let email = formData.get("email")
    let pass = formData.get("password")

    setLoading(true);

    Api.login(email, pass).then((response) => {
      setLoading(false);
      window.location.reload();
    }).catch((error) => {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    })
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <Link href="/" className="flex text-white font-bold text-2xl items-center mb-6">
        edev
        <p className="text-gray-500 pl-2 font-light">login</p>
      </Link>

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
                <button onClick={() => setRegisterPage(true)} className="text-blue-500 ml-2">Sign up</button>
                </div>
              </div>
          </form>
          
        </div>


      </div>
    </div>
  );
}



export default function AuthPage () {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [registerPage, setRegisterPage] = useState(false)

  if (loading) {
    return <LoadingPage text="Logging in..."/>
  }

  return (
    <section className="bg-zinc-50 dark:bg-zinc-900">
      <button type="button" className="flex absolute items-center self-center ml-4 mt-4 p-2 px-4 mb-10  text-white" onClick={() => router.back()}>
        <IoMdArrowRoundBack/> 
        <p className="ml-4">Back</p>
      </button>


      {registerPage
        ? <RegisterPage setLoading={setLoading} setRegisterPage={setRegisterPage}/>
        : <LoginPage setLoading={setLoading} setRegisterPage={setRegisterPage}/>
      }
    </section>
  )
  
};