// screens/RecipeScreen.jsx
// Tela de receita — passo a passo + coleta de feedback.
//
// Decisões de produto:
// 1. Passos numerados, um por vez? Não — exibir todos de uma vez
//    é mais natural para cozinhar (você olha e volta). Menos fricção.
// 2. Ingredientes faltantes em destaque: evita frustração no meio do preparo.
// 3. Feedback imediato após ação: "Consegui fazer" / "Não gostei"
//    são intencionalmente simples — usuário não vai escrever um parágrafo.
// 4. Pergunta de follow-up "Essa receita ajudou?": métrica de valor real,
//    separada do sucesso técnico. Alguém pode conseguir fazer mas não gostar.

import { useState } from 'react'

export default function RecipeScreen({ recipe, userIngredients, onFeedback, onBack }) {
  // Controla qual etapa do feedback está ativa
  // null → nenhuma | 'action' → fez/não gostou | 'helped' → ajudou?
  const [feedbackStep, setFeedbackStep] = useState(null)
  const [actionType, setActionType] = useState(null)   // 'success' | 'dislike'
  const [done, setDone] = useState(false)

  function handleAction(type) {
    setActionType(type)
    setFeedbackStep('helped')
  }

  function handleHelped(helped) {
    // Registra o feedback completo: ação + se ajudou
    onFeedback(recipe.id, recipe.nome, actionType, helped)
    setDone(true)
  }

  return (
    <div style={{
      minHeight: '100svh',
      background: 'var(--cream)',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Hero da receita — identidade visual imediata */}
      <div style={{
        background: 'var(--ink)',
        padding: '52px 20px 28px',
        position: 'relative',
      }}>
        {/* Botão voltar */}
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: 16,
            left: 20,
            background: 'rgba(255,255,255,0.12)',
            border: 'none',
            color: '#fff',
            borderRadius: 'var(--r-full)',
            padding: '8px 14px',
            fontSize: 13,
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}
        >
          ← Voltar
        </button>

        {/* Emoji grande — "capa" da receita */}
        <div style={{ fontSize: 56, marginBottom: 16 }}>{recipe.emoji}</div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          fontWeight: 800,
          color: '#fff',
          lineHeight: 1.1,
          marginBottom: 16,
        }}>
          {recipe.nome}
        </h1>

        {/* Badges de meta-info */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { label: `⏱ ${recipe.tempo}`, bg: 'rgba(255,255,255,0.12)', color: '#fff' },
            { label: `★ ${recipe.nivel}`, bg: 'var(--amber)', color: '#fff' },
          ].map(badge => (
            <span key={badge.label} style={{
              background: badge.bg,
              color: badge.color,
              padding: '5px 12px',
              borderRadius: 'var(--r-full)',
              fontSize: 13,
              fontWeight: 600,
            }}>
              {badge.label}
            </span>
          ))}
        </div>
      </div>

      {/* Conteúdo scrollável */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 20px',
        paddingBottom: 120,
      }}>

        {/* Ingredientes — com marcação de quem tem / quem falta */}
        <Section title="Ingredientes">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recipe.ingredientes.map(ing => {
              const has = userIngredients.some(u => {
                const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                return norm(ing).includes(norm(u)) || norm(u).includes(norm(ing))
              })
              return (
                <IngredientRow key={ing} name={ing} has={has} optional={false} />
              )
            })}
            {recipe.missing?.length > 0 && (
              <>
                <p style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  color: 'var(--ink-soft)',
                  marginTop: 8,
                  marginBottom: 4,
                }}>
                  Você vai precisar comprar
                </p>
                {recipe.missing.map(ing => (
                  <IngredientRow key={ing} name={ing} has={false} optional={false} missing />
                ))}
              </>
            )}
            {recipe.opcionais?.length > 0 && (
              <>
                <p style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  color: 'var(--ink-soft)',
                  marginTop: 8,
                  marginBottom: 4,
                }}>
                  Opcionais (melhoram a receita)
                </p>
                {recipe.opcionais.map(ing => (
                  <IngredientRow key={ing} name={ing} has={false} optional />
                ))}
              </>
            )}
          </div>
        </Section>

        {/* Modo de preparo */}
        <Section title="Modo de preparo">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recipe.passos.map((passo, i) => (
              <div
                key={i}
                className="animate-fadeUp"
                style={{
                  display: 'flex',
                  gap: 14,
                  animationDelay: `${i * 0.06}s`,
                }}
              >
                {/* Número do passo */}
                <div style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'var(--amber)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: 13,
                  fontWeight: 800,
                  marginTop: 2,
                }}>
                  {i + 1}
                </div>

                <p style={{
                  fontSize: 15,
                  color: 'var(--ink)',
                  lineHeight: 1.65,
                  flex: 1,
                }}>
                  {passo}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Área de feedback — ancorada no rodapé */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        background: 'var(--cream)',
        borderTop: '1px solid var(--border)',
        padding: '16px 20px',
        paddingBottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
        zIndex: 10,
      }}>
        {/* Estado: ainda não interagiu */}
        {!feedbackStep && !done && (
          <div style={{ animation: 'slideUp 0.3s ease' }}>
            <p style={{
              textAlign: 'center',
              fontSize: 13,
              color: 'var(--ink-soft)',
              marginBottom: 12,
            }}>
              Como foi?
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <FeedbackButton
                onClick={() => handleAction('success')}
                label="✓ Consegui fazer"
                variant="success"
              />
              <FeedbackButton
                onClick={() => handleAction('dislike')}
                label="✕ Não gostei"
                variant="neutral"
              />
            </div>
          </div>
        )}

        {/* Estado: pergunta follow-up "ajudou?" */}
        {feedbackStep === 'helped' && (
          <div style={{ animation: 'slideUp 0.3s ease' }}>
            <p style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 500,
              color: 'var(--ink)',
              marginBottom: 12,
            }}>
              Essa receita ajudou você?
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <FeedbackButton
                onClick={() => handleHelped(true)}
                label="👍 Sim, ajudou"
                variant="success"
              />
              <FeedbackButton
                onClick={() => handleHelped(false)}
                label="👎 Não muito"
                variant="neutral"
              />
            </div>
          </div>
        )}

        {/* Estado: feedback enviado */}
        {done && (
          <div style={{
            textAlign: 'center',
            padding: '8px 0',
            animation: 'scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            <p style={{ fontSize: 24, marginBottom: 6 }}>
              {actionType === 'success' ? '🎉' : '🙏'}
            </p>
            <p style={{ fontWeight: 500, fontSize: 15, marginBottom: 4 }}>
              {actionType === 'success' ? 'Que ótimo, bom apetite!' : 'Obrigado pelo feedback!'}
            </p>
            <button
              onClick={onBack}
              style={{
                marginTop: 8,
                background: 'none',
                border: 'none',
                color: 'var(--amber)',
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Ver outras receitas →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Componentes internos ── */

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 16,
        fontWeight: 700,
        color: 'var(--ink)',
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
        marginBottom: 14,
      }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function IngredientRow({ name, has, optional, missing }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 14px',
      borderRadius: 'var(--r-md)',
      background: has ? 'var(--sage-lt)' : missing ? 'var(--red-soft)' : '#fff',
      border: `1px solid ${has ? '#c3dfc9' : missing ? '#f0c5c5' : 'var(--border)'}`,
    }}>
      <span style={{ fontSize: 16 }}>
        {has ? '✓' : missing ? '○' : optional ? '◇' : '○'}
      </span>
      <span style={{
        fontSize: 14,
        color: has ? 'var(--sage)' : missing ? 'var(--red)' : 'var(--ink-soft)',
        fontWeight: has ? 500 : 400,
        flex: 1,
      }}>
        {name}
      </span>
      {optional && (
        <span style={{
          fontSize: 11,
          color: 'var(--ink-soft)',
          background: 'var(--cream-dark)',
          padding: '2px 8px',
          borderRadius: 'var(--r-full)',
        }}>
          opcional
        </span>
      )}
    </div>
  )
}

function FeedbackButton({ onClick, label, variant }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        height: 50,
        borderRadius: 'var(--r-md)',
        border: `1.5px solid ${variant === 'success' ? 'var(--sage)' : 'var(--border-md)'}`,
        background: variant === 'success' ? 'var(--sage-lt)' : '#fff',
        color: variant === 'success' ? 'var(--sage)' : 'var(--ink)',
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'transform 0.1s',
      }}
      onPointerDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
      onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      {label}
    </button>
  )
}
