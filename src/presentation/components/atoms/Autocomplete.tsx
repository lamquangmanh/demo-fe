import { Form, Select, SelectProps, Spin, Checkbox } from 'antd';
import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import type { NamePath } from 'antd/es/form/interface';
import type { Rule } from 'antd/es/form';

// import from common
import { mockFetchAPI } from '@/common/utils';
import { useTranslation } from 'next-i18next';

export interface AutocompleteOptionProps {
  key?: string | number;
  label: React.ReactNode;
  value: string | number;
}

export interface AutocompleteProps<ValueType> extends SelectProps {
  formItem?: {
    label: string;
    name: NamePath;
    rules?: Rule[];
  };
  debounceTimeout?: number; // default is 300ms
  onSearchAPI?: (value: string) => Promise<ValueType[]>; // custom fetchData function
  useMockAPI?: boolean; // if true, use mock API to fetch options. Just for demo purpose
  hasCheckbox?: boolean; // if true, show checkbox in each option
  selectedOptions?: ValueType[]; // default selected options
}

export function Autocomplete<ValueType extends AutocompleteOptionProps>(
  props: AutocompleteProps<ValueType>
) {
  const {
    formItem,
    debounceTimeout,
    useMockAPI,
    hasCheckbox,
    onSearchAPI,
    selectedOptions = [],
    ...otherProps
  } = props;

  const [selected, setSelected] = useState<string[]>([]);
  const [options, setOptions] = useState<ValueType[]>([]);
  const [fetching, setFetching] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedOptions && selectedOptions.length > 0) {
      setSelected(selectedOptions.map((option) => String(option.value)));
      setOptions(selectedOptions);
    }
  }, [selectedOptions]);

  const handleSearch = debounce(async (searchText: string) => {
    try {
      setFetching(true);
      setOptions([]);

      // call api to fetch options
      if (onSearchAPI) {
        const result = await onSearchAPI(searchText);
        setOptions(result);
      }

      // call mock api to fetch options
      if (useMockAPI) {
        const mockData: ValueType[] = Array.from({ length: 5 }, (_, index) => ({
          key: index,
          label: `${searchText} Option ${index + 1}`,
          value: `${searchText.toLowerCase()}_option_${index + 1}`,
        })) as ValueType[];

        const result = await mockFetchAPI<ValueType[]>(mockData, 1000);
        setOptions(result);
      }
    } catch (error) {
      console.error('Error fetching autocomplete options:', error);
    } finally {
      setFetching(false);
    }
  }, debounceTimeout ?? 300);

  return (
    <Form.Item
      name={formItem?.name}
      label={formItem?.label}
      rules={formItem?.rules}
    >
      <Select
        options={options}
        onSearch={handleSearch}
        showSearch
        filterOption={false}
        notFoundContent={
          fetching ? (
            <Spin size="small" />
          ) : (
            t('form.noDataFoundText', { ns: 'common' })
          )
        }
        value={selected}
        onChange={(values) => setSelected(values)}
        onOpenChange={(open: boolean) => {
          if (open) handleSearch('');
        }}
        optionRender={(option) => (
          <div className="flex items-center gap-2">
            {hasCheckbox && (
              <Checkbox
                checked={selected.includes(String(option?.value ?? ''))}
              />
            )}
            <span>{option.label}</span>
          </div>
        )}
        {...otherProps}
      />
    </Form.Item>
  );
}
