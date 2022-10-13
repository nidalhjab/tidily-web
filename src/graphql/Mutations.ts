import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation SignUp(
    $name: String!
    $email: String!
    $phone: String!
    $password: String!
  ) {
    SignUp(
      createUserData: {
        name: $name
        email: $email
        phone: $phone
        password: $password
      }
    ) {
      email
      phone
      name
    }
  }
`;

export const LOAD_USER = gql`
  mutation SignIn($email: String!, $password: String!) {
    SignIn(loginArgs: { email: $email, password: $password }) {
      name
      email
      phone
      token
    }
  }
`;

export const UPLOAD_PHOTO = gql`
  mutation uploadImg($id: Int!, $img_file: String!) {
    uploadImg(imgInfo: { id: $id, img_file: $img_file }) {
      id
      img_file
    }
  }
`;
export const ADD_LIST = gql`
  mutation addNewList($userId: Int!, $listName: String!, $workSpaceId: Int!) {
    addNewList(
      listInfo: {
        userId: $userId
        listName: $listName
        workSpaceId: $workSpaceId
      }
    ) {
      id
      listName
      userId
    }
  }
`;
export const EDIT_LIST = gql`
  mutation editList(
    $userId: Int!
    $listName: String!
    $listId: Int!
    $workSpaceId: Int!
  ) {
    editList(
      listInfo: {
        userId: $userId
        listName: $listName
        listId: $listId
        workSpaceId: $workSpaceId
      }
    ) {
      id
      listName
    }
  }
`;
export const DELETE_LIST = gql`
  mutation deleteList($listId: Int!) {
    deleteList(listInfo: { id: $listId }) {
      id
    }
  }
`;
export const ADD_CARD = gql`
  mutation addNewCard(
    $userId: Int!
    $listId: Int!
    $title: String!
    $description: String!
    $comment: String
    $workSpaceId:Int!
    $memberName:[String!]! 
  ) {
    addCard(
      cardInfo: {
        userId: $userId
        listId: $listId
        title: $title
        description: $description
        comment: $comment
        workSpaceId:$workSpaceId
        memberName:$memberName
      }
    ) {
      id
      listId
      title
      description
      comment
      workSpaceId
    }
  }
`;
export const DELETE_CARD = gql`
  mutation deleteCard($userId: Int!, $cardId: Int!) {
    deleteCard(cardInfo: { userId: $userId, cardId: $cardId }) {
      id
      listId
      title
      description
      comment
    }
  }
`;
export const UPDATE_CARD = gql`
  mutation updateCard(
    $userId: Int!
    $listId: Int!
    $title: String!
    $description: String!
    $comment: String
    $workSpaceId:int!
  ) {
    updateCard(
      cardInfo: {
        userId: $userId
        listId: $listId
        title: $title
        description: $description
        comment: $comment
        workSpaceId:$workSpaceId
      }
    ) {
      id
      listId
      title
      description
      comment
      workSpaceId
    }
  }
`;
export const ADD_WORKSPACE = gql`
  mutation addNewWorkSpace(
    $name: String!
    $members: [String!]!
    $userId: Int!
  ) {
    addNewWorkSpace(
      workSpace: { name: $name, members: $members, userId: $userId }
    ) {
      id
      name
    }
  }
`;

export const DELETE_WORKSPACE = gql`
  mutation deleteWorkSpace($id: Int!) {
    deleteWorkSpace(id: $id) {
      id
    }
  }
`;

export const UPDATE_CARDS_ORDER = gql`
  mutation updateCardsOrder($cards: [CardsUpdates!]!) {
    updateCardsOrder(cards: $cards) {
      id
      listId
      title
      description
      comment
    }
  }
`;

export const ASSIGN_MEMBER = gql`
  mutation assignMember ($userId:Int!,$listId:Int!,$workSpaceId:Int!,$memberName:String!){
    assignMember(memberInfo:{userId:$userId,listId:$listId,workSpaceId:$workSpaceId,memberName:$memberName}){
      id
    }
  }
`
