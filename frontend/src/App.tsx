import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeProvider';
import { router } from '@/routes';

/**
 * Componente raíz de la aplicación.
 */
function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
