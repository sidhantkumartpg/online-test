import React, { useEffect, useState } from 'react'; 
import {getAllQuestions} from '../utils/questionsUtil.js'
import Question from './question.jsx';
import  CustomTimer from './timer.jsx';

const TakeTest = (props) => {

    const [quesList, setQuesList] = useState([]);

    function mapToQuesModel(ques) {
        const {title, choices, multipleAns} = ques;

        const mapChoices = choices.map(choice => {return {value: choice, selected: false}});

        return {title, choices: mapChoices, multipleAns};
    }

    const  onCheckAnswer= (quesIndex, choiceIndex, e) => {
        // const quesConst = {...quesList};
        // quesConst[quesIndex]['choices'][choiceIndex]['selected'] = e.target.checked;

        // setQuesList(quesConst);

        const selected = e.target.checked;
        // const quesIndex = parseInt(e.target.value);

        if (e.target.type === 'radio'){
            setQuesList([...quesList.slice(0, quesIndex), 
                {...quesList[quesIndex], choices: [...quesList[quesIndex]['choices'].slice(0,choiceIndex).map(q => {return {...q, selected: false} }), {...quesList[quesIndex]['choices'][choiceIndex], selected: true}, ...quesList[quesIndex]['choices'].slice(choiceIndex+1).map(q => {return {...q, selected: false} })]},
                ...quesList.slice(quesIndex+1)
            ]);
        }

        else{
            setQuesList([...quesList.slice(0, quesIndex), 
                {...quesList[quesIndex], choices: [...quesList[quesIndex]['choices'].slice(0,choiceIndex), {...quesList[quesIndex]['choices'][choiceIndex], selected: selected}, ...quesList[quesIndex]['choices'].slice(choiceIndex+1)]},
                ...quesList.slice(quesIndex+1)
            ]);
        }
    }

    function renderQuestion(){
        if (!quesList.length)
            return
        else
            return quesList.map((ques, index) => 
                <Question key={index} ques={ques} onCheckAnswer={onCheckAnswer} quesIndex={index}/>)
    }

    useEffect(() => {
        const {state} = props.location;
        let questions = getAllQuestions(!state ? 1 : state.skillLevel);

        const quesConst = [];

        questions.forEach(q => {
            const mappedQues = mapToQuesModel(q);
            quesConst.push(mappedQues);
        })

        setQuesList(quesConst);
    }, []);

    // Question fetch krne k baad state me id, value, isChecked bhi rkhna hai (uski choices k andar)

    return (
        <>
            <CustomTimer/>

            <div id="test-container">
                {renderQuestion()}
            </div>
        </>
     );
}

export default TakeTest;