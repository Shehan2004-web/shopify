export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface Product {
  id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  compareAtPrice: number | null;
  inventory: number;
  collection: string;
  status: StockStatus;
  vendor: string;
  weight: string;
  lastSynced: string;
}

export interface ProductFilters {
  search: string;
  collection: string | null;
  stockStatus: StockStatus | null;
  priceRange: [number, number] | null;
}

export interface BulkUpdate {
  productIds: string[];
  field: 'price' | 'inventory';
  value: number;
}
