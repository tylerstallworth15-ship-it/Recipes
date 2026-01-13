Reflection

1. The most challenging part of the project

The hardest part of this project for me was keeping all the moving pieces organized while working with multiple pages, API calls, and global state. I had to constantly think about how data flowed from one part of the app to another, especially when switching between categories, search results, and recipe details. Debugging API responses also took time because some endpoints returned slightly different shapes of data. Another challenge was making sure the UI didn’t break when the API returned null or empty results. I also had to learn how to handle loading and error states in a clean way so the app didn’t feel broken. Overall, the project pushed me to think more like a real developer instead of just writing isolated components.

2. Why I chose this Design decision
One design decision I spent time thinking about was how to structure my custom hooks, especially useFetch. I wanted it to be reusable across the entire app, so I made sure it handled loading, errors, and cleanup in one place instead of repeating that logic in every page. I also chose to manage favorites using a context combined with my useLocalStorage hook because it kept the state global and persistent without extra libraries. This made it easy for any component to check if a recipe was a favorite without passing props around. It also kept the code cleaner and made the Favorites page much simpler to build. In the end, this approach helped the whole app feel more organized and consistent.
