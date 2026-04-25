// hooks/useFeedback.js
// Armazena feedback dos usuários no localStorage.
//
// Decisão Lean Startup: coletar dados desde o dia 1.
// Mesmo sem backend, conseguimos saber:
//   - quais receitas as pessoas tentam fazer
//   - quais geraram sucesso ou frustração
//   - padrões de ingredientes mais usados
//
// Na fase 2, enviamos esses dados para um backend simples (Supabase/Firebase)
// e começamos a tomar decisões baseadas em dados reais.

import { useState, useCallback } from 'react'

const STORAGE_KEY = 'tng_feedback_v1'

function loadFeedback() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveFeedback(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // localStorage pode estar cheio ou bloqueado — falha silenciosa
    console.warn('Não foi possível salvar feedback')
  }
}

export function useFeedback() {
  const [entries, setEntries] = useState(loadFeedback)

  const addFeedback = useCallback((recipeId, recipeName, type, ingredients) => {
    const entry = {
      id: Date.now(),
      recipeId,
      recipeName,
      type,           // 'success' | 'dislike' | 'helped' | 'not_helped'
      ingredients,    // ingredientes que o usuário tinha — dado valioso
      timestamp: new Date().toISOString(),
    }

    setEntries(prev => {
      const next = [...prev, entry]
      saveFeedback(next)
      return next
    })

    return entry
  }, [])

  // Retorna um resumo para eventual debug/análise
  const getSummary = useCallback(() => {
    const successes = entries.filter(e => e.type === 'success').length
    const dislikes  = entries.filter(e => e.type === 'dislike').length
    const helped    = entries.filter(e => e.type === 'helped').length
    return { total: entries.length, successes, dislikes, helped, entries }
  }, [entries])

  return { addFeedback, getSummary, entries }
}
