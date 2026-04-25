// screens/Onboarding.jsx
// Tela de entrada — primeira impressão do app.
//
// Decisão de produto: frase direta ("O que tem na sua geladeira?") ao invés
// de features ou benefícios. O usuário chega com fome e cansaço —
// ele não quer ler. Queremos a menor fricção possível até o input.
//
// O botão "Começar" está grande, no rodapé, fácil de alcançar com o polegar.

import { useEffect, useState } from 'react'

export default function Onboarding({ onStart }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Pequeno delay para a animação de entrada ser percebida
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '100svh',
      padding: '0 24px',
      background: 'var(--cream)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Elemento decorativo de fundo — dá profundidade sem peso visual */}
      <div style={{
        position: 'absolute',
        top: -80,
        right: -80,
        width: 320,
        height: 320,
        borderRadius: '50%',
        background: 'var(--amber)',
        opacity: 0.08,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 120,
        left: -60,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'var(--amber)',
        opacity: 0.05,
        pointerEvents: 'none',
      }} />

      {/* Logo / wordmark */}
      <div style={{
        paddingTop: '60px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(12px)',
        transition: 'all 0.5s ease',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--ink)',
          color: 'var(--cream)',
          padding: '8px 14px',
          borderRadius: 'var(--r-sm)',
          fontFamily: 'var(--font-display)',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.5px',
        }}>
          <span style={{ fontSize: 16 }}>🧊</span>
          TemNaGeladeira
        </div>
      </div>

      {/* Hero copy */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 40,
      }}>
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(24px)',
          transition: 'all 0.6s ease 0.15s',
        }}>
          {/* Eyebrow */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--amber)',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: 16,
          }}>
            Sem frescura
          </p>

          {/* Headline — fonte display pesada, máximo impacto */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 10vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.05,
            color: 'var(--ink)',
            marginBottom: 24,
          }}>
            O que tem na sua geladeira hoje?
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            fontWeight: 300,
            color: 'var(--ink-soft)',
            lineHeight: 1.6,
            maxWidth: 300,
          }}>
            Diga o que você tem em casa e receba ideias de refeições em segundos.
          </p>
        </div>

        {/* Prova social mínima — reduz hesitação */}
        <div style={{
          marginTop: 40,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'all 0.6s ease 0.3s',
        }}>
          <div style={{ display: 'flex' }}>
            {['🧑‍🍳', '👩‍💻', '🧑‍🎓'].map((emoji, i) => (
              <div key={i} style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'var(--cream-dark)',
                border: '2px solid var(--cream)',
                marginLeft: i > 0 ? -8 : 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
              }}>
                {emoji}
              </div>
            ))}
          </div>
          <p style={{
            fontSize: 13,
            color: 'var(--ink-soft)',
            fontWeight: 400,
          }}>
            Culinária sem complicação
          </p>
        </div>
      </div>

      {/* CTA — ancorado no rodapé, alcançável com o polegar */}
      <div style={{
        paddingBottom: 'max(40px, env(safe-area-inset-bottom, 40px))',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: 'all 0.6s ease 0.45s',
      }}>
        <button
          onClick={onStart}
          style={{
            width: '100%',
            height: 60,
            borderRadius: 'var(--r-lg)',
            background: 'var(--amber)',
            color: '#fff',
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            transition: 'transform 0.15s, opacity 0.15s',
          }}
          onPointerDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Começar agora
          <span style={{ fontSize: 20 }}>→</span>
        </button>

        <p style={{
          textAlign: 'center',
          marginTop: 16,
          fontSize: 13,
          color: 'var(--ink-soft)',
          opacity: 0.6,
        }}>
          Sem cadastro. Sem enrolação.
        </p>
      </div>
    </div>
  )
}
