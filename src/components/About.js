import React from "react";

function About() {
  return (
    <div id="about-container">
      <img
        id="about-image-1"
        src={process.env.PUBLIC_URL + "/images/AboutPageImages/About1.png"}
        alt="about"
      ></img>
      <div className="instructions">
        <h1>Hello!</h1>

        <h2>I'm Aaron</h2>
        <br />
        <p>
          My journey has taken me from being an ABA therapist for a decade to
          becoming a passionate software developer with a mission. During my
          years as an ABA therapist, I had the privilege of working closely with
          children diagnosed with autism, and it was this experience that
          ignited my desire to make a positive impact on their lives. That's why
          I embarked on a new path, creating the Speech Trainer program, an
          innovative app designed to enhance the speech development of the very
          children I once taught.
        </p>
        <br />
        <p>
          The Speech Trainer app combines my background in ABA therapy with
          cutting-edge technology to engage children in speech practice. Through
          interactive video and game pauses, it transforms speech learning into
          an exciting and enjoyable experience for both parents and children.
        </p>
        <br />
        <p>
          Additionally, the app offers specially crafted flashcards to aid in
          practicing those crucial first words. I firmly believe in the power of
          learning through play, and my goal is to make speech development fun
          and effective for children in their early childhood. Join me on this
          journey to unlock the potential of every child and empower them to
          communicate confidently.
        </p>
        <img
          id="about-image-2"
          src={process.env.PUBLIC_URL + "/images/AboutPageImages/About2.png"}
          alt="about"
        ></img>
      </div>
    </div>
  );
}

export default About;
