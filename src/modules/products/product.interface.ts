export interface ProductIterface{
  id:string;

  title:string;

  url:string;

  image?:string

  price:number;

  currency: 'IRR' | 'IRT';

  store:{
    name:string;
    url:string;
    logo?:string;
  };

  availability: boolean;

  scrapedAt:Date;

}