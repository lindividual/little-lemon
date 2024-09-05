import React from 'react';
import { render } from '@testing-library/react';
import { waitFor } from '@testing-library/react/pure';
import userEvent from '@testing-library/user-event';
import ReservationForm from '../ReservationForm';
import { ReservationProvider } from '@/contexts/ReservationContext';

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true, reservation: { id: '1', date: '2023-05-01' } }),
  })
) as jest.Mock;

describe('ReservationForm', () => {
  it('submits form data correctly', async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByText } = render(
      <ReservationProvider>
        <ReservationForm />
      </ReservationProvider>
    );

    await user.type(getByLabelText(/date/i), '2023-05-01');
    await user.type(getByLabelText(/time/i), '18:00');
    await user.type(getByLabelText(/guests/i), '2');
    await user.type(getByLabelText(/occasion/i), 'Birthday');

    userEvent.click(getByText(/make reservation/i));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/reservations', expect.any(Object));
    });

    const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
    const requestBody = JSON.parse(fetchCall[1].body);

    expect(requestBody).toEqual({
      userId: expect.any(String),
      date: '2023-05-01',
      time: '18:00',
      guests: 2,
      occasion: 'Birthday',
    });
  });
});
