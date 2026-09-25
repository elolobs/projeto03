"use client";

import { useState, useEffect } from "react";
import dados from "@/filmes.json";
import CardFilme from "@/components/CardFilme";

export default function Filme() {
    const [listaFilmes, setListaFilmes] = useState([]);
    useEffect(() => {
        setListaFilmes(dados);
    }, [])
    return (
        <main>
            {listaFilmes.length > 0 &&
                <div className="container-filmes">
                    {listaFilmes.map(f => {
                        return <CardFilme key={f.id} filme={f} />
                    })}
                </div>
            }
        </main>
    )
}