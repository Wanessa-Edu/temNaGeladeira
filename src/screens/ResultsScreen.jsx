// screens/ResultsScreen.jsx
// Tela de resultados — 3 cards de receitas.
//
// Decisões de produto:
// 1. Máximo 3 receitas: mais opções = mais paralisia de decisão.
//    O objetivo é resolver, não mostrar volume.
// 2. Score visual de match: usuário entende imediatamente o que é mais viável.
// 3. Ingredientes faltantes visíveis: sem surpresa na hora de cozinhar.
// 4. Botão "Voltar" não-destrutivo: usuário pode ajustar sem perder contexto.

import RecipeCard from '../components/RecipeCard.jsx'

export default function ResultsScreen({ recipes, ingredients, onSelect, onBack }) {
  return (
    <div style={{
      minHeight: '100svh',
      background: 'var(--cream)',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Header com contexto */}
      <div style={{
        padding: '48px 20px 24px',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Botão voltar */}
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--ink-soft)',
            padding: 0,
            marginBottom: 20,
          }}
        >
          ← Editar ingredientes
        </button>

        <h2 className="animate-fadeUp" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 26,
          fontWeight: 800,
          color: 'var(--ink)',
          marginBottom: 6,
        }}>
          {recipes.length > 0
            ? `${recipes.length} ideia${recipes.length > 1 ? 's' : ''} para você`
            : 'Nada encontrado'}
        </h2>

        {/* Resumo dos ingredientes usados */}
        <p className="animate-fadeUp delay-1" style={{
          fontSize: 13,
          color: 'var(--ink-soft)',
        }}>
          Com: {ingredients.slice(0, 4).join(', ')}{ingredients.length > 4 ? ` +${ingredients.length - 4}` : ''}
        </p>
      </div>

      {/* Lista de cards */}
      <div style={{
        flex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        paddingBottom: 40,
      }}>
        {recipes.length > 0 ? (
          recipes.map((recipe, i) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              index={i}
              onSelect={() => onSelect(recipe)}
            />
          ))
        ) : (
          /* Estado vazio — orienta sem frustrar */
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 40,
            animation: 'fadeIn 0.4s ease',
          }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🤔</div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 10,
            }}>
              Hmm, poucos ingredientes em comum
            </h3>
            <p style={{
              fontSize: 15,
              color: 'var(--ink-soft)',
              lineHeight: 1.6,
              marginBottom: 24,
            }}>
              Tente adicionar ingredientes básicos como ovo, arroz, alho ou manteiga.
            </p>
            <button
              onClick={onBack}
              style={{
                padding: '12px 28px',
                borderRadius: 'var(--r-full)',
                background: 'var(--amber)',
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontSize: 16,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Ajustar ingredientes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
