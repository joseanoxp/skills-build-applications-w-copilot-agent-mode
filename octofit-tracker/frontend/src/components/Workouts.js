import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    title: '',
    description: '',
    difficulty: 'medium',
    duration: '',
    category: 'cardio'
  });

  const API_BASE_URL = 'https://legendary-spoon-7pjw4776r5xfp7q5-8000.app.github.dev/api';

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/workouts/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWorkouts(data);
    } catch (err) {
      setError('Failed to fetch workouts');
      console.error('Error fetching workouts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkout = () => {
    // TODO: Implement API call to create workout
    console.log('Creating workout:', newWorkout);
    setShowCreateModal(false);
    setNewWorkout({ title: '', description: '', difficulty: 'medium', duration: '', category: 'cardio' });
  };

  const getDifficultyBadge = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'hard': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'cardio': return '🏃‍♀️';
      case 'strength': return '💪';
      case 'yoga': return '🧘‍♀️';
      case 'sports': return '⚽';
      default: return '💪';
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading workouts...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Workouts</h4>
          <p>{error}</p>
          <hr />
          <button className="btn btn-outline-danger" onClick={fetchWorkouts}>
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
              <h1 className="display-5">💪 Workouts</h1>
              <p className="lead text-muted">Discover personalized workout routines</p>
            </div>
            <div>
              <button 
                className="btn btn-success me-2"
                onClick={() => setShowCreateModal(true)}
                data-bs-toggle="modal"
                data-bs-target="#createWorkoutModal"
              >
                <i className="fas fa-plus"></i> Create Workout
              </button>
              <button 
                className="btn btn-outline-primary" 
                onClick={fetchWorkouts}
              >
                <i className="fas fa-sync-alt"></i> Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Workouts Content */}
      {workouts.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="card text-center">
              <div className="card-body py-5">
                <h4 className="card-title text-muted">No Workouts Found</h4>
                <p className="card-text">Create your first workout to get started on your fitness journey!</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowCreateModal(true)}
                >
                  Create Your First Workout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Workouts Table */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-success text-white">
                  <h5 className="card-title mb-0">Available Workouts</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Workout</th>
                          <th scope="col">Category</th>
                          <th scope="col">Difficulty</th>
                          <th scope="col">Duration</th>
                          <th scope="col">Description</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {workouts.map((workout, index) => (
                          <tr key={workout._id || index}>
                            <th scope="row">
                              <span className="badge bg-secondary">{index + 1}</span>
                            </th>
                            <td>
                              <strong>{workout.title || `Workout ${index + 1}`}</strong>
                            </td>
                            <td>
                              <span className="badge bg-info">
                                {getCategoryIcon(workout.category)} {workout.category || 'General'}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                                {workout.difficulty || 'Medium'}
                              </span>
                            </td>
                            <td>
                              <strong>{workout.duration || 'Not specified'}</strong>
                            </td>
                            <td>
                              <small className="text-muted">
                                {workout.description ? 
                                  (workout.description.length > 50 ? 
                                    workout.description.substring(0, 50) + '...' : 
                                    workout.description) : 
                                  'No description'}
                              </small>
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm" role="group">
                                <button className="btn btn-primary" title="Start Workout">
                                  <i className="fas fa-play"></i>
                                </button>
                                <button className="btn btn-outline-secondary" title="View Details">
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button className="btn btn-outline-warning" title="Edit">
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
                  Total Workouts: <strong>{workouts.length}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Workouts Cards View */}
          <div className="row mt-4">
            <div className="col-12">
              <h5>Featured Workouts</h5>
            </div>
            {workouts.slice(0, 6).map((workout, index) => (
              <div key={workout._id || index} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-header bg-success text-white">
                    <h5 className="card-title mb-0 d-flex align-items-center">
                      <span className="me-2">{getCategoryIcon(workout.category)}</span>
                      {workout.title || `Workout ${index + 1}`}
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <span className={`badge ${getDifficultyBadge(workout.difficulty)} me-2`}>
                        {workout.difficulty || 'Medium'}
                      </span>
                      <span className="badge bg-info">
                        {workout.category || 'General'}
                      </span>
                    </div>
                    <p className="card-text">
                      <strong>Duration:</strong> {workout.duration || 'Not specified'}
                    </p>
                    <p className="card-text">
                      <strong>Description:</strong>
                    </p>
                    <p className="card-text text-muted">
                      {workout.description || 'No description available'}
                    </p>
                  </div>
                  <div className="card-footer">
                    <div className="d-grid gap-2">
                      <button className="btn btn-primary btn-sm">
                        <i className="fas fa-play me-1"></i> Start Workout
                      </button>
                      <button className="btn btn-outline-secondary btn-sm">
                        <i className="fas fa-eye me-1"></i> View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Create Workout Modal */}
      <div className="modal fade" id="createWorkoutModal" tabIndex="-1" aria-labelledby="createWorkoutModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createWorkoutModalLabel">Create New Workout</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="workoutTitle" className="form-label">Workout Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="workoutTitle"
                    placeholder="Enter workout title"
                    value={newWorkout.title}
                    onChange={(e) => setNewWorkout({...newWorkout, title: e.target.value})}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="workoutCategory" className="form-label">Category</label>
                      <select 
                        className="form-select" 
                        id="workoutCategory"
                        value={newWorkout.category}
                        onChange={(e) => setNewWorkout({...newWorkout, category: e.target.value})}
                      >
                        <option value="cardio">Cardio</option>
                        <option value="strength">Strength Training</option>
                        <option value="yoga">Yoga</option>
                        <option value="sports">Sports</option>
                        <option value="flexibility">Flexibility</option>
                        <option value="hiit">HIIT</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="workoutDifficulty" className="form-label">Difficulty</label>
                      <select 
                        className="form-select" 
                        id="workoutDifficulty"
                        value={newWorkout.difficulty}
                        onChange={(e) => setNewWorkout({...newWorkout, difficulty: e.target.value})}
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="workoutDuration" className="form-label">Duration</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="workoutDuration"
                    placeholder="e.g., 30 minutes, 45 mins, 1 hour"
                    value={newWorkout.duration}
                    onChange={(e) => setNewWorkout({...newWorkout, duration: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="workoutDescription" className="form-label">Description</label>
                  <textarea 
                    className="form-control" 
                    id="workoutDescription"
                    rows="4"
                    placeholder="Describe the workout, exercises, and instructions..."
                    value={newWorkout.description}
                    onChange={(e) => setNewWorkout({...newWorkout, description: e.target.value})}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleCreateWorkout}>
                Create Workout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
