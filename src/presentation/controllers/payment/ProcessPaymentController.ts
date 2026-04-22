
// src/presentation/controllers/payment/ProcessPaymentController.ts
import { IProcessPayment } from '../../../domain/usecases/payment/IProcessPayment'

export class ProcessPaymentController {
  constructor(private readonly processPayment: IProcessPayment) {}

  async handle(req: any, res: any) {
    try {
      const result = await this.processPayment.execute(req.body)
      return res.status(200).json(result)
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}