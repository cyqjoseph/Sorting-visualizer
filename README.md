### This project was made with the intention to combine Typescript and React and also to familiarise myself with the various sorting algorithms.

-------------------------------------------------------------

##### Dependencies include: 
- TypeScript
- React-Router
- Redux
- React-Sidebar
-------------------------------------------------------------

## Timeline of project

- First problems encountered was whether or not to use the local useContext state management or using Redux as a global store to manage loading, render, sort bar states etc.
- Initially the former was chosen, but it redux proved to be better as there were more pieces of state that needed to be handled and the fast changing/re-rerending of states while sorting.
- However, during development Redux proved to be unsuitable/impossible (?) for managing the sort bar states due to the fast 4ms re-rerending whilst sorting, so the sort bar states were managed within its local component, with loading and render states still being managed with Redux. This proved to be far simpler than using Redux to manage the large numbers of re-renders while sorting.
- Project still in development...
