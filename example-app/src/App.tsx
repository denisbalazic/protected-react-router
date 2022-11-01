import React from 'react';
import Router from "./router/Router";
import FakeDBProvider from "./pseudoStore/pseudoStoreContext";

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
