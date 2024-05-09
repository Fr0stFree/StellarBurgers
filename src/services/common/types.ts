export type TRequestStatus = "idle" | "pending" | "succeeded" | "failed";

type TCommonBody = {
  success: boolean;
  message?: string;
}

export type TResponseBody<
  TDataType = {},
  TDataKey extends string = '',
> = TDataKey extends '' ? TCommonBody & TDataType : TCommonBody & { [key in TDataKey]: TDataType };
