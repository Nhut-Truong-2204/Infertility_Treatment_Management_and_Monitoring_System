import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import TreatmentProtocolModal from "./TreatmentProtocolModal";
import {
  getTreatmentMethods,
  getProtocolTemplates,
} from "../../api/treatmentMethodsAPI";
import {
  MEDICAL_COLORS,
  MEDICAL_GRADIENTS,
  MEDICAL_SHADOWS,
} from "../../styles/medicalTheme";
import {
  FaUserMd,
  FaShieldAlt,
  FaHeartbeat,
  FaBaby,
  FaVial,
  FaUserFriends,
} from "react-icons/fa";

const ServiceList = () => {
  const [methods, setMethods] = useState([]);
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [methodsRes, protocolsRes] = await Promise.all([
          getTreatmentMethods(),
          getProtocolTemplates(),
        ]);
        setMethods(methodsRes.data || []);
        setProtocols(protocolsRes.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Không thể tải dữ liệu dịch vụ điều trị.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-16 text-lg font-semibold text-primary">
        Đang tải...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-600 py-8 font-semibold">{error}</div>
    );

  // Sử dụng theme từ medicalTheme.js
  const theme = {
    sectionBg: "bg-[linear-gradient(180deg,_#f4f5ff_0%,_#fdeee6_100%)]", // fallback nếu không dùng style inline
    cardBg: "bg-white/90",
    cardBorder: `border-[2px] border-[${MEDICAL_COLORS.primary[100]}]`,
    cardShadow: "shadow-lg hover:shadow-2xl",
    badgeSafe: `bg-[${MEDICAL_COLORS.accent[100]}] text-[${MEDICAL_COLORS.accent[500]}]`,
    badgePersonal: `bg-[${MEDICAL_COLORS.info[100]}] text-[${MEDICAL_COLORS.info[500]}]`,
    badgeExpert: `bg-[${MEDICAL_COLORS.success[100]}] text-[${MEDICAL_COLORS.success[600]}]`,
    btn: `bg-[${MEDICAL_COLORS.accent[500]}] hover:bg-[${MEDICAL_COLORS.primary[500]}]`,
    btnGradient: "bg-[linear-gradient(90deg,_#ff70a3_0%,_#3b82f6_100%)]",
    protocolEven: `bg-[linear-gradient(135deg,_${MEDICAL_COLORS.primary[50]}_0%,_${MEDICAL_COLORS.info[50]}_100%)] border-[${MEDICAL_COLORS.info[100]}]`,
    protocolOdd: `bg-[linear-gradient(135deg,_${MEDICAL_COLORS.accent[100]}_0%,_${MEDICAL_COLORS.accent[50]}_100%)] border-[${MEDICAL_COLORS.accent[100]}]`,
    title: `text-[${MEDICAL_COLORS.primary[500]}]`,
    shadow: "shadow-lg",
  };

  return (
    <section
      className={`py-10 md:py-16 ${theme.sectionBg}`}
      style={{ background: MEDICAL_GRADIENTS.gentle }}
    >
      <div className="text-center mb-12">
        <div
          className="inline-flex items-center gap-3 px-8 py-3 rounded-full font-bold text-2xl tracking-wide relative border-4 border-white"
          style={{
            background: MEDICAL_GRADIENTS.primary,
            color: "#fff",
            boxShadow: MEDICAL_SHADOWS.large,
          }}
        >
          <FaBaby
            className="text-3xl"
            style={{ color: MEDICAL_COLORS.accent[500] }}
          />
          Dịch vụ điều trị hiếm muộn
          <FaHeartbeat
            className="text-2xl"
            style={{ color: MEDICAL_COLORS.primary[500] }}
          />
        </div>
        <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg font-medium text-gray-600">
          Khám phá các dịch vụ điều trị{" "}
          <span
            style={{ color: MEDICAL_COLORS.accent[500] }}
            className="font-semibold"
          >
            hiện đại
          </span>
          ,{" "}
          <span
            style={{ color: MEDICAL_COLORS.info[500] }}
            className="font-semibold"
          >
            cá nhân hóa
          </span>{" "}
          và{" "}
          <span
            style={{ color: MEDICAL_COLORS.success[600] }}
            className="font-semibold"
          >
            an toàn
          </span>{" "}
          tại trung tâm của chúng tôi. Đội ngũ chuyên môn, công nghệ tiên tiến,
          quy trình minh bạch, bảo mật tuyệt đối.
        </p>
      </div>

      {/* Carousel dịch vụ */}
      <div className="max-w-5xl mx-auto">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          loop={true}
          speed={700}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
          className="pb-10"
        >
          {methods.map((method, idx) => (
            <SwiperSlide key={method.treatmentMethodId}>
              <div
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`relative ${theme.cardBg} ${theme.cardBorder} rounded-3xl ${theme.cardShadow} p-8 min-h-[280px] flex flex-col justify-between group overflow-hidden`}
              >
                <div className="absolute right-0 top-0 h-full w-2/5 z-0 pointer-events-none">
                  <img
                    src={method.imageUrl || "/hero-img.png"}
                    alt={method.methodName}
                    className="h-full w-full object-cover rounded-tr-3xl rounded-br-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-200"
                  />
                </div>
                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    <FaVial
                      style={{ color: MEDICAL_COLORS.accent[500] }}
                      className="text-lg"
                    />
                    <h3
                      className={`text-xl md:text-2xl font-bold font-display drop-shadow-sm ${theme.title}`}
                    >
                      {method.methodName}
                    </h3>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed mb-3 line-clamp-4">
                    {method.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${theme.badgeSafe}`}
                    >
                      <FaShieldAlt
                        style={{ color: MEDICAL_COLORS.accent[500] }}
                      />{" "}
                      An toàn
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${theme.badgePersonal}`}
                    >
                      <FaUserFriends
                        style={{ color: MEDICAL_COLORS.info[500] }}
                      />{" "}
                      Cá nhân hóa
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${theme.badgeExpert}`}
                    >
                      <FaUserMd
                        style={{ color: MEDICAL_COLORS.success[600] }}
                      />{" "}
                      Chuyên gia
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Danh sách phác đồ mẫu */}
      <div className="max-w-5xl mx-auto mt-14">
        <h4
          className={`text-lg md:text-xl font-bold mb-7 flex items-center gap-2 ${theme.title}`}
        >
          <FaVial style={{ color: MEDICAL_COLORS.accent[500] }} /> Các phác đồ
          điều trị mẫu
        </h4>
        <div className="flex flex-col gap-8">
          {protocols.map((protocol, idx) => (
            <div
              key={protocol.treatmentProtocolTemplateId}
              className={`flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 p-7 rounded-3xl ${
                theme.shadow
              } border-2 ${
                idx % 2 === 0 ? theme.protocolEven : theme.protocolOdd
              } transition-all`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <FaHeartbeat style={{ color: MEDICAL_COLORS.accent[500] }} />
                  <span
                    className={`font-semibold text-base md:text-lg ${theme.title}`}
                  >
                    {protocol.templateName}
                  </span>
                  <span className="ml-2 text-xs text-gray-400">
                    ({protocol.version})
                  </span>
                </div>
                <div className="text-gray-700 text-sm md:text-base mb-1">
                  {protocol.description}
                </div>
                <div className="text-xs md:text-sm text-gray-500 mb-1">
                  <span className="font-semibold">Phương pháp:</span>{" "}
                  {protocol.treatmentMethodName}
                </div>
                {protocol.targetPatientProfile && (
                  <div className="text-xs md:text-sm text-gray-500 mb-1">
                    <span className="font-semibold">Đối tượng:</span>{" "}
                    {protocol.targetPatientProfile}
                  </div>
                )}
              </div>
              <div className="flex items-center md:justify-end">
                <button
                  className={`px-6 py-2.5 rounded-lg font-bold text-white text-base min-w-[130px] ${theme.btnGradient} shadow-md hover:scale-105 hover:shadow-lg transition-all`}
                  onClick={() => setSelectedProtocol(protocol)}
                >
                  Xem timeline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProtocol && (
        <TreatmentProtocolModal
          protocol={selectedProtocol}
          onClose={() => setSelectedProtocol(null)}
        />
      )}
    </section>
  );
};

export default ServiceList;
