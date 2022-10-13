import { Spinner } from "../../common/components/Spinner/Spinner";
import { useMe } from "../../common/hooks/useMe.hook";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import { List } from "../../common/components/List/List";
import { Modal } from "../../common/components/Modal/Modal";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_LISTS, GET_WORKSPACES } from "../../graphql/Queries";
import { Button } from "../../common/components/Button/Button";
import { useGetCards } from "../../common/hooks/useGetCards.hook";
import { DragDropContext } from "react-beautiful-dnd";
import { reorderCards } from "../../common/utils/reorder";
import { DELETE_WORKSPACE, UPDATE_CARDS_ORDER } from "../../graphql/Mutations";
import { RiDeleteBin5Line } from "react-icons/ri";

export const DashBoard: React.FC = () => {
    const { userInfo } = useMe();

    const { data: allWorkSpaces } = useQuery(GET_WORKSPACES, {
        variables: {
            userId: userInfo.id,
        },
    });
    const [selectedWorkSpace, setSelectedWorkSpace] = useState(0);
    const { userCards } = useGetCards(selectedWorkSpace);
    const [members, setMembers] = useState();
    const [cards, setCards] = useState<any>([]);
    const [workSpaces, setWorkSpaces] = useState([]);
    const [getLists, { data, error, loading }] = useLazyQuery(GET_LISTS);
    const [userLists, setUserLists] = useState([]);
    const [listModal, setListModal] = useState(false);
    const [workSpaceModal, setWorkSpaceModal] = useState(false);
    const [updateCardsOrder, { data: updatedCardsOrder }] =
        useMutation(UPDATE_CARDS_ORDER);
    const [deleteWorkSpace] = useMutation(DELETE_WORKSPACE, {
        refetchQueries: [
            { query: GET_WORKSPACES, variables: { userId: userInfo.id } },
        ],
    });
    useEffect(() => {
        if (data) {
            setUserLists(data.getLists);
        }
        if (userCards) {
            setCards(userCards);
        }
        if (allWorkSpaces) {
            setWorkSpaces(allWorkSpaces.getAllWorkSpaces);
        }
        if (updatedCardsOrder) {
            setCards(updatedCardsOrder.updateCardsOrder);
        }
    }, [data, userCards, allWorkSpaces, updatedCardsOrder]);
    const openModal = () => {
        setListModal(true);
    };
    const handleDragEnd = async (result: any) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        const newItems = reorderCards(cards, source, destination);
        setCards(newItems);
        const test = newItems.map((item) => {
            return { ...item, __typename: undefined, userId: userInfo.id };
        });
        await updateCardsOrder({
            variables: {
                cards: test,
            },
        });
    };
    let content;
    if (data) {
        content = (
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="dashboard-main">
                    <div className="add-list">
                        <Button title="Add List" OnClick={openModal} type="button" />
                    </div>

                    <div className="lists-container">
                        {userLists.map((list: any) => {
                            return (
                                <List
                                    cards={cards}
                                    setCards={setCards}
                                    listId={list.id}
                                    key={list.id}
                                    title={list.listName}
                                    workSpaceId={selectedWorkSpace}
                                    members={members}
                                />
                            );
                        })}
                    </div>

                    {listModal && (
                        <Modal
                            modalName="newList"
                            cancelHandler={setListModal}
                            addHandler={setUserLists}
                            workSpaceId={selectedWorkSpace}
                        />
                    )}
                </div>
            </DragDropContext>
        );
    }
    if (error) {
        content = <div className="error">{error.message}</div>;
    }
    if (loading) {
        content = <Spinner />;
    }
    const openWorkSpaceModal = () => {
        setWorkSpaceModal(true);
    };
    const getWorkSpaceLists = (workSpace: any) => {
        getLists({
            variables: {
                userId: userInfo.id,
                workSpaceId: workSpace.id,
            },
        });
        setSelectedWorkSpace(workSpace.id);
        setMembers(workSpace.members)
    };
    const handleDelete = async (id: number) => {
        await deleteWorkSpace({
            variables: {
                id,
            },
        });
    };
    return (
        <div className="dashboard-container">
            <div className="dashboard-left-menu">
                {workSpaces.map((workSpace: any) => {
                    return (
                        <div key={workSpace.id} className="workspace">
                            <p

                                onClick={() => getWorkSpaceLists(workSpace)}

                            >{workSpace.name}</p>

                            <RiDeleteBin5Line onClick={() => handleDelete(workSpace.id)} />
                        </div>
                    );
                })}
                <Button
                    title="Add WorkSpace"
                    type="button"
                    OnClick={openWorkSpaceModal}
                />
                {workSpaceModal && (
                    <Modal
                        modalName="workspace"
                        addHandler={setWorkSpaces}
                        cancelHandler={setWorkSpaceModal}
                    />
                )}
            </div>
            {content}
        </div>
    );
};
