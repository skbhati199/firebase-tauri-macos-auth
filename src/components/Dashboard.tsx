import { useAuth } from '../lib/authContext';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { currentUser, signOut } = useAuth();

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="avatar">
            <img 
              src={currentUser?.photoURL || '/avatar-placeholder.png'} 
              alt="User Avatar" 
            />
          </div>
          <div className="user-info">
            <h3>{currentUser?.displayName || 'User'}</h3>
            <p>{currentUser?.email}</p>
          </div>
        </div>
        
        <ul className="sidebar-menu">
          <li className="active">Dashboard</li>
          <li>Files</li>
          <li>Photos</li>
          <li>Projects</li>
          <li>Settings</li>
        </ul>
        
        <button className="sign-out" onClick={signOut}>
          Sign Out
        </button>
      </div>
      
      <div className="main-content">
        <header>
          <h1>Welcome to Your Desktop</h1>
          <div className="search">
            <input type="text" placeholder="Search..." />
          </div>
        </header>
        
        <div className="content">
          <div className="welcome-message">
            <h2>Hello, {currentUser?.displayName || 'User'}!</h2>
            <p>You have successfully logged in to your secure desktop environment.</p>
          </div>
          
          <div className="quick-access">
            <h3>Quick Access</h3>
            <div className="icons">
              <div className="icon">
                <div className="icon-image documents"></div>
                <span>Documents</span>
              </div>
              <div className="icon">
                <div className="icon-image downloads"></div>
                <span>Downloads</span>
              </div>
              <div className="icon">
                <div className="icon-image pictures"></div>
                <span>Pictures</span>
              </div>
              <div className="icon">
                <div className="icon-image music"></div>
                <span>Music</span>
              </div>
            </div>
          </div>
          
          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-icon doc"></span>
                <div className="activity-details">
                  <p className="activity-name">Project Proposal.docx</p>
                  <p className="activity-date">Modified 2 hours ago</p>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon img"></span>
                <div className="activity-details">
                  <p className="activity-name">Presentation.pptx</p>
                  <p className="activity-date">Modified yesterday</p>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon pdf"></span>
                <div className="activity-details">
                  <p className="activity-name">Report.pdf</p>
                  <p className="activity-date">Modified 3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
