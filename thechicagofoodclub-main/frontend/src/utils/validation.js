const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9]{7,15}$/;
const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._]+\/?$/i;
const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9_-]+\/?$/i;


export const validateForm = (formData = {}) => {
  const errors = {};

  const {
    email = "",
    fullName = "",
    phoneNumber = "",
    profession = "",
    consultantDetail = "",
    otherDetail = "",
    professionalContribution = "",
    interestReason = "",
    culinarySkills = "",
    cuisineInterests = "",
    restaurantRecommendations = "",
    diningFrequency = "",
    availableDays = [],
    membershipGoals = [],
    cohostingInterest = "",
    referralSource = "",
    instagramUrl = "",
    linkedinUrl = "",
  } = formData;

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!fullName.trim()) {
    errors.fullName = "Full Name is required.";
  }

  if (!phoneNumber.trim()) {
    errors.phoneNumber = "Phone Number is required.";
  } else if (!phoneRegex.test(phoneNumber)) {
    errors.phoneNumber = "Enter a valid phone number (7–15 digits).";
  }

  if (!profession.trim() || profession === "Select your profession") {
    errors.profession = "Profession is required.";
  }

if (profession === "Consultant (Please Specify Below)" && !consultantDetail.trim()) {
  errors.consultantDetail = "Please specify your consulting field.";
}

if (profession === "Other (Please Specify Below)" && !otherDetail.trim()) {
  errors.otherDetail = "Please specify your profession.";
}


  if (!professionalContribution.trim()) {
    errors.professionalContribution = "This field is required.";
  }
  if (!interestReason.trim()) {
    errors.interestReason = "This field is required.";
  }
  if (!culinarySkills.trim()) {
    errors.culinarySkills = "This field is required.";
  }
  if (!cuisineInterests.trim()) {
    errors.cuisineInterests = "This field is required.";
  }
  if (!restaurantRecommendations.trim()) {
    errors.restaurantRecommendations = "This field is required.";
  }

  if (!diningFrequency.trim()) {
    errors.diningFrequency = "Please select your dining frequency.";
  }

  if (!availableDays.length) {
    errors.availableDays = "Please select at least one day.";
  }

  if (!membershipGoals.length) {
    errors.membershipGoals = "Please select at least one goal.";
  }

  if (!cohostingInterest.trim()) {
    errors.cohostingInterest = "Please select an option.";
  }

  if (!referralSource.trim() || referralSource === "Select option") {
    errors.referralSource = "Referral source is required.";
  }

if (instagramUrl && !instagramRegex.test(instagramUrl.trim())) {
  errors.instagramUrl = "Enter a valid Instagram profile URL.";
}

if (linkedinUrl && !linkedinRegex.test(linkedinUrl.trim())) {
  errors.linkedinUrl = "Enter a valid LinkedIn profile URL.";
}


  return errors;
};
export const validateField = (name, value) => {
  switch (name) {
    case "email":
      if (!value) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Invalid email address";
      break;

    case "fullName":
      if (!value.trim()) return "Full name is required";
      break;

    case "phoneNumber":
      if (!value.trim()) return "Phone number is required";
      if (!/^\+?[0-9\s\-()]{7,}$/.test(value))
        return "Invalid phone number format";
      break;

    case "profession":
      if (!value || value === "Select your profession")
        return "Profession is required";
      break;
    
case "consultantDetail":
  if (!value.trim()) return "Please specify your consulting field.";
  break;

case "otherDetail":
  if (!value.trim()) return "Please specify your profession.";
  break;


    case "professionalContribution":
      if (!value.trim()) return "This field is required";
      break;

    case "interestReason":
      if (!value.trim()) return "This field is required";
      break;

    case "culinarySkills":
      if (!value.trim()) return "This field is required";
      break;

    case "cuisineInterests":
      if (!value.trim()) return "This field is required";
      break;

    case "restaurantRecommendations":
      if (!value.trim()) return "This field is required";
      break;

    case "diningFrequency":
      if (!value) return "Please select a dining frequency";
      break;

    case "availableDays":
      if (!value || value.length === 0) return "Select at least one day";
      break;

    case "membershipGoals":
      if (!value || value.length === 0) return "Select at least one goal";
      break;

    case "cohostingInterest":
      if (!value) return "Please select an option";
      break;

    case "referralSource":
      if (!value || value === "Select option")
        return "Referral source is required";
      break;

    case "instagramUrl":
  if (value && !instagramRegex.test(value)) {
    return "Enter a valid Instagram profile URL";
  }
  break;
   case "linkedinUrl":
  if (value && !linkedinRegex.test(value)) {
    return "Enter a valid LinkedIn profile URL";
  }
  break;

    default:
      return "";
  }
  return "";
};
