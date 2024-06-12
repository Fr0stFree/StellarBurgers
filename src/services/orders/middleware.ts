import {wsMiddleware} from "../common/wsMiddleware.ts";
import {
  closePublicOrdersChannel,
  openPublicOrdersChannel,
  publicOrdersChannelClosed,
  publicOrdersChannelError,
  publicOrdersChannelOpened,
  publicOrdersChannelMessage,
  openPrivateOrdersChannel,
  closePrivateOrdersChannel,
  privateOrdersChannelOpened,
  privateOrdersChannelClosed,
  privateOrdersChannelError,
  privateOrdersChannelMessage,
} from "./slices.ts";
import type {TWSActions} from "../common/types.ts";
import {BACKEND_WS_BASE_URL} from "../common/const.ts";

const publicOrdersActions: TWSActions = {
  wsInit: openPublicOrdersChannel.type,
  wsClose: closePublicOrdersChannel.type,
  wsSendMessage: '',
  onOpen: publicOrdersChannelOpened.type,
  onClose: publicOrdersChannelClosed.type,
  onError: publicOrdersChannelError.type,
  onMessage: publicOrdersChannelMessage.type,
}
const privateOrdersActions: TWSActions = {
  wsInit: openPrivateOrdersChannel.type,
  wsClose: closePrivateOrdersChannel.type,
  wsSendMessage: '',
  onOpen: privateOrdersChannelOpened.type,
  onClose: privateOrdersChannelClosed.type,
  onError: privateOrdersChannelError.type,
  onMessage: privateOrdersChannelMessage.type,
}

export const publicOrdersMiddleware = wsMiddleware(publicOrdersActions, new URL(`${BACKEND_WS_BASE_URL}/orders/all`));
export const privateOrdersMiddleware = wsMiddleware(privateOrdersActions, (state) => {
  const token = state.auth.accessToken;
  if (!token) return new URL('');
  const url = new URL(`${BACKEND_WS_BASE_URL}/orders`);
  url.searchParams.set('token', token);
  return url;
});