import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                className="octofit-logo"
              />
              🐙 OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-light text-center py-3 mt-5">
          <div className="container">
            <p className="mb-0">
              &copy; 2025 OctoFit Tracker - Mergington High School Physical Education
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

// Home Component
const Home = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="display-4 text-primary mb-4">
            Welcome to OctoFit Tracker! 🐙
          </h1>
          <p className="lead">
            Track your fitness journey at Mergington High School
          </p>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">🏃‍♀️ Activities</h5>
              <p className="card-text">Log and track your daily activities</p>
              <Link to="/activities" className="btn btn-primary">
                View Activities
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">💪 Workouts</h5>
              <p className="card-text">Discover personalized workout routines</p>
              <Link to="/workouts" className="btn btn-success">
                Browse Workouts
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">👥 Teams</h5>
              <p className="card-text">Join or create fitness teams</p>
              <Link to="/teams" className="btn btn-info">
                Explore Teams
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">🏆 Leaderboard</h5>
              <p className="card-text">See how you rank against others</p>
              <Link to="/leaderboard" className="btn btn-warning">
                View Rankings
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-12">
          <div className="alert alert-info">
            <h4 className="alert-heading">Getting Started</h4>
            <p>
              Welcome to OctoFit Tracker! This app helps Mergington High School students 
              track their fitness activities, join teams, and compete in a friendly leaderboard.
            </p>
            <hr />
            <p className="mb-0">
              Start by exploring the different sections using the navigation menu above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
