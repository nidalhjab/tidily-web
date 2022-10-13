import * as Yup from "yup";

const loginSchema = Yup.object({
    email: Yup.string()
        .email("invalid email address")
        .required("Email required"),
    password: Yup.string()
        .required("Password required")
        .min(8, "Password must be more than  characters"),
});

export default loginSchema;