// src/presentation/controllers/payment/GetPaymentStatusController.ts
import { IGetPaymentStatus } from '../../../domain/usecases/payment/IGetPaymentStatus';

export class GetPaymentStatusController {
  constructor(private readonly getPaymentStatus: IGetPaymentStatus) {}

  async handle(req: any, res: any) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ error: 'Missing payment ID' })
      }

      const result = await this.getPaymentStatus.execute(id)
      return res.status(200).json(result)
    } catch (error: any) {
      console.error('Error fetching payment status:', error)
      return res.status(400).json({ error: error.message })
    }
  }
}
