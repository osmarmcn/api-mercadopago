// src/domain/usecases/payment/IGetPaymentStatus.ts
export interface IGetPaymentStatus {
  execute(paymentId: string): Promise<{ status: string }>;
}
