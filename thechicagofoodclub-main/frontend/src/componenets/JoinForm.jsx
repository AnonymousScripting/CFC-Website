import { useState, useEffect } from "react";
import axios from "../axios/axiosInstance";
import SuccessModal from "./SuccessModal";
import toast from "react-hot-toast";
import { validateForm, validateField } from "../utils/validation";

export default function JoinForm() {
  const initialFormData = {
    email: "",
    fullName: "",
    phoneNumber: "",
    profession: "Select your profession",
    consultantDetail: "",
    otherDetail: "",  
    professionalContribution: "",
    interestReason: "",
    culinarySkills: "",
    cuisineInterests: "",
    restaurantRecommendations: "",
    diningFrequency: "",
    availableDays: [],
    membershipGoals: [],
    cohostingInterest: "",
    referralSource: "Select option",
    instagramUrl: "",
    linkedinUrl: "",
    dietaryRestrictions: "",
    membershipAgreement: false,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "availableDays" || name === "membershipGoals") {
        setFormData((prev) => {
          const newArray = checked
            ? [...prev[name], value]
            : prev[name].filter((item) => item !== value);
          return { ...prev, [name]: newArray };
        });
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const validationErrors = validateForm(formData);
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   const payload = { ...formData };
  //   if (!payload.instagramUrl?.trim()) {
  //     delete payload.instagramUrl;
  //   }
  //   if (!payload.linkedinUrl?.trim()) {
  //     delete payload.linkedinUrl;
  //   }
  //   if (!payload.dietaryRestrictions?.trim()) {
  //     delete payload.dietaryRestrictions;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await axios.post("/user/membership/create", payload);
  //     setModalOpen(true);
  //     setFormData(initialFormData);
  //   } catch (error) {
  //     if (error.response && error.response.data) {
  //       const { statusCode, message } = error.response.data;

  //       if (Array.isArray(message)) {
  //         message.forEach((err) => {
  //           toast.error(`${err.field}: ${err.message}`);
  //           setErrors((prev) => ({ ...prev, [err.field]: err.message }));
  //         });
  //       } else if (typeof message === "string") {
  //         toast.error(message);
  //       } else {
  //         toast.error("Something went wrong. Please try again.");
  //       }
  //     } else {
  //       toast.error("Something went wrong. Please try again.");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validateForm(formData);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  const payload = { ...formData };

  // Merge Consultant/Other details into profession
  if (payload.profession === "Consultant (Please Specify Below)" && payload.consultantDetail) {
    payload.profession = `Consultant - ${payload.consultantDetail}`;
  }
  if (payload.profession === "Other (Please Specify Below)" && payload.otherDetail) {
    payload.profession = `Other - ${payload.otherDetail}`;
  }

  // Remove temp fields from payload
  delete payload.consultantDetail;
  delete payload.otherDetail;

  if (!payload.instagramUrl?.trim()) delete payload.instagramUrl;
  if (!payload.linkedinUrl?.trim()) delete payload.linkedinUrl;
  if (!payload.dietaryRestrictions?.trim()) delete payload.dietaryRestrictions;

  setLoading(true);
  try {
    await axios.post("/user/membership/create", payload);
    setModalOpen(true);
    setFormData(initialFormData);
  } catch (error) {
      if (error.response && error.response.data) {
        const { statusCode, message } = error.response.data;

        if (Array.isArray(message)) {
          message.forEach((err) => {
            toast.error(`${err.field}: ${err.message}`);
            setErrors((prev) => ({ ...prev, [err.field]: err.message }));
          });
        } else if (typeof message === "string") {
          toast.error(message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
  } finally {
    setLoading(false);
  }
};

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validationErrors = validateForm(formData);
  const isFormValid =
  formData.membershipAgreement && Object.keys(validationErrors).length === 0;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4 sm:px-6 md:px-0 border-t border-stone-200">
      <div className="max-w-3xl w-full text-center">
        <p className="text-[#c8a76f] tracking-widest text-sm mb-4 font-montserrat">JOIN OUR COMMUNITY</p>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-[#212121] mb-6">
          Membership Application
        </h1>
        <div className="border-t-2 border-[#c8a76f] h-.5 my-6 sm:my-8 w-20 sm:w-24 mx-auto"></div>

        <p className="text-[#404040] mb-6 sm:mb-2 leading-relaxed max-w-2xl mx-auto font-montserrat px-2 sm:px-0">
          Interested in joining the Chicago Food Club? Share a bit about
          yourself. Our membership is curated to bring together passionate
          professionals and food lovers who value great taste, conversation, and
          connection.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-[#FBF3E4] space-y-6 px-4 sm:px-16 md:px-12 py-6 sm:py-8 mt-6 max-w-4xl w-full text-base mx-auto"
      >
        {/* Email and Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="your.email@example.com"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c7a462] text-sm placeholder-black/70 font-montserrat"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm mt-1 font-montserrat">{errors.email}</p>
            )}
          </div>
          {/* Full Name */}
          <div>
            <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Jane Doe"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c7a462] text-sm placeholder-black/70 font-montserrat"
            />
            {touched.fullName && errors.fullName && (
              <p className="text-red-500 text-sm mt-1 font-montserrat">{errors.fullName}</p>
            )}
          </div>
        </div>

        {/* Phone number and Profession */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone Number */}
          <div>
            <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="(312) 555-1234"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c7a462] text-sm placeholder-black/70  font-montserrat"
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1 font-montserrat">{errors.phoneNumber}</p>
            )}
          </div>
<div>
  <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
    What is your profession? <span className="text-red-500">*</span>
  </label>
  <select
    name="profession"
    value={formData.profession}
    onBlur={handleBlur}
    onChange={handleChange}
    className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c7a462] text-sm placeholder-black/70 font-montserrat"
  >
    <option>Select your profession</option>
    <option>Physician</option>
    <option>Nurse</option>
    <option>Medical Student</option>
    <option>Lawyer</option>
    <option>Engineer</option>
    <option>Software Developer</option>
    <option>Information Technology</option>
    <option>Enterpreneur / Business Owner</option>
    <option>Consultant (Please Specify Below)</option>
    <option>Chef / Culinary Professional</option>
    <option>Marketing / Advertising</option>
    <option>Finance / Accounting</option>
    <option>Sales / Business Development</option>
    <option>Educator / Academic</option>
    <option>Creative (Designer, Artist, etc)</option>
    <option>Student</option>
    <option>Other (Please Specify Below)</option>
  </select>
  {touched.profession && errors.profession && (
    <p className="text-red-500 text-sm mt-1  font-montserrat">{errors.profession}</p>
  )}
</div>

{/* Extra input for Consultant */}
{formData.profession === "Consultant (Please Specify Below)" && (
  <div>
    <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
      Please specify your consulting field <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      name="consultantDetail"
      value={formData.consultantDetail}
      onChange={handleChange}
      onBlur={handleBlur}   // ✅ important for touched state
      placeholder="E.g., Management, IT, Finance..."
      className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c7a462] text-sm  font-montserrat"
    />
    {touched.consultantDetail && errors.consultantDetail && (
      <p className="text-red-500 text-sm mt-1 font-montserrat">{errors.consultantDetail}</p>
    )}
  </div>
)}

{/* Extra input for Other */}
{formData.profession === "Other (Please Specify Below)" && (
  <div>
    <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
      Please specify your profession <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      name="otherDetail"
      value={formData.otherDetail}
      onChange={handleChange}
      onBlur={handleBlur}   // ✅ important for touched state
      placeholder="Your profession"
      className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c7a462] text-sm font-montserrat"
    />
    {touched.otherDetail && errors.otherDetail && (
      <p className="text-red-500 text-sm mt-1 font-montserrat">{errors.otherDetail}</p>
    )}
  </div>
)}


        </div>

        <div>
          <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
            How do you think your professional skills or expertise could
            contribute to the Chicago Food Club?{" "}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            name="professionalContribution"
            value={formData.professionalContribution}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Share how your background and expertise would add value to our community"
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-[#c7a462] text-sm placeholder-black/70 font-montserrat"
          ></textarea>
          {touched.professionalContribution &&
            errors.professionalContribution && (
              <p className="text-red-500 font-montserrat">{errors.professionalContribution}</p>
            )}
        </div>

        <div>
          <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
            Why are you interested in joining the Chicago Food Club?{" "}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            name="interestReason"
            value={formData.interestReason}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tell us what draws you to our community"
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-[#c7a462] text-sm placeholder-black/70 font-montserrat"
          ></textarea>
          {touched.interestReason && errors.interestReason && (
            <p className="text-red-500 font-montserrat">{errors.interestReason}</p>
          )}
        </div>

        <div>
          <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
            Do you have any culinary skills or food-related knowledge you'd love
            to share? <span className="text-red-500 font-montserrat">*</span>
          </label>
          <textarea
            name="culinarySkills"
            value={formData.culinarySkills}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Share your culinary interests, skills, or expertise"
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-[#c7a462] text-sm placeholder-black/70 font-montserrat"
          ></textarea>
          {touched.culinarySkills && errors.culinarySkills && (
            <p className="text-red-500 font-montserrat">{errors.culinarySkills}</p>
          )}
        </div>

        <div>
          <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
            What types of cuisines or dining experiences are you most excited to
            explore? <span className="text-red-500">*</span>
          </label>
          <textarea
            name="cuisineInterests"
            value={formData.cuisineInterests}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tell us about cuisines or dining experiences you're passionate about"
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-[#c7a462] text-sm placeholder-black/70 font-montserrat"
          ></textarea>
          {touched.cuisineInterests && errors.cuisineInterests && (
            <p className="text-red-500 font-montserrat">{errors.cuisineInterests}</p>
          )}
        </div>

        <div>
          <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
            Recommend 3 restaurants or food spots in Chicago — include your
            go-to dishes <span className="text-red-500">*</span>
          </label>
          <textarea
            name="restaurantRecommendations"
            value={formData.restaurantRecommendations}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Share your favorite Chicago dining spots and dishes"
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-[#c7a462] text-sm placeholder-black/70 font-montserrat"
          ></textarea>
          {touched.restaurantRecommendations &&
            errors.restaurantRecommendations && (
              <p className="text-red-500 font-montserrat">{errors.restaurantRecommendations}</p>
            )}
        </div>

        <div>
          <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
            How often do you dine out or attend culinary events per month?{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2 text-[#404040] font-montserrat">
            {[
              { value: "1–2 times/month", label: "1–2 times/month" },
              { value: "3–5 times/month", label: "3–5 times/month" },
              { value: "Weekly or more", label: "Weekly or more" },
              {
                value: "Only on special occasions",
                label: "Only on special occasions",
              },
            ].map((option) => (
              <label key={option.value} className="flex items-center text-sm font-montserrat">
                <input
                  type="radio"
                  name="diningFrequency"
                  value={option.value}
                  checked={formData.diningFrequency === option.value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mr-2 w-4 h-4 border-2 border-[#E0CFB1] rounded-full appearance-none checked:bg-[#b49c73] checked:border-[#b49c73] bg-[#F9F8F5] font-montserrat"
                />
                {option.label}
              </label>
            ))}
          </div>
          {touched.diningFrequency && errors.diningFrequency && (
            <p className="text-red-500 font-montserrat">{errors.diningFrequency}</p>
          )}
        </div>

        <div>
          <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
            What days of the week are you typically available for events?{" "}
            <span className="text-red-500 font-montserrat">*</span>
          </label>
          <p className="text-black/80  font-montserrat text-sm mb-3">Select all that apply</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[#404040] font-montserrat">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <label
                key={day}
                className="flex items-center space-x-2 text-sm font-montserrat"
              >
               <input
  type="checkbox"
  name="availableDays"
  value={day}
  checked={formData.availableDays.includes(day)}
  onChange={handleChange}
  onBlur={handleBlur}
  className=" font-montserrat peer w-4 h-4 rounded border-2 border-[#E0CFB1] bg-white cursor-pointer appearance-none
    checked:bg-[#b49c73] checked:border-[#b49c73] relative
    before:content-[''] before:absolute before:top-[0px] before:left-[3px]
    before:w-[6px] before:h-[12px] before:border-r-2 before:border-b-2 before:border-white
    before:rotate-45 before:opacity-0
    checked:before:opacity-100"
/>

                <span>{day}</span>
              </label>
            ))}
          </div>
          {touched.availableDays && errors.availableDays && (
            <p className="text-red-500 font-montserrat">{errors.availableDays}</p>
          )}
        </div>

        <div>
          <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
            What are you hoping to gain from your membership?{" "}
            <span className="text-red-500 font-montserrat">*</span>
          </label>
          <p className="text-black/80 text-sm mb-3 font-montserrat">Select all that apply</p>
          <div className="space-y-2 text-[#404040] font-montserrat">
            {[
              "Social community / new friendships",
              "Professional networking",
              "Culinary education / chef experiences",
              "Access to exclusive events",
              "Support local food culture",
            ].map((goal) => (
              <label
                key={goal}
                className="flex items-center space-x-2 text-sm font-montserrat"
              >
                <input
                  type="checkbox"
                  name="membershipGoals"
                  value={goal}
                  checked={formData.membershipGoals.includes(goal)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className=" font-montserrat peer w-4 h-4 rounded border-2 border-[#E0CFB1] bg-white cursor-pointer appearance-none
    checked:bg-[#b49c73] checked:border-[#b49c73] relative
    before:content-[''] before:absolute before:top-[0px] before:left-[3px]
    before:w-[6px] before:h-[12px] before:border-r-2 before:border-b-2 before:border-white
    before:rotate-45 before:opacity-0
    checked:before:opacity-100"
                />
                <span>{goal}</span>
              </label>
            ))}
          </div>
          {touched.membershipGoals && errors.membershipGoals && (
            <p className="text-red-500 font-montserrat">{errors.membershipGoals}</p>
          )}
        </div>

        <div>
          <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
            Would you be open to co-hosting or leading a future event?{" "}
            <span className="text-red-500 font-montserrat">*</span>
          </label>
          <div className="space-y-2 text-[#404040] font-montserrat">
            {[
              { value: "Yes, definitely", label: "Yes, definitely" },
              { value: "Maybe, with support", label: "Maybe, with support" },
              {
                value: "No, prefer to attend only",
                label: "No, prefer to attend only",
              },
            ].map((option) => (
              <label key={option.value} className="block text[#404040] font-montserrat  mb-2 text-sm">
                <input
                  type="radio"
                  name="cohostingInterest"
                  value={option.value}
                  checked={formData.cohostingInterest === option.value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mr-2 w-4 h-4 border-2 border-[#E0CFB1] rounded-full appearance-none checked:bg-[#b49c73] checked:border-[#b49c73] bg-[#F9F8F5] font-montserrat"
                />
                <span className="text-[#404040] font-montserrat">{option.label}</span>
              </label>
            ))}
          </div>
          {touched.cohostingInterest && errors.cohostingInterest && (
            <p className="text-red-500 font-montserrat">{errors.cohostingInterest}</p>
          )}
        </div>

        <div>
          <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
            How did you hear about the Chicago Food Club?{" "}
            <span className="text-red-500 font-montserrat">*</span>
          </label>
          <select
            name="referralSource"
            value={formData.referralSource}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c7a462] text-sm font-montserrat"
          >
            <option>Select option</option>
            <option>Instagram</option>
            <option>LinkedIn</option>
            <option>TikTok</option>
            <option>X (Formerly Twitter)</option>
            <option>Friend</option>
            <option>Google Search</option>
            <option>Event or Pop-Up</option>
            <option>Other</option>
          </select>
          {touched.referralSource && errors.referralSource && (
            <p className="text-red-500 text-sm font-montserrat">{errors.referralSource}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Instagram */}
          <div>
            <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
              Instagram Profile URL (Optional)
            </label>
            <input
              type="url"
              name="instagramUrl"
              value={formData.instagramUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="https://instagram.com/yourprofile"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c8a76f] text-sm placeholder-black/70 font-montserrat"
            />
            {errors.instagramUrl && (
              <p className="text-red-500 text-sm mt-1 font-montserrat">{errors.instagramUrl}</p>
            )}
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
              LinkedIn Profile URL (Optional)
            </label>
            <input
              type="url"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c7a462] text-sm placeholder-black/70 font-montserrat"
            />
            {errors.linkedinUrl && (
              <p className="text-red-500 text-sm mt-1 font-montserrat">{errors.linkedinUrl}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-[#212121] font-montserrat font-medium mb-2 text-sm">
            Do you have any dietary restrictions or preferences we should be
            aware of? (Optional)
          </label>
          <input
            type="text"
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={handleChange}
            placeholder="E.g., Vegetarian, Gluten-Free, Halal, etc."
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c7a462] text-sm placeholder-black/70 font-montserrat"
          />
        </div>
        <div className="pt-6">
          <h3 className="text-xl font-playfair font-bold text-[#212121] mb-2">
            Membership Access
          </h3>
          <hr className="border-t border-black/10 my-3" />

          <p className="text-[#404040] font-montserrat mb-4 text-base">
            Membership to Chicago Food Club is selective and granted based on
            alignment with our values and community mission. If approved, a
            monthly membership fee will apply. Pricing will be shared privately.
          </p>
          <div className="flex items-start">
            <input
              type="checkbox"
              id="membership_agreement"
              name="membershipAgreement"
              checked={formData.membershipAgreement}
              onChange={handleChange}
              className="
    peer relative w-5 h-5 shrink-0 
    rounded border-2 border-[#E0CFB1] bg-white cursor-pointer
    appearance-none [-webkit-appearance:none] [-moz-appearance:none]

    checked:bg-[#b49c73] checked:border-[#b49c73]

    before:content-[''] before:absolute before:top-1/2 before:left-1/2
    before:w-[40%] before:h-[70%] before:border-r-2 before:border-b-2 before:border-white
    before:rotate-45 before:-translate-x-1/2 before:-translate-y-1/2
    before:scale-0 checked:before:scale-100
    before:transition-transform
  "
            />
            <label
              htmlFor="membership_agreement"
              className="block text-[#212121] font-montserrat font-medium mb-2 text-sm"
            >
              <span className="text-red-500 ml-2">*</span> I understand that
              membership is exclusive and may require a private monthly
              membership fee upon approval.
            </label>
          </div>
        </div>

      <div className="pt-6">
  <div className="relative group w-full">
    <button
      type="submit"
      disabled={loading || !isFormValid}
      className={`flex items-center cursor-pointer justify-center font-montserrat gap-2 bg-[#bfa268] hover:bg-golden text-white font-semibold w-full px-6 py-3 rounded text-xl transition ${
        loading || !isFormValid ? "cursor-not-allowed" : ""
      }`} style={{letterSpacing: '0.025rem'}}
    >
      {loading ? (
        <>
          Submitting...
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </>
      ) : (
        "Submit Application"
      )}
    </button>

    {/* Tooltip */}
    {(!isFormValid && !loading) && (
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max bg-black text-white text-xs rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition">
        Please fill required fields
      </div>
    )}
  </div>

  <p className="text-[#404040] mt-12 text-sm text-center font-montserrat">
    All applications are reviewed by our membership committee. We'll be in
    touch within 5-7 business days.
  </p>
</div>

      </form>
      {/*Success Modal */}
      <SuccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
