import { useState, useEffect } from "react";
import { getClinicIntroduction } from "../api/clinicIntroAPI.jsx";
import SocialLinks from "./ui/SocialLinks.jsx";
import ContactInfo from "./ui/ContactInfo.jsx";

const Topbar = () => {
  const [clinicInfo, setClinicInfo] = useState(null);
  useEffect(() => {
    const fetchClinicInfo = async () => {
      try {
        const data = await getClinicIntroduction();
        setClinicInfo(data);
      } catch (error) {
        console.error("Failed to fetch clinic information:", error);
      }
    };
    fetchClinicInfo();
  }, []);
  return (
    <div className="bg-white max-w-[1480px] mx-auto py-6">
      <div className="container-fluid px-4">
        <div className="flex items-center">
          <div className="w-3/4">
            <ContactInfo clinicInfo={clinicInfo} />
          </div>
          <div className="w-1/4">
            <SocialLinks className="justify-end" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
