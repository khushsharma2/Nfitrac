import React, { useEffect, useState } from 'react';

const quotes = [
  "The only bad workout is the one that didn't happen.",
  "Push yourself because no one else is going to do it for you.",
  "Sweat is fat crying.",
  "Don't limit your challenges, challenge your limits.",
  "The body achieves what the mind believes.",
  "Success starts with self-discipline.",
  "Train insane or remain the same.",
  "Your health is an investment, not an expense.",
  "Strive for progress, not perfection.",
  "Fitness is not about being better than someone else, it's about being better than you used to be."
];

const MotivationalQuotes: React.FC = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div style={{
      padding: '15px',
      marginBottom: '20px',
      borderRadius: '16px',
      background: 'linear-gradient(90deg, #7b1fa2, #4a148c)',
      color: 'white',
      fontWeight: '700',
      fontSize: '1.2rem',
      textAlign: 'center',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
    }}>
      {quote}
    </div>
  );
};

export default MotivationalQuotes;
// not using this too much also i googled all quotes thnx google :)