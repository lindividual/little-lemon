'use client';

import React, { createContext, useContext, useCallback, useReducer, useEffect } from 'react';

interface Reservation {
  userId: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
}

interface ReservationState {
  userId: string | null;
  reservation: Reservation | null;
  version: number; // 添加版本号
}

type ReservationAction =
  | { type: 'SET_USER_ID'; payload: string }
  | { type: 'SET_RESERVATION'; payload: Reservation | null }
  | { type: 'CLEAR_RESERVATION' }
  | { type: 'INCREMENT_VERSION' }; // 添加新的 action 类型

interface ReservationContextType extends ReservationState {
  updateReservation: (newReservation: Reservation) => void;
  fetchReservation: () => Promise<void>;
  clearReservation: () => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

function reservationReducer(state: ReservationState, action: ReservationAction): ReservationState {
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, userId: action.payload };
    case 'SET_RESERVATION':
      return { ...state, reservation: action.payload };
    case 'CLEAR_RESERVATION':
      return { ...state, reservation: null };
    case 'INCREMENT_VERSION':
      return { ...state, version: state.version + 1 };
    default:
      return state;
  }
}

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reservationReducer, {
    userId: null,
    reservation: null,
    version: 0, // 初始化版本号
  });

  useEffect(() => {
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      storedUserId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('userId', storedUserId);
    }
    dispatch({ type: 'SET_USER_ID', payload: storedUserId });
  }, []);

  const updateReservation = useCallback((newReservation: Reservation) => {
    console.log('ReservationContext: Updating reservation:', newReservation);
    dispatch({ type: 'SET_RESERVATION', payload: newReservation });
    dispatch({ type: 'INCREMENT_VERSION' }); // 增加版本号
  }, []);

  const fetchReservation = useCallback(async () => {
    if (!state.userId) return;

    try {
      console.log('ReservationContext: Fetching reservation for userId:', state.userId);
      const response = await fetch(`/api/reservations?userId=${state.userId}`);
      if (response.status === 404) {
        console.log('ReservationContext: No reservation found');
        if (state.reservation !== null) {
          dispatch({ type: 'CLEAR_RESERVATION' });
          dispatch({ type: 'INCREMENT_VERSION' });
        }
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch reservation');
      }

      const data = await response.json();
      console.log('ReservationContext: Fetched reservation:', data.reservation);
      
      // 只有当新获取的预定信息与当前状态不同时，才更新状态和版本号
      if (JSON.stringify(data.reservation) !== JSON.stringify(state.reservation)) {
        dispatch({ type: 'SET_RESERVATION', payload: data.reservation });
        dispatch({ type: 'INCREMENT_VERSION' });
      }
    } catch (err) {
      console.error('ReservationContext: Error fetching reservation:', err);
      if (state.reservation !== null) {
        dispatch({ type: 'CLEAR_RESERVATION' });
        dispatch({ type: 'INCREMENT_VERSION' });
      }
    }
  }, [state.userId, state.reservation]);

  const clearReservation = useCallback(() => {
    console.log('ReservationContext: Clearing reservation');
    dispatch({ type: 'CLEAR_RESERVATION' });
  }, []);

  return (
    <ReservationContext.Provider
      value={{
        ...state,
        updateReservation,
        fetchReservation,
        clearReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};
