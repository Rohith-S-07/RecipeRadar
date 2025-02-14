import React, { useEffect } from 'react';

const LottiePlayer = () => {
  useEffect(() => {
    // Dynamically import the Lottie player script in React.
    import('@dotlottie/player-component');
  }, []);

  return (
    <div className='d-none'>
      <dotlottie-player
        src="https://lottie.host/1adc0baf-f0a5-4266-a8de-129f6e0047d4/YNKlGHFuGd.lottie"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
};

export default LottiePlayer;
