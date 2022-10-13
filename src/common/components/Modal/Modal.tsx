import { CardModal } from "./CardModal/CardModal";
import { EditCard } from "./EditCardModal/EditCard";
import { EditModal } from "./EditModal/EditModal";
import { ListModal } from "./ListModal/ListModal";
import './Modal.css'
import { WorkSpaceModal } from "./WorkSpaceModal/WorkSpaceModal";

interface ModalProps {
    modalName: string
    cancelHandler: any
    addHandler: any,
    listId?: number
    workSpaceId?: number
    cardInfo?: any
}
export const Modal: React.FC<ModalProps> = ({ modalName, cancelHandler, addHandler, listId, workSpaceId, cardInfo }: ModalProps) => {
    let content;
    if (modalName === 'newList') {
        content = <ListModal workSpaceId={workSpaceId} title="Add List Name" closeModal={cancelHandler} addList={addHandler} />
    }
    if (modalName === 'add-card') {
        content = <CardModal workSpaceId={workSpaceId} listId={listId} handleAdd={addHandler} handleCancel={cancelHandler} />
    }
    if (modalName === 'edit-list') {
        content = <EditModal workSpaceId={workSpaceId} editHandler={addHandler} cancelHandler={cancelHandler} />
    }
    if (modalName === 'workspace') {
        content = <WorkSpaceModal title="Add WorkSpace Name" addHandler={addHandler} cancelHandler={cancelHandler} />
    }
    if (modalName === 'edit-card') {
        content = <EditCard workSpaceId={workSpaceId} listId={listId} cardInfo={cardInfo} editHandler={addHandler} cancelHanlder={cancelHandler} />
    }
    return (
        <div className="modal-container">
            <div className="modal-content">
                {content}
            </div>
        </div>
    )
}