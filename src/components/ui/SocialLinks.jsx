import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPinterestP,
  faXTwitter,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const SocialLinks = ({
  className = "",
  iconClassName = "w-8 h-8 flex items-center justify-center rounded-full border border-accent text-accent hover:border-primary hover:text-primary transition-colors",
  socialLinks = [
    { icon: faPinterestP, href: "#!", label: "Pinterest" },
    { icon: faXTwitter, href: "#!", label: "Twitter" },
    { icon: faFacebookF, href: "#!", label: "Facebook" },
    { icon: faInstagram, href: "#!", label: "Instagram" },
  ],
}) => {
  return (
    <ul className={`flex p-0 m-0 list-none ${className}`}>
      {socialLinks.map((social, index) => (
        <li key={index} className="ml-2">
          <a
            href={social.href}
            className={iconClassName}
            aria-label={social.label}
            title={social.label}
          >
            <FontAwesomeIcon icon={social.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
