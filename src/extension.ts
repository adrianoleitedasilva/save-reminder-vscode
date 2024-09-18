import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Função que será executada a cada 10 minutos
    const remindToSave = () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            if (document.isDirty) {
                // Exibe uma mensagem com as opções "Sim" e "Não"
                vscode.window.showWarningMessage('Você tem alterações não salvas! Deseja salvar agora?', 'Sim', 'Não')
                    .then(selection => {
                        if (selection === 'Sim') {
                            // Se o usuário escolher "Sim", salva o documento
                            document.save().then(() => {
                                vscode.window.showInformationMessage('Arquivo salvo com sucesso!');
                            });
                        } else {
                            // Se o usuário escolher "Não", não faz nada
                            vscode.window.showInformationMessage('Arquivo não salvo.');
                        }
                    });
            }
        }
    };

    // Configura o intervalo de 10 minutos (600000 milissegundos)
    const interval = setInterval(remindToSave, 600000);

    // Limpa o intervalo quando a extensão é desativada
    context.subscriptions.push({ dispose: () => clearInterval(interval) });
}

export function deactivate() {
    // Aqui você pode adicionar código para limpar recursos quando a extensão for desativada
}
