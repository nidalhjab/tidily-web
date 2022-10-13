import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "../../Button/Button";
import { TextInput } from "../../TextInput/TextInput";
import * as Yup from 'yup';
import { TextArea } from "../../TextArea/TextArea";
import { useMutation } from "@apollo/client";
import { UPDATE_CARD } from "../../../../graphql/Mutations";
import { useMe } from "../../../hooks/useMe.hook";

interface CardProps {
    editHandler: any,
    cancelHanlder: any
    listId?: number
    cardInfo: any
    workSpaceId?: number
}

export const EditCard: React.FC<CardProps> = ({ editHandler, listId, cancelHanlder, cardInfo, workSpaceId }: CardProps) => {
    const { userInfo } = useMe();
    const { title, description, comment } = cardInfo
    const [updateCard, { data }] = useMutation(UPDATE_CARD)
    const [inputError, setInputError] = useState('');
    const initialValues = {
        title: title,
        description: description,
        comment: comment
    }
    const handleSubmit = async (values: any) => {
        const { title, description, comment } = values;
        if (title === '' || description === '') {
            setInputError("Requiered");
        } else {
            await updateCard({
                variables: {
                    userId: userInfo.id,
                    listId,
                    title,
                    description,
                    comment,
                    workSpaceId
                }
            })
            cancelHanlder(false)
        }
    }
    useEffect(() => {
        if (data) {
            editHandler(data.updateCard)

        }
    }, [data])


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
                        <Button type='submit' title='Edit' />
                        <Button type='button' title='Cancel' OnClick={() => cancelHanlder(false)} />
                    </div>
                </Form>
            </Formik>

        </>
    )
}