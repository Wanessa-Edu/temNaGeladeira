// components/RecipeCard.jsx
// Card compacto para a tela de resultados.
//
// Decisão visual: barra de match colorida no topo (verde → vermelho)
// comunica viabilidade sem números — mais intuitivo do que "3/4 ingredientes".
// O usuário entende instantaneamente qual receita é mais fácil de fazer agora.

export default function RecipeCard({ recipe, index, onSelect }) {
  const matchPct = Math.round(recipe.score * 100)

  // Cor da barra de match baseada no score
  const matchColor =
    matchPct >= 80 ? 'var(--sage)' :
    matchPct >= 50 ? 'var(--amber)' :
    '#c0392b'

  const matchLabel =
    matchPct >= 80 ? 'Ótimo match' :
    matchPct >= 50 ? 'Bom match' :
    'Match parcial'

  return (
    <button
      onClick={onSelect}
      className="animate-fadeUp"
      style={{
        width: '100%',
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        textAlign: 'left',
        padding: 0,
        animationDelay: `${index * 0.1}s`,
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onPointerDown={e => {
        e.currentTarget.style.transform = 'scale(0.985)'
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
      }}
      onPointerUp={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      onPointerLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Barra de match no topo */}
      <div style={{
        height: 4,
        background: 'var(--cream-dark)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: `${matchPct}%`,
          background: matchColor,
          borderRadius: '0 4px 4px 0',
          transition: 'width 0.5s ease',
        }} />
      </div>

      <div style={{ padding: '16px 18px' }}>
        {/* Header: emoji + nome */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          marginBottom: 12,
        }}>
          <span style={{
            fontSize: 36,
            lineHeight: 1,
            flexShrink: 0,
          }}>
            {recipe.emoji}
          </span>
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1.2,
              marginBottom: 6,
            }}>
              {recipe.nome}
            </h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Badge text={`⏱ ${recipe.tempo}`} />
              <Badge text={`★ ${recipe.nivel}`} />
              <Badge
                text={matchLabel}
                color={matchColor}
                light
              />
            </div>
          </div>
        </div>

        {/* Ingredientes que o usuário tem */}
        {recipe.matched?.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            marginBottom: recipe.missing?.length > 0 ? 10 : 0,
          }}>
            {recipe.matched.map(ing => (
              <span key={ing} style={{
                fontSize: 12,
                background: 'var(--sage-lt)',
                color: 'var(--sage)',
                padding: '3px 10px',
                borderRadius: 'var(--r-full)',
                fontWeight: 500,
              }}>
                ✓ {ing}
              </span>
            ))}
          </div>
        )}

        {/* Ingredientes faltando */}
        {recipe.missing?.length > 0 && (
          <p style={{
            fontSize: 12,
            color: 'var(--ink-soft)',
            marginTop: 4,
          }}>
            Falta: {recipe.missing.join(', ')}
          </p>
        )}

        {/* CTA sutil */}
        <div style={{
          marginTop: 14,
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--amber)',
          }}>
            Ver receita →
          </span>
        </div>
      </div>
    </button>
  )
}

function Badge({ text, color, light }) {
  return (
    <span style={{
      fontSize: 12,
      fontWeight: 500,
      color: color || 'var(--ink-soft)',
      background: light && color ? `${color}18` : 'var(--cream-dark)',
      padding: '3px 10px',
      borderRadius: 'var(--r-full)',
    }}>
      {text}
    </span>
  )
}
