export interface TorobSearchItem {
  random_key: string;
  name1?: string;
  name2?: string;
  price?: number;
  image_url?: string;
}

export interface TorobSearchResponse {
  data?: {
    count?: number;
    results?: TorobSearchItem[];
    has_more?: boolean;
    categories?: unknown[];
  };
  status?: string;
}