import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet2, Plus, Pencil, Trash2 } from 'lucide-react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import ActionButtons from 'Common/Components/actionButtons';
import DataTableComponent from 'Common/Components/dataTableCoponent';
import { defaultButtonClassName } from '../../Common/constants/classNames';
import { deleteCashBox } from '../../slices/cashBox/thunk';

const CashBoxList = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigate = useNavigate();
    const [reloadTable, setReloadTable] = useState(false);

    const handleDelete = async (id: string) => {
        if (window.confirm('Bu kasayı silmek istediğinize emin misiniz?')) {
            try {
                await dispatch(deleteCashBox(id) as any);
                setReloadTable(prev => !prev); 
            } catch (error) {
                // Hata thunk içinde işleniyor
            }


        }
    };

    const columns = [
        {
            name: "name",
            displayName: "Kasa Adı",
            isShow: true
        },
        {
            name: "balance",
            displayName: "Bakiye",
            isShow: true,
            render: (item: any) => {
                return new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(item.balance);
            }
        },
        {
            name: "actions",
            displayName: "İşlemler",
            isShow: true,
            render: (item: any) => {
                const actions = [
                    {
                        icon: <Pencil className="size-4" />,
                        text: "Düzenle",
                        onClick: () => navigate(`/cashBoxEdit`, { state: { id: item.id } })
                    },
                    {
                        icon: <Trash2 className="size-4" />,
                        text: "Sil",
                        textColor: "text-red-500",
                        onClick: () => handleDelete(item.id)
                    }
                ];
                return <ActionButtons actions={actions} />;
            }
        }
    ];

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header border-bottom">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="card-title mb-0 flex items-center gap-2">
                                <Wallet2 className="size-5" />
                                Kasa Listesi
                            </h4>
                            <p className="mt-1 text-slate-500 dark:text-zink-200">
                                Tüm kasa işlemlerinizi buradan yönetebilirsiniz
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Link 
                                to="/cashBoxAdd" 
                                className={`${defaultButtonClassName} !bg-blue-500 !text-white gap-2`}
                            >
                                <Plus className="size-4" />
                                Yeni Kasa Ekle
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="overflow-x-auto">
                        <DataTableComponent
                            key={reloadTable ? "reload-true" : "reload-false"}
                            url="/cashBox"
                            columns={columns}
                            pageSize={10}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CashBoxList;
