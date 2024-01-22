import React, { useState, useRef, useEffect } from "react";
import { Card, CardMedia } from "@mui/material";
import VideoPlayer from "components/HlsVideoPlayer";

interface VideoCardProps {
    hlsStreamUrl: string;
    previewImage: string;
    videoId: string;
    onClick: (videoId: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
    hlsStreamUrl,
    previewImage,
    videoId,
    onClick,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const hoverRef = useRef<number | null>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleMouseLeave = () => {
        if (hoverRef.current) {
            clearTimeout(hoverRef.current);
        }

        hoverRef.current = window.setTimeout(() => {
            setIsHovered(false);
            setVideoLoaded(false);
        }, 100);
    };

    const handleMouseMove = () => {
        setIsHovered(true);
    };

    const handleLoadedData = () => {
        setVideoLoaded(true);
    };

    useEffect(() => {
        return () => {
            if (hoverRef.current) {
                clearTimeout(hoverRef.current);
            }
        };
    }, []);

    return (
        <Card
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
                onClick(videoId);
            }}
            style={{ cursor: "pointer" }}
        >
            {isHovered ? (
                <>
                    {isHovered && !videoLoaded && (
                        <CardMedia
                            component="img"
                            image={previewImage}
                            ref={imageRef}
                            alt="Video Preview"
                        />
                    )}
                    {isHovered && (
                        <VideoPlayer
                            src={hlsStreamUrl}
                            onLoadedData={handleLoadedData}
                            muted={true}
                            controls={false}
                            style={{
                                display: videoLoaded ? "block" : "none",
                                border: 0,
                                width: "100%",
                            }}
                        />
                    )}
                </>
            ) : (
                <CardMedia
                    component="img"
                    image={previewImage}
                    ref={imageRef}
                    alt="Video Preview"
                />
            )}
        </Card>
    );
};

export default VideoCard;
