import React from 'react';
import GenericInfiniteScrollSelect from '../Components/select/infiniteScrollSelect';
import { SelectOptionType } from '../Components/select/selectOptionType';

interface CashBoxSelectProps {
    value?: SelectOptionType | string;
    onChange?: (option: SelectOptionType | null) => void;
    isDisabled?: boolean;
    className?: string;
}

const CashBoxSelect: React.FC<CashBoxSelectProps> = ({
    value,
    onChange,
    isDisabled = false,
    className,
}) => {
    return (
        <GenericInfiniteScrollSelect
            value={value}
            onChange={onChange}
            isDisabled={isDisabled}
            className={className}
            apiEndpoint="cashBox"
            pageSize={10}
            labelFormatter={(item: any) => `${item.name} - ${new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: item.currency === 1 ? 'TRY' : item.currency === 2 ? 'USD' : 'EUR'
            }).format(item.balance)}`}
            valueKey="id"
            labelKey="name"
        />
    );
};

export default CashBoxSelect;
