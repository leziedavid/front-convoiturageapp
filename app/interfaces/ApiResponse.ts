// app/interfaces/ApiResponse.ts
export interface BaseResponse<T> {
    success: any;
    code?: number;
    messages?: string;
    data?: T;
    total: number;
}
