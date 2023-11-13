# Getting Error: "Use process(css).then(cb) to work with async plugins"

- Downgrade tailwindcss to 3.3.2 and install postcss
  ```
  yarn add --dev tailwindcss@3.3.2
  yarn add postcss@8.4.23
  ```
  **Please check "^3.3.2" to "3.3.2"**
  
- Clean up android build
   ```
   cd android
   ./gradlew clean
   ```
