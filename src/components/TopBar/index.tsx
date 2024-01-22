import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/ExitToApp";

interface TopBarProps {
    accountName: string;
    onLogout: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ accountName, onLogout }) => {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#2b2b2b",
            }}
        >
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    {accountName}
                </Typography>
                <IconButton color="inherit" onClick={onLogout}>
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
