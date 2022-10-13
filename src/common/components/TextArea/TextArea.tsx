import { useField } from "formik";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import './TextArea.css'

type InputProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
>;
interface TextInputProps extends InputProps {
    name: string;
}

export const TextArea: React.FC<TextInputProps> = ({ ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>

            <textarea placeholder="Enter a description for this card..." style={meta.touched && meta.error ? { border: "1px solid rgb(252, 54, 54)" } : undefined} {...field} {...props} />
            {meta.touched && meta.error ? <p className="error">{meta.error}</p> : null}
        </>
    );
};
