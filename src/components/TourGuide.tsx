import { useEffect, useRef } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

interface TourStep {
  element: string;
  popover: {
    title: string;
    description: string;
    position?: 'top' | 'right' | 'bottom' | 'left';
  };
}

interface TourGuideProps {
  steps: TourStep[];
  tourKey: string; // clave para almacenamiento local
  showButton?: boolean; // opcional, por defecto false
}

export const TourGuide: React.FC<TourGuideProps> = ({ steps, tourKey, showButton = false }) => {
  const driverRef = useRef<any>(null);

  useEffect(() => {
    driverRef.current = driver({
      showProgress: true,
      steps,
      allowClose: true,
      doneBtnText: 'Terminar',
    
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior'
    });

    const alreadySeen = localStorage.getItem(tourKey);
    if (!alreadySeen) {
      driverRef.current.drive();
      localStorage.setItem(tourKey, 'true');
    }

    return () => {
      if (driverRef.current) {
        driverRef.current.destroy();
      }
    };
  }, [steps, tourKey]);

  const startTour = () => {
    if (driverRef.current) {
      driverRef.current.drive();
    }
  };

  return showButton ? (
    <button
      onClick={startTour}
      className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 z-50"
    >
      Repetir Tour
    </button>
  ) : null;
};
