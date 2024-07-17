This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sources

[How to set up NextJS 14 with Apollo Client?](https://medium.com/@sehrawy/how-to-set-up-nextjs-14-with-apollo-client-754a177e0a00) - Used for setting up Apollo Client with Next.js 14 (only part of their code was used, the rest of the article was for reference).

[Vercel's v0](https://v0.dev) - Used for helping scaffold a design for the site. Not used for functional code generation.

[Realtime Colors](https://www.realtimecolors.com/) - Used for generating a pleasant looking theme and integrating into TailwindCSS.

[Trello](https://trello.com) - Used for tracking tasks and progress.

## Highlight Something Interesting or Significant

**Highlight:**
One particularly interesting aspect of "MovieFindr" is the implementation of the search functionality with genre filtering and pagination. By leveraging Apollo Client's caching for state management, I created a smooth user experience where users can easily search for movies, filter results by genre, and navigate through pages without any noticeable delay. This required careful coordination of multiple asynchronous API calls and efficient state updates, ensuring that the app remains responsive and user-friendly.

Additionally, I implemented logic to keep the search and filter parameters synchronized with the URL query parameters. This ensures that the application state is reflected in the URL, allowing users to bookmark and share specific searches and filter settings. It also enhances the user experience by maintaining consistency between the UI state and the URL, making navigation more intuitive and seamless.

## What You Are Most Pleased or Proud Of

**Proud Of:**
I am most pleased with the implementation of the user interface and its responsiveness. Utilizing Tailwind CSS, I ensured that the design is not only visually appealing but also adapts seamlessly across different devices. The clean layout, intuitive navigation, and consistent design language contribute to a cohesive user experience, making the app both functional and delightful to use.

On the technical side, I implemented GraphQL with Apollo Client for efficient data fetching and state management. This allowed for precise querying, reducing the amount of data transferred and improving the app's performance. Using Apollo Client's caching mechanisms, I minimized unnecessary network requests, leading to faster load times and a more responsive user experience.

The integration of React's component-based architecture with Apollo Client's hooks enabled seamless data binding and streamlined the process of handling asynchronous data. This approach also facilitated easier state management across the application, making the codebase more maintainable and scalable.

## Next Feature or Improvement with More Time

**Next Feature:**
Given more time, I would have expanded the search functionality to be more comprehensive. Currently, users can search by title and filter by genre, but my goal was to incorporate additional movie fields into the search. This would allow users to search for directors, actors, ratings, and more, providing a richer and more flexible search experience.

Additionally, I would have liked to develop the website as a Progressive Web App (PWA). This approach would have significantly enhanced the mobile experience, making it more seamless and accessible for users on the go.

Furthermore, I integrated a theme manager to allow users to switch between different site themes. This feature enables users to customize the look and feel of the website according to their preferences, enhancing their overall experience. By providing options such as light and dark modes, or even custom color schemes, the theme manager makes "MovieFindr" more versatile and user-friendly. However, given more time, I would refine and streamline this implementation to ensure a smoother and more intuitive user experience. This would involve cleaning up the code, improving performance, and adding more customization options.
