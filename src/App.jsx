import React from 'react';
import ParticleRing from './components/ParticleRing';
import './App.css'

const App = () => {
  return (
    <div className='flex h-screen justify-center items-center flex-colv'>
      <div className='w-full h-screen bg-current bg-cover bg-center'>
        <ParticleRing />
      </div>
    </div>
  );
};

export default App;