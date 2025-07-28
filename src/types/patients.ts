export type Patient = {
  id: number;
  uuid?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  birth_date: string;
  address_line_1?: string;
  address_line_2?: string;
  address_city?: string;
  zipcode?: string;
  gender?: string;
  phone?: string;
  is_active?: boolean;
  created_at: string;
};
