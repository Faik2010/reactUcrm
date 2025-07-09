import React from 'react';
import Select, { Props as SelectProps } from 'react-select';

interface CustomSelectProps extends Omit<SelectProps<Option>, 'value' | 'onChange'> {
  value?: any;
  onChange: (value: number) => void;
  className?: string;
  isDisabled?: boolean;
  options: Option[];
}

interface Option {
  value: any;
  label: string;
  [key: string]: any;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  className = '',
  isDisabled = false,
  options,
  formatOptionLabel,
  ...props
}) => {
  const selectedOption = options?.find(
    (option: any) => option.value === value
  );

  return (
    <div className={`w-full ${className}`}>
      <Select
        className='w-full min-w-40'
        value={selectedOption}
        onChange={(newValue: any, _actionMeta) => {
          const option = newValue as Option | null;
          onChange(option?.value ?? options?.[0]?.value ?? 0);
        }}
        options={options}
        isDisabled={isDisabled}
        formatOptionLabel={formatOptionLabel}
        classNames={{
          singleValue: ({ isDisabled }) =>
            `dark:text-zink-100 dark:${isDisabled ? "bg-gray-600 dark:bg-zink-500" : "bg-white dark:bg-zink-700"} dark:disabled:text-zink-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200`,
          menu: () =>
            "bg-white dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 z-[1050]",
          option(props) {
            let className = "hover:cursor-pointer px-3 py-2 rounded";
            if (props.isSelected) {
              className += " bg-gray-200 dark:text-zink-100 dark:bg-zink-800";
            }
            if (props.isFocused) {
              className += " bg-gray-100 dark:text-zink-200 dark:bg-zink-600";
            }
            if (props.isDisabled) {
              className += " bg-gray-500 dark:bg-gray-600";
            }
            return className;
          },
          input: () => "text-zink-950 dark:text-zink-100",
          control: ({ isDisabled }) => {
            let className = "bg-white border-zink-100 dark:bg-zink-700 dark:border-zink-500";
            if (isDisabled) {
              className = "bg-gray-600 border-gray-500 dark:bg-zink-500 dark:border-gray-600";
            }
            return className;
          },
        }}
        styles={{
          control: (base, state) => ({
            ...base,
            color: state.theme ? "#83afca" : "inherit",
            borderColor: state.isDisabled ? "#1c2e45" : base.borderColor,
          }),
          input: (base) => ({
            ...base,
            color: "inherit",
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        menuPortalTarget={document.body}
        menuPlacement="auto"
        menuPosition="fixed"
        {...props}
      />
    </div>
  );
};

export default CustomSelect; 