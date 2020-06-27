import React, {Component} from 'react';
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'



class Quiz extends Component {
    state ={
        results: {},
        isFinished: false,
        activeQuistion: 0,
        answerState: null,
        quiz: [
            {   id: 1,
                question: 'Какого цвета небо?',
                answers:[
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зеленый', id: 4}
                ],
                rightAnswerId: 2
            },
            {   id: 2,
                question: 'В каком году основали Спб?',
                answers:[
                    {text: '1700', id: 1},
                    {text: '1705', id: 2},
                    {text: '1703', id: 3},
                    {text: '1803', id: 4}
                ],
                rightAnswerId: 3
            }
        ]
    }

    onAnswerClickHandler = AnswerId => {
        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
            console.log(key)
            if(this.state.answerState[key] === 'success'){
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuistion]
        const results = this.state.results
        if(question.rightAnswerId == AnswerId){
            if(!results[question.id]){
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[AnswerId]: 'success'},
                results
            })

            const timeout = window.setTimeout(()=> {
                if(this.izQuizFinished()){
                        console.log('Fin')
                        this.setState({
                            isFinished: true
                        })
                } else{
                    this.setState({
                        activeQuistion: this.state.activeQuistion + 1,
                        answerState: null
                    }) 
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[AnswerId]: 'error'},
                results
            })
        }

        
    }
    izQuizFinished(){
        return this.state.activeQuistion + 1 === this.state.quiz.length
    }

    retryHandler = () =>{
        this.setState({
            activeQuistion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render(){
        return(
            <div className="Quiz">
                    
                    
            <div className="QuizWrapper">
            <h1>Ответьте на все вопросы</h1>
            {
                this.state.isFinished
                ?    <FinishedQuiz 
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.retryHandler}
                />
                :   <ActiveQuiz 
                answers={this.state.quiz[this.state.activeQuistion].answers}
                question={this.state.quiz[this.state.activeQuistion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuistion + 1}
                state={this.state.answerState}
                />
            }
            
                    </div>
            </div>
        )
    }
}


export default Quiz