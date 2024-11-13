import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Camera, User, Eye, EyeOff, Pencil } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import Avatar from '../Avatar';
import UserImageCropper from '@/components/user/UserImageCropper';

const UserProfile = () => {
  const { user, getCurrentUser, actionUpdateUser } = useAuthStore();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  useEffect(() => {
    const getUser = async () => {
      await getCurrentUser();
    };
    getUser();
  }, [getCurrentUser]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setProfileImage(user.profileImage);
      setProfileImagePreview(user.profileImage);
    }
  }, [user]);

  const hdlAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 10MB limit.");
      return;
    }
    setIsCropping(true);
    setProfileImagePreview(URL.createObjectURL(file));
  };

  const handleCropComplete = (croppedBlob) => {
    setProfileImage(croppedBlob);
    setProfileImagePreview(URL.createObjectURL(croppedBlob));
    setIsCropping(false);
  };

  const handleCloseCropper = () => {
    setIsCropping(false);
  };

  const hdlUpdateProfile = async () => {
    const updatedData = new FormData();
    updatedData.append("firstName", firstName);
    updatedData.append("lastName", lastName);
    updatedData.append("email", email);

    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    if (password) {
      updatedData.append("password", password);
    }
    if (profileImage) {
      updatedData.append("profileImage", profileImage);
    }

    try {
      await actionUpdateUser(updatedData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length;

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 4) return "Medium";
    return "Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="flex flex-col w-full mx-auto p-6 gap-8">

      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900">Profile Settings</h2>
        <p className="text-slate-600">
          Update your profile information and manage your account
        </p>
      </div>

      {/* Avatar and Form Sections */}
      <div className="flex flex-row space-x-12">

        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-52 h-52 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-lg group">
            {profileImagePreview ? (
              <img
                src={profileImagePreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <Avatar className="rounded-full flex items-center" imgSrc={user?.profileImage} />
            )}

            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <div className="text-white flex flex-col items-center">
                <Pencil className="w-6 h-6" />
                <span className="text-sm">Edit Avatar</span>
              </div>
              <input
                type="file"
                id="avatar-upload"
                onChange={hdlAvatarChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
          <span className="text-slate-500 text-sm text-center"> " click on profile picture <br /> for edit avatar "</span>
        </div>
        {/* Form Section */}
        <div className="flex-1 space-y-8 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Password Strength:</span>
                <span className={`text-sm font-medium ${passwordStrength <= 2 ? 'text-red-500' :
                  passwordStrength <= 4 ? 'text-yellow-500' : 'text-green-500'
                  }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Password Requirements */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-700">Password Requirements:</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li className={`flex items-center ${passwordChecks.length ? "text-green-500" : ""}`}>
                <span className="mr-2">•</span>At least 8 characters
              </li>
              <li className={`flex items-center ${passwordChecks.uppercase && passwordChecks.lowercase ? "text-green-500" : ""}`}>
                <span className="mr-2">•</span>Uppercase and lowercase letters
              </li>
              <li className={`flex items-center ${passwordChecks.number ? "text-green-500" : ""}`}>
                <span className="mr-2">•</span>One number
              </li>
              <li className={`flex items-center ${passwordChecks.special ? "text-green-500" : ""}`}>
                <span className="mr-2">•</span>One special character
              </li>
            </ul>
          </div>

          <button
            onClick={hdlUpdateProfile}
            className={`w-full py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 ${isLoading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
              }`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Image Cropper Modal */}
      {isCropping && (
        <UserImageCropper
          imageSrc={profileImagePreview}
          onCropComplete={handleCropComplete}
          onClose={handleCloseCropper}
        />
      )}
    </div>
  );
};

export default UserProfile;
