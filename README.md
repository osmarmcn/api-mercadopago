# 🚀 API Mercado Pago - Checkout Pro com Clean Architecture

Bem-vindo à sua API de pagamentos construída com os mais altos padrões de arquitetura de software (**Clean Architecture** e princípios **SOLID**)!

Esta API foi criada para ser a ponte segura entre o seu futuro Front-end e o **Mercado Pago**, processando pagamentos via **Checkout Pro** (onde o cliente paga em um ambiente seguro hospedado pelo Mercado Pago) e mantendo as suas credenciais secretas sempre seguras no seu backend.

---

## 📌 Índice
1. [Funcionalidades Principais](#funcionalidades)
2. [Como funciona a Arquitetura](#arquitetura)
3. [Configurando a sua Conta do Mercado Pago](#mercadopago)
4. [Instalando e Rodando o Projeto](#rodando)
5. [Testando a API (Rotas)](#rotas)

---

<a name="funcionalidades"></a>
## ✨ 1. Funcionalidades Principais
* **`POST /payments`**: Cria um link de pagamento "Checkout Pro". Devolve um link para cliente de verdade (`initPoint`) e um link Sandbox de testes (`sandboxInitPoint`).
* **`GET /payments/:id`**: Consulta no servidor do Mercado Pago o status em tempo real do pagamento que você acabou de gerar.
* **`POST /payments/webhook`**: Recebe notificações invisíveis do Mercado Pago sempre que uma fatura é paga, permitindo que a sua API dê baixa no banco de dados automaticamente.

---

<a name="arquitetura"></a>
## 🏗 2. Entendendo a Clean Architecture do Projeto
O projeto está dividido em camadas para que você possa trocar de banco de dados, biblioteca ou framework sem quebrar o código:
* **Domain:** As regras do seu negócio e as Interfaces do que precisa acontecer.
* **Data (UseCases):** É onde a mágica acontece. A inteligência que une o Gateway e o Banco de Dados.
* **Infra:** A camada "suja". É aqui que o código fala diretamente com o pacote do `mercadopago`. Se um dia você mudar para a Stripe ou Pagar.me, apenas essa pasta é alterada!
* **Presentation (Controllers):** É a portaria. Recebe as requisições HTTP (`req, res`), valida, manda para os UseCases e retorna para o Postman.
* **Main:** O "maestro" do projeto. Fica responsável por inicializar tudo, instanciar as fábricas (Factories) e subir o servidor Express.

---

<a name="mercadopago"></a>
## 🛠 3. Configurando a sua Conta do Mercado Pago
Para que a API ganhe vida, ela precisa de uma chave secreta do Mercado Pago.
**ATENÇÃO:** Nunca coloque essa chave em repositórios públicos no GitHub!

**Passo a passo no Mercado Pago:**
1. Acesse o **Painel do Desenvolvedor** do Mercado Pago (`developers.mercadopago.com.br`).
2. Vá em **Suas Integrações** e crie uma "Nova Aplicação".
3. **MUITO IMPORTANTE:** Para desenvolvimento, **não** use as credenciais de Produção. Vá no menu lateral e clique em **Credenciais de Teste**.
4. Copie o valor do **Access Token**. Ele é gigante e **OBRIGATORIAMENTE** começa com a palavra `TEST-...`.

**Configurando o projeto:**
1. Na pasta raiz do projeto, crie um arquivo chamado **extamente** `.env` (não pode ser `.env.txt`).
2. Cole a chave da seguinte forma (sem aspas):
```env
MP_ACCESS_TOKEN=TEST-coloque-seu-token-aqui
PORT=3000
```

---

<a name="rodando"></a>
## 💻 4. Instalando e Rodando o Projeto

Se você acabou de baixar o projeto:
```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento (que escuta alterações em tempo real)
npm run dev
```
Se tudo estiver correto, o terminal mostrará `Server running at http://localhost:3000`.

---

<a name="rotas"></a>
## 🎯 5. Testando a API (Como usar)

Abra o seu Postman (ou Insomnia) e vamos fazer o ciclo completo:

### A) Criando um link de pagamento
* **Método:** `POST`
* **URL:** `http://localhost:3000/payments`
* **Body (JSON):**
```json
{
  "transactionAmount": 150.90,
  "description": "Curso Completo de Programação",
  "email": "comprador_teste@email.com"
}
```
* **O que acontece:** Você receberá como resposta o `initPoint` e o `sandboxInitPoint`, além do `id` gerado pelo Mercado Pago.

### B) Simule o Pagamento no Navegador
1. Pegue o link **`sandboxInitPoint`** que a API te devolveu.
2. Cole no seu navegador. A tela do Checkout do Mercado Pago abrirá no modo teste.
3. Use os [Cartões de Teste Oficiais](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards) do Mercado Pago para efetuar a compra com dados falsos.

### C) Verifique se o status do pagamento mudou!
* **Método:** `GET`
* **URL:** `http://localhost:3000/payments/COLOQUE-O-ID-AQUI` (Substitua COLOQUE-O-ID-AQUI pelo "id" que o Mercado Pago gerou na etapa A).
* **O que acontece:** A API vai consultar os servidores do Mercado Pago em tempo real e, se você finalizou a compra no passo anterior, ela devolverá `{ "status": "approved" }`.

---

**Desenvolvido com 💙 para estudos de Arquitetura Limpa e Gateways de Pagamento!**
