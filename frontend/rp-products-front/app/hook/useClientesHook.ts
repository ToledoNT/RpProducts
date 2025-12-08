"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {ClienteService } from "../api/clientesApi";
import { Cliente } from "../interfaces/clientes-interface";

const service = new ClienteService();

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    fetchClientes();
    return () => {
      mounted.current = false;
    };
  }, []);

  const fetchClientes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await service.fetchClientes();
      if (mounted.current) setClientes(data);
    } catch (err: any) {
      console.error(err);
      if (mounted.current)
        setError(err.message || "Erro ao carregar clientes");
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  const addCliente = useCallback(async (c: Omit<Cliente, "id">) => {
    setLoading(true);
    setError(null);

    try {
      const novo = await service.createCliente(c);
      if (mounted.current) setClientes(prev => [...prev, novo]);
      return novo;
    } catch (err: any) {
      console.error(err);
      if (mounted.current)
        setError(err.message || "Erro ao adicionar cliente");
      throw err;
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  const updateCliente = useCallback(
    async (id: string, c: Omit<Cliente, "id">) => {
      setLoading(true);
      setError(null);

      try {
        const atualizado = await service.updateCliente(id, c);
        if (mounted.current && atualizado) {
          setClientes(prev =>
            prev.map(item => (item.id === id ? atualizado : item))
          );
        }
        return atualizado;
      } catch (err: any) {
        console.error(err);
        if (mounted.current)
          setError(err.message || "Erro ao atualizar cliente");
        return null;
      } finally {
        if (mounted.current) setLoading(false);
      }
    },
    []
  );

  const removeCliente = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await service.deleteCliente(id);
      if (mounted.current)
        setClientes(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      console.error(err);
      if (mounted.current)
        setError(err.message || "Erro ao remover cliente");
      throw err;
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  return {
    clientes,
    loading,
    error,
    fetchClientes,
    addCliente,
    updateCliente,
    removeCliente,
  };
}
