import { useContext, useState } from 'react';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { OrderContext } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

export default function PaymentPage() {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [upiId, setUpiId] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const { totalPrice } =
        useContext(CartContext);

        const {placeOrder} = useContext(OrderContext)

        const navigate = useNavigate()

    const handlePayment = () => {
        if (selectedMethod === 'upi' && !upiId) {
            alert('Please enter your UPI ID');
            return;
        }
        placeOrder()
        navigate('/orders')
        setShowSuccess(true);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-pink-50 to-rose-100 p-4 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment</h1>
                <p className="text-gray-600 mb-8">Choose your preferred payment method</p>

                <div className="mb-6 p-4 bg-pink-50 rounded-lg">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Order Total</span>
                        <span className="text-2xl font-bold text-pink-600">₹{totalPrice}</span>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    {/* UPI Option */}
                    <div
                        onClick={() => setSelectedMethod('upi')}
                        className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${selectedMethod === 'upi'
                            ? 'border-pink-500 bg-pink-50'
                            : 'border-gray-200 hover:border-pink-300'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${selectedMethod === 'upi' ? 'bg-pink-500' : 'bg-gray-200'
                                }`}>
                                <CreditCard className={`w-6 h-6 ${selectedMethod === 'upi' ? 'text-white' : 'text-gray-600'
                                    }`} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">UPI Payment</h3>
                                <p className="text-sm text-gray-600">Pay using any UPI app</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 ${selectedMethod === 'upi'
                                ? 'border-pink-500 bg-pink-500'
                                : 'border-gray-300'
                                } flex items-center justify-center`}>
                                {selectedMethod === 'upi' && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                            </div>
                        </div>

                        {selectedMethod === 'upi' && (
                            <div className="mt-4 pt-4 border-t border-pink-200">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Enter UPI ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="yourname@upi"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                                />
                            </div>
                        )}
                    </div>

                    {/* COD Option */}
                    <div
                        onClick={() => setSelectedMethod('cod')}
                        className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${selectedMethod === 'cod'
                            ? 'border-rose-500 bg-rose-50'
                            : 'border-gray-200 hover:border-rose-300'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${selectedMethod === 'cod' ? 'bg-rose-500' : 'bg-gray-200'
                                }`}>
                                <Truck className={`w-6 h-6 ${selectedMethod === 'cod' ? 'text-white' : 'text-gray-600'
                                    }`} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">Cash on Delivery</h3>
                                <p className="text-sm text-gray-600">Pay when you receive</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 ${selectedMethod === 'cod'
                                ? 'border-rose-500 bg-rose-500'
                                : 'border-gray-300'
                                } flex items-center justify-center`}>
                                {selectedMethod === 'cod' && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handlePayment}
                    disabled={!selectedMethod}
                    className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${selectedMethod
                        ? 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg hover:shadow-xl'
                        : 'bg-gray-300 cursor-not-allowed'
                        }`}
                >
                    {selectedMethod === 'upi' ? 'Proceed to Pay' : selectedMethod === 'cod' ? 'Confirm Order' : 'Select Payment Method'}
                </button>

                {showSuccess && (
                    <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-lg flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="text-green-800 font-medium">
                            {selectedMethod === 'upi' ? 'Payment Initiated!' : 'Order Confirmed!'}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}