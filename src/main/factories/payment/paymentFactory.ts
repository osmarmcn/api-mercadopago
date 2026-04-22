import { DbProcessPayment } from '../../../data/usecases/payment/DbProcessPayment'
import { DbUpdatePaymentStatus } from '../../../data/usecases/payment/DbUpdatePaymentStatus'
import { DbGetPaymentStatus } from '../../../data/usecases/payment/DbGetPaymentStatus'
import { MercadoPagoAdapter } from '../../../infra/payment/mercadopago/MercadoPagoAdapter'
import { ProcessPaymentController } from '../../../presentation/controllers/payment/ProcessPaymentController'
import { WebhookController } from '../../../presentation/controllers/payment/WebhookController'
import { GetPaymentStatusController } from '../../../presentation/controllers/payment/GetPaymentStatusController'

export const makePaymentController = (): ProcessPaymentController => {
  const token = process.env.MP_ACCESS_TOKEN

  if (!token) {
    console.error("❌ ERRO: Variável MP_ACCESS_TOKEN não encontrada no .env");
  }

  const gateway = new MercadoPagoAdapter(token as string)
  const usecase = new DbProcessPayment(gateway)
  return new ProcessPaymentController(usecase)
};

export const makeWebhookController = (): WebhookController => {
  const token = process.env.MP_ACCESS_TOKEN || ''
  const gateway = new MercadoPagoAdapter(token)
  const usecase = new DbUpdatePaymentStatus(gateway)
  return new WebhookController(usecase)
};

export const makeGetPaymentStatusController = (): GetPaymentStatusController => {
  const token = process.env.MP_ACCESS_TOKEN || ''
  const gateway = new MercadoPagoAdapter(token)
  const usecase = new DbGetPaymentStatus(gateway)
  return new GetPaymentStatusController(usecase)
};
