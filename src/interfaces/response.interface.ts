// ใช้เป็น response มาตรฐานทุก endpoint
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}
