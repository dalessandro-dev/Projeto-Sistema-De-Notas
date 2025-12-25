# 📝 Sistema de Notas API - NestJS

Este projeto é uma API robusta para gerenciamento de anotações, desenvolvida com **NestJS**. O foco principal foi a aplicação de padrões de design de software modernos, princípios **SOLID** e **Clean Architecture**, garantindo um código testável e desacoplado da infraestrutura.

## 🏗️ Arquitetura e Design

* **Use Cases:** A lógica de negócio é isolada em classes independentes (ex: `CreateUserUseCase`), facilitando a manutenção.
* **DIP (Dependency Inversion):** Uso de classes abstratas para repositórios.
* **In-Memory Testing:** Suíte de testes unitários utilizando repositórios em memória e **Factories** para garantir performance e isolamento.
* **SOLID:** Cada classe possui responsabilidade única e as dependências são invertidas.

---

## 🛠️ Instalação e Execução

1. **Dependências:** `npm install`
2. **Variáveis de Ambiente:** Crie um `.env` baseado no `.env.example`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="SuaChaveSecreta"
JWT_EXPIRE="30 days"

```


3. **Banco de Dados:** `npx prisma generate`
4. **Iniciar:** `npm run start:dev` (A API rodará em `localhost:3000`)

---

## 📑 Documentação das Rotas

### 🔓 Rotas Públicas

#### **1. Criar Usuário**

* **POST** `/users`
* **Body:**

```json
{
  "name": "João",
  "email": "joao@gmail.com",
  "password": "senha123"
}

```

#### **2. Login (Autenticação)**

* **POST** `/signIn`
* **Body:**

```json
{
  "email": "joao@gmail.com",
  "password": "senha123"
}

```

* **Retorno:** `{ "access_token": "TOKEN_AQUI" }`

---

### 🔐 Rotas de Anotações (Requer Bearer Token)

*Adicione o token no header: `Authorization: Bearer <TOKEN>*`

#### **3. Criar Anotação**

* **POST** `/notes`
* **Body:**

```json
{
  "title": "Estudar NestJS",
  "description": "Revisar SOLID e Casos de Uso" // opcional
}

```

#### **4. Listar Notas (Com Paginação)**

* **GET** `/notes?page=1&perPage=20`
* *Retorna apenas as notas do usuário autenticado.*

#### **5. Buscar Nota por ID**

* **GET** `/notes/:id`
* *Retorna erro se a nota não existir ou não pertencer ao usuário.*

#### **6. Atualizar Nota**

* **PUT** `/notes/:id`
* **Body:**

```json
{
  "title": "Novo Título",
  "description": "Nova descrição" // Se não enviado, vira null
}

```

#### **7. Deletar Nota**

* **DELETE** `/notes/:id`

---

## 🧪 Testes Automatizados

O projeto utiliza **Repositórios em Memória** e **Factories** para testar a lógica de negócio sem depender de banco de dados.

**Para rodar os testes:**

```bash
npm run test

```

**Cenários validados:**

* Criptografia de senha no cadastro (`bcrypt`).
* Bloqueio de emails duplicados.
* Privacidade: Usuário não pode ver ou editar notas de terceiros.
* Paginação correta (offset/limit).
* Lançamento de exceções customizadas (ex: `NoteNotFoundException`).

---

## 📊 Estrutura de Resposta (Exemplo)

**Entidade User:**

```json
{
  "id": "55ad2dd3-dff8-425b-b34f-6c3031258061",
  "email": "user@gmail.com",
  "name": "Usuário",
  "password": "$2b$10$...", 
  "createdAt": "2025-12-25T20:09:55.802Z"
}

```

**Entidade Note:**

```json
{
  "id": "2f55af1d-d656-469d-9c48-4a33912f3f06",
  "title": "Nota",
  "description": "Descrição",
  "createdAt": "2025-12-25T19:17:35.558Z"
}

```