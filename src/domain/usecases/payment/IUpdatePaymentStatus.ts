
// src/domain/usecases/payment/IUpdatePaymentStatus.ts
export interface IUpdatePaymentStatus {
  execute(paymentId: string): Promise<void>;
}