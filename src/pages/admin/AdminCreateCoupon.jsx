import React, { useState, useEffect } from 'react';
import { createCoupon, getCoupon } from '../../API/coupon-api';
import { toast } from 'react-toastify';

const CouponPage = () => {
    const [coupons, setCoupons] = useState([]);
    const [form, setForm] = useState({
        name: '',
        expiry: '',
        discount: '',
        amount : ''
    });

    const generateRandomName = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    };


    useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            name: generateRandomName(8)
        }));
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCoupon(form);
            toast.success('Coupon created successfully');
            fetchCoupons(); 
            setForm({
                name: generateRandomName(8),
                expiry: '',
                discount: '',
                amount : ''
            });
        } catch (error) {
            console.log('Error creating coupon:', error);
            toast.error('Failed to create coupon');
        }
    };

    const fetchCoupons = async () => {
        try {
            const response = await getCoupon();
            setCoupons(response.data);
        } catch (error) {
            console.log('Error fetching coupons:', error);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    return (
        <div>
            <h2>Create Coupon</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        readOnly
                    />
                </div>
                <div>
                    <label>Expiry Date</label>
                    <input
                        type="datetime-local"
                        name="expiry"
                        value={form.expiry}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Discount</label>
                    <input
                        type="number"
                        name="discount"
                        value={form.discount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Coupon</button>
            </form>

            <h2>Coupon List</h2>
            <ul>
                {coupons.map((coupon) => (
                    <li key={coupon.id}>
                        <strong>Name:</strong> {coupon.name} | 
                        <strong>Expiry:</strong> {new Date(coupon.expiry).toLocaleString()} | 
                        <strong>Discount:</strong> {coupon.discount}%
                        <strong>Amount:</strong> {coupon.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CouponPage;
