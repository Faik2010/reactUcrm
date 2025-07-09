import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { defaultInputClassName, defaultButtonClassName } from '../../Common/constants/classNames';
import apiClient from '../../helpers/api_helper';
import { setError } from '../../slices/cashBox/reducer';
import { updateCashBox } from '../../slices/cashBox/thunk';

const CashBoxEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const [initialValues, setInitialValues] = useState({
        id: '',
        name: '',
        balance: ''
    });

    useEffect(() => {
        const fetchCashBox = async () => {
            try {
                const response = await apiClient.get(`/cashBox/${id}`);
                const data = response.data;
                
                setInitialValues({
                    id: data.id,
                    name: data.name,
                    balance: data.balance.toString()
                });
            } catch (error: any) {
                dispatch(setError(error.message || 'Kasa bilgileri yüklenemedi'));
                navigate('/cashBoxList');
            }
        };

        if (id) {
            fetchCashBox();
        } else {
            navigate('/cashBoxList');
        }
    }, [id, navigate, dispatch]);

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Kasa adı zorunludur')
            .min(2, 'Kasa adı en az 2 karakter olmalıdır'),
        balance: Yup.number()
            .required('Bakiye zorunludur')
            .min(0, 'Bakiye 0\'dan küçük olamaz')
    });

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            const requestBody = {
                id: values.id,
                name: values.name,
                balance: parseFloat(values.balance)
            };

            await dispatch(updateCashBox(requestBody) as any);
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
                        <h4 className="card-title mb-0">Kasa Düzenle</h4>
                    </div>
                </div>
                <div className="card-body">
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
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
                                                Güncelleniyor...
                                            </>
                                        ) : (
                                            'Güncelle'
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

export default CashBoxEdit;
