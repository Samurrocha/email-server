# Email Forwarding Server com Retry Automático via Fila

Servidor Node.js para **encaminhamento de e-mails com tolerância a falhas**. Ele recebe um objeto JSON com os dados de um e-mail (assunto, remetente e mensagem), e encaminha esse conteúdo para um e-mail destino fixo (configurado no ambiente). Se houver qualquer falha durante o envio, o sistema automaticamente adiciona esse e-mail a uma **fila Bull** para tentativas subsequentes, garantindo **entrega confiável e robusta**.

---

## Tecnologias Utilizadas

- **Node.js** – Plataforma principal do servidor.
- **Express.js** – Framework minimalista para rotas e middleware HTTP.
- **Nodemailer** – Envio de e-mails via SMTP.
- **Bull** – Gerenciador de filas robusto e escalável, baseado em Redis.
- **Redis** – Banco de dados em memória, utilizado como backend das filas.

---

## Funcionalidades

-  Recebe e-mails via requisição HTTP (`POST /send-email`).
-  Reencaminha os dados recebidos para um e-mail destino fixo.
-  Em caso de falha, coloca o e-mail na fila com tentativas automáticas.
-  Tentativas configuráveis (número de retries, delay, etc).
-  Estrutura modular para facilitar expansão futura.

---

## Como funciona?

1. Um cliente envia um `POST` para o servidor com um corpo JSON:
    ```json
    {
      "subject": "Assunto do email",
      "from": "remetente@exemplo.com",
      "message": "Conteúdo da mensagem"
    }
    ```

2. O servidor tenta enviar esse e-mail para um **destinatário fixo** (definido em variável de ambiente).

3. Se o envio **falhar** (ex: indisponibilidade SMTP), o e-mail é **enfileirado no Redis via Bull**.

4. A fila tenta reenviar o e-mail até o sucesso, com atrasos e número máximo de tentativas configurados.

---

## Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Redis](https://redis.io/)
- [Yarn](https://classic.yarnpkg.com) ou `npm`

```bash
# Clone o projeto
git clone https://github.com/seu-usuario/email-forwarding-server.git
cd email-forwarding-server

# Instale as dependências
yarn install
# ou
npm install

## Rodar o servidor

- npm run dev
