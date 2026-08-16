export interface TorobMedia {
  type: string;
  url: string;
}

export interface TorobBadge {
  text: string;
  badge_type: string | null;
  icon?: string | null;
  tooltip?: string | null;
}

export interface TorobSearchItem {
  random_key: string;

  name1?: string | null;
  name2?: string | null;

  price?: number | null;
  price_text?: string | null;
  price_prefix?: string | null;

  shop_text?: string | null;
  stock_status?: string | null;

  image_url?: string | null;
  image_count?: number | null;
  media_urls?: TorobMedia[];

  web_client_absolute_url?: string | null;
  more_info_url?: string | null;

  badges?: TorobBadge[];

  is_adv?: boolean;
  has_nearby_shop?: boolean;
  has_wiki?: boolean;
  is_authentic?: boolean;

  delivery_city_name?: string | null;
  delivery_city_flag?: string | null;
}

export interface TorobSearchResponse {
  results: TorobSearchItem[];
}