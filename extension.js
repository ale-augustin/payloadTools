const vscode = require('vscode');  // Import the required Visual Studio Code module
const fs = require('fs');          // Import the file system module
const path = require('path');      // Import the path module

function activate(context) {
    // Register a new command with the command ID 'payloadtools.payloadprettify.changeToXML'
    let disposable = vscode.commands.registerCommand('payloadtools.payloadprettify.changeToXML', function () {
        // Get the active text editor
        let editor = vscode.window.activeTextEditor;

        // If no document is open, show an error message and return
        if (!editor) {
            vscode.window.showErrorMessage('No document open!');
            return;
        }

        // Get the current file path, directory, and file name without extension
        let currentFilePath = editor.document.fileName;
        let fileDir = path.dirname(currentFilePath);
        let fileNameWithoutExtension = path.basename(currentFilePath, path.extname(currentFilePath));

        // Construct the new file path with the .xml extension
        let newFilePath = path.join(fileDir, fileNameWithoutExtension + '.xml');

        // Check if a file with the new name already exists
        if (fs.existsSync(newFilePath)) {
            vscode.window.showErrorMessage('A file with the same name and .xml extension already exists.');
            return;
        }

        // Rename the current file to the new name with the .xml extension
        fs.renameSync(currentFilePath, newFilePath);

        // Open the renamed document
        vscode.workspace.openTextDocument(newFilePath).then((document) => {
            vscode.window.showTextDocument(document).then((editor) => {
                // Linearize the content by removing consecutive whitespaces
                let content = document.getText();
                let linearizedContent = content.replace(/\s+/g, ' ').trim();

                // Replace the entire content of the document with the linearized content
                editor.edit(editBuilder => {
                    let docRange = new vscode.Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end);
                    editBuilder.replace(docRange, linearizedContent);
                }).then(() => {
                    // After linearizing, format the content using the XML Tools extension
                    vscode.commands.executeCommand('xmlTools.formatAsXml');
                });
            });
        });
    });

    // Add the command to the extension's context so it gets disposed of correctly
    context.subscriptions.push(disposable);
}

// Export the activate function so it can be used by VS Code
exports.activate = activate;