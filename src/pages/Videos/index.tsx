import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { toastError } from "components/Toastify";
import { useHistory } from "react-router-dom";
import { useCookie } from "contexts/cookieContext";
import MainLayout from "components/MainLayout";
import { getJWTPayload } from "utils";
import { getAllVideos } from "lib/axios/Videos/requests";
import { Video } from "lib/axios/Videos/types";
import VideoCard from "components/VideoCard";

export function Videos(): React.ReactElement {
    const history = useHistory();
    const { getAccessTokenCookie } = useCookie();
    const currentAccessToken = getAccessTokenCookie();
    const { email } = getJWTPayload(currentAccessToken);

    const [videos, setVideos] = useState<Video[]>(null);

    const handleOpenVideo = (videoId: string) => {
        history.push(`/video/${videoId}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videos = await getAllVideos(currentAccessToken);
                console.log(videos);

                setVideos(videos);
            } catch (error) {
                toastError(error.message);
            }
        };

        fetchData();
    }, []);

    if (!videos) {
        return <MainLayout accountName={email}>Loading...</MainLayout>;
    }

    return (
        <MainLayout accountName={email}>
            <Grid container spacing={2}>
                {videos.map((video, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <VideoCard
                            hlsStreamUrl={video.video_url}
                            previewImage={video.preview_url}
                            videoId={video.id}
                            onClick={handleOpenVideo}
                        />

                        <Typography
                            variant="h6"
                            sx={{
                                height: "3em",
                                overflow: "hidden",
                                fontWeight: "bold",
                                marginTop: "4px",
                            }}
                        >
                            {video.title.length > 100
                                ? video.title.substring(0, 100) + "..."
                                : video.title}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </MainLayout>
    );
}
