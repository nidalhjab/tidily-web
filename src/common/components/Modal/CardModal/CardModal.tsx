import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Button } from "../../Button/Button";
import { TextInput } from "../../TextInput/TextInput";
import * as Yup from 'yup';
import { TextArea } from "../../TextArea/TextArea";
import { useMutation } from "@apollo/client";
import { ADD_CARD } from "../../../../graphql/Mutations";
import { useMe } from "../../../hooks/useMe.hook";
import { GET_CARDS } from "../../../../graphql/Queries";

interface CardProps {
    handleAdd: any,
    handleCancel: any
    listId?: number,
    workSpaceId?: number
}

export const CardModal: React.FC<CardProps> = ({ handleAdd, listId, handleCancel, workSpaceId }: CardProps) => {
    const { userInfo } = useMe();
    const [addCard] = useMutation(ADD_CARD, {
        update(cache, { data }) {
            const existingCards: any = cache.readQuery({ query: GET_CARDS, variables: { userId: userInfo.id, workSpaceId } });
            handleAdd((oldValue: any) => [...oldValue, data.addCard]);
            const newData = { getCards: [...existingCards.getCards, data.addCard] };
            cache.writeQuery({
                query: GET_CARDS,
                data: newData,
                variables: { usrId: userInfo.id, workSpaceId }
            })
        }
    })
    const [inputError, setInputError] = useState('');
    const initialValues = {
        title: "",
        description: "",
        comment: ""
    }
    const handleSubmit = async (values: any) => {
        const { title, description, comment } = values;
        if (title === '' || description === '') {
            setInputError("Requiered");
        } else {
            await addCard({
                variables: {
                    userId: userInfo.id,
                    listId,
                    title,
                    description,
                    comment,
                    workSpaceId,
                    memberName: ['']
                }
            })
            handleCancel(false)
        }
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    title: Yup.string().required("Required"),
                    description: Yup.string().required("Required"),
                    comment: Yup.string()
                })}
                onSubmit={handleSubmit}
                validateOnChange={false}
            >
                <Form className="form">

                    {inputError && <span id="error">{inputError}</span>}
                    <div className="card-title">
                        <TextInput
                            label="Card Title"
                            name="title"
                            type="text"
                        />
                    </div>
                    <div className="card-descripton">
                        <TextArea
                            name="description"
                            type="text"
                        />
                    </div>
                    <div className="card-comment">
                        <TextInput
                            label="Comment"
                            name="comment"
                            type="text"
                        />
                    </div>
                    <div className="actions">
                        <Button type='submit' title='Add' />
                        <Button type='button' title='Cancel' OnClick={handleCancel} />
                    </div>
                </Form>
            </Formik>

        </>
    )
}