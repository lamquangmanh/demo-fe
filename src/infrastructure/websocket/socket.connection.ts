'use client';

import { io, Socket } from 'socket.io-client';

import { CONFIGS } from '@/common/configs';
import { eventEmitter } from '@/common/utils';

let socket: Socket | null = null;

export function initializeSocket(): Socket {
  if (!socket) {
    socket = io(CONFIGS.NEXT_PUBLIC_WS_URL!, {
      withCredentials: true,
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });
  }

  // This event is fired by the Socket instance upon connection and reconnection.
  socket.on('connect', () => {
    console.log('WebSocket connected:', socket?.id);
    eventEmitter.emit('connect', socket?.id);
  });

  // This event is fired upon disconnection.
  socket.on('disconnect', (reason) => {
    console.log('WebSocket disconnected:', reason);
    eventEmitter.emit('disconnect', reason);
  });

  // Fired upon an attempt to reconnect.
  socket.on('reconnect_attempt', (attempt) => {
    console.log(`WebSocket reconnect attempt #${attempt}`);
    eventEmitter.emit('reconnect_attempt', attempt);
  });

  // Fired upon a successful reconnection.
  socket.on('reconnect', (attempt) => {
    console.log('reconnected after', attempt);
    eventEmitter.emit('reconnect', attempt);
  });

  return socket;
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export { socket };
