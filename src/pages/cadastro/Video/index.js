import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {
    const history = useHistory();
    const [categorias, setCategorias] = useState([]);
    const categoryTitles = categorias.map(({ titulo }) => titulo);
    const { handleChange, values, clearForm } = useForm({
        titulo: '',
        url: '',
        categoria: '',
    });

    useEffect(() => {
        categoriasRepository
        .getAll()
        .then((categoriasFromServer) => {
            setCategorias(categoriasFromServer);
        });
    }, []);

    function onSubmitHandler(event) {
        event.preventDefault();
    
        const categoriaEscolhida = categorias.find((categoria) => categoria.titulo === values.categoria);

        if (!categoriaEscolhida) {
            alert('Categoria não cadastrada. Favor cadastra-la ou escolher uma da listagem disponível!');
            clearForm();
            } else {
                videosRepository.create({
                    titulo: values.titulo,
                    url: values.url,
                    categoriaId: categoriaEscolhida.id,
                })
                .then(() => {
                    console.log('Cadastrou com sucesso!');
                    history.push('/');
                });
            }
        }

    return (
        <PageDefault>
        <h1>
            Cadastro de Video
        </h1>

        <form onSubmit={onSubmitHandler}>
            <FormField
                label="Título do Vídeo"
                name="titulo"
                value={values.titulo}
                onChange={handleChange}
            />

            <FormField
                label="URL"
                name="url"
                value={values.url}
                onChange={handleChange}
            />

            <FormField
                label="Categoria"
                name="categoria"
                value={values.categoria}
                onChange={handleChange}
                suggestions={categoryTitles}
            />

            <Button as="button" type="submit">
                Cadastrar Vídeo
            </Button>

            <Button as={Link} to="/cadastro/categoria">
                Cadastrar Categoria
            </Button>
        </form>
        </PageDefault>
    );
}

export default CadastroVideo;