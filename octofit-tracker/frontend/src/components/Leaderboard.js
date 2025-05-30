import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('score');
  const [filterBy, setFilterBy] = useState('all');

  // Use dynamic codespace URL
  const API_BASE_URL = `https://${window.location.hostname.replace('3000', '8000')}/api`;

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/leaderboard/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLeaderboard(data);
    } catch (err) {
      setError('Failed to fetch leaderboard');
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return 'bg-warning text-dark';
    if (rank === 2) return 'bg-secondary';
    if (rank === 3) return 'bg-warning text-dark';
    return 'bg-primary';
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🏅';
  };

  const getRankTitle = (rank) => {
    if (rank === 1) return 'Gold';
    if (rank === 2) return 'Silver';
    if (rank === 3) return 'Bronze';
    return 'Participant';
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading leaderboard...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Leaderboard</h4>
          <p>{error}</p>
          <hr />
          <button className="btn btn-outline-danger" onClick={fetchLeaderboard}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-5">🏆 Leaderboard</h1>
              <p className="lead text-muted">See how you rank against other OctoFit members</p>
            </div>
            <div>
              <button 
                className="btn btn-outline-primary" 
                onClick={fetchLeaderboard}
              >
                <i className="fas fa-sync-alt"></i> Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Filter & Sort</h6>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="sortSelect" className="form-label">Sort by:</label>
                  <select 
                    className="form-select form-select-sm" 
                    id="sortSelect"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="score">Score</option>
                    <option value="name">Name</option>
                    <option value="rank">Rank</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="filterSelect" className="form-label">Filter:</label>
                  <select 
                    className="form-select form-select-sm" 
                    id="filterSelect"
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                  >
                    <option value="all">All Members</option>
                    <option value="top10">Top 10</option>
                    <option value="thisWeek">This Week</option>
                    <option value="thisMonth">This Month</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-light">
            <div className="card-body text-center">
              <h6 className="card-title">Your Current Rank</h6>
              <h2 className="text-primary">#5</h2>
              <p className="card-text">
                <small className="text-muted">Keep going! You're doing great!</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Content */}
      {leaderboard.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="card text-center">
              <div className="card-body py-5">
                <h4 className="card-title text-muted">No Leaderboard Data Available</h4>
                <p className="card-text">Start logging activities to appear on the leaderboard!</p>
                <button className="btn btn-primary">
                  Log Your First Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          {leaderboard.length >= 3 && (
            <div className="row mb-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-header bg-warning text-dark">
                    <h5 className="card-title mb-0">🎉 Top Performers</h5>
                  </div>
                  <div className="card-body">
                    <div className="row text-center">
                      {/* Second Place */}
                      <div className="col-md-4 order-md-1">
                        <div className="card border-secondary">
                          <div className="card-body">
                            <h4 className="text-secondary">🥈</h4>
                            <h5>{leaderboard[1]?.name || 'Player 2'}</h5>
                            <p className="text-muted">{leaderboard[1]?.score || 0} pts</p>
                            <span className="badge bg-secondary">2nd Place</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* First Place */}
                      <div className="col-md-4 order-md-2">
                        <div className="card border-warning" style={{ marginTop: '-20px' }}>
                          <div className="card-body">
                            <h3 className="text-warning">🥇</h3>
                            <h4>{leaderboard[0]?.name || 'Player 1'}</h4>
                            <p className="text-muted">{leaderboard[0]?.score || 0} pts</p>
                            <span className="badge bg-warning text-dark">Champion</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Third Place */}
                      <div className="col-md-4 order-md-3">
                        <div className="card border-warning">
                          <div className="card-body">
                            <h4 className="text-warning">🥉</h4>
                            <h5>{leaderboard[2]?.name || 'Player 3'}</h5>
                            <p className="text-muted">{leaderboard[2]?.score || 0} pts</p>
                            <span className="badge bg-warning text-dark">3rd Place</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Complete Leaderboard Table */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">Complete Rankings</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">Rank</th>
                          <th scope="col">Member</th>
                          <th scope="col">Score</th>
                          <th scope="col">Badge</th>
                          <th scope="col">Progress</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboard.map((entry, index) => {
                          const rank = index + 1;
                          return (
                            <tr key={entry._id || index} className={rank <= 3 ? 'table-warning' : ''}>
                              <th scope="row">
                                <span className={`badge ${getRankBadge(rank)}`}>
                                  {getRankIcon(rank)} #{rank}
                                </span>
                              </th>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center me-2" 
                                       style={{ width: '32px', height: '32px' }}>
                                    <span className="text-white fw-bold fs-6">
                                      {entry.name ? entry.name.charAt(0).toUpperCase() : 'P'}
                                    </span>
                                  </div>
                                  <strong>{entry.name || `Player ${rank}`}</strong>
                                </div>
                              </td>
                              <td>
                                <strong className="text-primary">{entry.score || 0}</strong>
                                <small className="text-muted"> pts</small>
                              </td>
                              <td>
                                <span className={`badge ${getRankBadge(rank)}`}>
                                  {getRankIcon(rank)} {getRankTitle(rank)}
                                </span>
                              </td>
                              <td>
                                <div className="progress" style={{ height: '20px' }}>
                                  <div 
                                    className="progress-bar bg-success" 
                                    role="progressbar" 
                                    style={{ width: `${Math.min((entry.score || 0) / 1000 * 100, 100)}%` }}
                                    aria-valuenow={entry.score || 0} 
                                    aria-valuemin="0" 
                                    aria-valuemax="1000"
                                  >
                                    {Math.round((entry.score || 0) / 1000 * 100)}%
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="btn-group btn-group-sm" role="group">
                                  <button className="btn btn-outline-primary" title="View Profile">
                                    <i className="fas fa-eye"></i>
                                  </button>
                                  <button className="btn btn-outline-success" title="Challenge">
                                    <i className="fas fa-trophy"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer text-muted d-flex justify-content-between">
                  <span>Total Members: <strong>{leaderboard.length}</strong></span>
                  <span>Updated: <strong>Just now</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Badges Section */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-info text-white">
                  <h5 className="card-title mb-0">Achievement Badges</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3 text-center mb-3">
                      <span className="badge bg-warning fs-4 p-3">🏃‍♀️</span>
                      <p className="mt-2 mb-1"><strong>Speed Demon</strong></p>
                      <small className="text-muted">Complete 10 cardio sessions</small>
                    </div>
                    <div className="col-md-3 text-center mb-3">
                      <span className="badge bg-success fs-4 p-3">💪</span>
                      <p className="mt-2 mb-1"><strong>Strength Master</strong></p>
                      <small className="text-muted">Complete 15 strength workouts</small>
                    </div>
                    <div className="col-md-3 text-center mb-3">
                      <span className="badge bg-primary fs-4 p-3">🔥</span>
                      <p className="mt-2 mb-1"><strong>Streak Champion</strong></p>
                      <small className="text-muted">7-day activity streak</small>
                    </div>
                    <div className="col-md-3 text-center mb-3">
                      <span className="badge bg-info fs-4 p-3">👥</span>
                      <p className="mt-2 mb-1"><strong>Team Player</strong></p>
                      <small className="text-muted">Join 3 fitness teams</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
