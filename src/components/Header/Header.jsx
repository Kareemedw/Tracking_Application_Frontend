import "./Header.css";

function Header() {
  return (
    <div className="header">
      <h1 className="header__title">Application Tracking Progress</h1>
      <div className="header__colorCode">
        <p className="header__colorCode-title">Status Key:</p>
        <div className="header__status">
          <span className="header__dot header__dot_inProgress"></span>
          <span>In Progress</span>
        </div>
        <div className="footer__status">
          <span className="header__dot header__dot_approved"></span>
          <span>Approved</span>
        </div>
        <div className="header__status">
          <span className="header__dot header__dot_actionRequired"></span>
          <span>Action Required</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
