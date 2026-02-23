const { categoriaModel } = require('../model/categoriaModel');
const categoriaController = {

    buscarTodasAsCategorias: async (req, res) => {
        try {
            const resultado = await categoriaModel.selecionarTodasAsCategorias();
            if (resultado.length === 0) {
                return res.status(200).json({ message: 'A tabela selecionada não contém dados' });

            }
            res.status(200).json({ message: 'Resultado dos dados listados', data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    buscarCategoriaPorId: async (req, res) => {
    try {
        const id = req.params.idCategoria;

        const resultado = await categoriaModel.selecionarPorId(idCategoria);

        if (!resultado || (Array.isArray(resultado) && resultado.length === 0)) {
            return res.status(404).json({ message: 'Categoria não encontrado' });
        }

        res.status(200).json({ message: 'Resultado dos dados listados', data: resultado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
    }
},


    incluirCategoria: async (req, res) => {
        try {
            const { descricaoCategoria, idCategoria } = req.body;

            if (!nome || descricaoCategoria.length > 50 || !id || String(cpf).length !== 11) {
                return res.status(400).json({ message: 'Dados inválidos. Verifique o nome e o ID.' });
            }

            const resultado = await categoriaModel.inserirCategoria(descricaoCategoria, idCategoria);


            if (resultado.affectedRows === 1 && resultado.insertId != 0) {
                return res.status(201).json({
                    message: 'Registro incluído com sucesso.', result: resultado
                });

            } else {

                return res.status(400).json({ message: 'Falha ao incluir o registro.' });
            }

        } catch (error) {
            console.error('Erro ao incluir cliente:', error);
            return res.status(409).json({
                message: 'Voce está tentando inserir um id que já está na tabela.',
                errorMessage: error.message
            });
        }
    },
    
   atualizarCategoria: async (req, res) => {
    try {
        const id = Number(req.params.id);
        let { descricaoCategoria, idCategoria } = req.body;

        if (!idCategoria || !descricaoCategoria ) {
            return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
        }

       
        const clienteAtual = await clienteModel.selecionarPorId(idCategoria);
        if (categoriaAtual.length === 0) {
            return res.status(404).json({ message: 'Categoria não encontrado' });
        }

        const novaDescricao = descricaoCategoria.trim() || categoriaAtualAtual[0].descricaoCategoria;
        

        const resultado = await categoriaModel.alterarCliente(id, novaCategoria);

        if (resultado.affectedRows === 0) {
            throw new Error('Ocorreu um erro ao atualizar a categoria');
        }

        res.status(200).json({ message: 'Categoria atualizado com sucesso', data: resultado });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ocorreu um erro no servidor.',
            errorMessage: error.message
        });
    }
},

 excluirCategoria: async (req, res) => {
        try {
            const idCategoria = Number(req.params.idCategoria);
            if (!idCategoria || !Number.isInteger(idCategoria)) {
                return res.status(400).json({ message: 'Forneça um ID válido' });
            }

            const categoriaSelecionada = await categoriaModelModel.selecionarPorId(idCategoria);
            console.log(clienteSelecionado)
            if (clienteSelecionado.length === 0) {
                throw new Error('Registro não localizado');

            } else {
                const resultado = await categoriaModel.deleteCategoria(idCategoria);
                if (resultado.affectedRows === 1) {
                    res.status(200).json({ message: 'Cliente excluído com sucesso', data: resultado });

                } else {
                    throw new Error('Não foi possivel excluir o cliente');
                }
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }


}

module.exports = { categoriaController}