import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./UseContext";

function Home() {
  const { user } = useAuth();
  return (
    <div id="home-page-1">
      <br />
      <div className="row-1">
        <div className="column">
          <img
            id="speech-trainer-main-logo"
            src={
              process.env.PUBLIC_URL + "/images/speech-trainer-main-logo.png"
            } 
            alt="speech-trainer-logo"
          />
        </div>
        <div className="column">
          <img
            id="home-kids-image-1"
            src={process.env.PUBLIC_URL + "/images/HomePageImages/Home4.png"}
            alt="kids"
          />
        </div>
        <div className="column">
          <div>
            <img
              id="home-level-up-image"
              src={process.env.PUBLIC_URL + "/images/HomePageImages/Home2.png"}
              alt="level-up"
            />
            {user ? (
              <NavLink to={"/login"}>
                <img
                  id="logout-image"
                  src={
                    process.env.PUBLIC_URL +
                    "/images/HomePageImages/HomeLogout.png"
                  }
                  alt="logout"
                />
              </NavLink>
            ) : (
              <NavLink to={"/login"}>
                <img
                  id="login-image"
                  src={
                    process.env.PUBLIC_URL +
                    "/images/HomePageImages/HomeLogin.png"
                  }
                  alt="login"
                />
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <div id="home-page-2">
        <div className="row-2">
          <img
            id="home-welcome-image"
            src={process.env.PUBLIC_URL + "/images/HomePageImages/Home5.png"}
            alt="home-welcome"
          />
          <img
            id="home-wind-image"
            src={process.env.PUBLIC_URL + "/images/HomePageImages/Home6.png"}
            alt="home-wind"
          />
          <img
            id="home-stars-image"
            src={process.env.PUBLIC_URL + "/images/HomePageImages/Home7.png"}
            alt="home-stars"
          />
        </div>
      </div>

      <div id="home-page-3">
        <div className="row-4">
          <img
            id="home-learning-center-image"
            src={process.env.PUBLIC_URL + "/images/HomePageImages/Home8.png"}
            alt="home-learning-center"
          />
        </div>
        <div className="row-3">
          <div className="column-2">
            <NavLink to="/videos">
              <img
                id="video-speech-trainer-logo"
                src={
                  process.env.PUBLIC_URL +
                  "/images/video-speech-trainer-logo.png"
                }
                alt="Video Speech Trainer"
              />
            </NavLink>
          </div>
          <div className="column-2">
            <NavLink to="/speech-practice">
              <img
                id="first-words-logo"
                src={process.env.PUBLIC_URL + "/images/first-words-logo.png"}
                alt="First Words"
              />
            </NavLink>
          </div>
          <div className="column-2">
            <NavLink to="/rock-paper-scissors-game">
              <img
                id="games-logo"
                src={
                  process.env.PUBLIC_URL +
                  "/images/HomePageImages/games-logo.png"
                }
                alt="Rock Paper Scissors"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
