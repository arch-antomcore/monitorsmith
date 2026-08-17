# Suíte de Templates e Padrões Universais para Web Apps

Este diretório reúne o repositório consolidado de boas práticas, padrões de aprovação, conformidade técnica e arquitetura web para servir como base universal para o **MonitorSmith** e novos projetos.

---

## 📚 Documentos Disponíveis

| Documento | Objetivo | Principais Tópicos |
|---|---|---|
| 📄 [`PLAYBOOK_ADSENSE_APROVACAO_UNIVERSAL.md`](./PLAYBOOK_ADSENSE_APROVACAO_UNIVERSAL.md) | Guia definitivo para aprovação e conformidade no Google AdSense | Checklist de 5 gates, os 6 vídeos oficiais de aprovação, `ads.txt`, CMP, densidade de anúncios e tratamento de recusas. |
| 🚀 [`PLAYBOOK_SEO_GEO_LLMS_UNIVERSAL.md`](./PLAYBOOK_SEO_GEO_LLMS_UNIVERSAL.md) | Otimização para buscadores tradicionais e agentes de IA (GEO) | Especificação `llms.txt` v2 oficial, `llms-full.txt`, dados estruturados Schema.org, descoberta via `<link rel="describedby">` e SSG híbrido. |
| 🎨 [`GUIA_DESIGN_HUMANO_ANTI_IA.md`](./GUIA_DESIGN_HUMANO_ANTI_IA.md) | Princípios de design, UX e copywriting autêntico | Como eliminar vícios visuais e textuais de IA (sparkles, emojis excessivos, personas infladas, textos mecânicos) e elevar a autoridade. |
| ⚖️ [`TEMPLATE_POLITICA_PRIVACIDADE_LGPD_ADSENSE.md`](./TEMPLATE_POLITICA_PRIVACIDADE_LGPD_ADSENSE.md) | Modelos prontos de Política de Privacidade e Termos de Uso | Modelo 100% aderente ao item [G7] do Google AdSense, à LGPD do Brasil e à privacidade client-side/PWA. |

---

## 🛠️ Como aplicar em um novo projeto

1. **Defina o Catálogo Único:** Crie um `constants/tools.js` ou equivalente como única fonte da verdade de rotas e metadados.
2. **Copie e Personalize as Políticas:** Use o [`TEMPLATE_POLITICA_PRIVACIDADE_LGPD_ADSENSE.md`](./TEMPLATE_POLITICA_PRIVACIDADE_LGPD_ADSENSE.md) trocando as variáveis `{{APP_NAME}}` e `{{COMPANY_NAME}}`.
3. **Configure Descoberta de IA e SEO:** Adicione o `llms.txt` (v2) e o Schema.org seguindo o [`PLAYBOOK_SEO_GEO_LLMS_UNIVERSAL.md`](./PLAYBOOK_SEO_GEO_LLMS_UNIVERSAL.md).
4. **Revise a Redação e UI:** Aplique o [`GUIA_DESIGN_HUMANO_ANTI_IA.md`](./GUIA_DESIGN_HUMANO_ANTI_IA.md) para garantir que a interface soe profissional, técnica e humana.
5. **Audite antes de submeter ao AdSense:** Percorra o checklist do [`PLAYBOOK_ADSENSE_APROVACAO_UNIVERSAL.md`](./PLAYBOOK_ADSENSE_APROVACAO_UNIVERSAL.md).
