import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlineEye, HiOutlineCheckCircle, HiOutlineTrash } from 'react-icons/hi2';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/contact/messages');
      setMessages(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/contact/messages/${id}/status`, { status });
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMessage = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/contact/messages/${id}`);
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact Inquiries</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">Name</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Department</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Subject</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {messages.map(msg => (
              <tr key={msg._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{msg.name}</div>
                  <div className="text-sm text-gray-500">{msg.email}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{msg.department}</td>
                <td className="px-6 py-4 text-gray-600">{msg.subject}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    msg.status === 'New' ? 'bg-blue-100 text-blue-700' :
                    msg.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {msg.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {msg.status !== 'Resolved' && (
                      <button onClick={() => updateStatus(msg._id, 'Resolved')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                        <HiOutlineCheckCircle size={20} />
                      </button>
                    )}
                    <button onClick={() => deleteMessage(msg._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactMessages;