const ShiniText = ({ text, disabled = false, speed = 5, className = '' }) => {
  const animationStyle = {
    backgroundImage:
      'linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 60%)',
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `shine ${speed}s linear infinite`,
  };

  return (
    <div
      className={`text-transparent bg-clip-text inline-block ${disabled ? '' : ''} ${className}`}
      style={!disabled ? animationStyle : {}}
    >
      {text}
    </div>
  );
};

export default ShiniText;
