import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';

function CadastroCategoria() {

    const valoresIniciais = {
        titulo: '',
        descricao: '',
        cor: '',
    };

    const [categorias, setCategorias] = useState([]);
    const history = useHistory();
    const { handleChange, values, clearForm } = useForm(valoresIniciais);

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
    
    function handleSubmit(event) {
        event.preventDefault();
        const categoriaUpperCase = categorias.map((categoria) => {
            let categoriaUpper = categoria.titulo.toUpperCase();
            categoriaUpper = categoriaUpper.replace(/\s/g, '');
            return categoriaUpper;
        });
    
        let valueUpper = values.titulo.toUpperCase();
        valueUpper = valueUpper.replace(/\s/g, '');
    
        if (categoriaUpperCase.includes(valueUpper)) {
            alert('Categoria já existente');
            clearForm();
        } else {
            setCategorias([
                ...categorias,
                values,
            ]);
            categoriasRepository.create({
                titulo: values.titulo,
                cor: values.cor,
            });
            clearForm();
            history.push('/cadastro/video');
        }
    }

    return (
        <PageDefault>
            <h1>
                Cadastro de Categoria: 
                {values.titulo}
            </h1>

            <form onSubmit={handleSubmit}>

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

                <Button as={Link} to="/">
                    Ir para Home
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
        </PageDefault>
    )
}

export default CadastroCategoria;