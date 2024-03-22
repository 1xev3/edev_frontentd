import Modal from './basic/modal'

export default function AgreeModal({title, opened, setOpened, onAccept, onDeny}) {
    async function onDenyInternal() {
        onDeny && onDeny();
        setOpened(false);
    }

    async function onAcceptInternal() {
        onAccept && onAccept();
        setOpened(false);
    }
    
    return (
        <Modal opened={opened} setOpened={setOpened}>
            <div className="shblock">
                <h2 className="text-center">{title}</h2>

                <div className="flex justify-center space-x-4 mt-4">
                    <button onClick={onDenyInternal} className="rounded-lg bg-red-500 p-2 px-4">No</button>
                    <button onClick={onAcceptInternal} className="rounded-lg bg-emerald-500 p-2 px-4">Yes</button>
                </div>
            </div>
        </Modal>
    )
}