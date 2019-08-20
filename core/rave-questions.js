const raveInlineQuestions = {
    question: [{
        type: 'input',
        name: 'publicKey',
        message: 'Enter your public key'
    }],
    confirmation: [{
        type: 'confirm',
        name: 'isConfirmed',
        message: 'Is this your public key?'
    }]
};

module.exports.raveInlineQuestions = raveInlineQuestions;