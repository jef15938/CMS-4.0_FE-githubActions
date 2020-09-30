import { SelectOption } from '@neux/ui';

export interface SelectData {
  hasSearchbar: boolean;
  defaultOptionText: string;
  isError: boolean;
  disabled: boolean;
  optionList: SelectOption[];
}
