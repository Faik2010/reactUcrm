import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

// Redux
import { loginUser } from '../../slices/auth/login/thunk';
import { clearError } from '../../slices/auth/login/reducer';
import { RootState } from '../../slices';
import { LoginFormData } from '../../slices/auth/login/thunk';

// Helpers
import { isMainTokenValid, isAccessTokenValid } from '../../helpers/jwt-token-access/jwtHelper';

// Assets
import logoSm from "../../assets/images/logo-sm.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

// Validation Schema
const loginSchema = Yup.object().shape({
    memberNumber: Yup.string()
        .required('Üye numarası gereklidir')
        .min(3, 'Üye numarası en az 3 karakter olmalıdır'),
    email: Yup.string()
        .email('Geçerli bir e-posta adresi giriniz')
        .required('E-posta adresi gereklidir'),
    password: Yup.string()
        .required('Şifre gereklidir')
        .min(6, 'Şifre en az 6 karakter olmalıdır'),
});

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.Login);
    
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    // Initial form values
    const initialValues: LoginFormData = {
        memberNumber: '',
        email: '',
        password: '',
    };

    // Check if user is already authenticated
    useEffect(() => {
        if (isAuthenticated || (isMainTokenValid() && isAccessTokenValid())) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    // Clear error when component unmounts
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    // Handle form submission
    const handleSubmit = async (values: LoginFormData) => {
        try {
            const result = await dispatch(loginUser(values) as any);
            
            if (result.success) {
                // Başarılı giriş - yönlendirme yap
                const firstPageUrl = result.data?.firstPageUrl || '/dashboard';
                navigate(firstPageUrl);
            }
        } catch (error) {
            console.error('Login submission error:', error);
        }
    };

    return (
        <div className="relative">
            <div className="flex flex-col min-h-screen py-6 bg-slate-50 dark:bg-zink-800 dark:text-zink-100">
                <div className="container mx-auto flex-1 flex flex-col justify-center">
                    <div className="flex justify-center">
                        <div className="max-w-md w-full">
                            <div className="bg-white dark:bg-zink-700 shadow-md rounded-lg border border-slate-200 dark:border-zink-500">
                                {/* Logo Section */}
                                <div className="px-6 py-8 text-center border-b border-slate-200 dark:border-zink-500">
                                    <Link to="/" className="inline-block">
                                        <img src={logoSm} alt="UCRM" className="block h-8 mx-auto dark:hidden" />
                                        <img src={logoDark} alt="UCRM" className="hidden h-8 mx-auto dark:block" />
                                    </Link>
                                    <h5 className="mt-6 text-lg font-semibold text-slate-800 dark:text-zink-100">
                                        Hoş Geldiniz!
                                    </h5>
                                    <p className="text-slate-500 dark:text-zink-200 mt-1">
                                        Hesabınıza giriş yapın
                                    </p>
                                </div>

                                {/* Form Section */}
                                <div className="px-6 py-8">
                                    {/* Error Alert */}
                                    {error && (
                                        <div className="mb-6 px-4 py-3 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-red-800/20 dark:border-red-700 dark:text-red-400">
                                            <div className="flex">
                                                <div className="ml-3">
                                                    <p className="font-medium">Giriş Hatası</p>
                                                    <p className="mt-1">{error}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={loginSchema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ isSubmitting, errors, touched }) => (
                                            <Form className="space-y-5">
                                                {/* Member Number Field */}
                                                <div>
                                                    <label htmlFor="memberNumber" className="inline-block mb-2 text-base font-medium text-slate-600 dark:text-zink-200">
                                                        Üye Numarası <span className="text-red-500">*</span>
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        id="memberNumber"
                                                        name="memberNumber"
                                                        placeholder="Üye numaranızı giriniz"
                                                        className={`form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 ${errors.memberNumber && touched.memberNumber ? 'border-red-500 dark:border-red-500' : ''}`}
                                                        disabled={loading}
                                                    />
                                                    <ErrorMessage name="memberNumber" component="div" className="mt-1 text-sm text-red-500" />
                                                </div>

                                                {/* Email Field */}
                                                <div>
                                                    <label htmlFor="email" className="inline-block mb-2 text-base font-medium text-slate-600 dark:text-zink-200">
                                                        E-posta Adresi <span className="text-red-500">*</span>
                                                    </label>
                                                    <Field
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        placeholder="E-posta adresinizi giriniz"
                                                        className={`form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 ${errors.email && touched.email ? 'border-red-500 dark:border-red-500' : ''}`}
                                                        disabled={loading}
                                                    />
                                                    <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
                                                </div>

                                                {/* Password Field */}
                                                <div>
                                                    <label htmlFor="password" className="inline-block mb-2 text-base font-medium text-slate-600 dark:text-zink-200">
                                                        Şifre <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <Field
                                                            type={showPassword ? "text" : "password"}
                                                            id="password"
                                                            name="password"
                                                            placeholder="Şifrenizi giriniz"
                                                            className={`form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 pr-12 ${errors.password && touched.password ? 'border-red-500 dark:border-red-500' : ''}`}
                                                            disabled={loading}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            disabled={loading}
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="w-5 h-5 text-slate-400 hover:text-slate-600 dark:text-zink-300 dark:hover:text-zink-100" />
                                                            ) : (
                                                                <Eye className="w-5 h-5 text-slate-400 hover:text-slate-600 dark:text-zink-300 dark:hover:text-zink-100" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
                                                </div>

                                                {/* Remember Me & Forgot Password */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="remember-me"
                                                            name="remember-me"
                                                            type="checkbox"
                                                            checked={rememberMe}
                                                            onChange={(e) => setRememberMe(e.target.checked)}
                                                            className="w-4 h-4 text-custom-600 border-slate-300 rounded focus:ring-custom-500 dark:focus:ring-custom-600 dark:ring-offset-zink-800 focus:ring-2 dark:bg-zink-700 dark:border-zink-600"
                                                            disabled={loading}
                                                        />
                                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 dark:text-zink-200">
                                                            Beni hatırla
                                                        </label>
                                                    </div>

                                                    <div className="text-sm">
                                                        <Link
                                                            to="/forgot-password"
                                                            className="font-medium text-custom-600 hover:text-custom-500 dark:text-custom-400 dark:hover:text-custom-300"
                                                        >
                                                            Şifremi unuttum?
                                                        </Link>
                                                    </div>
                                                </div>

                                                {/* Login Button */}
                                                <div className="mt-8">
                                                    <button
                                                        type="submit"
                                                        disabled={loading || isSubmitting}
                                                        className="w-full px-4 py-3 text-base font-medium text-white bg-custom-500 border border-custom-500 rounded-md hover:bg-custom-600 hover:border-custom-600 focus:outline-none focus:ring-2 focus:ring-custom-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-zink-800 transition-colors duration-200"
                                                    >
                                                        {loading ? (
                                                            <div className="flex items-center justify-center">
                                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                                Giriş yapılıyor...
                                                            </div>
                                                        ) : (
                                                            'Giriş Yap'
                                                        )}
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>

                                {/* Footer */}
                                <div className="px-6 py-4 text-center bg-slate-50 dark:bg-zink-600 border-t border-slate-200 dark:border-zink-500 rounded-b-lg">
                                    <p className="text-slate-500 dark:text-zink-200 text-sm">
                                        Hesabınız yok mu?{' '}
                                        <Link
                                            to="/register"
                                            className="font-medium text-custom-600 hover:text-custom-500 dark:text-custom-400 dark:hover:text-custom-300"
                                        >
                                            Kayıt olun
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-slate-500 dark:text-zink-200">
                    <p>&copy; {new Date().getFullYear()} UCRM. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
