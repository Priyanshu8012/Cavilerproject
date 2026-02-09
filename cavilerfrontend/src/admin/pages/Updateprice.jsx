import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AdminPriceUpdate() {
    const [originalPrice, setOriginalPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [duration, setDuration] = useState('2');
    const [finalPrice, setFinalPrice] = useState('');
    const [emiOption, setEmiOption] = useState('');

    // Fetch latest price details on page load
    useEffect(() => {
        const fetchPriceDetails = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/price`);
                const data = await response.json();

                if (data.message) return; // No data found
                setOriginalPrice(data.original_price || '');
                setDiscount(data.discount || '');
                setDuration(data.duration || '2');
                setFinalPrice(data.final_price || '');
                setEmiOption(data.emi_option || '');
            } catch (error) {
                console.error('Error fetching price details:', error);
                toast.error('Failed to load price details');
            }
        };

        fetchPriceDetails();
    }, []);

    const calculatePrice = () => {
        const original = parseFloat(originalPrice) || 0;
        const discountValue = parseFloat(discount) || 0;
        const durationValue = parseInt(duration) || 0;

        const discountAmount = (original * discountValue) / 100;
        const calculatedPrice = original - discountAmount;

        setFinalPrice(calculatedPrice.toFixed(2));
        const emi = (calculatedPrice / (durationValue * 12)).toFixed(2);
        setEmiOption(emi);

        return { calculatedPrice, emi };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { calculatedPrice, emi } = calculatePrice();

        const requestData = {
            originalPrice: parseFloat(originalPrice),
            discount: parseFloat(discount),
            duration: parseInt(duration),
            finalPrice: calculatedPrice,
            emiOption: emi
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/price`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message);
            } else {
                toast.error(result.error || 'Failed to update price');
            }
        } catch (error) {
            toast.error('Error connecting to the server');
            console.error('Error submitting price details:', error);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-300 max-w-md mx-auto mt-10">
            <h2 className="text-3xl font-extrabold text-black mb-6">Price Update Section</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {[{
                    label: 'Original Price (₹)', value: originalPrice, setter: setOriginalPrice
                }, {
                    label: 'Discount (%)', value: discount, setter: setDiscount
                }, {
                    label: 'Duration (Years)', value: duration, setter: setDuration
                }].map((field, index) => (
                    <div key={index}>
                        <label className="block text-gray-700 text-sm mb-2">{field.label}</label>
                        <input
                            type="number"
                            placeholder={`Enter ${field.label}`}
                            value={field.value}
                            onChange={(e) => field.setter(e.target.value)}
                            className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition duration-300"
                >
                    Calculate & Save
                </button>
            </form>

            {finalPrice && (
                <div className="mt-6 p-4 bg-orange-100 border border-orange-300 rounded-md">
                    <p className="text-gray-500 line-through">₹{originalPrice}</p>
                    <p className="text-orange-600 font-bold">{discount}% OFF</p>
                    <h3 className="text-xl font-extrabold text-black">₹{finalPrice} for {duration} years</h3>
                    <p className="text-gray-600">₹{emiOption}/month • <a href="#" className="text-orange-500">See EMI options</a></p>
                </div>
            )}
        </div>
    );
}

