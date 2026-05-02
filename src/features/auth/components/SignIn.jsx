import { useLogin } from '../hooks/useAuth';
import SignInForm from './SignInForm';
import {   Fuel } from 'lucide-react';

const SignIn = () => {
    const loginMutation = useLogin();

    return (
        <div className="relative min-h-screen bg-[#FAFAFA] flex items-center justify-center  sm:px-6 lg:px-8 overflow-hidden font-sans" dir="rtl">
            
            {/* إضاءات ذهبية وفضية خافتة في الزوايا */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-zinc-200/50 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-md w-full space-y-10 relative z-10">
                
                {/* قسم الهوية واللوجو */}
                <div className="text-center">
                   
                    
                    <div className="mt-8 space-y-2">
                        <h2 className="text-4xl font-black text-zinc-900 tracking-tight italic">
                            ادارة  <span className="text-[#D4AF37]">زيوت </span> العربيات 
                        </h2>
                        <div className="flex items-center justify-center gap-3">
                            <span className="h-[1px] w-10 bg-zinc-200"></span>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                                Arabiyat Oil Systems
                            </p>
                            <span className="h-[1px] w-10 bg-zinc-200"></span>
                        </div>
                    </div>
                </div>

                {/* حاوية النموذج (Premium White Glass Card) */}
                <div className="relative">
                    {/* طبقة حماية جمالية خلف الكارت */}
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-100 to-transparent rounded-[2.5rem] blur-sm -rotate-1 opacity-50"></div>
                    
                    <div className="relative bg-white/80 backdrop-blur-xl py-12 px-10 shadow-custom rounded-[1.5rem] border border-white flex flex-col items-center">
                        
                      

                        <div className="w-full ">
                            <SignInForm loginMutation={loginMutation} />
                        </div>

                       
                    </div>
                </div>

                {/* فوتر الصفحة */}
                <div className="text-center space-y-4">
                    <p className="text-[11px] text-zinc-400 font-medium">
                        جميع الحقوق محفوظة © 2026 <span className="text-zinc-900 font-bold">لمحل زيوت العربيات</span>
                    </p>
                </div>
            </div>

            {/* أيقونة وقود خفيفة في زاوية الشاشة كديكور */}
            <Fuel className="absolute -bottom-10 -right-10 h-64 w-64 text-zinc-100 -rotate-12 pointer-events-none" />
        </div>
    );
};

export default SignIn;