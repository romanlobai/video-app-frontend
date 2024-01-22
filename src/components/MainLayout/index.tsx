import React from "react";
import { Box } from "@mui/material";
import TopBar from "components/TopBar";
import LeftSideBar from "components/LeftSideBar";
import { useCookie } from "contexts/cookieContext";
import { useHistory } from "react-router-dom";

interface MainLayoutProps {
    accountName: string;
    children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ accountName, children }) => {
    const history = useHistory();
    const { removeAllCookies } = useCookie();

    const onLogout = () => {
        removeAllCookies();
        history.push("/login");
    };

    return (
        <Box display="flex" flexDirection="column" height="100vh">
            <TopBar accountName={accountName} onLogout={onLogout} />
            <Box display="flex" flexGrow={1}>
                <LeftSideBar />
                <Box flexGrow={1} p={2}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;
