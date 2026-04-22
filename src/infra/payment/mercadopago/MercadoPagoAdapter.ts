
import { Preference, Payment, MercadoPagoConfig } from 'mercadopago'
import { PaymentGateway } from '../../../data/protocols/payment/PaymentGateway'
import { PaymentInput, PaymentOutput } from '../../../domain/usecases/payment/IProcessPayment'

export class MercadoPagoAdapter implements PaymentGateway {
  private preferenceClient: Preference
  private paymentClient: Payment

  constructor(accessToken: string) {
    const config = new MercadoPagoConfig({ accessToken })
    this.preferenceClient = new Preference(config)
    this.paymentClient = new Payment(config)
  }

  async request(data: PaymentInput): Promise<PaymentOutput> {
    const response = await this.preferenceClient.create({
      body: {
        items: [
          {
            id: 'item-1',
            title: data.description,
            quantity: 1,
            unit_price: data.transactionAmount
          }
        ],
        payer: { email: data.email }
      }
    })

    return {
      id: String(response.id),
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point
    }
  }

  async getPaymentStatus(paymentId: string): Promise<{ status: string }> {
    const response = await this.paymentClient.get({ id: paymentId })
    return {
      status: response.status! 
    }
  }
}