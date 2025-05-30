import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: ''
  });

  // Use specific codespace Django REST API endpoint
  const API_BASE_URL = 'https://refactored-barnacle-rp5wv77qgxr24pw-8000.app.github.dev/api/users';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterUser = () => {
    // TODO: Implement API call to register user
    console.log('Registering user:', newUser);
    setShowRegisterModal(false);
    setNewUser({ username: '', email: '', firstName: '', lastName: '' });
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading users...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Users</h4>
          <p>{error}</p>
          <hr />
          <button className="btn btn-outline-danger" onClick={fetchUsers}>
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
              <h1 className="display-5">👤 Users</h1>
              <p className="lead text-muted">OctoFit community members</p>
            </div>
            <div>
              <button 
                className="btn btn-success me-2"
                onClick={() => setShowRegisterModal(true)}
                data-bs-toggle="modal"
                data-bs-target="#registerUserModal"
              >
                <i className="fas fa-user-plus"></i> Register User
              </button>
              <button 
                className="btn btn-outline-primary" 
                onClick={fetchUsers}
              >
                <i className="fas fa-sync-alt"></i> Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Content */}
      {users.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="card text-center">
              <div className="card-body py-5">
                <h4 className="card-title text-muted">No Users Found</h4>
                <p className="card-text">Register to become part of the OctoFit community!</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowRegisterModal(true)}
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Users Table */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">Community Members</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Avatar</th>
                          <th scope="col">Username</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={user._id || index}>
                            <th scope="row">
                              <span className="badge bg-secondary">{index + 1}</span>
                            </th>
                            <td>
                              <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" 
                                   style={{ width: '40px', height: '40px' }}>
                                <span className="text-white fw-bold">
                                  {user.username ? user.username.charAt(0).toUpperCase() : 
                                   user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                                </span>
                              </div>
                            </td>
                            <td>
                              <strong>{user.username || 'No username'}</strong>
                            </td>
                            <td>
                              {user.first_name && user.last_name ? 
                                `${user.first_name} ${user.last_name}` : 
                                <span className="text-muted">Name not provided</span>}
                            </td>
                            <td>
                              {user.email ? (
                                <a href={`mailto:${user.email}`} className="text-decoration-none">
                                  {user.email}
                                </a>
                              ) : (
                                <span className="text-muted">No email</span>
                              )}
                            </td>
                            <td>
                              <span className="badge bg-success">Active</span>
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm" role="group">
                                <button className="btn btn-outline-primary" title="View Profile">
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button className="btn btn-success" title="Add Friend">
                                  <i className="fas fa-user-plus"></i>
                                </button>
                                <button className="btn btn-outline-secondary" title="Message">
                                  <i className="fas fa-envelope"></i>
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
                  Total Members: <strong>{users.length}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Users Cards View */}
          <div className="row mt-4">
            <div className="col-12">
              <h5>Featured Members</h5>
            </div>
            {users.slice(0, 6).map((user, index) => (
              <div key={user._id || index} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" 
                           style={{ width: '60px', height: '60px' }}>
                        <span className="text-white fw-bold fs-4">
                          {user.username ? user.username.charAt(0).toUpperCase() : 
                           user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                    </div>
                    <h5 className="card-title">
                      {user.username || user.first_name || `User ${index + 1}`}
                    </h5>
                    <p className="card-text text-muted">
                      {user.email || 'No email provided'}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        {user.first_name && user.last_name ? 
                          `${user.first_name} ${user.last_name}` : 
                          'Name not provided'}
                      </small>
                    </p>
                    <div className="mb-2">
                      <span className="badge bg-success">Active Member</span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="d-grid gap-2">
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="fas fa-eye me-1"></i> View Profile
                      </button>
                      <button className="btn btn-success btn-sm">
                        <i className="fas fa-user-plus me-1"></i> Add Friend
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Register User Modal */}
      <div className="modal fade" id="registerUserModal" tabIndex="-1" aria-labelledby="registerUserModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerUserModalLabel">Register New User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="userUsername" className="form-label">Username</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="userUsername"
                    placeholder="Enter username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="userEmail" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="userEmail"
                    placeholder="Enter email address"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="userFirstName" className="form-label">First Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="userFirstName"
                        placeholder="First name"
                        value={newUser.firstName}
                        onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="userLastName" className="form-label">Last Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="userLastName"
                        placeholder="Last name"
                        value={newUser.lastName}
                        onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleRegisterUser}>
                Register User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
