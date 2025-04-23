import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          setTimeRemaining(10);
          onAnswered(false); 
        } else {
          return prevTime - 1;
        }
      });
    }, 1000); 


    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]);

  const handleAnswer = (isCorrect) => {
    setTimeRemaining(10); 
    onAnswered(isCorrect);
  };

  const { id, prompt, answers, correctIndex } = question;

  return (
    <div>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>

      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </div>
  );
}

export default Question;
