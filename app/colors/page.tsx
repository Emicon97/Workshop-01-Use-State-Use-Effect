'use client';

import Link from 'next/link';
import { MouseEvent, useEffect, useState } from 'react';
import styles from './colors.module.css';

export const colors = [
  'blue',
  'olive',
  'hotpink',
  'grey',
  'darkmagenta',
  'lightseagreen',
  'seagreen',
  'purple',
  'gold',
] as const;
export type ColorType = (typeof colors)[number];

const colorPicker = (currentColor: ColorType): ColorType => {
  const newColor = colors[Math.floor(Math.random() * colors.length)];
  if (newColor === currentColor) return colorPicker(currentColor);
  return newColor;
};

export default function Colors() {
  // Los estados son "estáticos" durante cada renderizado.
  // Esto quiere decir que al cambiarlos,
  // se renderizará TODO el componente de nuevo.
  // Incluyendo todo lo que dependa de los demás estados.
  const [backgroundColor, setBackgroundColor] = useState<ColorType>('hotpink');
  const [counter, setCounter] = useState<number>(0);
  console.log(
    'Esto se consologuea cuando cambia cualquier estado',
    backgroundColor,
  );

  useEffect(() => {
    console.log(
      'Esto se consologuea sólo cuando cambia backgroundColor',
      backgroundColor,
    );
    // Si yo quisiera ver el nuevo color cada vez que este cambia,
    // debería ponerlo en un useEffect con backgroundColor como dependencia
    // Ya que si lo pongo en la misma función en la que cambio su estado,
    // Se va a consologuear el estado anterior.
  }, [backgroundColor]);

  const handleColorChange = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newColor = colorPicker(backgroundColor);

    // Cambio el color:
    setBackgroundColor(newColor);
    console.log('Esto consologuea el estado anterior', backgroundColor);
  };

  const handleCounter = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Aumento el contador:
    setCounter(() => counter + 1);
  };

  return (
    <div style={{ backgroundColor }} className={styles.main}>
      <div className={styles.div}>
        <p>Hello World!</p>
        <button className={styles.button} onClick={handleColorChange}>
          Change color!
        </button>
      </div>
      <div className={styles.div}>
        <p>Counter {counter}</p>
        <button
          style={{ backgroundColor: 'fuchsia' }}
          className={styles.button}
          onClick={handleCounter}
        >
          Count
        </button>
      </div>
      <Link href="/">
        <button style={{ backgroundColor: 'black' }} className={styles.button}>
          Volver
        </button>
      </Link>
    </div>
  );
}
