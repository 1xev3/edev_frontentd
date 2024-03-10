'use client'

import Navbar from "../ui/navbar";
import Api from "../auth/api";
import RequireAuth from "../auth/require_auth";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import LeftPanel from "./left_panel";
import LoadingPage from "../auth/loading_page";

import { FaUser } from "react-icons/fa";

export default function Dashboard() {

    const section_ref = useRef({});
    const [section, setSection] = useState(null);
    const [tasks, setTasks] = useState(null);

    const searchParams = useSearchParams();

    // useEffect(() => {
    //     const id = searchParams.get('id');
        
    //     Api.getSection(id).then((response) => {
    //         setSection(response.data);
    //     });

    // }, []);

    async function onNameChange(e, sect) {
        e.preventDefault();
        console.log(sect);

        //TODO: handle update 
    };

    useEffect(() => {
        const id = searchParams.get('id');
        
        Api.getSection(id).then((response) => {
            setSection(response.data);
            section_ref.current.value = response.data.name;
        }).catch((err) => {
            //nothing to do with that ))
        });

    }, [searchParams]);

    return (
        <RequireAuth>
            <Navbar>
                <div className="flex text-white font-bold text-2xl items-center">
                    edev
                    <Link href="dashboard" className="text-gray-500 pl-2 font-light hover:text-gray-100">{">"} todo</Link>
                </div>
                <div className="flex space-x-4 items-center">
                    <Link href="dashboard/account" className="flex items-center space-x-2 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 p-2 px-4 rounded-full">
                        <FaUser/>
                        <span>My account</span>
                    </Link>
                </div>
            </Navbar>

            <div className="flex flex-col sm:flex-row justify-between container mx-auto space-x-0 sm:space-x-4 p-4 px-2 w-full md:px-10 mt-20">

                <LeftPanel/>


                {section ?
                    <div className="bg-zinc-800 w-full h-full p-4 rounded-md">
                        <form onSubmit={(e) => onNameChange(e, section)}>
                            <input
                            ref={section_ref}
                            className="w-full bg-transparent focus:bg-zinc-700 rounded-lg focus:border-primary-600 p-2.5"
                            />
                        </form>
                    </div>
                : <div>Select any section</div>}
                



            </div>

        </RequireAuth>
    );
}