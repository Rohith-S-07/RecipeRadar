import React from 'react';
import useTypingEffect from '../hooks/useTypingEffect';


const TypingAnimation = ({ text, speed = 75 }) => {
  const displayedText = useTypingEffect(text, speed);

  return (
    <div className="typing-animation text-wrap">
      <p>{displayedText}</p>
    </div>
  );
};

export default TypingAnimation;
