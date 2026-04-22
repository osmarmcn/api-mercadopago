

export interface PaymentInput {
  transactionAmount: number
  description: string
  email: string
  paymentMethodId: 'pix' | 'master' | 'visa'
}

export interface PaymentOutput {
  id: string
  initPoint?: string
  sandboxInitPoint?: string
}

export interface IProcessPayment {
  execute(data: PaymentInput): Promise<PaymentOutput>
}