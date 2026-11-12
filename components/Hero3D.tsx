'use client';
/**
 * components/Hero3D.tsx
 * ---------------------------------------------------------------
 * The rotating gold 3D shape on the Home page, made with Three.js.
 *
 * HOW THREE.JS WORKS, IN SIMPLE TERMS
 * Think of a tiny film studio:
 *   - Scene     = the stage where objects are placed
 *   - Camera    = where the viewer is standing and looking from
 *   - Renderer  = the machine that takes a photo of the stage and draws it
 *                 on a <canvas> element, many times per second (an animation)
 *   - Geometry  = the SHAPE of an object (its corner points)
 *   - Material  = how the shape LOOKS (colour, see-through, and so on)
 *   - Mesh/Line = a geometry plus a material, which can be placed on the stage
 *
 * WHAT YOU SEE
 *   1. An outer gold wireframe ball (an icosahedron, a 20-sided shape, subdivided)
 *   2. A smaller light-gold diamond (an octahedron) turning the other way inside it
 *   3. A thin gold ring around them, echoing the swoosh in the logo
 *   4. A cloud of tiny gold dots (particles) floating around
 *   5. The whole group tilts gently towards the mouse pointer
 *
 * GOOD HABITS BUILT IN
 *   - Imports only the Three.js parts we use (keeps the download small)
 *   - Pauses drawing when the shape is scrolled out of view (saves battery)
 *   - Draws one still frame instead of animating if the visitor has asked
 *     their device to reduce motion (accessibility)
 *   - Cleans up everything when the component leaves the page (no memory leaks)
 *   - If the device cannot do WebGL, it quietly shows nothing instead of crashing
 */
import { useEffect, useRef } from 'react';
import {
  BufferGeometry,
  Color,
  EdgesGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  TorusGeometry,
  WebGLRenderer,
} from 'three';

export default function Hero3D() {
  // A "ref" is a handle to a real element on the page. We need it to place the canvas inside.
  const mountRef = useRef<HTMLDivElement>(null);

  // useEffect runs once, after the component first appears in the browser.
  // This is where the 3D scene is created. The empty list [] at the very end
  // means "run only once".
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1) RENDERER: creates the <canvas>. `alpha: true` keeps the background see-through
    //    so the maroon page colour shows behind. `antialias` smooths jagged edges.
    //    It is wrapped in try/catch because devices without WebGL throw an error here.
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      return; // No 3D available: the CSS background simply stays as it is.
    }
    // Sharper on high-resolution phone screens, but capped at 2x to protect performance.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    // 2) SCENE and CAMERA. PerspectiveCamera(fieldOfView, aspectRatio, nearLimit, farLimit).
    //    The aspect ratio is corrected in resize() below, so 1 is just a starting value.
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 6.5; // Step back from the centre so the shape fits in view.

    // A Group lets us move and rotate several objects together as one.
    const group = new Group();
    scene.add(group);

    // Brand colours taken from the logo.
    const gold = new Color('#DDA83B');
    const lightGold = new Color('#F3D27A');

    // 3) OUTER WIREFRAME BALL. IcosahedronGeometry(radius, detail): detail 1 adds extra triangles.
    //    EdgesGeometry keeps only the outlines, so we see a clean wire cage instead of solid faces.
    const outerGeometry = new IcosahedronGeometry(1.7, 1);
    const outerEdges = new EdgesGeometry(outerGeometry);
    const outerMaterial = new LineBasicMaterial({ color: gold, transparent: true, opacity: 0.9 });
    const outer = new LineSegments(outerEdges, outerMaterial);

    // 4) INNER DIAMOND, a smaller shape in a lighter gold.
    const innerGeometry = new OctahedronGeometry(0.9, 0);
    const innerEdges = new EdgesGeometry(innerGeometry);
    const innerMaterial = new LineBasicMaterial({ color: lightGold, transparent: true, opacity: 0.95 });
    const inner = new LineSegments(innerEdges, innerMaterial);

    // 5) THIN RING. TorusGeometry(ringRadius, tubeThickness, tubeSegments, ringSegments).
    //    A very thin tube looks like a fine line. We tilt it to echo the orbit in the logo.
    const ringGeometry = new TorusGeometry(2.6, 0.012, 8, 180);
    const ringMaterial = new MeshBasicMaterial({ color: gold });
    const ring = new Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = 1.15;
    ring.rotation.y = 0.35;

    // 6) PARTICLES. We create 220 random positions on a hollow shell around the shape.
    //    Math.random() gives a number between 0 and 1; a little trigonometry turns
    //    it into a point at a random direction and distance.
    const particleCount = 220;
    const positions = new Float32Array(particleCount * 3); // three numbers (x, y, z) per dot
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.9 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2; // angle around
      const phi = Math.acos(2 * Math.random() - 1); // angle from top, evenly spread
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    const particleGeometry = new BufferGeometry();
    particleGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    const particleMaterial = new PointsMaterial({
      color: lightGold,
      size: 0.035,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true, // far dots look smaller, near dots look bigger
    });
    const particles = new Points(particleGeometry, particleMaterial);

    // Put everything on the stage.
    group.add(outer, inner, ring, particles);

    // 7) RESIZE: keeps the picture sharp and correctly shaped when the window changes size.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false); // false = do not touch the canvas CSS size
      camera.aspect = width / height;
      camera.updateProjectionMatrix(); // tell the camera its shape changed
      if (prefersReducedMotion) draw(); // no animation loop, so redraw once manually
    };
    // ResizeObserver calls resize() whenever the container changes size.
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    // 8) POINTER TRACKING: where is the mouse, as a value from -0.5 to +0.5 across the shape area?
    const target = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      const box = mount.getBoundingClientRect();
      target.x = (event.clientX - box.left) / box.width - 0.5;
      target.y = (event.clientY - box.top) / box.height - 0.5;
    };
    window.addEventListener('pointermove', onPointerMove);

    // 9) DRAW: update rotations from the clock, then take one "photo" with renderer.render().
    const draw = () => {
      const seconds = performance.now() * 0.001;
      outer.rotation.y = seconds * 0.25;
      outer.rotation.x = seconds * 0.12;
      inner.rotation.y = -seconds * 0.4; // negative = turns the opposite way
      inner.rotation.z = seconds * 0.2;
      ring.rotation.z = seconds * 0.15;
      particles.rotation.y = seconds * 0.03;
      // Ease the whole group towards the pointer: move 5% of the remaining distance each frame.
      group.rotation.y += (target.x * 0.6 - group.rotation.y) * 0.05;
      group.rotation.x += (target.y * 0.4 - group.rotation.x) * 0.05;
      renderer.render(scene, camera);
    };

    // 10) ANIMATION LOOP. requestAnimationFrame asks the browser to call us before the next
    //     screen refresh (about 60 times a second) and pauses by itself in hidden tabs.
    let frameId = 0;
    let visible = true;
    const loop = () => {
      frameId = requestAnimationFrame(loop);
      if (visible) draw(); // skip the work while the shape is scrolled out of view
    };
    // IntersectionObserver tells us whether the shape is currently on screen.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(mount);

    resize();
    if (prefersReducedMotion) {
      draw(); // one still frame, no movement
    } else {
      loop();
    }

    // 11) CLEANUP. React runs this function when the component is removed.
    //     We stop the loop, remove listeners, and free the memory that the
    //     browser's graphics card holds for our shapes.
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      [outerGeometry, outerEdges, innerGeometry, innerEdges, ringGeometry, particleGeometry].forEach((g) => g.dispose());
      [outerMaterial, innerMaterial, ringMaterial, particleMaterial].forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="scene" />;
}
