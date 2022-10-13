import { DraggableLocation } from "react-beautiful-dnd";

export const reorder = (
    list: any[],
    anotherList: any[],
    startIndex: any,
    endIndex: any
) => {
    const orderedList = Array.from(list);
    const unOrderedList = Array.from(anotherList);
    const allLists = [...orderedList, ...unOrderedList];
    const [removed] = allLists.splice(startIndex, 1);
    allLists.splice(endIndex, 0, removed);
    return allLists;
};

export const reorderCards = (
    cards: any,
    source: DraggableLocation,
    destination: DraggableLocation
) => {
    const current = cards.filter(
        (card: any) => card.listId === +source.droppableId
    );
    const anotherLists = cards.filter(
        (card: any) => card.listId !== +source.droppableId
    );
    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(
            current,
            anotherLists,
            source.index,
            destination.index
        );
        return reordered;
    }
    // moving to different list
    const result = move(current, anotherLists, source, destination);
    return result;
};

const move = (
    srcList: any,
    destList: any,
    droppableSource: any,
    droppableDestination: any
) => {
    const sourceClone = Array.from(srcList);
    const destClone = Array.from(destList);
    const [removed]: any = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, {
        ...removed,
        listId: +droppableDestination.droppableId,
    });
    return [...sourceClone, ...destClone];
};
