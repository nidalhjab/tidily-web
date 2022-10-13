import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_CARDS } from "../../graphql/Queries";
import { useMe } from "./useMe.hook"



export const useGetCards = (workSpaceId: number) => {
    const { userInfo } = useMe();
    const { data, error, loading } = useQuery(GET_CARDS, {
        variables: {
            userId: userInfo.id,
            workSpaceId
        }
    })
    const [userCards, setUserCards] = useState([]);
    useEffect(() => {
        if (data) {
            setUserCards(data.getCards)
        }
    }, [data])
    return { userCards, setUserCards, error, loading }
}