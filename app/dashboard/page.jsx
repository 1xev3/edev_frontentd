'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Link from "next/link";
import Navbar from "../ui/basic/navbar";
import RequireAuth from "../auth/require_auth";
import LeftPanel from "./left_panel";
import SectionPanel from "./section_panel";
import Api from "../auth/api";

import { FaUser, FaBars } from "react-icons/fa";


export default function Dashboard() {
    const params = useSearchParams();

    const [left_opened, setLeftOpened] = useState(false);
    const [section, setSection] = useState(null);
    const [sections, setSections] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const id = params.get("id");

        if (id) {
        Api.getSection(id)
            .then((response) => {
                setSection(response.data);
                fetchTasks(id);
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

    const onCreateNewTask = async (section_id, task_name) => {
        await Api.createNewTask(section_id, task_name);
        fetchTasks(section_id);
    }

    const onDeleteSection = async (id) => {
        await Api.deleteSection(id).then((response) => {
            setSection(null);
            fetchSections();
        });

    };

    const onSectionNameEdit = async ({ value, section }) => {
        if (!value || value.lenght < 1) { 
            return;
        }

        await Api.updateSection(section.id, value).then((response) => {
            setSection({ ...section, name: response.data.name });
            fetchSections();
        });
    };

    const onTaskDelete = async (section_id, task_id) => {
        await Api.deleteTask(section_id, task_id).then((response) => {
            fetchTasks(section_id);
        });
    }

    const onTaskEdit = async (section_id, task) => {
        const data = {
            'id':task.id,
            'name':task.name,
            'description':task.description,
            'completed':task.completed,
        }

        await Api.updateTask(section_id, data.id, data.name, data.description, data.completed).then((response) => {
            // console.log(response.data)
            fetchTasks(section_id);
        });
    };

    const fetchTasks = async (section_id) => {
        Api.getTasks(section_id).then((response) => {

            let dat = response.data.map(task => ({
                ...task,
                created_at: new Date(task.created_at)
            }));

            dat.sort((a,b) => (a.id - b.id));

            setTasks(dat);
        }).catch((err) => {console.log(err)});
    };

    const fetchSections = async () => {
        Api.getSections().then((response) => {
            let dat = response.data;
            dat.sort((a,b) => (a.id - b.id));
            setSections(response.data);
        }).catch((err) => {console.log(err)});
    };

    return (
        <RequireAuth>
            <Navbar>
                <div className="flex text-white font-bold text-2xl items-center">
                    <button onClick={() => setLeftOpened(!left_opened)} className="flex sm:hidden p-4 text-xl">
                        <FaBars/>
                    </button>
                    edev
                    <Link href="dashboard" className="text-gray-500 pl-2 font-light hover:text-gray-100">{">"} todo</Link>
                    </div>
                    <div className="flex space-x-4 items-center">
                    <Link href="dashboard/account" className="shblock flex items-center space-x-2 border border-zinc-700 hover:bg-zinc-700 p-2 px-4 rounded-full">
                        <FaUser />
                        <span className="hidden sm:block">My account</span>
                    </Link>
                </div>
            </Navbar>

            <div className="flex flex-col sm:flex-row justify-between container mx-auto space-x-0 sm:space-x-4 p-4 px-2 w-full md:px-10 mt-5 sm:mt-20">
                <LeftPanel 
                    section={section} 
                    sections={sections} 
                    onCreateNewSection={onCreateNewSection} 
                    onDeleteSection={onDeleteSection}
                    opened={left_opened}
                    setOpened={setLeftOpened}
                />
                <SectionPanel 
                    section={section} 
                    tasks={tasks} 
                    onNameEdit={onSectionNameEdit} 
                    onCreateNewTask={onCreateNewTask}
                    onTaskDelete={onTaskDelete}
                    onTaskEdit={onTaskEdit}
                />
            </div>

        </RequireAuth>
    );
}
