import { useAppDispatch } from '@/store/hooks';
import { addToast } from '@/store/slices/toastSlice';


export const useToast = () => {
  const dispatch = useAppDispatch();

  const pushToast = ({ type, message, duration }: { type: 'success' | 'error', message: string, duration?: number }) => {
    dispatch(addToast({
      id: Math.floor(Number(new Date()) * Math.random() * Math.random()).toString(),
      type,
      message,
      duration
    }));
  };

  return { pushToast };
};
