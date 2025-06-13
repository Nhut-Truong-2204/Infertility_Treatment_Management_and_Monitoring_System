import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    fetchDoctors();
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDoctor, selectedDate]);

  const fetchDoctors = async () => {
    // Replace with real API call
    const res = await fetch("/api/doctors");
    const data = await res.json();
    setDoctors(data.map((doc) => ({ value: doc.id, label: doc.fullName })));
  };

  const fetchServices = async () => {
    // Replace with real API call
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data.map((svc) => ({ value: svc.id, label: svc.name })));
  };

  const fetchAvailableSlots = async () => {
    const res = await fetch();
    const data = await res.json();
    setAvailableSlots(data);
  };

  const handleBooking = () => {
    // Post booking data to API
    const payload = {
      doctorId: selectedDoctor.value,
      serviceId: selectedService.value,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedSlot,
      reason,
      note,
    };
    console.log("Booking payload:", payload);
  };

  return (
    <Card className="p-6 shadow-2xl max-w-3xl mx-auto my-10">
      <CardContent className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Đặt lịch khám bệnh
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Chọn bác sĩ</label>
            <Select
              options={doctors}
              onChange={setSelectedDoctor}
              placeholder="Chọn bác sĩ..."
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Chọn dịch vụ</label>
            <Select
              options={services}
              onChange={setSelectedService}
              placeholder="Chọn dịch vụ..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Chọn ngày</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Chọn giờ khám</label>
            <Select
              options={availableSlots.map((slot) => ({
                value: slot,
                label: slot,
              }))}
              onChange={(option) => setSelectedSlot(option.value)}
              placeholder="Chọn khung giờ..."
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Lý do khám</label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Nhập lý do khám bệnh"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Ghi chú</label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ghi chú thêm (nếu có)"
          />
        </div>

        <Button className="w-full mt-4" onClick={handleBooking}>
          Đặt lịch khám
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
