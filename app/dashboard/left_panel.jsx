import React from "react";
import Link from "next/link";
import LoadingPage from "../auth/loading_page";
import { FaList, FaHashtag, FaPlus, FaTrash } from "react-icons/fa";

export default function LeftPanel({ sections, onCreateNewSection, onDeleteSection }) {
  if (!sections) {
    return <LoadingPage />;
  }

  return (
    <div>
      <button className="flex sm:hidden p-4 text-xl">
        <FaList />
      </button>

      <div className="bg-zinc-800 hidden flex-col h-full w-72 pb-4 rounded-md transition-transform -translate-x-full sm:flex sm:translate-x-0">
        <div className="flex flex-row items-center space-x-4 p-4 text-lg font-bold">
          <FaHashtag />
          <h3>Sections</h3>
        </div>

        <div className="flex-grow">
          <ul>
            {sections.map((section) => (
              <li key={section.id} className="mb-1 flex flex-row items-center space-x-2 justify-between hover:bg-zinc-700">
                <Link href={`dashboard/?id=${section.id}`} className="flex flex-row items-center space-x-4 p-4 py-2 w-full">
                  <FaList className="text-zinc-400" />
                  <p>{section.name}</p>
                </Link>

                <button onClick={() => onDeleteSection(section.id)} className="pr-4 text-zinc-600 hover:text-red-400">
                  <FaTrash />
                </button>
              </li>
            ))}

            <li>
              <button onClick={onCreateNewSection} className="mb-1 p-4 py-2 flex items-center space-x-4 hover:bg-zinc-700 w-full text-emerald-500">
                <FaPlus />
                <span>Create new</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
