import React from "react";
import SaveSoundButton from "./SaveSoundButton";

function FlashCard({ sound, email }) {
  const isImageUrl = sound.image.startsWith("http://") || sound.image.startsWith("https://");
  const imagePath = isImageUrl ? sound.image : process.env.PUBLIC_URL + "/" + sound.image;

  return (
    <div id="flash-card-container">
      <div>
        <h2>Say the word "{sound.sound}"</h2>
        <br />
        <div className="sound-image-container">
          {isImageUrl ? (
            <img src={sound.image} alt={sound.sound} />
          ) : (
            <img src={imagePath} alt={sound.sound} />
          )}
        </div>
        <SaveSoundButton soundId={sound.id} email={email} />
      </div>
    </div>
  );
}

export default FlashCard;
