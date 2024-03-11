import DelayedInput from "../ui/delayedinput";
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
    const [selected, setSelected] = useState({});

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

            <div className="shblock flex justify-between space-x-4 items-center mb-4 text-2xl">
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

            <div className="flex flex-col space-y-4">
                {tasks.map((task) => (
                    <div key={task.id} className="shblock flex flex-col space-y-6">

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

                            <button onClick={() => onTaskDelete(section.id, task.id)}>
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

                <div className="shblock w-full h-full">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => {onCreateNewTask(section.id, taskname); setTaskname('');}} className="hover:text-emerald-400 ease-out duration-300 hover:rotate-90">
                            <FaPlus/>
                        </button>
                        <input value={taskname} onChange={handleTaskNameInput} placeholder="Enter task name" className="bg-transparent w-full"/>
                    </div>
                </div>
            </div>
        </div>
    )
}