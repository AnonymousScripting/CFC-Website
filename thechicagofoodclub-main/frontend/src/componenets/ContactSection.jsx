import { useState } from "react";
import { Mail, MapPin } from "lucide-react";
import axios from "../axios/axiosInstance";
import toast from "react-hot-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interest: "General Information",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 3)
          return "Full name must be at least 3 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Invalid email format";
        return "";
      case "phone":
        if (value && !/^\+?[0-9]{7,15}$/.test(value)) {
          return "Invalid phone number (must be 7–15 digits, optional +)";
        }
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters long";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const isFormValid =
    Object.values(errors).every((err) => err === "") &&
    Object.keys(formData).every((field) => {
      if (field === "phone") return true;
      return validateField(field, formData[field]) === "";
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fix errors before submitting");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/user/auth/contact", formData);

      if (res.data.success) {
        toast.success("Message sent successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          interest: "General Information",
          message: "",
        });
        setErrors({});
        setTouched({});
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // <section className="flex flex-col md:flex-row bg-white px-6 py-12 md:px-16 gap-12">
    //   {/* Left Side */}
    //   <div className="w-full md:w-1/2">
    //     <p className="text-sm tracking-widest text-[#bfa268] font-semibold mb-2">
    //       GET IN TOUCH
    //     </p>
    //     <h2 className="text-4xl font-serif font-bold mb-4">Contact Us</h2>
    //     <p className="text-gray-700 leading-relaxed mb-8">
    //       Have questions about membership, upcoming events, or partnership
    //       opportunities? We're here to assist you with any inquiries about the
    //       Chicago Food Club.
    //     </p>

    //     <div className="flex items-start mb-6">
    //       <div className="bg-[#f5f2ea] p-3 rounded-md mr-4">
    //         <Mail className="text-[#bfa268]" />
    //       </div>
    //       <div>
    //         <p className="font-semibold">Email</p>
    //         <p className="text-gray-600">chicagofoodclub@gmail.com</p>
    //       </div>
    //     </div>

    //     <div className="flex items-start mb-8">
    //       <div className="bg-[#f5f2ea] p-3 rounded-md mr-4">
    //         <MapPin className="text-[#bfa268]" />
    //       </div>
    //       <div>
    //         <p className="font-semibold">Location</p>
    //         <p className="text-gray-600">Chicago, IL</p>
    //       </div>
    //     </div>

    //     <div className="w-full h-48">
    //       <iframe
    //         title="Chicago Food Club Location"
    //         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95004.12345077432!2d-87.84114885322782!3d41.83390374687581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c0f1234567%3A0xabcdefabcdef!2sChicago%2C%20IL%2C%20USA!5e0!3m2!1sen!2sus!4v1691756228546!5m2!1sen!2sus"
    //         width="100%"
    //         height="100%"
    //         style={{ border: 0 }}
    //         allowFullScreen=""
    //         loading="lazy"
    //         referrerPolicy="no-referrer-when-downgrade"
    //       ></iframe>
    //     </div>
    //   </div>

    //   {/* Right Side */}
    //   <div className="w-full md:w-1/2 border border-black/10 py-6 px-8">
    //     <h3 className="text-xl font-serif font-bold mb-4">Send a Message</h3>
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       {/* Full Name */}
    //       <div>
    //         <label className="block text-sm mb-1">Full Name*</label>
    //         <input
    //           type="text"
    //           name="fullName"
    //           value={formData.fullName}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           className="w-full border border-gray-300 px-2 py-3 focus:border-[#c7a462] focus:outline-none"
    //         />
    //         {touched.fullName && errors.fullName && (
    //           <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
    //         )}
    //       </div>

    //       {/* Email */}
    //       <div>
    //         <label className="block text-sm mb-1">Email Address*</label>
    //         <input
    //           type="email"
    //           name="email"
    //           value={formData.email}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           className="w-full border border-gray-300 px-2 py-3 focus:border-[#c7a462] focus:outline-none"
    //         />
    //         {touched.email && errors.email && (
    //           <p className="text-red-500 text-sm mt-1">{errors.email}</p>
    //         )}
    //       </div>

    //       {/* Phone */}
    //       <div>
    //         <label className="block text-sm mb-1">Phone Number</label>
    //         <input
    //           type="tel"
    //           name="phone"
    //           value={formData.phone}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           className="w-full border border-gray-300 px-2 py-3 focus:border-[#c7a462] focus:outline-none"
    //         />
    //         {touched.phone && errors.phone && (
    //           <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
    //         )}
    //       </div>

    //       {/* Interest */}
    //       <div>
    //         <label className="block text-sm mb-1">I'm interested in</label>
    //         <select
    //           name="interest"
    //           value={formData.interest}
    //           onChange={handleChange}
    //           className="w-full border border-gray-300 px-2 py-3 focus:border-[#c7a462] focus:outline-none"
    //         >
    //           <option>General Information</option>
    //           <option>Membership Application</option>
    //           <option>Upcoming Events</option>
    //           <option>Partnership Opportunities</option>
    //           <option>Other</option>
    //         </select>
    //       </div>

    //       {/* Message */}
    //       <div>
    //         <label className="block text-sm mb-1">Message*</label>
    //         <textarea
    //           name="message"
    //           value={formData.message}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           className="w-full border border-gray-300 px-2 py-3 focus:border-[#c7a462] focus:outline-none"
    //           rows="4"
    //         ></textarea>
    //         {touched.message && errors.message && (
    //           <p className="text-red-500 text-sm mt-1">{errors.message}</p>
    //         )}
    //       </div>

    //       {/* Submit */}
    //       <button
    //         type="submit"
    //         disabled={loading || !isFormValid}
    //         className="bg-[#bfa268] hover:bg-golden text-white font-semibold px-6 py-3 w-full disabled:opacity-70"
    //       >
    //         {loading ? "Sending..." : "Send Message"}
    //       </button>
    //     </form>
    //   </div>
    // </section>
    <section className="flex flex-col md:flex-row bg-white px-6 py-12 mt-4 md:mt-24 md:px-20 gap-12 max-w-7xl mx-auto">
  {/* Left Side */}
{/* Left Side */}
<div className="w-full md:w-1/2 px-4 sm:px-0 flex flex-col justify-between">
  <div>
    <p className="text-sm text-center sm:text-left tracking-widest text-[#c8a76f] mb-2 font-montserrat">
      GET IN TOUCH
    </p>
    <h2 className="text-4xl text-center sm:text-left text-[#212121] font-playfair font-bold mb-4">Contact Us</h2>
    <p className="text-[#404040] font-montserrat text-center sm:text-left leading-relaxed mb-8">
      Have questions about membership, upcoming events, or partnership
      opportunities? We're here to assist you with any inquiries about the
      Chicago Food Club.
    </p>

    <div className="flex items-start mb-6">
      <div className="bg-[#f5f2ea] p-3 rounded-md mr-4">
        <Mail className="text-[#bfa268]" />
      </div>
      <div>
        <p className="font-semibold text-lg font-playfair text-[#212121]">Email</p>
        <p className="font-montserrat text-[#404040]">info@thechicagofoodclub.com</p>
      </div>
    </div>

    <div className="flex items-start mb-8">
      <div className="bg-[#f5f2ea] p-3 rounded-md mr-4">
        <MapPin className="text-[#bfa268]" />
      </div>
      <div>
        <p className="font-semibold text-lg font-playfair text-[#212121]">Location</p>
        <p className="font-montserrat text-[#404040]">Chicago, IL</p>
      </div>
    </div>
  </div>

  {/* Map */}
  <div className="w-full h-72 mt-6">
    <iframe
      title="Chicago Food Club Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95004.12345077432!2d-87.84114885322782!3d41.83390374687581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c0f1234567%3A0xabcdefabcdef!2sChicago%2C%20IL%2C%20USA!5e0!3m2!1sen!2sus!4v1691756228546!5m2!1sen!2sus"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>


  {/* Right Side (Form) */}
  <div className="w-full md:w-1/2 border border-gray-200 py-8 px-8 shadow-sm">
    <h3 className="text-2xl font-playfair text-[#212121] font-bold mb-6">Send a Message</h3>
    <form onSubmit={handleSubmit} className="space-y-5 font-sans">
      {/* Full Name */}
<div>
  <div className="flex justify-between items-center mb-1">
    <label className="block text-sm font-montserrat text-[#404040]">
      Full Name*{" "}
      <span className="text-[9ca3af] text-xs font-montserrat ">
        ({100 - formData.fullName.length} characters remaining)
      </span>
    </label>
  </div>
  <input
    type="text"
    name="fullName"
    maxLength={100}
    value={formData.fullName}
    onChange={handleChange}
    onBlur={handleBlur}
    className="w-full border border-gray-300 px-3 py-3 text-sm focus:border-[#c7a462] focus:outline-none"
  />
  {touched.fullName && errors.fullName && (
    <p className="text-red-500 text-sm mt-1 font-montserrat">{errors.fullName}</p>
  )}
</div>

      {/* Email */}
      <div>
        <label className="block text-sm font-montserrat text-[#404040]">Email Address*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full border border-gray-300 px-3 py-3 text-sm focus:border-[#c7a462] focus:outline-none"
        />
        {touched.email && errors.email && (
          <p className="text-red-500 text-sm mt-1 font-montserrat">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-montserrat text-[#404040]">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full border border-gray-300 px-3 py-3 text-sm focus:border-[#c7a462] focus:outline-none"
        />
        {touched.phone && errors.phone && (
          <p className="text-red-500 text-sm mt-1  font-montserrat">{errors.phone}</p>
        )}
      </div>

      {/* Interest */}
      <div>
        <label className="block text-sm font-montserrat text-[#404040]">I'm interested in</label>
        <select
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-3 text-sm focus:border-[#c7a462] focus:outline-none font-montserrat"
        >
          <option>General Information</option>
          <option>Membership Application</option>
          <option>Upcoming Events</option>
          <option>Partnership Opportunities</option>
          <option>Other</option>
        </select>
      </div>

      {/* Message */}
     <div>
  <div className="flex justify-between items-center mb-1">
    <label className="block text-sm font-montserrat text-[#404040]">
      Message*{" "}
      <span className="text-[9ca3af] text-xs font-montserrat ">
        ({1000 - formData.message.length} characters remaining)
      </span>
    </label>
  </div>
  <textarea
    name="message"
    maxLength={1000}
    value={formData.message}
    onChange={handleChange}
    onBlur={handleBlur}
    className="w-full border border-gray-300 px-3 py-3 text-sm focus:border-[#c7a462] focus:outline-none"
    rows="4"
  ></textarea>
  {touched.message && errors.message && (
    <p className="text-red-500 text-sm mt-1 font-montserrat">{errors.message}</p>
  )}
</div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !isFormValid}
        className="bg-[#c8a76f] hover:bg-[#404040] text-white text-lg font-semibold font-montserrat px-6 py-3 w-full"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  </div>
</section>

  );
}
