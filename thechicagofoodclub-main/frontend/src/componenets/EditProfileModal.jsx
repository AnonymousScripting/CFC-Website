import { useState } from "react";
import axios from "../axios/axiosInstance";
import { supabase } from "../config/supabaseClient";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
  onProfileUpdated,
}) {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    linkedinUrl: user?.linkedinUrl || "",
    instagramHandle: user?.instagramHandle || "",
    discordHandle: user?.discordHandle || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { currentUser, isAuthenticated, token } = useSelector(
    (state) => state.user
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let noChanges;

  const handleSubmit = async (e) => {
    e.preventDefault();
    noChanges =
      formData.fullName.trim() === (user?.fullName || "").trim() &&
      formData.phone.trim() === (user?.phone || "").trim() &&
      formData.linkedinUrl.trim() === (user?.linkedinUrl || "").trim() &&
      formData.instagramHandle.trim() === (user?.instagramHandle || "").trim() &&
      formData.discordHandle.trim() === (user?.discordHandle || "").trim() &&
      !formData.file;

    if (noChanges) {
      toast.error("No changes detected. Please update at least one field.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      let avatarUrl = user?.profilePicture || null;

      if (formData.file) {
        avatarUrl = await uploadAvatar(formData.file, user.id);
      }

      const res = await axios.post(
        "/user/auth/edit-profile",
        {
          fullName: formData.fullName,
          phone: formData.phone,
          profilePicture: avatarUrl,
          linkedinUrl: formData.linkedinUrl,
          instagramHandle: formData.instagramHandle,
          discordHandle: formData.discordHandle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Profile updated successfully`);

      onProfileUpdated(res.data.user);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  async function uploadAvatar(file) {
    if (!file) return null;

    const fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (error) {
      console.error("Upload error:", error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            {formData.file ? (
              <img
                src={URL.createObjectURL(formData.file)}
                alt="preview"
                className="w-20 h-20 rounded-full object-cover border mb-2"
              />
            ) : user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="current avatar"
                className="w-20 h-20 rounded-full object-cover border mb-2"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <span className="text-gray-500 text-sm">No Pic</span>
              </div>
            )}

            {/* Hidden input */}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, file: e.target.files[0] })
              }
              className="hidden"
            />

            {/* Styled button */}
            <label
              htmlFor="fileInput"
              className="cursor-pointer px-4 py-2 bg-[#bfa268] text-white text-sm rounded-lg shadow hover:bg-[#a88f58] transition"
            >
              {formData.file ? "Change" : "Choose File"}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">LinkedIn URL</label>
            <input
              type="url"
              name="linkedinUrl"
              placeholder="https://linkedin.com/in/yourprofile"
              value={formData.linkedinUrl}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Instagram Handle</label>
            <input
              type="text"
              name="instagramHandle"
              placeholder="@yourhandle"
              value={formData.instagramHandle}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Discord Handle</label>
            <input
              type="text"
              name="discordHandle"
              placeholder="username#1234"
              value={formData.discordHandle}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#bfa268] text-white py-2 rounded-lg hover:bg-[#a88f58] disabled:bg-[#a88f58]"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
