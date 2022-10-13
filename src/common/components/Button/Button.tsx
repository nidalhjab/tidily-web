import './Button.css'

interface ButtonProps {
    type: 'button' | 'submit' | 'reset' | undefined,
    OnClick?: () => void,
    title: string
}
export const Button: React.FC<ButtonProps> = ({ type, OnClick, title }: ButtonProps) => {
    return <button className="button" type={type} onClick={OnClick}>{title} </button>
}