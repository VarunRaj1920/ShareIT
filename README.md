# Code Share Platform ShareIT

This project is a **code sharing platform** that allows users to create, save, and retrieve code snippets at any time. Built with [Next.js](https://nextjs.org) and bootstrapped using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), this application provides a fast and intuitive way to manage and share code.

## Table of Contents

- [Purpose](#purpose)
- [Features](#features)
- [Technical Overview](#technical-overview)
- [Getting Started](#getting-started)
  - [Local Development](#local-development)
  - [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Purpose

The purpose of this project is to offer a centralized platform for developers and coding enthusiasts to:
- **Share Code:** Easily save and share code snippets with others.
- **Retrieve Code:** Access saved code snippets at any time.
- **Collaborate:** Update and sync code in real-time using Socket.io (for live code collaboration).
  
This platform is designed to be fast and responsive, leveraging Next.js’s Pages Router for speedy deployment and seamless navigation.

## Features

- **Dynamic Code Editor:** Integrated with CodeMirror for a rich code editing experience.
- **Real-Time Updates:** Socket.io integration for live updates across connected clients.
- **Database Storage:** Uses MongoDB to store code snippets securely.
- **Responsive UI:** Styled with Tailwind CSS for a modern and responsive design.
- **Optimized Deployment:** Utilizes Next.js and Vercel for quick deployments and high performance.

## Technical Overview

- **Framework:** [Next.js](https://nextjs.org)
- **Frontend:** React, Tailwind CSS, CodeMirror
- **Backend:** Node.js, Express (API routes in Next.js)
- **Database:** MongoDB for persistent storage of code snippets
- **Real-Time:** Socket.io for live code collaboration
- **Routing:** Next.js Pages Router for improved deployment speed and SEO-friendly URLs

## Getting Started

### Local Development

Follow these steps to run the project on your local machine:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/VarunRaj1920/ShareIT.git
   cd ShareIT
   ```

2. **Install Dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

3. **Set Up Environment Variables:**

   Create a `.env.local` file in the root directory of the project and add the following environment variables:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   # You can add other environment variables as needed
   ```

4. **Run the Development Server:**

   Using npm:
   ```bash
   npm run dev
   ```

   Or using yarn:
   ```bash
   yarn dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

To create a production build, run:

```bash
npm run build
npm run start
```

Or using yarn:

```bash
yarn build
yarn start
```

## Deployment

This project is deployed on [Vercel](https://vercel.com). You can check out the live version here: [https://your-vercel-deployed-link.vercel.app](https://shareit-q0hhk5j6q-varunraj8182-gmailcoms-projects.vercel.app/).

For detailed instructions on how to deploy a Next.js application on Vercel, please refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to modify this README to suit your project's evolving needs. Enjoy building and sharing code!
