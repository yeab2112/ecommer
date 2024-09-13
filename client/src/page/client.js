import paypal from '@paypal/checkout-server-sdk';

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function createOrder() {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '100.00', 
                breakdown: {
                    item_total: {
                        currency_code: 'USD',
                        value: '100.00'
                    }
                }
            },
            items: [{
                name: 'Item Name',
                description: 'Item Description',
                unit_amount: {
                    currency_code: 'USD',
                    value: '100.00',
                },
                quantity: '1'
            }]
        }]
    });

    try {
        const response = await client.execute(request);
        console.log('Order ID:', response.result.id);
        return response.result.id; 
    } catch (error) {
        console.error('Error creating order:', error);
        throw error; 
    }
}
