
import { Router } from 'express'
import { makePaymentController, makeWebhookController, makeGetPaymentStatusController } from '../factories/payment/paymentFactory'

export default (router: Router): void => {
  const paymentController = makePaymentController()
  const webhookController = makeWebhookController()
  const getPaymentStatusController = makeGetPaymentStatusController()

 
  router.get('/payments/:id', (req, res) => getPaymentStatusController.handle(req, res))

  
  router.post('/payments', (req, res) => paymentController.handle(req, res))

  
  router.post('/payments/webhook', (req, res) => webhookController.handle(req, res))
}
