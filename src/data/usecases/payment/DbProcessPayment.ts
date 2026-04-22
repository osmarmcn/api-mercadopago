
import { IProcessPayment, PaymentInput, PaymentOutput } from '../../../domain/usecases/payment/IProcessPayment'
import { PaymentGateway } from '../../protocols/payment/PaymentGateway'

export class DbProcessPayment implements IProcessPayment {
  constructor(private readonly gateway: PaymentGateway) {}

  async execute(data: PaymentInput): Promise<PaymentOutput> {
    
    const result = await this.gateway.request(data)
   
    return result
  }
}