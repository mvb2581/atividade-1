import produtoModel from "../model/produtoModel.js";

const produtoController = {
    upload: async (req,res) => {
        try {
            if(!req.file){
                return res.status(400).json({message:'Arquivo não enviado'});
            }

            res.status(200).json({
                message: 'Upload realizado com sucesso',
                file: {
                    filename: req.file.filename,
                    size: req.file.size,
                    mimeType: req.file.mimeType,
                }
            })

        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message})
        }
    },
        buscarTodosProdutos: async (req, res) => {
        try {
            const resultado = await produtoModel.selecionarTodos();
            if (resultado.length === 0) {
                return res.status(200).json({ message: 'A tabela selecionada não contém dados' });
            }
            res.status(200).json({ message: 'Resultado dos dados listados', data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    buscarProdutoPorId: async (req, res) => {
        try {
            const id = Number(req.params.idProduto);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'Forneça um indentificador(ID) válido' });
            }

            const resultado = await produtoModel.selecionarPorId(id);
            res.status(200).json({ message: 'Resultado dos dados listados', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    incluirProduto: async (req, res) => {
        
    try {
        const { nome, valor } = req.body;

        if (!nome || nome.trim().length < 3 || !valor|| valor <= 0) {
            return res.status(400).json({ message: 'Dados inválidos.' });
        }

        const imagem = req.file ? req.file.filename : null;

        console.log("Imagem recebida:", imagem); 

        const resultado = await produtoModel.inserirProduto(
            nome.trim(),
            valor,
            imagem
        );

        if (resultado.affectedRows === 1 && resultado.insertId != 0) {
            return res.status(201).json({
                message: 'Registro incluído com sucesso',
                produto: {
                    id: resultado.insertId,
                    nome,
                    valor,
                    imagem
                }
            });
        } else {
            throw new Error('Ocorreu um erro ao incluir o registro');
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ocorreu um erro no servidor.',
            errorMessage: error.message
        });
    }
},

    atualizarProduto: async (req, res) => {
        try {
            const idProduto = Number(req.params.idProduto);
            let { nome, valor } = req.body;

            if (!idProduto || !Number.isInteger(idProduto)) {
                return res.status(400).json({ message: 'ID inválido' });
            }

            const produtoAtual = await produtoModel.selecionarPorId(idProduto);
            if (produtoAtual.length === 0) {
                throw new Error('Registro não localizado');
            }

            const novoNome = nome ? nome.trim() : produtoAtual[0].nome;
            const novoValor = valor ?? produtoAtual[0].valor;

            if (novoNome.length < 3 || novoValor <= 0) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            }

            const resultado = await produtoModel.alterarProduto(idProduto, novoNome, novoValor);

            if (resultado.changedRows === 0) {
                throw new Error('Ocorreu um erro ao atualizar o produto');
            }

            res.status(200).json({ message: 'Registro atualizado com sucesso', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    excluirProduto: async (req, res) => {
        try {
            const id = Number(req.params.idProduto);

            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'Forneça um ID válido' });
            }

            const produtoSelecionado = await produtoModel.selecionarPorId(id);

            if (produtoSelecionado.length === 0) {
                throw new Error('Registro não localizado');
            }

            const resultado = await produtoModel.deleteProduto(id);

            if (resultado.affectedRows === 1) {
                res.status(200).json({ message: 'Produto excluído com sucesso', data: resultado });
            } else {
                throw new Error('Não foi possível excluir o produto');
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
}

export default produtoController;