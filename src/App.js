import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import QuizInstructions from './components/quiz/Quizinstructions';
import Play from './components/quiz/play';
import QuizSummary from './components/quiz/QuizSummary';
import Register from './components/Register';
import Login from './components/Login';

class App extends React.Component {
  render(){
    return ( 
      <Router>
             <Route exact path="/" component={Home} />
             <Route path="/user/play/instructions" exact component={QuizInstructions} />
             <Route path="/user/play/quiz" exact component={Play} />
             <Route path="/user/play/quizSummary" exact component={QuizSummary} />
             <Route path="/user/play/register" exact component={Register}/>
             <Route path="/user/play/login" exact component={Login}/>
      </Router>
    )
  }
}



export default App;



