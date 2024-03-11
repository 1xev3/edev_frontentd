'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../ui/navbar";
import RequireAuth from "../auth/require_auth";
import { FaUser } from "react-icons/fa";
import LeftPanel from "./left_panel";
import DelayedInput from "../ui/delayedinput";
import Api from "../auth/api";

import { useSearchParams } from "next/navigation";

import Link from "next/link";

export default function Dashboard() {
    const router = useRouter();
    const params = useSearchParams();
    const [section, setSection] = useState(null);
    const [sections, setSections] = useState(null);

    useEffect(() => {
        const id = params.get("id");

        if (id) {
        Api.getSection(id)
            .then((response) => {
                setSection(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [params]);

    useEffect(() => {
        fetchSections();
    }, [])

    const onCreateNewSection = async () => {
        await Api.createNewSection();
        fetchSections();
    };

    const onDeleteSection = async (id) => {
        await Api.deleteSection(id).then((response) => {
            if (id == section.id) {
                router.push("")
            }
            fetchSections();
        });

    };

    const onEndEdit = async ({ value, section }) => {
        await Api.updateSection(section.id, value).then((response) => {
            setSection({ ...section, name: response.data.name });
            fetchSections();
        });
    };

    const fetchSections = async () => {
        const response = await Api.getSections();
        setSections(response.data);
    };

    return (
        <RequireAuth>
        <Navbar>
            <div className="flex text-white font-bold text-2xl items-center">
            edev
            <Link href="dashboard" className="text-gray-500 pl-2 font-light hover:text-gray-100">{">"} todo</Link>
            </div>
            <div className="flex space-x-4 items-center">
            <Link href="dashboard/account" className="flex items-center space-x-2 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 p-2 px-4 rounded-full">
                <FaUser />
                <span>My account</span>
            </Link>
            </div>
        </Navbar>

        <div className="flex flex-col sm:flex-row justify-between container mx-auto space-x-0 sm:space-x-4 p-4 px-2 w-full md:px-10 mt-20">
            <LeftPanel sections={sections} onCreateNewSection={onCreateNewSection} onDeleteSection={onDeleteSection} />

            {section ? (
            <div className="bg-zinc-800 w-full h-full p-4 rounded-md">
                <DelayedInput
                value={section.name}
                section={section}
                delay={1000}
                callback={onEndEdit}
                className="w-full bg-transparent focus:bg-zinc-700 rounded-lg focus:border-primary-600 p-2.5"
                />
            </div>
            ) : (
            <div>Select any section</div>
            )}
        </div>
        </RequireAuth>
    );
}
