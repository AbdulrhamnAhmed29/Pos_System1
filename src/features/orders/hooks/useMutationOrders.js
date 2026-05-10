import { useMutation } from '@tanstack/react-query';
import { servicesOrders } from '../servicesOrders/ServicesOrders';

export const useOrderMutation = () => {
    const mutation = useMutation({
        mutationFn: async ({ orderData, cart }) => {
            const orderResponse = await servicesOrders.createOrder({
                data: {
                    total_price: orderData.totalPrice,
                    status_order: orderData.paymentStatus,
                    discount: orderData.discount,
                    final_price: orderData.finalPrice,
                    customer: orderData.customerName,
                }
            });
            
            const orderDocId =  orderResponse.documentId;
            
            

            const itemPromises = cart.map(item => {
                const orderItemsPayload = {
                    data: {
                        order:orderDocId ,
                        product: item.documentId,
                        quantity: item.quantity,
                        unit_price: item.cost_price,
                        sub_total: item.cost_price * item.quantity,
                        attribute_sets:item.attribute_sets?.[0].documentId
                    }
                };

                return servicesOrders.createOrdersItems(orderItemsPayload);
            });
            return await Promise.all(itemPromises);
        },
        onSuccess: (data) => {
            console.log('Order created successfully:', data);
        },
        onError: (error) => {
            console.error('Failed to create order:', error);
        }
    });

    return {
        createOrder: mutation.mutate,
        isLoading: mutation.isPending,
        isSuccess: mutation.isSuccess,
        error: mutation.error,
    };
};