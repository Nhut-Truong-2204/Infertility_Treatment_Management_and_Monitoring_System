import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "../../config/axios";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FeedbackCarousel() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const res = await axios.get("/api/feedback/public", {
          params: { page: 0, size: 20 },
        });
        if (res.data?.data?.content) {
          // Sort by ratingScore descending
          const sorted = res.data.data.content
            .filter((fb) => fb.isPublic)
            .sort((a, b) => b.ratingScore - a.ratingScore);
          setFeedbacks(sorted);
        }
      } catch {
        setFeedbacks([]);
      }
    }
    fetchFeedbacks();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    rtl: true, // Reverse direction
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Khách hàng nói gì về chúng tôi?
      </h2>
      <Slider {...settings}>
        {feedbacks.map((fb) => (
          <div key={fb.feedbackId} style={{ padding: "1rem" }}>
            <div
              style={{
                background: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px #eee",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  {fb.patientName}
                </span>
                <span style={{ marginLeft: "auto", color: "#f5b50a" }}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < fb.ratingScore ? "#f5b50a" : "#ddd"}
                    />
                  ))}
                </span>
              </div>
              <div
                style={{
                  fontStyle: "italic",
                  color: "#888",
                  marginBottom: "0.5rem",
                }}
              >
                {fb.serviceName} {fb.doctorName ? `- ${fb.doctorName}` : ""}
              </div>
              <div style={{ marginBottom: "0.5rem" }}>{fb.feedbackContent}</div>
              {fb.clinicResponse && (
                <div
                  style={{
                    background: "#f6f6f6",
                    borderRadius: "6px",
                    padding: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <strong>Phản hồi từ phòng khám:</strong> {fb.clinicResponse}
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default FeedbackCarousel;
