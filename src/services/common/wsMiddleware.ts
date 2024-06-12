import type {Middleware, MiddlewareAPI} from 'redux';
import {PayloadAction} from "@reduxjs/toolkit";

import type {TAppDispatch, TRootState} from '../../hooks.ts';
import {type TWSActions} from "./types.ts";

export const wsMiddleware: (
  actions: TWSActions,
  url: URL | ((state: TRootState) => URL)
) => Middleware = (actions, getUrl) => {
  return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket;
    let url: URL;
    return next => (action: PayloadAction<unknown>) => {
      const {dispatch, getState} = store;
      const {type, payload} = action;
      const {wsInit, wsClose, wsSendMessage, onOpen, onClose, onError, onMessage} = actions;

      if (type === wsInit) {
        typeof getUrl === 'function' ? url = getUrl(getState()) : url = getUrl;
        socket = new WebSocket(url);
        console.log(`Connecting to websockets on ${url}...`)
      }

      if (socket) {
        socket.onopen = event => {
          console.log(`Successfully connected to ws channel on ${url}`)
          dispatch({type: onOpen });
        };

        socket.onerror = event => {
          console.log(`An error occurred: ${event}`)
          dispatch({type: onError, payload: event});
        };

        socket.onmessage = event => {
          console.log("New message received")
          dispatch({type: onMessage, payload: JSON.parse(event.data)});
        };

        socket.onclose = event => {
          console.log("Connection closed")
          dispatch({type: onClose});
        };

        if (type === wsSendMessage && socket.readyState === WebSocket.OPEN) {
          console.log(`Sending message '${payload}'...`)
          socket.send(JSON.stringify(payload));
        }

        if (type === wsClose) {
          console.log("Closing connection...")
          socket.close();
        }
      }
      next(action);
    };
  }) as Middleware;
};
