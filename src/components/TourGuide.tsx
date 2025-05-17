import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
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
}

export const TourGuide = forwardRef(function TourGuide(
  { steps, tourKey }: TourGuideProps,
  ref
) {
  const driverRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    startTour: () => {
      if (driverRef.current) {
        driverRef.current.drive();
      }
    }
  }));

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

  return null;
});
