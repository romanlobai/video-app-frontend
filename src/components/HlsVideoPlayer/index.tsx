import { ReactEventHandler, useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
    src: string;
    muted: boolean;
    controls: boolean;
    style: Record<string, any>;
    onLoadedData?: undefined | ReactEventHandler<HTMLVideoElement>;
}

const VideoPlayer = ({
    src,
    muted,
    controls,
    style,
    onLoadedData,
}: VideoPlayerProps) => {
    const videoRef = useRef(null);

    useEffect(() => {
        let hls;

        if (Hls.isSupported() && videoRef.current) {
            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoRef.current);
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [src]);

    return (
        <video
            width="100%"
            ref={videoRef}
            onLoadedData={onLoadedData ? onLoadedData : () => {}}
            autoPlay
            controls={controls}
            muted={muted}
            playsInline
            style={style}
        />
    );
};

export default VideoPlayer;
