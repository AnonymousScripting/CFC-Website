import { Shield, Cake, Users, BookOpen, PlayCircle, Phone } from "lucide-react";
import BenefitCard from "./BenefitCard";

const MembershipPrivileges = () => {
  const benefitsData = [
    {
      icon: Shield,
      title: "Exclusive Dining Access",
      items: [
        "Priority reservations at partner restaurants,",
        "exclusive access to sold-out culinary events throughout Chicago.",
      ],
    },
    {
      icon: Cake,
      title: "Private Events & Tastings",
      items: [
        "Members-only dinners, chef's table experiences,",
        "specialty food tastings, and curated culinary tours.",
      ],
    },
    {
      icon: Users,
      title: "Community Networking",
      items: [
        "Connect with like-minded professionals, industry leaders,",
        "and tastemakers in an intimate and relaxed setting.",
      ],
    },
    {
      icon: BookOpen,
      title: "Culinary Education",
      items: [
        "Master classes, workshops, and demonstrations",
        "with renowned chefs, sommeliers, and culinary experts.",
      ],
    },
    {
      icon: PlayCircle,
      title: "Early Access & Previews",
      items: [
        "Be among the first to experience new restaurant openings,",
        "menu launches, and special culinary collaborations.",
      ],
    },
    {
      icon: Phone,
      title: "Concierge Service",
      items: [
        "Personalized assistance with dining recommendations and",
        "reservations at hard-to-book venues in Chicago and beyond.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF3E4] flex items-center justify-center py-4">
      <div className="w-full bg-[#FBF3E4]">
        {/* Header Section */}
        <div className="p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[#c8a76f] tracking-widest text-sm mb-4 font-montserrat">
              MEMBER PRIVILEGES
            </h2>
            <h1 className="text-3xl md:text-3xl font-bold font-playfair text-[#212121] mb-6">
              Membership Benefits
            </h1>
            <p className="text-lg md:text-lg text-[#404040] leading-relaxed font-montserrat">
              Joining the Chicago Food Club opens doors to extraordinary
              culinary experiences, valuable connections, and exclusive access
              to the city's most sought-after dining destinations.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="flex justify-center px-4 md:px-8 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
            {benefitsData.map((benefit, index) => (
              <BenefitCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                items={benefit.items}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MembershipPrivileges;
