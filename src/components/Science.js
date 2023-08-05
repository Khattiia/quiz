import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../pages/Navigation";
import classes from "./Quiz.module.css";
import Score from "../pages/Score";

const Science = () => {
  const [science, setScience] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);

  function combineAllAnswers(incorrectAnswers, correctAnswer) {
    let allAnswers = [...incorrectAnswers, correctAnswer];
    allAnswers.sort(() => Math.random() - 0.5);
    setAllPossibleAnswers(allAnswers);
  }

  async function fetchScienceHandler() {
    setLoading(true);
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=10&category=17"
    );

    setScience(response.data.results);
    const currentQuestion = response.data.results[0];
    setCorrectAnswer(currentQuestion.correct_answer);

    await combineAllAnswers(
      currentQuestion.incorrect_answers,
      currentQuestion.correct_answer
    );

    setLoading(false);
  }

  useEffect(() => {
    fetchScienceHandler();
  }, []);

  function goToNextQuestion() {
    if (currentQuestionIndex + 1 < science.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCorrectAnswer(science[currentQuestionIndex + 1].correct_answer);
      combineAllAnswers(
        science[currentQuestionIndex + 1].incorrect_answers,
        science[currentQuestionIndex + 1].correct_answer
      );
    } else {
      setShowScore(true);
    }
  }

  function retryQuiz() {
    setShowScore(false);
    setCurrentPoints(0);
    setCurrentQuestionIndex(0);
    fetchScienceHandler();
  }

  function verifyAnswer(selectedAnswer) {
    if (selectedAnswer === correctAnswer) {
      setCurrentPoints(currentPoints + 1);
    } else {
      setCurrentPoints(currentPoints);
    }
    goToNextQuestion();
  }

  function removeCharacters(question) {
    return question
      .replace(/(&quot;)/g, '"')
      .replace(/(&rsquo;)/g, "'")
      .replace(/(&#039;)/g, "'")
      .replace(/(&amp;)/g, "&");
  }

  return (
    <div>
      <Navigation />
      <h1 className={classes.h1}>Science Quiz</h1>
      {showScore ? (
        <Score
          points={currentPoints}
          retryQuiz={retryQuiz}
          totalQuestions={science.length}
        />
      ) : (
        <header className={classes.header}>
          {loading ? (
            "Trivia Question Loading..."
          ) : (
            <div>
              <div>Current Points : {currentPoints}</div>
              <br />
              {science.length > 0 ? (
                <div>
                  <div className={classes.box}>
                    {removeCharacters(science[currentQuestionIndex].question)}
                  </div>
                  <br />
                  <div className={classes.optionbox}>
                    <div className={classes.optionColumn}>
                      {allPossibleAnswers.map((answer, index) => (
                        <button
                          key={index}
                          className={classes.options}
                          onClick={() => verifyAnswer(answer)}
                        >
                          {removeCharacters(answer)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <br />
                  <button className={classes.button} onClick={goToNextQuestion}>
                    Next Question
                  </button>
                </div>
              ) : (
                <div>No questions available.</div>
              )}
            </div>
          )}
        </header>
      )}
    </div>
  );
};

export default Science;
