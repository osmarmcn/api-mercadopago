import { PaymentInput, PaymentOutput } from '../../../domain/usecases/payment/IProcessPayment'

export interface PaymentGateway {
  request(data: PaymentInput): Promise<PaymentOutput>
}