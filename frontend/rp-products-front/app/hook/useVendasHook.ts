"use client";

import { useEffect, useState, useCallback } from "react";
import { Venda } from "../interfaces/vendas-interface";
import { VendaService } from "../api/vendasApiService";

const service = new VendaService();

export function useVendas() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar todas as vendas
  const fetchVendas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await service.fetchAll();
      setVendas(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Adicionar nova venda
  const addVenda = async (v: Omit<Venda, "id">) => {
    const nova = await service.create(v);
    setVendas(prev => [...prev, nova]);
    return nova;
  };

  // Atualizar venda existente
  const updateVenda = async (id: string, v: Partial<Venda>) => {
    const atualizada = await service.update(id, v);
    if (atualizada) {
      setVendas(prev =>
        prev.map(item => (item.id === id ? atualizada : item))
      );
    }
  };

  // Remover venda
  const removeVenda = async (id: string) => {
    await service.delete(id); // não retorna nada
    setVendas(prev => prev.filter(item => item.id !== id));
  };

  return {
    vendas,
    loading,
    error,
    fetchVendas,
    addVenda,
    updateVenda,
    removeVenda,
  };
}