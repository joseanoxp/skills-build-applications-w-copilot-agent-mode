import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    category: 'fitness'
  });

  const API_BASE_URL = 'https://legendary-spoon-7pjw4776r5xfp7q5-8000.app.github.dev/api';

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/teams/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTeams(data);
    } catch (err) {
      setError('Failed to fetch teams');
      console.error('Error fetching teams:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = () => {
    // TODO: Implement API call to create team
    console.log('Creating team:', newTeam);
    setShowCreateModal(false);
    setNewTeam({ name: '', description: '', category: 'fitness' });
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading teams...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Teams</h4>
          <p>{error}</p>
          <hr />
          <button className="btn btn-outline-danger" onClick={fetchTeams}>
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
              <h1 className="display-5">👥 Teams</h1>
              <p className="lead text-muted">Join or create fitness teams for group challenges</p>
            </div>
            <div>
              <button 
                className="btn btn-success me-2"
                onClick={() => setShowCreateModal(true)}
                data-bs-toggle="modal"
                data-bs-target="#createTeamModal"
              >
                <i className="fas fa-plus"></i> Create Team
              </button>
              <button 
                className="btn btn-outline-primary" 
                onClick={fetchTeams}
              >
                <i className="fas fa-sync-alt"></i> Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Teams Content */}
      {teams.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="card text-center">
              <div className="card-body py-5">
                <h4 className="card-title text-muted">No Teams Found</h4>
                <p className="card-text">Create a team to get started with group fitness challenges!</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowCreateModal(true)}
                >
                  Create Your First Team
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Teams Table */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">All Teams</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Team Name</th>
                          <th scope="col">Members</th>
                          <th scope="col">Category</th>
                          <th scope="col">Created</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teams.map((team, index) => (
                          <tr key={team._id || index}>
                            <th scope="row">
                              <span className="badge bg-secondary">{index + 1}</span>
                            </th>
                            <td>
                              <strong>{team.name || `Team ${index + 1}`}</strong>
                            </td>
                            <td>
                              <span className="badge bg-info">
                                {team.members?.length || 0} members
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-success">
                                {team.category || 'Fitness'}
                              </span>
                            </td>
                            <td>
                              <small className="text-muted">
                                {team.created_date ? new Date(team.created_date).toLocaleDateString() : 'Unknown'}
                              </small>
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm" role="group">
                                <button className="btn btn-outline-primary" title="View Details">
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button className="btn btn-success" title="Join Team">
                                  <i className="fas fa-user-plus"></i>
                                </button>
                                <button className="btn btn-outline-secondary" title="Edit">
                                  <i className="fas fa-edit"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer text-muted">
                  Total Teams: <strong>{teams.length}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Teams Cards View */}
          <div className="row mt-4">
            <div className="col-12">
              <h5>Featured Teams</h5>
            </div>
            {teams.slice(0, 6).map((team, index) => (
              <div key={team._id || index} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-header bg-primary text-white">
                    <h5 className="card-title mb-0">
                      {team.name || `Team ${index + 1}`}
                    </h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Description:</strong><br />
                      {team.description || 'No description available'}
                    </p>
                    <div className="mb-3">
                      <span className="badge bg-info me-2">
                        <i className="fas fa-users"></i> {team.members?.length || 0} members
                      </span>
                      <span className="badge bg-success">
                        <i className="fas fa-tag"></i> {team.category || 'Fitness'}
                      </span>
                    </div>
                    <p className="card-text">
                      <small className="text-muted">
                        Created: {team.created_date ? new Date(team.created_date).toLocaleDateString() : 'Unknown'}
                      </small>
                    </p>
                  </div>
                  <div className="card-footer">
                    <div className="d-grid gap-2">
                      <button className="btn btn-primary btn-sm">
                        <i className="fas fa-eye me-1"></i> View Details
                      </button>
                      <button className="btn btn-success btn-sm">
                        <i className="fas fa-user-plus me-1"></i> Join Team
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Create Team Modal */}
      <div className="modal fade" id="createTeamModal" tabIndex="-1" aria-labelledby="createTeamModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createTeamModalLabel">Create New Team</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="teamName" className="form-label">Team Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="teamName"
                    placeholder="Enter team name"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="teamCategory" className="form-label">Category</label>
                  <select 
                    className="form-select" 
                    id="teamCategory"
                    value={newTeam.category}
                    onChange={(e) => setNewTeam({...newTeam, category: e.target.value})}
                  >
                    <option value="fitness">General Fitness</option>
                    <option value="running">Running Club</option>
                    <option value="strength">Strength Training</option>
                    <option value="yoga">Yoga Group</option>
                    <option value="sports">Sports Team</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="teamDescription" className="form-label">Description</label>
                  <textarea 
                    className="form-control" 
                    id="teamDescription"
                    rows="3"
                    placeholder="Describe your team's goals and activities..."
                    value={newTeam.description}
                    onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleCreateTeam}>
                Create Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
