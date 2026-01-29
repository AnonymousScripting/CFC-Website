const BenefitCard = ({ icon: IconComponent, title, items }) => {
  return (
    <div className="p-4">
      {/* Icon (apni line pe, gold color) */}
      <div className="mb-4">
        <IconComponent className="w-12 h-12 text-[#c8a76f]" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-[#212121] font-playfair mb-2">{title}</h3>

      {/* Description */}
      <p className="text-[#404040] text-base leading-relaxed font-montserrat">
        {items.join(" ")}
      </p>
    </div>
  );
};

export default BenefitCard;
