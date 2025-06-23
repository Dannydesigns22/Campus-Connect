// Enhanced CampusConnect App (Tailwind CSS + PWA-ready + Firebase-ready base)

import React, { useState } from 'react'; import { Upload } from 'lucide-react';

export default function CampusConnect() { const [items, setItems] = useState([]); const [form, setForm] = useState({ title: '', price: '', description: '', image: '', category: '', vendorContact: '' }); const [mode, setMode] = useState('customer'); // 'vendor' or 'customer'

const handleChange = (e) => { const { name, value } = e.target; setForm({ ...form, [name]: value }); };

const handleUpload = (e) => { const file = e.target.files[0]; const reader = new FileReader(); reader.onloadend = () => setForm({ ...form, image: reader.result }); reader.readAsDataURL(file); };

const aiSuggest = () => { const suggestions = { price: form.price > 10000 ? (form.price * 0.9).toFixed(2) : form.price, description: form.description.includes('cheap') ? form.description.replace('cheap', 'affordable') : form.description, }; setForm({ ...form, ...suggestions }); };

const handleSubmit = () => { setItems([...items, form]); setForm({ title: '', price: '', description: '', image: '', category: '', vendorContact: '' }); };

return ( <div className="p-4 max-w-4xl mx-auto"> <div className="flex justify-center mb-4 gap-2"> <button onClick={() => setMode('vendor')} className={px-4 py-2 rounded-lg ${mode === 'vendor' ? 'bg-blue-600 text-white' : 'bg-gray-200'}}>Vendor Mode</button> <button onClick={() => setMode('customer')} className={px-4 py-2 rounded-lg ${mode === 'customer' ? 'bg-blue-600 text-white' : 'bg-gray-200'}}>Customer Mode</button> </div>

{mode === 'vendor' && (
    <div className="bg-white shadow-xl p-4 rounded-2xl mb-6">
      <h2 className="text-xl font-semibold mb-3">Add Product/Service</h2>
      <div className="space-y-2">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="price" placeholder="Price (₦)" value={form.price} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="vendorContact" placeholder="WhatsApp/Phone Link" value={form.vendorContact} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="file" accept="image/*" onChange={handleUpload} className="w-full" />
        <div className="flex gap-2">
          <button onClick={aiSuggest} className="bg-gray-200 px-4 py-2 rounded flex items-center"><Upload className="mr-2 h-4 w-4" />AI Suggest</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Post</button>
        </div>
      </div>
    </div>
  )}

  <h2 className="text-xl font-semibold mb-2">Listings</h2>
  <div className="grid gap-4 md:grid-cols-2">
    {items.map((item, index) => (
      <div key={index} className="bg-white shadow p-4 rounded-xl">
        {item.image && <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-xl mb-2" />}
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-700">₦{item.price}</p>
        <p className="text-sm mt-1">{item.description}</p>
        <span className="text-xs text-blue-600">#{item.category}</span>
        {mode === 'customer' && item.vendorContact && (
          <a href={item.vendorContact} target="_blank" rel="noopener noreferrer">
            <button className="mt-2 w-full bg-green-500 text-white px-3 py-1 rounded">Contact Vendor</button>
          </a>
        )}
      </div>
    ))}
  </div>
</div>

); }

