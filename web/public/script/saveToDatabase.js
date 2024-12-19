export async function saveToDatabase(dataArray) {
    const currentAddress = window.location.origin;

    let subjectResponse;

    await fetch(`${currentAddress}/createsubject`, {
        method: 'POST',
        body: JSON.stringify(dataArray),
        headers: {'Content-Type': 'application/json'}
    })
    .then(Response => Response.json())
    .then(data => subjectResponse = data);

    for(let i = 0; i < dataArray.questions.length; i++) {
        const questionBody = {
            ...dataArray.questions[i],
            subjectId: subjectResponse.subjectId
        }

        let questionResponse;
        let answerResponse;

        await fetch(`${currentAddress}/createquestion`, {
            method: 'POST',
            body: JSON.stringify(questionBody),
            headers: {'Content-Type': 'application/json'}
        })
        .then(Response => Response.json())
        .then(data => questionResponse = data);

        for(let y = 0; y < dataArray.questions[i].answers.length; y++) {
            const subjectBody = {
                ...dataArray.questions[i].answers[y],
                questionId: questionResponse.questionId
            }

            await fetch(`${currentAddress}/createanswer`, {
                method: 'POST',
                body: JSON.stringify(subjectBody),
                headers: {'Content-Type': 'application/json'}
            })
            .then(Response => Response.json())
            .then(data => answerResponse = data);
        }
    }
}

// pass the data like this to the function
// also notify me if anything is missing that needs to be saved to the database - Kalle
// these are filled with testing data, you need to make an object like this with the actual data
const dataArray = {
    "subjectName": "JOS OLEN TIETOKANNASSA, TOIMIN!",
    "subjectDescription": "JOS OLEN TIETOKANNASSA, TOIMIN!",
    "subjectImage": "testi.png",
    "subjectAuthor": "3",
    "questions":[
        {
            "question": "JOS OLEN TIETOKANNASSA, TOIMIN!",
            "answers":[
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "0",
                    "pos": "1"
                },
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "0",
                    "pos": "2"
                },
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "1",
                    "pos": "3"
                },
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "0",
                    "pos": "4"
                }
            ],
            "maxPoints": "1000",
            "ansTime": "30",
            "waitTime": "5",
            "img_file": "testi.png"
        },
        {
            "question": "JOS OLEN TIETOKANNASSA, TOIMIN!",
            "answers":[
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "0",
                    "pos": "1"
                },
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "0",
                    "pos": "2"
                },
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "1",
                    "pos": "3"
                },
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "0",
                    "pos": "4"
                }
            ],
            "maxPoints": "500",
            "ansTime": "40",
            "waitTime": "52",
            "img_file": "testi.png"
        },
        {
            "question": "JOS OLEN TIETOKANNASSA, TOIMIN!",
            "answers":[
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "0",
                    "pos": "1"
                },
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "0",
                    "pos": "2"
                },
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "1",
                    "pos": "3"
                },
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "0",
                    "pos": "4"
                }
            ],
            "maxPoints": "10300",
            "ansTime": "30",
            "waitTime": "5",
            "img_file": "testi.png"
        },
        {
            "question": "JOS OLEN TIETOKANNASSA, TOIMIN!",
            "answers":[
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "0",
                    "pos": "1"
                },
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "0",
                    "pos": "2"
                },
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "1",
                    "pos": "3"
                },
                {
                    "ans": "JOS OLEN TIETOKANNASSA, TOIMIN!",
                    "cor": "0",
                    "pos": "4"
                }
            ],
            "maxPoints": "10",
            "ansTime": "330",
            "waitTime": "51",
            "img_file": "testi.png"
        }
    ]
}