export type Doctor = {
  id: string;
  name: string;
  speciality: string[];
  experience: number;
  qualification: string;
  clinicLocation: string;
  consult_fees?: number;
  image: string;
  Physical_fees?: number;
  about: string[];
  languages: string[];
  mode: string[];
  isAvailable?: boolean;
  faculty: string;
};

export type newDoctor = Omit<Doctor, 'id'>
