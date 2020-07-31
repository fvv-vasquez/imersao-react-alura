import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {

    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: '',
    }

    const [categorias, setCategorias] = useState([]);
    const [values, setValues] = useState(valoresIniciais);

    function setValue(chave, valor) {
        setValues({
            ...values,
            [chave]: valor,
        })
    }

    function handleChange(infosDoEvento) {
        const { name, value } = infosDoEvento.target;
        setValue(name, value);
    };

    useEffect(() => {
        if(window.location.href.includes('localhost')) {
            const URL = 'https://faflix.herokuapp.com/categorias'; 
            fetch(URL)
            .then(async (respostaDoServer) =>{
                if(respostaDoServer.ok) {
                    const resposta = await respostaDoServer.json();
                    setCategorias(resposta);
                    return; 
                }
                throw new Error('Não foi possível pegar os dados');
            })
        }    
    }, []);

    return (
        <PageDefault>
            <h1>
                Cadastro de Categoria: 
                {values.nome}
            </h1>

            <form onSubmit={function handleSubmit(infosDoEvento) {
                infosDoEvento.preventDefault();
                setCategorias([
                    ...categorias,
                    values,
                ]);

                setValues(valoresIniciais);
            }}>

                <FormField 
                    label="Nome da Categoria"
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                />

                <FormField 
                    label="Descrição"
                    type="textarea"
                    name="descricao"
                    value={values.descricao}
                    onChange={handleChange}
                />

                <FormField 
                    label="Cor"
                    type="color"
                    name="cor"
                    value={values.cor}
                    onChange={handleChange}
                />

                <Button>
                    Cadastrar
                </Button>
            </form>
            
            <ul>
                {categorias.map((categoria) => {
                    return (
                        <li key={`${categoria.nome}`}>
                            {categoria.nome}
                        </li>
                    )
                })}
            </ul>

            <Link to="/">
                Ir para home
            </Link>
        </PageDefault>
    )
}

export default CadastroCategoria;