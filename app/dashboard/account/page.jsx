'use client'

import Navbar from "../../ui/basic/navbar"
import RequireAuth from "../../auth/require_auth";

import Api from "../../auth/api"
import LoadingPage from "../../auth/loading_page";

import Link from "next/link";
import { useEffect, useState } from "react";

import { FaShield } from "react-icons/fa6";

export default function DefaultPage() {
    const [account, setAccount] = useState(null);

    async function logout() {
        Api.logout().then((response) => {
            window.location.reload()
        });
    };

    async function formSubmit(e) {
        e.preventDefault();
        Api.updateUserProfile(e.target.nickname.value == "" ? account.nickname : e.target.nickname.value);
    }

    const fetchData = () => {
        Api.getUserData().then((response) => {
            setAccount(response.data);
            console.log(response.data);
        }).catch((err) => {
            setAccount({});
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (account == null) {
        return <LoadingPage/>
    }

    return (
        <RequireAuth>
            <Navbar>
                <div className="flex text-white font-bold text-2xl items-center">
                    edev
                    <Link href="/dashboard" className="text-gray-500 pl-2 font-light hover:text-gray-100">{">"} todo</Link>
                    <Link href="/dashboard/account" className="text-gray-500 pl-2 font-light hover:text-gray-100">{">"} account</Link>
                </div>
            </Navbar>

            <form onSubmit={formSubmit} className="container mx-auto p-4 px-2 w-full mt-20 md:px-10">
                <div className="flex justify-between my-4">
                    <div>
                        <h1 className="text-3xl flex items-center space-x-2"><FaShield/><p>Account</p></h1>
                        <h2 className="text-gray-400">{account.nickname}</h2>
                    </div>
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <section className="p-6 rounded-xl bg-zinc-800 shadow-lg">
                        <h3 className="text-2xl pb-2">UID</h3>
                        <p className="text-zinc-400">Your account UID</p>
                        <p>{account.id}</p>
                    </section>

                    <section className="p-6 rounded-xl bg-zinc-800 shadow-lg">
                        <h3 className="text-2xl pb-2">Email</h3>
                        <p className="text-zinc-400">Your email address</p>
                        <p>{account.email}</p>
                    </section>

                    <section className="p-6 rounded-xl bg-zinc-800 shadow-lg">
                        <h3 className="text-2xl pb-2">Nickname</h3>
                        <p className="text-zinc-400">Your account nickname</p>
                        <input 
                            type="text"
                            name="nickname" 
                            defaultValue={account.nickname} 
                            className="bg-zinc-700 text-white rounded-lg p-2 mt-2 w-full"
                        />
                    </section>

                    <section className="p-6 rounded-xl bg-zinc-800 shadow-lg">
                        <h3 className="text-2xl pb-2">Group ID</h3>
                        <p className="text-zinc-400">Your group identifier</p>
                        <p>{account.group_id}</p>
                    </section>
                </div>

                <div className="flex justify-center mt-4 space-x-4">
                    <button className="py-2 px-6 bg-green-600 rounded-xl">Save</button>
                    <button onClick={logout} className="py-2 px-6 bg-zinc-800 rounded-xl">Logout</button>
                </div>
            </form>

                
        </RequireAuth>
    )
}