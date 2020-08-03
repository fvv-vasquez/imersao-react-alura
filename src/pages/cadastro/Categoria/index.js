import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';

function CadastroCategoria() {

    const valoresIniciais = {
        titulo: '',
        descricao: '',
        cor: '',
    };

    const { handleChange, values, clearForm } = useForm(valoresIniciais);

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
            const URL = window.location.hostname.includes('localhost')
            ? 'http://localhost:8080/categorias'
            : 'https://faflix.herokuapp.com/categorias'; 
            fetch(URL)
            .then(async (respostaDoServer) =>{
                if(respostaDoServer.ok) {
                    const resposta = await respostaDoServer.json();
                    setCategorias(resposta);
                    return; 
                }
                throw new Error('Não foi possível pegar os dados');
            })
    }, []);

    return (
        <PageDefault>
            <h1>
                Cadastro de Categoria: 
                {values.titulo}
            </h1>

            <form onSubmit={function handleSubmit(infosDoEvento) {
                infosDoEvento.preventDefault();
                setCategorias([
                    ...categorias,
                    values,
                ]);

                clearForm();
            }}>

                <FormField 
                    label="Título da Categoria"
                    name="titulo"
                    value={values.titulo}
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
                        <li key={`${categoria.titulo}`}>
                            {categoria.titulo}
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