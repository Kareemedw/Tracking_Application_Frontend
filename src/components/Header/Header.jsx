import "./Header.css";

function Header() {
  return (
    <main className="header">
      <div className="header__title">
        <p>Name: Kareem Edwards</p>
        <h1>Application Tracking Progress</h1>
        <p>Application Number: ABCD-114-115</p>
      </div>
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
    </main>
  );
}

export default Header;
