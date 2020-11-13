const json = require('./questionBank.json');

export function getAllQuestions(level) {
    if (!level)
        return json['questions'];
    
    var ques = json['questions'].filter(ques => ques.level.find(l => l === parseInt(level)));

    return ques;
}