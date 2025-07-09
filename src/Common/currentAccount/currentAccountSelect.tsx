import React from 'react';
import GenericInfiniteScrollSelect from '../Components/select/infiniteScrollSelect';
import { SelectOptionType } from '../Components/select/selectOptionType';

interface CurrentAccountSelectProps {
  value?: SelectOptionType | string;
  onChange?: (option: SelectOptionType | null) => void;
  isDisabled?: boolean;
  className?: string;
  includeInactive?: boolean;
}

const CurrentAccountSelect: React.FC<CurrentAccountSelectProps> = ({
  value,
  onChange,
  isDisabled = false,
  className,
  includeInactive = false,
}) => {
  // API endpoint'ini includeInactive'e göre düzenle
  const apiEndpoint = includeInactive ? "currentAccount" : "currentAccount?isActive=true";

  return (
    <GenericInfiniteScrollSelect
      value={value}
      onChange={onChange}
      isDisabled={isDisabled}
      className={className}
      apiEndpoint={apiEndpoint}
      labelKey="name"
      valueKey="id"
      includeCompanyId={true}
    />
  );
};

export default CurrentAccountSelect; 