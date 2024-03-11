import { useState } from "react";

import Link from "next/link";
import LoadingPage from "../auth/loading_page";
import { FaList, FaHashtag, FaPlus, FaTrash } from "react-icons/fa";

export default function LeftPanel({ section, sections, onCreateNewSection, onDeleteSection }) {
  const [opened, setOpened] = useState(false);

  if (!sections) {
    return <LoadingPage />;
  }

  return (
    <div>
      <button onClick={() => setOpened(!opened)} className="flex sm:hidden p-4 text-xl">
        <FaList />
      </button>

      <div className={`shblock ${!opened ? "hidden" : null} absolute left-0 sm:block w-full sm:relative sm:w-72 p-0 pb-4 rounded-md`}>
        <div className="flex flex-row items-center space-x-4 p-4 text-lg font-bold">
          <FaHashtag />
          <h3>Sections</h3>
        </div>

        <div>
          <ul>
            {sections.map((sect) => (
              <li key={sect.id} className={`mb-1 flex flex-row items-center space-x-2 justify-between hover:bg-zinc-700 ${ section && section.id == sect.id ? "bg-zinc-700":null}`}>
                <Link onClick={() => setOpened(false)} href={`dashboard/?id=${sect.id}`} className="flex flex-row items-center space-x-4 p-4 py-2 w-full">
                  <FaList className="text-zinc-400" />
                  <p>{sect.name}</p>
                </Link>

                <button onClick={() => onDeleteSection(sect.id)} className="pr-4 text-zinc-600 hover:text-red-400">
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
