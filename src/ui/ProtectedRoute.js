import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    // جلب التوكن من الكوكيز (تأكد من اسم الكوكي المستخدم عندك)
    const token = Cookies.get('jwt'); 

    if (!token) {
        // لو مفيش توكن، يرجعه لصفحة اللوجين
        return <Navigate to="/login" replace />;
    }

    // لو التوكن موجود، يعرض المحتوى (المنتجات مثلاً)
    return children;
};

export default ProtectedRoute;