import {genericWSMiddleware} from "../common/middleware.ts";
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

export const publicOrdersMiddleware = genericWSMiddleware(publicOrdersActions);
export const privateOrdersMiddleware = genericWSMiddleware(privateOrdersActions);
