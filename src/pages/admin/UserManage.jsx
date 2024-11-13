import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { UserRoundCog } from "lucide-react";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function UserManage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/admin/getUser");
      setMembers(result.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  const hdlRemoveMember = async (userId) => {
    try {
      await axios.delete(`/admin/user/${userId}`);
      toast.success("User deleted successfully");
      fetchData();
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
    }
  };

  const hdlUpdateUser = async (userId, role, isActive) => {
    try {
      const body = { role, isActive };
      await axios.put(`/admin/user/${userId}`, body);
      toast.success("User updated successfully");
      fetchData();
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update user");
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  return (
    <div className="p-6 mx-auto">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <UserRoundCog className="h-6 w-6 text-blue-500" />
            <CardTitle className="text-2xl">Manage Users</CardTitle>
          </div>
          <CardDescription>
            Manage user accounts, change roles, activate or deactivate accounts, and delete users from the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-slate-500">Loading users...</div>
          ) : (
            <Table>
              <TableHeader className="h-14 bg-slate-100">
                <TableRow>
                  <TableHead className="font-semibold text-slate-700 w-[150px] text-base text-center">
                    Firstname
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">
                    Lastname
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">
                    Email
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">
                    Role
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((user) => (
                  <TableRow key={user.id} className="hover:bg-slate-50 transition-colors duration-150 h-14">
                    <TableCell className="font-medium text-slate-900 text-center">
                      {user.firstName}
                    </TableCell>
                    <TableCell className="text-slate-600 text-center">{user.lastName}</TableCell>
                    <TableCell className="text-slate-600 text-center">{user.email}</TableCell>
                    <TableCell className="flex justify-center">
                      <Select
                        value={user.role}
                        onValueChange={(value) => hdlUpdateUser(user.id, value, user.isActive)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USER">User</SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${user.isActive ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                          }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-800 text-white hover:text-white"
                          onClick={() => hdlUpdateUser(user.id, user.role, !user.isActive)}
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-slate-100 hover:bg-slate-300"
                          onClick={() => hdlRemoveMember(user.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default UserManage;
