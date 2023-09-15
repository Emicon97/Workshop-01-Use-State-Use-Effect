'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { ColorType, colors } from '../colors/page';
import styles from './buttons.module.css';
import Link from 'next/link';

const fetchColors = (): Promise<ColorType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(colors.map((color) => color)), 1000);
  });
};

export default function Buttons() {
  const [allColors, setAllColors] = useState<ColorType[] | null>(null);
  const [enabled, setEnabled] = useState<ColorType | null>(null);

  useEffect(() => {
    fetchColors().then((res) => setAllColors(res));
  }, []);

  useEffect(() => {
    console.log(enabled);
  }, [enabled]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedColor = colors.findIndex((color) => color === e.target.value);

    if (selectedColor >= 0 && enabled !== colors[selectedColor])
      setEnabled(colors[selectedColor]);
    else if (enabled) setEnabled(null);
  };

  // Esta versión renderizaría todo el componente desde 0.
  // No porque se esté utilizando filter, sino porque
  // no se están haciendo las validaciones necesarias para evitarlo
  // (véanse el if y else if de la versión descomentada).
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const goodColor = allColors?.filter((color) => e.target.value === color);
  //   setEnabled(goodColor?.[0] || null);
  // };

  return (
    <div className={styles.main}>
      <input
        onChange={handleChange}
        autoFocus={true}
        className={styles.input}
      />
      {allColors?.length && (
        <div className={styles.container}>
          {/* Ambas soluciones son igualmente válidas: */}
          {colors.map((color: ColorType) => (
            <button
              style={{
                backgroundColor: enabled === color ? color : 'gray',
              }}
              disabled={enabled !== color}
              className={styles.button}
              key={color}
            >
              {color}
            </button>
          ))}
          {/* {allColors.map((color: ColorType) => (
            <button
              style={{
                backgroundColor: enabled === color ? color : 'gray',
              }}
              disabled={enabled === color ? false : true}
              className={styles.button}
              key={color}
            >
              {color}
            </button>
          ))} */}
        </div>
      )}
      <Link href="/">
        <button className={styles.button}>Volver</button>
      </Link>
    </div>
  );
}
