import { lazy } from 'react'
import MainLayout from './layout/MainLayout'
const SignIn = lazy(() => import('./features/auth/components/SignIn'));
const Products = lazy(() => import('./features/products/pages/ProductsPage'));
const AddProducts = lazy(() => import('./features/products/pages/AddProducts'));
const updateProducts = lazy(() => import('./features/products/pages/UpdateProduct'));
const RestockPage = lazy(() => import('./features/inventory/pages/RestockPage'));
const POSPage = lazy(() => import('./features/sales/pages/POSPage'));
const ordersSales = lazy(() => import('./features/orders/Pages/SalesOrder'));
const orderDetails = lazy(() => import('./features/orders/components/OrderDetails'));
const orderUpdate = lazy(() => import('./features/orders/components/UpdateModal'));
const expenses = lazy(() => import('./features/expenses/expensesPage/ExpensesPage'));
const addexpense = lazy(() => import('./features/expenses/expensesPage/AddExpenses'));
const UpdateExpenses = lazy(() => import('./features/expenses/expensesPage/UpdateExpenses'));







const NotFoundPage = lazy(() => import('./ui/NotFoundPage'));






// مثال


export const routes = [
    {
        path: '/login',
        element: SignIn,
        isPublic: true,
    },
    {
        path: '/',
        element: MainLayout,
        isPublic: false,
        children: [
            {
                path: 'dashboard',
                element: () => <div>إحصائيات المحل</div>,
            },
            {
                path: 'products',
                element: Products,
            },
            {
                path: '/sales',
                element: ordersSales,
            },
            {
                path: '/orderDetails/:id',
                element: orderDetails,
            },
            {
                path: '/update_order/:id',
                element: orderUpdate,
            },

            {
                path: 'add-products',
                element: AddProducts,
            },
            {
                path: '/update_expenses/:id',
                element: UpdateExpenses,
            },
            {
                path: 'expense',
                element: expenses,
            },
            {
                path: '/addexpense',
                element: addexpense,
            },

            {
                path: 'restock',
                element: RestockPage,
            },
            {
                path: 'pos',
                element: POSPage,
            },

            {
                path: 'update-product/:id',
                element: updateProducts,
            },












        ]
    },
    {
        path: '*',
        element: NotFoundPage
    }
]