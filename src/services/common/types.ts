export type TRequestStatus = "idle" | "pending" | "succeeded" | "failed";
export type TWSChannelState = "connecting" | "open" | "closing" | "closed";

type TCommonBody = {
  success: boolean;
  message?: string;
}

export type TResponseBody<
  TDataType = {},
  TDataKey extends string = '',
> = TDataKey extends '' ? TCommonBody & TDataType : TCommonBody & { [key in TDataKey]: TDataType };

export type TWSActions = {
  wsInit: string,
  wsClose: string,
  wsSendMessage: string,
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string,
};
