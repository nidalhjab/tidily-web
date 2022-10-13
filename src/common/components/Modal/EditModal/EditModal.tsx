import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik"
import { useState } from "react"
import * as Yup from 'yup';
import { EDIT_LIST } from "../../../../graphql/Mutations";
import { useMe } from "../../../hooks/useMe.hook";
import { Button } from "../../Button/Button";
import { TextInput } from "../../TextInput/TextInput";

interface ModalProps {
    editHandler: any,
    cancelHandler: any
    workSpaceId?: number
}

export const EditModal: React.FC<ModalProps> = ({ editHandler, cancelHandler, workSpaceId }: ModalProps) => {
    const { title, listId } = editHandler;
    const { userInfo } = useMe();
    const [editList] = useMutation(EDIT_LIST);
    const [inputError, setInputError] = useState('');
    const initialValues = {
        name: title
    }
    const handleSubmit = async (values: any) => {
        const { name } = values;
        if (name === '') {
            setInputError("Name can not be empty")
        } else {
            await editList({
                variables: {
                    userId: userInfo.id,
                    listName: name,
                    listId,
                    workSpaceId
                }
            })
            cancelHandler(false);
        }
    }
    const handleCancel = () => {
        cancelHandler(false);
    }
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    name: Yup.string().required("Name is required")
                })}
                onSubmit={handleSubmit}
                validateOnChange={false}
            >
                <Form className="form">
                    {inputError && <span id="error">{inputError}</span>}
                    <div className="name">
                        <TextInput
                            autoFocus
                            label="List Name"
                            name="name"
                            type="text"
                        />
                    </div>
                    <div className="actions">
                        <Button type='submit' title='Edit' />
                        <Button type='button' title='Cancel' OnClick={handleCancel} />
                    </div>
                </Form>
            </Formik>

        </>
    )

}