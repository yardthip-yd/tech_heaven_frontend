import React, { useEffect, useState } from 'react';
import { createCategory, removeCategory, updateCategory } from '@/API/category-api';
import useAuthStore from '@/stores/authStore';
import { toast } from 'react-toastify';
import useCategoryStore from '@/stores/category';

const FormCategory = () => {
    const token = useAuthStore((state) => state.token);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    
    const categories = useCategoryStore((state) => state.categories);
    const getCategory = useCategoryStore((state) => state.getCategory);
    useEffect(() => {
        getCategory();
    }, [getCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return toast.warning("Please fill in the category name");
        if (!description) return toast.warning("Please fill in the category description");

        try {
            const res = await createCategory({ name, description });
            console.log("asdasdasd",res.data)
            
            toast.success(`Added Category ${res.data.name} successfully!`);
            getCategory(); // อัปเดต categories ใหม่
            setName('');
            setDescription('');
        } catch (err) {
            console.log(err);
            toast.error("Failed to save category");
        }
    };

    const handleEditClick = (category) => {
        setEditingId(category.id);
        setEditName(category.name);
        setEditDescription(category.description);
    };

    const handleUpdate = async (id) => {
        try {
            const res = await updateCategory(id, { name: editName, description: editDescription });
            toast.success(`Updated Category ${res.data.name} successfully!`);
            getCategory(); // อัปเดต categories ใหม่
            setEditingId(null);
        } catch (err) {
            console.log(err);
            toast.error("Failed to update category");
        }
    };

    const handleRemove = async (id, name) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
        if (!confirmDelete) return;

        try {
            await removeCategory(id);
            toast.success(`Deleted ${name} successfully!`);
            getCategory(); // อัปเดต categories ใหม่
        } catch (err) {
            console.log(err);
        }
    };
    // console.log(categories)
    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <h1>Category Management</h1>
            <form className='my-4' onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='border'
                    type="text"
                    placeholder="Category Name"
                />
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='border'
                    type="text"
                    placeholder="Category Description"
                />
                <button className='bg-blue-500'>
                    Add Category
                </button>
            </form>

            <table className="table-auto w-full mt-4 border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Number</th>
                        <th className="border px-4 py-2">Category Name</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((item, index) => (
                        <tr key={item.id} className="text-center">
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">
                                {editingId === item.id ? (
                                    <input
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="border w-full"
                                        type="text"
                                    />
                                ) : (
                                    item.name
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                {editingId === item.id ? (
                                    <input
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="border w-full"
                                        type="text"
                                    />
                                ) : (
                                    item.description
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                {editingId === item.id ? (
                                    <div className="flex justify-center gap-2">
                                        <button
                                            className="bg-green-500 px-2"
                                            onClick={() => handleUpdate(item.id)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="bg-gray-500 px-2"
                                            onClick={() => setEditingId(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-center gap-2">
                                        <button
                                            className="bg-yellow-500 px-2"
                                            onClick={() => handleEditClick(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 px-2"
                                            onClick={() => handleRemove(item.id, item.name)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FormCategory;
