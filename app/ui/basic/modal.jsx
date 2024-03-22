

export default function Modal({opened, setOpened, children}) {
    async function bg_click(e) {
        if (e.target.ariaModal && opened) {
          setOpened(!opened);
        }
    }

    return (
        opened && <div onClick={bg_click} aria-modal="true" className={`${!opened ? "hidden sm:block sm:relative" : "bg-zinc-900/90 fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden flex items-center"}`}>
            <div onClick={bg_click} aria-modal="true" className={"flex justify-center items-center w-full sm:relative p-0 pb-4 rounded-md"}>
                {children}
            </div>
        </div>
    )
}