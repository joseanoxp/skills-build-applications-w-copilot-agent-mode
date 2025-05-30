import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: '',
    duration: '',
    description: ''
  });

  // Use specific codespace Django REST API endpoint
  const API_BASE_URL = 'https://legendary-spoon-7pjw4776r5xfp7q5-8000.app.github.dev/api';

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching activities from:', `${API_BASE_URL}/activities/`);
      
      const response = await fetch(`${API_BASE_URL}/activities/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Activities data:', data);
      setActivities(data);
    } catch (err) {
      const errorMessage = `Failed to fetch activities: ${err.message}`;
      setError(errorMessage);
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddActivity = () => {
    // TODO: Implement API call to add activity
    console.log('Adding activity:', newActivity);
    setShowAddModal(false);
    setNewActivity({ type: '', duration: '', description: '' });
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading activities...</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Activities</h4>
          <p>{error}</p>
          <hr />
          <button className="btn btn-outline-danger" onClick={fetchActivities}>
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
              <h1 className="display-5">🏃‍♀️ Activities</h1>
              <p className="lead text-muted">Track and log your fitness activities</p>
            </div>
            <div>
              <button 
                className="btn btn-success me-2"
                onClick={() => setShowAddModal(true)}
                data-bs-toggle="modal"
                data-bs-target="#addActivityModal"
              >
                <i className="fas fa-plus"></i> Add Activity
              </button>
              <button 
                className="btn btn-outline-primary" 
                onClick={fetchActivities}
              >
                <i className="fas fa-sync-alt"></i> Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Content */}
      {activities.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="card text-center">
              <div className="card-body py-5">
                <h4 className="card-title text-muted">No Activities Found</h4>
                <p className="card-text">Start your fitness journey by logging your first activity!</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowAddModal(true)}
                >
                  Add Your First Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Activities Table */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">Recent Activities</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Type</th>
                          <th scope="col">Duration</th>
                          <th scope="col">Description</th>
                          <th scope="col">Date</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activities.map((activity, index) => (
                          <tr key={activity._id || index}>
                            <th scope="row">
                              <span className="badge bg-secondary">{index + 1}</span>
                            </th>
                            <td>
                              <span className="badge bg-info">
                                {activity.type || 'General Activity'}
                              </span>
                            </td>
                            <td>
                              <strong>{activity.duration || 'N/A'}</strong>
                            </td>
                            <td>
                              {activity.description || 'No description available'}
                            </td>
                            <td>
                              <small className="text-muted">
                                {activity.date ? new Date(activity.date).toLocaleDateString() : 'Today'}
                              </small>
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm" role="group">
                                <button className="btn btn-outline-primary" title="Edit">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button className="btn btn-outline-danger" title="Delete">
                                  <i className="fas fa-trash"></i>
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
                  Total Activities: <strong>{activities.length}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Activities Cards View (Alternative View) */}
          <div className="row mt-4">
            <div className="col-12">
              <h5>Activity Cards</h5>
            </div>
            {activities.slice(0, 6).map((activity, index) => (
              <div key={activity._id || index} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-header bg-light">
                    <h6 className="card-title mb-0">
                      Activity #{index + 1}
                    </h6>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Type:</strong> 
                      <span className="badge bg-primary ms-2">
                        {activity.type || 'General Activity'}
                      </span>
                    </p>
                    <p className="card-text">
                      <strong>Duration:</strong> {activity.duration || 'N/A'}
                    </p>
                    <p className="card-text">
                      <strong>Description:</strong> {activity.description || 'No description available'}
                    </p>
                  </div>
                  <div className="card-footer">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button className="btn btn-outline-primary btn-sm me-md-2">
                        Edit
                      </button>
                      <button className="btn btn-outline-danger btn-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Add Activity Modal */}
      <div className="modal fade" id="addActivityModal" tabIndex="-1" aria-labelledby="addActivityModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addActivityModalLabel">Add New Activity</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="activityType" className="form-label">Activity Type</label>
                  <select 
                    className="form-select" 
                    id="activityType"
                    value={newActivity.type}
                    onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                  >
                    <option value="">Select activity type</option>
                    <option value="running">Running</option>
                    <option value="walking">Walking</option>
                    <option value="cycling">Cycling</option>
                    <option value="swimming">Swimming</option>
                    <option value="strength">Strength Training</option>
                    <option value="yoga">Yoga</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="activityDuration" className="form-label">Duration</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="activityDuration"
                    placeholder="e.g., 30 minutes"
                    value={newActivity.duration}
                    onChange={(e) => setNewActivity({...newActivity, duration: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityDescription" className="form-label">Description</label>
                  <textarea 
                    className="form-control" 
                    id="activityDescription"
                    rows="3"
                    placeholder="Describe your activity..."
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleAddActivity}>
                Add Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
