import React from 'react';
import './FinishedQuiz.css'
import Button from '../UI/Button/Button'


const FinishedQuiz = props =>{
    const succsssCount = Object.keys(props.results).reduce((total,key) => {
        if(props.results[key] === 'success'){
            total++
        }
        return total
    }, 0)
    console.log(props.results)
    return (
        <div className="FinishedQuiz">
                <ul>
                    {props.quiz.map((quizItem, index) => {
                        const cls = [
                            'fa',
                            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                            props.results[quizItem.id]
                        ]
                        return(
                            <li key={index}>
                                <strong>{index + 1}</strong>&nbsp;
                                {quizItem.question}
                                <i className={cls.join(' ')}/>
                            </li>
                        )
                    })}
                    {/* <li>
                        <strong>1. </strong>
                        How are you
                        <i className="fa fa-times error"/>
                    </li>
                    <li>
                        <strong>1. </strong>
                        How are you
                        <i className="fa fa-check success"/>
                    </li> */}
                </ul>

                <p>Правильно {succsssCount} из {props.quiz.length}</p>

                <div>
                    
                    <Button onClick={props.onRetry}>Повторить</Button>
                    <Button onClick={props.onRetry}>Перейти в список тестов</Button>
                </div>
        </div>
    )
}



export default FinishedQuiz