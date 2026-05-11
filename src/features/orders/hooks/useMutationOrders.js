import { useMutation } from '@tanstack/react-query';
import { servicesOrders } from '../servicesOrders/ServicesOrders';
import { useGetProducts } from "../../products/hooks/UseGetProducts"
import productService from '../../products/services/Services';




export const useOrderMutation = () => {

    const { data } = useGetProducts()
    const mutation = useMutation({
        mutationFn: async ({ orderData, cart }) => {
            const orderResponse = await servicesOrders.createOrder({
                data: {
                    total_price: orderData.totalPrice,
                    status_order: orderData.paymentStatus,
                    discount: orderData.discount,
                    final_price: orderData.finalPrice,
                    customer: orderData.customerName,
                    barcode: orderData.barcode
                }
            });

            const orderDocId = orderResponse?.documentId;




            const itemPromises = cart.map(async (item) => {
                // 1. cart product
                const originalProduct = data.find(p => p.documentId === item.documentId);
                let updatePayload = {};
                let targetDocId = item.documentId;

                const is_bulk = item.attribute_sets?.[0]?.name === "سايب";

                if (is_bulk) {
                    // if bulk parent discount 
                    const parentProductDocId = originalProduct?.parent_id;
                    const parentProduct = data.find((p) => p.documentId === parentProductDocId);

                    if (parentProduct) {
                        const currentStockInBulk = Number(parentProduct.bulk_quantity || 0);
                        // factor * quantity 

                        const conversionFactor = Number(item.attributes?.[0]?.conversion_factor || 1);

                        const itemStockFactor = conversionFactor * Number(item.quantity);
                        const finalStockInBulk = currentStockInBulk - itemStockFactor;

                        updatePayload = { bulk_quantity: finalStockInBulk };
                        targetDocId = parentProduct.documentId;
                    }
                } else {
                    //  if not bulk 
                    const currentStock = Number(originalProduct?.quantity || 0);
                    const itemStockInOrder = Number(item.quantity);
                    const finalStock = currentStock - itemStockInOrder;

                    updatePayload = { quantity: finalStock };
                }

                // 2.Order Item Payload
                const orderItemsPayload = {
                    data: {
                        order: orderDocId,
                        product: item.documentId,
                        quantityInOrder: item.quantity,
                        unit_price: item.cost_price,
                        sub_total: item.cost_price * item.quantity,
                        attribute_sets: item.attribute_sets?.[0]?.documentId
                    }
                };


                return Promise.all([
                    servicesOrders.createOrdersItems(orderItemsPayload),
                    productService.updateProduct(targetDocId, { data: updatePayload })
                ]);
            });

            return await Promise.all(itemPromises);
        },

    });

    return {
        createOrder: mutation.mutate,
        isLoading: mutation.isPending,
        isSuccess: mutation.isSuccess,
        error: mutation.error,
    };
};