import React, {useState} from 'react';
import useFakeDB from "../../fakeDB/useFakeDB";
import {useNavigate} from "react-router-dom";

const NewMessageForm = () => {
    const [messageText, setMessageText] = useState('');
    const {createMessage} = useFakeDB();
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        createMessage({text: messageText});
        navigate(`/messages`);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={messageText} onChange={e => setMessageText(e.target.value)}/>
            <button>Submit</button>
        </form>
    );
};

export default NewMessageForm;
