import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './FrontPage.css';

const FrontPage: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="frontpage-wrapper">
      <header className="sticky-header">
        <div className="sticky-header-content">
          <h1 className="app-name">Nfitrac</h1>
          <nav className="top-nav">
            <ul>
              <li><button className="nav-button" onClick={() => scrollToSection('reviews')}>Reviews</button></li>
              <li><button className="nav-button" onClick={() => scrollToSection('how-it-works')}>How It Works</button></li>
              <li><button className="nav-button" onClick={() => scrollToSection('apps')}>Apps</button></li>
              <li><button className="nav-button" onClick={() => scrollToSection('philosophy')}>Our Philosophy</button></li>
              <li><button className="nav-button" onClick={() => scrollToSection('qa')}>Q&A</button></li>
            </ul>
            <button className="nav-button darkmode-button" onClick={toggleDarkMode} aria-pressed={darkMode} aria-label="Toggle dark mode">
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </nav>
        </div>
      </header>

      <section id="philosophy" className="philosophy-section section-white">
        <div className="philosophy-images">
          <img src="https://images.hdqwalls.com/wallpapers/dwayne-johnson-in-gym-4k-kf.jpg" alt="Dwayne Johnson" />
        </div>
        <div className="philosophy-text">
          <h2>Knowledge is power</h2>
          <p>“Studies show people who keep a food diary are more likely to hit their goals. Nfitrac simplifies nutrition and calorie tracking, provides the data you want, and helps you make sense of it all.</p>
          <p>Healthy eating is a continuous journey of self-discovery. And the more you track, the more empowered you’ll become to make healthy choices that support your goals.”</p>
          <p className="author">— Stephanie Nelson, Registered Dietitian</p>
          <a href="/get-started" className="btn btn-primary">Get Started</a>
        </div>
      </section>

      <section id="reviews" className="reviews-section section-lightgray">
        <h2>What Our Users Say</h2>
        <div className="reviews-container">
          <div className="review-card">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User 1" />
            <p>"Nfitrac helped me stay on track with my fitness goals. Highly recommend!"</p>
            <span>- Manjul</span>
          </div>
          <div className="review-card">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User 2" />
            <p>"The nutrition tracking feature is a game changer for me."</p>
            <span>- Navdeep Singh</span>
          </div>
          <div className="review-card">
            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User 3" />
            <p>"Love the motivational quotes and progress charts!"</p>
            <span>-Sneha</span>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works-section section-white">
        <h2>How It Works</h2>
        <p>FitTrack helps you log your activities, track your nutrition, and monitor your progress with ease.</p>
      </section>

      <section id="apps" className="apps-section section-lightgray">
        <h2>Apps</h2>
        <p>Available on iOS and Android. Download now to start your fitness journey.</p>
      </section>

      <section id="qa" className="qa-section section-white">
        <h2>Q&A</h2>
        <div className="qa-container">
          <details>
            <summary>How do I track my calories?</summary>
            <p>You can log your meals and snacks in the app to keep track of your calorie intake.</p>
          </details>
          <details>
            <summary>Can I set personalized fitness goals?</summary>
            <p>Yes, Nfitrac allows you to set and monitor your own fitness goals.</p>
          </details>
          <details>
            <summary>Is my data secure?</summary>
            <p>We use industry-standard security measures to protect your data.</p>
          </details>
        </div>
      </section>
    </div>
  );
};

export default FrontPage;
// using some random images as user can later change them i dont want to use my pic (i had to change so many names for the project bec all name i likes were used by other companies).      :(