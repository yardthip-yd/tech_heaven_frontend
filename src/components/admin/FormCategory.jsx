import React, { useEffect, useState } from 'react';
import { createCategory, removeCategory, updateCategory } from '@/API/category-api';
import useAuthStore from '@/stores/authStore';
import { toast } from 'react-toastify';
import useCategoryStore from '@/stores/category';
import { Pencil, Database, Trash } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FormCategory = () => {
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
            toast.success(`Added Category ${res.data.name} successfully!`);
            getCategory();
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
            getCategory();
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
            getCategory();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-row gap-8 mx-auto p-6">
            <Card className="w-full lg:w-1/4 h-[360px]">
                <CardHeader className="pb-4">
                    <div className='flex items-center space-x-2'>
                        <Database className="h-6 w-6 text-blue-500" />
                        <CardTitle className="text-2xl font-bold text-slate-800">Category Information</CardTitle>
                    </div>
                    <CardDescription>Add a new category</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-3 flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Name:</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                type="text"
                                placeholder="Category Name"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Description:</label>
                            <input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                type="text"
                                placeholder="Category Description"
                            />
                        </div>
                        <Button type="submit" className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 p-4 rounded-lg shadow-md transition duration-200 font-medium">
                            Add Category
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card className="w-full lg:w-3/4 h-auto">
                <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-slate-800">Category Lists</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table className="w-full">
                        <TableHeader className="h-14 bg-slate-100">
                            <TableRow>
                                <TableHead className="font-semibold text-slate-700 text-base text-center">#</TableHead>
                                <TableHead className="font-semibold text-slate-700 text-base text-center">Category Name</TableHead>
                                <TableHead className="font-semibold text-slate-700 text-base text-center">Description</TableHead>
                                <TableHead className="font-semibold text-slate-700 text-base text-center">Edit/Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((item, index) => (
                                <TableRow key={item.id} className="hover:bg-slate-50 transition-colors duration-150">
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell className="text-center">
                                        {editingId === item.id ? (
                                            <input
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className="border w-full px-2 py-1 rounded-md"
                                                type="text"
                                            />
                                        ) : (
                                            item.name
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {editingId === item.id ? (
                                            <input
                                                value={editDescription}
                                                onChange={(e) => setEditDescription(e.target.value)}
                                                className="border w-full px-2 py-1 rounded-md"
                                                type="text"
                                            />
                                        ) : (
                                            item.description
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {editingId === item.id ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <Button onClick={() => handleUpdate(item.id)} className="bg-blue-600 px-2 py-1 rounded-md text-white">
                                                    Save
                                                </Button>
                                                <Button onClick={() => setEditingId(null)} className="bg-slate-600 px-2 py-1 rounded-md text-white">
                                                    Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                <Button onClick={() => handleEditClick(item)} className="p-2 border rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                                                    <Pencil className="w-4 h-4 text-blue-500" />
                                                </Button>
                                                <Button onClick={() => handleRemove(item.id, item.name)} className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors">
                                                    <Trash className="w-5 h-5 text-red-500" />
                                                </Button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default FormCategory;
