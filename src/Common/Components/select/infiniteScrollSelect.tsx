import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import apiClient from "helpers/api_helper";
import { getCompanyId } from "helpers/jwt-token-access/jwtHelper";
import { SelectOptionType } from "./selectOptionType";

interface GenericInfiniteScrollSelectProps {
  value?: any;
  onChange?: (option: SelectOptionType | null) => void;
  isDisabled?: boolean;
  className?: string;
  apiEndpoint: string;
  pageSize?: number;
  includeCompanyId?: boolean;
  valueKey?: string;
  labelKey?: string;
  labelKeys?: string[];
  labelFormatter?: (item: any) => string;
  onAdd?: (inputValue: string) => void;
}

const GenericInfiniteScrollSelect: React.FC<
  GenericInfiniteScrollSelectProps
> = ({
  value,
  onChange,
  isDisabled = false,
  className,
  apiEndpoint,
  pageSize = 10,
  includeCompanyId = false,
  valueKey = "id",
  labelKey = "name",
  labelKeys,
  labelFormatter,
  onAdd,
}) => {
  const [options, setOptions] = useState<SelectOptionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!isDisabled) {
      setOptions([]);
      setPageIndex(0);
      setHasMore(true);
  
      if (!fetchedRef.current) {
        fetchOptions();
        fetchedRef.current = true;
      }
    }
  }, [apiEndpoint, isDisabled]);

  const fetchOptions = async () => {
    if (isDisabled || isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const baseUrl = apiEndpoint;
      const hasQueryParams = baseUrl.includes("?");

      let url = `${baseUrl}${hasQueryParams ? "&" : "?"}PageIndex=${pageIndex}&PageSize=${pageSize}`;
      console.log(url);
      if (includeCompanyId) {
        const companyId = getCompanyId();
        url += `&CompanyId=${companyId}`;
      }

      const response = await apiClient.get(url);
      const newOptions = response.data.items.map((item: any) => {
        let label;
        if (labelFormatter) {
          label = labelFormatter(item);
        } else if (labelKeys && labelKeys.length > 0) {
          label = labelKeys
            .map((key) => item[key])
            .filter(Boolean)
            .join(" ");
        } else {
          label = item[labelKey];
        }

        return {
          value: item[valueKey],
          label: label,
          data: item,
        };
      });

      setOptions((prevOptions) => [...prevOptions, ...newOptions]);
      setHasMore(response.data.hasNext);
    } catch (error: any) {
      console.error("Error fetching options:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pageIndex > 0) {
      fetchOptions();
    }
  }, [pageIndex]);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      setPageIndex((prevPageIndex) => prevPageIndex + 1);
    }
  };

  const selectedOption = typeof value === 'string' 
    ? options.find((option: SelectOptionType) => option.value === value)
    : value;

  const handleChange = (selectedOption: SelectOptionType | null) => {
    if (onChange) {
      onChange(selectedOption);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key === "Enter" &&
      onAdd &&
      event.currentTarget.contains(document.activeElement)
    ) {
      const input = document.activeElement as HTMLInputElement;
      const inputValue = input.value;
      if (inputValue.trim()) {
        onAdd(inputValue.trim());
        input.value = "";
      }
    }
  };

  useEffect(() => {
    if (isDisabled && value) {
      const hasOption = options.some((option) => option.value === value);
      if (!hasOption) {
        const fetchInitialOption = async () => {
          try {
            const response = await apiClient.get(`/${apiEndpoint}/${value}`);
            const item = response.data;
            const newOption = {
              value: item[valueKey],
              label: labelFormatter 
                ? labelFormatter(item)
                : labelKeys
                    ? labelKeys.map((key) => item[key]).filter(Boolean).join(" ")
                    : item[labelKey],
              data: item
            };
            setOptions((prev) => [...prev, newOption]);
          } catch (error) {
            console.error("Error fetching initial option:", error);
          }
        };
        fetchInitialOption();
      }
    }
  }, [value, options, apiEndpoint, valueKey, labelKey, labelKeys, labelFormatter, isDisabled]);

  return (
    <div className={`w-full ${className}`}>
      <Select
        classNames={{
          singleValue: ({ isDisabled }) =>
            `dark:text-zink-100 dark:${isDisabled ? "bg-gray-600 dark:bg-zink-500" : "bg-white dark:bg-zink-700"} dark:disabled:text-zink-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200`,
          menu: () =>
            "bg-white dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 z-[1050]",
          option(props) {
            let className = "hover:cursor-pointer px-3 py-2 rounded";

            if (props.isSelected) {
              className += "bg-gray-200 dark:text-zink-100 dark:bg-zink-800";
            }
            if (props.isFocused) {
              className += "bg-gray-100 dark:text-zink-200 dark:bg-zink-600";
            }
            if (props.isDisabled) {
              className += "bg-gray-500 dark:bg-gray-600";
            }
            return className;
          },
          input: () => "text-zink-950 dark:text-zink-100",
          control: ({ isDisabled }) => {
            let className =
              "bg-white border-zink-100 dark:bg-zink-700 dark:border-zink-500";
            if (isDisabled) {
              className =
                "bg-gray-600 border-gray-500 dark:bg-zink-500 dark:border-gray-600";
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
        value={selectedOption}
        options={options}
        isDisabled={isDisabled}
        isLoading={isLoading}
        onChange={handleChange}
        onMenuScrollToBottom={handleLoadMore}
        menuPortalTarget={document.body}
        menuPlacement="auto"
        menuPosition="fixed"
        isClearable
        isSearchable
        onKeyDown={handleKeyDown}
        noOptionsMessage={({ inputValue }) =>
          inputValue && onAdd
            ? "Enter tuşuna basarak veri ekle."
            : "Veri bulunamadı."
        }
      />
    </div>
  );
};

export default GenericInfiniteScrollSelect;
