// screens/InputScreen.jsx
// Tela principal — onde o usuário descreve o que tem em casa.
//
// Decisões de produto:
// 1. Chips clicáveis: reduzem atrito para usuários que não querem digitar.
//    Pesquisas de UX mostram que a maioria das pessoas prefere tocar em opções
//    do que escrever. Chips também definem o vocabulário esperado pelo sistema.
// 2. Input de texto: para quem tem ingredientes menos comuns.
// 3. Tags visuais: mostram o que foi adicionado — feedback imediato.
// 4. Botão bloqueado: só habilita quando há ao menos 1 ingrediente.
//    Evita chamadas desnecessárias e orienta o usuário.

import { useState, useRef } from 'react'
import { QUICK_CHIPS } from '../data/recipes.js'

export default function InputScreen({ onGenerate }) {
  // Ingredientes selecionados pelo usuário
  const [ingredients, setIngredients] = useState([])
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  function addIngredient(value) {
    const trimmed = value.trim().toLowerCase()
    if (!trimmed || ingredients.includes(trimmed)) return
    setIngredients(prev => [...prev, trimmed])
    setInputValue('')
    inputRef.current?.focus()
  }

  function removeIngredient(ing) {
    setIngredients(prev => prev.filter(i => i !== ing))
  }

  function toggleChip(chip) {
    if (ingredients.includes(chip)) {
      removeIngredient(chip)
    } else {
      addIngredient(chip)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addIngredient(inputValue)
    }
    // Backspace sem texto → remove último ingrediente
    if (e.key === 'Backspace' && !inputValue && ingredients.length) {
      removeIngredient(ingredients[ingredients.length - 1])
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100svh',
      padding: '0 20px',
      background: 'var(--cream)',
    }}>

      {/* Header */}
      <div className="animate-fadeUp" style={{ paddingTop: 56, paddingBottom: 32 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
          color: 'var(--ink-soft)',
          marginBottom: 20,
        }}>
          <span>🧊</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13 }}>
            TemNaGeladeira
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          fontWeight: 800,
          color: 'var(--ink)',
          lineHeight: 1.15,
        }}>
          O que você tem<br />em casa?
        </h2>
      </div>

      {/* Campo de input com tags dentro */}
      <div
        className="animate-fadeUp delay-1"
        onClick={() => inputRef.current?.focus()}
        style={{
          background: '#fff',
          border: '1.5px solid var(--border-md)',
          borderRadius: 'var(--r-lg)',
          padding: '14px 16px',
          cursor: 'text',
          minHeight: 100,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          alignContent: 'flex-start',
          transition: 'border-color 0.2s',
        }}
      >
        {/* Tags dos ingredientes adicionados */}
        {ingredients.map(ing => (
          <span
            key={ing}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--amber)',
              color: '#fff',
              padding: '5px 12px',
              borderRadius: 'var(--r-full)',
              fontSize: 14,
              fontWeight: 500,
              animation: 'scaleIn 0.2s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {ing}
            <button
              onClick={e => { e.stopPropagation(); removeIngredient(ing) }}
              style={{
                background: 'rgba(255,255,255,0.3)',
                border: 'none',
                color: '#fff',
                width: 18,
                height: 18,
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </span>
        ))}

        {/* Input invisível que segue as tags */}
        <input
          ref={inputRef}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={ingredients.length === 0 ? 'ex: ovo, arroz, tomate...' : ''}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            color: 'var(--ink)',
            flex: 1,
            minWidth: 120,
            padding: '4px 0',
          }}
        />
      </div>

      {/* Instrução contextual */}
      <p className="animate-fadeUp delay-1" style={{
        marginTop: 10,
        fontSize: 12,
        color: 'var(--ink-soft)',
        opacity: 0.7,
      }}>
        Pressione Enter ou vírgula para adicionar · Toque nos chips abaixo
      </p>

      {/* Chips de sugestão rápida */}
      <div className="animate-fadeUp delay-2" style={{ marginTop: 24 }}>
        <p style={{
          fontSize: 12,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          color: 'var(--ink-soft)',
          marginBottom: 12,
        }}>
          Sugestões rápidas
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          {QUICK_CHIPS.map(chip => {
            const selected = ingredients.includes(chip)
            return (
              <button
                key={chip}
                onClick={() => toggleChip(chip)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--r-full)',
                  border: `1.5px solid ${selected ? 'var(--amber)' : 'var(--border-md)'}`,
                  background: selected ? 'var(--amber-lt)' : '#fff',
                  color: selected ? 'var(--amber-dark)' : 'var(--ink)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: selected ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                {selected && <span style={{ fontSize: 11 }}>✓</span>}
                {chip}
              </button>
            )
          })}
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Botão principal — grande, no rodapé */}
      <div style={{
        paddingBottom: 'max(32px, env(safe-area-inset-bottom, 32px))',
        paddingTop: 16,
      }}>
        {ingredients.length > 0 && (
          <p style={{
            textAlign: 'center',
            marginBottom: 12,
            fontSize: 13,
            color: 'var(--ink-soft)',
            animation: 'fadeIn 0.3s ease',
          }}>
            {ingredients.length} ingrediente{ingredients.length > 1 ? 's' : ''} selecionado{ingredients.length > 1 ? 's' : ''}
          </p>
        )}

        <button
          onClick={() => ingredients.length > 0 && onGenerate(ingredients)}
          disabled={ingredients.length === 0}
          style={{
            width: '100%',
            height: 60,
            borderRadius: 'var(--r-lg)',
            background: ingredients.length > 0 ? 'var(--amber)' : 'var(--cream-dark)',
            color: ingredients.length > 0 ? '#fff' : 'var(--ink-soft)',
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            fontWeight: 700,
            border: 'none',
            cursor: ingredients.length > 0 ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
          onPointerDown={e => {
            if (ingredients.length > 0)
              e.currentTarget.style.transform = 'scale(0.97)'
          }}
          onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {ingredients.length > 0 ? (
            <>Ver receitas <span style={{ fontSize: 20 }}>✦</span></>
          ) : (
            'Adicione pelo menos 1 ingrediente'
          )}
        </button>
      </div>
    </div>
  )
}
