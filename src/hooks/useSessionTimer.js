import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const INITIAL_COUNTDOWN = 10 * 60; // 10 minutes in seconds

export const useSessionTimer = () => {
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN);
  const navigate = useNavigate();

  const resetTimer = useCallback(() => {
    setCountdown(INITIAL_COUNTDOWN);
  }, []);

  const handleInactivityLogout = useCallback(async () => {
    try {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      navigate('/login');
    } catch (error) {
      console.error('Error during inactivity logout:', error);
    }
  }, [navigate]);

  useEffect(() => {
    let inactivityTimer;
    let countdownInterval;

    // Start countdown
    countdownInterval = setInterval(() => {
      setCountdown(prevCount => {
        if (prevCount <= 1) {
          clearInterval(countdownInterval);
          handleInactivityLogout();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    // Reset timer on user activity
    const handleUserActivity = () => {
      clearTimeout(inactivityTimer);
      resetTimer();
      inactivityTimer = setTimeout(handleInactivityLogout, INITIAL_COUNTDOWN * 1000);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    // Initial setup
    handleUserActivity();

    // Cleanup
    return () => {
      clearInterval(countdownInterval);
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
    };
  }, [handleInactivityLogout, resetTimer]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    formattedTime: formatTime(countdown),
    resetTimer
  };
}; 