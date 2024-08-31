# LogViewer example

## Goals

- This application allows users to browse a large log file loaded from a remote server. They can quickly scroll through all the entries, which begin to display as soon as they are received from the server.
- Each log entry is displayed as a row, with a field for the date stamp formatted in ISO-1806 format (using `Date.toIsoString()`)
- The raw JSON data is displayed in the second column, which is clipped off the right side.
- Users can click on a row to expand it and view the full JSON data display with a basic formatting applied.

## Deployment Details 

- This application has a few `npm` scripts to help with development.
- `npm run dev` will start the hot reloading development server.
- `npm run lint` will run the linter. Settings are pretty basic.
- `npm run test` will run the tests, with a reload watcher. We might want to set up some pre-commit hooks for this.
- `npm run test:coverage` generates code-coverage reports. This might plug into a pre-commit hook and log to tooling. Maybe we want to define a blocking coverage threshold as we proceed. At the moment the default config writes to `./coverage`.
- `npm run build` will build the production version of the application. Files are written to `./dist`. A prod deploy script like "Github Actions" or "Netlify" could be used to deploy the contents of `./dist` to a static server. Perhaps even a CDN and serverless lambda would make sense for performant distributed deploy.

## Implementation Notes

- We use React, simple build-in state management, and the browser's `fetch` API to load the data. The data is loaded in chunks, and each chunk is displayed as it is received. This takes advantage of a characteristic of `fetch` called [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
- In order to provide a standards-based, accessible experience for users, we rely on intrinsic browser elements designed for disclosing addition information (`<details>` and `<summary>`). They handle the expanding and contracting for us.
- We gain confidence in the quality of our React components by using Jest and React Testing Library to write unit tests. At the moment these are just DOM snapshot tests. We might choose to use something more render-oriented in the future and shift unit testing over to more calculation-oriented functions.
- Build and test chores are handled by `Vite`, a performant tool-set that helps us get Types, Linting, Testing, Formatting, and more.
- Styling is handled with pure CSS - we might want to move to a CSS-In-JS solution like EmotionCSS or Styled Components in the future. Or implement something more build-time that would give us calculated classnames and better scoping. We provide a simple theme with CSS variable design tokens.
- We found that nesting ListItem styles in the List component makes for better render performance - this is not uncommon with large DOM trees.
- Charting is provided by the handy D3 wrapper, [Nivo](https://nivo.rocks/).  In this case we postpone data processing and rendering until the entire dataset is downloaded. This might be another area for optimization later on - let's see how users respond.


## Known Issues

- Even with lazy JSON parsing, memoization callback caching, 50k rows is a challenge to the browser. Perf with large dataset like this is a constant struggle. Moving forward a good approach might be list virtualization with something like `react-window` or `react-virtualized`. There are more React internal optimizations we could explore as well, such as `useDeferredValue`.
- We have unit test coverage of the components, but there's room for more coverage on the `useLogData` hook.
- ListItem open/close rendering can be delayed as the List re-renders become larger.
