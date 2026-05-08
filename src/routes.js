import { lazy } from 'react'
import MainLayout from './layout/MainLayout'
const SignIn = lazy(() => import('./features/auth/components/SignIn'));
const Products = lazy(() => import('./features/products/pages/ProductsPage'));
const AddProducts = lazy(() => import('./features/products/pages/AddProducts'));
const updateProducts = lazy(() => import('./features/products/pages/UpdateProduct'));
const RestockPage = lazy(() => import('./features/inventory/pages/RestockPage'));
const POSPage = lazy(() => import('./features/sales/pages/POSPage'));
const NotFoundPage = lazy(() => import('./ui/NotFoundPage'));






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
                path: 'add-products',
                element: AddProducts,
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