import { useEffect, useState } from "react";
import axios from "../../config/axios";

// Custom hook để lấy danh sách feedback công khai đã được phản hồi
export default function usePublicFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const res = await axios.get("/api/feedback/public", {
          params: { page: 0, size: 20 },
        });
        if (res.data?.data?.content) {
          console.log("API /api/feedback/public response:", res.data);
          // Chỉ lấy feedback công khai và đã được phản hồi
          const filtered = res.data.data.content
            .filter((fb) => fb.isPublic && fb.clinicResponse)
            .sort((a, b) => b.ratingScore - a.ratingScore);
          setFeedbacks(filtered);
        }
      } catch {
        setFeedbacks([]);
      }
    }
    fetchFeedbacks();
  }, []);

  return feedbacks;
}
