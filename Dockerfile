# Etapa 1: Instala dependências e compila o projeto
FROM node:18-alpine AS builder

# Define diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY package.json package-lock.json* pnpm-lock.yaml* ./

# Instala as dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Compila o projeto Next.js
RUN npm run build

# Etapa 2: Imagem enxuta apenas para rodar a aplicação
FROM node:18-alpine AS runner

WORKDIR /app

# Copia apenas arquivos necessários da etapa anterior
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Define a variável de ambiente padrão para produção
ENV NODE_ENV=production

# Expõe a porta padrão
EXPOSE 3000

# Comando para iniciar o app
CMD ["npm", "start"]
