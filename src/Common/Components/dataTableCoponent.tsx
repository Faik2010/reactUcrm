import React, { useState, useEffect } from "react";
import apiClient from "../../helpers/api_helper";
import Pagination from "../Pagination"; // Sayfalama bileşeni
import { getCompanyId } from "helpers/jwt-token-access/jwtHelper";
import Skeleton from 'react-loading-skeleton';


const getNestedValue = (obj:any, key:any) => {
  return key.split(".").reduce((acc:any, part:any) => acc && acc[part], obj);
};



export interface FilterBody {
  sort?: Array<{ field: string; dir: string }>;
  filter?: {
    field?: string;
    operator?: string;
    value?: string;
    logic?: string;
    filters?: Array<{
      field: string;
      operator: string;
      value: string;
      logic: string;
    }>;
  };
}

interface ColumnType {
  name: string;
  displayName?: string;
  isShow?: boolean;
  render?: (item: any) => React.ReactNode; 
}

interface DataTableComponentProps {
  url: string;
  columns: ColumnType[];
  pageSize?: number;
  includeCompanyId?: false;
  additionalParams?: Record<string, string | number>;
  searchText?: string;
  filterConfig?: FilterBody;
}

const DataTableComponent: React.FC<DataTableComponentProps> = ({
  url,
  columns,
  pageSize = 10,
  includeCompanyId = false,
  additionalParams = {},
  searchText = "",
  filterConfig
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [items, setItems] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [hasPrevious, setHasPrevious] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const searchInObject = (obj: any, searchText: string): boolean => {
    if (!obj) return false;
    
    
    if (typeof obj === 'string') {
      return obj.toLowerCase().includes(searchText.toLowerCase());
    }
    
    
    if (Array.isArray(obj)) {
      return obj.some(item => searchInObject(item, searchText));
    }
    
    
    if (typeof obj === 'object') {
      return Object.values(obj).some(value => searchInObject(value, searchText));
    }
    
    return false;
  };

  const fetchItems = async (page: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      params.append('pageIndex', (page - 1).toString());
      params.append('pageSize', pageSize.toString());
      
      if (includeCompanyId) {
        const companyId = getCompanyId();
        if (companyId) {
          params.append('CompanyId', companyId);
        }
      }
      
      Object.entries(additionalParams).forEach(([key, value]) => {
        params.append(key, value.toString());
      });

      const apiUrl = `${url}${url.includes('?') ? '&' : '?'}${params.toString()}`;

      let response;
      if (filterConfig) {
        const requestBody: FilterBody = {
          sort: [
            {
              field: "invoiceDate",
              dir: "asc"
            }
          ],
          filter: filterConfig.filter ? {
            field: filterConfig.filter.field,
            operator: filterConfig.filter.operator,
            value: filterConfig.filter.value,
            logic: filterConfig.filter.logic,
            filters: filterConfig.filter.filters
          } : undefined
        };
        console.log(requestBody);
        response = await apiClient.post(apiUrl, requestBody);
      } else {
        // Filtre yoksa GET isteği
        response = await apiClient.get(apiUrl);
      }

      let fetchedItems = response.data.items;

      if (searchText) {
        fetchedItems = fetchedItems.filter((item: any) => searchInObject(item, searchText));
      }
     
      setItems(fetchedItems);
      setTotalPages(response.data.pages);
      setHasPrevious(response.data.hasPrevious);
      setHasNext(response.data.hasNext);
    } catch (error) {
      console.error(error);
      setError("Sunucu ile iletişim kurulurken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderCell = (item:any, col:any) => {
    // Custom render varsa onu çalıştır
    if (col.render) {
      return col.render(item);
    }

  
    const value = getNestedValue(item, col.name);
    
   
    
    return value;
  };

  // Skeleton yükleme komponenti
  const LoadingSkeleton = () => {
    // Rastgele genişlik üretmek için yardımcı fonksiyon
    const getRandomWidth = () => {
      const widths = [60, 70, 80, 90, 100];
      return widths[Math.floor(Math.random() * widths.length)];
    };

    // Tema kontrolü
    const isDarkMode = localStorage.getItem('layoutMode') === 'dark';

    // Tema'ya göre renkler
    const baseColor = isDarkMode ? '#1e3651' : '#e2e8f0';
    const highlightColor = isDarkMode ? '#264668' : '#f1f5f9';

    return (
      <tbody>
        {[...Array(pageSize)].map((_, index) => (
          <tr key={index}>
            {columns
              .filter((col) => col.isShow !== false)
              .map((_, colIndex) => (
                <td key={colIndex} className="p-3">
                  <Skeleton 
                    height={20} 
                    width={`${getRandomWidth()}%`}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                  />
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="min-h-[250px] bg-white dark:bg-gray-900">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          {/* Tablo Başlığı */}
          <thead className="text-xs text-white uppercase bg-gradient-to-r from-blue-500 to-blue-700">
            <tr>
              {columns
                .filter((col) => col.isShow !== false)
                .map((col) => (
                  <th
                    key={col.name}
                    className="px-6 py-4 font-medium tracking-wider text-center"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {col.displayName || col.name}
                  </th>
                ))}
            </tr>
          </thead>
          
          {/* Yükleme Durumu */}
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={columns.filter(col => col.isShow !== false).length}>
                  <div className="flex items-center justify-center p-8">
                    <div className="w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : error ? (
            <tbody>
              <tr>
                <td 
                  colSpan={columns.filter(col => col.isShow !== false).length} 
                  className="p-4 text-center text-red-500 bg-red-100 dark:bg-red-900/20"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                </td>
              </tr>
            </tbody>
          ) : items.length === 0 ? (
            <tbody>
              <tr>
                <td 
                  colSpan={columns.filter(col => col.isShow !== false).length} 
                  className="p-8 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                    <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <span className="text-lg font-medium">Veri bulunamadı</span>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {items.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {columns
                    .filter((col) => col.isShow !== false)
                    .map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-4 text-center"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        {renderCell(item, col)}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Sayfalama */}
      <div className="px-4 py-3 bg-white dark:bg-gray-800">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
};

export default DataTableComponent;
