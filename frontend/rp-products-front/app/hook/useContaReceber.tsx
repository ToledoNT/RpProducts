"use client";

import { useEffect, useState, useCallback } from "react";
import { ContaReceber } from "../interfaces/financeiro-interface";
import { ContaReceberService } from "../api/financeiroApiService";

const service = new ContaReceberService();

export function useContasReceber() {
  const [contas, setContas] = useState<ContaReceber[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await service.fetchAll();
      setContas(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addConta = async (c: Omit<ContaReceber, "id">) => {
    const nova = await service.create(c);
    setContas(prev => [...prev, nova]);
    return nova;
  };

  const updateConta = async (id: string, c: Partial<ContaReceber>) => {
    const atualizada = await service.update(id, c);
    if (atualizada) {
      setContas(prev =>
        prev.map(item => (item.id === id ? atualizada : item))
      );
    }
  };

  return {
    contas,
    loading,
    error,
    fetchContas,
    addConta,
    updateConta,
  };
}