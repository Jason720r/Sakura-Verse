import React, { useEffect, useState } from "react";



export const CustomerProfile = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [newName, setNewName] = useState("");
    const [newBio, setNewBio] = useState("");
  
    // Fetch the user data from the server
    useEffect(() => {
      fetch("http://localhost:8088/users")
        .then((response) => response.json())
        .then((userData) => {
          setUsers(userData);
        })
        .catch((error) => {
          console.error("Error retrieving user data:", error);
        });
    }, []);
  
    useEffect(() => {
      if (users.length > 0) {
        setCurrentUser(users[0]);
      }
    }, [users]);
  
    const handleNameChange = (event) => {
      setNewName(event.target.value);
    };
  
    const updateName = () => {
      if (newName) {
        // Update the name of the current user
        const updatedUser = { ...currentUser, name: newName };
        // Send a PUT request to update the user's name on the server
        fetch(`http://localhost:8088/users/${currentUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        })
          .then((response) => response.json())
          .then((updatedUserData) => {
            // Update the users array with the updated user
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === updatedUserData.id ? updatedUserData : user
              )
            );
            // Update the currentUser with the updated user
            setCurrentUser(updatedUserData);
            // Reset the newName state
            setNewName("");
          })
          .catch((error) => {
            console.error("Error updating user's name:", error);
          });
      }
    };

    const handleBioChange = (event) => {
        setNewBio(event.target.value);
    }
    const updateBio = () => {
        if (newBio) {
          // Update the bio of the current user
          const updatedUser = { ...currentUser, bio: newBio };
          // Send a PUT request to update the user's bio on the server
          fetch(`http://localhost:8088/users/${currentUser.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          })
            .then((response) => response.json())
            .then((updatedUserData) => {
              // Update the users array with the updated user
              setUsers((prevUsers) =>
                prevUsers.map((user) =>
                  user.id === updatedUserData.id ? updatedUserData : user
                )
              );
              // Update the currentUser with the updated user
              setCurrentUser(updatedUserData);
              // Reset the newBio state
              setNewBio("");
            })
            .catch((error) => {
              console.error("Error updating user's bio:", error);
            });
        }
      };
  
    if (!currentUser) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>User Profile</h2>
        <p>
          <strong>Name:</strong> {currentUser.name}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>About Myself</strong> {currentUser.bio}
        </p>
        <div>
          <label htmlFor="newName">Edit Name:</label>
          <input
            type="text"
            id="newName"
            value={newName}
            onChange={handleNameChange}
          />
          <button onClick={updateName}>Update Name</button>
        </div>
      <div>
        <label htmlFor="newBio">Edit About Myself:</label>
        <input
          type="text"
          id="newBio"
          value={newBio}
          onChange={handleBioChange}
        />
        <button onClick={updateBio}>Update About Myself</button>
      </div>
    </div>
    );
  };