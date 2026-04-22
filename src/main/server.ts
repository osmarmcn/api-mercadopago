
import 'dotenv/config'
import express, { Router } from 'express'
import cors from 'cors'
import setupPaymentRoutes from './routes/PaymentRouter'


const app = express()
const router = Router()

app.use(cors());
app.use(express.json())


router.get('/', (req, res) => {
  res.send({ message: 'API Mercado Pago Clean Arch - Online' })
})



setupPaymentRoutes(router)
app.use('/', router)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))