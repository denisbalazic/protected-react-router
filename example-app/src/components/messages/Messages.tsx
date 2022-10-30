import React from 'react';
import useFakeDB from "../../fakeDB/useFakeDB";
import {Link, Outlet} from "react-router-dom";

const Messages = () => {
    const {getMessages} = useFakeDB();
    const messages = getMessages();

    return (
        <div>
            {messages.map((message: any) => (
                <div>
                    {message.text}
                    <span><Link to={`/messages/${message.id}/edit`}>Edit</Link> </span>
                </div>
            ))}
            <Link to={'/messages/new'}>Add New Message</Link>
            <Outlet/>
        </div>
    );
};

export default Messages;
