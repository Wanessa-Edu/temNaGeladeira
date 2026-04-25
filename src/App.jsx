// App.jsx
// Máquina de estados da navegação do app.
//
// Decidimos NÃO usar React Router para o MVP — navegação por estado local
// é mais simples, mais fácil de depurar, e não requer configuração extra.
// Quando o app crescer (fase 2), migramos para router com histórico real.
//
// Estados: 'onboarding' → 'input' → 'results' → 'recipe'
// Cada transição carrega os dados necessários.

import { useState } from 'react'
import Onboarding   from './screens/Onboarding.jsx'
import InputScreen  from './screens/InputScreen.jsx'
import ResultsScreen from './screens/ResultsScreen.jsx'
import RecipeScreen from './screens/RecipeScreen.jsx'
import { findRecipes } from './utils/matchRecipes.js'
import { useFeedback } from './hooks/useFeedback.js'

export default function App() {
  // Tela atual
  const [screen, setScreen] = useState('onboarding')

  // Dados compartilhados entre telas
  const [userIngredients, setUserIngredients] = useState([])
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  // Hook de feedback (Lean Startup: coleta desde o dia 1)
  const { addFeedback } = useFeedback()

  // Transição: onboarding → input
  function handleStart() {
    setScreen('input')
  }

  // Transição: input → results
  // O matching acontece aqui — síncrono, sem loading state necessário
  function handleGenerate(ingredients) {
    const matched = findRecipes(ingredients)
    setUserIngredients(ingredients)
    setRecipes(matched)
    setScreen('results')
  }

  // Transição: results → recipe
  function handleSelectRecipe(recipe) {
    setSelectedRecipe(recipe)
    setScreen('recipe')
  }

  // Transição: results → input (sem perder os ingredientes)
  function handleBackToInput() {
    setScreen('input')
  }

  // Transição: recipe → results
  function handleBackToResults() {
    setScreen('results')
  }

  // Callback de feedback: registra e volta para resultados
  function handleFeedback(recipeId, recipeName, actionType, helped) {
    addFeedback(recipeId, recipeName, actionType, userIngredients)
    // Não navega automaticamente — deixa o usuário ler a confirmação
  }

  return (
    <>
      {screen === 'onboarding' && (
        <Onboarding onStart={handleStart} />
      )}

      {screen === 'input' && (
        <InputScreen
          initialIngredients={userIngredients}
          onGenerate={handleGenerate}
        />
      )}

      {screen === 'results' && (
        <ResultsScreen
          recipes={recipes}
          ingredients={userIngredients}
          onSelect={handleSelectRecipe}
          onBack={handleBackToInput}
        />
      )}

      {screen === 'recipe' && selectedRecipe && (
        <RecipeScreen
          recipe={selectedRecipe}
          userIngredients={userIngredients}
          onFeedback={handleFeedback}
          onBack={handleBackToResults}
        />
      )}
    </>
  )
}
