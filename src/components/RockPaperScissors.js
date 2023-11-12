// initial code source
// https://www.codingnepalweb.com/rock-paper-scissors-game-javascript/
import React, { useState, useEffect } from "react";
import SpeechPractice from "./SpeechPractice";
import ReactModal from "react-modal";
import Modal from "react-modal";

Modal.setAppElement("#root");

const RockPaperScissors = () => {
  const [userResult, setUserResult] = useState(`${process.env.PUBLIC_URL}/images/rock.png`);
  const [cpuResult, setCpuResult] = useState(`${process.env.PUBLIC_URL}/images/rock.png`);
  const [result, setResult] = useState("Let's Play!!");
  const [activeOptionIndex, setActiveOptionIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [counter, setCounter] = useState(0);

  const optionImages = [
    `${process.env.PUBLIC_URL}/images/rock.png`,
    `${process.env.PUBLIC_URL}/images/paper.png`,
    `${process.env.PUBLIC_URL}/images/scissors.png`,
  ];

  const handleOptionClick = (index) => {
    setActiveOptionIndex(index);
    setUserResult(`${process.env.PUBLIC_URL}/images/rock.png`);
    setCpuResult(`${process.env.PUBLIC_URL}/images/rock.png`);
    setResult("Wait...");

    setTimeout(() => {
      setActiveOptionIndex(null);

      const userChoice = optionImages[index];
      const cpuChoice =
        optionImages[Math.floor(Math.random() * optionImages.length)];

      setUserResult(userChoice);
      setCpuResult(cpuChoice);

      const outcomes = {
        [`${process.env.PUBLIC_URL}/images/rock.png${process.env.PUBLIC_URL}/images/rock.png`]: "Draw",
        [`${process.env.PUBLIC_URL}/images/rock.png${process.env.PUBLIC_URL}/images/paper.png`]: "Cpu",
        [`${process.env.PUBLIC_URL}/images/rock.png${process.env.PUBLIC_URL}/images/scissors.png`]: "User",
        [`${process.env.PUBLIC_URL}/images/paper.png${process.env.PUBLIC_URL}/images/rock.png`]: "User",
        [`${process.env.PUBLIC_URL}/images/paper.png${process.env.PUBLIC_URL}/images/paper.png`]: "Draw",
        [`${process.env.PUBLIC_URL}/images/paper.png${process.env.PUBLIC_URL}/images/scissors.png`]: "Cpu",
        [`${process.env.PUBLIC_URL}/images/scissors.png${process.env.PUBLIC_URL}/images/rock.png`]: "Cpu",
        [`${process.env.PUBLIC_URL}/images/scissors.png${process.env.PUBLIC_URL}/images/paper.png`]: "User",
        [`${process.env.PUBLIC_URL}/images/scissors.png${process.env.PUBLIC_URL}/images/scissors.png`]: "Draw",
      };
      

      const outcomeKey = `${userChoice}${cpuChoice}`;
      const gameResult = outcomes[outcomeKey] || "Invalid choice";

      setResult(gameResult === "Draw" ? "Match Draw" : `${gameResult} Won!!`);
      if (gameResult === "User") {
        setPoints(points + 1);
      }

      setCounter(counter + 1);
    }, 2500);
  };

  useEffect(() => {
    // Check if the Points is a multiple of 3 (increases by 3)
    if (counter % 3 === 0 && counter > 0) {
      setIsOpen(true); // Open the modal when the Points increases by 3
    }
  }, [counter]);

  return (
    <div  >
    
      <section id="rps-body"
        className={`container ${activeOptionIndex !== null ? "start" : ""}`}
      >
        <div className="result_field">
          <div className="result_images">
            <span className="user_result">
              <img src={userResult} alt="" />
            </span>
            <span className="cpu_result">
              <img src={cpuResult} alt="" />
            </span>
          </div>
          <div className="result">{result}</div>
        </div>

        <div className="option_images">
          {optionImages.map((image, index) => (
            <span
              key={index}
              className={`option_image ${
                activeOptionIndex === index ? "active" : ""
              }`}
              onClick={() => handleOptionClick(index)}
            >
              <img src={image} alt="" />
              <p>{image.split("/").pop().split(".")[0]}</p>
            </span>
          ))}
        </div>
        <p>Points: {points}</p>
      </section>
      <ReactModal
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsOpen(false)}
      >
        <SpeechPractice />
      </ReactModal>
    </div>
  );
};

export default RockPaperScissors;
