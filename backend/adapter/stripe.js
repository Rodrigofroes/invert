import Stripe from 'stripe';
import 'dotenv/config';

export default class PagamentoAdapter {
    #stripe;
    constructor() {
        this.#stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }

    async pagamento(valor, descricao) {
        try {
            if (valor && descricao) {
                const payment = await this.#stripe.paymentIntents.create({
                    amount: Math.round(valor * 100),
                    currency: "brl",
                    description: descricao,
                    payment_method_types: ["card"],
                });
                return payment;
            } else {
                throw new Error("Parametros invalidos");
            }
        } catch (ex) {
            throw new Error("Parametros invalidos");
        }
    }
}