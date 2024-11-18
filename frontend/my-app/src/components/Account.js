import { useAuth } from "../context/AuthContext";
import API_BASE_URL from '../config';


export default function Account() {
    const { user } = useAuth();

    console.log("User state in Account component:", user); // Debugging user state

    return (
        <div>
            <h2>Account Info</h2>
            {user && (
                <>
                    {user.account?.profilePic ? (
                        <>
                           {/*  <p>Profile Picture URL: {user.account.profilePic}</p> */}
                            <img
                                src={`${API_BASE_URL}${user.account.profilePic}`}// Add the base URL if needed
                                alt="Profile"
                                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                            />
                        </>
                    ) : (
                        <p>No Profile Picture Uploaded</p>
                    )}
                    <p>First Name - {user.account?.firstname}</p>
                    <p>Last Name - {user.account?.lastname}</p>
                    <p>Email - {user.account?.email}</p>
                    {/* Display profile picture */}
                    
                </>
            )}
        </div>
    );
}
