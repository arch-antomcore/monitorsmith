# Guia de Design Humano & Eliminação de Padrões de IA (Anti-AI-Tells)

Este guia estabelece os princípios visuais e de redação técnica para criar sites e aplicações que transmitam **autenticidade, autoridade e acabamento profissional humano**, eliminando padrões visíveis e cansativos típicos de produtos gerados por inteligência artificial genérica.

---

## 1. O que são "AI-Tells" (Vícios de IA) e por que eliminá-los?

Modelos de linguagem e geradores automáticos de código tendem a convergir para os mesmos clichês visuais e textuais. Quando usuários e revisores (incluindo a equipe de qualidade do Google) identificam esses padrões repetitivos, a percepção de qualidade cai drasticamente, gerando impressões de produto superficial ou "conteúdo de baixo valor".

---

## 2. Padrões Textuais Proibidos vs. Como Redigir de Forma Humana

| Vício Comum de IA | Por que soa falso | Como reescrever (Tom Humano e Direto) |
|---|---|---|
| *"Desenvolvido para revolucionar sua produtividade diária"* | Promessa grandiosa e genérica sem substância técnica. | *"Organize ciclos de foco e pausas no estilo Pomodoro."* |
| *"Ideal para profissionais, estudantes, gamers e criadores de conteúdo..."* | Lista inflada de personas para inflar texto de SEO. | Remova a lista de personas. Descreva o que a ferramenta faz. |
| *"100% gratuito, sem necessidade de cadastro, seguro e ilimitado"* | Jargão repetitivo empilhado no topo de todos os blocos. | Coloque essa informação de forma sóbria no rodapé ou no FAQ. |
| *"Nossa suíte de ponta utiliza tecnologia de última geração para..."* | Adjetivação vazia sem explicar o método. | *"Padrões de contraste renderizados diretamente no navegador via Canvas."* |
| *"Como usar esta ferramenta: Passo 1: Abra... Passo 2: Veja... Passo 3: Feche."* | Estrutura mecânica idêntica em 10 páginas seguidas. | Destaque atalhos de teclado, dicas de ambiente e casos práticos de ajuste. |
| *"Aviso: Este site não se responsabiliza por qualquer dano que possa ocorrer..."* | Disclaimer robótico e exagerado que gera desconfiança. | *"Consulte as instruções do fabricante antes de aplicar produtos no painel."* |

---

## 3. Padrões Visuais Proibidos (Vícios de UI/UX de IA)

### ❌ 1. Ícones de "Brilho" e Emojis em Excesso
- **O erro:** Colocar ícones de faísca (`✨`, `SparklesIcon`) em botões, títulos, cards e categorias para tentar parecer "mágico" ou moderno.
- **A regra:** Use ícones geométricos funcionais (`Lucide`, `Heroicons` ou SVG próprio) apenas onde houver real valor de sinalização (fechar, voltar, copiar, tela cheia).

### ❌ 2. Badges com Bolinhas Piscando Sem Sentido
- **O erro:** Adicionar pílulas com bolinhas verdes pulsantes do tipo *"Atualizado em tempo real"* ou *"Novo"* em itens estáticos.
- **A regra:** Use indicadores de status apenas para estados de rede ou processos em tempo real verdadeiros.

### ❌ 3. Gradientes de Arco-Íris em Títulos
- **O erro:** Aplicar gradientes de texto roxo-ciano ou amarelo-rosa em palavras aleatórias do H1.
- **A regra:** Tipografia sóbria, cores sólidas com excelente contraste (WCAG AAA), hierarquia clara com pesos de fonte bem definidos.

### ❌ 4. Rodapés com Declaração de Stack Técnica Desnecessária
- **O erro:** Textos no rodapé como *"Construído com React 19, TailwindCSS, Vite e amor por IA"*.
- **A regra:** O rodapé é espaço institucional: nome da empresa, copyright, links de privacidade, termos e contato.

### ❌ 5. Cards Aninhados em Excesso (Bento Box Inflada)
- **O erro:** Criar caixas dentro de caixas com bordas brilhantes e cantos super arredondados sem hierarquia de informação.
- **A regra:** Superfícies planas ou com elevação sutil, espaçamento consistente e foco no conteúdo da ferramenta.

---

## 4. Princípios de Redação Técnica Autêntica

1. **Voz Direta:** Use frases curtas e afirmativas. Comece com verbos no infinitivo ou imperativo funcional (*"Inspecione pixels"*, *"Ajuste a temperatura de cor"*, *"Abra em tela cheia"*).
2. **Honestidade Técnica:** Deixe claros os limites reais da ferramenta (ex: *"A ferramenta fornece referências visuais no navegador; ela não mede tensão elétrica do painel nem substitui um colorímetro de hardware"*). Isso gera autoridade imediata.
3. **Vocabulário Preciso:** Use termos da engenharia ou da área de atuação (*IPS glow, backlight bleed, gamma 2.2, sRGB, subpixel rendering, Web Audio API, localStorage*).
4. **Sem Timestamps Falsos:** Se o conteúdo foi revisado em agosto de 2026, coloque a data estática real (`Atualizado em 10 de agosto de 2026`). Nunca use scripts que geram "Hoje" ou "Agora mesmo" falsos.

---

## 5. Checklist de Revisão de Humanidade

- [ ] Nenhum card ou botão possui emojis flutuantes decorativos (`🚀`, `✨`, `💡`, `🔥`).
- [ ] O FAQ responde a dúvidas reais e traz orientações de uso, não apenas perguntas óbvias para encher espaço.
- [ ] O título da página (H1) diz exatamente o que o site faz em menos de 10 palavras.
- [ ] As limitações do produto são declaradas de forma transparente e educada.
- [ ] A navegação por teclado e acessibilidade (`aria-label`, contraste) funcionam de forma impecável.
