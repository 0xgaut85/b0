import * as THREE from 'three'

// Three.js related types
export interface SceneProps {
  children?: React.ReactNode
}

export interface MeshProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  color?: string
}

// Animation types for Framer Motion
export interface AnimationVariants {
  initial: {
    opacity?: number
    scale?: number
    x?: number
    y?: number
    z?: number
  }
  animate: {
    opacity?: number
    scale?: number
    x?: number
    y?: number
    z?: number
  }
  exit?: {
    opacity?: number
    scale?: number
    x?: number
    y?: number
    z?: number
  }
}

// Component props
export interface ThreeSceneProps {
  className?: string
  style?: React.CSSProperties
}

export interface InteractiveObjectProps extends MeshProps {
  onClick?: () => void
  onHover?: (hovered: boolean) => void
}

// Utility types
export type Vector3 = [number, number, number]
export type Color = string | THREE.Color
