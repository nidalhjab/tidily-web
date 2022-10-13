import { Formik, Form } from "formik";
import { Button } from "../Button/Button";
import { TextInput } from "../TextInput/TextInput";
import signupSchema from "./SignUp.schema";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../../graphql/Mutations";
import { UserInfo } from "./user.model";
import { Spinner } from "../Spinner/Spinner";
import { useEffect } from "react";

interface SignUpProps {
    isLogin: (state: boolean) => void
}

export const SignUp: React.FC<SignUpProps> = ({ isLogin }: SignUpProps) => {
    const [SignUp, { error, loading, data }] = useMutation(CREATE_USER);
    const handleSubmit = async (values: UserInfo) => {
        await SignUp({
            variables: {
                name: values.name,
                email: values.email,
                phone: values.phone,
                password: values.password
            }
        })
    };
    useEffect(() => {
        if (data) {
            isLogin(true)
        }
    }, [data])

    const setLoginForm = () => { isLogin(true) }
    return (
        <div className="signup-container">
            <Formik
                initialValues={{ name: "", email: "", phone: "", password: "" }}
                validationSchema={signupSchema}
                onSubmit={handleSubmit}
            >
                <Form className="form">
                    <div id="form-heading">Go ahead and Join Us</div>

                    <div className="name">
                        <TextInput
                            name='name'
                            type='text'
                            id='outlined-basic'
                            label='Full Name'
                        />
                    </div>
                    <div className="email">
                        <TextInput
                            name='email'
                            type='email'
                            id='outlined-basic'
                            label='Email'
                        />
                        {error?.message.includes("Email") && <p id="error">Email already exist</p>}
                    </div>
                    <div className="phone">
                        <TextInput
                            name='phone'
                            type='string'
                            id='outlined-basic'
                            label='Phone Number'
                        />
                        {error?.message.includes("Phone") && <p id="error">Phone already exist</p>}
                    </div>
                    <div className="password">
                        <TextInput
                            name='password'
                            type='password'
                            id='outlined-basic'
                            label='Password'
                        />
                    </div>
                    <div className="btn">
                        <Button
                            title="SignUp"
                            type='submit'
                        />
                    </div>
                    <div className="login">
                        Already have account? <Button title="Login" type="button" OnClick={setLoginForm} />
                    </div>
                    {loading ? <Spinner /> : null}
                </Form>
            </Formik>
        </div>
    );
}