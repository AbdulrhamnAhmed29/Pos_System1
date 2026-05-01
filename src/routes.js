import { lazy } from 'react'
import MainLayout from './layout/MainLayout' // تأكد من المسار الصحيح

const SignIn = lazy(() => import('./features/auth/components/SignIn'));
const Products = lazy(() => import('./pages/Products')); // مثال
const finance = lazy(() => import('./pages/Finance'));
const orderpage = lazy(() => import('./pages/Sellspoint'));

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
                path: 'finance', 
                element: finance,
            },
            
            {
                path: 'Sellspoint', 
                element: orderpage,
            },






        ]
    },
    {
        path: '*',
        redirect: '/login'
    }
]