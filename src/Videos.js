import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import SpeechPractice from "./SpeechPractice";
import Modal from "react-modal";
// eslint-disable-next-line
import * as yup from "yup";
import { useFormik } from "formik";
// https://www.youtube.com/watch?v=2L1FdaIbs5M
Modal.setAppElement("#root");

const Videos = () => {
  // const [videoUrl, setVideoUrl] = useState("Wm4R8d0d8kU")
  const videoId = "Wm4R8d0d8kU";
  // eslint-disable-next-line
  const [formErrors, setFormErrors] = useState([]);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showModal, setShowModal] = useState(false);

  

  const opts = {
    height: "630",
    width: "1120",
    playerVars: {
      autoplay: 0,
    },
  };

  const onReady = (event) => {
    
    setPlayer(event.target);
  };

  const onPlay = (event) => {
    
    setIsPlaying(true);
  };

  const onPause = (event) => {
    setIsPlaying(false);
  };

  const openModal = () => {

    if (player) {
      player.pauseVideo();
    }
    setShowModal(true);
  };

  useEffect(() => {
    let intervalId;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);

        if (elapsedTime > 0 && elapsedTime % 5 === 0) {
          openModal();
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying, elapsedTime, openModal]);

  const closeModal = () => {
    setShowModal(false);

    
    if (player) {
      player.playVideo();
    }
  };
  const formik = useFormik({
    initialValues: {
      videoURL: "",
    },
    onSubmit: async (values) => {
      const newVideo = {
        video: values.video,
      };

      const response = await fetch("/create_card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      });

      if (response.ok) {
        // eslint-disable-next-line
        const video = await response.json();
        // addSound(sound);
        formik.resetForm();
        // fetchAllSounds();
        setFormErrors([]);
      } else {
        const err = await response.json();
        setFormErrors(err.errors);
      }
    },
  });

  return (
    <div className="video-text">
      <h2> Video Speech Trainer </h2>
      <p>Say the word to continue watching the video</p>
      {/* <form onSubmit={formik.handleSubmit} className="new-video-form">
        <label htmlFor="email">Enter video URL: </label>
        <input
          id="video"
          name="video"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.video}
          placeholder="Video URL"
        />

        
        {formErrors.length > 0
          ? formErrors.map((err, index) => (
              <p key={index} style={{ color: "red" }}>
                {err}
              </p>
            ))
          : null}
        <input id="add-video-button" type="submit" value="Add Video" />
      </form> */}
      <div className="embed-video">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onPlay={onPlay}
          onPause={onPause}
        />
        {/* <div>
        {isPlaying ? (
          <p>Elapsed Time: {elapsedTime} seconds</p>
        ) : (
          <p>Video is paused</p>
        )}
      </div> */}
        {showModal && (
          <Modal
            isOpen={showModal}
            contentLabel="Example Modal"
            onRequestClose={closeModal}
          >
            <SpeechPractice showModal={showModal} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Videos;
