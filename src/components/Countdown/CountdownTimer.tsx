// src/components/Countdown/CountdownTimer.tsx
import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerId);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
  };

  return (
    <div className="flex flex-col justify-center items-center font-medium">
      <div>
        <span className="text-9xl liquid-sensitive">{timeLeft.days}</span>
        <span className="text-4xl liquid-sensitive">días</span>
      </div>

      <div className='relative'>
            {/* Bordes que solo cubren el contenido */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-6rem)] border-t-[1px] liquid-sensitive"></div>
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-6rem)] border-b-[1px] liquid-sensitive"></div>

        <div className="grid grid-cols-3 gap-1 w-full py-5 px-4">
          <div className="flex flex-col items-center">
            <span className="text-9xl w-32 text-center liquid-sensitive">{formatNumber(timeLeft.hours)}</span>
            <p className="text-4xl liquid-sensitive">horas</p>
          </div>
          <div className="flex flex-col items-center border-x-[1px] px-24 liquid-sensitive">
            <span className="text-9xl w-32 text-center liquid-sensitive">{formatNumber(timeLeft.minutes)}</span>
            <p className="text-4xl liquid-sensitive">minutos</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-9xl w-32 text-center liquid-sensitive">{formatNumber(timeLeft.seconds)}</span>
            <p className="text-4xl liquid-sensitive">segundos</p>
          </div>
        </div>
      </div>
    </div>
  );
}