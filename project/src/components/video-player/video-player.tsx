import React, { useEffect, useRef } from 'react';

function VideoPreview(props: {
  poster: string,
  src: string,
  isPlaying: boolean,
}): JSX.Element {
  const { src, isPlaying, poster } = props;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (videoRef.current && isPlaying) {
      timeoutId = setTimeout(() => {
        videoRef.current?.play();
      }, 1000);
    }

    if (videoRef.current && !isPlaying) {
      videoRef.current.load();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isPlaying, videoRef]);

  return (
    <video
      muted
      ref={videoRef}
      src={src}
      poster={poster}
      width="280"
      height="175"
    />
  );
}

export default VideoPreview;
