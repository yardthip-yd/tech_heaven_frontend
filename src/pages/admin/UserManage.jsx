import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "../../config/axios";

function UserManage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get("/admin/getUser");
      console.log(result)
      setMembers(result.data); 
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const hdlRemoveMember = async (userId) => {
    try {
      await axios.delete(`/admin/user/${userId}`);
      fetchData();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const hdlUpdateUser = async (userId, role, isActive) => {
    try {
      const body = { role, isActive };
      await axios.put(`/admin/user/${userId}`, body);
      fetchData();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  return (
    <div className="admin-manage-user w-full p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

      <Accordion type="single" collapsible className="w-full">
        {members.map((user) => ( 
      
          <AccordionItem key={user.id} value={`user-${user.id}`}>
            <AccordionTrigger>
              {user.firstName} {user.lastName} - {user.role} {user.isActive ? "(Active)" : "(Inactive)"}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <p>Firstname: {user.firstName}</p>
                <p>Lastname: {user.lastName}</p>
                <p>DateofBirth: {new Date(user.dateOfBirth).toLocaleDateString()}</p>
                <p>Status: {user.isActive ? "Active" : "Inactive"}</p>

                <div className="flex gap-2 mt-2">
                  <select
                    className="p-2 border rounded"
                    value={user.role}
                    onChange={(e) => hdlUpdateUser(user.id, e.target.value, user.isActive)}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                  <button
                    onClick={() => hdlUpdateUser(user.id, user.role, !user.isActive)}
                    className={`px-2 py-1 rounded ${user.isActive ? "bg-red-500" : "bg-green-500"} text-white`}
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => hdlRemoveMember(user.id)}
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default UserManage;
