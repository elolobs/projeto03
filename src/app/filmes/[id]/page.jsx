"use client"
import '@/app/filmes/[id]/saiba.css';

import { useState, useEffect } from "react";
import dados from "@/filmes.json";
import { useParams } from "next/navigation";

export default function Filme() {
    const [filme, setFilme] = useState(null); //esta nulo porque ainda vamos pegar as informações
    const params = useParams(); //paremetro é tudo que esta vindo na url

    useEffect(() => {
        const filmeEncontrado = dados.find(f => f.id == params.id)
        setFilme(filmeEncontrado);
    }, [])

    return (
        <main>
            {filme != null && <>
                <h1 className='title'>Descrição do filme {filme.titulo}</h1>
                <img src={filme.imagem} />
                <p>Genero: {filme.genero}</p>
                <p>Sinopse: {filme.sinopse}</p>
                <p>Duração: {filme.duracaoMinutos}</p>
                <a href={filme.trailer} target="blank">Trailer do Filme..</a>
            </>
            }
        </main>
    )
}