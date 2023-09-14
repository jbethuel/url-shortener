export type BaseResponse<T> = {
  type: 'Success' | 'Rejected' | 'Error';
  message: string | undefined;
  data: T;
};
