import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { toastError } from "components/Toastify";
import { useHistory, useParams } from "react-router-dom";
import { useCookie } from "contexts/cookieContext";
import MainLayout from "components/MainLayout";
import { getJWTPayload } from "utils";
import { deleteOneVideo, getOneVideo } from "lib/axios/Videos/requests";
import { Video } from "lib/axios/Videos/types";
import VideoPlayer from "components/HlsVideoPlayer";

export function VideoById(): React.ReactElement {
    const history = useHistory();
    const { getAccessTokenCookie } = useCookie();

    const { videoId } = useParams<Record<string, any>>();
    const currentAccessToken = getAccessTokenCookie();
    const { email, id } = getJWTPayload(currentAccessToken);

    const [video, setVideo] = useState<Video>(null);

    const onDelete = async () => {
        try {
            await deleteOneVideo(currentAccessToken, videoId);
            history.push("/");
        } catch (error) {
            toastError(error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const video = await getOneVideo(currentAccessToken, videoId);
                console.log(video);

                setVideo(video);
            } catch (error) {
                toastError(error.message);
            }
        };

        fetchData();
    }, []);

    if (!video) {
        return <MainLayout accountName={email}>Loading...</MainLayout>;
    }

    return (
        <MainLayout accountName={email}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Box width="70%" maxWidth="100%">
                    <VideoPlayer
                        src={video.video_url}
                        muted={false}
                        controls={true}
                        style={{ width: "100%", height: "auto" }}
                    />
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                        mt={2}
                    >
                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
                            {video.title}
                        </Typography>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={onDelete}
                        >
                            Delete Video
                        </Button>
                    </Box>
                    <Typography variant="body1" style={{ marginTop: "10px" }}>
                        {video.description}
                    </Typography>
                </Box>
            </Box>
        </MainLayout>
    );
}
