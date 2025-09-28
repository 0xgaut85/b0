# Next.js + Three.js + Framer Motion Project

A modern web application combining the power of Next.js 14, Three.js for 3D graphics, and Framer Motion for smooth animations. This project uses only stable versions of all dependencies for maximum reliability.

## 🚀 Features

- **Next.js 14** - Latest stable version with App Router
- **Three.js** - 3D graphics and WebGL rendering
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers and abstractions for R3F
- **Framer Motion** - Production-ready motion library for React
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting

## 📦 Tech Stack

- **Framework**: Next.js 14.2.5
- **3D Graphics**: Three.js 0.166.1
- **React Integration**: @react-three/fiber 8.16.8, @react-three/drei 9.108.3
- **Animations**: Framer Motion 11.3.19
- **Styling**: Tailwind CSS 3.4.7
- **Language**: TypeScript 5.5.4

## 🛠️ Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   └── ThreeScene.tsx      # Interactive 3D scene component
├── lib/
│   └── types.ts            # TypeScript type definitions
└── styles/
    └── (additional styles)
```

## 🎮 Demo Features

The included demo showcases:

- **Interactive 3D Cube**: Click to scale, hover to highlight
- **Floating Sphere**: Animated with sine wave motion
- **3D Text**: Rendered text in 3D space
- **Orbit Controls**: Mouse/touch controls for camera
- **Smooth Animations**: Page transitions with Framer Motion
- **Responsive Design**: Works on desktop and mobile

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Customization

### Adding New 3D Objects

Create new components in `src/components/` following the pattern in `ThreeScene.tsx`:

```tsx
function MyCustomObject() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state, delta) => {
    // Animation logic here
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}
```

### Adding Animations

Use Framer Motion for page transitions and UI animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Your content here
</motion.div>
```

### Styling

This project uses Tailwind CSS. Customize the theme in `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      'custom-blue': '#1e40af',
    },
    animation: {
      'custom-bounce': 'bounce 1s infinite',
    }
  }
}
```

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms

This is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Troubleshooting

### Common Issues

1. **Three.js import errors**: Make sure you're using the correct import syntax for Three.js modules
2. **Framer Motion SSR issues**: Use `'use client'` directive for components using Framer Motion
3. **TypeScript errors**: Check that all dependencies have their corresponding `@types` packages installed

### Performance Tips

- Use `useMemo` and `useCallback` for expensive computations
- Implement proper cleanup in `useEffect` hooks
- Consider using `React.lazy` for code splitting large 3D scenes
- Optimize 3D models and textures for web delivery

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the [documentation](#-learning-resources)
2. Search existing [GitHub issues](https://github.com/your-username/your-repo/issues)
3. Create a new issue with detailed information

---

**Happy coding!** 🎉
