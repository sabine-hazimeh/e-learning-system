import React from "react";
import image from "../images/women-studying.png";
import "./style.css";
function Home() {
  return (
    <>
      <div className="home-container">
        <div className="home-image">
          <img src={image} className="img"></img>
        </div>
        <div className="home-text">
          <h1>Welcome to Learnly</h1>
          <p className="home-par">
            <b>Learnly</b> is a modern way of learning and training using
            digital resources.
            <br />
            It provides flexible access to educational materials and resources,
            enabling learners to study at their own pace and convenience.
            <br />
            Our platform offers a wide range of courses and interactive content
            designed to enhance your knowledge and skills.
            <br />
            Join us and explore the world of online learning!
          </p>
          <button className="home-button">Start Learning Now!</button>
        </div>
      </div>
    </>
  );
}
export default Home;
