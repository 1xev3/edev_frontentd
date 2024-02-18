'use client'

import Navbar from "../ui/navbar"
import Auth from "../auth/provider"

import RequireAuth from "../auth/require_auth"

import { CiLogout } from "react-icons/ci";

export default function Dashboard() {

    async function logout() {
        Auth.logout().then((response) => {
            window.location.reload()
        });
    };

    return (
        <RequireAuth>
            <Navbar>
                <a href="/" className="flex text-white font-bold text-2xl items-center">
                    edev
                    <p className="text-gray-500 pl-2 font-light">dashboard</p>
                </a>
                <div className="flex space-x-4 items-center">
                    <a href="/account">Account</a>

                    <button className="flex items-center bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 p-2 px-4 rounded-full" onClick={logout}>
                        <CiLogout className="mr-2"/>
                        Logout
                    </button>
                </div>
            </Navbar>
            <div>123</div>
        </RequireAuth>
    );
}