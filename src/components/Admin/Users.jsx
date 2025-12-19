"use client"
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            toast.error('Please login to continue')
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError(null)
            const response = await fetch('https://e-backend-1xjt.onrender.com/api/allUsers', {
                headers: {
                    Authorization: token,
                },
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            const data = await response.json()
            setUsers(data.users || [])
        } catch (err) {
            setError(err.message)
            console.error('Failed to fetch users:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="p-6 text-center">Loading users...</div>
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="text-red-600 mb-4">Error: {error}</div>
                <button
                    onClick={fetchUsers}
                    className="px-4 py-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Users Management</h2>
                <p className="text-gray-600">Total Users: {users.length}</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-4 text-left">Name</th>
                            <th className="border border-gray-300 px-4 py-4 text-left">Email</th>
                            {/* <th className="border border-gray-300 px-4 py-4 text-left">Role</th> */}
                            <th className="border border-gray-300 px-4 py-4 text-left">Phone</th>
                            <th className="border border-gray-300 px-4 py-4 text-left">Address</th>
                            <th className="border border-gray-300 px-4 py-4 text-left">Joined Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-4">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-4">{user.email}</td>
                                {/* <td className="border border-gray-300 px-4 py-4">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                        {user.role}
                                    </span>
                                </td> */}
                                <td className="border border-gray-300 px-4 py-4">{user.phone}</td>
                                <td className="border border-gray-300 px-4 py-4">{user.address}</td>
                                <td className="border border-gray-300 px-4 py-4">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && (
                <div className="text-center py-8 text-gray-500">No users found</div>
            )}
        </div>
    )
}

export default Users