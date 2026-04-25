// utils/matchRecipes.js
// Motor de matching de receitas
//
// Decisão de produto: algoritmo simples de pontuação por ingredientes.
// Não usamos IA aqui porque o objetivo é velocidade e previsibilidade.
// O usuário precisa confiar que as sugestões fazem sentido — receitas
// aleatórias de IA podem frustrar mais do que ajudar no MVP.

import { RECIPE_BANK } from '../data/recipes.js'

/**
 * Normaliza texto para comparação: lowercase, sem acentos.
 * "Ovo", "ÓVO", "ovo" → "ovo"
 */
function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

/**
 * Conta quantos ingredientes do usuário batem com a receita.
 * Usa `includes` para capturar substrings — "frango" bate com "frango cozido".
 */
function scoreRecipe(recipe, userIngredients) {
  const userNorm = userIngredients.map(normalize)

  let matched = 0
  for (const ing of recipe.ingredientes) {
    const ingNorm = normalize(ing)
    if (userNorm.some(u => ingNorm.includes(u) || u.includes(ingNorm))) {
      matched++
    }
  }

  // Score = % de ingredientes obrigatórios que o usuário tem
  // Receitas com mais ingredientes do usuário aparecem primeiro
  return matched / recipe.ingredientes.length
}

/**
 * Retorna as 3 melhores receitas para os ingredientes do usuário.
 * Mínimo: pelo menos 1 ingrediente em comum.
 */
export function findRecipes(userIngredients) {
  if (!userIngredients.length) return []

  const scored = RECIPE_BANK
    .map(recipe => ({
      ...recipe,
      score: scoreRecipe(recipe, userIngredients),
      // Quais ingredientes obrigatórios o usuário tem
      matched: recipe.ingredientes.filter(ing => {
        const ingNorm = normalize(ing)
        return userIngredients.map(normalize).some(
          u => ingNorm.includes(u) || u.includes(ingNorm)
        )
      }),
      // Quais ingredientes obrigatórios faltam
      missing: recipe.ingredientes.filter(ing => {
        const ingNorm = normalize(ing)
        return !userIngredients.map(normalize).some(
          u => ingNorm.includes(u) || u.includes(ingNorm)
        )
      }),
    }))
    .filter(r => r.score > 0) // pelo menos 1 ingrediente
    .sort((a, b) => b.score - a.score) // melhor score primeiro

  // Retorna as 3 melhores (ou menos, se não houver suficientes)
  return scored.slice(0, 3)
}
