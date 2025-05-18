export default function Input({ value, name, onChange, placeholder = "" }) {
  return (
    <input className="input" value={value} name={name} onChange={onChange} placeholder={placeholder}></input>
  )
}
