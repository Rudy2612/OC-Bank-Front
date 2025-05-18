import { useState } from "react";
import Input from "../input";
import Button from "../button";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../store/slice/userSlice";
import { updateInformation } from "../../service/api";


export default function EditUser() {

    let [onEdit, setOnEdit] = useState(false);
    let [information, setInformation] = useState({ firstName: "", lastName: "" });
    let [error, setError] = useState("");

    let dispatch = useDispatch();
    let data = useSelector((state) => state);

    const handleChange = (e) => {
        setInformation({ ...information, [e.target.name]: e.target.value });
        setError("");
    }

    const submit_form = async (e) => {
        e.preventDefault();
        let response = await updateInformation(information.firstName, information.lastName, data.token);
        if (response.success) {
            dispatch(editUser(information));
            setOnEdit(false);
            setError("")
        }
        else
            setError(response.message)
    }

    const cancel_form = () => {
        setInformation("");
        setError("")
        setOnEdit(false);
    }

    return (

        <div>
            <h1>Welcome back<br />{data.firstName} {data.lastName}!</h1>

            {onEdit === false ?
                <>
                    <Button style="primary" text={"Edit Name"} onClick={() => setOnEdit(true)} />

                </>
                :
                <>
                    <p className="text-error">{error}</p>
                    <form onSubmit={submit_form}>
                        <div className='edit-user--center'>
                            <Input name="firstName" value={information.firstName} onChange={handleChange} placeholder={data.firstName} />
                            <Input name="lastName" value={information.lastName} onChange={handleChange} placeholder={data.lastName} />
                        </div>
                        <div className='edit-user--center'>
                            <Button type="submit" text={"Save"} />
                            <Button style="secondary" text={"Cancel"} onClick={cancel_form} />
                        </div>
                    </form>
                </>
            }

        </div>
    )
}
