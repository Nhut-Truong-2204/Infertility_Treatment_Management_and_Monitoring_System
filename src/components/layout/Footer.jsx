import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-20 py-10">
      <div className="flex flex-col md:flex-row md:justify-between gap-10">
        {/* Left section */}
        <div className="md:w-1/2 space-y-6">
          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold">Planned <br />Parenthood<sup className="text-xs">®</sup></h1>
            <p className="text-sm text-gray-400 mt-1">Care. No matter what.</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed">
            Planned Parenthood Federation of America, Inc. (PPFA) works to protect and expand access to sexual and reproductive health care and education...
          </p>

          {/* Social icons */}
          <div className="flex space-x-4 text-xl text-white">
            <FaFacebookF className="hover:text-gray-300 cursor-pointer" />
            <FaTwitter className="hover:text-gray-300 cursor-pointer" />
            <FaInstagram className="hover:text-gray-300 cursor-pointer" />
            <FaYoutube className="hover:text-gray-300 cursor-pointer" />
            <FaTiktok className="hover:text-gray-300 cursor-pointer" />
          </div>
        </div>

        {/* Right section - Grid menu */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Column 1 */}
          <div>
            <h4 className="font-bold mb-2">ABOUT US</h4>
            <ul className="space-y-1 text-gray-400">
              <li>Who We Are</li>
              <li>Leadership</li>
              <li>Annual Reports</li>
              <li>Local Offices</li>
              <li>Global</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold mb-2">GET INVOLVED</h4>
            <ul className="space-y-1 text-gray-400">
              <li>Take Action</li>
              <li>Share Your Story</li>
              <li>Volunteer</li>
              <li>Shop</li>
              <li>Research Recruitment</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold mb-2">RESOURCES</h4>
            <ul className="space-y-1 text-gray-400">
              <li>Careers</li>
              <li>Facts & Figures</li>
              <li>Newsroom</li>
              <li>Press Releases</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-bold mb-2">ABOUT THIS SITE</h4>
            <ul className="space-y-1 text-gray-400">
              <li>Terms of Use</li>
              <li>Privacy Notice</li>
              <li>Washington Privacy</li>
              <li>Sitemap</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-xs text-gray-400 flex flex-col md:flex-row md:justify-between gap-4">
        <div>© 2025 Planned Parenthood Federation of America Inc.</div>
        <div className="flex flex-wrap gap-4">
          <span className="hover:underline cursor-pointer">Cookie Settings</span>
          <span className="hover:underline cursor-pointer">Privacy Notice</span>
          <span className="hover:underline cursor-pointer">Washington Privacy</span>
          <span className="hover:underline cursor-pointer">Terms of Use</span>
          <span className="hover:underline cursor-pointer">Contact Us</span>
        </div>
      </div>
    </footer>
  );
}
