import Api from "../auth/api"
import { useEffect, useState } from "react";

import Link from "next/link";
import LoadingPage from "../auth/loading_page";
import { useRouter } from "next/navigation";

import { FaList, FaHashtag, FaPlus, FaTrash } from "react-icons/fa";

export default function LeftPanel() {
    const [sections, setSections] = useState(null);
    const router = useRouter();

    function fetchSections() {
        Api.getSections().then((response) => {
            setSections(response.data);
        });
    }

    async function create_new_section() {
        Api.createNewSection().then(() => {
            fetchSections();
        });
    };

    async function delete_section(id) {
        Api.deleteSection(id).then(() => {
            fetchSections();
        });
    };

    useEffect(() => {
        fetchSections();
    },[]);
    
    if (!sections) {
        return <LoadingPage/>
    }

    // fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0
    return (
        <div>
            <button className="flex sm:hidden p-4 text-xl">
                <FaList/>
            </button>

            <div className="bg-zinc-800 hidden flex-col h-full w-72 pb-4 rounded-md transition-transform -translate-x-full sm:flex sm:translate-x-0">

                <div className="flex flex-row items-center space-x-4 p-4 text-lg font-bold">
                    <FaHashtag/>
                    <h3>Sections</h3>
                </div>

                <div className="flex-grow">
                    <ul>
                        {sections.map((section) => (
                            <li key={section.id} className="mb-1 flex flex-row items-center space-x-2 justify-between hover:bg-zinc-700">
                                <Link href={`dashboard/?id=${section.id}`} className="flex flex-row items-center space-x-4 p-4 py-2 w-full">
                                    <FaList className="text-zinc-400"/>
                                    <p>{section.name}</p>
                                </Link>

                                <button onClick={() => delete_section(section.id)}
                                    className="pr-4 text-zinc-600 hover:text-red-400"
                                >
                                    <FaTrash/>
                                </button>
                            </li>
                        ))}

                        <li>
                            <button onClick={create_new_section}
                                className="mb-1 p-4 py-2 flex items-center space-x-4 hover:bg-zinc-700 w-full text-emerald-500"
                            >
                                <FaPlus/>
                                <span>Create new</span>
                            </button>
                        </li>


                        
                    </ul>
                </div>
            </div>

        </div>
    );
}