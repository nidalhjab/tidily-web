import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { ADD_WORKSPACE } from "../../../../graphql/Mutations";
import { GET_WORKSPACES } from "../../../../graphql/Queries";
import { useMe } from "../../../hooks/useMe.hook";
import { Button } from "../../Button/Button";
import { TextInput } from "../../TextInput/TextInput";

interface ModalProps {
    title: string;
    cancelHandler: (modalStatus: boolean) => void;
    addHandler: any;
}

export const WorkSpaceModal: React.FC<ModalProps> = ({
    title,
    addHandler,
    cancelHandler,
}: ModalProps) => {
    const { userInfo } = useMe();
    const [members, setMembers] = useState([{ id: 1, name: "member1" }]);
    const [addWorkSpace, { error }] = useMutation(ADD_WORKSPACE, {
        refetchQueries: [
            { query: GET_WORKSPACES, variables: { userId: userInfo.id } },
        ],
    });
    const [inputError, setInputError] = useState("");
    const initialValues = {
        name: "",
    };
    useEffect(() => {
        if (error) {
            setInputError(error.message);
        }
    }, [error]);
    const handleSubmit = async (values: any) => {
        let name = values.name;
        delete values.name;
        const entries: string[] = Object.values(values);
        await addWorkSpace({
            variables: {
                name,
                members: entries,
                userId: userInfo.id,
            },
        });
        cancelHandler(false);
    };
    const handleCancel = () => {
        cancelHandler(false);
    };
    const addNewMemberField = () => {
        const lastMember = members[members.length - 1];
        const newMember = {
            id: lastMember.id + 1,
            name: `member${lastMember.id + 1}`,
        };
        setMembers((oldVal: any) => [...oldVal, newMember]);
    };
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    name: Yup.string().required("Name is required"),
                    member1: Yup.string().email().required("At least one member needed"),
                })}
                onSubmit={handleSubmit}
                validateOnChange={false}
            >
                <Form className="form">
                    <span id="form-heading">{title}</span>
                    {inputError && <span id="error">{inputError}</span>}
                    <div className="name">
                        <TextInput label="WorkSpace Name" name="name" type="text" />

                        {members.map((member) => {
                            return (
                                <TextInput
                                    key={member.id}
                                    label="Member Email"
                                    name={member.name}
                                    type="email"
                                />
                            );
                        })}
                        <Button
                            OnClick={addNewMemberField}
                            title="additional member"
                            type="button"
                        />
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
