import { useState } from 'react';

export default function AddressForm({fn}) {
  const [formData, setFormData] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    alert('Form submitted!\n\n' + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FFE4E9' }}>
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg" style={{ backgroundColor: '#FFF0F3' }}>
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#D63384' }}>
          Address Form
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#C1276D' }}>
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border-2 focus:outline-none focus:border-pink-400"
              style={{ borderColor: '#FFCAD4', backgroundColor: '#FFFFFF' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#C1276D' }}>
              Street Address
            </label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border-2 focus:outline-none focus:border-pink-400"
              style={{ borderColor: '#FFCAD4', backgroundColor: '#FFFFFF' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#C1276D' }}>
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border-2 focus:outline-none focus:border-pink-400"
                style={{ borderColor: '#FFCAD4', backgroundColor: '#FFFFFF' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#C1276D' }}>
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border-2 focus:outline-none focus:border-pink-400"
                style={{ borderColor: '#FFCAD4', backgroundColor: '#FFFFFF' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#C1276D' }}>
                ZIP Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border-2 focus:outline-none focus:border-pink-400"
                style={{ borderColor: '#FFCAD4', backgroundColor: '#FFFFFF' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#C1276D' }}>
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border-2 focus:outline-none focus:border-pink-400"
                style={{ borderColor: '#FFCAD4', backgroundColor: '#FFFFFF' }}
              />
            </div>
          </div>

          <button
            onClick={() => fn(prev => !prev)}
            className="w-full py-3 rounded font-semibold text-white transition-colors mt-6"
            style={{ backgroundColor: '#D63384' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#C1276D'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#D63384'}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}