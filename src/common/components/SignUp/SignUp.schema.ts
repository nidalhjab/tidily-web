import * as Yup from "yup";

const signupSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.number()
        .required("Phone is required")
        .min(5, "Phone must be 5 or more digits"),
    email: Yup.string()
        .email("Invalid Email")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

export default signupSchema;