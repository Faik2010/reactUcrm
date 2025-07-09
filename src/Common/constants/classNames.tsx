export const defaultInputClassName = `
    form-input 
    w-full 
    rounded-md 
    border-slate-200 
    dark:border-zink-500 
    focus:outline-none 
    focus:border-custom-500 
    focus:ring-1 
    focus:ring-custom-500 
    disabled:bg-slate-100 
    dark:disabled:bg-zink-600 
    disabled:border-slate-300 
    dark:disabled:border-zink-500 
    dark:disabled:text-zink-200 
    disabled:text-slate-500 
    dark:text-zink-100 
    dark:bg-zink-700 
    dark:focus:border-custom-800 
    placeholder:text-slate-400 
    dark:placeholder:text-zink-200
    text-base
    py-2.5
    transition-all
    duration-200
`.replace(/\s+/g, ' ').trim();

export const defaultButtonClassName = `
    inline-flex 
    items-center 
    justify-center 
    px-4 
    py-2.5 
    text-base 
    font-medium 
    rounded-md 
    transition-all 
    duration-200 
    bg-white 
    border 
    border-blue-500 
    text-blue-500 
    hover:bg-blue-500 
    hover:text-white 
    hover:border-blue-500 
    focus:ring-2 
    focus:ring-blue-200 
    dark:bg-zink-700 
    dark:border-blue-400 
    dark:text-blue-400 
    dark:hover:bg-blue-500 
    dark:hover:text-white 
    dark:focus:ring-blue-400/20 
    disabled:opacity-60 
    disabled:cursor-not-allowed
    shadow-sm
    hover:shadow
`.replace(/\s+/g, ' ').trim();

export const defaultSquareCheckboxClassName = `
    size-4 
    border 
    rounded-sm 
    appearance-none 
    cursor-pointer 
    bg-slate-100 
    border-slate-200 
    dark:bg-zink-600 
    dark:border-zink-500 
    checked:bg-custom-500 
    checked:border-custom-500 
    dark:checked:bg-custom-500 
    dark:checked:border-custom-500 
    checked:disabled:bg-custom-400 
    checked:disabled:border-custom-400
    transition-all
    duration-200
`.replace(/\s+/g, ' ').trim();

export const reactSelectDefaultStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        borderColor: state.isFocused ? 'var(--custom-500)' : 'var(--slate-200)',
        boxShadow: state.isFocused ? '0 0 0 1px var(--custom-500)' : 'none',
        '&:hover': {
            borderColor: 'var(--custom-500)'
        },
        borderRadius: '0.375rem',
        padding: '4px',
        backgroundColor: 'transparent',
        transition: 'all 0.2s'
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'var(--custom-500)' : state.isFocused ? 'var(--custom-50)' : 'transparent',
        color: state.isSelected ? 'white' : 'inherit',
        '&:hover': {
            backgroundColor: state.isSelected ? 'var(--custom-600)' : 'var(--custom-50)'
        },
        cursor: 'pointer',
        padding: '8px 12px'
    }),
    menu: (provided: any) => ({
        ...provided,
        borderRadius: '0.375rem',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        overflow: 'hidden'
    }),
    menuList: (provided: any) => ({
        ...provided,
        padding: '4px'
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: 'inherit'
    }),
    input: (provided: any) => ({
        ...provided,
        color: 'inherit'
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: 'var(--slate-400)'
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    dropdownIndicator: (provided: any, state: any) => ({
        ...provided,
        color: state.isFocused ? 'var(--custom-500)' : 'var(--slate-400)',
        '&:hover': {
            color: 'var(--custom-500)'
        },
        transition: 'all 0.2s'
    })
};

export const phoneInputClassName = `
    !bg-transparent 
    !border-slate-200 
    dark:!border-zink-500 
    focus:!outline-none 
    focus:!border-custom-500 
    disabled:!bg-slate-100 
    dark:disabled:!bg-zink-600 
    disabled:!border-slate-300 
    dark:disabled:!border-zink-500 
    dark:disabled:!text-zink-200 
    disabled:!text-slate-500 
    dark:!text-zink-100 
    dark:!bg-zink-700 
    dark:focus:!border-custom-800 
    !placeholder:text-slate-400 
    dark:!placeholder:text-zink-200
    w-full
    rounded-md
    text-base
    py-2.5
    transition-all
    duration-200
`.replace(/\s+/g, ' ').trim();
