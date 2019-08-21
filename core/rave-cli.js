const fs = require('fs'),
    minify = require('minify'),
    inquirer = require('inquirer'),
    raveInline = require('./raveInline'),
    { raveInlineQuestions } = require('./rave-questions');

// Extract the function block of the wrapper function in raveInline Module
const raveInlineScript = raveInline.wrapperFunction.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];

// Create a new file. Could be unminified or minified depending on arguments passed
const createJsFile = (fileName, fileData, extension) => {
    //create file to current working directory
    fs.writeFile(`${fileName}.${extension}`, fileData, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Created ${fileName}.${extension}. Check your project directory`)
    })
};

//Read HTML file and create a new one
const createHTMLFile = (fileName, newfileName, extension) => {
    fs.readFile(`./core/${fileName}.${extension}`, 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return `could not read file ${fileName}.${extension} from ${process.cwd()}`
        }
        fs.writeFile(`${newfileName}.${extension}`, data, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Created ${newfileName}.${extension}. Check your project directory`)
        })
    })
}

// Inquirer, minifier and file type options logic. Defaults mini to 'false' (String type)
const generateRaveFile = (type, fileName, mini = `${false}`) => {
    type = type.toLowerCase();
    mini = mini.toLowerCase();
    inquirer.prompt(raveInlineQuestions.question)
        .then(keyObject => {
            inquirer.prompt(raveInlineQuestions.confirmation)
                .then(key => {
                    if (!key.isConfirmed) {
                        console.log('Shutting Down... Re-run command to generate rave-inline script')
                    } else {
                        //Find the matching regex and replace it with the returned Public key
                        const ScriptWithPublicKey = raveInlineScript.replace(/<ADD YOUR PUBLIC KEY HERE>/g, keyObject.publicKey);
                        // Create a new minified file
                        if (type === 'inline' && mini === 'mini') {
                            createHTMLFile('raveInline', fileName, 'html')
                            createJsFile(fileName, ScriptWithPublicKey, 'js');

                            minify(`${fileName}.js`)
                                .then(fileContent => {
                                    createJsFile(fileName, fileContent, 'min.js')
                                })
                                .catch(console.error)
                        } else if (type === 'inline') {
                            //create an unminified file
                            createHTMLFile('raveInline', fileName, 'html')
                            createJsFile(fileName, ScriptWithPublicKey, 'js');
                        } else {
                            //user didn't specify correct command line argument. throw an error
                            try {
                                throw new Error('Specified arguments do not match any of the available formats')
                            } catch (e) {
                                console.error(`${e.name}: ${e.message}`);
                                return 'Incorrect arguments';
                            }
                        }
                    }
                })
                .catch(e => {
                    console.error('Error resulting from confirmation', e)
                })
        })
        .catch(e => {
            console.error('Error resulting from Inquiring for questions', e)
        })

}

module.exports.generateRaveFile = generateRaveFile;