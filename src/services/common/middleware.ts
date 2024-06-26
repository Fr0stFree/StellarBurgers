import {type Middleware, type MiddlewareAPI} from 'redux';
import {type PayloadAction} from "@reduxjs/toolkit";

import {type TAppDispatch, type TRootState} from '../../hooks';
import {type TWSActions} from "./types";
import {INVALID_TOKEN_NOTIFICATION} from "./const";
import {refreshAccessTokenThunk} from "../auth/thunks";

export function genericWSMiddleware(actions: TWSActions): Middleware {
  return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket;
    let url: string;
    return next => (action: PayloadAction<unknown>) => {
      const {dispatch} = store;
      const {type, payload} = action;
      const {wsInit, wsClose, wsSendMessage, onOpen, onClose, onError, onMessage} = actions;

      if (type === wsInit) {
        url = payload as string;
        socket = new WebSocket(url);
        console.log(`Connecting to websockets on ${url}...`)
      }

      if (socket) {
        socket.onopen = _ => {
          console.log(`Successfully connected to ws channel on ${url}`)
          dispatch({type: onOpen});
        };

        socket.onerror = _ => {
          console.log(`An error occurred on ${url}...`)
          // TODO: Is it something useful I can extract from the event?
          dispatch({type: onError, payload: "WebsocketError"});
        };

        socket.onmessage = event => {
          console.log(`New message received from ${url}...`)
          const message = JSON.parse(event.data);
          if (message['success']) {
            dispatch({type: onMessage, payload: message});
          } else if (message['message'] === INVALID_TOKEN_NOTIFICATION) {
            console.log('Retrying to connect to websockets...')
            dispatch(refreshAccessTokenThunk());
          } else {
            console.log(`Error message received from ${url}: ${message['message']}`)
            dispatch({type: onError, payload: message['message']});
          }
        };

        socket.onclose = _ => {
          console.log(`Connection closed to ${url}...`)
          dispatch({type: onClose});
        };

        if (type === wsSendMessage && socket.readyState === WebSocket.OPEN) {
          console.log(`Sending message '${payload}' to ${url}...`)
          socket.send(JSON.stringify(payload));
        }

        if (type === wsClose && socket.readyState === WebSocket.OPEN) {
          console.log(`Closing connection to ${url}...`)
          socket.close();
        }
      }
      next(action);
    };
  }) as Middleware;
}
