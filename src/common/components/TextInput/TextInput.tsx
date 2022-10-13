import { useField } from "formik";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import './TextInput.css'

type InputProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;
interface TextInputProps extends InputProps {
    name: string;
    label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input style={meta.touched && meta.error ? { border: "1px solid rgb(252, 54, 54)" } : undefined} {...field} {...props} />
            {meta.touched && meta.error ? <p className="error">{meta.error}</p> : null}
        </>
    );
};
