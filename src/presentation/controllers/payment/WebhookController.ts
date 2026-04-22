

import { IUpdatePaymentStatus } from '../../../domain/usecases/payment/IUpdatePaymentStatus';

export class WebhookController {
  constructor(private readonly updatePaymentStatus: IUpdatePaymentStatus) {}

  async handle(req: any, res: any) {
    try {
      const { action, data } = req.body

      
      if (action === 'payment.created' || action === 'payment.updated' || req.query.topic === 'payment') {
        const paymentId = data?.id || req.query.id
        if (paymentId) {
          await this.updatePaymentStatus.execute(paymentId)
        }
      }

      
      return res.status(200).send()
    } catch (error) {
      console.error('Webhook Error:', error)
      return res.status(200).send()
    }
  }
}