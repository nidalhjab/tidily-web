import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
    query {
        whoAmI {
            id
            name
            email
            phone
            img_file
        }
    }
`

export const GET_LISTS = gql`
    query getAllLists($userId:Int!,$workSpaceId:Int!) {
        getLists(GetUserLists:{userId:$userId,workSpaceId:$workSpaceId}) {
            id
            listName
            userId
           
        }
    }
`

export const GET_CARDS = gql`
    query getAllCards($userId:Int!,$workSpaceId:Int!) {
        getCards(GetUserCards:{userId:$userId,workSpaceId:$workSpaceId}){
            id
            listId
            title
            description
            comment
            workSpaceId
            memberName
        }
    }
`

export const GET_WORKSPACES = gql`
query getAllWorkSpaces($userId:Int!){
    getAllWorkSpaces(GetUserWorkSpaces:{userId:$userId}){
        id 
        name
        members
    }
}
`
