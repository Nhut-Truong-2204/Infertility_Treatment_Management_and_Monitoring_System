import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, FileText, Activity, AlertCircle, Search, Filter, ChevronDown, ChevronRight } from 'lucide-react';


const TreatmentHistory = () => {
  const [treatmentData, setTreatmentData] = useState({ protocols: [], visits: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());




  useEffect(() => {
    const fetchTreatmentHistory = async () => {
      try {
        setLoading(true);

        const response = await instance.get("/api/customer/treatment-history");

        if (response.data.success) {
          const { protocols, visits } = response.data.data;
          setTreatmentData({ protocols, visits });
        } else {
          setError("Không thể lấy dữ liệu từ máy chủ");
        }
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể tải dữ liệu lịch sử điều trị");
      } finally {
        setLoading(false);
      }
    };

    fetchTreatmentHistory();
  }, []);


  const toggleExpanded = (type, id) => {
    const key = `${type}-${id}`;
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Đang điều trị';
      case 'completed': return 'Hoàn thành';
      case 'paused': return 'Tạm dừng';
      default: return 'Không xác định';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const filteredData = () => {
    let protocols = treatmentData.protocols;
    let visits = treatmentData.visits;

    if (searchTerm) {
      protocols = protocols.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.doctor.toLowerCase().includes(searchTerm.toLowerCase())
      );
      visits = visits.filter(v =>
        v.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return { protocols, visits };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Có lỗi xảy ra</h3>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const data = filteredData();

  return (
    <div className="min-h-screen bg-[#fff] p-6 pt-30">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ... giữ nguyên phần header, filters và thống kê ... */}

        {/* Treatment Protocols */}
        {(activeTab === 'all' || activeTab === 'protocols') && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              Phác Đồ Điều Trị
            </h2>
            <div className="space-y-4">
              {data.protocols.map((protocol) => (
                <div key={protocol.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex-1" onClick={() => toggleExpanded('protocol', protocol.id)}>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{protocol.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(protocol.status)}`}>
                            {getStatusText(protocol.status)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {protocol.doctor}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(protocol.startDate)}
                            {protocol.endDate && ` - ${formatDate(protocol.endDate)}`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => toggleExpanded('protocol', protocol.id)}>
                          {expandedItems.has(`protocol-${protocol.id}`) ? <ChevronDown className="h-5 w-5 text-gray-400" /> : <ChevronRight className="h-5 w-5 text-gray-400" />}
                        </button>
                        
                      </div>
                    </div>
                  </div>

                  {expandedItems.has(`protocol-${protocol.id}`) && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="pt-4 space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Mô tả</h4>
                          <p className="text-gray-600">{protocol.description}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Thuốc điều trị</h4>
                          <div className="flex flex-wrap gap-2">
                            {protocol.medications.map((med, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                                {med}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visit History */}
        {(activeTab === 'all' || activeTab === 'visits') && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-green-600" />
              Lịch Sử Khám Bệnh
            </h2>
            <div className="space-y-4">
              {data.visits.map((visit) => (
                <div key={visit.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex-1" onClick={() => toggleExpanded('visit', visit.id)}>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{visit.type}</h3>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {visit.department}
                          </span>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(visit.date)}
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {visit.doctor}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{visit.diagnosis}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => toggleExpanded('visit', visit.id)}>
                          {expandedItems.has(`visit-${visit.id}`) ? <ChevronDown className="h-5 w-5 text-gray-400" /> : <ChevronRight className="h-5 w-5 text-gray-400" />}
                        </button>
                       
                      </div>
                    </div>
                  </div>

                  {expandedItems.has(`visit-${visit.id}`) && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="pt-4 space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Ghi chú khám bệnh</h4>
                          <p className="text-gray-600">{visit.notes}</p>
                        </div>
                        {visit.prescriptions && visit.prescriptions.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Đơn thuốc</h4>
                            <div className="space-y-1">
                              {visit.prescriptions.map((prescription, index) => (
                                <div key={index} className="flex items-center text-sm text-gray-600">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                  {prescription}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentHistory;
