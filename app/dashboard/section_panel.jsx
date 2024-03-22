import DelayedInput from "../ui/basic/delayedinput";
import AgreeModal from "../ui/agree_modal";

import { 
    FaList, 
    FaTrash, 
    FaPlus, 
    FaCheckCircle, 
    FaRegCircle, 
    FaChevronDown, 
    FaRegStickyNote,
    FaRegCalendar
} from "react-icons/fa";

import { useState } from "react";

export default function SectionPanel({section, tasks, onNameEdit, onCreateNewTask, onTaskDelete, onTaskEdit}) {

    const [taskname, setTaskname] = useState('');
    const [modal_opened, setModalOpened] = useState(false);
    const [selected, setSelected] = useState({});

    const [delete_pretendent, setDeletePretendent] = useState(null);

    async function onModalAccept() {
        if (delete_pretendent != null) {
            onTaskDelete(delete_pretendent.section_id, delete_pretendent.task_id)
            setDeletePretendent(null);
        }
    }

    async function taskDelete(section_id, task_id) {
        setModalOpened(true);
        setDeletePretendent({
            "section_id": section_id,
            "task_id": task_id
        })
    }

    const taskChange = async (section_id, orig_task, values) => {
        onTaskEdit(section_id, {
            'id':orig_task.id, 
            'name': values.name ? values.name : orig_task.name, 
            'description': values.description ? values.description : orig_task.description, 
            'completed': values.completed != null ? values.completed : orig_task.completed
        });
    };


    const onTaskNameEdit = async ({ value, section_id, task }) => {
        if (!value || value.lenght < 1) { return; }
        taskChange(section_id, task, {"name": value});
    };

    const handleTaskNameInput = async (event) => {
        setTaskname(event.target.value);
    };

    const handleSelect = async (task) => {
        if (selected.id == task.id) {
            setSelected({});
            return;
        }
        setSelected(task);
    }

    const onSubmitNewTask = async (event, section, name) => {
        event.preventDefault();
        onCreateNewTask(section.id, name); 
        setTaskname('');
    }

    if (!section) {
        return (
            <div className="w-full text-center p-4">
                <span className="shblock">
                    Please select any section
                </span>
            </div>
        )
    }

    return (
        <div className="w-full h-full">

            <AgreeModal title="Are you sure?" onAccept={onModalAccept} opened={modal_opened} setOpened={setModalOpened}/>

            <div className="p-2 flex justify-between space-x-4 items-center mb-4 text-2xl">
                <div className="flex items-center w-full space-x-4 text-emerald-400">
                    <FaList/>
                    <DelayedInput
                        value={section.name}
                        section={section}
                        delay={1000}
                        callback={onNameEdit}
                        className="bg-transparent w-full"
                    />
                </div>
            </div>

            <div className="flex flex-col divide-y divide-dashed divide-zinc-700">
                {tasks.map((task) => (
                    <div key={task.id} className={`flex flex-col p-6 px-2 space-y-6 ${task.completed && "text-gray-500"}`}>

                        <div className="flex items-center space-x-4">
                            <button className="hover:text-emerald-500" onClick={() => taskChange(section.id, task, {'completed': !task.completed})}>
                                {task.completed 
                                    ? <FaCheckCircle className="text-2xl"/> 
                                    : <FaRegCircle className="text-2xl"/> 
                                }
                            </button>

                            <DelayedInput
                                value={task.name}
                                task={task}
                                section_id={section.id}
                                delay={400}
                                callback={onTaskNameEdit}
                                className="bg-transparent w-full"
                            />

                            <button onClick={() => taskDelete(section.id, task.id)}>
                                <FaTrash className="flex text-zinc-600 hover:text-red-400 items-center text-lg"/>
                            </button>

                            <button onClick={() => handleSelect(task)}>
                                <FaChevronDown className={`${selected.id == task.id && "rotate-180"} ease-out duration-300`}/>
                            </button>
                        </div>
                        
                        <div className={`text-zinc-400 space-y-2 ${selected.id != task.id && "hidden"}`}>
                            <div className="flex flex-row items-center space-x-2">
                                <FaRegStickyNote/>
                                <DelayedInput
                                    value={task.description}
                                    placeholder="Description"
                                    delay={400}
                                    callback={({value}) => taskChange(section.id, task, {'description': value})}
                                    className="bg-transparent w-full text-white"
                                />
                            </div>


                            <div className="relative">
                                <div className="absolute right-0 bottom-0 flex flex-row justify-end items-center space-x-2">
                                    <FaRegCalendar/>
                                    <span>{task.created_at.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="p-4 px-2 w-full h-full">
                    <div className="flex items-center space-x-4">
                        <button onClick={(e) => onSubmitNewTask(e, section, taskname)} className="hover:text-emerald-400 ease-out duration-300 hover:rotate-90">
                            <FaPlus/>
                        </button>
                        <form className="w-full" onSubmit={(e) => onSubmitNewTask(e, section, taskname)}>
                            <input value={taskname} onChange={handleTaskNameInput} placeholder="Enter task name" className="bg-transparent w-full"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}