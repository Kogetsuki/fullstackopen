// import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './App.tsx';


interface WelcomeProps {
  name: string;
}


export const Welcome = (props: WelcomeProps) =>
  <h1>Hello, {props.name}</h1>;


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Welcome name='Sarah' />
);
