export interface Disease {
  id: string;
  name: string;
  createdAt: number;
}

export interface Booking {
  id: string;
  customerName: string;
  phoneNumber: string;
  diseaseId: string;
  diseaseName: string;
  diseaseDetail: string;
  numberOfPatients: number;
  bookingTime: string;
  bookingDate: string;
  createdAt: number;
  status: 'active' | 'cancelled';
}

export interface User {
  username: string;
  role: 'customer' | 'owner';
}
