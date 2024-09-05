'use client';

import React, { useEffect, useRef } from 'react';
import { useReservation } from '@/contexts/ReservationContext';

const ReservationDisplay: React.FC = () => {
  const { reservation, fetchReservation, version } = useReservation();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      console.log('ReservationDisplay: Fetching reservation');
      fetchReservation();
      hasFetchedRef.current = true;
    }
  }, [fetchReservation]);

  useEffect(() => {
    console.log('ReservationDisplay: Version or reservation changed', { version, reservation });
  }, [version, reservation]);

  console.log('ReservationDisplay: Rendering, reservation:', reservation, 'version:', version);

  if (!reservation) {
    return (
      <div className="bg-yellow-100 p-4 text-center">
        <p className="text-sm text-black">No current reservation. Would you like to make one?</p>
      </div>
    );
  }

  return (
    <div className="bg-yellow-100 p-4 text-center">
      <p className="text-sm text-black">
        Your reservation: {reservation.date} at {reservation.time} for {reservation.guests} guests ({reservation.occasion})
      </p>
    </div>
  );
};

export default ReservationDisplay;

