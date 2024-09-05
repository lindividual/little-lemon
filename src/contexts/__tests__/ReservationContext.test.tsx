import React from 'react';
import { render, act } from '@testing-library/react';
import { ReservationProvider, useReservation } from '../ReservationContext';

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ reservation: { id: '1', date: '2023-05-01' } }),
  })
) as jest.Mock;

const TestComponent: React.FC = () => {
  const { reservation, fetchReservation } = useReservation();
  return (
    <div>
      <button onClick={() => fetchReservation()}>Fetch</button>
      <div data-testid="reservation">{JSON.stringify(reservation)}</div>
    </div>
  );
};

describe('ReservationContext', () => {
  it('provides reservation data and fetch function', async () => {
    const { getByTestId, getByText } = render(
      <ReservationProvider>
        <TestComponent />
      </ReservationProvider>
    );

    expect(getByTestId('reservation').textContent).toBe('null');

    await act(async () => {
      getByText('Fetch').click();
    });

    expect(getByTestId('reservation').textContent).toBe('{"id":"1","date":"2023-05-01"}');
  });
});
