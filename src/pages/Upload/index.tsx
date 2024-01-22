import React, { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    CircularProgress,
    LinearProgress,
    Typography,
} from "@mui/material";
import MainLayout from "components/MainLayout";
import { REACT_APP_BACKEND_URL_SOCKET } from "environmentVariables";
import { UploadVideo } from "lib/axios/Videos/requests";
import { useCookie } from "contexts/cookieContext";
import { toastError, toastInfo, toastSuccess } from "components/Toastify";
import { Prompt } from "react-router";
import { getJWTPayload } from "utils";

export function Upload(): React.ReactElement {
    const { getAccessTokenCookie } = useCookie();
    const currentAccessToken = getAccessTokenCookie();
    const { email } = getJWTPayload(currentAccessToken);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [file, setFile] = useState<File>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [statusText, setStatusText] = useState<string>("");
    const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
    const [shouldBlockNavigation, setShouldBlockNavigation] =
        useState<boolean>(false);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            if (selectedFile.type === "video/mp4") {
                setFile(selectedFile);
            } else {
                toastError("Only MP4 files are allowed");
            }
        }
    };

    const isFormFilled = () => {
        return title && description && file;
    };

    const truncateFileName = (name) => {
        return name.length > 10 ? `${name.substring(0, 10)}...` : name;
    };

    const createWebSocketConnection = () => {
        const ws = new WebSocket(
            `${REACT_APP_BACKEND_URL_SOCKET}/video/uploadSocket?accessToken=${currentAccessToken}`
        );

        ws.addEventListener("message", (event) => {
            console.log("message", event);

            const message = JSON.parse(event.data);

            if (message.stage === 1) {
                setStatusText(message.status);
                setUploading(true);
                setUploadProgress(Math.floor(message.progress / 2));
            } else if (message.stage === 2) {
                setStatusText(message.status);
                setUploadProgress(50 + Math.floor(message.progress / 2));
            } else if (message.stage === 3) {
                toastSuccess(message.status);
                setUploading(false);
                setStatusText("");
                setShouldBlockNavigation(false);
            }
        });

        ws.addEventListener("error", (event) => {
            console.log("WebSocket error: ", event);
            toastError("Socket connection error");
        });

        ws.addEventListener("close", (event) => {
            if (event.code === 3001) {
                toastError(event.reason);
            }
        });

        return new Promise<void>((resolve, reject) => {
            ws.addEventListener("open", (event) => {
                resolve();
            });
        });
    };

    const handleUpload = async () => {
        if (!file) {
            toastError("Please select a file to upload");
            return;
        }

        try {
            await createWebSocketConnection();

            const message = await UploadVideo(
                file,
                title,
                description,
                currentAccessToken
            );

            setShouldBlockNavigation(true);
            toastInfo(message);
        } catch (error) {
            toastError(error.message);
            return;
        }
    };

    return (
        <MainLayout accountName={email}>
            <Prompt
                when={shouldBlockNavigation}
                message="Your video has not yet been uploaded, are you sure you want to leave?"
            />

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Box
                    width="50%"
                    display="flex"
                    flexDirection="column"
                    alignItems="start"
                    mb={2}
                    mt={2}
                >
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ marginBottom: 2 }}
                        fullWidth
                        disabled={uploading}
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ marginBottom: 2 }}
                        fullWidth
                        disabled={uploading}
                    />
                    <Box
                        display="flex"
                        width="100%"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ marginBottom: 2 }}
                    >
                        <Button
                            variant="contained"
                            component="label"
                            disabled={uploading}
                            sx={{ width: "120px" }}
                        >
                            {file ? truncateFileName(file.name) : "Choose File"}
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                accept="video/mp4"
                                disabled={uploading}
                            />
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleUpload}
                            disabled={!isFormFilled() || uploading}
                        >
                            {uploading ? (
                                <CircularProgress size={24} />
                            ) : (
                                "Upload"
                            )}
                        </Button>
                    </Box>
                </Box>
                <Box
                    width="70%"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    {uploading && (
                        <LinearProgress
                            variant="determinate"
                            value={uploadProgress}
                            sx={{
                                height: "10px",
                                width: "100%",
                                borderRadius: "7px",
                            }}
                        />
                    )}
                    <Typography variant="body2">
                        {uploading ? `${statusText}: ${uploadProgress}%` : ""}
                    </Typography>
                </Box>
            </Box>
        </MainLayout>
    );
}
