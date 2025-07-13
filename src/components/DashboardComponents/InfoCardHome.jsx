import { Clock, MapPin, CalendarCheck } from "lucide-react";

const InfoCardHome = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {/* Card 1: Schedule hours */}
      <div className="bg-[#f5f6fe] rounded-2xl p-6 flex flex-col justify-between shadow">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-[#14183E]">Schedule hours</h3>
            <Clock className="text-[#14183E]" />
          </div>
          <hr className="mb-4 border-[#e0e0e0]" />
          <div className="text-sm text-[#14183E] space-y-2">
            <div className="flex justify-between">
              <span>Monday - Thursday</span>
              <span>07:00 - 17:00</span>
            </div>

            <div className="flex justify-between">
              <span>Saturday</span>
              <span>07:00 - 11:00</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday</span>
              <span>Day off</span>
            </div>
          </div>
        </div>
        <button className="mt-6 bg-[#FF5CA2] text-white font-bold py-2 rounded-lg">
          24/7 For Emergencies
        </button>
      </div>

      {/* Card 2: Our locations */}
      <div className="bg-[#FF5CA2] rounded-2xl p-6 flex flex-col justify-between shadow text-white">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Our locations</h3>
            <MapPin />
          </div>
          <hr className="mb-4 border-[#f38ab6]" />
          <p className="text-sm mb-4">
            Providing expert IVF care locally with technology compassionate
            specialists.
          </p>
          <p className="font-bold text-lg">
            123 Fertility Lane, Lorem City, 45678
          </p>
        </div>
        <button className="mt-6 bg-[#14183E] text-white font-bold py-2 rounded-lg">
          24/7 For Emergencies
        </button>
      </div>

      {/* Card 3: Appointments */}
      <div className="bg-[#14183E] rounded-2xl p-6 flex flex-col justify-between shadow text-white">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Appointments</h3>
            <CalendarCheck />
          </div>
          <hr className="mb-4 border-[#2f3760]" />
          <p className="text-sm mb-4">
            Book your IVF consultation today with our trusted fertility experts.
          </p>
          <p className="font-bold text-xl">+91-258-8520</p>
        </div>
        <button className="mt-6 bg-[#FF5CA2] text-white font-bold py-2 rounded-lg">
          24/7 For Emergencies
        </button>
      </div>
    </div>
  );
};

export default InfoCardHome;
