import React from 'react';
import Router from "./router/Router";
import FakeDBProvider from "./fakeDB/fakeDBContext";

function App() {
    return (
        <>
            <FakeDBProvider>
                <Router/>
            </FakeDBProvider>
        </>
    );
}

export default App;
