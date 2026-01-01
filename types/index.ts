export interface Message {
  id: string;
  type: 'sent' | 'received';
  phoneNumber: string;
  content: string;
  status: 'delivered' | 'pending';
  time: string;
}

export interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export type StatusType = 'online' | 'offline' | 'delivered' | 'pending';

export interface NavigationProps {
  navigation: any;
  route: any;
}

export interface ToastOptions {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}
