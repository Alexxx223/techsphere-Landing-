import React, { useEffect, useRef, useState } from 'react';

const VoiceAssistant = () => {
  const widgetRef = useRef(null);
  const [isCompatible, setIsCompatible] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' &&
        navigator.mediaDevices &&
        typeof navigator.mediaDevices.getUserMedia === 'function') {
      setIsCompatible(true); // Browser supports mic
    }
  }, []);

  useEffect(() => {
    if (isCompatible && widgetRef.current) {
      const element = document.createElement('elevenlabs-convai');
      element.setAttribute('agent-id', 'agent_01jvhkgxb4f1y80pyyqwrqpw64');
      widgetRef.current.appendChild(element);
    }
  }, [isCompatible]);

  return (
    <div ref={widgetRef}>
      {!isCompatible && (
        <div style={{ background: '#A71518', color: 'white', padding: '1rem', borderRadius: '10px' }}>
          Your browser doesn't support voice interaction. Please try Chrome or Edge with microphone access enabled.
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
