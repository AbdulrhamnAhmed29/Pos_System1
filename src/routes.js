import { lazy } from 'react'
import MainLayout from './layout/MainLayout'

const SignIn = lazy(() => import('./features/auth/components/SignIn'));
const Products = lazy(() => import('./features/products/pages/ProductsPage'));
const RestockPage = lazy(() => import('./features/inventory/pages/RestockPage'));
const POSPage = lazy(() => import('./features/sales/pages/POSPage'));
const finance = lazy(() => import('./pages/Finance'));
const orderpage = lazy(() => import('./pages/Sellspoint'));
const sells = lazy(() => import('./pages/Sells'));
const Expense = lazy(() => import('./pages/Expense'));



// مثال


export const routes = [
    {
        path: '/login',
        element: SignIn,
        isPublic: true,
    },
    {
        path: '/', // الأب (Layout)
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
                path: 'restock', 
                element: RestockPage,
            },
            {
                path: 'pos', 
                element: POSPage,
            },



            {
                path: 'finance', 
                element: finance,
            },
            
            {
                path: 'Sellspoint', 
                element: orderpage,
            },
            {
                path: 'sells', 
                element: sells,
            },
              {
                path: 'sells', 
                element: sells,
            },
              {
                path: 'expense', 
                element: Expense,
            }






        ]
    },
    {
        path: '*',
        redirect: '/login'
    }
]