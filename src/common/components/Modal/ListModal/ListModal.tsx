import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { ADD_LIST } from "../../../../graphql/Mutations";
import { GET_LISTS } from "../../../../graphql/Queries";
import { useMe } from "../../../hooks/useMe.hook";
import { Button } from "../../Button/Button";
import { TextInput } from "../../TextInput/TextInput";

interface ModalProps {
    title: string;
    closeModal: (modalStatus: boolean) => void;
    addList: any;
    workSpaceId?: number;
}

export const ListModal: React.FC<ModalProps> = ({
    title,
    closeModal,
    addList,
    workSpaceId,
}: ModalProps) => {
    const { userInfo } = useMe();
    const [addNewList, { data: addedList }] = useMutation(ADD_LIST, {
        update(cache, { data }) {
            const existingLists: any = cache.readQuery({
                query: GET_LISTS,
                variables: { userId: userInfo.id, workSpaceId },
            });
            const newLists = [...existingLists.getLists, data.addNewList];
            addList((oldValue: any) => [
                ...oldValue,
                { ...data.addNewList, __typeName: undefined },
            ]);
            const newData = { getLists: newLists };
            cache.writeQuery({
                query: GET_LISTS,
                data: newData,
                variables: { usrId: userInfo.id, workSpaceId },
            });
        },
    });
    useEffect(() => {
        if (addedList) {
            closeModal(false);
        }
    }, [addedList])
    const [inputError, setInputError] = useState("");
    const initialValues = {
        name: "",
    };
    const handleSubmit = async (values: any) => {
        const { name } = values;
        if (name === "") {
            setInputError("Name can not be empty");
        } else {
            await addNewList({
                variables: {
                    userId: userInfo.id,
                    listName: name,
                    workSpaceId,
                },
            });
        }
    };

    const handleCancel = () => {
        closeModal(false);
    };
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    name: Yup.string().required("Name is required"),
                })}
                onSubmit={handleSubmit}
                validateOnChange={false}
            >
                <Form className="form">
                    <span id="form-heading">{title}</span>
                    {inputError && <span id="error">{inputError}</span>}
                    <div className="name">
                        <TextInput label="List Name" name="name" type="text" />
                    </div>
                    <div className="actions">
                        <Button type="submit" title="Add" />
                        <Button type="button" title="Cancel" OnClick={handleCancel} />
                    </div>
                </Form>
            </Formik>
        </>
    );
};
