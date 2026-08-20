import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__colorCode">
        <p className="footer__colorCode-title">Status Key:</p>
        <div className="footer__status">
          <span className="footer__dot footer__dot_inProgress"></span>
          <span>In Progress</span>
        </div>
        <div className="footer__status">
          <span className="footer__dot footer__dot_approved"></span>
          <span>Approved</span>
        </div>
        <div className="footer__status">
          <span className="footer__dot footer__dot_actionRequired"></span>
          <span>Action Required</span>
        </div>
      </div>
      <div className="footer_details">
        <p className="developer-name">Developed by Kareem Edwards</p>
        <p className="development-date">2026</p>
      </div>
    </footer>
  );
}

export default Footer;
