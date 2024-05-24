import { MeshProps, useFrame, useThree } from '@react-three/fiber';
import React, { RefObject, useRef, useState } from 'react';
import { Mesh, MeshBasicMaterial, RingGeometry, Vector3 } from 'three';
import { OBJECT_SIZE, SPEED, WINDOW_HEIGHT, WINDOW_WIDTH } from './constants';

// export default function Boid() {
//   const boid = React.useRef<MeshProps>();
//
//   const isCollision = (vector: Vector3) => {
//     console.log(vector);
//   };
//
//   useFrame((frameMetadata) => {
//     console.log(SCENE_WIDTH);
//     console.log(SCENE_HEIGHT);
//     if (boid.current?.position) {
//       // Get the current position
//       console.log(frameMetadata);
//       console.log(boid.current);
//       const currentPosition = boid.current.position as Vector3;
//
//       isCollision(currentPosition);
//       // Define the speed and direction of movement
//       const speed = 0.01; // Adjust as needed
//       const direction = new Vector3(1, 1, 0); // Move along the x-axis
//
//       // Calculate the new position
//       const newPosition = currentPosition.add(direction.multiplyScalar(speed));
//
//       // Update the position
//       currentPosition.copy(newPosition);
//     }
//   });
//
//   return (
//     <mesh ref={boid as RefObject<any>}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshBasicMaterial color="royalblue" />
//     </mesh>
//   );
// }

export default function Boid() {
  const [isReverseX, setReverseX] = useState(false);
  const [isReverseY, setReverseY] = useState(false);
  const [angle, setAngle] = useState(Math.random() * Math.PI * 2);
  const objectRef = useRef<MeshProps>();

  // Animation and collision detection
  useFrame(({ clock, camera }) => {
    const elapsedTime = clock.getElapsedTime();
    console.log('WINDOW_WIDTH:', WINDOW_WIDTH);
    console.log('WINDOW_HEIGHT:', WINDOW_HEIGHT);
    console.log('elapsedTime:', elapsedTime);

    if (objectRef.current?.position) {
      const currentPosition = objectRef.current.position as Vector3;
      console.log('CURRENT_X:', currentPosition.x);
      console.log('CURRENT_Y:', currentPosition.y);
      console.log('angle:', angle);
      //   const direction = new Vector3(1, 1, 0); // Move along the x-axis

      // Calculate the new position
      // const newPosition = currentPosition.add(direction.multiplyScalar(speed));

      // Update the position
      // currentPosition.copy(newPosition);
      //   const newX = Math.sin(angle * SPEED) + currentPosition.x;

      const newX = isReverseX
        ? currentPosition.x - SPEED
        : SPEED + currentPosition.x;
      const newY = isReverseY
        ? currentPosition.y - SPEED
        : SPEED + currentPosition.y;
      // const newX = elapsedTime * SPEED * (WINDOW_HEIGHT / 2 - OBJECT_SIZE / 2);
      // const newY =
      //   Math.cos(elapsedTime * SPEED) * (WINDOW_HEIGHT / 2 - OBJECT_SIZE / 2);

      // Check for collisions with view sides
      if (
        newX > WINDOW_WIDTH / 2 - OBJECT_SIZE / 2 ||
        newX < -(WINDOW_WIDTH / 2 - OBJECT_SIZE / 2)
      ) {
        // Reverse direction if collision with left or right side
        setReverseX(!isReverseX);
        // setAngle(180 - angle);
      }
      if (
        newY > WINDOW_HEIGHT / 2 - OBJECT_SIZE / 2 ||
        newY < -(WINDOW_HEIGHT / 2 - OBJECT_SIZE / 2)
      ) {
        //   Reverse direction if collision with top or bottom side
        setReverseY(!isReverseY);
      }

      // Update object position
      currentPosition.x = newX;
      currentPosition.y = newY;
      // currentPosition.y = newY;
      // currentPosition.x = WINDOW_WIDTH / 2 - OBJECT_SIZE / 2;
      // currentPosition.y = WINDOW_HEIGHT / 2 - OBJECT_SIZE / 2;
    }
  });

  return (
    <mesh ref={objectRef as RefObject<any>} position={[0, 0, -OBJECT_SIZE]}>
      <boxGeometry args={[OBJECT_SIZE, OBJECT_SIZE, OBJECT_SIZE]} />
      <meshBasicMaterial color="royalblue" />
    </mesh>
  );
}