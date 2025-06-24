// src/components/TreatmentHistory.jsx
import React, { useEffect, useState } from 'react';
import { getTreatmentHistory } from '../../api/customer/historyApi'; // Import the API function

const TreatmentHistory = () => {
  const [data, setData] = useState({ protocols: [], visits: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const result = await getTreatmentHistory(); // Call the API function
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  if (loading) return <div className="text-center mt-10">Đang tải...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    
    <div className="container mx-auto p-5">
        <div
            className="text-center py-35 rounded-3xl mb-20 "
            style={{
              backgroundImage: "url('https://i.pinimg.com/736x/46/5a/f1/465af15f6684b1ea0d799fda31c951e3.jpg')",
              backgroundSize: 'auto',
              backgroundPosition: 'center',
              position: 'relative',
              overflow: 'hidden',

              backgroundColor: 'rgba(0, 41, 59, 0.8)', // deep blue overlay
            }}

          >
           {/* Overlay div */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(0, 94, 184, 0.8)', // deep blue overlay
          }}
        ></div>
        {/* Content goes here (e.g., text, buttons) */}
        <div className="relative z-10 p-10 text-white">
          <h1 className="text-4xl font-bold">History</h1>
          <p className="mt-6 text-lg">Ai mà không có một thời quá khứ đen tối<></></p>
        </div> 
          </div>
      
      <h1 className="text-2xl font-bold mb-30 text-center">Lịch Sử Điều Trị</h1>

      {/* Phần Protocols */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Giao Thức Điều Trị</h2>
        {data.protocols.length > 0 ? (
          <div className="grid gap-4">
            {data.protocols.map((protocol, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <p><strong>Tên:</strong> {protocol.protocolName}</p>
                <p><strong>Ngày bắt đầu:</strong> {new Date(protocol.startDate).toLocaleDateString()}</p>
                <p><strong>Trạng thái:</strong> {protocol.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Không có giao thức điều trị nào.</p>
        )}
      </div>

      {/* Phần Visits */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Lịch Sử Khám</h2>
        {data.visits.length > 0 ? (
          <div className="grid gap-4">
            {data.visits.map((visit, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <p><strong>Ngày khám:</strong> {new Date(visit.visitDate).toLocaleDateString()}</p>
                <p><strong>Chẩn đoán:</strong> {visit.diagnosisSummary}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Không có lịch sử khám nào.</p>
        )}
      </div>
    </div>
  );
};

export default TreatmentHistory;