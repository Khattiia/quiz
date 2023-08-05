import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Score.module.css";

const Score = ({ points, totalQuestions, retryQuiz }) => {
  const navigate = useNavigate();

  const cancelaHandler = () => {
    navigate("/topics");
  };

  return (
    <>
      <p className={classes.score}>
        Your Score : {points} / {totalQuestions}
      </p>
      <div className={classes.actions}>
        <button onClick={retryQuiz}>Try Again</button>
        <button onClick={cancelaHandler}> Cancel </button>
      </div>
    </>
  );
};

export default Score;
