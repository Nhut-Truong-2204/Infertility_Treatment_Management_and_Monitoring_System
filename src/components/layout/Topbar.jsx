import { Phone, Mail, MapPin } from 'lucide-react';

const Topbar = () => {
  return (
    <div className="bg-gray-100 text-sm text-gray-700 py-2 px-4 flex flex-col md:flex-row justify-between items-center">
      <div className="flex space-x-6 items-center">
        <div className="flex items-center space-x-1">
          <Phone className="w-4 h-4" />
          <span>+91-258-8520</span>
        </div>
        <div className="flex items-center space-x-1">
          <Mail className="w-4 h-4" />
          <span>info@domainname.com</span>
        </div>
        <div className="hidden md:flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span>123 High Street, London, W1, UK</span>
        </div>
      </div>
      <div className="mt-2 md:mt-0 flex space-x-4">
        <a href="#" className="hover:text-blue-600"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="hover:text-blue-400"><i className="fab fa-twitter"></i></a>
        <a href="#" className="hover:text-pink-500"><i className="fab fa-instagram"></i></a>
        <a href="#" className="hover:text-red-600"><i className="fab fa-pinterest-p"></i></a>
      </div>
    </div>
  );
};

export default Topbar;
