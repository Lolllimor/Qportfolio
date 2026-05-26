const footerLinkClassName =
  'text-center font-apple-garamond-light text-base font-normal text-[#353F50] underline transition-colors hover:text-[#E66001]';

export const Footer = () => {
  return (
    <div className="flex items-center gap-4 pb-[100px] w-full justify-center">
      <a
        href="https://drive.google.com/file/d/1JqFp6UDPv49VyWxwWrgDizJ3f8mGL9MO/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className={footerLinkClassName}
      >
        Download CV
      </a>
      <a
        href="https://www.behance.net/quadrimorin"
        target="_blank"
        rel="noopener noreferrer"
        className={footerLinkClassName}
      >
        Behance
      </a>
      <a
        href="https://www.linkedin.com/in/quadmor/"
        target="_blank"
        rel="noopener noreferrer"
        className={footerLinkClassName}
      >
        Linkedin
      </a>
      <a
        href="https://github.com/Quadmor009"
        target="_blank"
        rel="noopener noreferrer"
        className={footerLinkClassName}
      >
        Github
      </a>
    </div>
  );
};
