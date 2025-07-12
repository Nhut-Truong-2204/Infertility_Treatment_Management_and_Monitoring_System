import React from "react";

const StepSelectService = ({ selectedService, setSelectedService, setFormData, setCurrentStep }) => {
  const services = [
    { typeName: "MEDICAL_EXAM", description: "Khám bệnh" },
    { typeName: "CONSULTATION", description: "Tư vấn" },
  ];

  const handleSelect = (service) => {
    setSelectedService(service);
    setFormData((prev) => ({ ...prev, appointmentType: service.typeName }));
    setCurrentStep(2);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chọn dịch vụ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <button
            key={service.typeName}
            onClick={() => handleSelect(service)}
            className={`p-4 rounded-xl border ${selectedService?.typeName === service.typeName ? "border-blue-500" : "border-gray-300"} hover:bg-blue-50 transition`}
          >
            {service.description}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepSelectService;