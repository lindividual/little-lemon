'use client';

import React, { useState, useEffect } from 'react';
import { useReservation } from '../contexts/ReservationContext';

const availableTimes = [
  '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
];

const occasions = [
  'Dinner', 'Birthday Party', 'Other'
];

export default function ReservationForm() {
  const { userId, updateReservation, fetchReservation } = useReservation();
  const [date, setDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('');
  const [time, setTime] = useState('');
  const [guestError, setGuestError] = useState('');

  useEffect(() => {
    const today = new Date();
    setMinDate(today.toISOString().split('T')[0]);
    setMaxDate(new Date(today.setDate(today.getDate() + 14)).toISOString().split('T')[0]);
  }, []);

  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 10) {
      setGuestError('Number of guests cannot exceed 10');
    } else {
      setGuestError('');
      setGuests(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      console.error('No userId available');
      return;
    }

    const reservationData = {
      userId,
      date,
      time,
      guests,
      occasion
    };

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit reservation');
      }

      const result = await response.json();
      console.log('Reservation submitted:', result);
      
      if (result.success && result.reservation) {
        console.log('ReservationForm: Updating reservation in context');
        updateReservation(result.reservation);
      } else {
        console.error('Failed to get reservation data from API');
      }

    } catch (error) {
      console.error('Error submitting reservation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={minDate}
          max={maxDate}
          required
          className="w-full px-3 py-2 border rounded-lg text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block text-gray-700 font-bold mb-2">Time</label>
        <select
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg text-gray-900"
        >
          <option value="">Select a time</option>
          {availableTimes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="guests" className="block text-gray-700 font-bold mb-2">Number of guests</label>
        <input
          type="number"
          id="guests"
          value={guests}
          onChange={handleGuestsChange}
          min="1"
          required
          className="w-full px-3 py-2 border rounded-lg text-black"
        />
        {guestError && <p className="text-red-500 text-sm mt-1">{guestError}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="occasion" className="block text-gray-700 font-bold mb-2">Occasion</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="">Select an occasion</option>
          {occasions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500">
        Make Reservation
      </button>
    </form>
  );
}
