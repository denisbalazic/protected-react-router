import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useFakeDB from "../../fakeDB/useFakeDB";

const EditMessageForm = () => {
    const {msgId} = useParams();
    const navigate = useNavigate();
    const {editMessage, getMessage} = useFakeDB();
    const message = getMessage(Number(msgId));
    const [messageText, setMessageText] = useState(message.text);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        editMessage({...message, text: messageText})
        navigate(`/messages`)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={messageText} onChange={e => setMessageText(e.target.value)}/>
            <button>Submit</button>
        </form>
    );
};

export default EditMessageForm;
