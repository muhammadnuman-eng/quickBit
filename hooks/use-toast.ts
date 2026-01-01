import Toast from 'react-native-toast-message';

export const useToast = () => {
  const showToast = (options: {
    title: string;
    description?: string;
    type?: 'success' | 'error' | 'info';
  }) => {
    const { title, description, type = 'success' } = options;

    Toast.show({
      type: type === 'success' ? 'success' : type === 'error' ? 'error' : 'info',
      text1: title,
      text2: description,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 60,
    });
  };

  return { showToast };
};
