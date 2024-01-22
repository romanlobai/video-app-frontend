import React from "react";
import { Box, Button, Divider } from "@mui/material";
import { useHistory } from "react-router-dom";

const LeftSideBar: React.FC = () => {
    const history = useHistory();

    const handleButtonClickVideos = () => {
        history.push("/");
    };

    const handleButtonClickUpload = () => {
        history.push("/upload/video");
    };

    return (
        <Box
            width={200}
            bgcolor="#696969"
            height="100vh"
            p={2}
            display="flex"
            flexDirection="column"
        >
            <Button
                style={{
                    textTransform: "none",
                    justifyContent: "start",
                    color: "White",
                }}
                onClick={handleButtonClickVideos}
            >
                Videos
            </Button>
            <Divider />
            <Button
                style={{
                    textTransform: "none",
                    justifyContent: "start",
                    color: "White",
                }}
                onClick={handleButtonClickUpload}
            >
                Upload
            </Button>
        </Box>
    );
};

export default LeftSideBar;
