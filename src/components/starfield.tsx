"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

interface StarfieldProps {
  starCount?: number;
  warp?: number; // 0 for no warp, 1 for full warp
}

const Starfield: React.FC<StarfieldProps> = ({ starCount = 5000, warp = 0 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const onWindowResize = useCallback(() => {
    if (rendererRef.current) {
      const renderer = rendererRef.current as THREE.WebGLRenderer & { camera?: THREE.PerspectiveCamera };
      const camera = renderer.camera;
      const container = mountRef.current;
      if (camera && container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    }
  }, []);

  const onMouseMove = (event: MouseEvent) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, currentMount.clientWidth / currentMount.clientHeight, 1, 1000);
    camera.position.z = warp > 0 ? 1 : 400;
  camera.fov = 60;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  (renderer as THREE.WebGLRenderer & { camera?: THREE.PerspectiveCamera }).camera = camera;
    rendererRef.current = renderer;

    currentMount.appendChild(renderer.domElement);
    window.addEventListener('mousemove', onMouseMove);

    const starGeo = new THREE.BufferGeometry();
    const starVertices = [];
    const starVelocities = [];
    const starSizes = [];

    for (let i = 0; i < starCount; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
        starVelocities.push(0, 0, (Math.random() * 0.5 + 0.1) * (warp * 50 + 1));
        starSizes.push(Math.random() * 2 + 1);
    }

    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starGeo.setAttribute('velocity', new THREE.Float32BufferAttribute(starVelocities, 3));
    starGeo.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1));
    
    const starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        transparent: true,
        opacity: 0.7,
    });
    
    const stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    const clock = new THREE.Clock();

    const animate = () => {
        const delta = clock.getDelta();

        const positions = starGeo.attributes.position.array as Float32Array;
        const velocities = starGeo.attributes.velocity.array as Float32Array;

        for (let i = 0; i < starCount; i++) {
            positions[i * 3 + 2] += velocities[i * 3 + 2] * delta * (10 + warp * 50);

            if (positions[i * 3 + 2] > 1000) {
                positions[i * 3 + 2] = -1000;
            }
        }
        starGeo.attributes.position.needsUpdate = true;
        
        stars.rotation.z += delta * 0.01 * warp;

        // Add parallax effect based on mouse position
        camera.position.x += (mouse.current.x * 5 - camera.position.x) * 0.02;
        camera.position.y += (mouse.current.y * 5 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);


        camera.position.z = THREE.MathUtils.lerp(camera.position.z, warp > 0 ? 1 : 400, 0.05);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      const container = currentMount; // capture to satisfy exhaustive-deps note
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starGeo.dispose();
      starMaterial.dispose();
    };
  }, [starCount, warp, onWindowResize]);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default Starfield;
