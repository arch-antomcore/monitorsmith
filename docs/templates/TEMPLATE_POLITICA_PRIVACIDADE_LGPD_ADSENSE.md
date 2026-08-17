# Template Universal: Política de Privacidade e Termos de Uso (AdSense [G7] + LGPD)

Este modelo foi estruturado para atender estritamente aos requisitos de conformidade do **Google AdSense** (item [G7]), à **Lei Geral de Proteção de Dados do Brasil (LGPD)** e às boas práticas de produtos digitais client-side (PWA / Web Apps).

---

## Como Usar este Template

Substitua as variáveis entre chaves duplas pelos dados reais do seu projeto:
- `{{APP_NAME}}` → Nome do Produto (ex: *MonitorSmith*)
- `{{COMPANY_NAME}}` → Razão Social ou Nome do Controlador (ex: *EXVORN.TECH*)
- `{{DOMAIN}}` → Domínio público (ex: *monitorsmith.app*)
- `{{CONTACT_URL}}` → URL de contato ou e-mail (ex: *https://exvorn.tech/*)
- `{{UPDATE_DATE}}` → Data da revisão (ex: *10 de agosto de 2026*)

---

## 1. Política de Privacidade (Template Pronto)

```markdown
# Política de Privacidade — {{APP_NAME}}

> Esta política de privacidade descreve como o {{APP_NAME}}, mantido por {{COMPANY_NAME}}, trata dados técnicos, preferências no dispositivo e integrações de terceiros.

---

### 1. Resumo e Processamento Local no Cliente
O {{APP_NAME}} prioriza a privacidade do usuário: as ferramentas visuais e utilitários executam diretamente no navegador (client-side). Conteúdos, textos, mensagens, cores, arquivos ou imagens carregados dentro da aplicação permanecem no seu dispositivo e **não** são transmitidos para servidores próprios da {{COMPANY_NAME}} para armazenamento, mineração ou perfilamento.

---

### 2. Dados Armazenados no Dispositivo (Armazenamento Local)
O navegador pode utilizar recursos de armazenamento local (`localStorage`, `Cache Storage` e `Service Worker`) exclusivamente para:
- Salvar preferências de tema visual (claro/escuro) e configurações de interface;
- Permitir o carregamento rápido e o funcionamento offline dos recursos do Progressive Web App (PWA);
- Manter sessões temporárias ativas na memória enquanto a aba estiver aberta.

Você pode excluir todos os dados armazenados localmente a qualquer momento através das configurações de privacidade e limpeza de histórico do seu navegador.

---

### 3. Fornecedores de Terceiros e Google AdSense
Para viabilizar a manutenção e gratuidade dos serviços, o {{APP_NAME}} pode exibir anúncios de terceiros. 

- Fornecedores de terceiros, incluindo o **Google**, utilizam cookies para veicular anúncios com base em visitas anteriores dos usuários a este site ou a outros sites na internet.
- O uso de cookies de publicidade pelo Google e por seus parceiros permite veicular anúncios para os usuários com base nas visitas feitas ao {{DOMAIN}} e/ou a outros sites na internet.
- Para obter mais informações sobre como o Google coleta e processa dados ao utilizar sites parceiros, consulte a documentação oficial em [Como o Google usa dados quando você usa sites ou aplicativos dos nossos parceiros](https://policies.google.com/technologies/partner-sites).

---

### 4. Seus Controles e Opções de Desativação de Anúncios (Opt-Out)
Você possui total liberdade para controlar e desativar cookies de anúncios personalizados:
- **Configurações de Anúncios do Google:** Você pode desativar anúncios personalizados acessando [https://www.google.com/settings/ads](https://www.google.com/settings/ads).
- **Desativação de Terceiros (AboutAds):** Você pode desativar o uso de cookies de publicidade personalizada de terceiros acessando [www.aboutads.info/choices/](https://www.aboutads.info/choices/).
- **Configurações do Navegador:** É possível bloquear ou restringir cookies de terceiros diretamente nas opções de privacidade do seu navegador (Chrome, Firefox, Safari, Edge).

---

### 5. Direitos do Titular sob a LGPD e Contato
Como o {{APP_NAME}} não exige cadastro, login ou coleta de dados pessoais identificáveis (como nome, CPF ou e-mail) em servidores próprios para a execução de suas ferramentas, não mantemos perfis individualizados de usuários.

Para esclarecimentos adicionais sobre privacidade ou solicitações institucionais sob a Lei Geral de Proteção de Dados (Lei 13.709/2018), utilize o canal institucional em:
👉 [{{CONTACT_URL}}]({{CONTACT_URL}})

---

### 6. Atualizações desta Política
Esta política foi revisada em {{UPDATE_DATE}} e reflete as funcionalidades vigentes. Quaisquer alterações materiais serão publicadas nesta mesma URL.
```

---

## 2. Termos de Uso (Template Pronto)

```markdown
# Termos de Uso — {{APP_NAME}}

### 1. Aceitação e Uso do Serviço
O {{APP_NAME}} é fornecido de forma voluntária e gratuita pela {{COMPANY_NAME}}. Ao utilizar a plataforma, o usuário concorda em utilizar as ferramentas em conformidade com as leis vigentes, com as orientações técnicas dos fabricantes de hardware e sem violar direitos de terceiros.

### 2. Natureza Observacional e Limitações Técnicas
- As ferramentas e padrões visuais fornecidos pelo {{APP_NAME}} destinam-se ao apoio da observação humana e organização de rotinas.
- O serviço não realiza diagnósticos eletrônicos diretos, não mede circuitos internos de hardware e não substitui instrumentos dedicados de calibração (como colorímetros ou espectrofotômetros) nem laudos periciais formais.
- Fatores externos como gerenciamento de cores do sistema operacional, renderização gráfica do navegador, iluminação ambiente, tipo de painel e ângulo de visão influenciam diretamente os resultados visuais observados.

### 3. Responsabilidade do Usuário
O usuário é o único responsável pelo conteúdo, imagens, logos ou mensagens que carregar localmente na aplicação para exibição, declarando possuir os devidos direitos e autorizações para tal finalidade.

### 4. Propriedade Intelectual
A marca {{APP_NAME}}, a identidade visual, o layout e o código-fonte da aplicação pertencem à {{COMPANY_NAME}}, sendo protegidos pelas leis de propriedade intelectual e direitos autorais.

### 5. Contato e Revisão
Vigência a partir de {{UPDATE_DATE}}. Contato institucional em: [{{CONTACT_URL}}]({{CONTACT_URL}}).
```
