## This project was built using React and Typescript, and features 15 different sorting algorithms grouped by their time complexities.

[Project Link](https://sorting-react-visualizer.netlify.app/)


![Project Image](https://github.com/BunAppleTeeth/Sorting-visualizer/blob/main/public/gif.gif)


---
##### Dependencies include:

- TypeScript
- React-Router
- Redux
- React-Sidebar
- React-Router-Dom

---

## Timeline of project

- First problems encountered was whether or not to use the local useContext state management or using Redux as a global store to manage loading, render, sort bar states etc.
- Initially the former was chosen, but it redux proved to be better as there were more pieces of state that needed to be handled and the fast changing/re-rerending of states while sorting.
- However, during development Redux proved to be unsuitable/impossible (?) for managing the sort bar states due to the fast 4ms re-rerending whilst sorting, so the sort bar states were managed within its local component, with loading and render states still being managed with Redux. This proved to be far simpler than using Redux to manage the large numbers of re-renders while sorting.
- Once the logic and re-rerendering processes were correctly implemented for Bubble Sort, subsequent sorting algorithms became much easier to create, as only sorting logic had to be changed with little changes made to state management.
- Bogo Sort was harder to implement, despite its simple algorithm the fast-rerenderings of the random sort caused bugs with certain states and useTimeout functions, which was fixed by cancelling loading immediately after the Bogo Sort function was executed to avoid more re-renders even after sorting has completed.
- Quick Sort also posed a challenge during implementation, as its algorithm required recursion and calling multiple setState calls while sorting was executed showed a few bugs. Another annoying problem was the start pointer value being exactly equal to the length of the array, throwing multiple errors in the recursive calls which made it harder to pinpoint. Fortunately this was easily fixed by creating a seperate function to handle this edge case.
- Merge Sort was by far the hardest to implement, as the sorting itself could not be done in place hence combining it with React was the biggest challenge. I chose the bottom-up iterative approach instead of its recursive approach as the latter would not work well with the setState calls in React.
- Radix sort's algorithm was not hard to implement, but building its component taught me the importance of using shallow / deep copies of arrays as many bugs encountered in development were caused by using objects with direct references to the original copy. [Explanation Article](https://www.freecodecamp.org/news/copying-stuff-in-javascript-how-to-differentiate-between-deep-and-shallow-copies-b6d8c1ef09cd/)
- This project took about a month from creation to deployment, overall very satisfied with how it turned out!
