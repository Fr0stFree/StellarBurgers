import {genericWSMiddleware} from "../common/middleware";
import {
  closePrivateOrdersChannel,
  closePublicOrdersChannel,
  openPrivateOrdersChannel,
  openPublicOrdersChannel,
  privateOrdersChannelClosed,
  privateOrdersChannelError,
  privateOrdersChannelMessage,
  privateOrdersChannelOpened,
  publicOrdersChannelClosed,
  publicOrdersChannelError,
  publicOrdersChannelMessage,
  publicOrdersChannelOpened,
} from "./slices";
import type {TWSActions} from "../common/types";

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
