import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Technical Trainee</h4>
                <h5>IIRS ISRO (Online Programme)</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Enrolled in specialized training with the Indian Institute of Remote Sensing, 
              managing advanced analytical portal workflows and geospatial information guidelines.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Job Assistance Executive</h4>
                <h5>Polyhose India Private Limited</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Managed coordinator structures, administrative documentation, and executed specific job 
              application forms and resource allocation tracking within industrial corporate frameworks.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Micro-Enterprise Proprietor</h4>
                <h5>Ministry of MSME</h5>
              </div>
              <h3>2025–26</h3>
            </div>
            <p>
              Executed regulatory setup operations and structural optimization to secure an official 
              Udyam Registration identification number under the government micro-enterprise registry.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Wholesale Supply & Trading Operator</h4>
                <h5>Meesho & Alibaba Commercial Networks</h5>
              </div>
              <h3>2024–25</h3>
            </div>
            <p>
              Coordinated cross-platform commercial pipelines by establishing a live supplier network 
              on Meesho, managing verified corporate business credentials on Cashify Super Sales, 
              and optimizing standard wholesale procurement channels on Alibaba.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;
