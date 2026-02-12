// import form libs
import { UseFormSetError, FieldValues, Path } from 'react-hook-form';

// import from common
import {
  GraphQLError,
  GraphQLErrorData,
  GraphQLErrorDataField,
} from '@/common/interfaces';
import { ERROR_LIST } from '@/common/constants';

import i18n from '@/infrastructure/i18n/i18n';

/**
 * Get error message by code
 * @param code
 * @returns
 */
export const getErrorMessageByCode = (code: number): string => {
  const error = ERROR_LIST.find((err) => err.code === code);
  if (error) {
    return i18n.t(error.error, { ns: 'error' });
  }
  return i18n.t('unknown', { ns: 'error' });
};

export const hasGraphQLErrors = (error: GraphQLError): boolean => {
  const errors: GraphQLErrorData[] =
    error?.errors || error?.graphQLErrors || [];
  return errors.length > 0;
};

/**
 * Map GraphQL errors to react-hook-form fields
 * @param setError - react-hook-form setError function
 * @param error - GraphQL error object
 * @returns Object with hasError flag and errors that couldn't be mapped to form fields
 */
export const mappingErrorToReactHookForm = <TFieldValues extends FieldValues>(
  setError: UseFormSetError<TFieldValues> | undefined,
  error: GraphQLError,
): {
  hasError: boolean;
  errorsOutOfForm: GraphQLErrorDataField[];
  errorOutOffFormMessage: string;
} => {
  const errors: GraphQLErrorData[] =
    error?.errors || error?.graphQLErrors || [];
  const errorsOutOfForm: GraphQLErrorDataField[] = [];

  if (errors.length > 0) {
    for (const err of errors) {
      if (!err.extra?.fields) continue;

      for (const fieldItem of err.extra.fields) {
        try {
          // Set error to form field using react-hook-form
          if (setError) {
            setError(fieldItem.field as Path<TFieldValues>, {
              type: 'server',
              message: getErrorMessageByCode(fieldItem.code),
            });
          } else {
            errorsOutOfForm.push(fieldItem);
          }
        } catch (e) {
          // If field doesn't exist in form, add to errorsOutOfForm
          console.warn(`Could not set error for field: ${fieldItem.field}`, e);
          errorsOutOfForm.push(fieldItem);
        }
      }
    }
    return {
      hasError: true,
      errorsOutOfForm,
      errorOutOffFormMessage: errorsOutOfForm.map((e) => e.error).join(', '),
    };
  }

  return { hasError: false, errorsOutOfForm, errorOutOffFormMessage: '' };
};
