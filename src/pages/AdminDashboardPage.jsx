// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/use-auth';
// import { useState } from 'react';

// // import useCurrentUser from '../hooks/use-auth';
// // import useCurrentUser from '../hooks/use-boards';
// // import deleteBoard from '../api/delete-board';
// // import deleteUser from '../api/delete-user';
// // import deleteNote from '../api/delete-note';


// function AdminDashboardPage() {
//     const navigate = useNavigate();
//     const { auth } = useAuth();
//     const { user, isLoading, error } = useCurrentUser(auth?.token);
//     const [showSuccessMessage, setShowSuccessMessage] = useState('');
//     const isAdmin = user?.is_superuser;

//     if (!auth?.token || !auth?.user?.is_superuser) {
//         return (
//             <div>
//                 <p>Access Denied:  You must be an Administrator to view ths Page.</p>
//                 <button onClick={() => navigate("/")}>Return Home</button>
//             </div>
//         );
//     }

//     if (isLoading) {
//         return <p>loading...</p>;
//     }

//     if (error) {
//         return <p>{error.message || "Oops! An error occurred, please try again later."}</p>;
//     }

//     const handleBoardDelete = async (boardUuid) => {
//         if (isAdmin) {
//             if (window.confirm('Are you sure you want to delete this board?')) {
//                 try {
//                     await deleteBoard(boardUuid, auth.token);
//                     setShowSuccessMessage('Board Deleted Successfully!');
//                     setTimeout(() => {
//                         setShowSuccessMessage('');
//                         navigate(0);  // Refresh the page
//                     }, 2000);
//                 } catch (error) {
//                     if (error.message.includes('403')) {
//                         alert('Only administrators can delete boards');
//                     } else {
//                         console.error('Error deleting board:', error);
//                         alert('Failed to delete board');
//                     }
//                 }
//             }
//         } else {
//             navigate('/');
//         }
//     };

//     const handleUserDelete = async (userId) => {
//         if (isAdmin) {
//             if (window.confirm('Are you sure you want to delete this user?')) {
//                 try {
//                     await deleteUser(userId, auth.token);
//                     setShowSuccessMessage('User Deleted Successfully!');
//                     setTimeout(() => {
//                         setShowSuccessMessage('');
//                         navigate(0);  // Refresh the page
//                     }, 2000);
//                 } catch (error) {
//                     if (error.message.includes('403')) {
//                         alert('Only administrators can delete users');
//                     } else {
//                         console.error('Error deleting user:', error);
//                         alert('Failed to delete user');
//                     }
//                 }
//             }
//         } else {
//             navigate('/');
//         }
//     };

//     const handleNoteDelete = async (noteId) => {
//         if (isAdmin) {
//             if (window.confirm('Are you sure you want to delete this note?')) {
//                 try {
//                     await deleteNote(noteId, auth.token);
//                     setShowSuccessMessage('Note Deleted Successfully!');
//                     setTimeout(() => {
//                         setShowSuccessMessage('');
//                         navigate(0);  // Refresh the page
//                     }, 2000);
//                 } catch (error) {
//                     if (error.message.includes('403')) {
//                         alert('Only administrators can delete notes');
//                     } else {
//                         console.error('Error deleting note:', error);
//                         alert('Failed to delete note');
//                     }
//                 }
//             }
//         } else {
//             navigate('/');
//         }
//     };

//     return (
//         <div className="workshops-container">
//             <h1 className="workshops-list-title">Your Workshops</h1>
            
//             {/* Workshops List Box */}
//             <div className="workshops-list-box">

//                 <p>Username: {user.username}</p>
//                 <p>Name: {user.first_name} {user.last_name}</p>
//                 <div className="user-actions">
//                     <button onClick={() => navigate(`/users/${user.id}/edit`)}>Update My Details/Password</button>
//                     <button onClick={() => navigate(`/delete`)} className="delete-button">Delete My Account</button>
//                 </div>
//             </div>

//             {/* Categories and Notes Grid */}
//             <div className="board--list-details-grid">
//                 {/* Categories Section */}
//                 <div className="categories-section">
//                     <h2>Your Projects</h2>
//                     {user.projects.length > 0 ? (
//                         <div className="projects-list">
//                             {user.projects.map((project) => (
//                                 <div key={board.id} className="board-card">
//                                     <div className="item-content">
//                                         <h3>{project.title}</h3>
//                                         <p>Goal: ${board}</p>
//                                         <p>Created: {new Date(project.date_created).toLocaleString()}</p>
//                                         <p>Status: {project.is_open ? "Open" : "Closed"}</p>
//                                     </div>
//                                     <div className="item-actions">
//                                         <button onClick={() => navigate(`/project/${project.id}`)}>View/Edit</button>
//                                         <button 
//                                             onClick={() => handleProjectDelete(project.id)}
//                                             className="delete-button"
//                                         >
//                                             {isAdmin ? 'Admin Delete' : 'Delete Project'}
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <p className="empty-message">You have not created any projects yet.</p>
//                     )}
//                 </div>

//                 {/* Pledges Section */}
//                 <div className="pledges-section">
//                     <h2>Your Pledges</h2>
//                     {user.pledges.length > 0 ? (
//                         <div className="pledges-list">
//                             {user.pledges.map((pledge) => (
//                                 <div key={pledge.id} className="item-card">
//                                     <div className="item-content">
//                                         <p>Amount: ${pledge.amount}</p>
//                                         <p>Project: {pledge.project.title}</p>
//                                         <p>{pledge.anonymous ? "Anonymous" : `By: ${user.username}`}</p>
//                                         <p>Comment: {pledge.comment}</p>
//                                     </div>
//                                     <div className="item-actions">
//                                         <button onClick={() => navigate(`/project/${pledge.project.id}`)}>View/Edit</button>
//                                         <button 
//                                             onClick={() => handlePledgeDelete(pledge.id)}
//                                             className="delete-button"
//                                         >
//                                             {isAdmin ? 'Admin Delete' : 'Delete Pledge'}
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <p className="empty-message">You have not made any pledges yet.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default AdminDashboardPage;