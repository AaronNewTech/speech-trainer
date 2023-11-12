import React, { useState, useEffect } from "react";
import { useAuth } from "./UseContext";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Speech from "speak-tts";
import FlashCard from "./FlashCard";
import { useNavigate } from "react-router-dom";

const SpeechPractice = ({ email, setEmail }) => {
  const { user } = useAuth();
  const [randomSound, setRandomSound] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSpokenGreatJob, setHasSpokenGreatJob] = useState(false);
  const [score, setScore] = useState(() => {
    // Initialize score from localStorage, or 0 if not present
    const storedScore = localStorage.getItem("score");
    return storedScore ? parseInt(storedScore, 10) : 0;
  });

  const navigate = useNavigate();
  const minSoundId = 1;
  // const maxSoundId = 100;

  useEffect(() => {
    fetchMaxSoundId();

    if (user) {
      fetchUserScore();
    }
  }, []);

  const fetchMaxSoundId = async () => {
    try {
      const response = await fetch("https://arnhsmith.pythonanywhere.com/get_last_sound_id");
      // console.log(response)
      if (response.ok) {
        const maxSoundData = await response.json();
        // console.log(maxSoundData)
        // let id = maxSoundData;
        // setMaxSoundId(id);
        // console.log(maxSoundId)
        fetchRandomSound(maxSoundData);
      } else {
        console.error("Failed to fetch max sound ID");
      }
    } catch (error) {
      console.error("An error occurred while fetching max sound ID:", error);
    }
  };

  const fetchRandomSound = async (maxSoundId) => {
    let randomSoundData = null;
    while (!randomSoundData) {
      const randomSoundId =
        Math.floor(Math.random() * (maxSoundId - minSoundId + 1)) + minSoundId;
      // console.log("random", randomSoundId);
      const response = await fetch(`https://arnhsmith.pythonanywhere.com/sounds/${randomSoundId}`);

      if (response.ok) {
        randomSoundData = await response.json();
        await initPlayText(randomSoundData.sound);

        setRandomSound(randomSoundData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const fetchUserScore = async () => {
    try {
      const response = await fetch("https://arnhsmith.pythonanywhere.com/user_score");

      if (response.ok) {
        const userScoreData = await response.json();
        const score = userScoreData.score;

        // Update the score state and localStorage
        setScore(score);
        localStorage.setItem("score", score.toString());
      }
    } catch (error) {
      console.error("An error occurred while fetching random score:", error);
    }
  };

  const initPlayText = async (sound) => {
    if (sound) {
      speech.speak({
        text: sound,
      });
    }
  };

  const speech = new Speech();
  speech
    .init()
    .then((data) => {
      // The "data" object contains the list of available voices and the voice synthesis params
    })
    .catch((e) => {
      console.error("An error occurred while initializing:", e);
    });

  const handlePlayText = (event) => {
    if (randomSound) {
      speech
        .speak({
          text: randomSound.sound,
        })
        .then(() => {
          console.log("Success !");
        })
        .catch((e) => {
          console.error("An error occurred:", e);
        });
    }
  };

  async function handleClick(event) {
    await SpeechRecognition.startListening();
  }

  const {
    transcript,
    listening,
    // resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleScoreChange = async (event) => {
    const newScore = score + 1;

    try {
      const response = await fetch("https://arnhsmith.pythonanywhere.com/scores", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score_value: newScore,
        }),
      });

      if (response.ok) {
        // Update the score state and localStorage
        setScore(newScore);
        localStorage.setItem("score", newScore.toString());
        console.log("Score updated successfully");
      } else {
        console.error("Failed to update score on the server");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  let result = null;

  if (transcript.toLowerCase()) {
    if (transcript.toLowerCase() === randomSound.sound) {
      result = "Correct";
    } else if (transcript.toLowerCase() !== randomSound.sound) {
      result = "Incorrect, try again";
    }
  } else {
    result = "";
  }

  if (
    randomSound &&
    transcript.toLowerCase() === randomSound.sound &&
    !hasSpokenGreatJob
  ) {
    initPlayText("Great job");
    setHasSpokenGreatJob(true);
    setScore(score + 1);
    handleScoreChange();
  }

  const handleNextCard = () => {
    navigate("/empty-route");
  };

  // const handleTextareaChange = (event) => {
  //   // Update the transcript when the textarea value changes
  //   resetTranscript(); // Reset the transcript since it's controlled
  // };

  return (
    <div className="voice-test">
      {user ? <div id="score">Score: {score}</div> : <div></div>}
      <p id="microphone">Microphone: {listening ? "on" : "off"}</p>
      <button onClick={handleClick}>Start</button>
      <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
      {/* <button onClick={() => resetTranscript()}>Reset</button> */}
      <h3>Your Speech: {transcript} </h3>
      <br />
      <br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {randomSound && (
            <>
              <FlashCard sound={randomSound} email={email} />
            </>
          )}
        </>
      )}
      <br />

      <button onClick={handlePlayText}>Play Audio</button>
      <br />
      <br />
      <h2>{result}</h2>
      <br />
      {/* {hasSpokenGreatJob ? (
        <button onClick={handleNextCard}>Next Card</button>
      ) : (
        <div></div>
      )} */}
      <button onClick={handleNextCard}>Next Card</button>
      {/* <button onClick={handleSaveSound}>Save Sound</button> */}
    </div>
  );
};

export default SpeechPractice;
