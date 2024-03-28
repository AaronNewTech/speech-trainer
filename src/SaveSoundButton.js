import React, { useState, useEffect } from "react";
import { useAuth } from "./UseContext";

function SaveSoundButton({ soundId, email }) {
  const { user } = useAuth();
  const [userSavedSounds, setUserSavedSounds] = useState([]);
  const [isSoundSaved, setIsSoundSaved] = useState(false);

  
  useEffect(() => {
    fetchUserSavedSounds();
  }, []);
  const token = localStorage.getItem("isLoggedIn");
  
  const fetchUserSavedSounds = async () => {
    try {
      const response = await fetch(
        "https://arnhsmith.pythonanywhere.com/user_saved_sounds_button",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const userSoundData = await response.json();
        setUserSavedSounds(userSoundData);
      }
    } catch (error) {
      console.error("An error occurred while fetching saved sounds:", error);
    }
  };

  
  useEffect(() => {
    setIsSoundSaved(
      userSavedSounds.some((savedSound) => savedSound.sound_id === soundId)
    );
  }, [userSavedSounds, soundId]);

  const handleFavoriteClick = async () => {
    try {
      if (isSoundSaved) {
        
        const response = await fetch(
          `https://arnhsmith.pythonanywhere.com/user_saved_sounds/${soundId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
    
          setUserSavedSounds((prevSavedSounds) =>
            prevSavedSounds.filter(
              (savedSound) => savedSound.sound_id !== soundId
            )
          );
        } else {
          console.error("Failed to remove sound from favorites on the server");
        }
      } else {
       
        const response = await fetch(
          "https://arnhsmith.pythonanywhere.com/saved_sounds",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, soundId }),
          }
        );
        if (response.ok) {
          
          setUserSavedSounds((prevSavedSounds) => [
            ...prevSavedSounds,
            { sound_id: soundId },
          ]);
        } else {
          console.error("Failed to add sound to favorites on the server");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(user);
  return (
    <div>
      {user ? (
        <button onClick={handleFavoriteClick}>
          {isSoundSaved ? "Unfavorite" : "Favorite"}
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SaveSoundButton;
