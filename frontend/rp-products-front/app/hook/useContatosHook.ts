"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Contato } from "../interfaces/contatos-interface";
import { ContatoService } from "../api/contatoApiService";

const service = new ContatoService();

export function useContatos() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    fetchContatos();
    return () => {
      mounted.current = false;
    };
  }, []);

  const fetchContatos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await service.fetchContatos();
      if (mounted.current) setContatos(data);
    } catch (err: any) {
      console.error(err);
      if (mounted.current)
        setError(err.message || "Erro ao carregar contatos");
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  const addContato = useCallback(async (c: Omit<Contato, "id">) => {
    setLoading(true);
    setError(null);

    try {
      const novo = await service.createContato(c);
      if (mounted.current) setContatos((prev) => [...prev, novo]);
      return novo;
    } catch (err: any) {
      console.error(err);
      if (mounted.current)
        setError(err.message || "Erro ao adicionar contato");
      throw err;
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  const updateContato = useCallback(
    async (id: string, c: Omit<Contato, "id">) => {
      setLoading(true);
      setError(null);

      try {
        const atualizado = await service.updateContato(id, c);
        if (mounted.current && atualizado) {
          setContatos((prev) =>
            prev.map((item) => (item.id === id ? atualizado : item))
          );
        }
        return atualizado;
      } catch (err: any) {
        console.error(err);
        if (mounted.current)
          setError(err.message || "Erro ao atualizar contato");
        return null;
      } finally {
        if (mounted.current) setLoading(false);
      }
    },
    []
  );

  const removeContato = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await service.deleteContato(id);
      if (mounted.current)
        setContatos((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      console.error(err);
      if (mounted.current)
        setError(err.message || "Erro ao remover contato");
      throw err;
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  return {
    contatos,
    loading,
    error,
    fetchContatos,
    addContato,
    updateContato,
    removeContato,
  };
}