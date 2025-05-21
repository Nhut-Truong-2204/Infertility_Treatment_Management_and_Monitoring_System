const ViewTestingServiceList = () => {

  const testServices = [
    {
      id: 1,
      name: "Xét nghiệm máu tổng quát",
      price: 500000,
      description: "Kiểm tra các chỉ số sinh học cơ bản trong máu."
    },
    {
      id: 2,
      name: "Xét nghiệm HIV",
      price: 250000,
      description: "Kiểm tra kháng thể HIV trong máu."
    },
    {
      id: 3,
      name: "Xét nghiệm viêm gan B",
      price: 300000,
      description: "Phát hiện virus viêm gan B (HBV) qua máu."
    },
    {
      id: 4,
      name: "Xét nghiệm viêm gan C",
      price: 320000,
      description: "Phát hiện kháng thể viêm gan C (HCV)."
    },
    {
      id: 5,
      name: "Xét nghiệm nội tiết tố nữ",
      price: 650000,
      description: "Kiểm tra hormone estrogen, progesterone,..."
    },
    {
      id: 6,
      name: "Xét nghiệm tinh dịch đồ",
      price: 700000,
      description: "Đánh giá số lượng và chất lượng tinh trùng."
    },
    {
      id: 7,
      name: "Xét nghiệm ung thư cổ tử cung (Pap smear)",
      price: 450000,
      description: "Tầm soát tế bào bất thường ở cổ tử cung."
    },
    {
      id: 8,
      name: "Xét nghiệm tiểu đường (HbA1c)",
      price: 200000,
      description: "Đo chỉ số đường huyết trong vòng 3 tháng gần nhất."
    },
    {
      id: 9,
      name: "Xét nghiệm nước tiểu",
      price: 150000,
      description: "Kiểm tra chức năng thận, đường, viêm nhiễm."
    },
    {
      id: 10,
      name: "Xét nghiệm dị tật thai nhi (Double test)",
      price: 900000,
      description: "Đánh giá nguy cơ dị tật bẩm sinh ở thai nhi."
    },
    {
      id: 1,
      name: "Xét nghiệm máu tổng quát",
      price: 500000,
      description: "Kiểm tra các chỉ số sinh học cơ bản trong máu."
    },
    {
      id: 2,
      name: "Xét nghiệm HIV",
      price: 250000,
      description: "Kiểm tra kháng thể HIV trong máu."
    },
    {
      id: 3,
      name: "Xét nghiệm viêm gan B",
      price: 300000,
      description: "Phát hiện virus viêm gan B (HBV) qua máu."
    },
    {
      id: 4,
      name: "Xét nghiệm viêm gan C",
      price: 320000,
      description: "Phát hiện kháng thể viêm gan C (HCV)."
    },
    {
      id: 5,
      name: "Xét nghiệm nội tiết tố nữ",
      price: 650000,
      description: "Kiểm tra hormone estrogen, progesterone,..."
    },
    {
      id: 6,
      name: "Xét nghiệm tinh dịch đồ",
      price: 700000,
      description: "Đánh giá số lượng và chất lượng tinh trùng."
    },
    {
      id: 7,
      name: "Xét nghiệm ung thư cổ tử cung (Pap smear)",
      price: 450000,
      description: "Tầm soát tế bào bất thường ở cổ tử cung."
    },
    {
      id: 8,
      name: "Xét nghiệm tiểu đường (HbA1c)",
      price: 200000,
      description: "Đo chỉ số đường huyết trong vòng 3 tháng gần nhất."
    },
    {
      id: 9,
      name: "Xét nghiệm nước tiểu",
      price: 150000,
      description: "Kiểm tra chức năng thận, đường, viêm nhiễm."
    },
    {
      id: 10,
      name: "Xét nghiệm dị tật thai nhi (Double test)",
      price: 900000,
      description: "Đánh giá nguy cơ dị tật bẩm sinh ở thai nhi."
    },
    {
      id: 1,
      name: "Xét nghiệm máu tổng quát",
      price: 500000,
      description: "Kiểm tra các chỉ số sinh học cơ bản trong máu."
    },
    {
      id: 2,
      name: "Xét nghiệm HIV",
      price: 250000,
      description: "Kiểm tra kháng thể HIV trong máu."
    },
    {
      id: 3,
      name: "Xét nghiệm viêm gan B",
      price: 300000,
      description: "Phát hiện virus viêm gan B (HBV) qua máu."
    },
    {
      id: 4,
      name: "Xét nghiệm viêm gan C",
      price: 320000,
      description: "Phát hiện kháng thể viêm gan C (HCV)."
    },
    {
      id: 5,
      name: "Xét nghiệm nội tiết tố nữ",
      price: 650000,
      description: "Kiểm tra hormone estrogen, progesterone,..."
    },
    {
      id: 6,
      name: "Xét nghiệm tinh dịch đồ",
      price: 700000,
      description: "Đánh giá số lượng và chất lượng tinh trùng."
    },
    {
      id: 7,
      name: "Xét nghiệm ung thư cổ tử cung (Pap smear)",
      price: 450000,
      description: "Tầm soát tế bào bất thường ở cổ tử cung."
    },
    {
      id: 8,
      name: "Xét nghiệm tiểu đường (HbA1c)",
      price: 200000,
      description: "Đo chỉ số đường huyết trong vòng 3 tháng gần nhất."
    },
    {
      id: 9,
      name: "Xét nghiệm nước tiểu",
      price: 150000,
      description: "Kiểm tra chức năng thận, đường, viêm nhiễm."
    },
    {
      id: 10,
      name: "Xét nghiệm dị tật thai nhi (Double test)",
      price: 900000,
      description: "Đánh giá nguy cơ dị tật bẩm sinh ở thai nhi."
    }
  ];

  return (
    <div>
      <div className="p-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-6">
          {testServices.map(service => (
            <div key={service.id} className="bg-white shadow-md rounded p-4">
              <h2 className="text-xl font-semibold">{service.name}</h2>
              <p className="text-gray-600">{service.description}</p>
              <p className="text-blue-600 font-bold mt-2">{service.price.toLocaleString("vi-VN")} ₫</p>
              <button
                onClick={() => goToDetail(service.id)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ViewTestingServiceList