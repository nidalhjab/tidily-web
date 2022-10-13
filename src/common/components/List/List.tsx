import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { GET_LISTS } from "../../../graphql/Queries";
import { useMe } from "../../hooks/useMe.hook";
import { Card } from "../Card/Card";
import { Spinner } from "../Spinner/Spinner";
import "./List.css";
import { DELETE_LIST } from "../../../graphql/Mutations";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { useGetCards } from "../../hooks/useGetCards.hook";

interface ListProps {
    title: string;
    listId: number;
    cards: any;
    setCards: any;
    workSpaceId: number;
    members: any;
}

export const List: React.FC<ListProps> = ({
    title,
    listId,
    cards,
    setCards,
    workSpaceId,
    members,
}: ListProps) => {
    const { userInfo } = useMe();
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [deleteList] = useMutation(DELETE_LIST, {
        refetchQueries: [
            { query: GET_LISTS, variables: { userId: userInfo.id, workSpaceId } },
        ],
    });

    const addCard = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const handleEdit = () => {
        setEditModal(true);
    };
    const handleDelete = async () => {
        await deleteList({
            variables: {
                listId,
            },
        });
    };
    let content: any;
    if (cards) {
        content = (
            <div className="cards-container">
                {cards.map((card: any, index: number) => {
                    if (card.listId === listId && card.workSpaceId === workSpaceId) {
                        return (
                            <Draggable key={card.id} index={index} draggableId={`${card.id}`}>
                                {(provided) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        <Card
                                            members={members}
                                            listId={listId}
                                            userId={userInfo.id}
                                            setCards={setCards}
                                            deleteAction={setCards}
                                            key={card.id}
                                            cardInfo={card}
                                            workSpaceId={workSpaceId}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        );
                    }
                })}
            </div>
        );
    }

    return (
        <Droppable droppableId={`${listId}`}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="list-container"
                >
                    <div className="header">
                        <div className="title">{title}</div>
                        <div className="icon">
                            <GrEdit onClick={handleEdit} />
                            <RiDeleteBin5Line onClick={handleDelete} />
                        </div>
                    </div>
                    <div className="list-content">
                        <div className="add-button">
                            <Button type="button" title="Add Card" OnClick={addCard} />
                        </div>
                        {showModal && (
                            <Modal
                                listId={listId}
                                modalName="add-card"
                                addHandler={setCards}
                                cancelHandler={closeModal}
                                workSpaceId={workSpaceId}
                            />
                        )}
                        {editModal && (
                            <Modal
                                workSpaceId={workSpaceId}
                                modalName="edit-list"
                                addHandler={{ title, listId }}
                                cancelHandler={setEditModal}
                            />
                        )}
                        <div className="list-cards"></div>
                        {content}
                    </div>
                </div>
            )}
        </Droppable>
    );
};
