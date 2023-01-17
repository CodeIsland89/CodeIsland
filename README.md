# Fullstack Example with Next.js (REST API)

This example shows how to implement a **fullstack app in TypeScript with [Next.js](https://nextjs.org/)** using [React](https://reactjs.org/) (frontend), [Express](https://expressjs.com/) and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client) (backend). The example comes from the following [prisma example code]https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-express

## Getting Started

### 1. Install dependencies

#### Install npm dependencies:

Install dependencies for your [`backend`](./backend). Open a terminal window and install the `backend`'s dependencies

```bash
cd backend
npm install
```

Open a separate terminal window and navigate to your [`frontend`](./frontend) directory and install its dependencies

```bash
cd frontend
npm install
```

### 2. Create and seed the database (backend)

On the terminal window used to install the backend npm dependencies, run the following command to create your SQL Tables. This creates the `User` , `Post` , `Catergory` and `CatergoriesOnPosts` tables that are defined in [`prisma/schema.prisma`](./backend/prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./backend/prisma/seed.ts) will be executed and your database will be populated with the sample data.

### 3. Start the server (backend)

On the same terminal used in step 2, run the following command to start the server:

```bash
npm run dev
```

The server is now running at [`http://localhost:3001/`](http://localhost:3001/).

### 4. Start the app (frontend)

On the terminal window used to install frontend npm dependencies, run the following command to start the app:

```bash
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

<details><summary>Expand for a tour through the UI of the app</summary>

<br />

**Blog** (located in [`./pages/index.tsx`](./pages/index.tsx))

![](https://imgur.com/eepbOUO.png)

**Signup** (located in [`./pages/signup.tsx`](./pages/signup.tsx))

![](https://imgur.com/iE6OaBI.png)

**Create post (draft)** (located in [`./pages/create.tsx`](./pages/create.tsx))

![](https://imgur.com/olCWRNv.png)

**Drafts** (located in [`./pages/drafts.tsx`](./pages/drafts.tsx))

![](https://imgur.com/PSMzhcd.png)

**View post** (located in [`./pages/p/[id].tsx`](./pages/p/[id].tsx)) (delete or publish here)

![](https://imgur.com/zS1B11O.png)

</details>

## Using the REST API

You can also access the REST API of the API server directly. It is running [`localhost:3001`](http://localhost:3001) and you can see the API documentation in [`localhost:3001/api-doc`](http://localhost:3001/api-doc)


