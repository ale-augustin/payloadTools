// Importing required modules from the VS Code API and Node.js
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// Function that gets called when the extension is activated
function activate(context) {
    // Register a command named 'payloadtools.payloadprettify.changeToXML' that can be triggered from the command palette or other methods
    let disposable = vscode.commands.registerCommand('payloadtools.payloadprettify.changeToXML', function () {
        
        // Get the currently active text editor
        let editor = vscode.window.activeTextEditor;

        // If there's no active text editor, show an error message
        if (!editor) {
            vscode.window.showErrorMessage('No document open!');
            return;
        }

        // Get the path of the currently open file
        let currentFilePath = editor.document.fileName;
        // Extract the directory path of the current file
        let fileDir = path.dirname(currentFilePath);
        // Get the filename without its extension
        let fileNameWithoutExtension = path.basename(currentFilePath, path.extname(currentFilePath));
        // Construct the new filepath with an '.xml' extension
        let newFilePath = path.join(fileDir, fileNameWithoutExtension + '.xml');

        // Check if a file with the newly constructed name already exists
        // If it does, append a random number to the name and check again
        while (fs.existsSync(newFilePath)) {
            fileNameWithoutExtension += "-" + Math.floor(Math.random() * 1000); // append random number between 0-999
            newFilePath = path.join(fileDir, fileNameWithoutExtension + '.xml');
        }

        // Rename the current file to the new name with an .xml extension
        fs.renameSync(currentFilePath, newFilePath);

        // Open the renamed file in VS Code
        vscode.workspace.openTextDocument(newFilePath).then((document) => {
            vscode.window.showTextDocument(document).then((newEditor) => {
                
                // Extract content from the document
                let content = document.getText();
                // Linearize the content by removing unnecessary spaces
                let linearizedContent = content.replace(/\s+/g, ' ').trim();

                // Replace the content of the new editor with the linearized content
                newEditor.edit(editBuilder => {
                    let docRange = new vscode.Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end);
                    editBuilder.replace(docRange, linearizedContent);
                }).then(() => {
                    // Format the content as XML using the XML Tools extension's command
                    vscode.commands.executeCommand('xmlTools.formatAsXml');

                    // Switch to the previous editor (the one with the old extension)
                    vscode.commands.executeCommand('workbench.action.previousEditor').then(() => {
                        // Close the currently active editor
                        vscode.commands.executeCommand('workbench.action.closeActiveEditor');
                    });
                });
            });
        });
    });

    // Add the command to the context so it can be disposed when the extension is deactivated
    context.subscriptions.push(disposable);
}

// Export the activate function so it can be called by VS Code
exports.activate = activate;
