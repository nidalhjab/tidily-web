import { Form, Formik } from "formik"
import { Button } from "../Button/Button";
import { TextInput } from "../TextInput/TextInput";
import loginSchema from "./Login.schema";
import { useMutation } from "@apollo/client";
import { LOAD_USER } from "../../../graphql/Mutations";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Credentials } from "./credentials";

import { UserInfo } from "../SignUp/user.model";


interface LoginProps {
    isLogin: (state: boolean) => void
}
export const Login: React.FC<LoginProps> = ({ isLogin }: LoginProps) => {
    const navigate = useNavigate()
    const [SignIn, { error, loading, data }] = useMutation(LOAD_USER);

    const initialValues = {
        email: "",
        password: "",
    };
    const handleSubmit = async (values: Credentials) => {
        await SignIn({
            variables: {
                email: values.email,
                password: values.password
            }
        })

    };
    useEffect(() => {
        if (data) {
            window.localStorage.setItem("access_token", data.SignIn.token);
            window.dispatchEvent(new Event("storage"));
            navigate('dashboard')
        }
    }, [data])
    const changeForm = () => {
        isLogin(false);
    }
    return (
        <div className="login-container">
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
                validateOnChange={false}
            >
                <Form className="form">
                    <span id="form-heading">Login Here</span>
                    {error && <span id="error">Incorrect Email or Password</span>}
                    <div className="email">
                        <TextInput
                            label="Email"
                            name="email"
                            type="email"

                        />
                    </div>
                    <div className="password">
                        <TextInput
                            label="Password"
                            name="password"
                            type="password"

                        />
                    </div>
                    <div className="btn">
                        <Button
                            title="Login"
                            type="submit"
                        />
                    </div>
                    <div className="signup">
                        Not a member? <Button title="Join Us" type="button" OnClick={changeForm} />
                    </div>
                </Form>

            </Formik>
        </div>
    )
}