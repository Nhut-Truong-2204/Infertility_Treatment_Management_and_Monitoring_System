import iconPhone from "../../assets/images/icon-phone-accent.svg";
import iconMail from "../../assets/images/icon-mail-accent.svg";
import iconLocation from "../../assets/images/icon-location-accent.svg";

const ContactInfo = ({ clinicInfo }) => {
  const contactItems = [
    {
      icon: iconPhone,
      alt: "Phone",
      text: clinicInfo?.phoneNumber || "",
      href: clinicInfo ? `tel:${clinicInfo.phoneNumber}` : "#",
      showBorder: true,
    },
    {
      icon: iconMail,
      alt: "Mail",
      text: clinicInfo?.email || "",
      href: clinicInfo ? `mailto:${clinicInfo.email}` : "#",
      showBorder: true,
    },
    {
      icon: iconLocation,
      alt: "Location",
      text: clinicInfo?.address || "",
      href: "#",
      showBorder: false,
      className: "hidden lg:flex",
    },
  ];

  return (
    <ul className="flex flex-wrap items-center p-0 m-0 list-none">
      {contactItems.map((item, index) => (
        <li
          key={index}
          className={`${
            item.showBorder ? "mr-4 pr-4 border-r border-primary/10" : ""
          } ${item.className || ""}`}
        >
          {item.href !== "#" ? (
            <a
              href={item.href}
              className="flex items-center text-text-color hover:text-accent transition-colors"
            >
              <img src={item.icon} alt={item.alt} className="w-4 mr-2" />
              <span>{item.text}</span>
            </a>
          ) : (
            <div className="flex items-center">
              <img src={item.icon} alt={item.alt} className="w-4 mr-2" />
              <span>{item.text}</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ContactInfo;
