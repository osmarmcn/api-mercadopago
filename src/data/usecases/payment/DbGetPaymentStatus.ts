// src/data/usecases/payment/DbGetPaymentStatus.ts
import { IGetPaymentStatus } from '../../../domain/usecases/payment/IGetPaymentStatus';
import { PaymentGateway } from '../../protocols/payment/PaymentGateway';

export class DbGetPaymentStatus implements IGetPaymentStatus {
  constructor(private readonly gateway: PaymentGateway) {}

  async execute(paymentId: string): Promise<{ status: string }> {
    return await this.gateway.getPaymentStatus(paymentId);
  }
}
