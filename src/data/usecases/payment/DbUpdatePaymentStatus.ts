
// src/data/usecases/payment/DbUpdatePaymentStatus.ts
import { IUpdatePaymentStatus } from '../../../domain/usecases/payment/IUpdatePaymentStatus'
import { PaymentGateway } from '../../protocols/payment/PaymentGateway'

export class DbUpdatePaymentStatus implements IUpdatePaymentStatus {
  constructor(private readonly gateway: any) {} 

  async execute(paymentId: string): Promise<void> {
    const { status } = await this.gateway.getPaymentStatus(paymentId)
    
    console.log(`Pagamento ${paymentId} está com status: ${status}`)

    if (status === 'approved') {
     
      console.log('Liberação de produto confirmada!')
    }
  }
}