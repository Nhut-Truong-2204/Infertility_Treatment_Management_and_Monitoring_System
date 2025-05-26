// components/PageHeader.jsx
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Header = ({ title, description, imageSrc }) => {
  return (
    <section className="relative w-full h-[500px] md:h-[600px]">
      {/* Background image */}
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-9 bg-gradient-to-r from-black/100 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="relative z-9 flex items-center h-full max-w-7xl mx-auto px-6">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-lg leading-relaxed">{description}</p>
        </div>
      </div>
    </section>
  );
}
export default Header;