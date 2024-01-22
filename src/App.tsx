import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Routes from "Routes";
import { AppThemeProvider } from "contexts/themeContext";

function App(): React.ReactElement {
    return (
        <AppThemeProvider>
            <Routes />
        </AppThemeProvider>
    );
}

export default App;
