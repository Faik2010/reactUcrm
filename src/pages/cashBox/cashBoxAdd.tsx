import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { defaultInputClassName, defaultButtonClassName } from '../../Common/constants/classNames';
import { createCashBox } from '../../slices/cashBox/thunk';

const CashBoxAdd = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        balance: '',
        currency: '1'
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Kasa adı zorunludur')
            .min(2, 'Kasa adı en az 2 karakter olmalıdır'),
        balance: Yup.number()
            .required('Bakiye zorunludur')
            .min(0, 'Bakiye 0\'dan küçük olamaz'),
        currency: Yup.string()
            .required('Para birimi zorunludur')
    });

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            const requestBody = {
                name: values.name,
                balance: parseFloat(values.balance),
                currency: parseInt(values.currency)
            };

            await dispatch(createCashBox(requestBody) as any);
            navigate('/cashBoxList');
        } catch (error) {
            // Hata thunk içinde işleniyor
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header border-bottom">
                    <div className="flex justify-between items-center">
                        <h4 className="card-title mb-0">Yeni Kasa Ekle</h4>
                    </div>
                </div>
                <div className="card-body">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue, values }) => (
                            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="inline-block text-base font-medium">Kasa Adı</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        className={defaultInputClassName}
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="inline-block text-base font-medium">Bakiye</label>
                                    <Field
                                        type="number"
                                        name="balance"
                                        className={defaultInputClassName}
                                    />
                                    <ErrorMessage
                                        name="balance"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="inline-block text-base font-medium">Para Birimi</label>
                                    <Field
                                        type="text"
                                        name="currency"
                                        className={defaultInputClassName}
                                    />
                                    <ErrorMessage
                                        name="currency"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div className="col-span-full flex justify-end gap-2 mt-4">
                                    <button
                                        type="button"
                                        className={defaultButtonClassName}
                                        onClick={() => navigate('/cashBoxList')}
                                        disabled={isSubmitting}
                                    >
                                        İptal
                                    </button>
                                    <button
                                        type="submit"
                                        className={`${defaultButtonClassName} !bg-blue-500 !text-white`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Kaydediliyor...
                                            </>
                                        ) : (
                                            'Kaydet'
                                        )}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default CashBoxAdd;
