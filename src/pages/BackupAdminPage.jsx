import React from 'react';
import '../style.css';

const BackupAdminPage = () => {
    return (
      <div>
        <nav className="navbar">
          {/* Add your navbar content here */}
        </nav>
  
        <header className="admin-header">
          <h1>Welcome to your Admin Page Emma!</h1>
        </header>
  
        <main className="admin-content">
          <div className="admin-grid">
            <div className="admin-column">
              <h2>Your Workshop Boards</h2>
              <button className="create-workshop-button">Create Workshop</button>
              <ul className="workshop-list">
                <li>
                  <h3>Workshop Title 1</h3>
                  <p>Start Date: 2023-10-01</p>
                  <p>End Date: 2023-10-03</p>
                  <p>Company: Company A</p>
                </li>
                <li>
                  <h3>Workshop Title 2</h3>
                  <p>Start Date: 2023-10-05</p>
                  <p>End Date: 2023-10-06</p>
                  <p>Company: Company B</p>
                </li>
                <li>
                  <h3>Workshop Title 3</h3>
                  <p>Start Date: 2023-10-10</p>
                  <p>End Date: 2023-10-12</p>
                  <p>Company: Company C</p>
                </li>
              </ul>
            </div>
            <div className="admin-column">
              <h2>Your Users</h2>
              <ul className="user-list">
                <li>
                  <p>Username: user1</p>
                  <p>First Name: John</p>
                  <p>Last Name: Doe</p>
                  <p>Company: Company A</p>
                  <p>Tenure: 2 years</p>
                </li>
                <li>
                  <p>Username: user2</p>
                  <p>First Name: Jane</p>
                  <p>Last Name: Smith</p>
                  <p>Company: Company B</p>
                  <p>Tenure: 1 year</p>
                </li>
                <li>
                  <p>Username: user3</p>
                  <p>First Name: Alice</p>
                  <p>Last Name: Johnson</p>
                  <p>Company: Company C</p>
                  <p>Tenure: 3 years</p>
                </li>
              </ul>
            </div>
          </div>
        </main>
  
        <footer className="footer">
          {/* Add your footer content here */}
        </footer>
      </div>
    );
  };
  
  export default BackupAdminPage;
  