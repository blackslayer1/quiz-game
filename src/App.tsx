import './App.scss';
import { useState, useEffect, MouseEvent } from 'react';

function App() {
  const [page, setPage] = useState<number>(0);
  const [question, setQuestion] = useState<string>("");
  const [answerA, setAnswerA] = useState<string>("");
  const [answerB, setAnswerB] = useState<string>("");
  const [answerC, setAnswerC] = useState<string>("");
  const [answerD, setAnswerD] = useState<string>("");
  const [answerSelected, setAnswerSelected] = useState<boolean>(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(['b', 'a', 'a', 'd', 'b']);
  const [percentage, setPercentage] = useState<number>(0);
  const [numberOfClicks, setNumberOfClicks] = useState<number>(1);

  const setQuestionAnswer = (question: string, a: string, b: string, c: string, d: string) => {
    setQuestion(question);
    setAnswerA(a);
    setAnswerB(b);
    setAnswerC(c);
    setAnswerD(d);
  }

  const reset = () => {
    let answers = Array.from(document.getElementsByClassName('answers'));
    answers.map((answer)=>{
      (answer as HTMLLIElement).style.opacity="100%";
    })
    setAnswerSelected(false);
  }

  useEffect(()=>{
    let answers = Array.from(document.getElementsByClassName('answers'));
    let progress = document.getElementById('progress')!;
    switch(page){
      case 1:
      reset();
      setQuestionAnswer("What is Ford's best selling model?", "Mustang", "F-150", "Edge", "Model T");
      progress.style.width="20%";
      break;
      case 2:
      reset();
      setQuestionAnswer("Which hybrid pickup came out in 2004?", "Chevrolet", "AUDI", "Ford", "GMC");
      progress.style.width="40%";
      break;
      case 3:
      reset();
      setQuestionAnswer("Which car has the highest horsepower?", "Koenigsegg Regera", "Tesla Model S Plaid", "Dodge Demon", "Lamborghini Aventador SVJ");
      progress.style.width="60%";
      break;
      case 4:
      reset();
      setQuestionAnswer("How many horsepowers does a Huracan have?", "800", "760", "470", "630");
      progress.style.width="80%";
      break;
      case 5:
      setQuestionAnswer("How much does the Bugatti Chiron cost?", "$800k", "$2.9 Million", "$1 Million", "$11 million");
      progress.style.width="100%";
      answers.map((answer)=>{
        (answer as HTMLLIElement).style.opacity="100%";
      })
      break;
    }
  }, [page]);

  useEffect(()=>{
    if(answerSelected){
      document.getElementById('nextButton')!.style.pointerEvents='all';
      document.getElementById('nextButton')!.style.opacity='100%';
    } else {
      document.getElementById('nextButton')!.style.pointerEvents='none';
      document.getElementById('nextButton')!.style.opacity='50%';
    }
  }, [answerSelected])

  const start = () => {
    document.getElementById('content')!.style.visibility="visible";
    document.getElementById('startQuiz')!.style.visibility="hidden";
    setPage(page+1);
  }

  const nextQuestion = (e: MouseEvent<HTMLButtonElement>): void => {
    let answers_ = Array.from(document.getElementsByClassName('answers'));
    setPage(page + 1);
    for(let i=0; i<answers_.length; i++){
      let a = answers_[i] as HTMLLIElement;
      if(a.id==="selected"){
        switch(i){
          case 0:
            setAnswers([...answers, 'a']);
          break;
          case 1:
            setAnswers([...answers, 'b']);
          break;
          case 2:
            setAnswers([...answers, 'c']);
          break;
          case 3:
            setAnswers([...answers, 'd']);
            break;
        }
    }

      }
  }

  const clickHandler = (e: MouseEvent<HTMLLIElement>) => {
    let answer = e.target as HTMLLIElement;
    let answers = Array.from(document.getElementsByClassName('answers'));
    answers.map((answer)=>{
      (answer as HTMLLIElement).style.opacity="100%";
      (answer as HTMLLIElement).id="";
    })
    answer.style.opacity="50%";
    answer.id="selected";
    setAnswerSelected(true);
  }

  const endQuiz = (e: MouseEvent<HTMLButtonElement>): void => {
    let answers_ = Array.from(document.getElementsByClassName('answers'));
    let content = document.getElementById('content')!;
    let results = document.getElementById('results')!;

    setNumberOfClicks(numberOfClicks+1);

    for(let i=0; i<answers_.length; i++){
      let a = answers_[i] as HTMLLIElement;
      if(a.id==="selected"){
        switch(i){
          case 0:
            setAnswers([...answers, 'a']);
          break;
          case 1:
            setAnswers([...answers, 'b']);
          break;
          case 2:
            setAnswers([...answers, 'c']);
          break;
          case 3:
            setAnswers([...answers, 'd']);
            break;
        }
    }
   }
   if(numberOfClicks === 2){
    let totalCorrect: number = 0;
    for(let i=0; i<correctAnswers.length; i++){
      for(let j=0; j<answers.length; j++){
        if(correctAnswers[i]===answers[j]){
          totalCorrect++;
        }
      }
    }
    setPercentage(Math.abs(((totalCorrect-4)/5)*100));
    content.style.visibility="hidden";
    results.style.visibility="visible";
    console.log(totalCorrect)
   } else {
    alert("Are you sure you want to submit? ");
   }
  }


  return (
    <div className="App">
      <header>
      { page > 0 && <div style={{position: "relative", left: "20px", top: "20px"}}>
      <label>Question {page}/5</label>
    <div className="progressbar">
      <span className="progress" id="progress"></span>
    </div>
    </div>}
      </header>
      <div className="container">
        <div id="startQuiz" className="startQuiz">
          <h2>Can you score a 100% on this automatives quiz?</h2>
          <button onClick={start}>Start</button>
        </div>
        <div id="content" className="content">
          <h2>{question}</h2>
          <hr/>
          <ul>
            <li className="answers" onClick={clickHandler}><span>A</span>{answerA}</li>
            <li className="answers" onClick={clickHandler}><span>B</span>{answerB}</li>
            <li className="answers" onClick={clickHandler}><span>C</span>{answerC}</li>
            <li className="answers" onClick={clickHandler}><span>D</span>{answerD}</li>
          </ul>
          <div className="buttons">
          { page === 5 && <button onClick={endQuiz} className="endQuiz">End Quiz</button>}
          { page < 5 && <button onClick={nextQuestion} id="nextButton" className="nextButton">Next Question</button>}
          </div>
        </div>
        <div id="results" style={{visibility: "hidden"}}>
          <h2 style={{position: "absolute", left: '135px', color: "white"}}>Results: {percentage}%</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
