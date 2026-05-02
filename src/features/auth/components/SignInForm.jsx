import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useLogin } from '../hooks/useAuth'
import { Eye, EyeOff, Mail, Lock, AlertTriangle, Loader2 } from 'lucide-react'
import { useState } from 'react'

const schema = yup.object({
  identifier: yup
    .string()
    .required('البريد الإلكتروني مطلوب ')
    .email('تنسيق البريد الإلكتروني غير صحيح'),
  password: yup
    .string()
    .required('كلمة المرور مطلوبة ')
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
})

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const loginMutation = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    loginMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6  text-right" dir="rtl">
      {/* حقل البريد الإلكتروني */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-stone-800 mr-1">
          البريد الإلكتروني
        </label>
        <div className="relative group">
          <input
            {...register('identifier')}
            type="email"
            // اللون هنا أصبح رمادي متوسط (zinc-800) ليكون واضحاً ومميزاً عن الخلفية السوداء
            className="w-full rounded-xl border border-zinc-700  bg-zinc-200 px-4 py-4 text-black placeholder:text-zinc-500 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] pr-12 transition-all duration-300 outline-none"
            placeholder="mohmed@gmail.com"
          />
          <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors" />
        </div>
        {errors.identifier && (
          <p className="mt-1 text-xs text-red-400 mr-1">{errors.identifier.message}</p>
        )}
      </div>

      {/* حقل كلمة السر */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold  text-stone-800 mr-1">
          كلمة السر
        </label>
        <div className="relative group">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-200 px-4 py-4 text-black placeholder:text-zinc-500 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] pr-12 transition-all duration-300 outline-none"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-[#D4AF37] transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
          <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors" />
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-400 mr-1">{errors.password.message}</p>
        )}
      </div>

      {/* الزر الرئيسي بتصميم ذهبي لامع */}
      <button
        type="submit"
        disabled={loginMutation.isLoading}
        className="w-full relative flex justify-center items-center gap-3 overflow-hidden rounded-xl bg-[#D4AF37] hover:bg-[#C19A2E] py-4 px-6 text-base font-bold text-black shadow-lg shadow-black/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
      >
        {loginMutation.isLoading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            <span>جاري التحقق...</span>
          </>
        ) : (
          <span>تسجيل الدخول</span>
        )}
      </button>

      {/* رسالة الخطأ */}
      {loginMutation.isError && (
        <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-xl flex items-center gap-3 mt-4">
          <AlertTriangle className="h-5 w-5 text-red-800 flex-shrink-0" />
          <p className="text-sm text-red-700 font-bold">
            خطأ في البيانات، يرجى المحاولة مرة أخرى.
          </p>
        </div>
      )}
    </form>
  )
}

export default SignInForm