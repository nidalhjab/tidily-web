import "./Card.css";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { ASSIGN_MEMBER, DELETE_CARD } from "../../../graphql/Mutations";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { GET_CARDS } from "../../../graphql/Queries";
interface CardProps {
    userId?: number;
    members: any;
    workSpaceId: number;
    deleteAction: any;
    listId: number;
    setCards: (cards: any) => void;
    cardInfo: {
        id: number;
        title: string;
        description: string;
        comment: string;
        memberName: [string] | null;
    };
}
export const Card: React.FC<CardProps> = ({
    cardInfo,
    setCards,
    deleteAction,
    workSpaceId,
    userId,
    listId,
    members,
}: CardProps) => {
    const [deleteCard] = useMutation(DELETE_CARD, {
        refetchQueries: [{ query: GET_CARDS, variables: { userId, workSpaceId } }],
    });
    const [selectedMembers, setSelectedMembers] = useState<any>(
        cardInfo.memberName ? cardInfo.memberName : []
    );
    const [openMenu, setOpenMenu] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [addMember] = useMutation(ASSIGN_MEMBER, {
        refetchQueries: [{ query: GET_CARDS, variables: { userId, workSpaceId } }],
    });
    const handleDelete = async (id: number) => {
        await deleteCard({
            variables: {
                userId,
                cardId: id,
            },
        });
    };

    const assignMember = async (member: string) => {
        await addMember({
            variables: {
                userId,
                listId,
                workSpaceId,
                memberName: member,
            },
        });
        setSelectedMembers((oldVal: string[]) => [...oldVal, member]);
        setOpenMenu(false);
    };
    return (
        <div className="card-content">
            <div className="card-info">
                <p> Title: {cardInfo.title}</p>
                <p> Description: {cardInfo.description}</p>
                {cardInfo.comment && <p>Comment: {cardInfo.comment}</p>}
            </div>
            <div className="card-action">
                <GrEdit onClick={() => setOpenEdit(true)} />
                <RiDeleteBin5Line onClick={() => handleDelete(cardInfo.id)} />
                {selectedMembers.length !== members.length && (
                    <MdOutlineAssignmentInd onClick={() => setOpenMenu(!openMenu)} />
                )}
            </div>

            {openMenu && (
                <div className="members-menu">
                    {members.map((member: any) => {
                        if (selectedMembers.indexOf(member) === -1) {
                            return <p onClick={() => assignMember(member)}>{member}</p>;
                        }
                    })}
                </div>
            )}
            {cardInfo.memberName && (
                <div className="members">
                    {cardInfo.memberName.map((member) => (
                        <p>{member}</p>
                    ))}
                </div>
            )}
            {openEdit && (
                <Modal
                    listId={listId}
                    modalName="edit-card"
                    workSpaceId={workSpaceId}
                    cardInfo={cardInfo}
                    addHandler={setCards}
                    cancelHandler={setOpenEdit}
                />
            )}
        </div>
    );
};
