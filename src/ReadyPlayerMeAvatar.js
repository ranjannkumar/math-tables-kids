import React, { useRef, useEffect } from 'react';

const ReadyPlayerMeAvatar = ({ onAvatarUrl, style }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'https://readyplayer.me') return;
      const data = event.data;
      if (data?.source === 'readyplayerme' && data.eventName === 'v1.avatar.exported') {
        onAvatarUrl(data.data.url); // This is the GLB/GLTF URL of the avatar
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onAvatarUrl]);

  return (
    <iframe
      ref={iframeRef}
      title="Ready Player Me Avatar Creator"
      src="https://readyplayer.me/avatar?frameApi"
      style={{ width: '100%', height: 600, border: 'none', ...style }}
      allow="camera *; microphone *"
    />
  );
};

export default ReadyPlayerMeAvatar; 