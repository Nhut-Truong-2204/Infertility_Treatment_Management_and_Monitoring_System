import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    Calendar,
    Clock,
    User,
    Info,
    Eye,
    UserCheck,
    Stethoscope,
    MapPin,
    Phone,
    Mail,
    CreditCard,
    AlertCircle,
    FileText,
    Building2,
    Timer,
    Activity,
    Heart,
    Shield,
    ClipboardList,
    Sparkles
} from 'lucide-react';
import instance from '@/config/axios';


export default function AppointmentDetailModal({
    appointmentId = 1,
    appointmentDetail,
    setAppointmentDetail
}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchAppointmentDetail = async () => {
        try {
            setLoading(true);
            const response = await instance.get(`/api/appointments/${appointmentId}`);
            setAppointmentDetail(response.data.data);
        } catch (error) {
            console.error('Lỗi khi tải chi tiết lịch hẹn:', error);
        } finally {
            setLoading(false); // luôn được gọi
        }
    };


    const handleOpen = () => {
        setOpen(true);
        fetchAppointmentDetail();
    };

    const formatDateTime = (datetime) => {
        return new Date(datetime).toLocaleString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const statusOptions = [
        { value: '', label: 'Tất cả trạng thái' },
        { value: 'SCHEDULED', label: 'Đã lên lịch', color: 'bg-blue-100 text-blue-800' },
        { value: 'CONFIRMED_BY_PATIENT', label: 'Bệnh nhân xác nhận', color: 'bg-green-100 text-green-800' },
        { value: 'CONFIRMED_BY_CLINIC', label: 'Phòng khám xác nhận', color: 'bg-indigo-100 text-indigo-800' },
        { value: 'CANCELLED_BY_PATIENT', label: 'Bệnh nhân hủy', color: 'bg-red-100 text-red-800' },
        { value: 'CANCELLED_BY_CLINIC', label: 'Phòng khám hủy', color: 'bg-red-100 text-red-800' },
        { value: 'COMPLETED', label: 'Đã hoàn thành', color: 'bg-emerald-100 text-emerald-800' },
        { value: 'NO_SHOW', label: 'Không có mặt', color: 'bg-gray-100 text-gray-800' },
        { value: 'RESCHEDULED', label: 'Đã dời lịch', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'CHECKED_IN', label: 'Đã check-in', color: 'bg-purple-100 text-purple-800' },
        { value: 'IN_PROGRESS', label: 'Đang thực hiện', color: 'bg-orange-100 text-orange-800' },
        { value: 'PENDING', label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-800' }
    ];

    const getStatusColor = (statusObj) => {
        const status = statusObj?.status || statusObj;
        return statusMap[status] || {
            value: status,
            label: 'Không xác định',
            color: 'bg-gray-100 text-gray-800'
        };
    };
    const statusMap = Object.fromEntries(
        statusOptions
            .filter(option => option.value) // bỏ "Tất cả trạng thái"
            .map(option => [option.value, option])
    );

    const InfoCard = ({ icon: Icon, title, children, className = "" }) => (
        <div className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );

    const InfoRow = ({ icon: Icon, label, value, className = "" }) => (
        <div className={`flex items-start gap-3 ${className}`}>
            <Icon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700">{label}</p>
                <p className="text-sm text-gray-900 mt-1 break-words">{value}</p>
            </div>
        </div>
    );

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg"
                onClick={handleOpen}
            >
                <Eye className="w-4 h-4" />

            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-[95vw] w-full max-h-[95vh] overflow-hidden p-0">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                                <Sparkles className="w-6 h-6" />
                                Chi tiết lịch hẹn #{appointmentId}
                            </DialogTitle>
                        </DialogHeader>
                    </div>

                    <div className="overflow-y-auto max-h-[calc(95vh-80px)] ">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                                <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
                            </div>
                        ) : appointmentDetail ? (
                            <div className="p-6 bg-gray-50 min-h-full">
                                {/* Status Badge */}

                                <div className="mb-6 flex justify-center">
                                    {(() => {
                                        const statusInfo = getStatusColor(appointmentDetail.status);
                                        return (
                                            <div className="mb-6 flex justify-center">
                                                <span className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold shadow-md ${statusInfo.color}`}>
                                                    <Activity className="w-4 h-4 mr-2" />
                                                    {statusInfo.label}
                                                </span>
                                            </div>
                                        );
                                    })()}

                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Thông tin chung */}
                                    <InfoCard icon={ClipboardList} title="Thông tin chung" className="lg:col-span-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <InfoRow
                                                icon={Calendar}
                                                label="Thời gian dự kiến"
                                                value={formatDateTime(appointmentDetail.appointmentDateTime)}
                                            />
                                            <InfoRow
                                                icon={Timer}
                                                label="Thời gian bắt đầu"
                                                value={formatDateTime(appointmentDetail.actualStartTime)}
                                            />
                                            <InfoRow
                                                icon={Clock}
                                                label="Thời gian kết thúc"
                                                value={formatDateTime(appointmentDetail.actualEndTime)}
                                            />
                                            <InfoRow
                                                icon={Timer}
                                                label="Thời gian dự kiến"
                                                value={`${appointmentDetail.estimatedDurationMinutes} phút`}
                                            />
                                            <InfoRow
                                                icon={FileText}
                                                label="Loại lịch hẹn"
                                                value={appointmentDetail.appointmentType?.typeName || appointmentDetail.appointmentType}
                                            />
                                            <InfoRow
                                                icon={AlertCircle}
                                                label="Lý do khám"
                                                value={appointmentDetail.reasonForVisit}
                                            />
                                        </div>
                                        {appointmentDetail.notes && (
                                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                                <InfoRow
                                                    icon={Info}
                                                    label="Ghi chú"
                                                    value={appointmentDetail.notes}
                                                />
                                            </div>
                                        )}
                                    </InfoCard>

                                    {/* Thông tin bệnh nhân */}
                                    {appointmentDetail.patientProfile && (
                                        <InfoCard icon={User} title="Thông tin bệnh nhân">
                                            <InfoRow
                                                icon={UserCheck}
                                                label="Họ và tên"
                                                value={appointmentDetail.patientProfile?.fullName || 'Không có thông tin'}
                                            />
                                            <InfoRow
                                                icon={FileText}
                                                label="Mã bệnh nhân"
                                                value={appointmentDetail.patientProfile?.patientCode || 'Không có thông tin'}
                                            />
                                            <InfoRow
                                                icon={Calendar}
                                                label="Ngày sinh"
                                                value={appointmentDetail.patientProfile?.dateOfBirth || 'Không có thông tin'}
                                            />
                                            <InfoRow
                                                icon={User}
                                                label="Giới tính"
                                                value={appointmentDetail.patientProfile?.gender || 'Không có thông tin'}
                                            />
                                            <InfoRow
                                                icon={Mail}
                                                label="Email"
                                                value={appointmentDetail.patientProfile?.email || 'Không có thông tin'}
                                            />
                                            <InfoRow
                                                icon={Phone}
                                                label="Điện thoại"
                                                value={appointmentDetail.patientProfile?.phoneNumber || 'Không có thông tin'}
                                            />
                                            <InfoRow
                                                icon={MapPin}
                                                label="Địa chỉ"
                                                value={appointmentDetail.patientProfile?.address || 'Không có thông tin'}
                                            />
                                            {appointmentDetail.patientProfile?.cccdCmnd && (
                                                <InfoRow
                                                    icon={FileText}
                                                    label="CCCD/CMND"
                                                    value={appointmentDetail.patientProfile?.cccdCmnd}
                                                />
                                            )}
                                            {appointmentDetail.patientProfile?.occupation && (
                                                <InfoRow
                                                    icon={Building2}
                                                    label="Nghề nghiệp"
                                                    value={appointmentDetail.patientProfile?.occupation}
                                                />
                                            )}
                                            {appointmentDetail.patientProfile?.maritalStatus?.status && (
                                                <InfoRow
                                                    icon={Heart}
                                                    label="Tình trạng hôn nhân"
                                                    value={appointmentDetail.patientProfile?.maritalStatus?.status}
                                                />
                                            )}
                                            <InfoRow
                                                icon={Heart}
                                                label="Lịch sử bệnh"
                                                value={appointmentDetail.patientProfile?.medicalHistory || 'Không có'}
                                            />
                                            <InfoRow
                                                icon={Heart}
                                                label="Lịch sử bệnh gia đình"
                                                value={appointmentDetail.patientProfile?.familyMedicalHistory || 'Không có'}
                                            />
                                            <InfoRow
                                                icon={Shield}
                                                label="Dị ứng"
                                                value={appointmentDetail.patientProfile?.allergies || 'Không có'}
                                            />
                                        </InfoCard>
                                    )}

                                    {/* bác sĩ  */}
                                    <InfoCard icon={Stethoscope} title="Thông tin bác sĩ">
                                        <InfoRow
                                            icon={UserCheck}
                                            label="Họ và tên"
                                            value={appointmentDetail.doctorUser?.userFullName || 'Không có thông tin'}
                                        />
                                        <InfoRow
                                            icon={Mail}
                                            label="Email"
                                            value={appointmentDetail.doctorUser?.userEmail || 'Không có thông tin'}
                                        />
                                        <InfoRow
                                            icon={Phone}
                                            label="Điện thoại"
                                            value={appointmentDetail.doctorUser?.userPhoneNumber || 'Không có thông tin'}
                                        />
                                        <InfoRow
                                            icon={Activity}
                                            label="Chuyên khoa"
                                            value={appointmentDetail.doctorUser?.specializationName || 'Không có thông tin'}
                                        />
                                        <InfoRow
                                            icon={Building2}
                                            label="Khoa"
                                            value={appointmentDetail.doctorUser?.departmentName || 'Không có thông tin'}
                                        />
                                        <InfoRow
                                            icon={Timer}
                                            label="Kinh nghiệm"
                                            value={
                                                appointmentDetail.doctorUser?.experienceYears != null
                                                    ? `${appointmentDetail.doctorUser.experienceYears} năm`
                                                    : 'Không có thông tin'
                                            }
                                        />
                                        <InfoRow
                                            icon={FileText}
                                            label="Bằng cấp"
                                            value={appointmentDetail.doctorUser?.qualifications || 'Không có thông tin'}
                                        />
                                        <InfoRow
                                            icon={Building2}
                                            label="Học vấn"
                                            value={appointmentDetail.doctorUser?.education || 'Không có thông tin'}
                                        />
                                        <InfoRow
                                            icon={Info}
                                            label="Giới thiệu"
                                            value={appointmentDetail.doctorUser?.shortBio || 'Không có thông tin'}
                                        />
                                        <InfoRow
                                            icon={CreditCard}
                                            label="Phí tư vấn"
                                            value={
                                                appointmentDetail.doctorUser?.consultationFee != null
                                                    ? formatCurrency(appointmentDetail.doctorUser.consultationFee)
                                                    : 'Không có thông tin'
                                            }
                                        />
                                    </InfoCard>


                                    {/* Dịch vụ & phòng */}
                                    <InfoCard icon={Building2} title="Dịch vụ & Phòng khám" className="lg:col-span-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <InfoRow
                                                icon={Activity}
                                                label="Tên dịch vụ"
                                                value={appointmentDetail.serviceDefinition?.serviceName || 'Không có thông tin'}
                                            />
                                            <InfoRow
                                                icon={FileText}
                                                label="Mã dịch vụ"
                                                value={appointmentDetail.serviceDefinition?.serviceCode || 'Không có thông tin'}
                                            />
                                            <InfoRow
                                                icon={FileText}
                                                label="Loại dịch vụ"
                                                value={appointmentDetail.serviceDefinition?.serviceType?.typeName || 'Không có thông tin'}
                                            />
                                            <InfoRow
                                                icon={CreditCard}
                                                label="Phí dịch vụ"
                                                value={
                                                    appointmentDetail.serviceDefinition?.defaultPrice != null
                                                        ? formatCurrency(appointmentDetail.serviceDefinition.defaultPrice)
                                                        : 'Không có thông tin'
                                                }
                                            />
                                            <InfoRow
                                                icon={Info}
                                                label="Mô tả dịch vụ"
                                                value={appointmentDetail.serviceDefinition?.description || 'Không có thông tin'}
                                            />
                                            <InfoRow
                                                icon={MapPin}
                                                label="Phòng khám"
                                                value={appointmentDetail.roomName || 'Không có thông tin'}
                                            />
                                        </div>
                                    </InfoCard>

                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 flex justify-center gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setOpen(false)}
                                        className="px-6 py-2"
                                    >
                                        Đóng
                                    </Button>

                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20">
                                <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                                <p className="text-red-600 text-lg font-medium">Không thể tải chi tiết cuộc hẹn</p>
                                <p className="text-gray-600 mt-2">Vui lòng thử lại sau</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}