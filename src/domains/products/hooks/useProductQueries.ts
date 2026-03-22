'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Product, BulkUpdate } from '@/domains/products/types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ── Simulated Shopify Product Data ─────────────── */
const mockProducts: Product[] = [
  { id: 'prod_001', name: 'Urban Jacket Pro', sku: 'UJP-001', image: '🧥', price: 129.99, compareAtPrice: 159.99, inventory: 248, collection: 'Outerwear', status: 'in_stock', vendor: 'UrbanCo', weight: '0.8 kg', lastSynced: '2026-03-19T14:30:00Z' },
  { id: 'prod_002', name: 'Running Shoes V2', sku: 'RSV-118', image: '👟', price: 89.50, compareAtPrice: null, inventory: 12, collection: 'Footwear', status: 'low_stock', vendor: 'StrideTech', weight: '0.6 kg', lastSynced: '2026-03-19T14:30:00Z' },
  { id: 'prod_003', name: 'Wireless Earbuds X', sku: 'WEX-042', image: '🎧', price: 210.00, compareAtPrice: 249.99, inventory: 0, collection: 'Electronics', status: 'out_of_stock', vendor: 'SoundMax', weight: '0.1 kg', lastSynced: '2026-03-19T14:30:00Z' },
  { id: 'prod_004', name: 'Smart Watch Pro', sku: 'SWP-205', image: '⌚', price: 299.00, compareAtPrice: null, inventory: 85, collection: 'Electronics', status: 'in_stock', vendor: 'TechWear', weight: '0.15 kg', lastSynced: '2026-03-19T14:30:00Z' },
  { id: 'prod_005', name: 'Yoga Mat Elite', sku: 'YME-033', image: '🧘', price: 65.00, compareAtPrice: 79.99, inventory: 320, collection: 'Fitness', status: 'in_stock', vendor: 'FlexFit', weight: '1.2 kg', lastSynced: '2026-03-19T14:30:00Z' },
  { id: 'prod_006', name: 'Leather Bag Mini', sku: 'LBM-077', image: '👜', price: 185.00, compareAtPrice: null, inventory: 8, collection: 'Accessories', status: 'low_stock', vendor: 'LeatherCo', weight: '0.5 kg', lastSynced: '2026-03-19T14:30:00Z' },
  { id: 'prod_007', name: 'Desk Lamp RGB', sku: 'DLR-091', image: '💡', price: 68.00, compareAtPrice: 85.00, inventory: 145, collection: 'Home Office', status: 'in_stock', vendor: 'LightTech', weight: '0.9 kg', lastSynced: '2026-03-19T14:30:00Z' },
  { id: 'prod_008', name: 'Coffee Maker Pro', sku: 'CMP-156', image: '☕', price: 249.00, compareAtPrice: null, inventory: 0, collection: 'Home Office', status: 'out_of_stock', vendor: 'BrewMaster', weight: '2.1 kg', lastSynced: '2026-03-19T14:30:00Z' },
  { id: 'prod_009', name: 'Canvas Backpack', sku: 'CBP-244', image: '🎒', price: 78.00, compareAtPrice: 95.00, inventory: 190, collection: 'Accessories', status: 'in_stock', vendor: 'TrailGear', weight: '0.7 kg', lastSynced: '2026-03-19T14:30:00Z' },
  { id: 'prod_010', name: 'Noise Cancelling HP', sku: 'NCH-380', image: '🎧', price: 349.00, compareAtPrice: 399.99, inventory: 5, collection: 'Electronics', status: 'low_stock', vendor: 'SoundMax', weight: '0.3 kg', lastSynced: '2026-03-19T14:30:00Z' },
];

/* ── Fetch Products (simulated Shopify Admin API) ── */
const fetchProducts = async (): Promise<Product[]> => {
  await delay(800);
  return [...mockProducts];
};

export const useProducts = () =>
  useQuery({ queryKey: ['products'], queryFn: fetchProducts, staleTime: 30_000 });

/* ── Sync from Shopify ─────────────────────────── */
const syncFromShopify = async (): Promise<Product[]> => {
  await delay(1500);
  return mockProducts.map((p) => ({ ...p, lastSynced: new Date().toISOString() }));
};

export const useSyncProducts = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: syncFromShopify,
    onSuccess: (data) => qc.setQueryData(['products'], data),
  });
};

/* ── Update Single Product ─────────────────────── */
const updateProduct = async ({ id, field, value }: { id: string; field: 'price' | 'inventory'; value: number }): Promise<Product> => {
  await delay(400);
  const product = mockProducts.find((p) => p.id === id);
  if (!product) throw new Error('Product not found');
  if (field === 'price') product.price = value;
  if (field === 'inventory') {
    product.inventory = value;
    product.status = value === 0 ? 'out_of_stock' : value <= 10 ? 'low_stock' : 'in_stock';
  }
  return { ...product };
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
};

/* ── Add Product ───────────────────────────────── */
const addProduct = async (product: Omit<Product, 'id' | 'lastSynced' | 'status'>): Promise<Product> => {
  await delay(600);
  const newProduct: Product = {
    ...product,
    id: `prod_${Math.random().toString(36).substring(2, 9)}`,
    status: product.inventory === 0 ? 'out_of_stock' : product.inventory <= 10 ? 'low_stock' : 'in_stock',
    lastSynced: new Date().toISOString(),
  };
  mockProducts.unshift(newProduct);
  return newProduct;
};

export const useAddProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
};

/* ── Bulk Update Products ──────────────────────── */
const bulkUpdateProducts = async (update: BulkUpdate): Promise<void> => {
  await delay(1000);
  update.productIds.forEach((id) => {
    const product = mockProducts.find((p) => p.id === id);
    if (product) {
      if (update.field === 'price') product.price = update.value;
      if (update.field === 'inventory') {
        product.inventory = update.value;
        product.status = update.value === 0 ? 'out_of_stock' : update.value <= 10 ? 'low_stock' : 'in_stock';
      }
    }
  });
};

export const useBulkUpdateProducts = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: bulkUpdateProducts,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
};
