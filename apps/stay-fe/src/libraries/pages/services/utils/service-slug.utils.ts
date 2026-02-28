import { useSlugParams } from '@/hooks/useSlugParams';
import { ROUTES } from '@/constants/route';
import { SingleRes } from '@/types/common';
import { EServiceType, ServiceFormValues, ServiceItem } from '@/types/services';
import { serviceKeys } from '@/utils/apis/api-keys';
import { API_ROUTES } from '@/utils/apis/router';
import { useApiMutation, useApiQuery, useQueryClient } from '@smart-connection-monorepo/api-client';
import { toastError, toastSuccess } from '@smart-connection-monorepo/ui-components';
import { useRouter } from 'next/navigation';

type ServiceSlugUtilsResult = {
  isAdd: boolean;
  isLoadingDetail: boolean;
  isSubmitting: boolean;
  initialValues: ServiceFormValues;
  onSubmit: (formValues: ServiceFormValues) => void;
  onCancel: () => void;
};

const defaultInitialValues: ServiceFormValues = {
  type: EServiceType.DELUXE,
  roomFee: 0,
  waterFee: 0,
  electricFee: 0,
  electricBikeFee: 0,
  commonServiceFee: 0,
  internetFee: 0,
};

export default function ServiceSlugUtils(): ServiceSlugUtilsResult {
  const { itemId, isAdd } = useSlugParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: detailData, isLoading: isLoadingDetail } = useApiQuery<SingleRes<ServiceItem>>(
    {
      endpoint: `${API_ROUTES.SERVICES}/${itemId}`,
      queryKey: serviceKeys.detail(itemId as string),
      params: {
        id: itemId,
      },
    },
    { enabled: !!itemId }
  );

  const serviceDetail = detailData?.item;

  const initialValues: ServiceFormValues = isAdd
    ? defaultInitialValues
    : {
        type: serviceDetail?.type ?? EServiceType.DELUXE,
        roomFee: serviceDetail?.roomFee ?? 0,
        waterFee: serviceDetail?.waterFee ?? 0,
        electricFee: serviceDetail?.electricFee ?? 0,
        electricBikeFee: serviceDetail?.electricBikeFee ?? 0,
        commonServiceFee: serviceDetail?.commonServiceFee ?? 0,
        internetFee: serviceDetail?.internetFee ?? 0,
      };

  const { mutate: createService, isPending: isCreating } = useApiMutation<
    SingleRes<ServiceItem>,
    ServiceFormValues
  >('POST');

  const { mutate: updateService, isPending: isUpdating } = useApiMutation<
    SingleRes<ServiceItem>,
    ServiceFormValues
  >('PUT');

  const onSubmit = (formValues: ServiceFormValues) => {
    if (isAdd) {
      createService(
        {
          endpoint: API_ROUTES.SERVICES,
          body: formValues,
        },
        {
          onSuccess: () => {
            toastSuccess('Service created successfully');
            queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
            router.push(ROUTES.SERVICES);
          },
          onError: error => {
            toastError(error?.message);
          },
        }
      );
      return;
    }

    if (!itemId) {
      toastError('Service id is missing');
      return;
    }

    updateService(
      {
        endpoint: `${API_ROUTES.SERVICES}/${itemId}`,
        body: formValues,
      },
      {
        onSuccess: () => {
          toastSuccess('Service updated successfully');
          queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
          queryClient.invalidateQueries({ queryKey: serviceKeys.detail(itemId) });
          router.push(ROUTES.SERVICES);
        },
        onError: error => {
          toastError(error?.message);
        },
      }
    );
  };

  const onCancel = () => {
    router.push(ROUTES.SERVICES);
  };

  return {
    isLoadingDetail,
    isAdd,
    isSubmitting: isLoadingDetail || isCreating || isUpdating,
    initialValues,
    onSubmit,
    onCancel,
  };
}
