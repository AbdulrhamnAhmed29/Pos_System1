import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const AuthGuard = ({ children, isPublic }) => {
    const token = Cookies.get('jwt'); // تأكد من اسم الكوكي اللي بتخزن فيه التوكن

    // لو الصفحة مش عامة (Protected) ومفيش توكن -> وديه اللوجين
    if (!isPublic && !token) {
        return <Navigate to="/login" replace />;
    }

    // لو المستخدم عامل لوجين وبيحاول يدخل صفحة اللوجين -> وديه الداشبورد
    if (isPublic && token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};