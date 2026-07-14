const footerLinkClassName =
  'inline-block origin-center text-center font-apple-garamond-light text-base font-normal text-[#353F50] underline transition-[color,transform] duration-200 hover:scale-[1.125] hover:text-[#E66001]';

export const Footer = () => {
  return (
    <div className="flex items-center gap-6 pb-[100px] w-full justify-center">
      <a
        href="https://docs.google.com/document/d/1RYYdLsKFfPM6eUOkGXyi4YDR9bKg5-LhG5oHIHXhGy0/edit?usp=sharing"
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
