import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import ReservationDisplay from '../ReservationDisplay';
import { ReservationProvider } from '@/contexts/ReservationContext';

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ reservation: { date: '2023-05-01', time: '18:00', guests: 2, occasion: 'Birthday' } }),
  })
) as jest.Mock;

describe('ReservationDisplay', () => {
  it('displays reservation information when available', async () => {
    const { getByText } = render(
      <ReservationProvider>
        <ReservationDisplay />
      </ReservationProvider>
    );

    await waitFor(() => {
      expect(getByText(/your reservation/i)).toBeInTheDocument();
      expect(getByText(/2023-05-01/)).toBeInTheDocument();
      expect(getByText(/18:00/)).toBeInTheDocument();
      expect(getByText(/2 guests/)).toBeInTheDocument();
      expect(getByText(/Birthday/)).toBeInTheDocument();
    });
  });

  it('displays a message when no reservation is available', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        status: 404,
      })
    );

    const { getByText } = render(
      <ReservationProvider>
        <ReservationDisplay />
      </ReservationProvider>
    );

    await waitFor(() => {
      expect(getByText(/no current reservation/i)).toBeInTheDocument();
    });
  });
});
