# 🛠️ Development Guide - FlavorRush

## Code Organization Best Practices

### Component Structure
```jsx
// 1. Imports at top
import { useState } from 'react'
import { motion } from 'framer-motion'

// 2. Constants
const ANIMATION_DURATION = 0.3

// 3. Component definition
export const MyComponent = ({ prop1, prop2 }) => {
  // 4. State
  const [state, setState] = useState(null)
  
  // 5. Effects
  useEffect(() => {
    // Logic here
  }, [])
  
  // 6. Handlers
  const handleClick = () => {
    // Handler logic
  }
  
  // 7. Render
  return (
    <motion.div>
      {/* JSX */}
    </motion.div>
  )
}

export default MyComponent
```

## Adding New Pages

1. Create file in `src/pages/`
2. Create component with export
3. Add route in `App.jsx`
4. Add link in navigation if needed

Example:
```jsx
// src/pages/NewPage.jsx
export const NewPage = () => {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  )
}

export default NewPage
```

Then add to `App.jsx`:
```jsx
import NewPage from './pages/NewPage'

// In Routes:
<Route path="/newpage" element={<NewPage />} />
```

## Adding New Components

1. Create folder in `src/components/`
2. Create index.jsx with component
3. Export from component file

Structure:
```
src/components/MyComponent/
├── MyComponent.jsx
└── MyComponent.css (if needed)
```

## Using State Management (Zustand)

### Creating Store
```javascript
import { create } from 'zustand'

export const useMyStore = create((set, get) => ({
  data: [],
  
  addItem: (item) => {
    set(state => ({
      data: [...state.data, item]
    }))
  },
  
  getData: () => get().data
}))
```

### Using Store
```jsx
import { useMyStore } from '../store/myStore'

function MyComponent() {
  const { data, addItem } = useMyStore()
  
  return (
    <div>
      {data.map(item => (...))}
    </div>
  )
}
```

## API Integration

### Making Requests
```javascript
import { api, productsAPI } from '../utils/api'

// Using specific API
const products = await productsAPI.getAll()

// Using generic api instance
const response = await api.get('/endpoint')
```

### Adding New API Endpoint
```javascript
// In utils/api.js
export const newAPI = {
  getItems: () => api.get('/items'),
  getById: (id) => api.get(`/items/${id}`),
  create: (data) => api.post('/items', data),
  update: (id, data) => api.put(`/items/${id}`, data),
  delete: (id) => api.delete(`/items/${id}`),
}
```

## Styling Guidelines

### Tailwind Classes
```jsx
// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Colors
<div className="bg-primary text-white">

// Spacing
<div className="px-4 py-2 mb-4">

// Shadows
<div className="shadow-md hover:shadow-lg">

// Borders
<div className="border-2 border-gray-300 rounded-lg">

// Dark mode
<div className="dark:bg-gray-800 dark:text-white">
```

### Custom Animations
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

## Common Patterns

### Conditional Rendering
```jsx
{condition ? <Component1 /> : <Component2 />}

{isLoading && <Loader />}

{items?.length > 0 && <ItemsList />}
```

### List Rendering
```jsx
{items.map((item, idx) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.1 }}
  >
    {item.name}
  </motion.div>
))}
```

### Form Handling
```jsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
})

const handleChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({
    ...prev,
    [name]: value
  }))
}

const handleSubmit = (e) => {
  e.preventDefault()
  // Submit logic
}
```

## Testing

### Unit Testing
```jsx
// Example test file
import { render, screen } from '@testing-library/react'
import Button from '../components/Common/Button'

test('renders button with text', () => {
  render(<Button>Click Me</Button>)
  expect(screen.getByText('Click Me')).toBeInTheDocument()
})
```

### E2E Testing
Use Cypress or Playwright for end-to-end testing.

## Performance Optimization

### Memoization
```jsx
import { memo } from 'react'

// Memoize component to prevent re-renders
const MyComponent = memo(({ prop }) => {
  return <div>{prop}</div>
})

export default MyComponent
```

### Lazy Loading
```jsx
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

### Code Splitting
Already configured in React Router:
```jsx
const Home = lazy(() => import('./pages/Home'))
const Menu = lazy(() => import('./pages/Menu'))

// Routes automatically code-split
```

## Debugging

### Console Logging
```javascript
console.log('Simple log')
console.error('Error:', error)
console.warn('Warning:', message)
console.table(data)
```

### React DevTools
- Inspect component hierarchy
- View and edit props
- Track component renders
- Profile performance

### Network Debugging
- Open DevTools Network tab
- Monitor API requests/responses
- Check headers and payloads
- Profile network performance

## Backend Integration

### Connecting to Backend

1. **Update API Base URL** in `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

2. **Use API methods** in components:
```jsx
const { data } = await productsAPI.getAll()
```

3. **Handle errors**:
```jsx
try {
  const data = await api.get('/endpoint')
} catch (error) {
  console.error(error)
  toast.error('Failed to load data')
}
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] API base URL set correctly
- [ ] Images optimized
- [ ] No console errors
- [ ] Mobile responsive tested
- [ ] Dark mode working
- [ ] Forms validated
- [ ] All routes working
- [ ] Performance optimized
- [ ] Security checked

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "Add feature: description"

# Push to remote
git push origin feature/feature-name

# Create Pull Request
# Review and merge
```

## Code Style

- Use functional components
- Use hooks for state
- Use descriptive variable names
- Keep components small and focused
- Add comments for complex logic
- Use PropTypes or TypeScript (optional)
- Follow Tailwind naming conventions

## Common Commands

```bash
# Frontend
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Lint code

# Backend
npm run dev           # Start dev server
npm start             # Start production server
npm run seed          # Seed database with data
```

## Resources

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Express.js](https://expressjs.com)
- [MongoDB](https://docs.mongodb.com)
