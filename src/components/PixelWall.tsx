'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const GRID_SIZE = 40;                 // Grid dimensions (40x40 = 1600 cubes)
const LOGO_TARGET_WIDTH = 11;
const CUBE_SIZE = 0.25;               // Much bigger cubes/squares
const WALL_DEPTH = 1.8;               
const RADIUS_BASE = 3.0;              // Very large mouse influence to cover entire wall
const BLOOM_STRENGTH = 0.9;

export default function PixelWall() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    // Size helpers
    const getSize = () => ({ w: host.clientWidth || window.innerWidth, h: host.clientHeight || window.innerHeight });

    // Scene
    const scene = new THREE.Scene();
    // Remove fog to allow transparency
    // scene.fog = new THREE.FogExp2(0x090a0d, 0.12);
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 9); // Restore original camera position

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      powerPreference: 'high-performance',
      alpha: true // Enable transparency
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const { w, h } = getSize();
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0); // Set clear color to transparent
    
    // Ensure canvas is positioned correctly but allows text to show through
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.zIndex = '1';   // canvas above background
    renderer.domElement.style.pointerEvents = 'auto'; // Allow mouse interaction
    
    host.appendChild(renderer.domElement);

    // Diagnostics overlay
    const overlay = document.createElement('div');
    overlay.style.cssText =
      'position:absolute;inset:auto auto 12px 12px;padding:6px 8px;background:rgba(0,0,0,.45);color:#fff;font:12px/1.2 system-ui;border-radius:6px;pointer-events:none;display:none;z-index:1';
    host.appendChild(overlay);
    const showError = (msg: string) => { overlay.textContent = msg; overlay.style.display = 'block'; console.error(msg); };

    // WebGL sanity
    try {
      // Force context creation
      (renderer.getContext() as WebGLRenderingContext);
    } catch {
      showError('WebGL not available on this device/browser.');
      return;
    }

    // Lights
    scene.add(new THREE.HemisphereLight(0xffffff, 0x222233, 0.3));

    // Postprocessing (with fallback)
    let composer: EffectComposer | null = null;
    let useComposer = true;
    try {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(new THREE.Vector2(w, h), BLOOM_STRENGTH, 0.7, 0.1);
      composer.addPass(bloom);
    } catch (e) {
      useComposer = false;
      console.warn('Postprocessing disabled, falling back to direct render.', e);
    }

    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Shaders (WebGL1-safe)
    const vertexShader = `
      precision highp float;
      // NOTE: position & normal are injected by THREE.ShaderMaterial – do not redeclare.
      attribute vec3 aOrigin;
      attribute float aSeed;
      uniform float uTime;
      uniform vec2  uMouse;
      uniform float uRadius;
      uniform float uDepth;
      varying float vShade;
      varying float vSpark;
      void main(){
        vec3 pos = position;     // provided by Three
        vec3 N = normalize(normal); // provided by Three
        float wobble = sin(uTime*0.9 + aSeed*6.2831) * 0.25;
        float z0 = (aSeed - 0.5) * uDepth;
         float d = distance(aOrigin.xy, uMouse);
         float influence = smoothstep(uRadius, 0.0, d);
         
         // Gentle bump effect with return-to-position
         vec2 direction = normalize(aOrigin.xy - uMouse);
         float bumpForce = influence * 0.8; // Much gentler force
         
         // Create a smooth oscillation that returns to center
         float returnEffect = sin(uTime * 3.0 + aSeed * 10.0) * 0.1;
         float dampening = 1.0 - influence * 0.3; // Dampen the movement over time
         
         vec3 displaced = aOrigin + vec3(
           direction.x * bumpForce * dampening + returnEffect,
           direction.y * bumpForce * dampening + returnEffect * 0.5,
           z0 + wobble + influence * 0.3 // Slight Z movement
         ) + pos;
        vec3 L = normalize(vec3(-0.4, 0.7, 0.8));
        float lambert = max(dot(N, L), 0.0);
        vShade = lambert * 0.85 + 0.15;
        vSpark = 0.55 + 0.45 * abs(sin(uTime*1.7 + aSeed*12.37));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
      }`;
    const fragmentShader = `
      precision highp float;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying float vShade;
      varying float vSpark;
      void main(){
        vec3 base = mix(uColorA, uColorB, vShade);
        gl_FragColor = vec4(base * vSpark, 1.0);
      }`;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime:   { value: 0 },
        uMouse:  { value: new THREE.Vector2(1000, 1000) },
        uRadius: { value: RADIUS_BASE },
        uDepth:  { value: WALL_DEPTH },
        uColorA: { value: new THREE.Color('#bfc5d7') },
        uColorB: { value: new THREE.Color('#ffffff') },
      },
      vertexShader,
      fragmentShader,
    });

    // Instanced geometry
    const baseCube = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    const instGeo = new THREE.InstancedBufferGeometry();
    instGeo.index = baseCube.index!;
    instGeo.setAttribute('position', baseCube.getAttribute('position'));
    instGeo.setAttribute('normal', baseCube.getAttribute('normal'));

    const localBounds = new THREE.Box3();
    const ctxCanvas = document.createElement('canvas');
    const ctx = ctxCanvas.getContext('2d', { willReadFrequently: true })!;

    const buildCubeGrid = () => {
      const wWorld = LOGO_TARGET_WIDTH;
      const hWorld = LOGO_TARGET_WIDTH * 0.6; // Restore original height
      const offX = -wWorld * 0.5;
      const offY = -hWorld * 0.5 - 1.5; // Move wall down by 1.5 units to create top gap
      
      const spacing = wWorld / GRID_SIZE;
      const count = GRID_SIZE * GRID_SIZE;
      const origins = new Float32Array(count * 3);
      const seeds = new Float32Array(count);

      let index = 0;
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          origins[index*3+0] = offX + x * spacing;
          origins[index*3+1] = offY + y * spacing;
          origins[index*3+2] = 0;
          seeds[index] = (Math.sin(index*177.7)+1.0)*0.5;
          index++;
        }
      }

      instGeo.setAttribute('aOrigin', new THREE.InstancedBufferAttribute(origins, 3));
      instGeo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 1));
      instGeo.instanceCount = count;

      const mesh = new THREE.Mesh(instGeo, material);
      logoGroup.clear();
      logoGroup.add(mesh);

      console.log('Grid created with', count, 'cubes');

      localBounds.min.set(offX, offY, -WALL_DEPTH*0.5);
      localBounds.max.set(offX + wWorld, offY + hWorld, WALL_DEPTH*0.5);
    };

    // Create cube grid directly (no logo needed)
    buildCubeGrid();

    // Mouse interaction with smoothing
    const mouse = new THREE.Vector2();
    const targetMouse = new THREE.Vector2();
    const currentMouse = new THREE.Vector2(1000, 1000); // Start off-screen
    const tmpV3 = new THREE.Vector3();
    const tmpQ  = new THREE.Quaternion();

    function updateMouse(ev: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;

      const worldPos = logoGroup.getWorldPosition(tmpV3.clone());
      const worldQuat = logoGroup.getWorldQuaternion(tmpQ.clone());
      const planeNormal = new THREE.Vector3(0,0,1).applyQuaternion(worldQuat);
      const plane = new THREE.Plane(planeNormal, -worldPos.dot(planeNormal));

      const ray = new THREE.Ray(camera.position, new THREE.Vector3(mouse.x, mouse.y, 1).unproject(camera).sub(camera.position).normalize());
      const hit = new THREE.Vector3();
      ray.intersectPlane(plane, hit);
      logoGroup.worldToLocal(hit);

      const lx = THREE.MathUtils.clamp(hit.x, localBounds.min.x - 2, localBounds.max.x + 2);
      const ly = THREE.MathUtils.clamp(hit.y, localBounds.min.y - 2, localBounds.max.y + 2);
      
      // Set target position instead of directly updating
      targetMouse.set(lx, ly);
    }
    renderer.domElement.addEventListener('pointermove', updateMouse);
    renderer.domElement.addEventListener('pointerdown', (e) => { material.uniforms.uRadius.value = RADIUS_BASE * 0.65; updateMouse(e); });
    window.addEventListener('pointerup', (e) => { material.uniforms.uRadius.value = RADIUS_BASE; updateMouse(e); });

    // Parallax
    const targetCam = new THREE.Vector3().copy(camera.position);
    const onParallax = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetCam.set(nx*0.6, -ny*0.4, camera.position.z); // Restore original parallax
    };
    window.addEventListener('mousemove', onParallax);

    // Resize + ResizeObserver
    const handleSize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer?.setSize(w, h);
    };
    handleSize();
    const ro = new ResizeObserver(() => {
      const w = host.clientWidth, h = host.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer?.setSize(w, h);
    });
    ro.observe(host);

    // Animate
    const clock = new THREE.Clock();
    let raf = 0;
    const renderLoop = () => {
      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;
      
      // Smooth mouse interpolation (slower movement)
      currentMouse.lerp(targetMouse, 0.08); // Adjust this value to control smoothness (lower = slower)
      (material.uniforms.uMouse.value as THREE.Vector2).copy(currentMouse);
      
      camera.position.lerp(targetCam, 0.05);
      camera.lookAt(0,0,0);
      logoGroup.rotation.y = Math.sin(t*0.08) * 0.03;
      logoGroup.rotation.x = Math.cos(t*0.05) * 0.02;
      if (useComposer && composer) composer.render();
      else renderer.render(scene, camera);
      raf = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener('pointermove', updateMouse);
      window.removeEventListener('mousemove', onParallax);
      renderer.dispose();
      composer?.dispose();
      baseCube.dispose();
      material.dispose();
      host.removeChild(renderer.domElement);
      host.removeChild(overlay);
    };
  }, []);

  return <div ref={mountRef} className="relative h-screen w-screen select-none overflow-hidden pt-16" />;
}
