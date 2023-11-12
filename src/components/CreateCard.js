import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import FlashCard from "./FlashCard";

function CreateCard() {
  const [formErrors, setFormErrors] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [selectedSound, setSelectedSound] = useState(null);
  const [updateData, setUpdateData] = useState({
    sound: "",
    image: "",
  });

  useEffect(() => {
    fetchAllSounds();
  }, []);

  const fetchAllSounds = async () => {
    try {
      const response = await fetch("https://arnhsmith.pythonanywhere.com/created_sounds");

      if (response.ok) {
        const allSounds = await response.json();
        setSounds(allSounds);
      } else {
        console.error("Error fetching sounds:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching sounds:", error);
    }
  };

  const handleDelete = async (soundId) => {
    try {
      const response = await fetch(`https://arnhsmith.pythonanywhere.com/sounds/${soundId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // sound deleted successfully, update the sounds list by refetching
        fetchAllSounds();
      } else {
        console.error("Error deleting sound:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting sound:", error);
    }
  };

  const handleEdit = (sound) => {
    // Set the selected sound for editing
    setSelectedSound(sound);
    // Initialize the updateData with the current sound's data
    setUpdateData({
      sound: sound.sound || "",
      image: sound.image || "",
    });
  };

  const handleUpdate = (soundId) => {
    fetch(`https://arnhsmith.pythonanywhere.com/sounds/${soundId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => {
        if (response.ok) {
          // sound updated successfully, refresh the sounds list
          fetchAllSounds();
          setSelectedSound(null); // Clear the selected sound
          setUpdateData({
            sound: updateData.sound,
            image: updateData.image,
          }); // Clear the update data
        } else {
          console.error("Error updating sound:", response.statusText);
        }
      })
      .catch((error) => console.error("Error updating sound:", error));
  };

  const formik = useFormik({
    initialValues: {
      sound: "",
      image: "", // Add image URL field
    },
    onSubmit: async (values) => {
      const newSound = {
        sound: values.sound,
        image: values.image,
      };

      const response = await fetch("https://arnhsmith.pythonanywhere.com/create_card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSound),
      });

      if (response.ok) {
        // eslint-disable-next-line
        const sound = await response.json();
        // addSound(sound);
        formik.resetForm();
        fetchAllSounds();
        setFormErrors([]);
      } else {
        const err = await response.json();
        setFormErrors(err.errors);
      }
    },
  });
  // console.log(sounds)
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="new-sound-form">
        <label htmlFor="email">Sound: </label>
        <input
          id="sound"
          name="sound"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.sound}
          placeholder="Sound"
        />

        {/* Add input for the image URL */}
        <label htmlFor="email">Image: </label>
        <input
          id="image"
          name="image"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.image}
          placeholder="Image URL"
        />
        {formErrors.length > 0
          ? formErrors.map((err, index) => (
              <p key={index} style={{ color: "red" }}>
                {err}
              </p>
            ))
          : null}
        <input id="add-sound-button" type="submit" value="Create Sound" />
      </form>
      <h2 id="flash-card-library">Flash Card Library</h2>
      <div className="cards-container">
        {sounds &&
          sounds.map((sound) => (
            <div className="display-container" key={sound.id}>
              <FlashCard sound={sound} />
              <button onClick={() => handleDelete(sound.id)}>Delete</button>
              <button onClick={() => handleEdit(sound)}>Edit</button>
              {selectedSound && selectedSound.id === sound.id && (
                <div>
                  <input
                    type="text"
                    placeholder="sound Name"
                    value={updateData.sound}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, sound: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={updateData.image}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        image: e.target.value,
                      })
                    }
                  />

                  <button onClick={() => handleUpdate(selectedSound.id)}>
                    Save
                  </button>
                  <button onClick={() => setSelectedSound(null)}>Cancel</button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CreateCard;
