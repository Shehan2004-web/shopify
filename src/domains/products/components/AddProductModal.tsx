'use client';

import * as React from 'react';
import { useAddProduct } from '@/domains/products/hooks/useProductQueries';
import { Bold, Italic, Underline, AlignLeft, Link2, Image as ImageIcon, PlayCircle, Box, Code, ChevronDown } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddProductModal = ({ isOpen, onClose }: Props) => {
  const addMutation = useAddProduct();
  const [formData, setFormData] = React.useState({
    title: '',
    vendor: '',
    type: '',
    collection: '',
    tags: '',
    price: '',
    compareAtPrice: '',
    inventory: '0',
    weight: '0.0',
    status: 'Active',
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.title || !formData.price) return;
    
    addMutation.mutate({
      name: formData.title,
      sku: `SKU-${Math.floor(Math.random() * 10000)}`,
      vendor: formData.vendor || 'Unknown',
      collection: formData.collection || 'Default',
      weight: `${formData.weight} kg`,
      price: parseFloat(formData.price),
      compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
      inventory: parseInt(formData.inventory, 10),
      image: '📦',
    }, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-neutral-900/40 transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#f4f6f8] rounded-2xl shadow-2xl animate-fade-slide-up flex flex-col overflow-hidden">
        {/* ── Theme Compatible Header ─────────────────────── */}
        <header className="flex h-16 items-center justify-between bg-white px-6 border-b border-neutral-200 flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Box className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-neutral-900 tracking-tight leading-none">Add Product</h2>
              <p className="text-[12px] text-neutral-500 mt-1">Create a new inventory item to sync</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-4 h-9 rounded-xl text-[13px] font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors">
              Cancel
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={addMutation.isPending}
              className="px-5 h-9 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white text-[13px] font-semibold shadow-lg shadow-brand-primary/20 transition-all disabled:opacity-50"
            >
              {addMutation.isPending ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </header>

        {/* ── Main Layout ─────────────────────────────── */}
        <main className="flex-1 overflow-y-auto w-full px-4 sm:px-8 pt-6 pb-12 scrollbar-hide">
          <div className="max-w-[1040px] mx-auto flex flex-col lg:flex-row gap-6 items-start">

        {/* ── Left Column (Wide) ────────────────────── */}
        <div className="w-full lg:w-[68%] flex flex-col gap-6">

          {/* 1. Title & Description Card */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-semibold text-[#202223]">Title</label>
              <input 
                type="text" 
                placeholder="Short sleeve t-shirt"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] text-[#202223] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-semibold text-[#202223]">Description</label>
              <div className="border border-[#c9cccf] rounded-lg overflow-hidden flex flex-col min-h-[160px]">
                {/* Toolbar Mock */}
                <div className="h-10 border-b border-[#c9cccf] bg-white flex items-center px-1 gap-1 flex-wrap overflow-x-auto scrollbar-hide">
                  <button className="p-1.5 text-neutral-600 hover:bg-neutral-100 rounded">
                    <div className="flex items-center gap-1"><span className="text-[13px] font-medium px-1">Paragraph</span><ChevronDown className="h-3.5 w-3.5" /></div>
                  </button>
                  <div className="w-px h-4 bg-neutral-300 mx-1" />
                  <button className="p-1.5 text-neutral-600 hover:bg-neutral-100 rounded"><Bold className="h-4 w-4" /></button>
                  <button className="p-1.5 text-neutral-600 hover:bg-neutral-100 rounded"><Italic className="h-4 w-4" /></button>
                  <button className="p-1.5 text-neutral-600 hover:bg-neutral-100 rounded"><Underline className="h-4 w-4" /></button>
                  <button className="p-1.5 text-neutral-600 hover:bg-neutral-100 rounded"><span className="font-serif text-[14px] font-black">A</span><ChevronDown className="h-3 w-3 inline ml-0.5" /></button>
                  <div className="w-px h-4 bg-neutral-300 mx-1" />
                  <button className="p-1.5 text-neutral-600 hover:bg-neutral-100 rounded"><AlignLeft className="h-4 w-4" /></button>
                  <button className="p-1.5 text-neutral-400 hover:bg-neutral-100 rounded"><Link2 className="h-4 w-4" /></button>
                  <button className="p-1.5 text-neutral-600 hover:bg-neutral-100 rounded"><ImageIcon className="h-4 w-4" /></button>
                  <button className="p-1.5 text-neutral-600 hover:bg-neutral-100 rounded"><PlayCircle className="h-4 w-4" /></button>
                  <button className="p-1.5 text-neutral-600 hover:bg-neutral-100 rounded"><Code className="h-4 w-4" /></button>
                </div>
                <textarea className="flex-1 w-full p-3 resize-none focus:outline-none text-[14px]" />
              </div>
            </div>
          </section>

          {/* 2. Media Card */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-4">
            <h2 className="text-[14px] font-semibold text-[#202223]">Media</h2>
            <div className="border border-dashed border-[#c9cccf] rounded-lg p-8 flex flex-col items-center justify-center gap-3">
               <div className="flex gap-3">
                 <button className="px-4 h-8 bg-white border border-[#c9cccf] rounded-lg shadow-sm text-[13px] font-semibold hover:bg-neutral-50 text-[#202223]">
                   Upload new
                 </button>
                 <button className="px-4 h-8 bg-transparent text-[13px] font-semibold hover:bg-neutral-50/50 rounded-lg text-[#202223]">
                   Select existing
                 </button>
               </div>
               <span className="text-[13px] text-neutral-500">Accepts images, videos, or 3D models</span>
            </div>
          </section>

          {/* 3. Category */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3">
            <h2 className="text-[14px] font-semibold text-[#202223]">Category</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Choose a product category"
                className="w-full h-9 px-3 pr-8 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow cursor-default bg-neutral-50/50"
                readOnly
              />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 pointer-events-none" />
            </div>
            <p className="text-[13px] text-neutral-500">
              Determines tax rates and adds metafields to improve search, filters, and cross-channel sales
            </p>
          </section>

          {/* 4. Price */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-4">
            <h2 className="text-[14px] font-semibold text-[#202223]">Price</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               <div className="flex flex-col gap-1">
                 <label className="text-[13px] font-medium text-[#202223]">Price</label>
                 <div className="relative">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-neutral-500">Rs</div>
                   <input 
                     type="number" 
                     placeholder="0.00"
                     value={formData.price}
                     onChange={e => setFormData({...formData, price: e.target.value})}
                     className="w-full h-9 pl-8 pr-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow"
                   />
                 </div>
               </div>
               <div className="flex flex-col gap-1">
                 <label className="text-[13px] font-medium text-[#202223]">Compare-at price</label>
                 <div className="relative">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-neutral-500">Rs</div>
                   <input 
                     type="number" 
                     placeholder="0.00"
                     value={formData.compareAtPrice}
                     onChange={e => setFormData({...formData, compareAtPrice: e.target.value})}
                     className="w-full h-9 pl-8 pr-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow"
                   />
                 </div>
               </div>
            </div>
            
            <div className="flex items-center gap-3 pt-2">
               <label className="flex items-center gap-2 cursor-pointer">
                 <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[#c9cccf] text-[#005bd3] focus:ring-[#005bd3]" />
                 <span className="text-[13px] text-[#202223]">Charge tax on this product</span>
               </label>
            </div>
            
            <div className="border-t border-[#e1e3e5] mt-2 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
               <div className="flex flex-col gap-1">
                 <label className="text-[13px] font-medium text-[#202223]">Cost per item</label>
                 <div className="relative">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-neutral-500">Rs</div>
                   <input type="number" placeholder="0.00" className="w-full h-9 pl-8 pr-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow" />
                 </div>
                 <span className="text-[12px] text-neutral-500 mt-0.5">Customers won&apos;t see this</span>
               </div>
               <div className="flex flex-col gap-1">
                 <label className="text-[13px] font-medium text-[#202223]">Profit</label>
                 <span className="text-[14px] text-neutral-500 mt-1">--</span>
               </div>
               <div className="flex flex-col gap-1">
                 <label className="text-[13px] font-medium text-[#202223]">Margin</label>
                 <span className="text-[14px] text-neutral-500 mt-1">--</span>
               </div>
            </div>
          </section>

          {/* 5. Inventory */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-[#202223]">Inventory</h2>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#202223]">Inventory tracked</span>
                <div className="w-9 h-5 bg-[#005bd3] rounded-full relative cursor-pointer">
                  <div className="h-3.5 w-3.5 bg-white rounded-full absolute right-1 top-[3px]" />
                </div>
              </div>
            </div>
            
            <div className="border border-[#e1e3e5] rounded-xl overflow-hidden mt-1">
               <div className="bg-[#f4f6f8] px-4 py-2 border-b border-[#e1e3e5] flex justify-between">
                 <span className="text-[12px] font-semibold text-neutral-600">Quantity</span>
                 <span className="text-[12px] font-semibold text-neutral-600">Quantity</span>
               </div>
               <div className="px-4 py-3 flex justify-between items-center bg-white border-b border-[#e1e3e5]">
                 <span className="text-[13px] text-[#202223] font-medium">Shop location</span>
                 <input 
                   type="number"
                   value={formData.inventory}
                   onChange={e => setFormData({...formData, inventory: e.target.value})}
                   className="w-[120px] h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow text-right"
                 />
               </div>
               <div className="bg-[#f4f6f8] px-4 py-3 flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border-[#c9cccf] text-[#005bd3] focus:ring-[#005bd3]" />
                    <span className="text-[13px] text-[#202223]">Continue selling when out of stock</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border-[#c9cccf] text-[#005bd3] focus:ring-[#005bd3]" />
                    <span className="text-[13px] text-[#202223]">This product has a SKU or barcode</span>
                  </label>
               </div>
            </div>
          </section>

          {/* 6. Shipping */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-[#202223]">Shipping</h2>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#202223]">Physical product</span>
                <div className="w-9 h-5 bg-[#005bd3] rounded-full relative cursor-pointer">
                  <div className="h-3.5 w-3.5 bg-white rounded-full absolute right-1 top-[3px]" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
               <div className="flex flex-col gap-1">
                 <label className="text-[13px] font-medium text-[#202223]">Weight</label>
                 <div className="flex gap-2">
                   <input 
                     type="number" 
                     placeholder="0.0"
                     value={formData.weight}
                     onChange={e => setFormData({...formData, weight: e.target.value})}
                     className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow" 
                   />
                   <select className="h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] bg-[#f4f6f8] focus:border-[#005bd3] focus:outline-none">
                     <option>kg</option>
                     <option>lb</option>
                     <option>oz</option>
                     <option>g</option>
                   </select>
                 </div>
               </div>
               <div className="flex flex-col gap-1">
                 <label className="text-[13px] font-medium text-[#202223]">Country/Region of origin</label>
                 <select className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] bg-white focus:border-[#005bd3] focus:outline-none">
                   <option>Select country/region</option>
                   <option>United States</option>
                   <option>Sri Lanka</option>
                 </select>
               </div>
            </div>
          </section>

          {/* 7. Variants */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3">
            <h2 className="text-[14px] font-semibold text-[#202223]">Variants</h2>
            <div>
               <button className="text-[13px] font-semibold text-[#005bd3] hover:underline flex items-center gap-1">
                 <span className="text-[16px] leading-none">+</span> Add options like size or color
               </button>
            </div>
          </section>
        </div>

        {/* ── Right Column (Narrow) ───────────────────── */}
        <div className="w-full lg:w-[32%] flex flex-col gap-5 lg:mt-[38px]">
          
          {/* Status */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3">
            <h2 className="text-[14px] font-semibold text-[#202223]">Status</h2>
            <div className="relative">
              <select 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
                className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] bg-white focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none appearance-none"
              >
                <option>Active</option>
                <option>Draft</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                 <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </section>

          {/* Publishing */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-[#202223]">Publishing</h2>
              <button className="rounded hover:bg-neutral-100 p-1"><CheckoutIcon /></button>
            </div>
            <div className="flex flex-wrap gap-2 text-[13px]">
              <div className="px-3 py-1 bg-neutral-100 rounded-full font-medium text-neutral-700">Online Store</div>
              <div className="px-3 py-1 bg-neutral-100 rounded-full font-medium text-neutral-700">Point of Sale</div>
            </div>
          </section>

          {/* Product Organization */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-4">
            <h2 className="text-[14px] font-semibold text-[#202223] flex items-center justify-between">
              <span>Product organization</span>
            </h2>

             <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-[#202223] text-neutral-600">Type</label>
              <input 
                type="text" 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow" 
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-[#202223] text-neutral-600">Vendor</label>
              <input 
                type="text" 
                value={formData.vendor}
                onChange={e => setFormData({...formData, vendor: e.target.value})}
                className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow" 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-[#202223] text-neutral-600">Collections</label>
              <input 
                type="text" 
                value={formData.collection}
                onChange={e => setFormData({...formData, collection: e.target.value})}
                placeholder="Search"
                className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow" 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-[#202223] text-neutral-600">Tags</label>
              <input 
                type="text" 
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
                className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none transition-shadow" 
              />
            </div>
          </section>

          {/* Theme template */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-4 flex flex-col gap-3">
            <h2 className="text-[14px] font-semibold text-[#202223]">Theme template</h2>
            <div className="relative">
              <select className="w-full h-9 px-3 rounded-lg border border-[#c9cccf] text-[14px] bg-white focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] focus:outline-none appearance-none">
                <option>Default product</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                 <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </section>

          </div>
        </div>
      </main>
    </div>
  </div>
  );
};

// Mini icon for Publishing section
const CheckoutIcon = () => (
  <svg viewBox="0 0 20 20" className="h-5 w-5 fill-neutral-400">
    <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm1 11a1 1 0 1 1-2 0v-4a1 1 0 1 1 2 0v4Zm-1-7.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
  </svg>
);
