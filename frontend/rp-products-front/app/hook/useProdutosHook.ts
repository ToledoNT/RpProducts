"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Produto } from "../interfaces/produtos-interface";
import { ProdutoService } from "../api/produtosApiService";

const service = new ProdutoService();

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    fetchProdutos();
    return () => {
      mounted.current = false;
    };
  }, []);

  const fetchProdutos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await service.fetchProdutos();
      if (mounted.current) setProdutos(data);
    } catch (err: any) {
      console.error(err);
      if (mounted.current)
        setError(err.message || "Erro ao carregar produtos");
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  const addProduto = useCallback(async (p: Omit<Produto, "id">) => {
    setLoading(true);
    setError(null);

    try {
      const novo = await service.createProduto(p);
      if (mounted.current) setProdutos(prev => [...prev, novo]);
      return novo;
    } catch (err: any) {
      console.error(err);
      if (mounted.current)
        setError(err.message || "Erro ao adicionar produto");
      throw err;
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  const updateProduto = useCallback(
    async (id: string, p: Omit<Produto, "id">) => {
      setLoading(true);
      setError(null);

      try {
        const atualizado = await service.updateProduto(id, p);
        if (mounted.current && atualizado) {
          setProdutos(prev =>
            prev.map(item => (item.id === id ? atualizado : item))
          );
        }
        return atualizado;
      } catch (err: any) {
        console.error(err);
        if (mounted.current)
          setError(err.message || "Erro ao atualizar produto");
        return null;
      } finally {
        if (mounted.current) setLoading(false);
      }
    },
    []
  );

  const removeProduto = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await service.deleteProduto(id);
      if (mounted.current)
        setProdutos(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      console.error(err);
      if (mounted.current)
        setError(err.message || "Erro ao remover produto");
      throw err;
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  return {
    produtos,
    loading,
    error,
    fetchProdutos,
    addProduto,
    updateProduto,
    removeProduto,
  };
}