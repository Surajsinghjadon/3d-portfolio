import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="https://www.linkedin.com/in/suraj-singh-jadon-bb320a274"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — Suraj Singh Jadon
              </a>
            </p>
            <p style={{ marginTop: "8px", fontSize: "14px", color: "#94a3b8" }}>
              Email: surajsinghrajput5040@gmail.com
            </p>
            <p style={{ marginTop: "4px", fontSize: "14px", color: "#94a3b8" }}>
              Phone: +91 78795 95821
            </p>
            <p style={{ marginTop: "4px", fontSize: "14px", color: "#94a3b8" }}>
              Location: Pithampur, Madhya Pradesh
            </p>

            <h4 style={{ marginTop: "24px" }}>Education</h4>
            <p>
              Diploma in Computer Applications (DCA), Makhanlal Chaturvedi University — 2023
            </p>
            <p>
              12th Grade, Madhya Pradesh State Open Board — 2022
            </p>
            <p>
              10th Grade, Madhya Pradesh Board — 2020
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/surajsinghjadon"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/suraj-singh-jadon-bb320a274"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Suraj Singh Jadon</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
