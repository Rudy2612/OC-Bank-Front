export default function Button({ style = "primary", onClick, text, type = "button" }) {
    return (
        <button className={`button ${style}`} type={type} onClick={onClick}>{text}</button>
    )
}
