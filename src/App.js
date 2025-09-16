import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import audioManager from './audioUtils';
import { FaCog, FaThLarge, FaRegImages, FaArrowLeft } from 'react-icons/fa';
import Confetti from "react-confetti";

/* // Add OpenAI API key import at the top:
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;*/

// Confetti
const showConfetti = (condition = true) => {
  if (!condition) return null;
  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={300}
      gravity={0.5}
      initialVelocityY={5}
      recycle={false}
      run={true}
      confettiSource={{ x: window.innerWidth / 2 - 150, y: 0, w: 300, h: 1 }}
      style={{ position: 'fixed', left: 0, top: 0, zIndex: 9999, pointerEvents: 'none' }}
    />
  );
};

//Shooting Stars
const showShootingStars = () => {
  console.log('🎆 Shooting stars function called!');
  
  // Define individual speeds for each star
  const leftStarSpeeds = [550, 500, 450, 575, 525];
  const rightStarSpeeds = [550, 500, 450, 575, 525];
  
  // Define colors for each star
  const starColors = [
    '#ff6b6b', // Red
    '#4ecdc4', // Turquoise
    '#45b7d1', // Blue
    '#ffd700', // Gold
    '#96ceb4'  // Green
  ];
  // Shoot 5 stars from left bottom
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      
      // Set individual color for each star
      star.style.background = starColors[i];
      star.style.filter = `drop-shadow(0 0 15px ${starColors[i]})`;

      // Left side stars - start from left bottom
      star.style.left = '20px';
      star.style.bottom = '20px';
      
      // Individual speed for each star
      const speed = leftStarSpeeds[i];
      const duration = 3; // Calculate duration based on speed (700px = 1s)
      
      // Create custom animation for this star
      const customAnimation = `
        @keyframes customShootLeft${i} {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          14% {
            transform: translate(${speed}px, -${speed/2}px) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(${speed}px, -${speed/3}px) rotate(45deg);
            opacity: 0;
          }
        }
      `;
      
      // Add custom animation to document
      const style = document.createElement('style');
      style.textContent = customAnimation;
      document.head.appendChild(style);
      
      // Apply custom animation
      star.style.animation = `customShootLeft${i} ${duration}s ease-out forwards`;
      
      // Staggered launch timing
      const randomDelay = Math.random() * 0.2;
      star.style.animationDelay = (i * 0.15 + randomDelay) + 's';
      
      document.body.appendChild(star);
      
      // Remove after animation
      setTimeout(() => {
        if (star.parentNode) {
          star.parentNode.removeChild(star);
        }
        // Remove custom style
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      }, (duration + 1) * 1000);
    }, i * 80);
  }
  
  // Shoot 5 stars from right bottom
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const star = document.createElement('div');
      star.className = 'shooting-star';

      // Set individual color for each star
      star.style.background = starColors[i];
      star.style.filter = `drop-shadow(0 0 15px ${starColors[i]})`;
      
      // Right side stars - start from right bottom
      star.style.right = '20px';
      star.style.bottom = '20px';
      
      // Individual speed for each star
      const speed = rightStarSpeeds[i];
      const duration = 3; // Calculate duration based on speed
      
      // Create custom animation for this star
      const customAnimation = `
        @keyframes customShootRight${i} {
          0% {
            transform: translate(0, 0) rotate(-45deg);
            opacity: 1;
          }
          14% {
            transform: translate(-${speed}px, -${speed/2}px) rotate(-45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-${speed}px, -${speed/3}px) rotate(-45deg);
            opacity: 0;
          }
        }
      `;
      
      // Add custom animation to document
      const style = document.createElement('style');
      style.textContent = customAnimation;
      document.head.appendChild(style);
      
      // Apply custom animation
      star.style.animation = `customShootRight${i} ${duration}s ease-out forwards`;
      
      // Staggered launch timing
      const randomDelay = Math.random() * 0.2;
      star.style.animationDelay = (i * 0.15 + randomDelay) + 's';
      
      document.body.appendChild(star);
      
      // Remove after animation
      setTimeout(() => {
        if (star.parentNode) {
          star.parentNode.removeChild(star);
        }
        // Remove custom style
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      }, (duration + 1) * 1000);
    }, i * 80);
  }
};

const clearShootingStars = () => document.querySelectorAll('.shooting-star').forEach(star => star.remove());

// Add themeConfigs definition here (top-level, before App)
const themeConfigs = {
  animals: {
    bg: 'from-green-300 via-yellow-200 to-green-500',
    image: '/animals.jpg',
    tableEmojis: ['🐶','🐱','🦁','🐯','🐵','🐸','🐧','🐼','🐨','🦊','🐻','🐰'],
    tableNames: ['Dog','Cat','Lion','Tiger','Monkey','Frog','Penguin','Panda','Koala','Fox','Bear','Rabbit'],
    tableColors: ['bg-green-400 border-green-600','bg-yellow-300 border-yellow-500','bg-orange-300 border-orange-500','bg-pink-300 border-pink-500','bg-blue-300 border-blue-500','bg-purple-300 border-purple-500','bg-gray-300 border-gray-500','bg-red-300 border-red-500','bg-teal-300 border-teal-500','bg-lime-300 border-lime-500','bg-amber-300 border-amber-500','bg-cyan-300 border-cyan-500']
  },
  candyland: {
    bg: 'from-pink-200 via-yellow-100 to-pink-400',
    image: '/candyland.jpg',
    tableEmojis: ['🍬','🍭','🍫','🍩','🍪','🧁','🍰','🍦','🥧','🍮','🍯','🍨'],
    tableNames: ['Candy','Lollipop','Chocolate','Donut','Cookie','Cupcake','Cake','Ice Cream','Pie','Pudding','Honey','Gelato'],
    tableColors: ['bg-pink-300 border-pink-500','bg-yellow-200 border-yellow-400','bg-orange-200 border-orange-400','bg-purple-200 border-purple-400','bg-blue-200 border-blue-400','bg-green-200 border-green-400','bg-red-200 border-red-400','bg-amber-200 border-amber-400','bg-lime-200 border-lime-400','bg-cyan-200 border-cyan-400','bg-fuchsia-200 border-fuchsia-400','bg-rose-200 border-rose-400']
  },
  fairytales: {
    bg: 'from-pink-300 via-purple-200 to-blue-200',
    image: '/fairytales.jpg',
    tableEmojis: ['🧚','🦄','🐉','👸','🧙','🧞','🧜','🦸','🧝','🧟','🧚','🦄'],
    tableNames: ['Fairy','Unicorn','Dragon','Princess','Wizard','Genie','Mermaid','Hero','Elf','Zombie','Sprite','Pegasus'],
    tableColors: ['bg-pink-400 border-pink-600','bg-purple-300 border-purple-500','bg-blue-300 border-blue-500','bg-yellow-300 border-yellow-500','bg-green-300 border-green-500','bg-red-300 border-red-500','bg-orange-300 border-orange-500','bg-cyan-300 border-cyan-500','bg-lime-300 border-lime-500','bg-amber-300 border-amber-500','bg-fuchsia-300 border-fuchsia-500','bg-rose-300 border-rose-500']
  },
  farm: {
    bg: 'from-yellow-200 via-green-200 to-yellow-400',
    image: '/farm.jpg',
    tableEmojis: ['🐮','🐷','🐔','🐴','🐑','🦆','🦃','🐐','🐓','🐇','🐕','🐈'],
    tableNames: ['Cow','Pig','Chicken','Horse','Sheep','Duck','Turkey','Goat','Rooster','Rabbit','Dog','Cat'],
    tableColors: ['bg-yellow-300 border-yellow-500','bg-green-300 border-green-500','bg-orange-300 border-orange-500','bg-pink-300 border-pink-500','bg-blue-300 border-blue-500','bg-purple-300 border-purple-500','bg-gray-300 border-gray-500','bg-red-300 border-red-500','bg-teal-300 border-teal-500','bg-lime-300 border-lime-500','bg-amber-300 border-amber-500','bg-cyan-300 border-cyan-500']
  },
  dinosaurs: {
    bg: 'from-green-400 via-yellow-200 to-green-700',
    image: '/dinosaur.jpg',
    tableEmojis: ['🦕','🦖','🐊','🐢','🦎','🐍','🦦','🦥','🦨','🦡','🦔','🦋'],
    tableNames: ['Brontosaurus','T-Rex','Crocodile','Turtle','Lizard','Snake','Otter','Sloth','Skunk','Badger','Hedgehog','Butterfly'],
    tableColors: ['bg-green-500 border-green-700','bg-yellow-400 border-yellow-600','bg-orange-400 border-orange-600','bg-pink-400 border-pink-600','bg-blue-400 border-blue-600','bg-purple-400 border-purple-600','bg-gray-400 border-gray-600','bg-red-400 border-red-600','bg-teal-400 border-teal-600','bg-lime-400 border-lime-600','bg-amber-400 border-amber-600','bg-cyan-400 border-cyan-600']
  },
  underwater: {
    bg: 'from-blue-200 via-cyan-200 to-blue-400',
    image: '/underwater.jpg',
    tableEmojis: ['🐠','🐟','🐬','🐳','🦈','🦑','🐙','🦀','🦐','🦞','🐡','🐚'],
    tableNames: ['Fish','Goldfish','Dolphin','Whale','Shark','Squid','Octopus','Crab','Shrimp','Lobster','Puffer','Shell'],
    tableColors: ['bg-blue-300 border-blue-500','bg-cyan-300 border-cyan-500','bg-teal-300 border-teal-600','bg-green-300 border-green-500','bg-yellow-300 border-yellow-500','bg-purple-300 border-purple-600','bg-gray-300 border-gray-500','bg-red-300 border-red-500','bg-amber-300 border-amber-500','bg-lime-300 border-lime-500','bg-fuchsia-300 border-fuchsia-500','bg-rose-300 border-rose-500']
  }
};

// Age group to theme keys mapping
const ageThemeMap = age => {
  return ['underwater','candyland','animals','farm','fairytales','dinosaurs'];
};

// Define a color palette for table numbers:
const tableNumberColors = [
  '#ff1744', // bright red
  '#ff9100', // bright orange
  '#ffd600', // bright yellow
  '#00e676', // bright green
  '#00e5ff', // bright cyan
  '#2979ff', // bright blue
  '#d500f9', // bright violet
  '#ff4081', // bright pink
  '#ff5252', // bright rose
  '#c6ff00', // bright lime
  '#ffc400', // bright amber
  '#1de9b6', // bright teal
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


// Function to generate questions for each belt with exact fact counts
function generateBeltQuestion(difficulty, totalQuestions, askedQuestions, lastQuestion, selectedTable = null) {
  // Initialize ALL belt sequences before any logic
/*const beltSequences = {
  'white': ['0 + 0', '1 + 1', '0 + 6', '6 + 0', '1 + 6', '6 + 1', '2 + 6', '6 + 2', '3 + 6', '6 + 3'],
  'yellow': ['0 + 1', '1 + 0', '1 + 2', '2 + 1', '0 + 7', '7 + 0', '1 + 7', '7 + 1', '2 + 7', '7 + 2', '3 + 7', '7 + 3'],
  'green': ['0 + 2', '2 + 0', '1 + 3', '3 + 1', '0 + 8', '8 + 0', '1 + 8', '8 + 1', '2 + 8', '8 + 2', '3 + 8', '8 + 3'],
  'blue': ['0 + 3', '3 + 0', '1 + 4', '4 + 1', '0 + 9', '9 + 0', '1 + 9', '9 + 1', '3 + 3', '4 + 5', '5 + 4'],
  'red': ['0 + 4', '4 + 0', '2 + 2', '0 + 10', '10 + 0', '2 + 4', '4 + 2', '3 + 4', '4 + 3', '4 + 6', '6 + 4'],
  'brown': ['0 + 5', '5 + 0', '2 + 3', '3 + 2', '1 + 5', '5 + 1', '2 + 5', '5 + 2', '3 + 5', '5 + 3', '5 + 5']
};
  // Initialize the current belt sequence if missing
if (!window[`${difficulty}BeltFullSequence`] || window[`${difficulty}BeltFullSequence`].length === 0) {
  window[`${difficulty}BeltFullSequence`] = [...beltSequences[difficulty]];
  window[`${difficulty}BeltQuestionCounter`] = 0;
}*/
  
  if (difficulty === 'white' && totalQuestions === 0) {
    delete window.whiteBeltFullSequence;
  }
  // Define the core facts for each belt (exactly 2 questions each)
  const beltFacts = {
    'white': [
      { question: '0 + 0', correctAnswer: 0, multiplier: 0, difficulty: 'white' }
    ],
    'yellow': [
      { question: '0 + 1', correctAnswer: 1, multiplier: 1, difficulty: 'yellow' },
      { question: '1 + 0', correctAnswer: 1, multiplier: 1, difficulty: 'yellow' }
    ],
    'green': [
      { question: '0 + 2', correctAnswer: 2, multiplier: 2, difficulty: 'green' },
      { question: '2 + 0', correctAnswer: 2, multiplier: 2, difficulty: 'green' }
    ],
    'blue': [
      { question: '0 + 3', correctAnswer: 3, multiplier: 3, difficulty: 'blue' },
      { question: '3 + 0', correctAnswer: 3, multiplier: 3, difficulty: 'blue' }
    ],
    'red': [
      { question: '0 + 4', correctAnswer: 4, multiplier: 4, difficulty: 'red' },
      { question: '4 + 0', correctAnswer: 4, multiplier: 4, difficulty: 'red' }
    ],
    'brown': [
      { question: '0 + 5', correctAnswer: 5, multiplier: 5, difficulty: 'brown' },
      { question: '5 + 0', correctAnswer: 5, multiplier: 5, difficulty: 'brown' }
    ]
  };
  
  // Function to generate dynamic answers for any question
  const generateAnswers = (correctAnswer) => {
    const answers = [correctAnswer]; // Start with correct answer
    
    // Generate 3 wrong answers
    while (answers.length < 4) {
      let wrongAnswer;
      if (correctAnswer <= 10) {
        // For smaller answers, use range -5 to +5
        wrongAnswer = correctAnswer + Math.floor(Math.random() * 11) - 5;
      } else {
        // For larger answers, use range -4 to +4
        wrongAnswer = correctAnswer + Math.floor(Math.random() * 9) - 4;
      }
      
      // Ensure wrong answer is valid and unique
      if (wrongAnswer !== correctAnswer && 
          wrongAnswer >= 0 && 
          wrongAnswer <= 25 && 
          !answers.includes(wrongAnswer)) {
        answers.push(wrongAnswer);
      }
    }
    
    // Shuffle the answers
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    
    return answers;
  };
  // Previous belt questions for filling remaining slots
  const previousBeltQuestions = {
    'white': [
      { question: '0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'white' },
      { question: '1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'white' },
      { question: '2', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'white' },
      { question: '3', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 3, difficulty: 'white' },
      { question: '4', correctAnswer: 4, answers: [0, 1, 2, 4], multiplier: 4, difficulty: 'white' },
      { question: '5', correctAnswer: 5, answers: [0, 1, 2, 5], multiplier: 5, difficulty: 'white' },
      { question: '6', correctAnswer: 6, answers: [0, 1, 2, 6], multiplier: 6, difficulty: 'white' },
      { question: '7', correctAnswer: 7, answers: [0, 1, 2, 7], multiplier: 7, difficulty: 'white' },
      { question: '8', correctAnswer: 8, answers: [0, 1, 2, 8], multiplier: 8, difficulty: 'white' },
      { question: '9', correctAnswer: 9, answers: [0, 1, 2, 9], multiplier: 9, difficulty: 'white' }
    ],
    'yellow': [
      { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'white' },
      { question: '0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'white' },
      { question: '1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'white' },
      { question: '2', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'white' },
      { question: '3', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 3, difficulty: 'white' },
      { question: '4', correctAnswer: 4, answers: [0, 1, 2, 4], multiplier: 4, difficulty: 'white' },
      { question: '5', correctAnswer: 5, answers: [0, 1, 2, 5], multiplier: 5, difficulty: 'white' },
      { question: '6', correctAnswer: 6, answers: [0, 1, 2, 6], multiplier: 6, difficulty: 'white' },
      { question: '7', correctAnswer: 7, answers: [0, 1, 2, 7], multiplier: 7, difficulty: 'white' },
      { question: '8', correctAnswer: 8, answers: [0, 1, 2, 8], multiplier: 8, difficulty: 'white' },
      { question: '9', correctAnswer: 9, answers: [0, 1, 2, 9], multiplier: 9, difficulty: 'white' }
    ],
    'green': [
      { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'white' },
      { question: '0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'white' },
      { question: '1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'white' },
      { question: '2', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'white' },
      { question: '3', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 3, difficulty: 'white' },
      { question: '4', correctAnswer: 4, answers: [0, 1, 2, 4], multiplier: 4, difficulty: 'white' },
      { question: '5', correctAnswer: 5, answers: [0, 1, 2, 5], multiplier: 5, difficulty: 'white' },
      { question: '6', correctAnswer: 6, answers: [0, 1, 2, 6], multiplier: 6, difficulty: 'white' },
      { question: '7', correctAnswer: 7, answers: [0, 1, 2, 7], multiplier: 7, difficulty: 'white' },
      { question: '8', correctAnswer: 8, answers: [0, 1, 2, 8], multiplier: 8, difficulty: 'white' },
      { question: '9', correctAnswer: 9, answers: [0, 1, 2, 9], multiplier: 9, difficulty: 'white' }
    ],
    'blue': [
      { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'white' },
      { question: '0 + 1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'yellow' },
      { question: '1 + 0', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'yellow' },
      { question: '0 + 2', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'green' },
      { question: '2 + 0', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'green' },
      { question: '0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'white' },
      { question: '1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'white' },
      { question: '2', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'white' },
      { question: '3', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 3, difficulty: 'white' },
      { question: '4', correctAnswer: 4, answers: [0, 1, 2, 4], multiplier: 4, difficulty: 'white' },
      { question: '5', correctAnswer: 5, answers: [0, 1, 2, 5], multiplier: 5, difficulty: 'white' },
      { question: '6', correctAnswer: 6, answers: [0, 1, 2, 6], multiplier: 6, difficulty: 'white' },
      { question: '7', correctAnswer: 7, answers: [0, 1, 2, 7], multiplier: 7, difficulty: 'white' },
      { question: '8', correctAnswer: 8, answers: [0, 1, 2, 8], multiplier: 8, difficulty: 'white' },
      { question: '9', correctAnswer: 9, answers: [0, 1, 2, 9], multiplier: 9, difficulty: 'white' }
    ],
    'red': [
      { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'white' },
      { question: '0 + 1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'yellow' },
      { question: '1 + 0', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'yellow' },
      { question: '0 + 2', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'green' },
      { question: '2 + 0', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'green' },
      { question: '0 + 3', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 3, difficulty: 'blue' },
      { question: '3 + 0', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 3, difficulty: 'blue' },
      { question: '0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'white' },
      { question: '1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'white' },
      { question: '2', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'white' },
      { question: '3', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 3, difficulty: 'white' },
      { question: '4', correctAnswer: 4, answers: [0, 1, 2, 4], multiplier: 4, difficulty: 'white' },
      { question: '5', correctAnswer: 5, answers: [0, 1, 2, 5], multiplier: 5, difficulty: 'white' },
      { question: '6', correctAnswer: 6, answers: [0, 1, 2, 6], multiplier: 6, difficulty: 'white' },
      { question: '7', correctAnswer: 7, answers: [0, 1, 2, 7], multiplier: 7, difficulty: 'white' },
      { question: '8', correctAnswer: 8, answers: [0, 1, 2, 8], multiplier: 8, difficulty: 'white' },
      { question: '9', correctAnswer: 9, answers: [0, 1, 2, 9], multiplier: 9, difficulty: 'white' }
    ],
    'brown': [
      { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'white' },
      { question: '0 + 1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'yellow' },
      { question: '1 + 0', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'yellow' },
      { question: '0 + 2', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'green' },
      { question: '2 + 0', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'green' },
      { question: '0 + 3', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 3, difficulty: 'blue' },
      { question: '3 + 0', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 3, difficulty: 'blue' },
      { question: '0 + 4', correctAnswer: 4, answers: [0, 1, 2, 4], multiplier: 4, difficulty: 'red' },
      { question: '4 + 0', correctAnswer: 4, answers: [0, 1, 2, 4], multiplier: 4, difficulty: 'red' },
      { question: '0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'white' },
      { question: '1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'white' },
      { question: '2', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'white' },
      { question: '3', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 3, difficulty: 'white' },
      { question: '4', correctAnswer: 4, answers: [0, 1, 2, 4], multiplier: 4, difficulty: 'white' },
      { question: '5', correctAnswer: 5, answers: [0, 1, 2, 5], multiplier: 5, difficulty: 'white' },
      { question: '6', correctAnswer: 6, answers: [0, 1, 2, 6], multiplier: 6, difficulty: 'white' },
      { question: '7', correctAnswer: 7, answers: [0, 1, 2, 7], multiplier: 7, difficulty: 'white' },
      { question: '8', correctAnswer: 8, answers: [0, 1, 2, 8], multiplier: 8, difficulty: 'white' },
      { question: '9', correctAnswer: 9, answers: [0, 1, 2, 9], multiplier: 9, difficulty: 'white' }
    ]
  };

  const currentFacts = beltFacts[difficulty];
  const previousQuestions = previousBeltQuestions[difficulty];
  // Safety check for black belt difficulties
if (!currentFacts) {
  // For black belt difficulties, return early as they have their own logic
  return null;
}
  // Count how many of each fact have been asked
  const factCounts = {};
  currentFacts.forEach(fact => {
    factCounts[fact.question] = Array.from(askedQuestions || []).filter(q => q === fact.question).length;
  });
        
        const isLevel1 = selectedTable === 1;
        const isLevel2 = selectedTable === 2;
        const isLevel3 = selectedTable === 3;
        const isLevel4 = selectedTable === 4;
        const isLevel5 = selectedTable === 5;
        const isLevel6 = selectedTable === 6;
        // Special handling for white belt: 2 "0+0" questions anywhere + 8 shuffled numbers, total 10 questions
    if (difficulty === 'white') {
      // Create a shuffled sequence that ensures exactly 2 "0+0" and 8 numbers
      if (!window.whiteBeltFullSequence) {
        // Check if this is Level 2 or Level 3 white belt
        let finalSequence;
        if (isLevel2) {
          // Level 2 white belt: 2 "1+1" questions + 8 questions from previous level belts
          const level2Pool = [
            '1 + 1', '1 + 1',  // 2 "1+1" questions
            // Questions from previous level belts
            '0 + 0',  // white belt
            '0 + 1', '1 + 0',  // yellow belt
            '0 + 2', '2 + 0',  // green belt
            '0 + 3', '3 + 0',  // blue belt
            '0 + 4', '4 + 0',  // red belt
            '0 + 5', '5 + 0',  // brown belt
            // Number recognition questions
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9
          ];
          const remainingPool = level2Pool.filter(q => q !== '1 + 1');
          const selectedQuestions = [];
          selectedQuestions.push('1 + 1', '1 + 1');
          for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * remainingPool.length);
            selectedQuestions.push(remainingPool[randomIndex]);
            remainingPool.splice(randomIndex, 1);
          }
          finalSequence = selectedQuestions;
        } else if (isLevel3) {
          // Level 3 white belt: 2 "0+6" + 2 "6+0" questions + 6 questions from previous level belts
          const level3Pool = [
            '0 + 6', '0 + 6',  // 2 "0+6" questions
            '6 + 0', '6 + 0',  // 2 "6+0" questions
            // Questions from previous level belts
            '0 + 0', '1 + 1',  // white belt
            '0 + 1', '1 + 0', '1 + 2', '2 + 1',  // yellow belt
            '0 + 2', '2 + 0', '1 + 3', '3 + 1',  // green belt
            '0 + 3', '3 + 0', '1 + 4', '4 + 1',  // blue belt
            '0 + 4', '4 + 0', '2 + 2', '2 + 3', '3 + 2',  // red belt
            '0 + 5', '5 + 0',   // brown belt
            // Number recognition questions
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9
          ];
          const remainingPool = level3Pool.filter(q => q !== '0 + 6' && q !== '6 + 0');
          const selectedQuestions = [];
          selectedQuestions.push('0 + 6', '0 + 6', '6 + 0', '6 + 0');
          for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * remainingPool.length);
            selectedQuestions.push(remainingPool[randomIndex]);
            remainingPool.splice(randomIndex, 1);
          }
          finalSequence = selectedQuestions;
        } else if (isLevel4) {
          // Level 4 white belt: 2 "1+6" + 2 "6+1" + 6 from previous levels
          const level4Pool = [
            '1 + 6', '1 + 6',  // 2 "1+6" questions
            '6 + 1', '6 + 1',  // 2 "6+1" questions
            // Questions from previous levels (level 1-3 all belts only)
            // Level 1 belts
            '0 + 0', '1 + 1',  // white belt
            '0 + 1', '1 + 0',  // yellow belt
            '0 + 2', '2 + 0',  // green belt
            '0 + 3', '3 + 0',  // blue belt
            '0 + 4', '4 + 0',  // red belt
            '0 + 5', '5 + 0',  // brown belt
            // Level 2 belts
            '1 + 2', '2 + 1',  // yellow belt
            '1 + 3', '3 + 1',  // green belt
            '1 + 4', '4 + 1',  // blue belt
            '2 + 2',           // red belt
            '2 + 3', '3 + 2',  // brown belt
            // Level 3 belts
            '0 + 6', '6 + 0',  // white belt
            '0 + 7', '7 + 0',  // yellow belt
            '0 + 8', '8 + 0',  // green belt
            '0 + 9', '9 + 0',  // blue belt
            '0 + 10', '10 + 0', // red belt
            '1 + 5', '5 + 1',   // brown belt
            // Number recognition questions
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9
          ];
          
          const remainingPool = level4Pool.filter(q => q !== '1 + 6' && q !== '6 + 1');
          const selectedQuestions = [];
          // Add the core level 4 yellow belt questions
          selectedQuestions.push('1 + 6', '1 + 6', '6 + 1', '6 + 1');
          // Add 6 random questions from the remaining pool (levels 1-3 only)
          for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * remainingPool.length);
            selectedQuestions.push(remainingPool[randomIndex]);
            remainingPool.splice(randomIndex, 1);
          }
          finalSequence = selectedQuestions;
        } else if (isLevel5) {
          // Level 5 white belt: 2 "2+6" + 2 "6+2" + 6 from previous levels
          const level5Pool = [
            '2 + 6', '2 + 6',  // 2 "2+6" questions
            '6 + 2', '6 + 2',  // 2 "6+2" questions
            // Level 1 belts
            '0 + 0', '1 + 1',  // white belt
            '0 + 1', '1 + 0',  // yellow belt
            '0 + 2', '2 + 0',  // green belt
            '0 + 3', '3 + 0',  // blue belt
            '0 + 4', '4 + 0',  // red belt
            '0 + 5', '5 + 0',  // brown belt
            // Level 2 belts
            '1 + 1',  // Level 2 white belt
            '1 + 2', '2 + 1',  // Level 2 yellow belt
            '1 + 3', '3 + 1',  // Level 2 green belt
            '1 + 4', '4 + 1',  // Level 2 blue belt
            '2 + 2',
            '2 + 3', '3 + 2',  // Level 2 brown belt
            // Level 3 belts
            '0 + 6', '6 + 0',  // white belt
            '0 + 7', '7 + 0',  // yellow belt
            '0 + 8', '8 + 0',  // green belt
            '0 + 9', '9 + 0',  // blue belt
            '0 + 10', '10 + 0', // red belt
            '1 + 5', '5 + 1',  // brown belt
            // Level 4 belts
            '1 + 6', '6 + 1',  // white belt
            '1 + 7', '7 + 1',  // yellow belt
            '1 + 8', '8 + 1',  // green belt
            '1 + 9', '9 + 1',  // blue belt
            '2 + 4', '4 + 2',  // red belt
            '2 + 5', '5 + 2',  // brown belt
            // Number recognition questions
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9
          ];
          const remainingPool = level5Pool.filter(q => q !== '2 + 6' && q !== '6 + 2');
          const selectedQuestions = [];
          selectedQuestions.push('2 + 6', '2 + 6', '6 + 2', '6 + 2');
          for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * remainingPool.length);
            selectedQuestions.push(remainingPool[randomIndex]);
            remainingPool.splice(randomIndex, 1);
          }
          finalSequence = selectedQuestions;
        } else if (isLevel6) {
          // Level 6 white belt: 2 "3+6" + 2 "6+3" + 6 from previous levels
          const level6Pool = [
            '3 + 6', '3 + 6',  // 2 "3+6" questions
            '6 + 3', '6 + 3',  // 2 "6+3" questions
            // Level 1 belts
            '0 + 0', '1 + 1',  // white belt
            '0 + 1', '1 + 0',  // yellow belt
            '0 + 2', '2 + 0',  // green belt
            '0 + 3', '3 + 0',  // blue belt
            '0 + 4', '4 + 0',  // red belt
            '0 + 5', '5 + 0',  // brown belt
            // Level 2 belts
            '1 + 1',  // Level 2 white belt
            '1 + 2', '2 + 1',  // Level 2 yellow belt
            '1 + 3', '3 + 1',  // Level 2 green belt
            '1 + 4', '4 + 1',  // Level 2 blue belt
            '2 + 2', // Level 2 red belt
            '2 + 3', '3 + 2',  // Level 2 brown belt
            // Level 3 belts
            '0 + 6', '6 + 0',  // white belt
            '0 + 7', '7 + 0',  // yellow belt
            '0 + 8', '8 + 0',  // green belt
            '0 + 9', '9 + 0',  // blue belt
            '0 + 10', '10 + 0', // red belt
            '1 + 5', '5 + 1',  // brown belt
            // Level 4 belts
            '1 + 6', '6 + 1',  // white belt
            '1 + 7', '7 + 1',  // yellow belt
            '1 + 8', '8 + 1',  // green belt
            '1 + 9', '9 + 1',  // blue belt
            '2 + 4', '4 + 2',  // red belt
            '2 + 5', '5 + 2',  // brown belt
            // Level 5 belts
            '2 + 6', '6 + 2',  // white belt
            '2 + 7', '7 + 2',  // yellow belt
            '2 + 8', '8 + 2',  // green belt
            '3 + 3',  // blue belt
            '3 + 4', '4 + 3',  // red belt
            '3 + 5', '5 + 3',  // brown belt
            // Number recognition questions
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9
          ];
          const remainingPool = level6Pool.filter(q => q !== '3 + 6' && q !== '6 + 3');
          const selectedQuestions = [];
          selectedQuestions.push('3 + 6', '3 + 6', '6 + 3', '6 + 3');
          for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * remainingPool.length);
            selectedQuestions.push(remainingPool[randomIndex]);
            remainingPool.splice(randomIndex, 1);
          }
          finalSequence = selectedQuestions;
        } else {
          // Level 1 white belt: 2 "0+0" questions + 8 numbers 0-9
          finalSequence = [
            '0 + 0', '0 + 0',  // 2 "0+0" questions
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9  // 10 numbers
          ];
        }
        // Create a guaranteed non-consecutive sequence (no consecutive identical questions of any type)
        let shuffledSequence;
        let attempts = 0;
        const maxAttempts = 100;
        
        do {
          // Shuffle the sequence
          shuffledSequence = [...finalSequence].sort(() => Math.random() - 0.5);
          attempts++;
          
          // Check if we have consecutive identical questions of any type
          let hasConsecutive = false;
          for (let i = 0; i < shuffledSequence.length - 1; i++) {
            if (shuffledSequence[i] === shuffledSequence[i + 1]) {
              hasConsecutive = true;
              break;
            }
          }
          
          // If no consecutive identical questions, we're good
          if (!hasConsecutive) {
            break;
          }
        } while (attempts < maxAttempts);
        
        // If we still have consecutive identical questions after max attempts, force separate them
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            // Find a different question to swap with
            const swapIndex = shuffledSequence.findIndex((q, idx) => 
              idx > i + 1 && q !== shuffledSequence[i]
            );
            if (swapIndex !== -1) {
              [shuffledSequence[i + 1], shuffledSequence[swapIndex]] = 
              [shuffledSequence[swapIndex], shuffledSequence[i + 1]];
            }
          }
        }
        
              // CRITICAL: Verify no consecutive identical questions of any type
      let hasConsecutive = false;
      for (let i = 0; i < shuffledSequence.length - 1; i++) {
        if (shuffledSequence[i] === shuffledSequence[i + 1]) {
          hasConsecutive = true;
          break;
        }
      }
      
      // If we still have consecutive questions after all attempts, force fix them
      if (hasConsecutive) {
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            // Find a different question to swap with
            for (let j = i + 2; j < shuffledSequence.length; j++) {
              if (shuffledSequence[j] !== shuffledSequence[i]) {
                // Swap to break the consecutive pattern
                [shuffledSequence[i + 1], shuffledSequence[j]] = [shuffledSequence[j], shuffledSequence[i + 1]];
                break;
              }
            }
          }
        }
        
        // Final verification
        hasConsecutive = false;
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            hasConsecutive = true;
            break;
          }
        }
      }
      
      // Store the shuffled sequence for this quiz session
      window.whiteBeltFullSequence = shuffledSequence;
      // Reset the question counter for this session
      window.whiteBeltQuestionCounter = 0;
            // Track how many core questions we've asked
            if (isLevel1) {
              // Level 1: track "0+0" question
              window.whiteBeltZeroPlusZeroAsked = 0;
            } else if (isLevel2) {
              // Level 2: track "1+1" question
              window.whiteBeltOnePlusOneAsked = 0;
            } else if (isLevel3) {
              // Level 3: track "0+6" and "6+0" questions
              window.whiteBeltZeroPlusSixAsked = 0;
              window.whiteBeltSixPlusZeroAsked = 0;
            } else if (isLevel4) {
              // Level 4: track "1+6" and "6+1" questions
              window.whiteBeltOnePlusSixAsked = 0;
              window.whiteBeltSixPlusOneAsked = 0;
            } else if (isLevel5) {
              // Level 5: track "2+6" and "6+2" questions
              window.whiteBeltTwoPlusSixAsked = 0;
              window.whiteBeltSixPlusTwoAsked = 0;
            } else if (isLevel6) {
              // Level 6: track "3+6" and "6+3" questions
              window.whiteBeltThreePlusSixAsked = 0;
              window.whiteBeltSixPlusThreeAsked = 0;
            }
      }
    
    // Get the question for this position from the shuffled sequence
    let selectedQuestion = window.whiteBeltFullSequence[window.whiteBeltQuestionCounter];
    
          // CRITICAL FIX: Use a proper queue system to ensure no questions are repeated
      // BUT allow "0+0" or "1+1" questions to be asked twice (exactly 2 times total)
      while (askedQuestions && askedQuestions.has(selectedQuestion)) {
        // Special case: if this is a "0+0" or "1+1" question and we haven't asked 2 yet, allow it
        if ((selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1') && window.whiteBeltCoreQuestionsAsked < 2) {
          break;
        }
      
      window.whiteBeltQuestionCounter++;
      
      if (window.whiteBeltQuestionCounter >= window.whiteBeltFullSequence.length) {
        break;
      }
      
      selectedQuestion = window.whiteBeltFullSequence[window.whiteBeltQuestionCounter];
    }
    
    // CRITICAL FIX: AGGRESSIVELY prevent consecutive identical questions from EVER occurring
    // This is the main fix that ensures no consecutive identical questions can happen
    if (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion) {
      // Find ANY question in the sequence that's different from the last question
      let foundDifferentQuestion = false;
      
      // First, try to find a different question that hasn't been asked yet
      for (let i = 0; i < window.whiteBeltFullSequence.length; i++) {
        const candidateQuestion = window.whiteBeltFullSequence[i];
        if (candidateQuestion !== lastQuestion && 
            `${candidateQuestion}` !== lastQuestion && 
            !askedQuestions.has(candidateQuestion)) {
          selectedQuestion = candidateQuestion;
          window.whiteBeltQuestionCounter = i;
          foundDifferentQuestion = true;
          break;
        }
      }
      
      // If no unasked different question found, find ANY different question (even if asked before)
      if (!foundDifferentQuestion) {
        for (let i = 0; i < window.whiteBeltFullSequence.length; i++) {
          const candidateQuestion = window.whiteBeltFullSequence[i];
          if (candidateQuestion !== lastQuestion && `${candidateQuestion}` !== lastQuestion) {
            selectedQuestion = candidateQuestion;
            window.whiteBeltQuestionCounter = i;
            foundDifferentQuestion = true;
            break;
          }
        }
      }
      
      // If still no different question found, this should never happen with our sequence
      if (!foundDifferentQuestion) {
        // Force select the first question that's not the last question
        const firstDifferent = window.whiteBeltFullSequence.find(q => q !== lastQuestion);
        if (firstDifferent !== undefined) {
          selectedQuestion = firstDifferent;
          const foundIndex = window.whiteBeltFullSequence.indexOf(firstDifferent);
          if (foundIndex !== -1) {
            window.whiteBeltQuestionCounter = foundIndex;
          }
        }
      }
    }
    
    // ULTIMATE SAFETY CHECK: For the first question of any quiz, ensure it's NEVER the same as lastQuestion
    if (totalQuestions === 0 && (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion)) {

      
      // Find ANY question that's different from lastQuestion
      let forcedQuestion = null;
      for (let i = 0; i < window.whiteBeltFullSequence.length; i++) {
        const candidate = window.whiteBeltFullSequence[i];
        if (candidate !== lastQuestion && `${candidate}` !== lastQuestion) {
          forcedQuestion = candidate;
          window.whiteBeltQuestionCounter = i;
          break;
        }
      }
      
      if (forcedQuestion !== null) {
        selectedQuestion = forcedQuestion;

      }
    }
    
    // Increment the question counter for next time
    window.whiteBeltQuestionCounter++;
        // Track core questions asked based on level
        if (isLevel1) {
          // Level 1: track "0+0" and "1+1" questions
          if (selectedQuestion === '0 + 0') {
            window.whiteBeltZeroPlusZeroAsked++;
          } 
        } else if (isLevel2) {
          // Level 2: track "0+2" and "2+0" questions
          if (selectedQuestion === '1 + 1') {
            window.whiteBeltOnePlusOneAsked++;
          }
        } else if (isLevel3) {
          // Level 3: track "0+6" and "6+0" questions
          if (selectedQuestion === '0 + 6') {
            window.whiteBeltZeroPlusSixAsked++;
          } else if (selectedQuestion === '6 + 0') {
            window.whiteBeltSixPlusZeroAsked++;
          }
        } else if (isLevel4) {
          // Level 4: track "1+6" and "6+1" questions
          if (selectedQuestion === '1 + 6') {
            window.whiteBeltOnePlusSixAsked++;
          } else if (selectedQuestion === '6 + 1') {
            window.whiteBeltSixPlusOneAsked++;
          }
        } else if (isLevel5) {
          // Level 5: track "2+6" and "6+2" questions
          if (selectedQuestion === '2 + 6') {
            window.whiteBeltTwoPlusSixAsked++;
          } else if (selectedQuestion === '6 + 2') {
            window.whiteBeltSixPlusTwoAsked++;
          }
        } else if (isLevel6) {
          // Level 6: track "3+6" and "6+3" questions
          if (selectedQuestion === '3 + 6') {
            window.whiteBeltThreePlusSixAsked++;
          } else if (selectedQuestion === '6 + 3') {
            window.whiteBeltSixPlusThreeAsked++;
          }
        }
      if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' || selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '2 + 6' || selectedQuestion === '6 + 2' || selectedQuestion === '3 + 6' || selectedQuestion === '6 + 3' || selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1') {
        let questionObj;
        if (selectedQuestion === '0 + 0') {
          questionObj = currentFacts[0]; // Use the existing "0+0" fact
        } else if (selectedQuestion === '1 + 1') {
          // For "1+1", create a new question object
          questionObj = { 
            question: '1 + 1', 
            correctAnswer: 2, 
            answers: [0, 1, 2, 3], 
            multiplier: 1, 
            difficulty: 'white' 
          };
        } else if (selectedQuestion === '0 + 6') {
          // For "0+6", create a new question object
          questionObj = { 
            question: '0 + 6', 
            correctAnswer: 6, 
            answers: [5, 6, 7, 8], 
            multiplier: 6, 
            difficulty: 'white' 
          };
        } else if (selectedQuestion === '6 + 0') {
          // For "6+0", create a new question object
          questionObj = { 
            question: '6 + 0', 
            correctAnswer: 6, 
            answers: [5, 6, 7, 8], 
            multiplier: 6, 
            difficulty: 'white' 
          };
        } else if (selectedQuestion === '1 + 6') {
          questionObj = { 
            question: '1 + 6', 
            correctAnswer: 7, 
            answers: [6, 7, 8, 9], 
            multiplier: 1, 
            difficulty: 'white' 
          };
        } else if (selectedQuestion === '6 + 1') {
          questionObj = { 
            question: '6 + 1', 
            correctAnswer: 7, 
            answers: [6, 7, 8, 9], 
            multiplier: 6, 
            difficulty: 'white' 
          };
        } else if (selectedQuestion === '2 + 6') {
          questionObj = { 
            question: '2 + 6', 
            correctAnswer: 8,
            answers: [7, 8, 9, 10],
            multiplier: 2,
            difficulty: 'white'
          };
        } else if (selectedQuestion === '6 + 2') {
          questionObj = { 
            question: '6 + 2', 
            correctAnswer: 8,
            answers: [7, 8, 9, 10],
            multiplier: 6,
            difficulty: 'white'
          }; 
        } else if (selectedQuestion === '3 + 6') { 
          questionObj = { 
            question: '3 + 6', 
            correctAnswer: 9,
            answers: [8, 9, 10, 11],
            multiplier: 3,
            difficulty: 'white'
          };
        } else if (selectedQuestion === '6 + 3') {
          questionObj = { 
            question: '6 + 3', 
            correctAnswer: 9,
            answers: [8, 9, 10, 11],
            multiplier: 6, 
            difficulty: 'white' 
          };
        }
        const dynamicAnswers = generateAnswers(questionObj.correctAnswer);
        const shuffledAnswers = [...dynamicAnswers].sort(() => Math.random() - 0.5);
        return { ...questionObj, answers: shuffledAnswers };
      } else {
        // It's a number recognition question or a question from previous level belts
        let selectedQuestionObj;
        if (typeof selectedQuestion === 'number') {
          // It's a number recognition question
          selectedQuestionObj = previousQuestions.find(q => q.question === `${selectedQuestion}`);
        } else {
          // It's a question from previous level belts (like "0+1", "1+0", etc.)
          // Find the question in the previousBeltQuestions
          for (const belt of ['white', 'yellow', 'green', 'blue', 'red', 'brown']) {
            const beltFacts = {
              'white': [{ question: '0 + 0', correctAnswer: 0, multiplier: 0, difficulty: 'white' }],
              'yellow': [
                { question: '0 + 1', correctAnswer: 1, multiplier: 1, difficulty: 'yellow' },
                { question: '1 + 0', correctAnswer: 1, multiplier: 1, difficulty: 'yellow' }
              ],
              'green': [
                { question: '0 + 2', correctAnswer: 2, multiplier: 2, difficulty: 'green' },
                { question: '2 + 0', correctAnswer: 2, multiplier: 2, difficulty: 'green' }
              ],
              'blue': [
                { question: '0 + 3', correctAnswer: 3, multiplier: 3, difficulty: 'blue' },
                { question: '3 + 0', correctAnswer: 3, multiplier: 3, difficulty: 'blue' }
              ],
              'red': [
                { question: '0 + 4', correctAnswer: 4, multiplier: 4, difficulty: 'red' },
                { question: '4 + 0', correctAnswer: 4, multiplier: 4, difficulty: 'red' }
              ],
              'brown': [
                { question: '0 + 5', correctAnswer: 5, multiplier: 5, difficulty: 'brown' },
                { question: '5 + 0', correctAnswer: 5, multiplier: 5, difficulty: 'brown' }
              ]
            };
            
            const found = beltFacts[belt].find(q => q.question === selectedQuestion);
            if (found) {
              selectedQuestionObj = found;
              break;
            }
          }
        }
        
        if (selectedQuestionObj) {
          const dynamicAnswers = generateAnswers(selectedQuestionObj.correctAnswer);
          const shuffledAnswers = [...dynamicAnswers].sort(() => Math.random() - 0.5);
          return { ...selectedQuestionObj, answers: shuffledAnswers };
        } else {
          // Fallback: create a basic question object
          // Fallback: create a basic question object with appropriate answer choices
          let correctAnswer, answerChoices;
          
          if (typeof selectedQuestion === 'number') {
            // It's a number recognition question
            correctAnswer = selectedQuestion;
            answerChoices = [selectedQuestion, selectedQuestion + 1, selectedQuestion - 1, selectedQuestion + 2];
          } else if (selectedQuestion.includes('+')) {
            // It's an addition question like "3 + 3"
            const parts = selectedQuestion.split('+').map(s => parseInt(s.trim()));
            correctAnswer = parts[0] + parts[1];

            // Create answer choices around the correct answer
            answerChoices = [
              correctAnswer,
              correctAnswer + 1,
              correctAnswer - 1,
              correctAnswer + 2
            ];
            return { question: selectedQuestion, correctAnswer: correctAnswer, answers: answerChoices, multiplier: parts[0], difficulty: 'white' };          
          } else {
            // Default fallback
            correctAnswer = 0;
            answerChoices = [0, 1, 2, 3];
          }
          
          return {
            question: selectedQuestion,
            correctAnswer: correctAnswer,
            answers: answerChoices,
            multiplier: 0,
            difficulty: 'white'
          };
        }
      }
  }
  
  // Special handling for Yellow Belt: 2 "0+1" + 2 "1+0" + 6 from white belt, total 10 questions
  if (difficulty === 'yellow') {
    // Check if this is Level 2 yellow belt
    const isLevel1 = selectedTable === 1;
    const isLevel2 = selectedTable === 2;
    const isLevel3 = selectedTable === 3; 
    const isLevel4 = selectedTable === 4;
    const isLevel5 = selectedTable === 5;
    const isLevel6 = selectedTable === 6;
    
    // Create a shuffled sequence that ensures exactly 2 "0+1", 2 "1+0", and 6 white belt questions
    if (!window.yellowBeltFullSequence) {
      
      let finalSequence;
      if (isLevel1) {
        // Level 1 yellow belt: 2 "0+1" + 2 "1+0" + 6 from white belt
        const level1Pool = [
          // Core facts: 2 "0+1" and 2 "1+0" questions
          '0 + 1', '0 + 1',  // 2 "0+1" questions
          '1 + 0', '1 + 0',  // 2 "1+0" questions
          // Questions from white belt
          '0 + 0',  // white belt addition questions
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        // Randomly select exactly 6 questions from the pool (excluding the 4 core facts)
        const remainingPool = level1Pool.filter(q => q !== '0 + 1' && q !== '1 + 0');
        const selectedQuestions = [];
        
        // Add the 4 core facts first
        selectedQuestions.push('0 + 1', '0 + 1', '1 + 0', '1 + 0');
        
        // Randomly select 6 more questions from the remaining pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } else if (isLevel2) {
        // Level 2 yellow belt: 2 "1+2" + 2 "2+1" + 6 from Level 1 belts and Level 2 white belt
        const level2Pool = [
          // Core facts: 2 "1+2" and 2 "2+1" questions
          '1 + 2', '1 + 2',  // 2 "1+2" questions
          '2 + 1', '2 + 1',  // 2 "2+1" questions
          // Questions from Level 1 belts
          '0 + 0',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Questions from Level 2 white belt
          '1 + 1',  // Level 2 white belt
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        // Randomly select exactly 6 questions from the pool (excluding the 4 core facts)
        const remainingPool = level2Pool.filter(q => q !== '1 + 2' && q !== '2 + 1');
        const selectedQuestions = [];
        
        // Add the 4 core facts first
        selectedQuestions.push('1 + 2', '1 + 2', '2 + 1', '2 + 1');
        
        // Randomly select 6 more questions from the remaining pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } else if (isLevel3) {
        // Level 3 yellow belt: 2 "0+7" + 2 "7+0" + 6 from previous level belts
        const level3Pool = [
          '0 + 7', '0 + 7',  // 2 "0+7" questions
          '7 + 0', '7 + 0',  // 2 "7+0" questions
          // Questions from previous level belts
          '0 + 0', '1 + 1', '2 + 2',  // white belt
          '0 + 1', '1 + 0', '1 + 2', '2 + 1',  // yellow belt
          '0 + 2', '2 + 0', '1 + 3', '3 + 1',  // green belt
          '0 + 3', '3 + 0', '1 + 4', '4 + 1',  // blue belt
          '0 + 4', '4 + 0', '2 + 2', '2 + 3', '3 + 2',  // red belt
          '0 + 5', '5 + 0',   // brown belt
          '0 + 6', '6 + 0',
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        const remainingPool = level3Pool.filter(q => q !== '0 + 7' && q !== '7 + 0');
        const selectedQuestions = [];
        selectedQuestions.push('0 + 7', '0 + 7', '7 + 0', '7 + 0');
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        finalSequence = selectedQuestions;
      } else if (isLevel4) {
        // Level 4 yellow belt: 2 "1+7" + 2 "7+1" + 6 from previous levels
        const level4Pool = [
          '1 + 7', '1 + 7',  // 2 "1+7" questions
          '7 + 1', '7 + 1',  // 2 "7+1" questions
          // Questions from previous levels (level 1-3 all belts + level 4 white belt)
          // Level 1 belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 2 belts
          '1 + 2', '2 + 1',  // yellow belt
          '1 + 3', '3 + 1',  // green belt
          '1 + 4', '4 + 1',  // blue belt
          '2 + 2',           // red belt
          '2 + 3', '3 + 2',  // black belt
          // Level 3 belts
          '0 + 6', '6 + 0',  // white belt
          '0 + 7', '7 + 0',  // yellow belt
          '0 + 8', '8 + 0',  // green belt
          '0 + 9', '9 + 0',  // blue belt
          '0 + 10', '10 + 0', // red belt
          '1 + 5', '5 + 1',  // brown belt
          // Level 4 belts (only white belt)
          '1 + 6', '6 + 1',  // white belt
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        const remainingPool = level4Pool.filter(q => q !== '1 + 7' && q !== '7 + 1');
        const selectedQuestions = [];
        
        // Add the core level 4 yellow belt questions
        selectedQuestions.push('1 + 7', '1 + 7', '7 + 1', '7 + 1');
        
        // Add 6 random questions from the remaining pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } else if (isLevel5) {
        // Level 5 yellow belt: 2 "2+7" + 2 "7+2" + 6 from previous levels
        const level5Pool = [
          '2 + 7', '2 + 7',  // 2 "2+7" questions
          '7 + 2', '7 + 2',  // 2 "7+2" questions
          // Questions from previous levels (level 1-4 all belts + level 5 white belt)
          // Level 1 belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 2 belts
          '1 + 2', '2 + 1',  // yellow belt
          '1 + 3', '3 + 1',  // green belt
          '1 + 4', '4 + 1',  // blue belt
          '2 + 2',           // red belt
          '2 + 3', '3 + 2',  // brown belt
          // Level 3 belts
          '0 + 6', '6 + 0',  // white belt
          '0 + 7', '7 + 0',  // yellow belt
          '0 + 8', '8 + 0',  // green belt
          '0 + 9', '9 + 0',  // blue belt
          '0 + 10', '10 + 0', // red belt
          '1 + 5', '5 + 1',  // brown belt
          // Level 4 belts
          '1 + 6', '6 + 1',  // white belt
          '1 + 7', '7 + 1',  // yellow belt
          '1 + 8', '8 + 1',  // green belt
          '1 + 9', '9 + 1',  // blue belt
          '2 + 4', '4 + 2',  // red belt
          '2 + 5', '5 + 2',  // brown belt
          // Level 5 belts (only white belt)
          '2 + 6', '6 + 2',   // white belt
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        const remainingPool = level5Pool.filter(q => q !== '2 + 7' && q !== '7 + 2');
        const selectedQuestions = [];
        // Add the core level 5 yellow belt questions
        selectedQuestions.push('2 + 7', '2 + 7', '7 + 2', '7 + 2');
        // Add 6 random questions from the remaining pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        finalSequence = selectedQuestions;
      } else if (isLevel6) {
        // Level 6 yellow belt: 2 "3+7" + 2 "7+3" + 6 from previous levels
        const level6Pool = [
          '3 + 7', '3 + 7',  // 2 "3+7" questions
          '7 + 3', '7 + 3',  // 2 "7+3" questions
          // Questions from previous levels (level 1-5 all belts + level 6 white belt)
          // Level 1 belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 2 belts
          '1 + 2', '2 + 1',  // yellow belt
          '1 + 3', '3 + 1',  // green belt
          '1 + 4', '4 + 1',  // blue belt
          '2 + 2',           // red belt
          '2 + 3', '3 + 2',  // brown belt
          // Level 3 belts
          '0 + 6', '6 + 0',  // white belt
          '0 + 7', '7 + 0',  // yellow belt
          '0 + 8', '8 + 0',  // green belt
          '0 + 9', '9 + 0',  // blue belt
          '0 + 10', '10 + 0', // red belt
          '1 + 5', '5 + 1',  // brown belt
          // Level 4 belts
          '1 + 6', '6 + 1',  // white belt
          '1 + 7', '7 + 1',  // yellow belt
          '1 + 8', '8 + 1',  // green belt
          '1 + 9', '9 + 1',  // blue belt
          '2 + 4', '4 + 2',  // red belt
          '2 + 5', '5 + 2',  // brown belt
          // Level 5 belts
          '2 + 6', '6 + 2',  // white belt
          '2 + 7', '7 + 2',  // yellow belt
          '2 + 8', '8 + 2',  // green belt
          '3 + 3',  // blue belt
          '3 + 4', '4 + 3',  // red belt
          '3 + 5', '5 + 3',  // brown belt
          // Level 6 belts (only white belt)
          '3 + 6', '6 + 3',   // white belt
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        const remainingPool = level6Pool.filter(q => q !== '3 + 7' && q !== '7 + 3');
        const selectedQuestions = [];
        
        // Add the core level 6 yellow belt questions
        selectedQuestions.push('3 + 7', '3 + 7', '7 + 3', '7 + 3');
        
        // Add 6 random questions from the remaining pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } else {
        // Level 1 yellow belt: 2 "0+1" + 2 "1+0" + 6 from white belt
        const baseSequence = [
          '0 + 1', '0 + 1',  // 2 "0+1" questions
          '1 + 0', '1 + 0',  // 2 "1+0" questions
          '0 + 0', '0 + 0',  // 2 "0+0" questions from white belt
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9  // 10 numbers from white belt, but we'll only use 4
        ];
        
        // Randomly select exactly 4 numbers to ensure total of 10 questions
        const selectedNumbers = [];
        const availableNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 4; i++) {
          const randomIndex = Math.floor(Math.random() * availableNumbers.length);
          selectedNumbers.push(availableNumbers[randomIndex]);
          availableNumbers.splice(randomIndex, 1);
        }
        
        // Create the final sequence with exactly 10 questions
        finalSequence = [
          '0 + 1', '0 + 1',  // 2 "0+1" questions
          '1 + 0', '1 + 0',  // 2 "1+0" questions
          '0 + 0', '0 + 0',  // 2 "0+0" questions from white belt
          ...selectedNumbers  // 4 randomly selected numbers from white belt
        ];
      }
      
      // Create a guaranteed non-consecutive sequence (no consecutive identical questions of any type)
      let shuffledSequence;
      let attempts = 0;
      const maxAttempts = 100;
      
      do {
        // Shuffle the sequence
        shuffledSequence = [...finalSequence].sort(() => Math.random() - 0.5);
        attempts++;
        
        // Check if we have consecutive identical questions of any type
        let hasConsecutive = false;
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            hasConsecutive = true;
            break;
          }
        }
        
        // If no consecutive identical questions, we're good
        if (!hasConsecutive) {
          break;
        }
      } while (attempts < maxAttempts);
      
      // CRITICAL: Verify no consecutive identical questions of any type
      let hasConsecutive = false;
      for (let i = 0; i < shuffledSequence.length - 1; i++) {
        if (shuffledSequence[i] === shuffledSequence[i + 1]) {
          hasConsecutive = true;
          break;
        }
      }
      // If we still have consecutive questions after all attempts, force fix them
      if (hasConsecutive) {
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            // Find a different question to swap with
            for (let j = i + 2; j < shuffledSequence.length; j++) {
              if (shuffledSequence[j] !== shuffledSequence[i]) {
                // Swap to break the consecutive pattern
                [shuffledSequence[i + 1], shuffledSequence[j]] = [shuffledSequence[j], shuffledSequence[i + 1]];
                break;
              }
            }
          }
        }
        
        // Final verification
        hasConsecutive = false;
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            hasConsecutive = true;
            break;
          }
        }
      }
      
      // Store the shuffled sequence for this quiz session
      window.yellowBeltFullSequence = shuffledSequence;
      // Reset the question counter for this session
      window.yellowBeltQuestionCounter = 0;
      // Track how many core questions we've asked
      // Level 1: track "0+1" and "1+0" questions
      if (isLevel1) {
        window.yellowBeltZeroPlusOneAsked = 0;
        window.yellowBeltOnePlusZeroAsked = 0;
      } else if (isLevel2) {
        // Level 2: track "1+2" and "2+1" questions
        window.yellowBeltOnePlusTwoAsked = 0;
        window.yellowBeltTwoPlusOneAsked = 0;
      } else if (isLevel3) {
        // Level 3: track "0+7" and "7+0" questions
        window.yellowBeltZeroPlusSevenAsked = 0;
        window.yellowBeltSevenPlusZeroAsked = 0;
      } else if (isLevel4) {
        // Level 4: track "1+7" and "7+1" questions
        window.yellowBeltOnePlusSevenAsked = 0;
        window.yellowBeltSevenPlusOneAsked = 0;
      } else if (isLevel5) {
        // Level 5: track "2+7" and "7+2" questions
        window.yellowBeltTwoPlusSevenAsked = 0;
        window.yellowBeltSevenPlusTwoAsked = 0;
      } else if (isLevel6) {
        // Level 6: track "3+7" and "7+3" questions
        window.yellowBeltThreePlusSevenAsked = 0;
        window.yellowBeltSevenPlusThreeAsked = 0;
      } else {
        // Level 1: track "0+1" and "1+0" questions
        window.yellowBeltZeroPlusOneAsked = 0;
        window.yellowBeltOnePlusZeroAsked = 0;
      }
    }
    
    // Get the question for this position from the shuffled sequence
    let selectedQuestion = window.yellowBeltFullSequence[window.yellowBeltQuestionCounter];
    
    // CRITICAL FIX: AGGRESSIVELY prevent consecutive identical questions from EVER occurring
    // This is the main fix that ensures no consecutive identical questions can happen
    if (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion) {
      // Find ANY question in the sequence that's different from the last question
      let foundDifferentQuestion = false;
      
      // First, try to find a different question that hasn't been asked yet
      for (let i = 0; i < window.yellowBeltFullSequence.length; i++) {
        const candidateQuestion = window.yellowBeltFullSequence[i];
        if (candidateQuestion !== lastQuestion && 
            `${candidateQuestion}` !== lastQuestion && 
            !askedQuestions.has(candidateQuestion)) {
          selectedQuestion = candidateQuestion;
          window.yellowBeltQuestionCounter = i;
          foundDifferentQuestion = true;
          break;
        }
      }
      
      // If no unasked different question found, find ANY different question (even if asked before)
      if (!foundDifferentQuestion) {
        for (let i = 0; i < window.yellowBeltFullSequence.length; i++) {
          const candidateQuestion = window.yellowBeltFullSequence[i];
          if (candidateQuestion !== lastQuestion && `${candidateQuestion}` !== lastQuestion) {
            selectedQuestion = candidateQuestion;
            window.yellowBeltQuestionCounter = i;
            foundDifferentQuestion = true;
            break;
          }
        }
      }
      
      // If still no different question found, this should never happen with our sequence
      if (!foundDifferentQuestion) {
        // Force select the first question that's not the last question
        const firstDifferent = window.yellowBeltFullSequence.find(q => q !== lastQuestion);
        if (firstDifferent !== undefined) {
          selectedQuestion = firstDifferent;
          const foundIndex = window.yellowBeltFullSequence.indexOf(firstDifferent);
          if (foundIndex !== -1) {
            window.yellowBeltQuestionCounter = foundIndex;
          }
        }
      }
    }
    
    // ULTIMATE SAFETY CHECK: For the first question of any quiz, ensure it's NEVER the same as lastQuestion
    if (totalQuestions === 0 && (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion)) {
      // Find ANY question that's different from lastQuestion
      let forcedQuestion = null;
      for (let i = 0; i < window.yellowBeltFullSequence.length; i++) {
        const candidate = window.yellowBeltFullSequence[i];
        if (candidate !== lastQuestion && `${candidate}` !== lastQuestion) {
          forcedQuestion = candidate;
          window.yellowBeltQuestionCounter = i;
          break;
        }
      }
      
      if (forcedQuestion !== null) {
        selectedQuestion = forcedQuestion;
      }
    }
    
    // Increment the question counter for next time
    window.yellowBeltQuestionCounter++;
    
    // Track core questions asked based on level
    // Level 1: track "0+1" and "1+0" questions
    if (isLevel1) {
      if (selectedQuestion === '0 + 1') {
        window.yellowBeltZeroPlusOneAsked++;
      } else if (selectedQuestion === '1 + 0') {
        window.yellowBeltOnePlusZeroAsked++;
      }
    } else if (isLevel2) {
      // Level 2: track "1+2" and "2+1" questions
      if (selectedQuestion === '1 + 2') {
        window.yellowBeltOnePlusTwoAsked++;
      } else if (selectedQuestion === '2 + 1') {
        window.yellowBeltTwoPlusOneAsked++;
      }
    } else if (isLevel3) {
      // Level 3: track "0+7" and "7+0" questions
      if (selectedQuestion === '0 + 7') {
        window.yellowBeltZeroPlusSevenAsked++;
      } else if (selectedQuestion === '7 + 0') {
        window.yellowBeltSevenPlusZeroAsked++;
      }
    } else if (isLevel4) {
      // Level 4: track "1+7" and "7+1" questions
      if (selectedQuestion === '1 + 7') {
        window.yellowBeltOnePlusSevenAsked++;
      } else if (selectedQuestion === '7 + 1') {
        window.yellowBeltSevenPlusOneAsked++;
      }
    } else if (isLevel5) {
      // Level 5: track "2+7" and "7+2" questions
      if (selectedQuestion === '2 + 7') {
        window.yellowBeltTwoPlusSevenAsked++;
      } else if (selectedQuestion === '7 + 2') {
        window.yellowBeltSevenPlusTwoAsked++;
      }
    } else if (isLevel6) {
      // Level 6: track "3+7" and "7+3" questions
      if (selectedQuestion === '3 + 7') {
        window.yellowBeltThreePlusSevenAsked++;
      } else if (selectedQuestion === '7 + 3') {
        window.yellowBeltSevenPlusThreeAsked++;
      }
    } else {
      // Level 1: track "0+1" and "1+0" questions
      if (selectedQuestion === '0 + 1') {
        window.yellowBeltZeroPlusOneAsked++;
      } else if (selectedQuestion === '1 + 0') {
        window.yellowBeltOnePlusZeroAsked++;
      }
    }
    
    // Return the appropriate question object based on the selected question
    if (isLevel1) {
      // Level 1 yellow belt questions
      if (selectedQuestion === '0 + 1') {
        // It's a "0+1" question
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 1', correctAnswer: 1, answers: shuffledAnswers, multiplier: 0, difficulty: 'yellow' };
      } else if (selectedQuestion === '1 + 0') {
        // It's a "1+0" question
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '1 + 0', correctAnswer: 1, answers: shuffledAnswers, multiplier: 1, difficulty: 'yellow' };
      } else if (selectedQuestion === '0 + 0') {
        // It's a white belt addition question
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 0', correctAnswer: 0, answers: shuffledAnswers, multiplier: 0, difficulty: 'yellow' };
      } else {
        // It's a number recognition question
        const num = parseInt(selectedQuestion);
        const shuffledAnswers = [num, (num + 1) % 10, (num + 2) % 10, (num + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: num, answers: shuffledAnswers, multiplier: num, difficulty: 'yellow' };
      }
    } else if (isLevel2) {
      // Level 2 yellow belt questions
      if (selectedQuestion === '1 + 2') {
        // It's a "1+2" question
        const shuffledAnswers = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
        return { question: '1 + 2', correctAnswer: 3, answers: shuffledAnswers, multiplier: 1, difficulty: 'yellow' };
      } else if (selectedQuestion === '2 + 1') {
        // It's a "2+1" question
        const shuffledAnswers = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
        return { question: '2 + 1', correctAnswer: 3, answers: shuffledAnswers, multiplier: 2, difficulty: 'yellow' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || 
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '0 + 3' || 
                 selectedQuestion === '3 + 0' || selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || 
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '1 + 1') {
        // It's a question from Level 1 belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'yellow' };
        }
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'yellow' };
      }
      return { question: selectedQuestion, correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' };

    } else if (isLevel3) {
      // Level 3 yellow belt questions - ADD THIS SECTION
      if (selectedQuestion === '0 + 7') {
        // It's a "0+7" question
        const shuffledAnswers = [6, 7, 8, 9].sort(() => Math.random() - 0.5);
        return { question: '0 + 7', correctAnswer: 7, answers: shuffledAnswers, multiplier: 7, difficulty: 'yellow' };
      } else if (selectedQuestion === '7 + 0') {
        // It's a "7+0" question
        const shuffledAnswers = [6, 7, 8, 9].sort(() => Math.random() - 0.5);
        return { question: '7 + 0', correctAnswer: 7, answers: shuffledAnswers, multiplier: 7, difficulty: 'yellow' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' || selectedQuestion === '2 + 2' ||
                 selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                 selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' ) {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'yellow' };
        }
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'yellow' };
      }
      return { question: selectedQuestion, correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' };

    } else if (isLevel4) {
      // Level 4 yellow belt questions
      if (selectedQuestion === '1 + 7') {
        // It's a "1+7" question
        const shuffledAnswers = [7, 8, 9, 10].sort(() => Math.random() - 0.5);
        return { question: '1 + 7', correctAnswer: 8, answers: shuffledAnswers, multiplier: 1, difficulty: 'yellow' };
      } else if (selectedQuestion === '7 + 1') {
        // It's a "7+1" question
        const shuffledAnswers = [7, 8, 9, 10].sort(() => Math.random() - 0.5);
        return { question: '7 + 1', correctAnswer: 8, answers: shuffledAnswers, multiplier: 7, difficulty: 'yellow' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' || selectedQuestion === '2 + 2' ||
                 selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                 selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' ||
                 selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' || selectedQuestion === '7 + 0' || 
                 selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' ||
                 selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' || selectedQuestion === '0 + 10' || selectedQuestion === '10 + 0' ||
                 selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' || selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1') {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'yellow' };
        }
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'yellow' };
      }
      return { question: selectedQuestion, correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' };

    } else if (isLevel5) {
      // Level 5 yellow belt questions
      if (selectedQuestion === '2 + 7') {
        // It's a "2+7" question
        const shuffledAnswers = [8, 9, 10, 11].sort(() => Math.random() - 0.5);
        return { question: '2 + 7', correctAnswer: 9, answers: shuffledAnswers, multiplier: 2, difficulty: 'yellow' };
      } else if (selectedQuestion === '7 + 2') {
        // It's a "7+2" question
        const shuffledAnswers = [8, 9, 10, 11].sort(() => Math.random() - 0.5);
        return { question: '7 + 2', correctAnswer: 9, answers: shuffledAnswers, multiplier: 7, difficulty: 'yellow' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' || selectedQuestion === '2 + 2' ||
                 selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                 selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' || selectedQuestion === '3 + 4' || selectedQuestion === '4 + 3' ||
                 selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' || selectedQuestion === '7 + 0' ||
                 selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' || selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' ||
                 selectedQuestion === '0 + 10' || selectedQuestion === '10 + 0' || selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' ||
                 selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' || selectedQuestion === '1 + 7' || selectedQuestion === '7 + 1' ||
                 selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' || selectedQuestion === '1 + 9' || selectedQuestion === '9 + 1' ||
                 selectedQuestion === '2 + 4' || selectedQuestion === '4 + 2' || selectedQuestion === '2 + 5' || selectedQuestion === '5 + 2' ||
                 selectedQuestion === '2 + 6' || selectedQuestion === '6 + 2') {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'yellow' };
        }
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'yellow' };
      }
      return { question: selectedQuestion, correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' };

    } else if (isLevel6) {
      // Level 6 yellow belt questions - ADD THIS SECTION
      if (selectedQuestion === '3 + 7') {
        // It's a "3+7" question
        const shuffledAnswers = [8, 9, 10, 11].sort(() => Math.random() - 0.5);
        return { question: '3 + 7', correctAnswer: 10, answers: shuffledAnswers, multiplier: 2, difficulty: 'yellow' };
      } else if (selectedQuestion === '7 + 3') {
        // It's a "7+3" question
        const shuffledAnswers = [8, 9, 10, 11].sort(() => Math.random() - 0.5);
        return { question: '7 + 3', correctAnswer: 10, answers: shuffledAnswers, multiplier: 7, difficulty: 'yellow' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' || selectedQuestion === '2 + 2' ||
                 selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                 selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' || selectedQuestion === '3 + 4' || selectedQuestion === '4 + 3' ||
                 selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' || selectedQuestion === '7 + 0' ||
                 selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' || selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' ||
                 selectedQuestion === '0 + 10' || selectedQuestion === '10 + 0' || selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' ||
                 selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' || selectedQuestion === '1 + 7' || selectedQuestion === '7 + 1' ||
                 selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' || selectedQuestion === '1 + 9' || selectedQuestion === '9 + 1' ||
                 selectedQuestion === '2 + 4' || selectedQuestion === '4 + 2' || selectedQuestion === '2 + 5' || selectedQuestion === '5 + 2' ||
                 selectedQuestion === '2 + 6' || selectedQuestion === '6 + 2' || selectedQuestion === '2 + 7' || selectedQuestion === '7 + 2' || 
                 selectedQuestion === '2 + 8' || selectedQuestion === '8 + 2' || selectedQuestion === '3 + 3' || selectedQuestion === '3 + 4' || 
                 selectedQuestion === '4 + 3' || selectedQuestion === '3 + 5' || selectedQuestion === '5 + 3' || selectedQuestion === '3 + 6' || 
                 selectedQuestion === '6 + 3') {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'yellow' };
        }
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'yellow' };
      }
      return { question: selectedQuestion, correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' };

    } else {
      // Level 1 yellow belt questions
      if (selectedQuestion === '0 + 1') {
        // It's a "0+1" question
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 1', correctAnswer: 1, answers: shuffledAnswers, multiplier: 0, difficulty: 'yellow' };
      } else if (selectedQuestion === '1 + 0') {
        // It's a "1+0" question
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '1 + 0', correctAnswer: 1, answers: shuffledAnswers, multiplier: 1, difficulty: 'yellow' };
      } else if (selectedQuestion === '0 + 0') {
        // It's a "0+0" question from white belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 0', correctAnswer: 0, answers: shuffledAnswers, multiplier: 0, difficulty: 'yellow' };
      } else {
        // It's a number recognition question from white belt
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'yellow' };
      }
    }
  }
  // Special handling for Green Belt: 2 "2+0" + 2 "0+2" + 6 from yellow/white belt, total 10 questions
  if (difficulty === 'green') {
    // Check if this is Level 2 green belt
    const isLevel2 = selectedTable === 2;
    const isLevel3 = selectedTable === 3; 
    const isLevel4 = selectedTable === 4;
    const isLevel5 = selectedTable === 5;
    const isLevel6 = selectedTable === 6;
    
    // Create a shuffled sequence that ensures exactly 2 "2+0", 2 "0+2", and 6 questions from yellow/white belt
    if (!window.greenBeltFullSequence) {
      let finalSequence;
      if (isLevel2) {
        // Level 2 green belt: 2 "1+3" + 2 "3+1" + 6 from Level 1 belts and Level 2 white/yellow belts
        const level2Pool = [
          // Core facts: 2 "1+3" and 2 "3+1" questions
          '1 + 3', '1 + 3',  // 2 "1+3" questions
          '3 + 1', '3 + 1',  // 2 "3+1" questions
          // Questions from Level 1 belts
          '0 + 0',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Questions from Level 2 white and yellow belts
          '1 + 1',  // Level 2 white belt
          '1 + 2', '2 + 1',  // Level 2 yellow belt
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        // Randomly select exactly 6 questions from the pool (excluding the 4 core facts)
        const remainingPool = level2Pool.filter(q => q !== '1 + 3' && q !== '3 + 1');
        const selectedQuestions = [];
        
        // Add the 4 core facts first
        selectedQuestions.push('1 + 3', '1 + 3', '3 + 1', '3 + 1');
        
        // Randomly select 6 more questions from the remaining pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } 
      else if (isLevel3) {
        // Level 3 green belt: 2 "0+8" + 2 "8+0" + 6 from previous level belts
        const level3Pool = [
          '0 + 8', '0 + 8',  // 2 "0+8" questions
          '8 + 0', '8 + 0',  // 2 "8+0" questions
          // Questions from previous level belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0', '1 + 2', '2 + 1',  // yellow belt
          '0 + 2', '2 + 0', '1 + 3', '3 + 1',  // green belt
          '0 + 3', '3 + 0', '1 + 4', '4 + 1',  // blue belt
          '0 + 4', '4 + 0', '2 + 2', '2 + 3', '3 + 2',  // red belt
          '0 + 5', '5 + 0',   // brown belt
          '0 + 6', '6 + 0',
          '0 + 7', '7 + 0',
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        const remainingPool = level3Pool.filter(q => q !== '0 + 8' && q !== '8 + 0');
        const selectedQuestions = [];
        selectedQuestions.push('0 + 8', '0 + 8', '8 + 0', '8 + 0');
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        finalSequence = selectedQuestions;
      } else if (isLevel4) {
        // Level 4 green belt: 2 "1+8" + 2 "8+1" + 6 from previous levels
        const level4Pool = [
          '1 + 8', '1 + 8',  // 2 "1+8" questions
          '8 + 1', '8 + 1',  // 2 "8+1" questions
          // Questions from previous levels (level 1-3 all belts + level 4 white/yellow)
          // Level 1 belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 2 belts
          '1 + 2', '2 + 1',  // yellow belt
          '1 + 3', '3 + 1',  // green belt
          '1 + 4', '4 + 1',  // blue belt
          '2 + 2',           // red belt
          '2 + 3', '3 + 2',  // brown belt
          // Level 3 belts
          '0 + 6', '6 + 0',  // white belt
          '0 + 7', '7 + 0',  // yellow belt
          '0 + 8', '8 + 0',  // green belt
          '0 + 9', '9 + 0',  // blue belt
          '0 + 10', '10 + 0', // red belt
          '1 + 5', '5 + 1',  // brown belt
          // Level 4 belts
          '1 + 6', '6 + 1',  // white belt
          '1 + 7', '7 + 1',  // yellow belt
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        const remainingPool = level4Pool.filter(q => q !== '1 + 8' && q !== '8 + 1');
        const selectedQuestions = [];
        
        // Add the core level 4 green belt questions
        selectedQuestions.push('1 + 8', '1 + 8', '8 + 1', '8 + 1');
        
        // Add 6 random questions from the remaining pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } else if (isLevel5) { 
        // Level 5 green belt: 2 "2+8" + 2 "8+2" + 6 from previous levels
        const level5Pool = [
          '2 + 8', '2 + 8',  // 2 "2+8" questions
          '8 + 2', '8 + 2',  // 2 "8+2" questions
          // Questions from previous levels (level 1-4 all belts + level 5 white/yellow/green/blue)
          // Level 1 belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 2 belts
          '1 + 2', '2 + 1',  // yellow belt
          '1 + 3', '3 + 1',  // green belt
          '1 + 4', '4 + 1',  // blue belt
          '2 + 2',           // red belt
          '2 + 3', '3 + 2',  // brown belt
          // Level 3 belts
          '0 + 6', '6 + 0',  // white belt
          '0 + 7', '7 + 0',  // yellow belt
          '0 + 8', '8 + 0',  // green belt
          '0 + 9', '9 + 0',  // blue belt
          '0 + 10', '10 + 0', // red belt
          '1 + 5', '5 + 1',  // brown belt
          // Level 4 belts
          '1 + 6', '6 + 1',  // white belt
          '1 + 7', '7 + 1',  // yellow belt
          '1 + 8', '8 + 1',  // green belt
          '1 + 9', '9 + 1',  // blue belt
          '2 + 4', '4 + 2',  // red belt
          '2 + 5', '5 + 2',  // brown belt
          // Level 5 belts
          '2 + 6', '6 + 2',  // white belt
          '2 + 7', '7 + 2',  // yellow belt
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        const remainingPool = level5Pool.filter(q => q !== '2 + 8' && q !== '8 + 2');
        const selectedQuestions = [];
        selectedQuestions.push('2 + 8', '2 + 8', '8 + 2', '8 + 2');
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        finalSequence = selectedQuestions;
      } else if (isLevel6) {
        // Level 6 green belt: 2 "4+4" + 6 from previous levels
        const level6Pool = [
          '4 + 4', '4 + 4',  // 2 "4+4" questions
          // Questions from previous levels (level 1-5 all belts + level 6 white/yellow/green/blue)
          // Level 1 belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 2 belts
          '1 + 2', '2 + 1',  // yellow belt
          '1 + 3', '3 + 1',  // green belt
          '1 + 4', '4 + 1',  // blue belt
          '2 + 2',           // red belt
          '2 + 3', '3 + 2',  // brown belt
          // Level 3 belts
          '0 + 6', '6 + 0',  // white belt
          '0 + 7', '7 + 0',  // yellow belt
          '0 + 8', '8 + 0',  // green belt
          '0 + 9', '9 + 0',  // blue belt
          '0 + 10', '10 + 0', // red belt
          '1 + 5', '5 + 1',  // brown belt
          // Level 4 belts
          '1 + 6', '6 + 1',  // white belt
          '1 + 7', '7 + 1',  // yellow belt
          '1 + 8', '8 + 1',  // green belt
          '1 + 9', '9 + 1',  // blue belt
          '2 + 4', '4 + 2',  // red belt
          '2 + 5', '5 + 2',  // brown belt
          // Level 5 belts
          '2 + 6', '6 + 2',  // white belt
          '2 + 7', '7 + 2',  // yellow belt
          '2 + 8', '8 + 2',  // green belt
          '3 + 3',           // red belt
          '3 + 4', '4 + 3',  // brown belt
          '3 + 5', '5 + 3',  // brown belt
          // Level 6 belts
          '3 + 6', '6 + 3',  // white belt
          '3 + 7', '7 + 3',  // yellow belt
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        const remainingPool = level6Pool.filter(q => q !== '4 + 4');
        const selectedQuestions = [];
        selectedQuestions.push('4 + 4', '4 + 4');
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        finalSequence = selectedQuestions;
      } else {
        // Level 1 green belt: 2 "2+0" + 2 "0+2" + 6 from yellow/white belt
        const baseSequence = [
          '2 + 0', '2 + 0',  // 2 "2+0" questions
          '0 + 2', '0 + 2',  // 2 "0+2" questions
          '0 + 1', '0 + 1',  // 2 "0+1" questions from yellow belt
          '1 + 0', '1 + 0',  // 2 "1+0" questions from yellow belt
          '0 + 0', '0 + 0'   // 2 "0+0" questions from white belt
        ];
        
        // Randomly select exactly 6 questions from yellow/white belt to ensure total of 10 questions
        const selectedQuestions = [];
        const availableQuestions = [
          '0 + 1', '0 + 1',  // 2 "0+1" questions
          '1 + 0', '1 + 0',  // 2 "1+0" questions
          '0 + 0', '0 + 0',  // 2 "0+0" questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9  // 10 numbers from white belt
        ];
        
        // Randomly select 6 questions from the available pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * availableQuestions.length);
          selectedQuestions.push(availableQuestions[randomIndex]);
          availableQuestions.splice(randomIndex, 1);
        }
        
        // Create the final sequence with exactly 10 questions
        finalSequence = [
          '2 + 0', '2 + 0',  // 2 "2+0" questions
          '0 + 2', '0 + 2',  // 2 "0+2" questions
          ...selectedQuestions  // 6 randomly selected questions from yellow/white belt
        ];
      }
      
      // Create a guaranteed non-consecutive sequence (no consecutive identical questions of any type)
      let shuffledSequence;
      let attempts = 0;
      const maxAttempts = 100;
      
      do {
        // Shuffle the sequence
        shuffledSequence = [...finalSequence].sort(() => Math.random() - 0.5);
        attempts++;
        
        // Check if we have consecutive identical questions of any type
        let hasConsecutive = false;
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            hasConsecutive = true;
            break;
          }
        }
        
        // If no consecutive identical questions, we're good
        if (!hasConsecutive) {
          break;
        }
      } while (attempts < maxAttempts);
      
      // CRITICAL: Verify no consecutive identical questions of any type
      let hasConsecutive = false;
      for (let i = 0; i < shuffledSequence.length - 1; i++) {
        if (shuffledSequence[i] === shuffledSequence[i + 1]) {
          hasConsecutive = true;
          break;
        }
      }
      
      // If we still have consecutive questions after all attempts, force fix them
      if (hasConsecutive) {
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            // Find a different question to swap with
            for (let j = i + 2; j < shuffledSequence.length; j++) {
              if (shuffledSequence[j] !== shuffledSequence[i]) {
                // Swap to break the consecutive pattern
                [shuffledSequence[i + 1], shuffledSequence[j]] = [shuffledSequence[j], shuffledSequence[i + 1]];
                break;
              }
            }
          }
        }
        
        // Final verification
        hasConsecutive = false;
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            hasConsecutive = true;
            break;
          }
        }
      }
      
      // Store the shuffled sequence for this quiz session
      window.greenBeltFullSequence = shuffledSequence;
      // Reset the question counter for this session
      window.greenBeltQuestionCounter = 0;
      // Track how many core questions we've asked
      if (isLevel2) {
        // Level 2: track "1+3" and "3+1" questions
        window.greenBeltOnePlusThreeAsked = 0;
        window.greenBeltThreePlusOneAsked = 0;
      } else if (isLevel3) {
        // Level 3: track "0+8" and "8+0" questions
        window.greenBeltZeroPlusEightAsked = 0;
        window.greenBeltEightPlusZeroAsked = 0;
      } else if (isLevel4) {
        // Level 4: track "1+8" and "8+1" questions
        window.greenBeltOnePlusEightAsked = 0;
        window.greenBeltEightPlusOneAsked = 0;
      } else if (isLevel5) {
        // Level 5: track "2+8" and "8+2" questions
        window.greenBeltTwoPlusEightAsked = 0;
        window.greenBeltEightPlusTwoAsked = 0;
      } else if (isLevel6) {
        // Level 6: track "4+4" question
        window.greenBeltFourPlusFourAsked = 0;
      } else {
        // Level 1: track "2+0" and "0+2" questions
        window.greenBeltTwoPlusZeroAsked = 0;
        window.greenBeltZeroPlusTwoAsked = 0;
      }
    }
    
    // Get the question for this position from the shuffled sequence
    let selectedQuestion = window.greenBeltFullSequence[window.greenBeltQuestionCounter];
    
    // CRITICAL FIX: AGGRESSIVELY prevent consecutive identical questions from EVER occurring
    // This is the main fix that ensures no consecutive identical questions can happen
    if (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion) {
      // Find ANY question in the sequence that's different from the last question
      let foundDifferentQuestion = false;
      
      // First, try to find a different question that hasn't been asked yet
      for (let i = 0; i < window.greenBeltFullSequence.length; i++) {
        const candidateQuestion = window.greenBeltFullSequence[i];
        if (candidateQuestion !== lastQuestion && 
            `${candidateQuestion}` !== lastQuestion && 
            !askedQuestions.has(candidateQuestion)) {
          selectedQuestion = candidateQuestion;
          window.greenBeltQuestionCounter = i;
          foundDifferentQuestion = true;
          break;
        }
      }
      
      // If no unasked different question found, find ANY different question (even if asked before)
      if (!foundDifferentQuestion) {
        for (let i = 0; i < window.greenBeltFullSequence.length; i++) {
          const candidateQuestion = window.greenBeltFullSequence[i];
          if (candidateQuestion !== lastQuestion && `${candidateQuestion}` !== lastQuestion) {
            selectedQuestion = candidateQuestion;
            window.greenBeltQuestionCounter = i;
            foundDifferentQuestion = true;
            break;
          }
        }
      }
      
      // If still no different question found, this should never happen with our sequence
      if (!foundDifferentQuestion) {
        // Force select the first question that's not the last question
        const firstDifferent = window.greenBeltFullSequence.find(q => q !== lastQuestion);
        if (firstDifferent !== undefined) {
          selectedQuestion = firstDifferent;
          const foundIndex = window.greenBeltFullSequence.indexOf(firstDifferent);
          if (foundIndex !== -1) {
            window.greenBeltQuestionCounter = foundIndex;
          }
        }
      }
    }
    // ULTIMATE SAFETY CHECK: For the first question of any quiz, ensure it's NEVER the same as lastQuestion
    if (totalQuestions === 0 && (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion)) {
      // Find ANY question that's different from lastQuestion
      let forcedQuestion = null;
      for (let i = 0; i < window.greenBeltFullSequence.length; i++) {
        const candidate = window.greenBeltFullSequence[i];
        if (candidate !== lastQuestion && `${candidate}` !== lastQuestion) {
          forcedQuestion = candidate;
          window.greenBeltQuestionCounter = i;
          break;
        }
      }
      
      if (forcedQuestion !== null) {
        selectedQuestion = forcedQuestion;
      }
    }
    
    // Increment the question counter for next time
    window.greenBeltQuestionCounter++;
    
    // Track core questions asked based on level
    if (isLevel2) {
      // Level 2: track "1+3" and "3+1" questions
      if (selectedQuestion === '1 + 3') {
        window.greenBeltOnePlusThreeAsked++;
      } else if (selectedQuestion === '3 + 1') {
        window.greenBeltThreePlusOneAsked++;
      }
    } else if (isLevel3) {
      // Level 3: track "0+8" and "8+0" questions
      if (selectedQuestion === '0 + 8') {
        window.greenBeltZeroPlusEightAsked++;
      } else if (selectedQuestion === '8 + 0') {
        window.greenBeltEightPlusZeroAsked++;
      }
    } else if (isLevel4) {
      // Level 4: track "1+8" and "8+1" questions
      if (selectedQuestion === '1 + 8') {
        window.greenBeltOnePlusEightAsked++;
      } else if (selectedQuestion === '8 + 1') {
        window.greenBeltEightPlusOneAsked++;
      }
    } else if (isLevel5) {
      // Level 5: track "2+8" and "8+2" questions
      if (selectedQuestion === '2 + 8') {
        window.greenBeltTwoPlusEightAsked++;
      } else if (selectedQuestion === '8 + 2') {
        window.greenBeltEightPlusTwoAsked++;
      }
    } else if (isLevel6) {
      // Level 6: track "4+4" question
      if (selectedQuestion === '4 + 4') {
        window.greenBeltFourPlusFourAsked++;
      }
    } else {
      // Level 1: track "2+0" and "0+2" questions
      if (selectedQuestion === '2 + 0') {
        window.greenBeltTwoPlusZeroAsked++;
      } else if (selectedQuestion === '0 + 2') {
        window.greenBeltZeroPlusTwoAsked++;
      }
    }
    
    // Return the appropriate question object based on the selected question
    if (isLevel2) {
      // Level 2 green belt questions
      if (selectedQuestion === '1 + 3') {
        // It's a "1+3" question
        const shuffledAnswers = [2, 3, 4, 5].sort(() => Math.random() - 0.5);
        return { question: '1 + 3', correctAnswer: 4, answers: shuffledAnswers, multiplier: 1, difficulty: 'green' };
      } else if (selectedQuestion === '3 + 1') {
        // It's a "3+1" question
        const shuffledAnswers = [2, 3, 4, 5].sort(() => Math.random() - 0.5);
        return { question: '3 + 1', correctAnswer: 4, answers: shuffledAnswers, multiplier: 3, difficulty: 'green' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || 
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '0 + 3' || 
                 selectedQuestion === '3 + 0' || selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || 
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '1 + 1' ||
                 selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1') {
        // It's a question from Level 1 belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'green' };
        }
        return { question: selectedQuestion, correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'green' };
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'green' };
      }
    } else if (isLevel3) {
      // Level 3 green belt questions - ADD THIS SECTION
      if (selectedQuestion === '0 + 8') {
        // It's a "0+8" question
        const shuffledAnswers = [7, 8, 9, 10].sort(() => Math.random() - 0.5);
        return { question: '0 + 8', correctAnswer: 8, answers: shuffledAnswers, multiplier: 8, difficulty: 'green' };
      } else if (selectedQuestion === '8 + 0') {
        // It's a "8+0" question
        const shuffledAnswers = [7, 8, 9, 10].sort(() => Math.random() - 0.5);
        return { question: '8 + 0', correctAnswer: 8, answers: shuffledAnswers, multiplier: 8, difficulty: 'green' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' || selectedQuestion === '2 + 2' ||
                 selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                 selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' ||
                 selectedQuestion === '0 + 7' || selectedQuestion === '7 + 0') {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'green' };
        }
        return { question: selectedQuestion, correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'green' };
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'green' };
      }
     } else if (isLevel4) {
      // Level 4 green belt questions - ADD THIS SECTION
      if (selectedQuestion === '1 + 8') {
        // It's a "1+8" question
        const shuffledAnswers = [8, 9, 10, 11].sort(() => Math.random() - 0.5);
        return { question: '1 + 8', correctAnswer: 9, answers: shuffledAnswers, multiplier: 1, difficulty: 'green' };
      } else if (selectedQuestion === '8 + 1') {
        // It's a "8+1" question
        const shuffledAnswers = [8, 9, 10, 11].sort(() => Math.random() - 0.5);
        return { question: '8 + 1', correctAnswer: 9, answers: shuffledAnswers, multiplier: 8, difficulty: 'green' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' || selectedQuestion === '2 + 2' ||
                 selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                 selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' ||
                 selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' || selectedQuestion === '7 + 0' ||
                 selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' || selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' ||
                 selectedQuestion === '0 + 10' || selectedQuestion === '10 + 0' || selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' ||
                 selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' || selectedQuestion === '1 + 7' || selectedQuestion === '7 + 1') {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'green' };
        }
        return { question: selectedQuestion, correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'green' };
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'green' };
      }
    } else if (isLevel5) {
      // Level 5 green belt questions - ADD THIS SECTION
      if (selectedQuestion === '2 + 8') {
        // It's a "2+8" question
        const shuffledAnswers = [9, 10, 11, 12].sort(() => Math.random() - 0.5);
        return { question: '2 + 8', correctAnswer: 10, answers: shuffledAnswers, multiplier: 2, difficulty: 'green' };
      } else if (selectedQuestion === '8 + 2') {
        // It's a "8+2" question
        const shuffledAnswers = [9, 10, 11, 12].sort(() => Math.random() - 0.5);
        return { question: '8 + 2', correctAnswer: 10, answers: shuffledAnswers, multiplier: 8, difficulty: 'green' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' || selectedQuestion === '2 + 2' ||
                 selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                 selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '3 + 4' || selectedQuestion === '4 + 3' ||
                 selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' || selectedQuestion === '7 + 0' ||
                 selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' || selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' ||
                 selectedQuestion === '0 + 10' || selectedQuestion === '10 + 0' || selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' ||
                 selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' || selectedQuestion === '1 + 7' || selectedQuestion === '7 + 1' ||
                 selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' || selectedQuestion === '1 + 9' || selectedQuestion === '9 + 1' ||
                 selectedQuestion === '2 + 4' || selectedQuestion === '4 + 2' || selectedQuestion === '2 + 5' || selectedQuestion === '5 + 2' ||
                 selectedQuestion === '2 + 6' || selectedQuestion === '6 + 2' || selectedQuestion === '2 + 7' || selectedQuestion === '7 + 2') {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'green' };
        }
        return { question: selectedQuestion, correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'green' };
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'green' };
      }
    } else if (isLevel6) {
      // Level 6 green belt questions - ADD THIS SECTION
      console.log('DEBUG: Level 6 green belt - selectedQuestion:', selectedQuestion); // Add this line

      if (selectedQuestion === '4 + 4') {
        // It's a "4+4" question
        const shuffledAnswers = [6, 7, 8, 9].sort(() => Math.random() - 0.5);
        return { question: '4 + 4', correctAnswer: 8, answers: shuffledAnswers, multiplier: 4, difficulty: 'green' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' || selectedQuestion === '2 + 2' ||
                 selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                 selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '3 + 4' || selectedQuestion === '4 + 3' ||
                 selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' || selectedQuestion === '7 + 0' ||
                 selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' || selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' ||
                 selectedQuestion === '0 + 10' || selectedQuestion === '10 + 0' || selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' ||
                 selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' || selectedQuestion === '1 + 7' || selectedQuestion === '7 + 1' ||
                 selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' || selectedQuestion === '1 + 9' || selectedQuestion === '9 + 1' ||
                 selectedQuestion === '2 + 4' || selectedQuestion === '4 + 2' || selectedQuestion === '2 + 5' || selectedQuestion === '5 + 2' ||
                 selectedQuestion === '2 + 6' || selectedQuestion === '6 + 2' || selectedQuestion === '2 + 7' || selectedQuestion === '7 + 2' ||
                 selectedQuestion === '2 + 8' || selectedQuestion === '8 + 2' || selectedQuestion === '3 + 3' || selectedQuestion === '3 + 4' || 
                 selectedQuestion === '4 + 3' || selectedQuestion === '3 + 5' || selectedQuestion === '5 + 3' || selectedQuestion === '3 + 6' || 
                 selectedQuestion === '6 + 3' || selectedQuestion === '3 + 7' || selectedQuestion === '7 + 3' ) {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'green' };
        }
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'green' };
      }
      return { question: selectedQuestion, correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'green' };

     } else {
      // Level 1 green belt questions
      if (selectedQuestion === '2 + 0') {
        // It's a "2+0" question
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '2 + 0', correctAnswer: 2, answers: shuffledAnswers, multiplier: 2, difficulty: 'green' };
      } else if (selectedQuestion === '0 + 2') {
        // It's a "0+2" question
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 2', correctAnswer: 2, answers: shuffledAnswers, multiplier: 0, difficulty: 'green' };
      } else if (selectedQuestion === '0 + 1') {
        // It's a "0+1" question from yellow belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 1', correctAnswer: 1, answers: shuffledAnswers, multiplier: 1, difficulty: 'yellow' };
      } else if (selectedQuestion === '1 + 0') {
        // It's a "1+0" question from yellow belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '1 + 0', correctAnswer: 1, answers: shuffledAnswers, multiplier: 1, difficulty: 'yellow' };
      } else if (selectedQuestion === '0 + 0') {
        // It's a "0+0" question from white belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 0', correctAnswer: 0, answers: shuffledAnswers, multiplier: 0, difficulty: 'white' };
      } else {
        // It's a number recognition question from white belt
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'green' };
      }
    }
  }
  
  // Special handling for Blue Belt: 2 "0+3" + 2 "3+0" + 6 from white/yellow/green belt, total 10 questions
  if (difficulty === 'blue') {
    // Check if this is Level 2 blue belt
    const isLevel2 = selectedTable === 2;
    const isLevel3 = selectedTable === 3;
    const isLevel4 = selectedTable === 4;
    const isLevel5 = selectedTable === 5;
    const isLevel6 = selectedTable === 6;
    
    // Create a shuffled sequence that ensures exactly 2 "0+3", 2 "3+0", and 6 questions from white/yellow/green belt
    if (!window.blueBeltFullSequence) {
      let finalSequence;
      if (isLevel2) {
        // Level 2 blue belt: 2 "1+4" + 2 "4+1" + 6 from Level 1 belts and Level 2 white/yellow/green belts
        const level2Pool = [
          // Core facts: 2 "1+4" and 2 "4+1" questions
          '1 + 4', '1 + 4',  // 2 "1+4" questions
          '4 + 1', '4 + 1',  // 2 "4+1" questions
          // Questions from Level 1 belts
          '0 + 0',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Questions from Level 2 white, yellow, and green belts
          '1 + 1',  // Level 2 white belt
          '1 + 2', '2 + 1',  // Level 2 yellow belt
          '1 + 3', '3 + 1',  // Level 2 green belt
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        // Randomly select exactly 6 questions from the pool (excluding the 4 core facts)
        const remainingPool = level2Pool.filter(q => q !== '1 + 4' && q !== '4 + 1');
        const selectedQuestions = [];
        
        // Add the 4 core facts first
        selectedQuestions.push('1 + 4', '1 + 4', '4 + 1', '4 + 1');
        
        // Randomly select 6 more questions from the remaining pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } else if (isLevel3) {
        // Level 3 blue belt: 2 "0+9" + 2 "9+0" + 6 from previous level belts and white/yellow/green level 3
        const level3Pool = [
          // Core facts: 2 "0+9" and 2 "9+0" questions
          '0 + 9', '0 + 9',  // 2 "0+9" questions
          '9 + 0', '9 + 0',  // 2 "9+0" questions
          // Questions from previous level belts (expanded pool)
          '0 + 0', '1 + 1', '2 + 2',  // white belt
          '0 + 1', '1 + 0', '1 + 2', '2 + 1',  // yellow belt
          '0 + 2', '2 + 0', '1 + 3', '3 + 1',  // green belt
          '0 + 3', '3 + 0', '1 + 4', '4 + 1',  // blue belt
          '0 + 4', '4 + 0', '2 + 2', '2 + 3', '3 + 2',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 3 questions from white, yellow, green belts
          '0 + 6', '6 + 0',  // white belt level 3
          '0 + 7', '7 + 0',  // yellow belt level 3
          '0 + 8', '8 + 0',  // green belt level 3
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        // Randomly select exactly 6 questions from the pool (excluding the 4 core facts)
        const remainingPool = level3Pool.filter(q => q !== '0 + 9' && q !== '9 + 0');
        const selectedQuestions = [];
        
        // Add the 4 core facts first
        selectedQuestions.push('0 + 9', '0 + 9', '9 + 0', '9 + 0');
        
        // Randomly select 6 more questions from the remaining pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } else if (isLevel4) {
        // Level 4 blue belt: 2 "1+9" + 2 "9+1" + 6 from previous levels
        const level4Pool = [
          '1 + 9', '1 + 9',  // 2 "1+9" questions
          '9 + 1', '9 + 1',  // 2 "9+1" questions
          // Questions from previous levels (level 1-3 all belts + level 4 white/yellow/green)
          // Level 1 belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 2 belts
          '1 + 2', '2 + 1',  // yellow belt
          '1 + 3', '3 + 1',  // green belt
          '1 + 4', '4 + 1',  // blue belt
          '2 + 2',           // red belt
          '2 + 3', '3 + 2',  // brown belt
          // Level 3 belts
          '0 + 6', '6 + 0',  // white belt
          '0 + 7', '7 + 0',  // yellow belt
          '0 + 8', '8 + 0',  // green belt
          '0 + 9', '9 + 0',  // blue belt
          '0 + 10', '10 + 0', // red belt
          '1 + 5', '5 + 1',  // brown belt
          // Level 4 belts (excluding blue belt)
          '1 + 6', '6 + 1',  // white belt
          '1 + 7', '7 + 1',  // yellow belt
          '1 + 8', '8 + 1',  // green belt
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        const remainingPool = level4Pool.filter(q => q !== '1 + 9' && q !== '9 + 1');
        const selectedQuestions = [];
        
        // Add the core level 4 blue belt questions
        selectedQuestions.push('1 + 9', '1 + 9', '9 + 1', '9 + 1');
        
        // Add 6 random questions from the remaining pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } else if (isLevel5) {
        // Level 5 blue belt: 2 "3+3" + 6 from previous levels
        const level5Pool = [
          '3 + 3', '3 + 3',  // 2 "3+3" questions
          // Questions from previous levels (level 1-4 all belts)
          // Level 1 belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 2 belts
          '1 + 2', '2 + 1',  // yellow belt
          '1 + 3', '3 + 1',  // green belt
          '1 + 4', '4 + 1',  // blue belt
          '2 + 2',           // red belt
          '2 + 3', '3 + 2',  // brown belt
          // Level 3 belts
          '0 + 6', '6 + 0',  // white belt
          '0 + 7', '7 + 0',  // yellow belt
          '0 + 8', '8 + 0',  // green belt
          '0 + 9', '9 + 0',  // blue belt
          '0 + 10', '10 + 0', // red belt
          '1 + 5', '5 + 1',  // brown belt
          // Level 4 belts
          '1 + 6', '6 + 1',  // white belt
          '1 + 7', '7 + 1',  // yellow belt
          '1 + 8', '8 + 1',  // green belt
          '1 + 9', '9 + 1',  // blue belt
          '2 + 4', '4 + 2',  // red belt
          '2 + 5', '5 + 2',  // brown belt

          '2 + 6', '6 + 2',  
          '2 + 7', '7 + 2',  
          '2 + 8', '8 + 2',  
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        const remainingPool = level5Pool.filter(q => q !== '3 + 3');
        const selectedQuestions = [];
        
        // Add the core level 5 blue belt questions
        selectedQuestions.push('3 + 3', '3 + 3');
        
        // Add 8 random questions from the remaining pool
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } else if (isLevel6) {
        // Level 6 blue belt: 2 "4+5" + 2 "5+4" + 6 from previous levels
        const level6Pool = [
          '4 + 5', '4 + 5',  // 2 "4+5" questions
          '5 + 4', '5 + 4',  // 2 "5+4" questions
          // Questions from previous levels (level 1-5 all belts)
          // Level 1 belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 2 belts
          '1 + 2', '2 + 1',  // yellow belt
          '1 + 3', '3 + 1',  // green belt
          '1 + 4', '4 + 1',  // blue belt
          '2 + 2',           // red belt
          '2 + 3', '3 + 2',  // brown belt
          // Level 3 belts
          '0 + 6', '6 + 0',  // white belt
          '0 + 7', '7 + 0',  // yellow belt
          '0 + 8', '8 + 0',  // green belt
          '0 + 9', '9 + 0',  // blue belt
          '0 + 10', '10 + 0', // red belt
          '1 + 5', '5 + 1',  // brown belt
          // Level 4 belts
          '1 + 6', '6 + 1',  // white belt
          '1 + 7', '7 + 1',  // yellow belt
          '1 + 8', '8 + 1',  // green belt
          '1 + 9', '9 + 1',  // blue belt
          '2 + 4', '4 + 2',  
          '2 + 5', '5 + 2',  
          // Level 5 belts
          '2 + 6', '6 + 2',  
          '2 + 7', '7 + 2',  
          '2 + 8', '8 + 2', 
          '3 + 3', 
          '3 + 4', '4 + 3',
          '3 + 5', '5 + 3',
          // Level 6 belts
          '3 + 6', '6 + 3',
          '3 + 7', '7 + 3',
          '4 + 4',          
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        const remainingPool = level6Pool.filter(q => q !== '4 + 5' && q !== '5 + 4');
        const selectedQuestions = [];
        
        // Add the core level 6 blue belt questions
        selectedQuestions.push('4 + 5', '4 + 5', '5 + 4', '5 + 4');
        
        // Add 6 random questions from the remaining pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } else {
        // Level 1 blue belt: 2 "0+3" + 2 "3+0" + 6 from white/yellow/green belt
        const baseSequence = [
          '0 + 3', '0 + 3',  // 2 "0+3" questions
          '3 + 0', '3 + 0',  // 2 "3+0" questions
          '0 + 1', '0 + 1',  // 2 "0+1" questions from yellow belt
          '1 + 0', '1 + 0',  // 2 "1+0" questions from yellow belt
          '2 + 0', '2 + 0',  // 2 "2+0" questions from green belt
          '0 + 2', '0 + 2',  // 2 "0+2" questions from green belt
          '0 + 0', '0 + 0'   // 2 "0+0" questions from white belt
        ];
        
        // Randomly select exactly 6 questions from white/yellow/green belt to ensure total of 10 questions
        const selectedQuestions = [];
        const availableQuestions = [
          '0 + 1', '0 + 1',  // 2 "0+1" questions
          '1 + 0', '1 + 0',  // 2 "1+0" questions
          '2 + 0', '2 + 0',  // 2 "2+0" questions
          '0 + 2', '0 + 2',  // 2 "0+2" questions
          '0 + 0', '0 + 0',  // 2 "0+0" questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9  // 10 numbers from white belt
        ];
        
        // Randomly select 6 questions from the available pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * availableQuestions.length);
          selectedQuestions.push(availableQuestions[randomIndex]);
          availableQuestions.splice(randomIndex, 1);
        }
        
        // Create the final sequence with exactly 10 questions
        finalSequence = [
          '0 + 3', '0 + 3',  // 2 "0+3" questions
          '3 + 0', '3 + 0',  // 2 "3+0" questions
          ...selectedQuestions  // 6 randomly selected questions from white/yellow/green belt
        ];
      }
      // Create a guaranteed non-consecutive sequence (no consecutive identical questions of any type)
      let shuffledSequence;
      let attempts = 0;
      const maxAttempts = 100;
      
      do {
        // Shuffle the sequence
        shuffledSequence = [...finalSequence].sort(() => Math.random() - 0.5);
        attempts++;
        
        // Check if we have consecutive identical questions of any type
        let hasConsecutive = false;
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            hasConsecutive = true;
            break;
          }
        }
        
        // If no consecutive identical questions, we're good
        if (!hasConsecutive) {
          break;
        }
      } while (attempts < maxAttempts);
      
      // CRITICAL: Verify no consecutive identical questions of any type
      let hasConsecutive = false;
      for (let i = 0; i < shuffledSequence.length - 1; i++) {
        if (shuffledSequence[i] === shuffledSequence[i + 1]) {
          hasConsecutive = true;
          break;
        }
      }
      
      // If we still have consecutive questions after all attempts, force fix them
      if (hasConsecutive) {
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            // Find a different question to swap with
            for (let j = i + 2; j < shuffledSequence.length; j++) {
              if (shuffledSequence[j] !== shuffledSequence[i]) {
                // Swap to break the consecutive pattern
                [shuffledSequence[i + 1], shuffledSequence[j]] = [shuffledSequence[j], shuffledSequence[i + 1]];
                break;
              }
            }
          }
        }
        
        // Final verification
        hasConsecutive = false;
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            hasConsecutive = true;
            break;
          }
        }
      }
      
      // Store the shuffled sequence for this quiz session
      window.blueBeltFullSequence = shuffledSequence;
      // Reset the question counter for this session
      window.blueBeltQuestionCounter = 0;
      // Track how many core questions we've asked
      if (isLevel2) {
        // Level 2: track "1+4" and "4+1" questions
        window.blueBeltOnePlusFourAsked = 0;
        window.blueBeltFourPlusOneAsked = 0;
      } else if (isLevel3) {
        // Level 3: track "0+9" and "9+0" questions
        window.blueBeltZeroPlusNineAsked = 0;
        window.blueBeltNinePlusZeroAsked = 0;
      } else if (isLevel4) {
        // Level 4: track "1+9" and "9+1" questions
        window.blueBeltOnePlusNineAsked = 0;
        window.blueBeltNinePlusOneAsked = 0;
      } else if (isLevel5) {
        // Level 5: track "3+3" question
        window.blueBeltThreePlusThreeAsked = 0;
      } else if (isLevel6) {
        // Level 6: track "4+5" and "5+4" questions
        window.blueBeltFourPlusFiveAsked = 0;
        window.blueBeltFivePlusFourAsked = 0;
      } else {
        // Level 1: track "0+3" and "3+0" questions
        window.blueBeltZeroPlusThreeAsked = 0;
        window.blueBeltThreePlusZeroAsked = 0;
      }
    }
    
    // Get the question for this position from the shuffled sequence
    let selectedQuestion = window.blueBeltFullSequence[window.blueBeltQuestionCounter];
    
    // SAFETY CHECK: Ensure we have a valid sequence and question
    if (!window.blueBeltFullSequence || window.blueBeltFullSequence.length === 0) {
      console.error('Blue belt sequence is undefined or empty. Regenerating...');
      // Force regeneration by clearing the sequence
      delete window.blueBeltFullSequence;
      delete window.blueBeltQuestionCounter;
      
      return { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'blue' };    
    }
    
    // SAFETY CHECK: Ensure question counter is within bounds
    if (window.blueBeltQuestionCounter >= window.blueBeltFullSequence.length) {
      console.error('Question counter out of bounds. Resetting...');
      window.blueBeltQuestionCounter = 0;
      selectedQuestion = window.blueBeltFullSequence[0];
    }
    
    // SAFETY CHECK: Ensure selectedQuestion is not undefined
    if (selectedQuestion === undefined) {
      console.error('Selected question is undefined. Using fallback...');
      selectedQuestion = window.blueBeltFullSequence[0] || '0 + 0';
      window.blueBeltQuestionCounter = 0;
    }
    // CRITICAL FIX: AGGRESSIVELY prevent consecutive identical questions from EVER occurring
    // This is the main fix that ensures no consecutive identical questions can happen
    if (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion) {
      // Find ANY question in the sequence that's different from the last question
      let foundDifferentQuestion = false;
      
      // First, try to find a different question that hasn't been asked yet
      for (let i = 0; i < window.blueBeltFullSequence.length; i++) {
        const candidateQuestion = window.blueBeltFullSequence[i];
        if (candidateQuestion !== lastQuestion && 
            `${candidateQuestion}` !== lastQuestion && 
            !askedQuestions.has(candidateQuestion)) {
          selectedQuestion = candidateQuestion;
          window.blueBeltQuestionCounter = i;
          foundDifferentQuestion = true;
          break;
        }
      }
      
      // If no unasked different question found, find ANY different question (even if asked before)
      if (!foundDifferentQuestion) {
        for (let i = 0; i < window.blueBeltFullSequence.length; i++) {
          const candidateQuestion = window.blueBeltFullSequence[i];
          if (candidateQuestion !== lastQuestion && `${candidateQuestion}` !== lastQuestion) {
            selectedQuestion = candidateQuestion;
            window.blueBeltQuestionCounter = i;
            foundDifferentQuestion = true;
            break;
          }
        }
      }
      
      // If still no different question found, this should never happen with our sequence
      if (!foundDifferentQuestion) {
        // Force select the first question that's not the last question
        const firstDifferent = window.blueBeltFullSequence.find(q => q !== lastQuestion);
        if (firstDifferent !== undefined) {
          selectedQuestion = firstDifferent;
          const foundIndex = window.blueBeltFullSequence.indexOf(firstDifferent);
          if (foundIndex !== -1) {
            window.blueBeltQuestionCounter = foundIndex;
          }
        }
      }
    }
    
    // ULTIMATE SAFETY CHECK: For the first question of any quiz, ensure it's NEVER the same as lastQuestion
    if (totalQuestions === 0 && (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion)) {
      // Find ANY question that's different from lastQuestion
      let forcedQuestion = null;
      for (let i = 0; i < window.blueBeltFullSequence.length; i++) {
        const candidate = window.blueBeltFullSequence[i];
        if (candidate !== lastQuestion && `${candidate}` !== lastQuestion) {
          forcedQuestion = candidate;
          window.blueBeltQuestionCounter = i;
          break;
        }
      }
      
      if (forcedQuestion !== null) {
        selectedQuestion = forcedQuestion;
      }
    }
    
    // Increment the question counter for next time
    window.blueBeltQuestionCounter++;
    
    // Track core questions asked based on level
    if (isLevel2) {
      // Level 2: track "1+4" and "4+1" questions
      if (selectedQuestion === '1 + 4') {
        window.blueBeltOnePlusFourAsked++;
      } else if (selectedQuestion === '4 + 1') {
        window.blueBeltFourPlusOneAsked++;
      }
    } else if (isLevel3) {
      // Level 3: track "0+9" and "9+0" questions
      if (selectedQuestion === '0 + 9') {
        window.blueBeltZeroPlusNineAsked++;
      } else if (selectedQuestion === '9 + 0') {
        window.blueBeltNinePlusZeroAsked++;
      }
    } else if (isLevel4) {
      // Level 4: track "1+9" and "9+1" questions
      if (selectedQuestion === '1 + 9') {
        window.blueBeltOnePlusNineAsked++;
      } else if (selectedQuestion === '9 + 1') {
        window.blueBeltNinePlusOneAsked++;
      }
    } else if (isLevel5) {
      // Level 5: track "2+8" and "8+2" questions
      if (selectedQuestion === '2 + 8') {
        window.blueBeltTwoPlusEightAsked++;
      } else if (selectedQuestion === '8 + 2') {
        window.blueBeltEightPlusTwoAsked++;
      }
    } else if (isLevel6) {
      // Level 6: track "4+5" and "5+4" questions
      if (selectedQuestion === '4 + 5') {
        window.blueBeltFourPlusFiveAsked++;
      } else if (selectedQuestion === '5 + 4') {
        window.blueBeltFivePlusFourAsked++;
      }
    } else {
      // Level 1: track "0+3" and "3+0" questions
      if (selectedQuestion === '0 + 3') {
        window.blueBeltZeroPlusThreeAsked++;
      } else if (selectedQuestion === '3 + 0') {
        window.blueBeltThreePlusZeroAsked++;
      }
    }
    // Return the appropriate question object based on the selected question
    if (isLevel2) {
      // Level 2 blue belt questions
      if (selectedQuestion === '1 + 4') {
        // It's a "1+4" question
        const shuffledAnswers = [3, 4, 5, 6].sort(() => Math.random() - 0.5);
        return { question: '1 + 4', correctAnswer: 5, answers: shuffledAnswers, multiplier: 1, difficulty: 'blue' };
      } else if (selectedQuestion === '4 + 1') {
        // It's a "4+1" question
        const shuffledAnswers = [3, 4, 5, 6].sort(() => Math.random() - 0.5);
        return { question: '4 + 1', correctAnswer: 5, answers: shuffledAnswers, multiplier: 4, difficulty: 'blue' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || 
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '0 + 3' || 
                 selectedQuestion === '3 + 0' || selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || 
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '1 + 1' ||
                 selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' || selectedQuestion === '1 + 3' ||
                 selectedQuestion === '3 + 1') {
        // It's a question from Level 1 belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'blue' };
        }
        
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'blue' };
      }
      return { question: selectedQuestion, correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'blue' };
    } else if (isLevel3) {
      // Level 3 blue belt questions
      if (selectedQuestion === '0 + 9') {
        // It's a "0+9" question
        const shuffledAnswers = [8, 9, 10, 11].sort(() => Math.random() - 0.5);
        return { question: '0 + 9', correctAnswer: 9, answers: shuffledAnswers, multiplier: 0, difficulty: 'blue' };
      } else if (selectedQuestion === '9 + 0') {
        // It's a "9+0" question
        const shuffledAnswers = [8, 9, 10, 11].sort(() => Math.random() - 0.5);
        return { question: '9 + 0', correctAnswer: 9, answers: shuffledAnswers, multiplier: 9, difficulty: 'blue' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' || selectedQuestion === '2 + 2' ||
                 selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                 selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || 
                 selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' || selectedQuestion === '7 + 0' ||
                 selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' ) {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'blue' };
        }
        
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'blue' };
      }
      return { question: selectedQuestion, correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'blue' };
    } else if (isLevel4) {
      // Level 4 blue belt questions
      if (selectedQuestion === '1 + 9') {
        // It's a "1+9" question
        const shuffledAnswers = [8, 9, 10, 11].sort(() => Math.random() - 0.5);
        return { question: '1 + 9', correctAnswer: 10, answers: shuffledAnswers, multiplier: 1, difficulty: 'blue' };
      } else if (selectedQuestion === '9 + 1') {
        // It's a "9+1" question
        const shuffledAnswers = [8, 9, 10, 11].sort(() => Math.random() - 0.5);
        return { question: '9 + 1', correctAnswer: 10, answers: shuffledAnswers, multiplier: 9, difficulty: 'blue' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' || selectedQuestion === '2 + 2' ||
                 selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                 selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || 
                 selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' || selectedQuestion === '7 + 0' ||
                 selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' || selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' ||
                 selectedQuestion === '0 + 10' || selectedQuestion === '10 + 0' || selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' ||
                 selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' || selectedQuestion === '1 + 7' || selectedQuestion === '7 + 1' ||
                 selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' ) {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'blue' };
        }
        
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'blue' };
      }
      return { question: selectedQuestion, correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'blue' };
    } else if (isLevel5) {
      // Level 5 blue belt questions
      if (selectedQuestion === '3 + 3') {
        // It's a "3+3" question
        const shuffledAnswers = [3, 4, 5, 6].sort(() => Math.random() - 0.5);
        return { question: '3 + 3', correctAnswer: 6, answers: shuffledAnswers, multiplier: 3, difficulty: 'blue' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' || selectedQuestion === '2 + 2' ||
                 selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                 selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || 
                 selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' || selectedQuestion === '7 + 0' ||
                 selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' || selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' ||
                 selectedQuestion === '0 + 10' || selectedQuestion === '10 + 0' || selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' ||
                 selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' || selectedQuestion === '1 + 7' || selectedQuestion === '7 + 1' ||
                 selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' || selectedQuestion === '1 + 9' || selectedQuestion === '9 + 1' ||
                 selectedQuestion === '2 + 4' || selectedQuestion === '4 + 2' || selectedQuestion === '2 + 5' || selectedQuestion === '5 + 2' ||
                 selectedQuestion === '2 + 6' || selectedQuestion === '6 + 2' || selectedQuestion === '2 + 7' || selectedQuestion === '7 + 2' || 
                 selectedQuestion === '2 + 8' || selectedQuestion === '8 + 2' ) {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'blue' };
        }
        
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'blue' };
      }
      return { question: selectedQuestion, correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'blue' };
    } else if (isLevel6) {
      // Level 6 blue belt questions
      if (selectedQuestion === '4 + 5') {
        // It's a "4+5" question  
        const shuffledAnswers = [9, 8, 10, 7].sort(() => Math.random() - 0.5);
        return { question: '4 + 5', correctAnswer: 9, answers: shuffledAnswers, multiplier: 4, difficulty: 'blue' };
      } else if (selectedQuestion === '5 + 4') {
        // It's a "5+4" question
        const shuffledAnswers = [9, 8, 10, 7].sort(() => Math.random() - 0.5);
        return { question: '5 + 4', correctAnswer: 9, answers: shuffledAnswers, multiplier: 5, difficulty: 'blue' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' || selectedQuestion === '2 + 2' ||
                 selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                 selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || 
                 selectedQuestion === '3 + 2' || selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || 
                 selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' || selectedQuestion === '7 + 0' ||
                 selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' || selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' ||
                 selectedQuestion === ' 0 + 10' || selectedQuestion === '10 + 0' || selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' ||
                 selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' || selectedQuestion === '1 + 7' || selectedQuestion === '7 + 1' ||
                 selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' || selectedQuestion === '1 + 9' || selectedQuestion === '9 + 1' ||
                 selectedQuestion === '2 + 4' || selectedQuestion === '4 + 2' || selectedQuestion === '2 + 5' || selectedQuestion === '5 + 2' ||
                 selectedQuestion === '2 + 6' || selectedQuestion === '6 + 2' || selectedQuestion === '2 + 7' || selectedQuestion === '7 + 2' || 
                 selectedQuestion === '2 + 8' || selectedQuestion === '8 + 2' || selectedQuestion === '2 + 9' || selectedQuestion === '9 + 2' ||
                 selectedQuestion === '3 + 3' || selectedQuestion === '3 + 4' || selectedQuestion === '4 + 3' || selectedQuestion === '3 + 5' ||
                 selectedQuestion === '5 + 3' || selectedQuestion === '3 + 6' || selectedQuestion === '6 + 3' || selectedQuestion === '3 + 7' ||
                 selectedQuestion === '7 + 3' || selectedQuestion === '4 + 4' ) {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'blue' };
        }
        
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'blue' };
      }
      return { question: selectedQuestion, correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'blue' };
    } else {
      // Level 1 blue belt questions
      if (selectedQuestion === '0 + 3') {
        // It's a "0+3" question
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 3', correctAnswer: 3, answers: shuffledAnswers, multiplier: 0, difficulty: 'blue' };
      } else if (selectedQuestion === '3 + 0') {
        // It's a "3+0" question
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '3 + 0', correctAnswer: 3, answers: shuffledAnswers, multiplier: 3, difficulty: 'blue' };
      } else if (selectedQuestion === '0 + 2') {
        // It's a "0+2" question from green belt
        const shuffledAnswers = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
        return { question: '0 + 2', correctAnswer: 2, answers: shuffledAnswers, multiplier: 0, difficulty: 'green' };
      } else if (selectedQuestion === '2 + 0') {
        // It's a "2+0" question from green belt
        const shuffledAnswers = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
        return { question: '2 + 0', correctAnswer: 2, answers: shuffledAnswers, multiplier: 2, difficulty: 'green' };
      } else if (selectedQuestion === '0 + 1') {
        // It's a "0+1" question from yellow belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 1', correctAnswer: 1, answers: shuffledAnswers, multiplier: 1, difficulty: 'yellow' };
      } else if (selectedQuestion === '1 + 0') {
        // It's a "1+0" question from yellow belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '1 + 0', correctAnswer: 1, answers: shuffledAnswers, multiplier: 1, difficulty: 'yellow' };
      } else if (selectedQuestion === '0 + 0') {
        // It's a "0+0" question from white belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 0', correctAnswer: 0, answers: shuffledAnswers, multiplier: 0, difficulty: 'white' };
      } else {
        // It's a number recognition question from white belt
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'blue' };
      }
    }
  }
  
  // Special handling for Red Belt: 2 "0+4" + 2 "4+0" + 6 from white/yellow/green/blue belt, total 10 questions
  if (difficulty === 'red') {
    // Check if this is Level 2 red belt
    const isLevel2 = selectedTable === 2;
    const isLevel3 = selectedTable === 3;
    const isLevel4 = selectedTable === 4;
    const isLevel5 = selectedTable === 5;
    const isLevel6 = selectedTable === 6;
    
    // Create a shuffled sequence that ensures exactly 2 "0+4", 2 "4+0", and 6 questions from white/yellow/green/blue belt
    if (!window.redBeltFullSequence) {
      let finalSequence;
      if (isLevel2) {
        // Level 2 red belt: 2 "2+2" + 8 from Level 1 belts and Level 2 white/yellow/green/blue belts
        const level2Pool = [
          // Core facts: 2 "2+2" questions
          '2 + 2', '2 + 2',  // 2 "2+2" questions
          // Questions from Level 1 belts
          '0 + 0',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Questions from Level 2 white, yellow, green, and blue belts
          '1 + 1',  // Level 2 white belt
          '1 + 2', '2 + 1',  // Level 2 yellow belt
          '1 + 3', '3 + 1',  // Level 2 green belt
          '1 + 4', '4 + 1',  // Level 2 blue belt
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        // Randomly select exactly 8 questions from the pool (excluding the 2 core facts)
        const remainingPool = level2Pool.filter(q => q !== '2 + 2');
        const selectedQuestions = [];
        
        // Add the 2 core facts first
        selectedQuestions.push('2 + 2', '2 + 2');
        
        // Randomly select 8 more questions from the remaining pool
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } else if (isLevel3) {
        // Level 3 red belt: 2 "0+10" + 2 "10+0" + 6 from previous level belts and white/yellow/green/blue level 3
        const level3Pool = [
          '0 + 10', '0 + 10',  // 2 "0+10" questions
          '10 + 0', '10 + 0',  // 2 "10+0" questions
          // Questions from previous level belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0', '1 + 2', '2 + 1',  // yellow belt
          '0 + 2', '2 + 0', '1 + 3', '3 + 1',  // green belt
          '0 + 3', '3 + 0', '1 + 4', '4 + 1',  // blue belt
          '0 + 4', '4 + 0', '2 + 2', '2 + 3', '3 + 2',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 3 questions from white, yellow, green, blue belts
          '0 + 6', '6 + 0',  // white belt level 3
          '0 + 7', '7 + 0',  // yellow belt level 3
          '0 + 8', '8 + 0',  // green belt level 3
          '0 + 9', '9 + 0',   // blue belt level 3
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        const remainingPool = level3Pool.filter(q => q !== '0 + 10' && q !== '10 + 0');
        const selectedQuestions = [];
        selectedQuestions.push('0 + 10', '0 + 10', '10 + 0', '10 + 0');
        
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } else if (isLevel4) {
        // Level 4 red belt: 2 "2+4" + 2 "4+2" + 6 from previous levels
        const level4Pool = [
          '2 + 4', '2 + 4',  // 2 "2+4" questions
          '4 + 2', '4 + 2',  // 2 "4+2" questions
          // Questions from previous levels (level 1-3 all belts + level 4 white/yellow/green/blue)
          // Level 1 belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 2 belts
          '1 + 2', '2 + 1',  // yellow belt
          '1 + 3', '3 + 1',  // green belt
          '1 + 4', '4 + 1',  // blue belt
          '2 + 2',           // red belt
          '2 + 3', '3 + 2',  // brown belt
          // Level 3 belts
          '0 + 6', '6 + 0',  // white belt
          '0 + 7', '7 + 0',  // yellow belt
          '0 + 8', '8 + 0',  // green belt
          '0 + 9', '9 + 0',  // blue belt
          '0 + 10', '10 + 0', // red belt
          '1 + 5', '5 + 1',  // brown belt
          // Level 4 belts (excluding red belt)
          '1 + 6', '6 + 1',  // white belt
          '1 + 7', '7 + 1',  // yellow belt
          '1 + 8', '8 + 1',  // green belt
          '1 + 9', '9 + 1',  // blue belt
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        const remainingPool = level4Pool.filter(q => q !== '2 + 4' && q !== '4 + 2');
        const selectedQuestions = [];
        
        // Add the core level 4 red belt questions
        selectedQuestions.push('2 + 4', '2 + 4', '4 + 2', '4 + 2');
        
        // Add 6 random questions from the remaining pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } else if (isLevel5) {
        
        const level5Pool = [
          '3 + 4', '3 + 4',  // 2 "3+4" questions
          '4 + 3', '4 + 3',  // 2 "4+3" questions
          // Questions from previous levels (level 1-4 all belts + level 5 white/yellow/green/blue)
          // Level 1 belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 2 belts
          '1 + 2', '2 + 1',  // yellow belt
          '1 + 3', '3 + 1',  // green belt
          '1 + 4', '4 + 1',  // blue belt
          '2 + 2',           // red belt
          '2 + 3', '3 + 2',  // brown belt
          // Level 3 belts
          '0 + 6', '6 + 0',  // white belt
          '0 + 7', '7 + 0',  // yellow belt
          '0 + 8', '8 + 0',  // green belt
          '0 + 9', '9 + 0',  // blue belt
          '0 + 10', '10 + 0', // red belt
          '1 + 5', '5 + 1',  // brown belt
          // Level 4 belts
          '1 + 6', '6 + 1',  // white belt
          '1 + 7', '7 + 1',  // yellow belt
          '1 + 8', '8 + 1',  // green belt
          '1 + 9', '9 + 1',  // blue belt
          '2 + 4', '4 + 2',  // red belt
          '2 + 5', '5 + 2',  // brown belt
          // Level 5 belts
          '2 + 6', '6 + 2',  // white belt
          '2 + 7', '7 + 2',  // yellow belt
          '2 + 8', '8 + 2',  // green belt
          '3 + 3',           // blue belt
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        const remainingPool = level5Pool.filter(q => q !== '3 + 4' && q !== '4 + 3');
        const selectedQuestions = [];
        
        // Add the core level 5 red belt questions
        selectedQuestions.push('3 + 4', '3 + 4', '4 + 3', '4 + 3');
        
        // Add 6 random questions from the remaining pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } else if (isLevel6) {
        
        const level6Pool = [
          '4 + 6', '4 + 6',  // 2 "4+6" questions
          '6 + 4', '6 + 4',  // 2 "6+4" questions
          // Questions from previous levels (level 1-5 all belts + level 6 white/yellow/green/blue)
          // Level 1 belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 2 belts
          '1 + 2', '2 + 1',  // yellow belt
          '1 + 3', '3 + 1',  // green belt
          '1 + 4', '4 + 1',  // blue belt
          '2 + 2',           // red belt
          '2 + 3', '3 + 2',  // brown belt
          // Level 3 belts
          '0 + 6', '6 + 0',  // white belt
          '0 + 7', '7 + 0',  // yellow belt
          '0 + 8', '8 + 0',  // green belt
          '0 + 9', '9 + 0',  // blue belt
          '0 + 10', '10 + 0', // red belt
          '1 + 5', '5 + 1',  // brown belt
          // Level 4 belts
          '1 + 6', '6 + 1',  // white belt
          '1 + 7', '7 + 1',  // yellow belt
          '1 + 8', '8 + 1',  // green belt
          '1 + 9', '9 + 1',  // blue belt
          '2 + 4', '4 + 2',  // red belt
          '2 + 5', '5 + 2',  // brown belt
          // Level 5 belts
          '2 + 6', '6 + 2',  // white belt
          '2 + 7', '7 + 2',  // yellow belt
          '2 + 8', '8 + 2',  // green belt
          '3 + 3',           // blue belt
          '3 + 4', '4 + 3',  // brown belt
          '3 + 5', '5 + 3',  // brown belt
          // Level 6 belts
          '3 + 6', '6 + 3',  // white belt
          '3 + 7', '7 + 3',  // yellow belt
          '4 + 4',           // green belt
          '4 + 5', '5 + 4',  // blue belt
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        const remainingPool = level6Pool.filter(q => q !== '4 + 6' && q !== '6 + 4');
        const selectedQuestions = [];
        selectedQuestions.push('4 + 6', '4 + 6', '6 + 4', '6 + 4');
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        finalSequence = selectedQuestions;
      } else {
        // Level 1 red belt: 2 "0+4" + 2 "4+0" + 6 from white/yellow/green/blue belt
        const baseSequence = [
          '0 + 4', '0 + 4',  // 2 "0+4" questions
          '4 + 0', '4 + 0',  // 2 "4+0" questions
          '0 + 3', '0 + 3',  // 2 "0+3" questions from blue belt
          '3 + 0', '3 + 0',  // 2 "3+0" questions from blue belt
          '2 + 0', '2 + 0',  // 2 "2+0" questions from green belt
          '0 + 2', '0 + 2',  // 2 "0+2" questions from green belt
          '0 + 1', '0 + 1',  // 2 "0+1" questions from yellow belt
          '1 + 0', '1 + 0',  // 2 "1+0" questions from yellow belt
          '0 + 0', '0 + 0'   // 2 "0+0" questions from white belt
        ];
        
        // Randomly select exactly 6 questions from white/yellow/green/blue belt to ensure total of 10 questions
        const selectedQuestions = [];
        const availableQuestions = [
          '0 + 3', '0 + 3',  // 2 "0+3" questions from blue belt
          '3 + 0', '3 + 0',  // 2 "3+0" questions from blue belt
          '2 + 0', '2 + 0',  // 2 "2+0" questions from green belt
          '0 + 2', '0 + 2',  // 2 "0+2" questions from green belt
          '0 + 1', '0 + 1',  // 2 "0+1" questions from yellow belt
          '1 + 0', '1 + 0',  // 2 "1+0" questions from yellow belt
          '0 + 0', '0 + 0',  // 2 "0+0" questions from white belt
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9  // 10 numbers from white belt
        ];
        
        // Randomly select 6 questions from the available pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * availableQuestions.length);
          selectedQuestions.push(availableQuestions[randomIndex]);
          availableQuestions.splice(randomIndex, 1);
        }
        
        // Create the final sequence with exactly 10 questions
        finalSequence = [
          '0 + 4', '0 + 4',  // 2 "0+4" questions
          '4 + 0', '4 + 0',  // 2 "4+0" questions
          ...selectedQuestions  // 6 randomly selected questions from white/yellow/green/blue belt
        ];
      }
      
      // Create a guaranteed non-consecutive sequence (no consecutive identical questions of any type)
      let shuffledSequence;
      let attempts = 0;
      const maxAttempts = 100;
      
      do {
        // Shuffle the sequence
        shuffledSequence = [...finalSequence].sort(() => Math.random() - 0.5);
        attempts++;
        
        // Check if we have consecutive identical questions of any type
        let hasConsecutive = false;
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            hasConsecutive = true;
            break;
          }
        }
        
        // If no consecutive identical questions, we're good
        if (!hasConsecutive) {
          break;
        }
      } while (attempts < maxAttempts);
      
      // CRITICAL: Verify no consecutive identical questions of any type
      let hasConsecutive = false;
      for (let i = 0; i < shuffledSequence.length - 1; i++) {
        if (shuffledSequence[i] === shuffledSequence[i + 1]) {
          hasConsecutive = true;
          break;
        }
      }
      // If we still have consecutive questions after all attempts, force fix them
      if (hasConsecutive) {
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            // Find a different question to swap with
            for (let j = i + 2; j < shuffledSequence.length; j++) {
              if (shuffledSequence[j] !== shuffledSequence[i]) {
                // Swap to break the consecutive pattern
                [shuffledSequence[i + 1], shuffledSequence[j]] = [shuffledSequence[j], shuffledSequence[i + 1]];
                break;
              }
            }
          }
        }
        
        // Final verification
        hasConsecutive = false;
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            hasConsecutive = true;
            break;
          }
        }
      }
      
      // Store the shuffled sequence for this quiz session
      window.redBeltFullSequence = shuffledSequence;
      // Reset the question counter for this session
      window.redBeltQuestionCounter = 0;
      // Track how many core questions we've asked
      if (isLevel2) {
        // Level 2: track "2+2" questions
        window.redBeltTwoPlusTwoAsked = 0;
      } else if (isLevel3) {
        // Level 3: track "0+10" and "10+0" questions
        window.redBeltZeroPlusTenAsked = 0;
        window.redBeltTenPlusZeroAsked = 0;
      } else if (isLevel4) {
        // Level 4: track "2+4" and "4+2" questions
        window.redBeltTwoPlusFourAsked = 0;
        window.redBeltFourPlusTwoAsked = 0;
      } else if (isLevel5) {
        // Level 5: track "3+4" and "4+3" questions
        window.redBeltThreePlusFourAsked = 0;
        window.redBeltFourPlusThreeAsked = 0;
      } else if (isLevel6) {
        // Level 6: track "4+6" and "6+4" questions
        window.redBeltFourPlusSixAsked = 0;
        window.redBeltSixPlusFourAsked = 0;
      } else {
        // Level 1: track "0+4" and "4+0" questions
        window.redBeltZeroPlusFourAsked = 0;
        window.redBeltFourPlusZeroAsked = 0;
      }
    }
    
    // Get the question for this position from the shuffled sequence
    let selectedQuestion = window.redBeltFullSequence[window.redBeltQuestionCounter];
    
    // SAFETY CHECK: Ensure we have a valid question
    if (!selectedQuestion) {
      console.error('Red belt selected question is undefined. Using fallback...');
      selectedQuestion = '0 + 4'; // Fallback question
      window.redBeltQuestionCounter = 0;
    }
    // CRITICAL FIX: AGGRESSIVELY prevent consecutive identical questions from EVER occurring
    // This is the main fix that ensures no consecutive identical questions can happen
    if (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion) {
      // Find ANY question in the sequence that's different from the last question
      let foundDifferentQuestion = false;
      
      // First, try to find a different question that hasn't been asked yet
      for (let i = 0; i < window.redBeltFullSequence.length; i++) {
        const candidateQuestion = window.redBeltFullSequence[i];
        if (candidateQuestion !== lastQuestion && 
            `${candidateQuestion}` !== lastQuestion && 
            !askedQuestions.has(candidateQuestion)) {
          selectedQuestion = candidateQuestion;
          window.redBeltQuestionCounter = i;
          foundDifferentQuestion = true;
          break;
        }
      }
      
      // If no unasked different question found, find ANY different question (even if asked before)
      if (!foundDifferentQuestion) {
        for (let i = 0; i < window.redBeltFullSequence.length; i++) {
          const candidateQuestion = window.redBeltFullSequence[i];
          if (candidateQuestion !== lastQuestion && `${candidateQuestion}` !== lastQuestion) {
            selectedQuestion = candidateQuestion;
            window.redBeltQuestionCounter = i;
            foundDifferentQuestion = true;
            break;
          }
        }
      }
      
      // If still no different question found, this should never happen with our sequence
      if (!foundDifferentQuestion) {
        // Force select the first question that's not the last question
        const firstDifferent = window.redBeltFullSequence.find(q => q !== lastQuestion);
        if (firstDifferent !== undefined) {
          selectedQuestion = firstDifferent;
          const foundIndex = window.redBeltFullSequence.indexOf(firstDifferent);
          if (foundIndex !== -1) {
            window.redBeltQuestionCounter = foundIndex;
          }
        }
      }
    }
    
    // ULTIMATE SAFETY CHECK: For the first question of any quiz, ensure it's NEVER the same as lastQuestion
    if (totalQuestions === 0 && (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion)) {
      // Find ANY question that's different from lastQuestion
      let forcedQuestion = null;
      for (let i = 0; i < window.redBeltFullSequence.length; i++) {
        const candidate = window.redBeltFullSequence[i];
        if (candidate !== lastQuestion && `${candidate}` !== lastQuestion) {
          forcedQuestion = candidate;
          window.redBeltQuestionCounter = i;
          break;
        }
      }
      
      if (forcedQuestion !== null) {
        selectedQuestion = forcedQuestion;
      }
    }
    
    // Increment the question counter for next time
    window.redBeltQuestionCounter++;
    
    // Track core questions asked based on level
    if (isLevel3) {
      // Level 3: track "0+10" and "10+0" questions
      if (selectedQuestion === '0 + 10') {
        window.redBeltZeroPlusTenAsked++;
      } else if (selectedQuestion === '10 + 0') {
        window.redBeltTenPlusZeroAsked++;
      }
    } else if (isLevel2) {
      // Level 2: track "2+2" questions
      if (selectedQuestion === '2 + 2') {
        window.redBeltTwoPlusTwoAsked++;
      }
    } else if (isLevel4) {
      // Level 4: track "2+4" and "4+2" questions
      if (selectedQuestion === '2 + 4') {
        window.redBeltTwoPlusFourAsked++;
      } else if (selectedQuestion === '4 + 2') {
        window.redBeltFourPlusTwoAsked++;
      }
    } else if (isLevel5) {
      // Level 5: track "3+4" and "4+3" questions
      if (selectedQuestion === '3 + 4') {
        window.redBeltThreePlusFourAsked++;
      } else if (selectedQuestion === '4 + 3') {
        window.redBeltFourPlusThreeAsked++;
      }
    } else if (isLevel6) {
      // Level 6: track "4+6" and "6+4" questions
      if (selectedQuestion === '4 + 6') {
        window.redBeltFourPlusSixAsked++;
      } else if (selectedQuestion === '6 + 4') {
        window.redBeltSixPlusFourAsked++;
      }
    } else {
      // Level 1: track "0+4" and "4+0" questions
      if (selectedQuestion === '0 + 4') {
        window.redBeltZeroPlusFourAsked++;
      } else if (selectedQuestion === '4 + 0') {
        window.redBeltFourPlusZeroAsked++;
      }
    }
    
    // Return the appropriate question object based on the selected question
    if (isLevel2) {
      // Level 2 red belt questions
      if (selectedQuestion === '2 + 2') {
        // It's a "2+2" question
        const shuffledAnswers = [2, 3, 4, 5].sort(() => Math.random() - 0.5);
        return { question: '2 + 2', correctAnswer: 4, answers: shuffledAnswers, multiplier: 2, difficulty: 'red' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || 
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '0 + 3' || 
                 selectedQuestion === '3 + 0' || selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || 
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '1 + 1' ||
                 selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' || selectedQuestion === '1 + 3' ||
                 selectedQuestion === '3 + 1' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ) {
        // It's a question from Level 1 belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'red' };
        }
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'red' };
      }
    } else if (isLevel3) {
      // Level 3 red belt questions
      if (selectedQuestion === '0 + 10') {
        // It's a "0+10" question
        const shuffledAnswers = [9, 10, 11, 12].sort(() => Math.random() - 0.5);
        return { question: '0 + 10', correctAnswer: 10, answers: shuffledAnswers, multiplier: 0, difficulty: 'red' };
      } else if (selectedQuestion === '10 + 0') {
        // It's a "10+0" question
        const shuffledAnswers = [9, 10, 11, 12].sort(() => Math.random() - 0.5);
        return { question: '10 + 0', correctAnswer: 10, answers: shuffledAnswers, multiplier: 10, difficulty: 'red' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' ||
                 selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                 selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' || selectedQuestion === '7 + 0' ||
                 selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' || selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' ) {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'red' };
        }
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'red' };
      }
    } else if (isLevel4) {
      // Level 4 red belt questions
      if (selectedQuestion === '2 + 4') {
        // It's a "2+4" question
        const shuffledAnswers = [3, 4, 5, 6].sort(() => Math.random() - 0.5);
        return { question: '2 + 4', correctAnswer: 6, answers: shuffledAnswers, multiplier: 2, difficulty: 'red' };
      } else if (selectedQuestion === '4 + 2') {
        // It's a "4+2" question
        const shuffledAnswers = [3, 4, 5, 6].sort(() => Math.random() - 0.5);
        return { question: '4 + 2', correctAnswer: 6, answers: shuffledAnswers, multiplier: 4, difficulty: 'red' };
      } else if ( selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' ||
                  selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                  selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                  selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                  selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                  selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' || selectedQuestion === '7 + 0' ||
                  selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' || selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' ||
                  selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' || selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' ||
                  selectedQuestion === '1 + 7' || selectedQuestion === '7 + 1' || selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' ||
                  selectedQuestion === '1 + 9' || selectedQuestion === '9 + 1' ) {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'red' };
      }
    } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'red' };
      }
    } else if (isLevel5) {
      // Level 5 red belt questions
      if (selectedQuestion === '3 + 4') {
        // It's a "3+4" question
        const shuffledAnswers = [4, 5, 6, 7].sort(() => Math.random() - 0.5); 
        return { question: '3 + 4', correctAnswer: 7, answers: shuffledAnswers, multiplier: 3, difficulty: 'red' };
      } else if (selectedQuestion === '4 + 3') {
        // It's a "4+3" question
        const shuffledAnswers = [4, 5, 6, 7].sort(() => Math.random() - 0.5);
        return { question: '4 + 3', correctAnswer: 7, answers: shuffledAnswers, multiplier: 4, difficulty: 'red' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' ||
                 selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                 selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' || selectedQuestion === '7 + 0' ||
                 selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' || selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' ||
                 selectedQuestion === '0 + 10' || selectedQuestion === '10 + 0' ||
                 selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' || selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' ||
                 selectedQuestion === '1 + 7' || selectedQuestion === '7 + 1' || selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' ||
                 selectedQuestion === '1 + 9' || selectedQuestion === '9 + 1' || selectedQuestion === '2 + 4' || selectedQuestion === '4 + 2' ||
                 selectedQuestion === '2 + 5' || selectedQuestion === '5 + 2' || selectedQuestion === '2 + 6' || selectedQuestion === '6 + 2' ||
                 selectedQuestion === '2 + 7' || selectedQuestion === '7 + 2' || selectedQuestion === '2 + 8' || selectedQuestion === '8 + 2' ||
                 selectedQuestion === '3 + 3' ) {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'red' };
        }
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'red' };
      }
    } else if (isLevel6) {
      // Level 6 red belt questions
      if (selectedQuestion === '4 + 6') {
        // It's a "4+6" question
        const shuffledAnswers = [10, 9, 11, 8].sort(() => Math.random() - 0.5);
        return { question: '4 + 6', correctAnswer: 10, answers: shuffledAnswers, multiplier: 4, difficulty: 'red' };
      } else if (selectedQuestion === '6 + 4') {
        // It's a "6+4" question
        const shuffledAnswers = [10, 9, 11, 8].sort(() => Math.random() - 0.5);
        return { question: '6 + 4', correctAnswer: 10, answers: shuffledAnswers, multiplier: 6, difficulty: 'red' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '1 + 1' ||
                 selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' ||
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '1 + 3' || selectedQuestion === '3 + 1' ||
                 selectedQuestion === '0 + 3' || selectedQuestion === '3 + 0' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' || selectedQuestion === '7 + 0' ||
                 selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' || selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' ||
                 selectedQuestion === '0 + 10' || selectedQuestion === '10 + 0' ||
                 selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' || selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' ||
                 selectedQuestion === '1 + 7' || selectedQuestion === '7 + 1' || selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' ||
                 selectedQuestion === '1 + 9' || selectedQuestion === '9 + 1' || selectedQuestion === '2 + 4' || selectedQuestion === '4 + 2' ||
                 selectedQuestion === '2 + 5' || selectedQuestion === '5 + 2' || selectedQuestion === '2 + 6' || selectedQuestion === '6 + 2' ||
                 selectedQuestion === '2 + 7' || selectedQuestion === '7 + 2' || selectedQuestion === '2 + 8' || selectedQuestion === '8 + 2' ||
                 selectedQuestion === '3 + 3' || selectedQuestion === '3 + 4' || selectedQuestion === '4 + 3' ||
                 selectedQuestion === '3 + 5' || selectedQuestion === '5 + 3' || selectedQuestion === '3 + 6' || selectedQuestion === '6 + 3' || selectedQuestion === '3 + 7' || selectedQuestion === '7 + 3' ||
                 selectedQuestion === '4 + 4' || selectedQuestion === '4 + 5' || selectedQuestion === '5 + 4' ) {
        // It's a question from previous level belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'red' };
        }
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'red' };
      }
    } else {
      // Level 1 red belt questions
      if (selectedQuestion === '0 + 4') {
        // It's a "0+4" question
        const shuffledAnswers = [0, 1, 2, 4].sort(() => Math.random() - 0.5);
        return { question: '0 + 4', correctAnswer: 4, answers: shuffledAnswers, multiplier: 0, difficulty: 'red' };
      } else if (selectedQuestion === '4 + 0') {
        // It's a "4+0" question
        const shuffledAnswers = [0, 1, 2, 4].sort(() => Math.random() - 0.5);
        return { question: '4 + 0', correctAnswer: 4, answers: shuffledAnswers, multiplier: 4, difficulty: 'red' };
      } else if (selectedQuestion === '0 + 3') {
        // It's a "0+3" question from blue belt
        const shuffledAnswers = [2, 3, 4, 5].sort(() => Math.random() - 0.5);
        return { question: '0 + 3', correctAnswer: 3, answers: shuffledAnswers, multiplier: 0, difficulty: 'blue' };
      } else if (selectedQuestion === '3 + 0') {
        // It's a "3+0" question from blue belt
        const shuffledAnswers = [2, 3, 4, 5].sort(() => Math.random() - 0.5);
        return { question: '3 + 0', correctAnswer: 3, answers: shuffledAnswers, multiplier: 3, difficulty: 'blue' };
      } else if (selectedQuestion === '0 + 2') {
        // It's a "0+2" question from green belt
        const shuffledAnswers = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
        return { question: '0 + 2', correctAnswer: 2, answers: shuffledAnswers, multiplier: 0, difficulty: 'green' };
      } else if (selectedQuestion === '2 + 0') {
        // It's a "2+0" question from green belt
        const shuffledAnswers = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
        return { question: '2 + 0', correctAnswer: 2, answers: shuffledAnswers, multiplier: 2, difficulty: 'green' };
      } else if (selectedQuestion === '0 + 1') {
        // It's a "0+1" question from yellow belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 1', correctAnswer: 1, answers: shuffledAnswers, multiplier: 1, difficulty: 'yellow' };
      } else if (selectedQuestion === '1 + 0') {
        // It's a "1+0" question from yellow belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '1 + 0', correctAnswer: 1, answers: shuffledAnswers, multiplier: 1, difficulty: 'yellow' };
      } else if (selectedQuestion === '0 + 0') {
        // It's a "0+0" question from white belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 0', correctAnswer: 0, answers: shuffledAnswers, multiplier: 0, difficulty: 'white' };
      } else {
        // It's a number recognition question from white belt
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'red' };
      }
    }
  }
  
  // Special handling for Brown Belt: 2 "0+5" + 2 "5+0" + 16 from white/yellow/green/blue/red belt, total 20 questions
  if (difficulty === 'brown') {
    // Check if this is Level 2 brown belt
    const isLevel1 = selectedTable === 1;
    const isLevel2 = selectedTable === 2;
    const isLevel3 = selectedTable === 3;
    const isLevel4 = selectedTable === 4;
    const isLevel5 = selectedTable === 5;
    const isLevel6 = selectedTable === 6;

    console.log('DEBUG: generateBeltQuestion brown belt - selectedTable:', selectedTable, 'isLevel2:', isLevel2);
    
    // Create a shuffled sequence that ensures exactly 2 "0+5", 2 "5+0", and 6 questions from white/yellow/green/blue/red belt
    if (!window.brownBeltFullSequence) {
      let finalSequence;
      if (isLevel2) {
        console.log('DEBUG: Taking Level 2 brown belt path');
        // Level 2 brown belt: 2 "2+3" + 2 "3+2" + 16 from Level 1 belts and Level 2 white/yellow/green/blue/red belts
        const level2Pool = [
          // Core facts: 2 "2+3" and 2 "3+2" questions
          '2 + 3', '2 + 3',  // 2 "2+3" questions
          '3 + 2', '3 + 2',  // 2 "3+2" questions
          // Questions from Level 1 belts
          '0 + 0',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Questions from Level 2 white, yellow, green, blue, and red belts
          '1 + 1',  // Level 2 white belt
          '1 + 2', '2 + 1',  // Level 2 yellow belt
          '1 + 3', '3 + 1',  // Level 2 green belt
          '1 + 4', '4 + 1',  // Level 2 blue belt
          '2 + 2',  // Level 2 red belt
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ];
        
        // Randomly select exactly 6 questions from the pool (excluding the 4 core facts)
        const remainingPool = level2Pool.filter(q => q !== '2 + 3' && q !== '3 + 2');
        const selectedQuestions = [];
        
        // Add the 4 core facts first
        selectedQuestions.push('2 + 3', '2 + 3', '3 + 2', '3 + 2');
        
        // Randomly select 16 more questions from the remaining pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
        console.log('DEBUG: Level 2 brown belt finalSequence:', finalSequence);
      } else if (isLevel3) {
        console.log('DEBUG: Taking Level 3 brown belt path');
        // Level 3 brown belt: 2 "1+5" + 2 "5+1" + 6 from previous level belts and white/yellow/green/blue/red level 3
        const level3Pool = [
          // Core facts: 2 "1+5" and 2 "5+1" questions
          '1 + 5', '1 + 5',  // 2 "1+5" questions
          '5 + 1', '5 + 1',  // 2 "5+1" questions
          // Questions from previous level belts and white/yellow/green/blue/red level 3
          '0 + 0',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Questions from Level 2 white, yellow, green, blue, and red belts
          '1 + 1',  // Level 2 white belt
          '1 + 2', '2 + 1',  // Level 2 yellow belt
          '1 + 3', '3 + 1',  // Level 2 green belt
          '1 + 4', '4 + 1',  // Level 2 blue belt
          '2 + 2',
          '0 + 6', '6 + 0',  // white belt level 3
          '0 + 7', '7 + 0',  // yellow belt level 3
          '0 + 8', '8 + 0',  // green belt level 3
          '0 + 9', '9 + 0',  // blue belt level 3
          '0 + 10', '10 + 0',  // red belt level 3
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ];
        
        // Randomly select exactly 6 questions from the pool (excluding the 4 core facts)
        const remainingPool = level3Pool.filter(q => q !== '1 + 5' && q !== '5 + 1');
        const selectedQuestions = [];
        
        // Add the 4 core facts first
        selectedQuestions.push('1 + 5', '1 + 5', '5 + 1', '5 + 1');
        
        // Randomly select 6 more questions from the remaining pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
        console.log('DEBUG: Level 3 brown belt finalSequence:', finalSequence);
      } else if (isLevel4) {
        // Level 4 brown belt: 2 "2+5" + 2 "5+2" + 6 from previous levels
        const level4Pool = [
          '2 + 5', '2 + 5',  // 2 "2+5" questions
          '5 + 2', '5 + 2',  // 2 "5+2" questions
          // Questions from previous levels (level 1-3 all belts only)
          // Level 1 belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 2 belts
          '1 + 1',
          '1 + 2', '2 + 1',  // yellow belt
          '1 + 3', '3 + 1',  // green belt
          '1 + 4', '4 + 1',  // blue belt
          '2 + 2',           // red belt
          '2 + 3', '3 + 2',  // brown belt  
          // Level 3 belts
          '0 + 6', '6 + 0',  // white belt
          '0 + 7', '7 + 0',  // yellow belt
          '0 + 8', '8 + 0',  // green belt
          '0 + 9', '9 + 0',  // blue belt
          '0 + 10', '10 + 0', // red belt
          '1 + 5', '5 + 1',  // brown belt
          // Level 4 belts
          '1 + 6', '6 + 1',
          '1 + 7', '7 + 1',
          '1 + 8', '8 + 1',
          '1 + 9', '9 + 1',
          '2 + 4', '4 + 2', 
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ];
        
        const remainingPool = level4Pool.filter(q => q !== '2 + 5' && q !== '5 + 2');
        const selectedQuestions = [];
        
        // Add the core level 4 brown belt questions
        selectedQuestions.push('2 + 5', '2 + 5', '5 + 2', '5 + 2');
        
        // Add 6 random questions from the remaining pool (levels 1-3 only)
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
      } else if (isLevel5) {
        // Level 5 brown belt: 2 "3+5" + 2 "5+3" + 6 from previous levels
        const level5Pool = [
          '3 + 5', '3 + 5',  // 2 "3+5" questions
          '5 + 3', '5 + 3',  // 2 "5+3" questions
          // Questions from previous levels (level 1-4 all belts only)
          // Level 1 belts
          '0 + 0', '1 + 1',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 2 belts
          '1 + 1',
          '1 + 2', '2 + 1',  // yellow belt
          '1 + 3', '3 + 1',  // green belt
          '1 + 4', '4 + 1',  // blue belt
          '2 + 2',           // red belt
          '2 + 3', '3 + 2',  // brown belt
          // Level 3 belts
          '0 + 6', '6 + 0',  // white belt
          '0 + 7', '7 + 0',  // yellow belt
          '0 + 8', '8 + 0',  // green belt
          '0 + 9', '9 + 0',  // blue belt
          '0 + 10', '10 + 0', // red belt
          '1 + 5', '5 + 1',  // brown belt
          // Level 4 belts
          '1 + 6', '6 + 1',
          '1 + 7', '7 + 1',
          '1 + 8', '8 + 1',
          '1 + 9', '9 + 1',
          '2 + 4', '4 + 2', 
          '2 + 5', '5 + 2',
          // Level 5 belts
          '2 + 6', '6 + 2',
          '2 + 7', '7 + 2',
          '2 + 8', '8 + 2',
          '3 + 3', '3 + 4', '4 + 3',
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ]; 
        const remainingPool = level5Pool.filter(q => q !== '3 + 5' && q !== '5 + 3');
        const selectedQuestions = [];
        
        // Add the core level 5 brown belt questions
        selectedQuestions.push('3 + 5', '3 + 5', '5 + 3', '5 + 3');
        
        // Add 6 random questions from the remaining pool (levels 1-4 only)
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
        console.log('DEBUG: Level 5 brown belt finalSequence:', finalSequence);
      } else if (isLevel6) {
        // Level 6 brown belt: 2 "5+5"+ 8 from previous levels
        const level6Pool = [
          '5 + 5', '5 + 5',  //2 "5+5" questions
          // Questions from previous levels (level 1-5 all belts only)
          // Level 1 belts
          '0 + 0',  // white belt
          '0 + 1', '1 + 0',  // yellow belt
          '0 + 2', '2 + 0',  // green belt
          '0 + 3', '3 + 0',  // blue belt
          '0 + 4', '4 + 0',  // red belt
          '0 + 5', '5 + 0',  // brown belt
          // Level 2 belts
          '1 + 1',
          '1 + 2', '2 + 1',  // yellow belt
          '1 + 3', '3 + 1',  // green belt
          '1 + 4', '4 + 1',  // blue belt
          '2 + 2',           // red belt
          '2 + 3', '3 + 2',  // brown belt
          // Level 3 belts
          '0 + 6', '6 + 0',  // white belt
          '0 + 7', '7 + 0',  // yellow belt 
          '0 + 8', '8 + 0',  // green belt
          '0 + 9', '9 + 0',  // blue belt
          '0 + 10', '10 + 0', // red belt
          '1 + 5', '5 + 1',  // brown belt
          // Level 4 belts
          '1 + 6', '6 + 1',
          '1 + 7', '7 + 1',
          '1 + 8', '8 + 1',
          '1 + 9', '9 + 1',
          '2 + 4', '4 + 2', 
          '2 + 5', '5 + 2',
          // Level 5 belts
          '2 + 6', '6 + 2',
          '2 + 7', '7 + 2',
          '2 + 8', '8 + 2',
          '3 + 3', '3 + 4', '4 + 3',
          '3 + 5', '5 + 3',
          // Level 6 belts 
          '3 + 6', '6 + 3',
          '3 + 7', '7 + 3',
          '4 + 4', '4 + 5', '5 + 4',
          '4 + 6', '6 + 4',
          // Number recognition questions
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ];
        const remainingPool = level6Pool.filter(q => q !== '5 + 5');
        const selectedQuestions = [];
        
        // Add the core level 6 brown belt questions
        selectedQuestions.push('5 + 5', '5 + 5');
        
        // Add 8 random questions from the remaining pool (levels 1-5 only)
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * remainingPool.length);
          selectedQuestions.push(remainingPool[randomIndex]);
          remainingPool.splice(randomIndex, 1);
        }
        
        finalSequence = selectedQuestions;
        console.log('DEBUG: Level 6 brown belt finalSequence:', finalSequence);
      } else {
        console.log('DEBUG: Taking Level 1 brown belt path');
        // Level 1 brown belt: 2 "0+5" + 2 "5+0" + 6 from white/yellow/green/blue/red belt
        const baseSequence = [
          '0 + 5', '0 + 5',  // 2 "0+5" questions
          '5 + 0', '5 + 0',  // 2 "5+0" questions
          '0 + 4', '0 + 4',  // 2 "0+4" questions from red belt
          '4 + 0', '4 + 0',  // 2 "4+0" questions from red belt
          '0 + 3', '0 + 3',  // 2 "0+3" questions from blue belt
          '3 + 0', '3 + 0',  // 2 "3+0" questions from blue belt
          '2 + 0', '2 + 0',  // 2 "2+0" questions from green belt
          '0 + 2', '0 + 2',  // 2 "0+2" questions from green belt
          '0 + 1', '0 + 1',  // 2 "0+1" questions from yellow belt
          '1 + 0', '1 + 0',  // 2 "1+0" questions from yellow belt
          '0 + 0', '0 + 0'   // 2 "0+0" questions from white belt
        ];
        
        // Randomly select exactly 6 questions from white/yellow/green/blue/red belt to ensure total of 10 questions
        const selectedQuestions = [];
        const availableQuestions = [
          '0 + 4', '0 + 4',  // 2 "0+4" questions from red belt
          '4 + 0', '4 + 0',  // 2 "4+0" questions from red belt
          '0 + 3', '0 + 3',  // 2 "0+3" questions from blue belt
          '3 + 0', '3 + 0',  // 2 "3+0" questions from blue belt
          '2 + 0', '2 + 0',  // 2 "2+0" questions from green belt
          '0 + 2', '0 + 2',  // 2 "0+2" questions from green belt
          '0 + 1', '0 + 1',  // 2 "0+1" questions from yellow belt
          '1 + 0', '1 + 0',  // 2 "1+0" questions from yellow belt
          '0 + 0', '0 + 0',  // 2 "0+0" questions from white belt
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9  // 10 numbers from white belt
        ];
        
        // Randomly select 16 questions from the available pool
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * availableQuestions.length);
          selectedQuestions.push(availableQuestions[randomIndex]);
          availableQuestions.splice(randomIndex, 1);
        }
        
        // Create the final sequence with exactly 10 questions
        finalSequence = [
          ...selectedQuestions  // 6 randomly selected questions from white/yellow/green/blue/red belt
        ];
        
        // Insert "0+5" and "5+0" questions at strategic positions to ensure good distribution
        // Insert first "0+5" around position 3-5
        const firstZeroPlusFivePos = Math.floor(Math.random() * 3) + 3; // Position 3, 4, or 5
        finalSequence.splice(firstZeroPlusFivePos, 0, '0 + 5');
        
        // Insert first "5+0" around position 8-10
        const firstFivePlusZeroPos = Math.floor(Math.random() * 3) + 8; // Position 8, 9, or 10
        finalSequence.splice(firstFivePlusZeroPos, 0, '5 + 0');
        
        // Insert second "0+5" around position 13-15
        const secondZeroPlusFivePos = Math.floor(Math.random() * 3) + 13; // Position 13, 14, or 15
        finalSequence.splice(secondZeroPlusFivePos, 0, '0 + 5');
        
        // Insert second "5+0" around position 18-20
        const secondFivePlusZeroPos = Math.floor(Math.random() * 3) + 18; // Position 18, 19, or 20
        finalSequence.splice(secondFivePlusZeroPos, 0, '5 + 0');
        console.log('DEBUG: Level 1 brown belt finalSequence:', finalSequence);
      }
      
      // Create a guaranteed non-consecutive sequence (no consecutive identical questions of any type)
      let shuffledSequence;
      let attempts = 0;
      const maxAttempts = 100;
      
      do {
        // Shuffle the sequence
        shuffledSequence = [...finalSequence].sort(() => Math.random() - 0.5);
        attempts++;
        
        // Check if we have consecutive identical questions of any type
        let hasConsecutive = false;
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            hasConsecutive = true;
            break;
          }
        }
        
        // If no consecutive identical questions, we're good
        if (!hasConsecutive) {
          break;
        }
      } while (attempts < maxAttempts);
      
      // CRITICAL: Verify no consecutive identical questions of any type
      let hasConsecutive = false;
      for (let i = 0; i < shuffledSequence.length - 1; i++) {
        if (shuffledSequence[i] === shuffledSequence[i + 1]) {
          hasConsecutive = true;
          break;
        }
      }
      // If we still have consecutive questions after all attempts, force fix them
      if (hasConsecutive) {
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            // Find a different question to swap with
            for (let j = i + 2; j < shuffledSequence.length; j++) {
              if (shuffledSequence[j] !== shuffledSequence[i]) {
                // Swap to break the consecutive pattern
                [shuffledSequence[i + 1], shuffledSequence[j]] = [shuffledSequence[j], shuffledSequence[i + 1]];
                break;
              }
            }
          }
        }
        
        // Final verification
        hasConsecutive = false;
        for (let i = 0; i < shuffledSequence.length - 1; i++) {
          if (shuffledSequence[i] === shuffledSequence[i + 1]) {
            hasConsecutive = true;
            break;
          }
        }
      }
      
      // Store the shuffled sequence for this quiz session
      window.brownBeltFullSequence = shuffledSequence;
      // Reset the question counter for this session
      window.brownBeltQuestionCounter = 0;
      // Track how many core questions we've asked
      if (isLevel3) {
        // Level 3: track "1+5" and "5+1" questions
        window.brownBeltOnePlusFiveAsked = 0;
        window.brownBeltFivePlusOneAsked = 0;
      } else if (isLevel2) {
        // Level 2: track "2+3" and "3+2" questions
        window.brownBeltTwoPlusThreeAsked = 0;
        window.brownBeltThreePlusTwoAsked = 0;
      } else {
        // Level 1: track "0+5" and "5+0" questions
        window.brownBeltZeroPlusFiveAsked = 0;
        window.brownBeltFivePlusZeroAsked = 0;
      }
    }
    
    // Get the question for this position from the shuffled sequence
    let selectedQuestion = window.brownBeltFullSequence[window.brownBeltQuestionCounter];
    
    // CRITICAL FIX: AGGRESSIVELY prevent consecutive identical questions from EVER occurring
    // This is the main fix that ensures no consecutive identical questions can happen
    if (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion || 
      selectedQuestion === window.lastPracticedQuestion || `${selectedQuestion}` === window.lastPracticedQuestion) {
    // Find ANY question in the sequence that's different from the last question AND last practiced question
    let foundDifferentQuestion = false;
    
    // First, try to find a different question that hasn't been asked yet
    for (let i = 0; i < window.brownBeltFullSequence.length; i++) {
      const candidateQuestion = window.brownBeltFullSequence[i];
      if (candidateQuestion !== lastQuestion && 
          `${candidateQuestion}` !== lastQuestion &&
          candidateQuestion !== window.lastPracticedQuestion &&
          `${candidateQuestion}` !== window.lastPracticedQuestion) {
        selectedQuestion = candidateQuestion;
        window.brownBeltQuestionCounter = i;
        foundDifferentQuestion = true;
        break;
      }
    }
    
    // If no unasked different question found, find ANY different question (even if asked before)
    if (!foundDifferentQuestion) {
      for (let i = 0; i < window.brownBeltFullSequence.length; i++) {
        const candidateQuestion = window.brownBeltFullSequence[i];
        if (candidateQuestion !== lastQuestion && 
            `${candidateQuestion}` !== lastQuestion &&
            candidateQuestion !== window.lastPracticedQuestion &&
            `${candidateQuestion}` !== window.lastPracticedQuestion) {
          selectedQuestion = candidateQuestion;
          window.brownBeltQuestionCounter = i;
          foundDifferentQuestion = true;
          break;
        }
      }
    }
    
    // If still no different question found, this should never happen with our sequence
    if (!foundDifferentQuestion) {
      // Force select the first question that's different from both last question and last practiced
      const firstDifferent = window.brownBeltFullSequence.find(q => 
        q !== lastQuestion && 
        q !== window.lastPracticedQuestion
      );
      if (firstDifferent !== undefined) {
        selectedQuestion = firstDifferent;
        const foundIndex = window.brownBeltFullSequence.indexOf(firstDifferent);
        if (foundIndex !== -1) {
          window.brownBeltQuestionCounter = foundIndex;
        }
      }
    }
  }
    
    // ULTIMATE SAFETY CHECK: For the first question of any quiz, ensure it's NEVER the same as lastQuestion
    if (totalQuestions === 0 && (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion)) {
      // Find ANY question that's different from lastQuestion
      let forcedQuestion = null;
      for (let i = 0; i < window.brownBeltFullSequence.length; i++) {
        const candidate = window.brownBeltFullSequence[i];
        if (candidate !== lastQuestion && `${candidate}` !== lastQuestion) {
          forcedQuestion = candidate;
          window.brownBeltQuestionCounter = i;
          break;
        }
      }
      
      if (forcedQuestion !== null) {
        selectedQuestion = forcedQuestion;
      }
    }
    
    // Increment the question counter for next time
    window.brownBeltQuestionCounter++;
    
    // Track core questions asked based on level
    if (isLevel2) {
      // Level 2: track "2+3" and "3+2" questions
      if (selectedQuestion === '2 + 3') {
        window.brownBeltTwoPlusThreeAsked++;
      } else if (selectedQuestion === '3 + 2') {
        window.brownBeltThreePlusTwoAsked++;
      }
    } else if (isLevel3) {
      // Level 3: track "1+5" and "5+1" questions
      if (selectedQuestion === '1 + 5') {
        window.brownBeltOnePlusFiveAsked++;
      } else if (selectedQuestion === '5 + 1') {
        window.brownBeltFivePlusOneAsked++;
      }
    } else if (isLevel4) {
      // Level 4: track "2+5" and "5+2" questions
      if (selectedQuestion === '2 + 5') {
        window.brownBeltTwoPlusFiveAsked++;
      } else if (selectedQuestion === '5 + 2') {
        window.brownBeltFivePlusTwoAsked++;
      }
    } else if (isLevel5) {
      // Level 5: track "3+5" and "5+3" questions
      if (selectedQuestion === '3 + 5') {
        window.brownBeltThreePlusFiveAsked++;
      } else if (selectedQuestion === '5 + 3') {
        window.brownBeltFivePlusThreeAsked++;
      }
    } else if (isLevel6) {  
      // Level 6: track "5+5" questions
      if (selectedQuestion === '5 + 5') {
        window.brownBeltFivePlusFiveAsked++;
      }
    } else {
      // Level 1: track "0+5" and "5+0" questions
      if (selectedQuestion === '0 + 5') {
        window.brownBeltZeroPlusFiveAsked++;
      } else if (selectedQuestion === '5 + 0') {
        window.brownBeltFivePlusZeroAsked++;
      }
    }
    
    // Return the appropriate question object based on the selected question
    if (isLevel2) {
      // Level 2 brown belt questions
      if (selectedQuestion === '2 + 3') {
        // It's a "2+3" question
        const shuffledAnswers = [3, 4, 5, 6].sort(() => Math.random() - 0.5);
        return { question: '2 + 3', correctAnswer: 5, answers: shuffledAnswers, multiplier: 2, difficulty: 'brown' };
      } else if (selectedQuestion === '3 + 2') {
        // It's a "3+2" question
        const shuffledAnswers = [3, 4, 5, 6].sort(() => Math.random() - 0.5);
        return { question: '3 + 2', correctAnswer: 5, answers: shuffledAnswers, multiplier: 3, difficulty: 'brown' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || 
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '0 + 3' || 
                 selectedQuestion === '3 + 0' || selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || 
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '1 + 1' ||
                 selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' || selectedQuestion === '1 + 3' ||
                 selectedQuestion === '3 + 1' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '2 + 2' ) {
        // It's a question from Level 1 belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'brown' };
        }
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'brown' };
      }
    } else if (isLevel3) {
      // ✅ ADD THIS: Level 3 brown belt questions
      if (selectedQuestion === '1 + 5') {
        // It's a "1+5" question
        const shuffledAnswers = [4, 5, 6, 7].sort(() => Math.random() - 0.5);
        return { question: '1 + 5', correctAnswer: 6, answers: shuffledAnswers, multiplier: 1, difficulty: 'brown' };
      } else if (selectedQuestion === '5 + 1') {
        // It's a "5+1" question
        const shuffledAnswers = [4, 5, 6, 7].sort(() => Math.random() - 0.5);
        return { question: '5 + 1', correctAnswer: 6, answers: shuffledAnswers, multiplier: 5, difficulty: 'brown' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || 
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '0 + 3' || 
                 selectedQuestion === '3 + 0' || selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || 
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '1 + 1' ||
                 selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' || selectedQuestion === '1 + 3' ||
                 selectedQuestion === '3 + 1' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' ||
                 selectedQuestion === '7 + 0' || selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' ||
                 selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' || selectedQuestion === '0 + 10' ||
                 selectedQuestion === '10 + 0') {
                  // It's a question from Level 3 belts
                  const parts = selectedQuestion.split(' + ');
                  if (parts.length === 2) {
                    const num1 = parseInt(parts[0]);
                    const num2 = parseInt(parts[1]);
                    const correctAnswer = num1 + num2;
                    const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
                    return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'brown' };
                  }
      } else {
                  // It's a number recognition question
                  const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
                  return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'brown' };
                }
    } else if (isLevel4) {
      // Level 4 brown belt questions
      if (selectedQuestion === '2 + 5') {
        // It's a "2+5" question
        const shuffledAnswers = [4, 5, 6, 7].sort(() => Math.random() - 0.5);
        return { question: '2 + 5', correctAnswer: 7, answers: shuffledAnswers, multiplier: 2, difficulty: 'brown' };
      } else if (selectedQuestion === '5 + 2') {
        // It's a "5+2" question
        const shuffledAnswers = [4, 5, 6, 7].sort(() => Math.random() - 0.5);
        return { question: '5 + 2', correctAnswer: 7, answers: shuffledAnswers, multiplier: 5, difficulty: 'brown' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || 
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '0 + 3' || 
                 selectedQuestion === '3 + 0' || selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || 
                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '1 + 1' ||
                 selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' || selectedQuestion === '1 + 3' ||
                 selectedQuestion === '3 + 1' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                 selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                 selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' ||
                 selectedQuestion === '7 + 0' || selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' ||
                 selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' || selectedQuestion === '0 + 10' ||
                 selectedQuestion === '10 + 0' || selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' ||
                 selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' || selectedQuestion === '1 + 7' ||
                 selectedQuestion === '7 + 1' || selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' ||
                 selectedQuestion === '1 + 9' || selectedQuestion === '9 + 1' || selectedQuestion === '2 + 4' || 
                 selectedQuestion === '4 + 2' ) {
                  // It's a question from Level 4 belts
          const parts = selectedQuestion.split(' + ');
          if (parts.length === 2) {
            const num1 = parseInt(parts[0]);
            const num2 = parseInt(parts[1]);
            const correctAnswer = num1 + num2;
            const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
            return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'brown' };
          }
                  } else {
          // It's a number recognition question
                  const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
                  return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'brown' };
                  }
                } else if (isLevel5) {
                  // Level 5 brown belt questions
                  if (selectedQuestion === '3 + 5') {
                    // It's a "3+5" question
                    const shuffledAnswers = [6, 7, 8, 9].sort(() => Math.random() - 0.5);
                    return { question: '3 + 5', correctAnswer: 8, answers: shuffledAnswers, multiplier: 3, difficulty: 'brown' };
                  } else if (selectedQuestion === '5 + 3') { 
                    // It's a "5+3" question
                    const shuffledAnswers = [6, 7, 8, 9].sort(() => Math.random() - 0.5);
                    return { question: '5 + 3', correctAnswer: 8, answers: shuffledAnswers, multiplier: 5, difficulty: 'brown' };
                  } else if ( selectedQuestion === '0 + 0' || selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || 
                              selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '0 + 3' || 
                              selectedQuestion === '3 + 0' || selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || 
                              selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '1 + 1' ||
                              selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' || selectedQuestion === '1 + 3' ||
                              selectedQuestion === '3 + 1' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                              selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                              selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' ||
                              selectedQuestion === '7 + 0' || selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' ||
                              selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' || selectedQuestion === '0 + 10' ||
                              selectedQuestion === '10 + 0' || selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' ||
                              selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' || selectedQuestion === '1 + 7' ||
                              selectedQuestion === '7 + 1' || selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' ||
                              selectedQuestion === '1 + 9' || selectedQuestion === '9 + 1' || selectedQuestion === '2 + 4' || 
                              selectedQuestion === '4 + 2' || selectedQuestion === '2 + 5' || selectedQuestion === '5 + 2' ||
                              selectedQuestion === '2 + 6' || selectedQuestion === '6 + 2' || selectedQuestion === '2 + 7' ||
                              selectedQuestion === '7 + 2' || selectedQuestion === '2 + 8' || selectedQuestion === '8 + 2' ||
                              selectedQuestion === '3 + 3' || selectedQuestion === '3 + 4' || selectedQuestion === '4 + 3' ) {
                                // It's a question from Level 5 belts
                                const parts = selectedQuestion.split(' + ');
                                if (parts.length === 2) {
                                  const num1 = parseInt(parts[0]);
                                  const num2 = parseInt(parts[1]);
                                  const correctAnswer = num1 + num2;
                                  const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
                                  return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'brown' };
                                }
                              } else {
                                // It's a number recognition question
                                const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
                                return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'brown' };
                              }
                            } else if (isLevel6) {
                              // Level 6 brown belt questions
                              if (selectedQuestion === '5 + 5') {
                                // It's a "5+5" question
                                const shuffledAnswers = [10, 9, 11, 8].sort(() => Math.random() - 0.5);
                                return { question: '5 + 5', correctAnswer: 10, answers: shuffledAnswers, multiplier: 5, difficulty: 'brown' };
      } else if (selectedQuestion === '0 + 0' || selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || 
                 selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '0 + 3' || 
                 selectedQuestion === '3 + 0' || selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || 
                                 selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '1 + 1' ||
                                 selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' || selectedQuestion === '1 + 3' ||
                                 selectedQuestion === '3 + 1' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                                 selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                                 selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' ||
                                 selectedQuestion === '7 + 0' || selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' ||
                                 selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' || selectedQuestion === '0 + 10' ||
                                 selectedQuestion === '10 + 0' || selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' ||
                                 selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' || selectedQuestion === '1 + 7' ||
                                 selectedQuestion === '7 + 1' || selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' ||
                                 selectedQuestion === '1 + 9' || selectedQuestion === '9 + 1' || selectedQuestion === '2 + 4' || 
                                 selectedQuestion === '4 + 2' || selectedQuestion === '2 + 5' || selectedQuestion === '5 + 2' ||
                                 selectedQuestion === '2 + 6' || selectedQuestion === '6 + 2' || selectedQuestion === '2 + 7' ||
                                 selectedQuestion === '7 + 2' || selectedQuestion === '2 + 8' || selectedQuestion === '8 + 2' ||
                                 selectedQuestion === '3 + 3' || selectedQuestion === '3 + 4' || selectedQuestion === '4 + 3' ||
                                 selectedQuestion === '3 + 5' || selectedQuestion === '5 + 3' || selectedQuestion === '3 + 6' ||
                                 selectedQuestion === '6 + 3' || selectedQuestion === '3 + 7' || selectedQuestion === '7 + 3' ||
                                 selectedQuestion === '4 + 5' || selectedQuestion === '5 + 4' || selectedQuestion === '4 + 4' ||
                                 selectedQuestion === '4 + 6' || selectedQuestion === '6 + 4' ) {
                                  // It's a question from Level 6 belts
        const parts = selectedQuestion.split(' + ');
        if (parts.length === 2) {
          const num1 = parseInt(parts[0]);
          const num2 = parseInt(parts[1]);
          const correctAnswer = num1 + num2;
          const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
          return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'brown' };
        }
      } else {
        // It's a number recognition question
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'brown' };
      }
    } else {
      // Level 1 brown belt questions
      if (selectedQuestion === '0 + 5') {
        // It's a "0+5" question
        const shuffledAnswers = [0, 1, 2, 5].sort(() => Math.random() - 0.5);
        return { question: '0 + 5', correctAnswer: 5, answers: shuffledAnswers, multiplier: 0, difficulty: 'brown' };
      } else if (selectedQuestion === '5 + 0') {
        // It's a "5+0" question
        const shuffledAnswers = [0, 1, 2, 5].sort(() => Math.random() - 0.5);
        return { question: '5 + 0', correctAnswer: 5, answers: shuffledAnswers, multiplier: 5, difficulty: 'brown' };
      } else if (selectedQuestion === '0 + 4') {
        // It's a "0+4" question from red belt
        const shuffledAnswers = [0, 1, 2, 4].sort(() => Math.random() - 0.5);
        return { question: '0 + 4', correctAnswer: 4, answers: shuffledAnswers, multiplier: 0, difficulty: 'brown' };
      } else if (selectedQuestion === '4 + 0') {
        // It's a "4+0" question from red belt
        const shuffledAnswers = [0, 1, 2, 4].sort(() => Math.random() - 0.5);
        return { question: '4 + 0', correctAnswer: 4, answers: shuffledAnswers, multiplier: 4, difficulty: 'brown' };
      } else if (selectedQuestion === '0 + 3') {
        // It's a "0+3" question from blue belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 3', correctAnswer: 3, answers: shuffledAnswers, multiplier: 0, difficulty: 'brown' };
      } else if (selectedQuestion === '3 + 0') {
        // It's a "3+0" question from blue belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '3 + 0', correctAnswer: 3, answers: shuffledAnswers, multiplier: 3, difficulty: 'brown' };
      } else if (selectedQuestion === '2 + 0') {
        // It's a "2+0" question from green belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '2 + 0', correctAnswer: 2, answers: shuffledAnswers, multiplier: 2, difficulty: 'brown' };
      } else if (selectedQuestion === '0 + 2') {
        // It's a "0+2" question from green belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 2', correctAnswer: 2, answers: shuffledAnswers, multiplier: 0, difficulty: 'brown' };
      } else if (selectedQuestion === '0 + 1') {
        // It's a "0+1" question from yellow belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 1', correctAnswer: 1, answers: shuffledAnswers, multiplier: 0, difficulty: 'brown' };
      } else if (selectedQuestion === '1 + 0') {
        // It's a "1+0" question from yellow belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '1 + 0', correctAnswer: 1, answers: shuffledAnswers, multiplier: 1, difficulty: 'brown' };
      } else if (selectedQuestion === '0 + 0') {
        // It's a "0+0" question from white belt
        const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        return { question: '0 + 0', correctAnswer: 0, answers: shuffledAnswers, multiplier: 0, difficulty: 'brown' };
      } else {
        // It's a number recognition question from white belt
        const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'brown' };
      } 
    }
} else if (difficulty.startsWith('black')) {
// Check if this is Level 2 black belt
const isLevel1 = selectedTable === 1;
const isLevel2 = selectedTable === 2;
const isLevel3 = selectedTable === 3;
const isLevel4 = selectedTable === 4;
const isLevel5 = selectedTable === 5;
const isLevel6 = selectedTable === 6;

console.log('DEBUG: generateBeltQuestion black belt - selectedTable:', selectedTable, 'isLevel2:', isLevel2);

// Create a shuffled sequence that ensures exactly 20 questions
if (!window.blackBeltFullSequence) {
  let finalSequence;
  if (isLevel2) {
    console.log('DEBUG: Taking Level 2 black belt path');
    // Level 2 black belt: 20 questions from Level 1 and Level 2 belts
    const level2Pool = [
      // Questions from Level 1 belts
      '0 + 0',  // white belt
      '0 + 1', '1 + 0',  // yellow belt
      '0 + 2', '2 + 0',  // green belt
      '0 + 3', '3 + 0',  // blue belt
      '0 + 4', '4 + 0',  // red belt
      '0 + 5', '5 + 0',  // brown belt
      // Questions from Level 2 white, yellow, green, blue, and red belts
      '1 + 1',  // Level 2 white belt
      '1 + 2', '2 + 1',  // Level 2 yellow belt
      '1 + 3', '3 + 1',  // Level 2 green belt
      '1 + 4', '4 + 1',  // Level 2 blue belt
      '2 + 2',  // Level 2 red belt
      // Number recognition questions
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    ];
    
    // Randomly select exactly 20 questions from the pool
    const selectedQuestions = [];
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * level2Pool.length);
      selectedQuestions.push(level2Pool[randomIndex]);
    }
    
    finalSequence = selectedQuestions;
    console.log('DEBUG: Level 2 black belt finalSequence:', finalSequence);
  } else if (isLevel3) {
    console.log('DEBUG: Taking Level 3 black belt path');
    // Level 3 black belt: 20 questions from previous levels
    const level3Pool = [
      // Questions from Level 1 belts
      '0 + 0',  // white belt
      '0 + 1', '1 + 0',  // yellow belt
      '0 + 2', '2 + 0',  // green belt
      '0 + 3', '3 + 0',  // blue belt
      '0 + 4', '4 + 0',  // red belt
      '0 + 5', '5 + 0',  // brown belt
      // Questions from Level 2 belts
      '1 + 1',
      '1 + 2', '2 + 1',  // yellow belt
      '1 + 3', '3 + 1',  // green belt
      '1 + 4', '4 + 1',  // blue belt
      '2 + 2',           // red belt
      '2 + 3', '3 + 2',  // brown belt
      // Questions from Level 3 belts
      '0 + 6', '6 + 0',  // white belt
      '0 + 7', '7 + 0',  // yellow belt
      '0 + 8', '8 + 0',  // green belt
      '0 + 9', '9 + 0',  // blue belt
      '0 + 10', '10 + 0',  // red belt
      '1 + 5', '5 + 1',  // brown belt
      // Number recognition questions
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ];
    
    // Randomly select exactly 20 questions from the pool
    const selectedQuestions = [];
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * level3Pool.length);
      selectedQuestions.push(level3Pool[randomIndex]);
    }
    
    finalSequence = selectedQuestions;
    console.log('DEBUG: Level 3 black belt finalSequence:', finalSequence);
  } else if (isLevel4) {
    // Level 4 black belt: 20 questions from previous levels
    const level4Pool = [
      // Questions from Level 1 belts
      '0 + 0', '1 + 1',  // white belt
      '0 + 1', '1 + 0',  // yellow belt
      '0 + 2', '2 + 0',  // green belt
      '0 + 3', '3 + 0',  // blue belt
      '0 + 4', '4 + 0',  // red belt
      '0 + 5', '5 + 0',  // brown belt
      // Level 2 belts
      '1 + 1',
      '1 + 2', '2 + 1',  // yellow belt
      '1 + 3', '3 + 1',  // green belt
      '1 + 4', '4 + 1',  // blue belt
      '2 + 2',           // red belt
      '2 + 3', '3 + 2',  // brown belt  
      // Level 3 belts
      '0 + 6', '6 + 0',  // white belt
      '0 + 7', '7 + 0',  // yellow belt
      '0 + 8', '8 + 0',  // green belt
      '0 + 9', '9 + 0',  // blue belt
      '0 + 10', '10 + 0', // red belt
      '1 + 5', '5 + 1',  // brown belt
      // Level 4 belts
      '1 + 6', '6 + 1',
      '1 + 7', '7 + 1',
      '1 + 8', '8 + 1',
      '1 + 9', '9 + 1',
      '2 + 4', '4 + 2', 
      // Number recognition questions
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ];
    
    // Randomly select exactly 20 questions from the pool
    const selectedQuestions = [];
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * level4Pool.length);
      selectedQuestions.push(level4Pool[randomIndex]);
    }
    
    finalSequence = selectedQuestions;
  } else if (isLevel5) {
    // Level 5 black belt: 20 questions from previous levels
    const level5Pool = [
      // Questions from Level 1 belts
      '0 + 0', '1 + 1',  // white belt
      '0 + 1', '1 + 0',  // yellow belt
      '0 + 2', '2 + 0',  // green belt
      '0 + 3', '3 + 0',  // blue belt
      '0 + 4', '4 + 0',  // red belt
      '0 + 5', '5 + 0',  // brown belt
      // Level 2 belts
      '1 + 1',
      '1 + 2', '2 + 1',  // yellow belt
      '1 + 3', '3 + 1',  // green belt
      '1 + 4', '4 + 1',  // blue belt
      '2 + 2',           // red belt
      '2 + 3', '3 + 2',  // brown belt
      // Level 3 belts
      '0 + 6', '6 + 0',  // white belt
      '0 + 7', '7 + 0',  // yellow belt
      '0 + 8', '8 + 0',  // green belt
      '0 + 9', '9 + 0',  // blue belt
      '0 + 10', '10 + 0', // red belt
      '1 + 5', '5 + 1',  // brown belt
      // Level 4 belts
      '1 + 6', '6 + 1',
      '1 + 7', '7 + 1',
      '1 + 8', '8 + 1',
      '1 + 9', '9 + 1',
      '2 + 4', '4 + 2', 
      '2 + 5', '5 + 2',
      // Level 5 belts
      '2 + 6', '6 + 2',
      '2 + 7', '7 + 2',
      '2 + 8', '8 + 2',
      '3 + 3', '3 + 4', '4 + 3',
      // Number recognition questions
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ]; 
    
    // Randomly select exactly 20 questions from the pool
    const selectedQuestions = [];
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * level5Pool.length);
      selectedQuestions.push(level5Pool[randomIndex]);
    }
    
    finalSequence = selectedQuestions;
    console.log('DEBUG: Level 5 black belt finalSequence:', finalSequence);
  } else if (isLevel6) {
    // Level 6 black belt: 20 questions from previous levels
    const level6Pool = [
      // Questions from Level 1 belts
      '0 + 0',  // white belt
      '0 + 1', '1 + 0',  // yellow belt
      '0 + 2', '2 + 0',  // green belt
      '0 + 3', '3 + 0',  // blue belt
      '0 + 4', '4 + 0',  // red belt
      '0 + 5', '5 + 0',  // brown belt
      // Level 2 belts
      '1 + 1',
      '1 + 2', '2 + 1',  // yellow belt
      '1 + 3', '3 + 1',  // green belt
      '1 + 4', '4 + 1',  // blue belt
      '2 + 2',           // red belt
      '2 + 3', '3 + 2',  // brown belt
      // Level 3 belts
      '0 + 6', '6 + 0',  // white belt
      '0 + 7', '7 + 0',  // yellow belt 
      '0 + 8', '8 + 0',  // green belt
      '0 + 9', '9 + 0',  // blue belt
      '0 + 10', '10 + 0', // red belt
      '1 + 5', '5 + 1',  // brown belt
      // Level 4 belts
      '1 + 6', '6 + 1',
      '1 + 7', '7 + 1',
      '1 + 8', '8 + 1',
      '1 + 9', '9 + 1',
      '2 + 4', '4 + 2', 
      '2 + 5', '5 + 2',
      // Level 5 belts
      '2 + 6', '6 + 2',
      '2 + 7', '7 + 2',
      '2 + 8', '8 + 2',
      '3 + 3', '3 + 4', '4 + 3',
      '3 + 5', '5 + 3',
      // Level 6 belts 
      '3 + 6', '6 + 3',
      '3 + 7', '7 + 3',
      '4 + 4', '4 + 5', '5 + 4',
      '4 + 6', '6 + 4',
      // Number recognition questions
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ];
    
    // Randomly select exactly 20 questions from the pool
    const selectedQuestions = [];
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * level6Pool.length);
      selectedQuestions.push(level6Pool[randomIndex]);
    }
    
    finalSequence = selectedQuestions;
    console.log('DEBUG: Level 6 black belt finalSequence:', finalSequence);
  } else {
    console.log('DEBUG: Taking Level 1 black belt path');
    // Level 1 black belt: 20 questions from all previous belts
    const level1Pool = [
      // Questions from Level 1 belts
      '0 + 0',  // white belt
      '0 + 1', '1 + 0',  // yellow belt
      '0 + 2', '2 + 0',  // green belt
      '0 + 3', '3 + 0',  // blue belt
      '0 + 4', '4 + 0',  // red belt
      '0 + 5', '5 + 0',  // brown belt
      // Number recognition questions
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    ];
    
    // Randomly select exactly 20 questions from the pool
    const selectedQuestions = [];
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * level1Pool.length);
      selectedQuestions.push(level1Pool[randomIndex]);
    }
    
    finalSequence = selectedQuestions;
    console.log('DEBUG: Level 1 black belt finalSequence:', finalSequence);
  }
  
  // Create a guaranteed non-consecutive sequence (no consecutive identical questions of any type)
  let shuffledSequence;
  let attempts = 0;
  const maxAttempts = 100;
  
  do {
    // Shuffle the sequence
    shuffledSequence = [...finalSequence].sort(() => Math.random() - 0.5);
    attempts++;
    
    // Check if we have consecutive identical questions of any type
    let hasConsecutive = false;
    for (let i = 0; i < shuffledSequence.length - 1; i++) {
      if (shuffledSequence[i] === shuffledSequence[i + 1]) {
        hasConsecutive = true;
        break;
      }
    }
    
    // If no consecutive identical questions, we're good
    if (!hasConsecutive) {
      break;
    }
  } while (attempts < maxAttempts);
  
  // CRITICAL: Verify no consecutive identical questions of any type
  let hasConsecutive = false;
  for (let i = 0; i < shuffledSequence.length - 1; i++) {
    if (shuffledSequence[i] === shuffledSequence[i + 1]) {
      hasConsecutive = true;
      break;
    }
  }
  // If we still have consecutive questions after all attempts, force fix them
  if (hasConsecutive) {
    for (let i = 0; i < shuffledSequence.length - 1; i++) {
      if (shuffledSequence[i] === shuffledSequence[i + 1]) {
        // Find a different question to swap with
        for (let j = i + 2; j < shuffledSequence.length; j++) {
          if (shuffledSequence[j] !== shuffledSequence[i]) {
            // Swap to break the consecutive pattern
            [shuffledSequence[i + 1], shuffledSequence[j]] = [shuffledSequence[j], shuffledSequence[i + 1]];
            break;
          }
        }
      }
    }
    
    // Final verification
    hasConsecutive = false;
    for (let i = 0; i < shuffledSequence.length - 1; i++) {
      if (shuffledSequence[i] === shuffledSequence[i + 1]) {
        hasConsecutive = true;
        break;
      }
    }
  }
  
  // Store the shuffled sequence for this quiz session
  window.blackBeltFullSequence = shuffledSequence;
  // Reset the question counter for this session
  window.blackBeltQuestionCounter = 0;
}

// Get the question for this position from the shuffled sequence
let selectedQuestion = window.blackBeltFullSequence[window.blackBeltQuestionCounter];

// CRITICAL FIX: AGGRESSIVELY prevent consecutive identical questions from EVER occurring
// This is the main fix that ensures no consecutive identical questions can happen
if (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion || 
  selectedQuestion === window.lastPracticedQuestion || `${selectedQuestion}` === window.lastPracticedQuestion) {
// Find ANY question in the sequence that's different from the last question AND last practiced question
let foundDifferentQuestion = false;

// First, try to find a different question that hasn't been asked yet
for (let i = 0; i < window.blackBeltFullSequence.length; i++) {
  const candidateQuestion = window.blackBeltFullSequence[i];
  if (candidateQuestion !== lastQuestion && 
      `${candidateQuestion}` !== lastQuestion &&
      candidateQuestion !== window.lastPracticedQuestion &&
      `${candidateQuestion}` !== window.lastPracticedQuestion) {
    selectedQuestion = candidateQuestion;
    window.blackBeltQuestionCounter = i;
    foundDifferentQuestion = true;
    break;
  }
}

// If no unasked different question found, find ANY different question (even if asked before)
if (!foundDifferentQuestion) {
  for (let i = 0; i < window.blackBeltFullSequence.length; i++) {
    const candidateQuestion = window.blackBeltFullSequence[i];
    if (candidateQuestion !== lastQuestion && 
        `${candidateQuestion}` !== lastQuestion &&
        candidateQuestion !== window.lastPracticedQuestion &&
        `${candidateQuestion}` !== window.lastPracticedQuestion) {
      selectedQuestion = candidateQuestion;
      window.blackBeltQuestionCounter = i;
      foundDifferentQuestion = true;
      break;
    }
  }
}

// If still no different question found, this should never happen with our sequence
if (!foundDifferentQuestion) {
  // Force select the first question that's different from both last question and last practiced
  const firstDifferent = window.blackBeltFullSequence.find(q => 
    q !== lastQuestion && 
    q !== window.lastPracticedQuestion
  );
  if (firstDifferent !== undefined) {
    selectedQuestion = firstDifferent;
    const foundIndex = window.blackBeltFullSequence.indexOf(firstDifferent);
    if (foundIndex !== -1) {
      window.blackBeltQuestionCounter = foundIndex;
    }
  }
}
}

// ULTIMATE SAFETY CHECK: For the first question of any quiz, ensure it's NEVER the same as lastQuestion
if (totalQuestions === 0 && (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion)) {
  // Find ANY question that's different from lastQuestion
  let forcedQuestion = null;
  for (let i = 0; i < window.blackBeltFullSequence.length; i++) {
    const candidate = window.blackBeltFullSequence[i];
    if (candidate !== lastQuestion && `${candidate}` !== lastQuestion) {
      forcedQuestion = candidate;
      window.blackBeltQuestionCounter = i;
      break;
    }
  }
  
  if (forcedQuestion !== null) {
    selectedQuestion = forcedQuestion;
  }
}

// Increment the question counter for next time
window.blackBeltQuestionCounter++;

// Return the appropriate question object based on the selected question
if (isLevel2) {
  // Level 2 black belt questions
  if (selectedQuestion === '0 + 0' || selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || 
             selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '0 + 3' || 
             selectedQuestion === '3 + 0' || selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || 
             selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '1 + 1' ||
             selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' || selectedQuestion === '1 + 3' ||
             selectedQuestion === '3 + 1' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
             selectedQuestion === '2 + 2' ) {
    // It's a question from Level 1 and Level 2 belts
    const parts = selectedQuestion.split(' + ');
    if (parts.length === 2) {
      const num1 = parseInt(parts[0]);
      const num2 = parseInt(parts[1]);
      const correctAnswer = num1 + num2;
      const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
      return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'black' };
    }
  } else {
    // It's a number recognition question
    const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
    return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'black' };
  }
} else if (isLevel3) {
  // Level 3 black belt questions
  if (selectedQuestion === '0 + 0' || selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || 
             selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '0 + 3' || 
             selectedQuestion === '3 + 0' || selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || 
             selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '1 + 1' ||
             selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' || selectedQuestion === '1 + 3' ||
             selectedQuestion === '3 + 1' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
             selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
             selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' ||
             selectedQuestion === '7 + 0' || selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' ||
             selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' || selectedQuestion === '0 + 10' ||
             selectedQuestion === '10 + 0' || selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1') {
              // It's a question from Level 3 belts
              const parts = selectedQuestion.split(' + ');
              if (parts.length === 2) {
                const num1 = parseInt(parts[0]);
                const num2 = parseInt(parts[1]);
                const correctAnswer = num1 + num2;
                const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
                return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'black' };
              }
  } else {
              // It's a number recognition question
              const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
              return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'black' };
            }
} else if (isLevel4) {
  // Level 4 black belt questions
  if (selectedQuestion === '0 + 0' || selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || 
             selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '0 + 3' || 
             selectedQuestion === '3 + 0' || selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || 
             selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '1 + 1' ||
             selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' || selectedQuestion === '1 + 3' ||
             selectedQuestion === '3 + 1' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
             selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
             selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' ||
             selectedQuestion === '7 + 0' || selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' ||
             selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' || selectedQuestion === '0 + 10' ||
             selectedQuestion === '10 + 0' || selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' ||
             selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' || selectedQuestion === '1 + 7' ||
             selectedQuestion === '7 + 1' || selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' ||
             selectedQuestion === '1 + 9' || selectedQuestion === '9 + 1' || selectedQuestion === '2 + 4' || 
             selectedQuestion === '4 + 2' ) {
              // It's a question from Level 4 belts
      const parts = selectedQuestion.split(' + ');
      if (parts.length === 2) {
        const num1 = parseInt(parts[0]);
        const num2 = parseInt(parts[1]);
        const correctAnswer = num1 + num2;
        const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'black' };
      }
              } else {
      // It's a number recognition question
              const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
              return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'black' };
              }
            } else if (isLevel5) {
              // Level 5 black belt questions
              if ( selectedQuestion === '0 + 0' || selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || 
                            selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '0 + 3' || 
                            selectedQuestion === '3 + 0' || selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || 
                            selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '1 + 1' ||
                            selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' || selectedQuestion === '1 + 3' ||
                            selectedQuestion === '3 + 1' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                            selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                            selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' ||
                            selectedQuestion === '7 + 0' || selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' ||
                            selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' || selectedQuestion === '0 + 10' ||
                            selectedQuestion === '10 + 0' || selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' ||
                            selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' || selectedQuestion === '1 + 7' ||
                            selectedQuestion === '7 + 1' || selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' ||
                            selectedQuestion === '1 + 9' || selectedQuestion === '9 + 1' || selectedQuestion === '2 + 4' || 
                            selectedQuestion === '4 + 2' || selectedQuestion === '2 + 5' || selectedQuestion === '5 + 2' ||
                            selectedQuestion === '2 + 6' || selectedQuestion === '6 + 2' || selectedQuestion === '2 + 7' ||
                            selectedQuestion === '7 + 2' || selectedQuestion === '2 + 8' || selectedQuestion === '8 + 2' ||
                            selectedQuestion === '3 + 3' || selectedQuestion === '3 + 4' || selectedQuestion === '4 + 3' ) {
                              // It's a question from Level 5 belts
                              const parts = selectedQuestion.split(' + ');
                              if (parts.length === 2) {
                                const num1 = parseInt(parts[0]);
                                const num2 = parseInt(parts[1]);
                                const correctAnswer = num1 + num2;
                                const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
                                return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'black' };
                              }
                            } else {
                              // It's a number recognition question
                              const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
                              return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'black' };
                            }
                          } else if (isLevel6) {
                            // Level 6 black belt questions
                            if (selectedQuestion === '0 + 0' || selectedQuestion === '0 + 1' || selectedQuestion === '1 + 0' || 
                               selectedQuestion === '0 + 2' || selectedQuestion === '2 + 0' || selectedQuestion === '0 + 3' || 
                               selectedQuestion === '3 + 0' || selectedQuestion === '0 + 4' || selectedQuestion === '4 + 0' || 
                               selectedQuestion === '0 + 5' || selectedQuestion === '5 + 0' || selectedQuestion === '1 + 1' ||
                               selectedQuestion === '1 + 2' || selectedQuestion === '2 + 1' || selectedQuestion === '1 + 3' ||
                               selectedQuestion === '3 + 1' || selectedQuestion === '1 + 4' || selectedQuestion === '4 + 1' ||
                               selectedQuestion === '2 + 2' || selectedQuestion === '2 + 3' || selectedQuestion === '3 + 2' ||
                               selectedQuestion === '0 + 6' || selectedQuestion === '6 + 0' || selectedQuestion === '0 + 7' ||
                               selectedQuestion === '7 + 0' || selectedQuestion === '0 + 8' || selectedQuestion === '8 + 0' ||
                               selectedQuestion === '0 + 9' || selectedQuestion === '9 + 0' || selectedQuestion === '0 + 10' ||
                               selectedQuestion === '10 + 0' || selectedQuestion === '1 + 5' || selectedQuestion === '5 + 1' ||
                               selectedQuestion === '1 + 6' || selectedQuestion === '6 + 1' || selectedQuestion === '1 + 7' ||
                               selectedQuestion === '7 + 1' || selectedQuestion === '1 + 8' || selectedQuestion === '8 + 1' ||
                               selectedQuestion === '1 + 9' || selectedQuestion === '9 + 1' || selectedQuestion === '2 + 4' || 
                               selectedQuestion === '4 + 2' || selectedQuestion === '2 + 5' || selectedQuestion === '5 + 2' ||
                               selectedQuestion === '2 + 6' || selectedQuestion === '6 + 2' || selectedQuestion === '2 + 7' ||
                               selectedQuestion === '7 + 2' || selectedQuestion === '2 + 8' || selectedQuestion === '8 + 2' ||
                               selectedQuestion === '3 + 3' || selectedQuestion === '3 + 4' || selectedQuestion === '4 + 3' ||
                               selectedQuestion === '3 + 5' || selectedQuestion === '5 + 3' || selectedQuestion === '3 + 6' ||
                               selectedQuestion === '6 + 3' || selectedQuestion === '3 + 7' || selectedQuestion === '7 + 3' ||
                               selectedQuestion === '4 + 5' || selectedQuestion === '5 + 4' || selectedQuestion === '4 + 4' ||
                               selectedQuestion === '4 + 6' || selectedQuestion === '6 + 4' ) {
                                // It's a question from Level 6 belts
      const parts = selectedQuestion.split(' + ');
      if (parts.length === 2) {
        const num1 = parseInt(parts[0]);
        const num2 = parseInt(parts[1]);
        const correctAnswer = num1 + num2;
        const shuffledAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].sort(() => Math.random() - 0.5);
        return { question: selectedQuestion, correctAnswer: correctAnswer, answers: shuffledAnswers, multiplier: num1, difficulty: 'black' };
      }
    } else {
      // It's a number recognition question
      const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
      return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'black' };
    }
  } else {
    // Level 1 black belt questions
    if (selectedQuestion === '0 + 0') {
      // It's a "0+0" question
      const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
      return { question: '0 + 0', correctAnswer: 0, answers: shuffledAnswers, multiplier: 0, difficulty: 'black' };
    } else if (selectedQuestion === '0 + 1') {
      // It's a "0+1" question
      const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
      return { question: '0 + 1', correctAnswer: 1, answers: shuffledAnswers, multiplier: 0, difficulty: 'black' };
    } else if (selectedQuestion === '1 + 0') {
      // It's a "1+0" question
      const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
      return { question: '1 + 0', correctAnswer: 1, answers: shuffledAnswers, multiplier: 1, difficulty: 'black' };
    } else if (selectedQuestion === '0 + 2') {
      // It's a "0+2" question
      const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
      return { question: '0 + 2', correctAnswer: 2, answers: shuffledAnswers, multiplier: 0, difficulty: 'black' };
    } else if (selectedQuestion === '2 + 0') {
      // It's a "2+0" question
      const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
      return { question: '2 + 0', correctAnswer: 2, answers: shuffledAnswers, multiplier: 2, difficulty: 'black' };
    } else if (selectedQuestion === '0 + 3') {
      // It's a "0+3" question
      const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
      return { question: '0 + 3', correctAnswer: 3, answers: shuffledAnswers, multiplier: 0, difficulty: 'black' };
    } else if (selectedQuestion === '3 + 0') {
      // It's a "3+0" question
      const shuffledAnswers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
      return { question: '3 + 0', correctAnswer: 3, answers: shuffledAnswers, multiplier: 3, difficulty: 'black' };
    } else if (selectedQuestion === '0 + 4') {
      // It's a "0+4" question
      const shuffledAnswers = [0, 1, 2, 4].sort(() => Math.random() - 0.5);
      return { question: '0 + 4', correctAnswer: 4, answers: shuffledAnswers, multiplier: 0, difficulty: 'black' };
    } else if (selectedQuestion === '4 + 0') {
      // It's a "4+0" question
      const shuffledAnswers = [0, 1, 2, 4].sort(() => Math.random() - 0.5);
      return { question: '4 + 0', correctAnswer: 4, answers: shuffledAnswers, multiplier: 4, difficulty: 'black' };
    } else if (selectedQuestion === '0 + 5') {
      // It's a "0+5" question
      const shuffledAnswers = [0, 1, 2, 5].sort(() => Math.random() - 0.5);
      return { question: '0 + 5', correctAnswer: 5, answers: shuffledAnswers, multiplier: 0, difficulty: 'black' };
    } else if (selectedQuestion === '5 + 0') {
      // It's a "5+0" question
      const shuffledAnswers = [0, 1, 2, 5].sort(() => Math.random() - 0.5);
      return { question: '5 + 0', correctAnswer: 5, answers: shuffledAnswers, multiplier: 5, difficulty: 'black' };
    } else {
      // It's a number recognition question
      const shuffledAnswers = [parseInt(selectedQuestion), (parseInt(selectedQuestion) + 1) % 10, (parseInt(selectedQuestion) + 2) % 10, (parseInt(selectedQuestion) + 3) % 10].sort(() => Math.random() - 0.5);
      return { question: selectedQuestion.toString(), correctAnswer: parseInt(selectedQuestion), answers: shuffledAnswers, multiplier: parseInt(selectedQuestion), difficulty: 'black' };
    } 
  }
}

// For other belts, use the original logic
// ... existing code ...

  // For other belts, use the original logic
  // Check if we still need to ask core facts (exactly 2 each)
  
  for (const fact of currentFacts) {
    if (factCounts[fact.question] < 2 && fact.question !== lastQuestion) {
      // Shuffle answers
      const dynamicAnswers = generateAnswers(fact.correctAnswer);
      const shuffledAnswers = [...dynamicAnswers].sort(() => Math.random() - 0.5);
      return { ...fact, answers: shuffledAnswers };
    }
  }

  // If we've asked 2 of each core fact, use previous belt questions
  // Filter out the last question to avoid consecutive repeats
  const availableQuestions = previousQuestions.filter(q => q.question !== lastQuestion);
  // Deterministic selection: pick next in sequence based on question number
  const nextIndex = (totalQuestions % availableQuestions.length);
  const selectedQuestion = availableQuestions[nextIndex];
  
  // Shuffle the answers for the selected question
  const dynamicAnswers = generateAnswers(selectedQuestion.correctAnswer);
  const shuffledAnswers = [...dynamicAnswers].sort(() => Math.random() - 0.5);
  return { ...selectedQuestion, answers: shuffledAnswers };
}

// Add unique emoji and background color arrays for tables 1-12:
const tableEmojis = [
  '🐻', // 1
  '🦄', // 2
  '🐸', // 3
  '🐯', // 4
  '🐰', // 5
  '🦁', // 6
  '🐵', // 7
  '🐶', // 8
  '🦊', // 9
  '🐼', // 10
  '🐨', // 11
  '🐧'  // 12
];
const tableBgColors = [
  'bg-yellow-300 border-yellow-400',
  'bg-pink-300 border-pink-400',
  'bg-green-300 border-green-400',
  'bg-orange-300 border-orange-400',
  'bg-purple-300 border-purple-400',
  'bg-amber-300 border-amber-400',
  'bg-lime-300 border-lime-400',
  'bg-blue-300 border-blue-400',
  'bg-rose-300 border-rose-400',
  'bg-cyan-300 border-cyan-400',
  'bg-teal-300 border-teal-400',
  'bg-indigo-300 border-indigo-400'
];

// Add theme options
const quizThemes = [
  { id: 'space', label: 'Space', emoji: '🚀' },
  { id: 'cars', label: 'Cars', emoji: '🏎️' },
  { id: 'ocean', label: 'Ocean', emoji: '🌊' },
  { id: 'jungle', label: 'Jungle', emoji: '🦁' },
  { id: 'candy', label: 'Candy', emoji: '🍭' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'magic', label: 'Magic', emoji: '🪄' },
  { id: 'robots', label: 'Robots', emoji: '🤖' },
  { id: 'dinosaurs', label: 'Dinosaurs', emoji: '🦕' },
  { id: 'superheroes', label: 'Superheroes', emoji: '🦸' },
];

// Define a consistent color for answer choices that works with any theme
const answerColors = [
  'bg-white/70 border-white/80',
  'bg-white/70 border-white/80',
  'bg-white/70 border-white/80',
  'bg-white/70 border-white/80',
];

function App() {
  // Check if user already has a name and avatar saved
  const savedName = localStorage.getItem('math-child-name');
  const savedAge = localStorage.getItem('math-child-age');
  const savedAvatar = localStorage.getItem('avatarUrl');
  
  // State variables
  const [screen, setScreen] = useState(savedName && savedAge ? 'start' : 'start'); // Always start at the start screen
  const [currentPage, setCurrentPage] = useState('picker'); // 'picker', 'quiz', 'speedTest'
  const [selectedTable, setSelectedTable] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [pausedTime, setPausedTime] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [savedQuizState, setSavedQuizState] = useState(null);
  const [answersInteractive, setAnswersInteractive] = useState(true);
  const [showStars, setShowStars] = useState(false);
  const [brownCleared, setBrownCleared] = useState(false);
  const [unlockedDegrees, setUnlockedDegrees] = useState([1]); // Start with degree 1 unlocked
  const [currentDegree, setCurrentDegree] = useState(1);

  const [showBlackBeltDegrees, setShowBlackBeltDegrees] = useState(false);
  const [isBlackUnlocked, setIsBlackUnlocked] = useState(false);
  const [completedBlackBeltDegrees, setCompletedBlackBeltDegrees] = useState([]);

  // Check if black belt should be unlocked (when brown belt is cleared)
useEffect(() => {
  // Check if brown belt is completed in localStorage
  const brownKey = `math-table-progress-${selectedTable}-brown`;
  const brownProgress = localStorage.getItem(brownKey);
  
  if (brownProgress) {
    try {
      const parsed = JSON.parse(brownProgress);
      if (parsed.perfectPerformance === true && !isBlackUnlocked) {
        setIsBlackUnlocked(true);
        setBrownCleared(true);
      }
    } catch (error) {
      // If it's not JSON, check if it's 'completed'
      if (brownProgress === 'completed' && !isBlackUnlocked) {
        setIsBlackUnlocked(true);
        setBrownCleared(true);
      }
    }
  }
}, [selectedTable, isBlackUnlocked]);
  
  // Check if it's a new day and reset timer if needed
  useEffect(() => {
    const today = new Date().toDateString();
    const lastQuizDay = localStorage.getItem('math-last-quiz-day');
    
    if (lastQuizDay !== today) {
      // It's a new day, reset timer state
      setPausedTime(0);
      setIsTimerPaused(false);
      setSavedQuizState(null);
      localStorage.setItem('math-last-quiz-day', today);
    }
  }, []);
  

  const [showHint, setShowHint] = useState(false);

  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [questionTimes, setQuestionTimes] = useState([]);

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [correctCountForCompletion, setCorrectCountForCompletion] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const targetQuestionsRef = useRef(10); // Default to 10 questions
  const [tableProgress, setTableProgress] = useState({});
  const [answerSymbols, setAnswerSymbols] = useState([]);
  const [blackBeltCountdown, setBlackBeltCountdown] = useState(5);

  
  // Load tableProgress from localStorage on component mount
  useEffect(() => {
    const loadTableProgress = () => {

      
      const loadedProgress = {};
      
      // Load progress for all tables (1-12) and all belts
      for (let table = 1; table <= 12; table++) {
        loadedProgress[table] = {};
        
        // Load each belt's progress
        ['white', 'yellow', 'green', 'blue', 'red', 'brown'].forEach(belt => {
          const key = `math-table-progress-${table}-${belt}`;
          const saved = localStorage.getItem(key);
          
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              // Only load if it has perfectPerformance: true
              if (parsed?.perfectPerformance === true) {
                loadedProgress[table][belt] = parsed;
              }
            } catch (error) {
              // If it's not JSON, don't load it as completed
              // This ensures old 'unlocked' or 'completed' strings don't count
            }
          }
        });
      }
      
      setTableProgress(loadedProgress);
      console.log('Loaded tableProgress from localStorage:', loadedProgress);
    };
    
    loadTableProgress();
  }, []);
  
  // Monitor tableProgress changes for debugging
  useEffect(() => {
    console.log('tableProgress changed:', tableProgress);
  }, [tableProgress]);

  // DailyStatsCounter component
  const DailyStatsCounter = ({ style }) => {
    const [dailyCorrect, setDailyCorrect] = useState(0);
    useEffect(() => {
      const getTodayString = () => new Date().toLocaleDateString();
      const updateCount = () => {
        const today = getTodayString();
        const count = parseInt(localStorage.getItem(`math-daily-correct-${today}`) || '0');
        setDailyCorrect(count);
      };
      updateCount();
      const intervalId = setInterval(updateCount, 60000);
      return () => clearInterval(intervalId);
    }, []);
    return (
      <div style={style}>
        <div className="bg-blue-500 text-white font-bold rounded-lg sm:rounded-xl shadow-lg px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 flex items-center min-w-[150px] sm:min-w-[180px] md:min-w-[200px] min-h-[40px] sm:min-h-[50px] md:min-h-[60px]">
          <div className="mr-1 sm:mr-2 md:mr-3 text-lg sm:text-xl md:text-2xl">📝</div>
          <div>
            <div className="text-xs sm:text-xs md:text-sm opacity-80">Today's Score</div>
            <div className="text-sm sm:text-base md:text-lg lg:text-xl">{dailyCorrect} correct</div>
          </div>
        </div>
      </div>
    );
  };

  // LiquidTimer: visually engaging timer with a liquid fill effect
  const LiquidTimer = ({ timeLeft, totalTime }) => {
    // Calculate fill percentage (0 to 100) - for count up timer, we'll show the elapsed time
    const elapsed = timeLeft || 0;
    return (
      <div className="flex flex-col items-center justify-center" style={{ minWidth: 'clamp(60px, 15vw, 100px)' }}>
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-300 rounded-full overflow-hidden shadow-lg border-2 sm:border-3 md:border-4 border-gray-500">
          {/* Clock face background */}
          <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
          
          {/* Clock numbers */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-600 drop-shadow-lg select-none">
              {Math.min(elapsed, 999)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Real-time session timer (bottom left, plain text, no CSS/overlay)
  const SessionTimer = ({ isActive, startTime, style, isPaused, pauseStartTime, accumulatedTime = 0 }) => {
    const [elapsed, setElapsed] = useState(0);
    const [pausedElapsed, setPausedElapsed] = useState(0);
    
    useEffect(() => {
      if (!isActive || !startTime) return;
      
      const update = () => {
        if (isPaused && pauseStartTime) {
          // When paused, show the time that was accumulated before pause
          const timeBeforePause = Math.floor((pauseStartTime - startTime) / 1000);
          setPausedElapsed(timeBeforePause);
        } else {
          // When active, calculate current elapsed time
          const currentElapsed = Math.floor((Date.now() - startTime) / 1000);
          setElapsed(currentElapsed);
        }
      };
      
      update();
      const interval = setInterval(update, 1000); // update every second
      return () => clearInterval(interval);
    }, [isActive, startTime, isPaused, pauseStartTime]);
    
    // Use paused time if paused, otherwise use current elapsed time, plus accumulated time
    const currentTime = isPaused ? pausedElapsed : elapsed;
    const displayTime = accumulatedTime + currentTime;
    const hours = Math.floor(displayTime / 3600);
    const mins = Math.floor((displayTime % 3600) / 60);
    const secs = displayTime % 60;
    
    return (
      <div style={style}>
        <div className={`text-white font-bold rounded-lg sm:rounded-xl shadow-lg px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 flex items-center min-w-[150px] sm:min-w-[180px] md:min-w-[200px] min-h-[40px] sm:min-h-[50px] md:min-h-[60px] ${!isActive && displayTime === 0 ? 'bg-gray-400' : isPaused ? 'bg-gray-500' : 'bg-blue-500'}`}>
          <div className="mr-1 sm:mr-2 md:mr-3 text-lg sm:text-xl md:text-2xl">{!isActive ? '⏰' : isPaused ? '⏸️' : '⏰'}</div>
          <div>
            <div className="text-xs sm:text-xs md:text-sm opacity-80">Time Today</div>
            <div className="text-sm sm:text-base md:text-lg lg:text-xl">{hours.toString().padStart(2, '0')}:{mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}</div>
            {!isActive && displayTime === 0 && <div className="text-xs sm:text-xs opacity-70">Not Started</div>}
            {isActive && isPaused && <div className="text-xs sm:text-xs opacity-70">Paused</div>}
          </div>
        </div>
      </div>
    );
  };
  const [childName, setChildName] = useState('');
  const [showNameForm, setShowNameForm] = useState(true); // Show name form initially
  const [showSettings, setShowSettings] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [showDifficultyPicker, setShowDifficultyPicker] = useState(false);
  const [visualAidHistory, setVisualAidHistory] = useState([]);
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);
  const [dailyChallengeQuestions, setDailyChallengeQuestions] = useState([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challengeScore, setChallengeScore] = useState(0);
  const [challengeDone, setChallengeDone] = useState(false);
  const [challengeAnswerFeedback, setChallengeAnswerFeedback] = useState(null);
  const [challengeIsAnimating, setChallengeIsAnimating] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [pointPopup, setPointPopup] = useState(null);
  const [showPointPopup, setShowPointPopup] = useState(false);

  const [answerRefs, setAnswerRefs] = useState([]); // array of refs for answer pills
  // In QuizScreen, shuffle answerColors for each question
  const [shuffledAnswerColors, setShuffledAnswerColors] = useState(answerColors);
  const [avatarUrl, setAvatarUrl] = useState(() => localStorage.getItem('avatarUrl') || '');
  const [showAvatarCreator, setShowAvatarCreator] = useState(false);
  // Avatar picker for name form
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [childAge, setChildAge] = useState(() => localStorage.getItem('math-child-age') || '');
  const [showQuitModal, setShowQuitModal] = useState(false);
  // White Belt random number state
  const [whiteBeltRandomNumber, setWhiteBeltRandomNumber] = useState(null);

  // Speed test states
  const [showSpeedTest, setShowSpeedTest] = useState(false); // Don't show speed test initially
  const [speedTestNumbers, setSpeedTestNumbers] = useState([]);
  const [currentSpeedTestIndex, setCurrentSpeedTestIndex] = useState(-1); // Start at -1 to indicate not started
  const [speedTestStartTime, setSpeedTestStartTime] = useState(null);
  const [speedTestTimes, setSpeedTestTimes] = useState([]);
  const [speedTestComplete, setSpeedTestComplete] = useState(false);
  const [studentReactionSpeed, setStudentReactionSpeed] = useState(() => 
    parseFloat(localStorage.getItem('math-reaction-speed') || '1.0')
  );
  const [speedTestPopupVisible, setSpeedTestPopupVisible] = useState(false);
  const [speedTestPopupAnimation, setSpeedTestPopupAnimation] = useState('animate-pop-in');
  const [speedTestStarted, setSpeedTestStarted] = useState(false);
  const [speedTestCorrectCount, setSpeedTestCorrectCount] = useState(0);
  const [speedTestShowTick, setSpeedTestShowTick] = useState(false);
  const [showPreTestPopup, setShowPreTestPopup] = useState(false);
  const [preTestSection, setPreTestSection] = useState('intro'); // 'intro', 'sections', 'addition', 'subtraction', 'multiplication', 'division'
  const [additionSubSection, setAdditionSubSection] = useState(null); // 'A', 'B', 'C', 'D' or null
  const [preTestCurrentQuestion, setPreTestCurrentQuestion] = useState(0);
  const [preTestScore, setPreTestScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [preTestInputValue, setPreTestInputValue] = useState('');
  const [lastQuestion, setLastQuestion] = useState('');
  const [lastPreTestQuestion, setLastPreTestQuestion] = useState('');
  const [preTestQuestions, setPreTestQuestions] = useState([]);
      const [preTestTimer, setPreTestTimer] = useState(0);
    const [preTestTimerActive, setPreTestTimerActive] = useState(false);
    const [askedQuestions, setAskedQuestions] = useState(new Set());
    const [recentQuestions, setRecentQuestions] = useState([]);
  const [questionAlternator, setQuestionAlternator] = useState('medium'); // 'medium' or 'basic'
  const [quizProgress, setQuizProgress] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState(new Set());
  const [slowQuestions, setSlowQuestions] = useState(new Set());
    const [questionTimeTracker, setQuestionTimeTracker] = useState({});
          const [showWrongAnswerPopup, setShowWrongAnswerPopup] = useState(false);
      const [wrongAnswerData, setWrongAnswerData] = useState(null);
      const [showSecondPopup, setShowSecondPopup] = useState(false);
      const [showResultsModal, setShowResultsModal] = useState(false);
    const [questionsWithPractice, setQuestionsWithPractice] = useState(new Set());
    const [preTestResults, setPreTestResults] = useState(null);
  const [completedSections, setCompletedSections] = useState(() => {
    const saved = localStorage.getItem('math-completed-sections');
    return saved ? JSON.parse(saved) : {
      addition: false,
      subtraction: false,
      multiplication: false,
      division: false
    };
  });

  // Learning module state
  const [showLearningModule, setShowLearningModule] = useState(false);
  const [learningModuleContent, setLearningModuleContent] = useState('');
  const [pendingDifficulty, setPendingDifficulty] = useState(null);
  const [showLearningQuestion, setShowLearningQuestion] = useState(false);
  const [learningQuestion, setLearningQuestion] = useState(null);
  const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);
  const [showCorrectText, setShowCorrectText] = useState(false);
  const [lastWhiteBeltNumber, setLastWhiteBeltNumber] = useState(null);
  const [learningQuestionIndex, setLearningQuestionIndex] = useState(0);
  const [showLearningNextButton, setShowLearningNextButton] = useState(false);

  const timeoutRef = useRef(null);
  const [questionTimeoutId, setQuestionTimeoutId] = useState(null);
  
  useEffect(() => {
    if (currentQuestion && !showResult && currentQuestion.question) {
      console.log('Starting timer for question:', currentQuestion.question);
      startQuestionTimer();
    }
    
    return () => {
      if (questionTimeoutId) {
        clearTimeout(questionTimeoutId);
      }
    };
  }, [currentQuestion]);
  // Save completedSections to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('math-completed-sections', JSON.stringify(completedSections));
  }, [completedSections]);
  // Pre-test timer effect
  useEffect(() => {
    let interval;
    if (preTestTimerActive) {
      interval = setInterval(() => {
        setPreTestTimer(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [preTestTimerActive]);
   
  // Clear Shooting stars
  useEffect(() => {
    if (currentPage !== 'results') {
      clearShootingStars();
    }
  }, [currentPage]);

  // Black Belt transition countdown
  useEffect(() => {
    console.log('COUNTDOWN DEBUG: selectedDifficulty =', selectedDifficulty);
    console.log('COUNTDOWN DEBUG: correctCount =', correctCount);
    console.log('COUNTDOWN DEBUG: showResult =', showResult);
    console.log('COUNTDOWN DEBUG: correctCountForCompletion =', correctCountForCompletion);
    
    if (selectedDifficulty === 'brown' && (correctCount === 10 || correctCountForCompletion === 10) && showResult) {
      console.log('COUNTDOWN: Starting countdown for brown belt completion');
      setBlackBeltCountdown(5);
      
      const countdownInterval = setInterval(() => {
        setBlackBeltCountdown(prev => {
          console.log('COUNTDOWN: Countdown value =', prev);
          if (prev <= 1) {
            console.log('COUNTDOWN: Countdown finished, showing black belt degrees');
            clearInterval(countdownInterval);
            setShowBlackBeltDegrees(true);
            setShowResult(false);
            console.log('COUNTDOWN: Set showBlackBeltDegrees to true and showResult to false');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(countdownInterval);
    }
  }, [selectedDifficulty, correctCount, showResult, correctCountForCompletion]);

  // Auto-start addition pre-test when section is selected
  useEffect(() => {
    if (preTestSection === 'addition' && !additionSubSection) {
      setAdditionSubSection('A'); // Always use 'A' for Sums up to 5
      setLastPreTestQuestion(''); // Reset last question
      setPreTestQuestions(generateAdditionQuestions('A'));
      setPreTestCurrentQuestion(0);
      setPreTestScore(0);
      setPreTestInputValue('');
      setPreTestTimer(0); // Reset timer
      setPreTestTimerActive(true); // Start timer
    }
  }, [preTestSection, additionSubSection]);

  useEffect(() => {
    if (showResult && countdown > 0) {
      // Check if user failed the belt requirements
      const allCorrect = correctCount === 10;
      const withinTimeLimit = elapsedTime <= 30;
      const hasSlowQuestions = slowQuestions.size > 0;
      const hasSlowQuestionsInArray = questionTimes.some(time => time > 5);
      const canUnlockNext = allCorrect && withinTimeLimit && !hasSlowQuestions && !hasSlowQuestionsInArray;
      
      // Only start countdown if user failed
      if (!canUnlockNext) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      }
    } else if (countdown === 0) {
      setShowResult(false);
      setCountdown(5);
      startActualQuiz(selectedDifficulty);
    }
  }, [countdown, showResult, selectedDifficulty, correctCount, elapsedTime, slowQuestions, questionTimes]);

  // Function to send pre-test results via email
  const sendPreTestResults = async (results) => {
    const requestData = {
      childName: childName,
      section: results.section,
      score: results.score,
      totalQuestions: results.totalQuestions,
      timeTaken: results.timeTaken,
      accuracy: results.accuracy,
      date: new Date().toLocaleString()
    };

    console.log('Attempting to send results:', results);

    // Try multiple URLs in case proxy doesn't work
    const urls = [
      '/api/send-results',  // Proxy URL (if proxy is working)
      'http://localhost:3001/api/send-results'  // Direct URL
    ];
    for (let i = 0; i < urls.length; i++) {
      try {
        console.log(`Trying URL ${i + 1}/${urls.length}: ${urls[i]}`);
        
        const response = await fetch(urls[i], {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData)
        });
        
        console.log(`Response status for ${urls[i]}:`, response.status);
        
        if (response.ok) {
          const responseData = await response.json();
          console.log('Results sent successfully:', responseData);
          return; // Success! Exit the function
        } else {
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
            console.error(`Failed to send results to ${urls[i]}:`, errorData);
          } catch (parseError) {
            const errorText = await response.text();
            console.error(`Failed to send results (non-JSON response) to ${urls[i]}:`, errorText);
            errorMessage = errorText || errorMessage;
          }
          console.error('Error details:', errorMessage);
          
          // If this was the last URL, don't continue
          if (i === urls.length - 1) {
            throw new Error(`All URLs failed. Last error: ${errorMessage}`);
          }
        }
      } catch (error) {
        console.error(`Error with URL ${urls[i]}:`, error);
        
        // If this was the last URL, throw the error
        if (i === urls.length - 1) {
          console.error('All attempts failed. Make sure the server is running with: npm run server');
          throw error;
        }
      }
    }
  };
  // Generate addition questions for pre-test
  const generateAdditionQuestions = (subSection = null) => {
    let additionQuestions = [];
    
    if (subSection === 'A') {
      // Sums up to 5
      additionQuestions = [
        { num1: 0, num2: 0, answer: 0 },
        { num1: 0, num2: 1, answer: 1 },
        { num1: 0, num2: 2, answer: 2 },
        { num1: 0, num2: 3, answer: 3 },
        { num1: 0, num2: 4, answer: 4 },
        { num1: 0, num2: 5, answer: 5 },
        { num1: 1, num2: 0, answer: 1 },
        { num1: 1, num2: 1, answer: 2 },
        { num1: 1, num2: 2, answer: 3 },
        { num1: 1, num2: 3, answer: 4 },
        { num1: 1, num2: 4, answer: 5 },
        { num1: 2, num2: 0, answer: 2 },
        { num1: 2, num2: 1, answer: 3 },
        { num1: 2, num2: 2, answer: 4 },
        { num1: 2, num2: 3, answer: 5 },
        { num1: 3, num2: 0, answer: 3 },
        { num1: 3, num2: 1, answer: 4 },
        { num1: 3, num2: 2, answer: 5 },
        { num1: 4, num2: 0, answer: 4 },
        { num1: 4, num2: 1, answer: 5 },
        { num1: 5, num2: 0, answer: 5 }
      ];
    } else if (subSection === 'B') {
      // Sums up to 6-10
      additionQuestions = [
        { num1: 0, num2: 6, answer: 6 },
        { num1: 0, num2: 7, answer: 7 },
        { num1: 0, num2: 8, answer: 8 },
        { num1: 0, num2: 9, answer: 9 },
        { num1: 1, num2: 5, answer: 6 },
        { num1: 1, num2: 6, answer: 7 },
        { num1: 1, num2: 7, answer: 8 },
        { num1: 1, num2: 8, answer: 9 },
        { num1: 1, num2: 9, answer: 10 },
        { num1: 2, num2: 4, answer: 6 },
        { num1: 2, num2: 5, answer: 7 },
        { num1: 2, num2: 6, answer: 8 },
        { num1: 2, num2: 7, answer: 9 },
        { num1: 2, num2: 8, answer: 10 },
        { num1: 3, num2: 3, answer: 6 },
        { num1: 3, num2: 4, answer: 7 },
        { num1: 3, num2: 5, answer: 8 },
        { num1: 3, num2: 6, answer: 9 },
        { num1: 3, num2: 7, answer: 10 },
        { num1: 4, num2: 2, answer: 6 },
        { num1: 4, num2: 3, answer: 7 },
        { num1: 4, num2: 4, answer: 8 },
        { num1: 4, num2: 5, answer: 9 },
        { num1: 4, num2: 6, answer: 10 },
        { num1: 5, num2: 1, answer: 6 },
        { num1: 5, num2: 2, answer: 7 },
        { num1: 5, num2: 3, answer: 8 },
        { num1: 5, num2: 4, answer: 9 },
        { num1: 5, num2: 5, answer: 10 },
        { num1: 6, num2: 0, answer: 6 },
        { num1: 6, num2: 1, answer: 7 },
        { num1: 6, num2: 2, answer: 8 },
        { num1: 6, num2: 3, answer: 9 },
        { num1: 6, num2: 4, answer: 10 },
        { num1: 7, num2: 0, answer: 7 },
        { num1: 7, num2: 1, answer: 8 },
        { num1: 7, num2: 2, answer: 9 },
        { num1: 7, num2: 3, answer: 10 },
        { num1: 8, num2: 0, answer: 8 },
        { num1: 8, num2: 1, answer: 9 },
        { num1: 8, num2: 2, answer: 10 },
        { num1: 9, num2: 0, answer: 9 },
        { num1: 9, num2: 1, answer: 10 }
             ];
     } else if (subSection === 'C') {
       // Sums up to 11-15 - All 70 unique ordered pairs
       additionQuestions = [
         // Sum = 11 (11 pairs)
         { num1: 0, num2: 11, answer: 11 },
         { num1: 1, num2: 10, answer: 11 },
         { num1: 2, num2: 9, answer: 11 },
         { num1: 3, num2: 8, answer: 11 },
         { num1: 4, num2: 7, answer: 11 },
         { num1: 5, num2: 6, answer: 11 },
         { num1: 6, num2: 5, answer: 11 },
         { num1: 7, num2: 4, answer: 11 },
         { num1: 8, num2: 3, answer: 11 },
         { num1: 9, num2: 2, answer: 11 },
         { num1: 10, num2: 1, answer: 11 },
         { num1: 11, num2: 0, answer: 11 },
         
         // Sum = 12 (12 pairs)
         { num1: 0, num2: 12, answer: 12 },
         { num1: 1, num2: 11, answer: 12 },
         { num1: 2, num2: 10, answer: 12 },
         { num1: 3, num2: 9, answer: 12 },
         { num1: 4, num2: 8, answer: 12 },
         { num1: 5, num2: 7, answer: 12 },
         { num1: 6, num2: 6, answer: 12 },
         { num1: 7, num2: 5, answer: 12 },
         { num1: 8, num2: 4, answer: 12 },
         { num1: 9, num2: 3, answer: 12 },
         { num1: 10, num2: 2, answer: 12 },
         { num1: 11, num2: 1, answer: 12 },
         { num1: 12, num2: 0, answer: 12 },
         
         // Sum = 13 (13 pairs)
         { num1: 0, num2: 13, answer: 13 },
         { num1: 1, num2: 12, answer: 13 },
         { num1: 2, num2: 11, answer: 13 },
         { num1: 3, num2: 10, answer: 13 },
         { num1: 4, num2: 9, answer: 13 },
         { num1: 5, num2: 8, answer: 13 },
         { num1: 6, num2: 7, answer: 13 },
         { num1: 7, num2: 6, answer: 13 },
         { num1: 8, num2: 5, answer: 13 },
         { num1: 9, num2: 4, answer: 13 },
         { num1: 10, num2: 3, answer: 13 },
         { num1: 11, num2: 2, answer: 13 },
         { num1: 12, num2: 1, answer: 13 },
         { num1: 13, num2: 0, answer: 13 },
         
         // Sum = 14 (14 pairs)
         { num1: 0, num2: 14, answer: 14 },
         { num1: 1, num2: 13, answer: 14 },
         { num1: 2, num2: 12, answer: 14 },
         { num1: 3, num2: 11, answer: 14 },
         { num1: 4, num2: 10, answer: 14 },
         { num1: 5, num2: 9, answer: 14 },
         { num1: 6, num2: 8, answer: 14 },
         { num1: 7, num2: 7, answer: 14 },
         { num1: 8, num2: 6, answer: 14 },
         { num1: 9, num2: 5, answer: 14 },
         { num1: 10, num2: 4, answer: 14 },
         { num1: 11, num2: 3, answer: 14 },
         { num1: 12, num2: 2, answer: 14 },
         { num1: 13, num2: 1, answer: 14 },
         { num1: 14, num2: 0, answer: 14 },
         // Sum = 15 (15 pairs)
         { num1: 0, num2: 15, answer: 15 },
         { num1: 1, num2: 14, answer: 15 },
         { num1: 2, num2: 13, answer: 15 },
         { num1: 3, num2: 12, answer: 15 },
         { num1: 4, num2: 11, answer: 15 },
         { num1: 5, num2: 10, answer: 15 },
         { num1: 6, num2: 9, answer: 15 },
         { num1: 7, num2: 8, answer: 15 },
         { num1: 8, num2: 7, answer: 15 },
         { num1: 9, num2: 6, answer: 15 },
         { num1: 10, num2: 5, answer: 15 },
         { num1: 11, num2: 4, answer: 15 },
         { num1: 12, num2: 3, answer: 15 },
         { num1: 13, num2: 2, answer: 15 },
         { num1: 14, num2: 1, answer: 15 },
         { num1: 15, num2: 0, answer: 15 }
       ];
     } else if (subSection === 'D') {
       // Sums up to 16-20 - All 95 unique ordered pairs
       additionQuestions = [
         // Sum = 16 (16 pairs)
         { num1: 0, num2: 16, answer: 16 },
         { num1: 1, num2: 15, answer: 16 },
         { num1: 2, num2: 14, answer: 16 },
         { num1: 3, num2: 13, answer: 16 },
         { num1: 4, num2: 12, answer: 16 },
         { num1: 5, num2: 11, answer: 16 },
         { num1: 6, num2: 10, answer: 16 },
         { num1: 7, num2: 9, answer: 16 },
         { num1: 8, num2: 8, answer: 16 },
         { num1: 9, num2: 7, answer: 16 },
         { num1: 10, num2: 6, answer: 16 },
         { num1: 11, num2: 5, answer: 16 },
         { num1: 12, num2: 4, answer: 16 },
         { num1: 13, num2: 3, answer: 16 },
         { num1: 14, num2: 2, answer: 16 },
         { num1: 15, num2: 1, answer: 16 },
         { num1: 16, num2: 0, answer: 16 },
         
         // Sum = 17 (17 pairs)
         { num1: 0, num2: 17, answer: 17 },
         { num1: 1, num2: 16, answer: 17 },
         { num1: 2, num2: 15, answer: 17 },
         { num1: 3, num2: 14, answer: 17 },
         { num1: 4, num2: 13, answer: 17 },
         { num1: 5, num2: 12, answer: 17 },
         { num1: 6, num2: 11, answer: 17 },
         { num1: 7, num2: 10, answer: 17 },
         { num1: 8, num2: 9, answer: 17 },
         { num1: 9, num2: 8, answer: 17 },
         { num1: 10, num2: 7, answer: 17 },
         { num1: 11, num2: 6, answer: 17 },
         { num1: 12, num2: 5, answer: 17 },
         { num1: 13, num2: 4, answer: 17 },
         { num1: 14, num2: 3, answer: 17 },
         { num1: 15, num2: 2, answer: 17 },
         { num1: 16, num2: 1, answer: 17 },
         { num1: 17, num2: 0, answer: 17 },
         
         // Sum = 18 (18 pairs)
         { num1: 0, num2: 18, answer: 18 },
         { num1: 1, num2: 17, answer: 18 },
         { num1: 2, num2: 16, answer: 18 },
         { num1: 3, num2: 15, answer: 18 },
         { num1: 4, num2: 14, answer: 18 },
         { num1: 5, num2: 13, answer: 18 },
         { num1: 6, num2: 12, answer: 18 },
         { num1: 7, num2: 11, answer: 18 },
         { num1: 8, num2: 10, answer: 18 },
         { num1: 9, num2: 9, answer: 18 },
         { num1: 10, num2: 8, answer: 18 },
         { num1: 11, num2: 7, answer: 18 },
         { num1: 12, num2: 6, answer: 18 },
         { num1: 13, num2: 5, answer: 18 },
         { num1: 14, num2: 4, answer: 18 },
         { num1: 15, num2: 3, answer: 18 },
         { num1: 16, num2: 2, answer: 18 },
         { num1: 17, num2: 1, answer: 18 },
         { num1: 18, num2: 0, answer: 18 },
         
         // Sum = 19 (19 pairs)
         { num1: 0, num2: 19, answer: 19 },
         { num1: 1, num2: 18, answer: 19 },
         { num1: 2, num2: 17, answer: 19 },
         { num1: 3, num2: 16, answer: 19 },
         { num1: 4, num2: 15, answer: 19 },
         { num1: 5, num2: 14, answer: 19 },
         { num1: 6, num2: 13, answer: 19 },
         { num1: 7, num2: 12, answer: 19 },
         { num1: 8, num2: 11, answer: 19 },
         { num1: 9, num2: 10, answer: 19 },
         { num1: 10, num2: 9, answer: 19 },
         { num1: 11, num2: 8, answer: 19 },
         { num1: 12, num2: 7, answer: 19 },
         { num1: 13, num2: 6, answer: 19 },
         { num1: 14, num2: 5, answer: 19 },
         { num1: 15, num2: 4, answer: 19 },
         { num1: 16, num2: 3, answer: 19 },
         { num1: 17, num2: 2, answer: 19 },
         { num1: 18, num2: 1, answer: 19 },
         { num1: 19, num2: 0, answer: 19 },
         
         // Sum = 20 (20 pairs)
         { num1: 0, num2: 20, answer: 20 },
         { num1: 1, num2: 19, answer: 20 },
         { num1: 2, num2: 18, answer: 20 },
         { num1: 3, num2: 17, answer: 20 },
         { num1: 4, num2: 16, answer: 20 },
         { num1: 5, num2: 15, answer: 20 },
         { num1: 6, num2: 14, answer: 20 },
         { num1: 7, num2: 13, answer: 20 },
         { num1: 8, num2: 12, answer: 20 },
         { num1: 9, num2: 11, answer: 20 },
         { num1: 10, num2: 10, answer: 20 },
         { num1: 11, num2: 9, answer: 20 },
         { num1: 12, num2: 8, answer: 20 },
         { num1: 13, num2: 7, answer: 20 },
         { num1: 14, num2: 6, answer: 20 },
         { num1: 15, num2: 5, answer: 20 },
         { num1: 16, num2: 4, answer: 20 },
         { num1: 17, num2: 3, answer: 20 },
         { num1: 18, num2: 2, answer: 20 },
         { num1: 19, num2: 1, answer: 20 },
         { num1: 20, num2: 0, answer: 20 }
       ];
     } else {
       // Default case - use original questions
      additionQuestions = [
        { num1: 0, num2: 0, answer: 0 },
        { num1: 0, num2: 1, answer: 1 },
        { num1: 0, num2: 2, answer: 2 },
        { num1: 0, num2: 3, answer: 3 },
        { num1: 0, num2: 4, answer: 4 },
        { num1: 0, num2: 5, answer: 5 },
        { num1: 1, num2: 0, answer: 1 },
        { num1: 1, num2: 1, answer: 2 },
        { num1: 1, num2: 2, answer: 3 },
        { num1: 1, num2: 3, answer: 4 },
        { num1: 1, num2: 4, answer: 5 },
        { num1: 2, num2: 0, answer: 2 },
        { num1: 2, num2: 1, answer: 3 },
        { num1: 2, num2: 2, answer: 4 },
        { num1: 2, num2: 3, answer: 5 },
        { num1: 3, num2: 0, answer: 3 },
        { num1: 3, num2: 1, answer: 4 },
        { num1: 3, num2: 2, answer: 5 },
        { num1: 4, num2: 0, answer: 4 },
        { num1: 4, num2: 1, answer: 5 },
        { num1: 5, num2: 0, answer: 5 }
      ];
    }
    // Shuffle the questions to randomize them
    const shuffledQuestions = [...additionQuestions].sort(() => Math.random() - 0.5);
    
    const questions = [];
    try {
      for (let i = 0; i < shuffledQuestions.length; i++) {
        const questionData = shuffledQuestions[i];
        
        // Validate question data
        if (!questionData || typeof questionData.num1 !== 'number' || typeof questionData.num2 !== 'number' || typeof questionData.answer !== 'number') {
          console.error('Invalid question data:', questionData);
          continue;
        }
        
        const questionText = `${questionData.num1} + ${questionData.num2}`;
        
        // Update last question
        setLastPreTestQuestion(questionText);
        
        // Generate wrong answers
        let wrongAnswers = new Set();
        let attempts = 0;
        const maxAttempts = 50;
        
        while (wrongAnswers.size < 3 && attempts < maxAttempts) {
          attempts++;
          let wrong;
          if (questionData.answer <= 10) {
            // For smaller answers, use the original range
            wrong = questionData.answer + Math.floor(Math.random() * 11) - 5; // -5 to +5
            if (wrong !== questionData.answer && wrong >= 0 && wrong <= 10) {
              wrongAnswers.add(wrong);
            }
          } else {
            // For larger answers (11-20), use a more appropriate range
            wrong = questionData.answer + Math.floor(Math.random() * 9) - 4; // -4 to +4
            if (wrong !== questionData.answer && wrong >= 0 && wrong <= 25) {
              wrongAnswers.add(wrong);
            }
          }
        }
        
        // Fallback: if we don't have enough wrong answers, add some default ones
        while (wrongAnswers.size < 3) {
          const fallbackWrong = questionData.answer + wrongAnswers.size + 1;
          if (fallbackWrong !== questionData.answer) {
            wrongAnswers.add(fallbackWrong);
          }
        }
        
        const answers = [questionData.answer, ...Array.from(wrongAnswers)];
        
        // Validate answers array
        if (answers.length !== 4) {
          console.error('Invalid answers array:', answers);
          continue;
        }
        
        // Shuffle answers
        for (let j = answers.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * (j + 1));
          [answers[j], answers[k]] = [answers[k], answers[j]];
        }
        questions.push({
          question: questionText,
          correctAnswer: questionData.answer,
          answers: answers,
          type: 'addition'
        });
      }
    } catch (error) {
      console.error('Error generating addition questions:', error);
    }
    
    console.log('Addition questions generated:', questions.length, 'for subSection:', subSection);
    
    // Fallback: if no questions were generated, return some basic questions
    if (questions.length === 0) {
      console.warn('No questions generated, using fallback questions');
      return [
        {
          question: '1 + 1',
          correctAnswer: 2,
          answers: [2, 3, 4, 5],
          type: 'addition'
        },
        {
          question: '2 + 2',
          correctAnswer: 4,
          answers: [4, 5, 6, 7],
          type: 'addition'
        }
      ];
    }
    
    return questions;
  };

  // Generate subtraction questions for pre-test
  const generateSubtractionQuestions = () => {
    const questions = [];
    for (let i = 0; i < 3; i++) {
      let num1, num2, correctAnswer;
      let questionText;
      let attempts = 0;
      const maxAttempts = 50;
      
      // Keep generating until we get a unique question
      do {
        attempts++;
        num1 = Math.floor(Math.random() * 50) + 50; // 50-99
        num2 = Math.floor(Math.random() * 30) + 10; // 10-39
        correctAnswer = num1 - num2;
        questionText = `${num1} - ${num2}`;
      } while (questionText === lastPreTestQuestion && attempts < maxAttempts);
      
      // Update last question
      setLastPreTestQuestion(questionText);
      
      // Generate wrong answers
      let wrongAnswers = new Set();
      while (wrongAnswers.size < 3) {
        let wrong = correctAnswer + Math.floor(Math.random() * 11) - 5; // -5 to +5
        if (wrong !== correctAnswer && wrong > 0) wrongAnswers.add(wrong);
      }
      
      const answers = [correctAnswer, ...Array.from(wrongAnswers)];
      // Shuffle answers
      for (let j = answers.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [answers[j], answers[k]] = [answers[k], answers[j]];
      }
      
      questions.push({
        question: questionText,
        correctAnswer: correctAnswer,
        answers: answers,
        type: 'subtraction'
      });
    }
    return questions;
  };
  // Generate multiplication questions for pre-test
  const generateMultiplicationQuestions = () => {
    const questions = [];
    for (let i = 0; i < 3; i++) {
      let num1, num2, correctAnswer;
      let questionText;
      let attempts = 0;
      const maxAttempts = 50;
      
      // Keep generating until we get a unique question
      do {
        attempts++;
        num1 = Math.floor(Math.random() * 12) + 6; // 6-17
        num2 = Math.floor(Math.random() * 12) + 6; // 6-17
        correctAnswer = num1 * num2;
        questionText = `${num1} × ${num2}`;
      } while (questionText === lastPreTestQuestion && attempts < maxAttempts);
      
      // Update last question
      setLastPreTestQuestion(questionText);
    
    // Generate wrong answers
      let wrongAnswers = new Set();
      while (wrongAnswers.size < 3) {
        let wrong = correctAnswer + Math.floor(Math.random() * 11) - 5; // -5 to +5
        if (wrong !== correctAnswer && wrong > 0) wrongAnswers.add(wrong);
      }
      
      const answers = [correctAnswer, ...Array.from(wrongAnswers)];
      // Shuffle answers
      for (let j = answers.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [answers[j], answers[k]] = [answers[k], answers[j]];
      }
      
      questions.push({
        question: questionText,
        correctAnswer: correctAnswer,
        answers: answers,
        type: 'multiplication'
      });
    }
    return questions;
  };
  // Generate division questions for pre-test
  const generateDivisionQuestions = () => {
    const questions = [];
    for (let i = 0; i < 3; i++) {
      let num1, num2, product, correctAnswer;
      let questionText;
      let attempts = 0;
      const maxAttempts = 50;
      
      // Keep generating until we get a unique question
      do {
        attempts++;
        num1 = Math.floor(Math.random() * 12) + 6; // 6-17
        num2 = Math.floor(Math.random() * 12) + 6; // 6-17
        product = num1 * num2;
        correctAnswer = num1;
        questionText = `${product} ÷ ${num2}`;
      } while (questionText === lastPreTestQuestion && attempts < maxAttempts);
      
      // Update last question
      setLastPreTestQuestion(questionText);
      
      // Generate wrong answers
      let wrongAnswers = new Set();
      while (wrongAnswers.size < 3) {
        let wrong = correctAnswer + Math.floor(Math.random() * 7) - 3; // -3 to +3
        if (wrong !== correctAnswer && wrong > 0 && wrong <= 20) wrongAnswers.add(wrong);
      }
      
      const answers = [correctAnswer, ...Array.from(wrongAnswers)];
      // Shuffle answers
      for (let j = answers.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [answers[j], answers[k]] = [answers[k], answers[j]];
      }
      
      questions.push({
        question: questionText,
        correctAnswer: correctAnswer,
        answers: answers,
        type: 'division'
      });
    }
    return questions;
  };

  // Helper: Only number sentence visual aid for all tables (basic level)
  const visualAidRenderers = {};
  for (let t = 1; t <= 12; t++) {
    visualAidRenderers[t] = [
      // Only aid: number sentence with question mark
      (q) => (
        <div className="text-lg font-comic text-yellow-100 bg-black/30 rounded-xl px-4 py-2 shadow mt-2">
          {Array.from({ length: q.multiplier }).map((_, i) => (
            <span key={i}>{t}{i < q.multiplier - 1 ? ' + ' : ''}</span>
          ))}
          = <span className="font-bold text-yellow-300">?</span>
        </div>
      ),
    ];
  }
  // Helper: Choose next visual aid adaptively
  function chooseVisualAid(table, multiplier) {
    const aids = visualAidRenderers[table];
    if (!aids) return 0;
    // Get last 5 shown for this table/multiplier
    const recent = visualAidHistory.filter(h => h.table === table && h.multiplier === multiplier).slice(-5);
    // Prefer the one shown least recently
    const counts = aids.map((_, idx) => recent.filter(h => h.aidIdx === idx).length);
    const minCount = Math.min(...counts);
    const candidates = counts.map((c, idx) => c === minCount ? idx : null).filter(idx => idx !== null);
    // Pick randomly among least-shown
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  // Track which visual aid was shown and if the answer was correct
  useEffect(() => {
    if (answerFeedback && currentQuestion) {
      setVisualAidHistory(h => [
        ...h,
        {
          table: selectedTable,
          multiplier: currentQuestion.multiplier,
          aidIdx: currentQuestion.visualAidIdx,
          correct: answerFeedback.type === 'correct',
          timestamp: Date.now(),
        },
      ]);
    }
    // eslint-disable-next-line
  }, [answerFeedback]);
  // Generate a random multiplication question
  const generateQuestion = (tableNumber, difficulty = 'medium') => {
    // Validate inputs
    if (!tableNumber || tableNumber <= 0) {
      tableNumber = 1; // Default to table 1 if invalid
    }
    if (!difficulty) {
      difficulty = 'medium'; // Default to medium if invalid
    }
    
    // For belt-specific difficulties (white, yellow, green, etc.), preserve the difficulty
    // For other difficulties, alternate between medium and basic difficulty
    if (!['white', 'yellow', 'green', 'blue', 'red', 'brown'].includes(difficulty)) {
      difficulty = questionAlternator;
    }
    
    // If the last question was from the same difficulty, force alternate
    if (lastQuestion && lastQuestion.includes('+')) {
      const lastDifficulty = lastQuestion.includes('1 +') && (lastQuestion.includes('5') || lastQuestion.includes('6') || lastQuestion.includes('7') || lastQuestion.includes('8') || lastQuestion.includes('9')) ? 'medium' : 'basic';
      if (lastDifficulty === difficulty) {
        difficulty = difficulty === 'medium' ? 'basic' : 'medium';
        setQuestionAlternator(difficulty);
      }
    }
    

    
    let num1, num2, correctAnswer, questionText;
    let attempts = 0;
    const maxAttempts = 50;
    /*
                    // White Belt specific logic - delegate to generateBeltQuestion for consistency
      if (difficulty === 'white') {
        const beltQuestion = generateBeltQuestion('white', totalQuestions, askedQuestions, lastQuestion, selectedTable);
        // Convert belt question format to the format expected by this function
        if (beltQuestion.question === '0 + 0') {
          num1 = 0;
          num2 = 0;
          questionText = '0 + 0';
          correctAnswer = 0;
        } else if (beltQuestion.question === '1 + 1') {
          num1 = 1;
          num2 = 1;
          questionText = '1 + 1';
          correctAnswer = 2;
        } else {
          // It's a number recognition question or a question from previous level belts
          if (typeof beltQuestion.question === 'number') {
            // It's a number recognition question
            num1 = beltQuestion.correctAnswer;
            num2 = 0;
            questionText = beltQuestion.question;
            correctAnswer = beltQuestion.correctAnswer;
          } else {
            // It's a question from previous level belts (like "0+1", "1+0", etc.)
            // Parse the question to extract num1 and num2
            const parts = beltQuestion.question.split(' + ');
            if (parts.length === 2) {
              num1 = parseInt(parts[0]);
              num2 = parseInt(parts[1]);
              questionText = beltQuestion.question;
              correctAnswer = beltQuestion.correctAnswer;
            } else {
              // Fallback: treat as number recognition
              num1 = beltQuestion.correctAnswer;
              num2 = 0;
              questionText = beltQuestion.question;
              correctAnswer = beltQuestion.correctAnswer;
            }
          }
        }
      } else if (difficulty === 'green') {
        // Green Belt specific logic - 10 questions with 0+2 appearing with 2-question gaps
        const questionNumber = totalQuestions + 1;
        
        // Determine if this should be a "0 + 2" question
        let shouldBeZeroPlusTwo = false;
        
        if (questionNumber === 1) {
          // First question is always "0 + 2"
          shouldBeZeroPlusTwo = true;
        } else {
          // Check if this question should be "0 + 2" based on previous "0 + 2" questions
          const greenBeltQuestions = askedQuestions ? Array.from(askedQuestions).filter(q => q === '0 + 2') : [];
          const lastZeroPlusTwoPosition = greenBeltQuestions.length > 0 ? 
            Array.from(askedQuestions).lastIndexOf('0 + 2') + 1 : 0;
          
          // If the last "0 + 2" was 2 questions ago, this should be "0 + 2"
          if (questionNumber - lastZeroPlusTwoPosition >= 3) {
            shouldBeZeroPlusTwo = true;
          }
        }
        
        if (shouldBeZeroPlusTwo) {
          // This should be a "0 + 2" question
          num1 = 0;
          num2 = 2;
          questionText = '0 + 2';
          correctAnswer = 2;
        } else {
          // Other questions: Random from White Belt
          const whiteBeltQuestions = [
            { num1: 0, num2: 0, text: '0 + 0', answer: 0 }
          ];
          
          // Add number recognition questions (0-9)
          for (let i = 0; i <= 9; i++) {
            whiteBeltQuestions.push({
              num1: i,
              num2: 0,
              text: `${i}`,
              answer: i
            });
          }
          
          // Filter out the last question to avoid consecutive repeats
          const availableQuestions = whiteBeltQuestions.filter(q => q.text !== lastQuestion);
          
          // If all questions would be filtered out, allow all questions except the last one
          const questionsToUse = availableQuestions.length > 0 ? availableQuestions : whiteBeltQuestions.filter(q => q.text !== lastQuestion);
          
          // Randomly select from available questions
          const randomQuestion = questionsToUse[Math.floor(Math.random() * questionsToUse.length)];
          num1 = randomQuestion.num1;
          num2 = randomQuestion.num2;
          questionText = randomQuestion.text;
          correctAnswer = randomQuestion.answer;
        }
        
        // Ensure no consecutive questions are the same
        if (questionText === lastQuestion) {
          // If this question is the same as the last one, try to get a different one
          if (shouldBeZeroPlusTwo) {
            // If it should be "0 + 2" but that's the same as last question, 
            // pick a random question instead
            const whiteBeltQuestions = [
              { num1: 0, num2: 0, text: '0 + 0', answer: 0 }
            ];
            
            // Add number recognition questions (0-9)
            for (let i = 0; i <= 9; i++) {
              whiteBeltQuestions.push({
                num1: i,
                num2: 0,
                text: `${i}`,
                answer: i
              });
            }
            
            // Filter out the last question
            const availableQuestions = whiteBeltQuestions.filter(q => q.text !== lastQuestion);
            const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
            num1 = randomQuestion.num1;
            num2 = randomQuestion.num2;
            questionText = randomQuestion.text;
            correctAnswer = randomQuestion.answer;
          } else {
            // If it's a random question but same as last, force "0 + 2"
            num1 = 0;
            num2 = 2;
            questionText = '0 + 2';
            correctAnswer = 2;
          }
        }
        // Return the generated question for Green Belt
        return {
          question: questionText,
          correctAnswer: correctAnswer,
          answers: [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].filter(a => a >= 0 && a <= 10),
          multiplier: num1,
          difficulty: 'green'
        };
      } else if (difficulty === 'blue') {
        // Blue Belt specific logic - "0 + 3" repeats after every 2 questions
        const questionNumber = totalQuestions + 1;
        console.log('BLUE BELT DEBUG: Generating question', questionNumber, 'lastQuestion:', lastQuestion);
        
        // Questions 1, 4, 7, 10 are always "0 + 3"
        if (questionNumber === 1 || questionNumber === 4 || questionNumber === 7 || questionNumber === 10) {
          questionText = '0 + 3';
          num1 = 0;
          num2 = 3;
          correctAnswer = 3;
        } else {
          // HARD OVERRIDE: For questions 2, 3, 5, 6, 8, 9, NEVER generate "0 + 3"
          console.log('BLUE BELT: Generating random question for position', questionNumber, 'lastQuestion was:', lastQuestion);
          // Questions 2, 3, 5, 6, 8, 9 are random from previous belts ONLY
          const previousBeltQuestions = [
            { num1: 0, num2: 0, text: '0 + 0', answer: 0 },
            { num1: 0, num2: 1, text: '0 + 1', answer: 1 },
            { num1: 0, num2: 2, text: '0 + 2', answer: 2 }
          ];
          
          // Add number recognition questions (0-9) - ONLY from previous belts
          for (let i = 0; i <= 9; i++) {
            previousBeltQuestions.push({
              num1: i,
              num2: 0,
              text: `${i}`,
              answer: i
            });
          }
          
          // Filter out the last question to avoid consecutive repeats
          const availableQuestions = previousBeltQuestions.filter(q => q.text !== lastQuestion);
          
          // If all questions would be filtered out, allow all questions except the last one
          const questionsToUse = availableQuestions.length > 0 ? availableQuestions : previousBeltQuestions.filter(q => q.text !== lastQuestion);
          
          // Randomly select from available questions
          const randomQuestion = questionsToUse[Math.floor(Math.random() * questionsToUse.length)];
          num1 = randomQuestion.num1;
          num2 = randomQuestion.num2;
          questionText = randomQuestion.text;
          correctAnswer = randomQuestion.answer;
        }
        
        // Return the generated question for Blue Belt - HARD OVERRIDE
        console.log('BLUE BELT: Generating question', questionNumber, ':', questionText);
        
        // HARD OVERRIDE: Ensure no "1 + 1" questions for blue belt
        if (questionText === '1 + 1') {
          console.log('BLUE BELT: Detected "1 + 1", forcing "0 + 3"');
          questionText = '0 + 3';
          num1 = 0;
          num2 = 3;
          correctAnswer = 3;
        }
        
        // HARD OVERRIDE: Ensure questions 2, 3, 5, 6, 8, 9 are NEVER "0 + 3"
        if ((questionNumber === 2 || questionNumber === 3 || questionNumber === 5 || questionNumber === 6 || questionNumber === 8 || questionNumber === 9) && questionText === '0 + 3') {
          console.log('BLUE BELT: Detected "0 + 3" for wrong position, forcing random question');
          // Force a random question from previous belts
          const fallbackQuestions = [
            { text: '0 + 0', answer: 0 },
            { text: '0 + 1', answer: 1 },
            { text: '0 + 2', answer: 2 },
            { text: '0', answer: 0 },
            { text: '1', answer: 1 },
            { text: '2', answer: 2 },
            { text: '3', answer: 3 },
            { text: '4', answer: 4 },
            { text: '5', answer: 5 },
            { text: '6', answer: 6 },
            { text: '7', answer: 7 },
            { text: '8', answer: 8 },
            { text: '9', answer: 9 }
          ];
          const randomFallback = fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)];
          questionText = randomFallback.text;
          correctAnswer = randomFallback.answer;
        }
        
        // ULTIMATE OVERRIDE: If this is question 2 and the last question was "0 + 3", force a different question
        if (questionNumber === 2 && lastQuestion === '0 + 3' && questionText === '0 + 3') {
          console.log('BLUE BELT: ULTIMATE OVERRIDE - Question 2 cannot be "0 + 3" after "0 + 3"');
          questionText = '0 + 1';
          correctAnswer = 1;
        }
        
        // FINAL OVERRIDE: For question 2, NEVER allow "0 + 3"
        if (questionNumber === 2 && questionText === '0 + 3') {
          console.log('BLUE BELT: FINAL OVERRIDE - Question 2 cannot be "0 + 3"');
          questionText = '0 + 1';
          correctAnswer = 1;
        }
        // AGGRESSIVE OVERRIDE: For question 2, if lastQuestion was "0 + 3", force a different question
        if (questionNumber === 2 && lastQuestion === '0 + 3') {
          console.log('BLUE BELT: AGGRESSIVE OVERRIDE - Question 2 after "0 + 3", forcing different question');
          const differentQuestions = [
            { text: '0 + 0', answer: 0 },
            { text: '0 + 1', answer: 1 },
            { text: '0 + 2', answer: 2 },
            { text: '0', answer: 0 },
            { text: '1', answer: 1 },
            { text: '2', answer: 2 },
            { text: '4', answer: 4 },
            { text: '5', answer: 5 }
          ];
          const randomDifferent = differentQuestions[Math.floor(Math.random() * differentQuestions.length)];
          questionText = randomDifferent.text;
          correctAnswer = randomDifferent.answer;
        }
        
        // Generate exactly 4 answer choices
        let answers = [correctAnswer];
        
        // Add 3 more unique answers
        const possibleAnswers = [];
        for (let i = 0; i <= 10; i++) {
          if (i !== correctAnswer) {
            possibleAnswers.push(i);
          }
        }
        
        // Shuffle and take 3 more answers
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * possibleAnswers.length);
          answers.push(possibleAnswers[randomIndex]);
          possibleAnswers.splice(randomIndex, 1);
        }
        
        // Shuffle the final answers array
        answers = answers.sort(() => Math.random() - 0.5);
        
        return {
          question: questionText,
          correctAnswer: correctAnswer,
          answers: answers,
          multiplier: num1,
          difficulty: 'blue'
        };
      } else if (tableNumber === 1) {
        // For medium difficulty level 1: ensure questions contain digit 1 and another from 5-9
        // All unique possible questions for medium level 1
        const allPossibleQuestions = [
          { num1: 1, num2: 5, text: '1 + 5' },
          { num1: 5, num2: 1, text: '5 + 1' },
          { num1: 1, num2: 6, text: '1 + 6' },
          { num1: 6, num2: 1, text: '6 + 1' },
          { num1: 1, num2: 7, text: '1 + 7' },
          { num1: 7, num2: 1, text: '7 + 1' },
          { num1: 1, num2: 8, text: '1 + 8' },
          { num1: 8, num2: 1, text: '8 + 1' },
          { num1: 1, num2: 9, text: '1 + 9' },
          { num1: 9, num2: 1, text: '9 + 1' }
        ];
        
        // Filter out recent questions from the same difficulty pool to avoid consecutive repeats
        const recentFromSamePool = recentQuestions.filter(q => {
          return q.includes('1 +') && (q.includes('5') || q.includes('6') || q.includes('7') || q.includes('8') || q.includes('9'));
        });
        
        let availableQuestions = allPossibleQuestions.filter(q => !recentFromSamePool.includes(q.text));
        
        // If all questions from this pool have been used recently, allow all questions from this pool
        if (availableQuestions.length === 0) {
          availableQuestions = allPossibleQuestions.filter(q => q.text !== lastQuestion);
        }
        // Check if all questions have been asked at least once
        const allQuestionsAsked = allPossibleQuestions.every(q => askedQuestions.has(q.text));
        
        if (!allQuestionsAsked) {
          // Phase 1: Ask all questions at least once
          const unaskedQuestions = allPossibleQuestions.filter(q => !askedQuestions.has(q.text));
          const randomQuestion = unaskedQuestions[Math.floor(Math.random() * unaskedQuestions.length)];
          num1 = randomQuestion.num1;
          num2 = randomQuestion.num2;
          questionText = randomQuestion.text;
          
          // Mark this question as asked
          setAskedQuestions(prev => new Set([...prev, questionText]));
        } else if (wrongQuestions.size > 0) {
          // Phase 2: Ask questions that were answered incorrectly
          const wrongQuestionTexts = Array.from(wrongQuestions);
          const wrongQuestionText = wrongQuestionTexts[Math.floor(Math.random() * wrongQuestionTexts.length)];
          const wrongQuestion = allPossibleQuestions.find(q => q.text === wrongQuestionText);
          
          if (wrongQuestion) {
            num1 = wrongQuestion.num1;
            num2 = wrongQuestion.num2;
            questionText = wrongQuestion.text;
          } else {
            // Fallback to random question
            const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
            num1 = randomQuestion.num1;
            num2 = randomQuestion.num2;
            questionText = randomQuestion.text;
          }
        } else {
          // Phase 3: Ask questions where user spent more than 3 seconds
          const slowQuestions = allPossibleQuestions.filter(q => {
            const avgTime = questionTimeTracker[q.text] || 0;
            return avgTime > 3;
          });
          
          if (slowQuestions.length > 0) {
            // Prioritize slow questions
            const randomSlowQuestion = slowQuestions[Math.floor(Math.random() * slowQuestions.length)];
            num1 = randomSlowQuestion.num1;
            num2 = randomSlowQuestion.num2;
            questionText = randomSlowQuestion.text;
          } else {
            // Phase 4: Random repetition
            const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
            num1 = randomQuestion.num1;
            num2 = randomQuestion.num2;
            questionText = randomQuestion.text;
          }
        }
        
        correctAnswer = num1 + num2;
      } else {
      // Keep generating until we get a unique question for other difficulties
      do {
        attempts++;
        // Generate two numbers to add together
        num1 = Math.floor(Math.random() * 20) + 1; // 1-20
        num2 = Math.floor(Math.random() * 20) + 1; // 1-20
        correctAnswer = num1 + num2;
        questionText = `${num1} + ${num2}`;
      } while (questionText === lastQuestion && attempts < maxAttempts);
    }
    
    // Update last question and recent questions
    setLastQuestion(questionText);
    setRecentQuestions(prev => {
      const newRecent = [...prev, questionText];
      // Keep only last 3 questions to avoid repeats
      return newRecent.slice(-3);
    });
    
    // Toggle the alternator for next question (for all levels)
    setQuestionAlternator(prev => prev === 'medium' ? 'basic' : 'medium');
    
    // Validate correct answer
    if (!correctAnswer || correctAnswer <= 0) {
      // Fallback to a simple question if calculation fails
      return {
        question: `1 + 1`,
        correctAnswer: 2,
        answers: [1, 2, 3, 4],
        multiplier: 1,
        difficulty: 'white'
      };
    }*/
    
    // Generate wrong answers based on difficulty
    let wrongAnswers = new Set();
    attempts = 0;
    
    // Generate wrong answers based on difficulty
    if (difficulty === 'white' && !isNaN(questionText)) {
      // For White Belt number recognition: use numbers 0-9 as options
      const possibleAnswers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const availableAnswers = possibleAnswers.filter(ans => ans !== correctAnswer);
      
      // Randomly select 3 wrong answers from available options
      while (wrongAnswers.size < 3 && availableAnswers.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableAnswers.length);
        wrongAnswers.add(availableAnswers[randomIndex]);
        availableAnswers.splice(randomIndex, 1); // Remove used answer
      }
      
      // If we don't have enough wrong answers, add some fallback options
      while (wrongAnswers.size < 3) {
        const fallback = Math.floor(Math.random() * 10); // 0-9
        if (fallback !== correctAnswer && !wrongAnswers.has(fallback)) {
          wrongAnswers.add(fallback);
        }
      }
    } else {
      // Generate wrong answers for all other difficulties
      while (wrongAnswers.size < 3 && attempts < maxAttempts) {
        attempts++;
        let wrong = correctAnswer + Math.floor(Math.random() * 11) - 5; // -5 to +5
        if (wrong !== correctAnswer && wrong > 0 && wrong <= 40) wrongAnswers.add(wrong);
      }
      
      // Ensure we have enough wrong answers
      while (wrongAnswers.size < 3) {
        wrongAnswers.add(correctAnswer + wrongAnswers.size + 1);
      }
    }
    const answers = [correctAnswer, ...Array.from(wrongAnswers)];
    
    // Validate answers array
    if (!answers || answers.length !== 4) {
      return {
        question: `1 + 1`,
        correctAnswer: 2,
        answers: [1, 2, 3, 4],
        multiplier: 1,
        difficulty: 'white'
      };
    }
    
    // Shuffle answers
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    
    return {
      question: questionText,
      correctAnswer: correctAnswer,
      answers: answers,
      multiplier: num1, // Keep for compatibility, but now represents first number
      difficulty: difficulty
    };
  };

  // When generating a new question, pick a visual aid idx
  function generateQuestionWithAid(tableNumber, difficulty = 'medium') {
    // Validate inputs
    if (!tableNumber || tableNumber <= 0) {
      tableNumber = 1;
    }
    if (!difficulty) {
      difficulty = 'white';
    }
    
    const q = generateQuestion(tableNumber, difficulty);
    
    // Validate the generated question
    if (!q || !q.question || !q.correctAnswer || !q.answers || q.answers.length !== 4) {
      // Return a fallback addition question if generation fails
      return {
        question: `1 + 1`,
        correctAnswer: 2,
        answers: [1, 2, 3, 4],
        multiplier: 1,
        difficulty: 'basic'
      };
    }
    
    // Visual aid for all difficulties
    q.visualAidIdx = chooseVisualAid(tableNumber, q.multiplier);
    return q;
  }



  const startQuiz = (tableNumber) => {
      // Reset all quiz-related state
    setCurrentQuestion(null);
    setQuestionStartTime(null);
    setQuestionTimeoutId(null);
    setWrongAnswerData(null);
    setShowWrongAnswerPopup(false);
    setWrongCount(0);
    setTotalQuestions(0);
    setLastQuestion('');
  
    // Clear any existing timeouts
    if (questionTimeoutId) {
      clearTimeout(questionTimeoutId);
      setQuestionTimeoutId(null);
    }
    
    // Clear any existing shooting stars
    clearShootingStars();
    
    playSound('click');
    setSelectedTable(tableNumber);
    setShowDifficultyPicker(true);
    setCurrentPage('difficulty');
  };

  // When starting a quiz, set target question count based on difficulty
  const startQuizWithDifficulty = (difficulty) => {
    // Show learning module first
    setPendingDifficulty(difficulty);
    
    // Set learning module content based on difficulty and table level
    let content = '';
    if (difficulty === 'white') {
      if (selectedTable === 1) {
        content = '0 + 0 = 0';
      } else if (selectedTable === 2) {
        content = '1 + 1 = 2';
      } else if (selectedTable === 3) {
        // Level 3 white belt: always show first fact initially
        content = '0 + 6 = 6';
      } else if (selectedTable === 4) {
        // Level 4 white belt: show first fact initially
        content = '1 + 6 = 7';
      } else if (selectedTable === 5) {
        // Level 5 white belt: show first fact initially
        content = '2 + 6 = 8';
      } else if (selectedTable === 6) {
        // Level 6 white belt: show first fact initially
        content = '3 + 6 = 9';
      }
    } else if (difficulty === 'yellow') {
      if (selectedTable === 1) {
        content = '0 + 1 = 1';
      } else if (selectedTable === 2) {
        content = '1 + 2 = 3\n\n\n2 + 1 = 3';
      } else if (selectedTable === 3) {
        // Level 3 white belt: show different facts based on question index
          content = '0 + 7 = 7';
      } else if (selectedTable === 4) {
        content = '1 + 7 = 8';
      } else if (selectedTable === 5) {
        content = '2 + 7 = 9';
      } else if (selectedTable === 6) {
        content = '3 + 7 = 10';
      }
    } else if (difficulty === 'green') {
      if (selectedTable === 1) {
        content = '0 + 2 = 2';
      } else if (selectedTable === 2) {
        content = '1 + 3 = 4\n\n\n3 + 1 = 4';
      } else if (selectedTable === 3) {
        content = '0 + 8 = 8';  // First fact for level 3 green belt
      } else if (selectedTable === 4) {
        content = '1 + 8 = 9';
      } else if (selectedTable === 5) {
        content = '2 + 8 = 10';
      } else if (selectedTable === 6) {
        content = '4 + 4 = 8';
      }
    } else if (difficulty === 'blue') {
      if (selectedTable === 1) {
        content = '0 + 3 = 3';
      } else if (selectedTable === 2) {
                content = '1 + 4 = 5\n\n\n4 + 1 = 5';
    } else if (selectedTable === 3) {
                content = '0 + 9 = 9';  // First fact for level 3 blue belt
      } else if (selectedTable === 4) {
        content = '1 + 9 = 10';
      } else if (selectedTable === 5) {
        content = '3 + 3 = 6';
      } else if (selectedTable === 6) {
        content = '4 + 5 = 9';
    }
    } else if (difficulty === 'red') {
      if (selectedTable === 1) {
        content = '0 + 4 = 4';
      } else if (selectedTable === 2) {
                content = '2 + 2 = 4';
              } else if (selectedTable === 3) {
                content = '0 + 10 = 10';  // First fact for level 3 red belt
              } else if (selectedTable === 4) {
                content = '2 + 4 = 6';
              } else if (selectedTable === 5) {
                content = '3 + 4 = 7';
              } else if (selectedTable === 6) {
                content = '4 + 6 = 10';
              }
    } else if (difficulty === 'brown') {
      if (selectedTable === 1) {
        content = '0 + 5 = 5';
      } else if (selectedTable === 2) {
                content = '2 + 3 = 5\n\n\n3 + 2 = 5';
              } else if (selectedTable === 3) {
                content = '1 + 5 = 6';  // First fact for level 3 brown belt
              } else if (selectedTable === 4) {
                content = '2 + 5 = 7';
              } else if (selectedTable === 5) {
                content = '3 + 5 = 8';
              } else if (selectedTable === 6) {
                content = '5 + 5 = 10';
              }
    }
    
    setLearningModuleContent(content);
    console.log('Learning module content set to:', content, 'for difficulty:', difficulty, 'and table:', selectedTable);
    setShowLearningModule(true);
  };

  // Function to start the actual quiz after learning module
  const startActualQuiz = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setShowDifficultyPicker(false);
    setCurrentPage('quiz');
    setShowLearningModule(false);
    setCorrectAnswerSelected(false);
    setShowCorrectText(false);
    setLastWhiteBeltNumber(null);
    
    // CRITICAL FIX: Reset white belt sequence for new quiz sessions
    if (difficulty === 'white') {
      // Clear the white belt sequence to force regeneration
      if (window.whiteBeltFullSequence) {
        delete window.whiteBeltFullSequence;
        delete window.whiteBeltQuestionCounter;
        delete window.whiteBeltCoreQuestionsAsked;
      }
    }
    
    // CRITICAL FIX: Reset yellow belt sequence for new quiz sessions
    if (difficulty === 'yellow') {
      // Clear the yellow belt sequence to force regeneration
      if (window.yellowBeltFullSequence) {
        delete window.yellowBeltFullSequence;
        delete window.yellowBeltQuestionCounter;
        delete window.yellowBeltZeroPlusOneAsked;
        delete window.yellowBeltOnePlusZeroAsked;
      }
    }
    
    // CRITICAL FIX: Reset green belt sequence for new quiz sessions
    if (difficulty === 'green') {
      // Clear the green belt sequence to force regeneration
      if (window.greenBeltFullSequence) {
        delete window.greenBeltFullSequence;
        delete window.greenBeltQuestionCounter;
        delete window.greenBeltTwoPlusZeroAsked;
        delete window.greenBeltZeroPlusTwoAsked;
      }
    }
    
    // CRITICAL FIX: Reset blue belt sequence for new quiz sessions
    if (difficulty === 'blue') {
      // Clear the blue belt sequence to force regeneration
      if (window.blueBeltFullSequence) {
        delete window.blueBeltFullSequence;
        delete window.blueBeltQuestionCounter;
        delete window.blueBeltZeroPlusThreeAsked;
        delete window.blueBeltThreePlusZeroAsked;
      }
    }
    // CRITICAL FIX: Reset red belt sequence for new quiz sessions
    if (difficulty === 'red') {
      // Clear the red belt sequence to force regeneration
      if (window.redBeltFullSequence) {
        delete window.redBeltFullSequence;
        delete window.redBeltQuestionCounter;
        delete window.redBeltZeroPlusFourAsked;
        delete window.redBeltFourPlusZeroAsked;
      }
    }
    
    // CRITICAL FIX: Reset brown belt sequence for new quiz sessions
    if (difficulty === 'brown') {
      // Clear the brown belt sequence to force regeneration
      if (window.brownBeltFullSequence) {
        delete window.brownBeltFullSequence;
        delete window.brownBeltQuestionCounter;
        delete window.brownBeltZeroPlusFiveAsked;
        delete window.brownBeltFivePlusZeroAsked;
        delete window.brownBeltTwoPlusThreeAsked;
        delete window.brownBeltThreePlusTwoAsked;
      }
    }
    
    // Start the session timer when quiz begins (only if not already active)
    if (!sessionTimerActive) {
      setSessionTimerActive(true);
      setSessionTimerStart(Date.now());
      setSessionTimerPaused(false);
      setSessionTimerPauseStart(null);
    }
    // Always start fresh quiz - never restore saved state
    setScore(0);
    setTotalQuestions(0);
    setShowResult(false);
    setAnswerFeedback(null);
    setIsAnimating(false);
    setSlowQuestions(new Set());
    setCorrectCountForCompletion(0);
    setAnswerSymbols([]);
    // For White Belt, generate the first question using generateBeltQuestion for consistency
    let firstQuestion;
    console.log('DEBUG: Starting quiz with difficulty:', difficulty, 'and selectedTable:', selectedTable);
    if (difficulty === 'white') {
      // CRITICAL FIX: Reset lastQuestion state to prevent consecutive identical questions
      setLastQuestion('');
      
      // Use generateBeltQuestion to ensure consistent logic across all white belt questions
      firstQuestion = generateBeltQuestion('white', 0, new Set(), '', selectedTable);
    } else if (difficulty === 'yellow') {
      // Yellow Belt specific logic for first question
      const yellowBeltQuestions = [
        // 2 questions of "0 + 1"
        { question: '0 + 1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' },
        { question: '0 + 1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' },
        // 2 questions of "1 + 0"
        { question: '1 + 0', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'yellow' },
        { question: '1 + 0', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'yellow' },
        // 6 questions from previous belt (White Belt) excluding "0+1" and "1+0"
        { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' },
        { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' },
        { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' },
        { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' },
        { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' },
        { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' }
      ];
      
      // Add number recognition questions (0-9) to the pool
      for (let i = 0; i <= 9; i++) {
        yellowBeltQuestions.push({
          question: `${i}`,
          correctAnswer: i,
          answers: [i, (i + 1) % 10, (i + 2) % 10, (i + 3) % 10],
          multiplier: i,
        difficulty: 'yellow'
        });
      }
      
      // Randomly select first question from the pool
      firstQuestion = yellowBeltQuestions[Math.floor(Math.random() * yellowBeltQuestions.length)];
      
      // Shuffle the answers
      const shuffledAnswers = [...firstQuestion.answers].sort(() => Math.random() - 0.5);
      firstQuestion.answers = shuffledAnswers;
    } else if (difficulty === 'green') {
      // Green Belt: Random first question from the pool
      const greenBeltQuestions = [
        // Core facts: "0 + 2" and "2 + 0"
        { question: '0 + 2', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'green' },
        { question: '2 + 0', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'green' },
        // Previous belt questions
        { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'white' },
        { question: '0 + 1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' },
        { question: '1 + 0', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'yellow' },
        // Number recognition questions (0-9)
        { question: '0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'green' },
        { question: '1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'green' },
        { question: '2', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'green' },
        { question: '3', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 3, difficulty: 'green' },
        { question: '4', correctAnswer: 4, answers: [0, 1, 2, 4], multiplier: 4, difficulty: 'green' },
        { question: '5', correctAnswer: 5, answers: [0, 1, 2, 5], multiplier: 5, difficulty: 'green' },
        { question: '6', correctAnswer: 6, answers: [0, 1, 2, 6], multiplier: 6, difficulty: 'green' },
        { question: '7', correctAnswer: 7, answers: [0, 1, 2, 7], multiplier: 7, difficulty: 'green' },
        { question: '8', correctAnswer: 8, answers: [0, 1, 2, 8], multiplier: 8, difficulty: 'green' },
        { question: '9', correctAnswer: 9, answers: [0, 1, 2, 9], multiplier: 9, difficulty: 'green' }
      ];
      
      // Randomly select first question from the pool
      firstQuestion = greenBeltQuestions[Math.floor(Math.random() * greenBeltQuestions.length)];
      
      // Shuffle the answers
      const shuffledAnswers = [...firstQuestion.answers].sort(() => Math.random() - 0.5);
      firstQuestion.answers = shuffledAnswers;
    } else if (difficulty === 'blue') {
      // Blue Belt: Random first question from the pool
      const blueBeltQuestions = [
        // Core facts: "0 + 3" and "3 + 0"
        { question: '0 + 3', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'blue' },
        { question: '3 + 0', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 3, difficulty: 'blue' },
        // Previous belt questions
        { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'white' },
        { question: '0 + 1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' },
        { question: '1 + 0', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'yellow' },
        { question: '0 + 2', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'green' },
        { question: '2 + 0', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'green' },
        // Number recognition questions (0-9)
        { question: '0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'blue' },
        { question: '1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'blue' },
        { question: '2', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'blue' },
        { question: '3', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 3, difficulty: 'blue' },
        { question: '4', correctAnswer: 4, answers: [0, 1, 2, 4], multiplier: 4, difficulty: 'blue' },
        { question: '5', correctAnswer: 5, answers: [0, 1, 2, 5], multiplier: 5, difficulty: 'blue' },
        { question: '6', correctAnswer: 6, answers: [0, 1, 2, 6], multiplier: 6, difficulty: 'blue' },
        { question: '7', correctAnswer: 7, answers: [0, 1, 2, 7], multiplier: 7, difficulty: 'blue' },
        { question: '8', correctAnswer: 8, answers: [0, 1, 2, 8], multiplier: 8, difficulty: 'blue' },
        { question: '9', correctAnswer: 9, answers: [0, 1, 2, 9], multiplier: 9, difficulty: 'blue' }
      ];
      
      // Randomly select first question from the pool
      firstQuestion = blueBeltQuestions[Math.floor(Math.random() * blueBeltQuestions.length)];
      
      // Shuffle the answers
      const shuffledAnswers = [...firstQuestion.answers].sort(() => Math.random() - 0.5);
      firstQuestion.answers = shuffledAnswers;
    } else if (difficulty === 'red') {
      // Red Belt: Random first question from the pool
      const redBeltQuestions = [
        // Core facts: "0 + 4" and "4 + 0"
        { question: '0 + 4', correctAnswer: 4, answers: [0, 1, 2, 4], multiplier: 0, difficulty: 'red' },
        { question: '4 + 0', correctAnswer: 4, answers: [0, 1, 2, 4], multiplier: 4, difficulty: 'red' },
        // Previous belt questions
        { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'white' },
        { question: '0 + 1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'yellow' },
        { question: '1 + 0', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'yellow' },
        { question: '0 + 2', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'green' },
        { question: '2 + 0', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'green' },
        { question: '0 + 3', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'blue' },
        { question: '3 + 0', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 3, difficulty: 'blue' },
        // Number recognition questions (0-9)
        { question: '0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'red' },
        { question: '1', correctAnswer: 1, answers: [0, 1, 2, 3], multiplier: 1, difficulty: 'red' },
        { question: '2', correctAnswer: 2, answers: [0, 1, 2, 3], multiplier: 2, difficulty: 'red' },
        { question: '3', correctAnswer: 3, answers: [0, 1, 2, 3], multiplier: 3, difficulty: 'red' },
        { question: '4', correctAnswer: 4, answers: [0, 1, 2, 4], multiplier: 4, difficulty: 'red' },
        { question: '5', correctAnswer: 5, answers: [0, 1, 2, 5], multiplier: 5, difficulty: 'red' },
        { question: '6', correctAnswer: 6, answers: [0, 1, 2, 6], multiplier: 6, difficulty: 'red' },
        { question: '7', correctAnswer: 7, answers: [0, 1, 2, 7], multiplier: 7, difficulty: 'red' },
        { question: '8', correctAnswer: 8, answers: [0, 1, 2, 8], multiplier: 8, difficulty: 'red' },
        { question: '9', correctAnswer: 9, answers: [0, 1, 2, 9], multiplier: 9, difficulty: 'red' }
      ];
      
      // Randomly select first question from the pool
      firstQuestion = redBeltQuestions[Math.floor(Math.random() * redBeltQuestions.length)];
      
      // Shuffle the answers
      const shuffledAnswers = [...firstQuestion.answers].sort(() => Math.random() - 0.5);
      firstQuestion.answers = shuffledAnswers;
    } else if (difficulty === 'brown') {
      // Brown Belt: Use the improved generateBeltQuestion logic for first question
      console.log('DEBUG: Brown belt - selectedTable:', selectedTable, 'isLevel2 will be:', selectedTable === 2);
      firstQuestion = generateBeltQuestion('brown', 0, new Set(), '', selectedTable);
    } else {
      // For other difficulties, use generateQuestionWithAid as fallback
      // Ensure selectedTable is available
      const tableToUse = selectedTable || 1; // Default to table 1 if not set
      firstQuestion = generateQuestionWithAid(tableToUse, difficulty);
    }
    // Ensure firstQuestion is properly created
    if (!firstQuestion || !firstQuestion.question) {
      console.error('Failed to create first question:', firstQuestion);
      // Create a fallback addition question
      firstQuestion = {
        question: '1 + 1',
        correctAnswer: 2,
        answers: [1, 2, 3, 4],
        multiplier: 1,
        difficulty: difficulty
      };
    }
    
    // Ensure firstQuestion is properly created
    if (!firstQuestion || !firstQuestion.question) {
      console.error('Failed to create first question:', firstQuestion);
      // Create a fallback addition question
      firstQuestion = {
        question: '1 + 1',
        correctAnswer: 2,
        answers: [1, 2, 3, 4],
        multiplier: 1,
        difficulty: difficulty
      };
    }
    
    // Set the question immediately to prevent undefined errors
    setCurrentQuestion(firstQuestion);
    setQuestionStartTime(Date.now()); // Set start time immediately

    startQuestionTimer(firstQuestion);

    // Force immediate state update to prevent race conditions
    setTimeout(() => {
      if (!currentQuestion) {
        console.log('Forcing currentQuestion update');
        setCurrentQuestion(firstQuestion);
      }
    }, 0);
    
    // Set target question count based on difficulty
    let targetQuestions;
    if (selectedTable === 3) {
      if (difficulty === 'brown') {
        targetQuestions = 20;
      } else {
        targetQuestions = 10;
      }
    } else {
      if (difficulty === 'white') {
        targetQuestions = 10;
      } else if (difficulty === 'yellow') {
        targetQuestions = 10;
      } else if (difficulty === 'green') {
        targetQuestions = 10;
      } else if (difficulty === 'blue') {
        targetQuestions = 10;
      } else if (difficulty === 'red') {
        targetQuestions = 10;
      } else if (difficulty === 'brown') {
        targetQuestions = 20;
      } else {
        targetQuestions = 20; // fallback
      }
    }
    // Store the target question count in a ref
    targetQuestionsRef.current = targetQuestions;
    console.log('BROWN BELT DEBUG: Setting targetQuestions to:', targetQuestions, 'for difficulty:', difficulty);
    // Start counting up from 0
    setElapsedTime(0);
    setQuizStartTime(Date.now());
    setPausedTime(0);
    setIsTimerPaused(false);
    
    setShowHint(false);
    setQuestionStartTime(Date.now());
    setShowLevelUp(false);
    setHintsUsed(0);
    setCorrectCount(0);
    setWrongCount(0);
    setQuestionTimes([]);
    setVisualAidHistory([]);
    setLastQuestion(''); // Reset last question state
    setRecentQuestions([]); // Reset recent questions
    setQuestionAlternator('medium'); // Reset alternator
    setQuestionsWithPractice(new Set()); // Reset practice tracking
    setQuizProgress(0); // Reset progress bar
    
    // Clear any saved quiz state and localStorage
    setSavedQuizState(null);
    localStorage.removeItem('math-saved-quiz-state');
    localStorage.removeItem('math-quiz-progress');
    
    // Force a complete reset of all quiz-related state
    setTimeout(() => {
      setTotalQuestions(0);
      setScore(0);
      setCorrectCount(0);
      setWrongCount(0);
    }, 0);
  };

  const playSound = (soundType) => {
    switch (soundType) {
      case 'correct':
        audioManager.playCorrectSound();
        break;
      case 'wrong':
        audioManager.playWrongSound();
        break;
      case 'complete':
        audioManager.playCompleteSound();
        break;
      case 'click':
        audioManager.playButtonClick();
        break;
    }
  };

  const startQuestionTimer = (question = null) => {
    const questionToUse = question || currentQuestion;
    console.log('startQuestionTimer called for question:', questionToUse?.question);
    
    // Clear any existing timeout first
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Ensure we have a valid question
    if (!questionToUse || !questionToUse.question) {
      console.log('No valid question, not starting timer');
      return;
    }
    
    setQuestionStartTime(Date.now());
    
    // Set new timeout and store the actual timeout ID in ref
    timeoutRef.current = setTimeout(() => {
      console.log('Timer expired for question:', questionToUse?.question);
      handleTimeout();
    }, 5000);
    
    setQuestionTimeoutId(timeoutRef.current);
    console.log('Timer started with ID:', timeoutRef.current);
  };

  const handleTimeout = () => {
    // Check if currentQuestion exists and has required properties
    if (!currentQuestion || !currentQuestion.question || currentQuestion.correctAnswer === undefined) {
      return;
    }
    
    // Clear the timeout ID
    timeoutRef.current = null;
    setQuestionTimeoutId(null);
    
    setWrongCount(prev => prev + 1);
    playSound('wrong');
    
    // Show the math fact popup (same as wrong answer)
    setWrongAnswerData({
      question: currentQuestion.question,
      correctAnswer: currentQuestion.correctAnswer,
      answers: currentQuestion.answers,
      attempts: 0
    });
    setShowWrongAnswerPopup(true);
  };

  // Update handleAnswer to remove the voice feedback after each question
  const handleAnswer = async (selectedAnswer, answerIdx) => {
    if (isAnimating || showResult) return;
    
   
    if (questionTimeoutId) {
      clearTimeout(questionTimeoutId);
      setQuestionTimeoutId(null);
    }
    
    // Check if currentQuestion exists
    if (!currentQuestion) {
      console.error('currentQuestion is undefined - quiz may not be properly initialized');
      setIsAnimating(false);
      return;
    }
    
    // Additional safety check for currentQuestion properties
    if (!currentQuestion.question || currentQuestion.correctAnswer === undefined) {
      console.error('currentQuestion is missing required properties:', currentQuestion);
      setIsAnimating(false);
      return;
    }
    
    // Extra safety check - ensure we're in a valid quiz state
    if (!selectedDifficulty || !selectedTable) {
      console.error('Quiz state is invalid - selectedDifficulty or selectedTable is missing');
      setIsAnimating(false);
      return;
    }
    
    // Additional check - ensure quiz is fully loaded
    if (currentPage !== 'quiz') {
      console.error('Quiz page is not active');
      setIsAnimating(false);
      return;
    }
    
    setIsAnimating(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    // Check if this question took more than 3 seconds (for ALL Belt levels)
      const timeTaken = (Date.now() - questionStartTime) / 1000;
      let symbol = '';
      if (isCorrect) {
        if (timeTaken < 1.5) {
          symbol = '⚡'; // Flash for fast correct answers (less than 2 seconds)
        } else if (timeTaken < 2) {
          symbol = '⭐'; // Flash for fast correct answers (less than 2 seconds)
        } else {
          symbol = '✓'; // Green check for slow correct answers
        }
      } else {
        symbol = '✗'; // Red X for wrong answers
      }
      // Add symbol to the array
      setAnswerSymbols(prev => [...prev, { symbol, timeTaken, isCorrect }]);
      
      if (timeTaken > 5) {
        console.log(`${selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Belt: Question took`, timeTaken, 'seconds - marking as slow');
        setSlowQuestions(prev => {
          const newSet = new Set([...prev, currentQuestion?.question || 'unknown']);
          console.log(`${selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Belt: Updated slowQuestions:`, Array.from(newSet));
          return newSet;
        });
      }
    
    // Resume session timer only if it was paused AND the answer is correct
    if (sessionTimerPaused && isCorrect) {
      // Calculate the time that was accumulated before pause
      const timeBeforePause = Math.floor((sessionTimerPauseStart - sessionTimerStart) / 1000);
      // Subtract 10 seconds and adjust the start time accordingly
      const adjustedTime = Math.max(0, timeBeforePause - 10);
      const newStartTime = Date.now() - (adjustedTime * 1000);
      
      setSessionTimerStart(newStartTime);
      setSessionTimerPaused(false);
      setSessionTimerPauseStart(null);
    }
    setQuestionTimes(times => [...times, timeTaken]);
    
    // Track time spent on current question for adaptive difficulty
    if (currentQuestion && currentQuestion.question) {
      setQuestionTimeTracker(prev => {
        const questionText = currentQuestion.question;
        const existingTimes = prev[questionText] || [];
        const newTimes = [...existingTimes, timeTaken];
        const avgTime = newTimes.reduce((sum, time) => sum + time, 0) / newTimes.length;
        return {
          ...prev,
          [questionText]: newTimes,
          [`${questionText}_avg`]: avgTime
        };
      });
    }
    

    
    // Track wrong questions for repetition
    if (!isCorrect && currentQuestion && currentQuestion.question) {
      // Play wrong answer sound immediately
      playSound('wrong');
      
      setWrongQuestions(prev => new Set([...prev, currentQuestion.question]));
      
      // Mark this question as having been shown the practice popup
      setQuestionsWithPractice(prev => new Set([...prev, currentQuestion.question]));
      
      // Show wrong answer popup
      setWrongAnswerData({
        question: currentQuestion.question,
        correctAnswer: currentQuestion.correctAnswer,
        answers: currentQuestion.answers,
        attempts: 0
      });
      setShowWrongAnswerPopup(true);
      
      // Continue to next question for all belts - wrong answers count towards total
    }
    
    if (isCorrect) {
      // Clear the timeout since user answered correctly
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        setQuestionTimeoutId(null);
      }
      // Only increment correct counter for correct answers
      setScore(score + 1);
      setCorrectCount(c => {
        const newCount = c + 1;
        // Store the new correct count for the completion check
        setCorrectCountForCompletion(newCount);
        return newCount;
      });
        
      // Update progress bar for correct answers
      const maxQuestions = selectedDifficulty === 'white' ? 10 : 
                         selectedDifficulty === 'yellow' ? 10 : 
                         selectedDifficulty === 'green' ? 10 : 
                         selectedDifficulty === 'blue' ? 10 : 
                         selectedDifficulty === 'red' ? 10 : 
                         selectedDifficulty === 'brown' ? 10 : 10;
      setQuizProgress(prev => Math.min(prev + (100 / maxQuestions), 100));
      
      // Update daily correct count in localStorage
      const today = new Date().toLocaleDateString();
      const dailyCorrect = parseInt(localStorage.getItem(`math-daily-correct-${today}`) || '0');
      localStorage.setItem(`math-daily-correct-${today}`, (dailyCorrect + 1).toString());
      
      playSound('correct');
    } else {
      setWrongCount(w => w + 1);
      // Wrong answer sound is already played above when popup is shown
    }
    
    // Increment question counter when answer is given
    const newTotalQuestions = totalQuestions + 1;
    setTotalQuestions(newTotalQuestions);
    // Check if we've reached the target number of questions
    console.log('BLUE BELT DEBUG: totalQuestions:', newTotalQuestions, 'targetQuestionsRef.current:', targetQuestionsRef.current, 'selectedDifficulty:', selectedDifficulty);
    // CORRECT LOGIC: End quiz after exactly the target number of questions
    const targetQuestionCount = selectedDifficulty === 'brown' ? 10 : (selectedDifficulty && selectedDifficulty.startsWith('black')) ? 20 : 10;
    if (newTotalQuestions >= targetQuestionCount) {
      console.log(`${selectedDifficulty.toUpperCase()} BELT: CORRECT LOGIC - Ending at exactly ${targetQuestionCount} questions`);
      console.log('QUIZ END: Total questions asked:', newTotalQuestions);
      console.log('QUIZ END: Correct answers:', correctCountForCompletion + (isCorrect ? 1 : 0));
      
      // If the last answer was wrong, don't show completion screen yet
      // Wait for the practice question to be completed
      if (!isCorrect) {
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
          setQuestionTimeoutId(null);
        }
        console.log('Last question was wrong - waiting for practice completion');
        return; // Don't show completion screen yet
      }
      
      console.log('QUIZ END: Stopping immediately - no more questions');
      
      // Check for 100% accuracy and strict time constraints for unlocking next difficulty
      const finalCorrectCount = correctCountForCompletion + (isCorrect ? 1 : 0);
      const allCorrect = finalCorrectCount === targetQuestionCount;
      const withinTimeLimit = elapsedTime <= 30; // Must complete within 30 seconds
      const avgTimePerQuestion = elapsedTime / targetQuestionCount;
      const fastPerQuestion = avgTimePerQuestion < 5; // Less than 5 seconds per question
      
      // Check if any individual questions took more than 3 seconds
      const hasSlowQuestions = slowQuestions.size > 0;
      const hasSlowQuestionsInArray = questionTimes.some(time => time > 5);
      
      const canUnlockNext = allCorrect && withinTimeLimit && fastPerQuestion && !hasSlowQuestions && !hasSlowQuestionsInArray;
      
      // Update progress for unlocking next difficulty
      if (canUnlockNext && selectedTable && selectedDifficulty) {
        const progressKey = `math-table-progress-${selectedTable}-${selectedDifficulty}`;
        localStorage.setItem(progressKey, 'completed');
        
        // Update tableProgress state with accuracy and time information
        const accuracy = Math.round((correctCountForCompletion / targetQuestionCount) * 100);
        
        setTableProgress(prev => ({
          ...prev,
          [selectedTable]: {
            ...prev[selectedTable],
            [selectedDifficulty]: {
              accuracy: accuracy,
              completed: true,
              timeElapsed: elapsedTime,
              avgTimePerQuestion: elapsedTime / targetQuestionCount,
              perfectPerformance: true
            }
          }
        }));
        
        // Unlock next belt if current is completed with perfect conditions
        if (canUnlockNext && selectedTable && selectedDifficulty) {
          const difficultyOrder = ['white', 'yellow', 'green', 'blue', 'red', 'brown'];
          const currentIndex = difficultyOrder.indexOf(selectedDifficulty);
          const hasNextDifficulty = currentIndex < difficultyOrder.length - 1;
          
          if (hasNextDifficulty) {
            const nextDifficulty = difficultyOrder[currentIndex + 1];
            const nextKey = `math-table-progress-${selectedTable}-${nextDifficulty}`;
            localStorage.setItem(nextKey, 'unlocked');
          }
          
          // Save current belt progress to localStorage
          const currentKey = `math-table-progress-${selectedTable}-${selectedDifficulty}`;
          localStorage.setItem(currentKey, JSON.stringify({
            accuracy: 100,
            completed: true,
            perfectPerformance: true
          }));
          
          // Force update the tableProgress state to ensure DifficultyPicker sees the change
          setTableProgress(prev => {
            const newProgress = {
              ...prev,
              [selectedTable]: {
                ...prev[selectedTable],
                [selectedDifficulty]: {
                  ...prev[selectedTable]?.[selectedDifficulty],
                  perfectPerformance: true
                }
              }
            };
            console.log(`${selectedDifficulty.toUpperCase()} BELT: Setting perfectPerformance to true`);
            console.log(`${selectedDifficulty.toUpperCase()} BELT: New tableProgress:`, newProgress);
            return newProgress;
          });
        }
      }
      
      setShowResult(true);
      playSound('complete');
      setIsAnimating(false); // Stop any animations
      return; // Exit immediately - no more questions
    }
    
    if (totalQuestions >= targetQuestionsRef.current) {
      setShowResult(true);
      playSound('complete');
      
      // Check for 100% accuracy and strict time constraints for unlocking next difficulty
      // For the final question, use the updated count that includes the current answer
      const finalCorrectCount = correctCountForCompletion + (isCorrect ? 1 : 0);
      const allCorrect = finalCorrectCount === targetQuestionsRef.current;
      const withinTimeLimit = elapsedTime <= 30; // Must complete within 30 seconds
      const avgTimePerQuestion = elapsedTime / targetQuestionsRef.current;
      const fastPerQuestion = avgTimePerQuestion < 5; // Less than 3 seconds per question
      
      // Check if any individual questions took more than 3 seconds
      const hasSlowQuestions = slowQuestions.size > 0;
      
      // Also check the questionTimes array as a backup
      const hasSlowQuestionsInArray = questionTimes.some(time => time > 5);
      
      const canUnlockNext = allCorrect && withinTimeLimit && fastPerQuestion && !hasSlowQuestions && !hasSlowQuestionsInArray;
      

      
      // If time limit exceeded, user cannot pass regardless of accuracy
      const timeExceeded = elapsedTime > 30;
      

      
      // Update progress for unlocking next difficulty
      if (canUnlockNext && selectedTable && selectedDifficulty) {
        const progressKey = `math-table-progress-${selectedTable}-${selectedDifficulty}`;
        localStorage.setItem(progressKey, 'completed');
        
        // Update tableProgress state with accuracy and time information
        const accuracy = Math.round((correctCountForCompletion / targetQuestionsRef.current) * 100);
        
        setTableProgress(prev => ({
          ...prev,
          [selectedTable]: {
            ...prev[selectedTable],
            [selectedDifficulty]: {
              accuracy: accuracy,
              completed: true,
              timeElapsed: elapsedTime,
              avgTimePerQuestion: elapsedTime / targetQuestionsRef.current,
              perfectPerformance: true
            }
          }
        }));
        
        // Unlock next belt if current is completed with perfect conditions
        if (selectedDifficulty === 'white') {
          const yellowKey = `math-table-progress-${selectedTable}-yellow`;
          localStorage.setItem(yellowKey, 'unlocked');
          
          // Also save White Belt progress to localStorage
          const whiteKey = `math-table-progress-${selectedTable}-white`;
          localStorage.setItem(whiteKey, JSON.stringify({
            accuracy: 100,
            completed: true,
            perfectPerformance: true
          }));
          
          // Force update the tableProgress state to ensure DifficultyPicker sees the change
          setTableProgress(prev => {
            const newProgress = {
              ...prev,
              [selectedTable]: {
                ...prev[selectedTable],
                white: {
                  ...prev[selectedTable]?.white,
                  perfectPerformance: true
                }
              }
            };
            console.log('WHITE BELT: Setting perfectPerformance to true');
            console.log('WHITE BELT: New tableProgress:', newProgress);
            return newProgress;
          });
        } else if (selectedDifficulty === 'yellow') {
          const greenKey = `math-table-progress-${selectedTable}-green`;
          localStorage.setItem(greenKey, 'unlocked');
          
          // Also save Yellow Belt progress to localStorage
          const yellowKey = `math-table-progress-${selectedTable}-yellow`;
          localStorage.setItem(yellowKey, JSON.stringify({
            accuracy: 100,
            completed: true,
            perfectPerformance: true
          }));
          
          // Force update the tableProgress state to ensure DifficultyPicker sees the change
          setTableProgress(prev => {
            const newProgress = {
              ...prev,
              [selectedTable]: {
                ...prev[selectedTable],
                yellow: {
                  ...prev[selectedTable]?.yellow,
                  perfectPerformance: true
                }
              }
            };
            console.log('YELLOW BELT: Setting perfectPerformance to true');
            console.log('YELLOW BELT: New tableProgress:', newProgress);
            return newProgress;
          });
        } else if (selectedDifficulty === 'green') {
          const blueKey = `math-table-progress-${selectedTable}-blue`;
          localStorage.setItem(blueKey, 'unlocked');
          
          // Also save Green Belt progress to localStorage
          const greenKey = `math-table-progress-${selectedTable}-green`;
          localStorage.setItem(greenKey, JSON.stringify({
            accuracy: 100,
            completed: true,
            perfectPerformance: true
          }));
          
          // Force update the tableProgress state to ensure DifficultyPicker sees the change
          setTableProgress(prev => {
            const newProgress = {
              ...prev,
              [selectedTable]: {
                ...prev[selectedTable],
                green: {
                  ...prev[selectedTable]?.green,
                  perfectPerformance: true
                }
              }
            };
            console.log('GREEN BELT: Setting perfectPerformance to true');
            console.log('GREEN BELT: New tableProgress:', newProgress);
            return newProgress;
          });
        } else if (selectedDifficulty === 'blue') {
          const redKey = `math-table-progress-${selectedTable}-red`;
          localStorage.setItem(redKey, 'unlocked');
          
          // Force update the tableProgress state to ensure DifficultyPicker sees the change
          setTableProgress(prev => ({
            ...prev,
            [selectedTable]: {
              ...prev[selectedTable],
              blue: {
                ...prev[selectedTable]?.blue,
                perfectPerformance: true
              }
            }
          }));
        } else if (selectedDifficulty === 'red') {
          const brownKey = `math-table-progress-${selectedTable}-brown`;
          localStorage.setItem(brownKey, 'unlocked');
          
          // Force update the tableProgress state to ensure DifficultyPicker sees the change
          setTableProgress(prev => ({
            ...prev,
            [selectedTable]: {
              ...prev[selectedTable],
              red: {
                ...prev[selectedTable]?.red,
                perfectPerformance: true
              }
            }
          }));
        } else if (selectedDifficulty === 'brown') {
          // Save brown belt progress to localStorage
          const brownKey = `math-table-progress-${selectedTable}-brown`;
          localStorage.setItem(brownKey, JSON.stringify({
            accuracy: 100,
            completed: true,
            perfectPerformance: true
          }));
          
          // Force update the tableProgress state to ensure DifficultyPicker sees the change
          setTableProgress(prev => ({
            ...prev,
            [selectedTable]: {
              ...prev[selectedTable],
              brown: {
                ...prev[selectedTable]?.brown,
                perfectPerformance: true
              }
            }
          }));
           // Unlock black belt when brown belt is completed
           console.log('BROWN BELT PERFECT PERFORMANCE: Unlocking black belt');
           console.log('BROWN BELT PERFECT: selectedDifficulty =', selectedDifficulty);
           console.log('BROWN BELT PERFECT: correctCount =', correctCount);
           console.log('BROWN BELT PERFECT: correctCountForCompletion =', correctCountForCompletion);
           console.log('BROWN BELT PERFECT: showResult =', showResult);
           setIsBlackUnlocked(true);
           setBrownCleared(true);
           
           // The countdown logic will handle showing the black belt degrees screen
           console.log('BROWN BELT PERFECT: Countdown will handle transition to black belt degrees');
          
        }
      } else if (selectedTable && selectedDifficulty) {
        // Update progress based on whether time limit was exceeded or slow questions detected
        const progressKey = `math-table-progress-${selectedTable}-${selectedDifficulty}`;
        
        if (timeExceeded) {
          // If time exceeded, mark as failed (not completed)
          localStorage.setItem(progressKey, 'failed');
          
          // Update tableProgress state with failure information
          const accuracy = Math.round((correctCountForCompletion / targetQuestionsRef.current) * 100);
          setTableProgress(prev => ({
            ...prev,
            [selectedTable]: {
              ...prev[selectedTable],
              [selectedDifficulty]: {
                accuracy: accuracy,
                completed: false, // Mark as not completed due to time limit
                timeElapsed: elapsedTime,
                avgTimePerQuestion: elapsedTime / targetQuestionsRef.current,
                perfectPerformance: false,
                timeExceeded: true
              }
            }
          }));
        } else if (hasSlowQuestions || hasSlowQuestionsInArray) {
          // If slow questions detected, mark as failed (not completed)
          localStorage.setItem(progressKey, 'failed');
          
          // Update tableProgress state with failure information
          const accuracy = Math.round((correctCountForCompletion / targetQuestionsRef.current) * 100);
          setTableProgress(prev => ({
            ...prev,
            [selectedTable]: {
              ...prev[selectedTable],
              [selectedDifficulty]: {
                accuracy: accuracy,
                completed: false, // Mark as not completed due to slow questions
                timeElapsed: elapsedTime,
                avgTimePerQuestion: elapsedTime / targetQuestionsRef.current,
                perfectPerformance: false,
                slowQuestionsDetected: true
              }
            }
          }));
        } else {
          // Time limit not exceeded and no slow questions, but other conditions not met
          localStorage.setItem(progressKey, 'completed');
          
          // Update tableProgress state with accuracy and time information
          const accuracy = Math.round((correctCountForCompletion / targetQuestionsRef.current) * 100);
          setTableProgress(prev => ({
            ...prev,
            [selectedTable]: {
              ...prev[selectedTable],
              [selectedDifficulty]: {
                accuracy: accuracy,
                completed: true,
                timeElapsed: elapsedTime,
                avgTimePerQuestion: elapsedTime / targetQuestionsRef.current,
                perfectPerformance: false
              }
            }
          }));
          if (selectedDifficulty === 'brown') {
            console.log('BROWN BELT REGULAR COMPLETION: Unlocking black belt');
            console.log('BROWN BELT REGULAR: selectedDifficulty =', selectedDifficulty);
            console.log('BROWN BELT REGULAR: correctCount =', correctCount);
            console.log('BROWN BELT REGULAR: correctCountForCompletion =', correctCountForCompletion);
            console.log('BROWN BELT REGULAR: showResult =', showResult);
            setIsBlackUnlocked(true);
            setBrownCleared(true);
            // The countdown logic will handle showing the black belt degrees screen
            console.log('BROWN BELT REGULAR: Countdown will handle transition to black belt degrees');
          }
        }
      }
      
      
      // Accumulate the session timer time when quiz is completed
      if (sessionTimerActive && sessionTimerStart) {
        const currentElapsed = Math.floor((Date.now() - sessionTimerStart) / 1000);
        setSessionTimerAccumulated(prev => prev + currentElapsed);
      }
      // Reset the session timer for the next quiz
      setSessionTimerActive(false);
      setSessionTimerStart(null);
      setSessionTimerPaused(false);
      setSessionTimerPauseStart(null);
      } else {
    // setTimeout(() => {
      setAnswerFeedback(null);
      setIsAnimating(false);
      setShowHint(false);
      setQuestionStartTime(Date.now());
      
      // White Belt specific logic for next question
      if (selectedDifficulty === 'white') {
        // Use the new generateBeltQuestion function for White Belt
        const newQuestion = generateBeltQuestion('white', totalQuestions, askedQuestions, lastQuestion, selectedTable);
        setCurrentQuestion(newQuestion);
        startQuestionTimer(); // Start timing this question
        setLastQuestion(newQuestion.question);
        setRecentQuestions(prev => {
          const newRecent = [...prev, newQuestion.question];
          return newRecent.slice(-3);
        });
      } else if (selectedDifficulty === 'yellow') {
        // Use the new generateBeltQuestion function for Yellow Belt
        const newQuestion = generateBeltQuestion('yellow', totalQuestions, askedQuestions, lastQuestion, selectedTable);
        setCurrentQuestion(newQuestion);
        startQuestionTimer(); // Start timing this question
        setLastQuestion(newQuestion.question);
        setRecentQuestions(prev => {
          const newRecent = [...prev, newQuestion.question];
          return newRecent.slice(-3);
        });
      } else if (selectedDifficulty === 'green') {
        // Use the new generateBeltQuestion function for Green Belt
        const newQuestion = generateBeltQuestion('green', totalQuestions, askedQuestions, lastQuestion, selectedTable);
        setCurrentQuestion(newQuestion);
        startQuestionTimer(); // Start timing this question
        setLastQuestion(newQuestion.question);
        setRecentQuestions(prev => {
          const newRecent = [...prev, newQuestion.question];
          return newRecent.slice(-3);
        });
      } else if (selectedDifficulty === 'blue') {
        // Use the new generateBeltQuestion function for Blue Belt
        const newQuestion = generateBeltQuestion('blue', totalQuestions, askedQuestions, lastQuestion, selectedTable);
        setCurrentQuestion(newQuestion);
        startQuestionTimer(); // Start timing this question
        setLastQuestion(newQuestion.question);
        setRecentQuestions(prev => {
          const newRecent = [...prev, newQuestion.question];
          return newRecent.slice(-3);
        });
      } else if (selectedDifficulty === 'red') {
        // Use the new generateBeltQuestion function for Red Belt
        const newQuestion = generateBeltQuestion('red', totalQuestions, askedQuestions, lastQuestion, selectedTable);
        setCurrentQuestion(newQuestion);
        startQuestionTimer(); // Start timing this question
        setLastQuestion(newQuestion.question);
        setRecentQuestions(prev => {
          const newRecent = [...prev, newQuestion.question];
          return newRecent.slice(-3);
        });
      } else if (selectedDifficulty === 'brown') {
        // Brown Belt: Use the improved generateBeltQuestion function
        const newQuestion = generateBeltQuestion('brown', totalQuestions, askedQuestions, lastQuestion, selectedTable);
        setCurrentQuestion(newQuestion);
        startQuestionTimer(); // Start timing this question
        setLastQuestion(newQuestion.question);
        setRecentQuestions(prev => {
          const newRecent = [...prev, newQuestion.question];
          return newRecent.slice(-3);
        });
      } else {
        // For other difficulties, use the generateBeltQuestion function as fallback
        const newQuestion = generateBeltQuestion(selectedDifficulty, totalQuestions, askedQuestions, lastQuestion, selectedTable);
        setCurrentQuestion(newQuestion);
        startQuestionTimer(); // Start timing this question
        setLastQuestion(newQuestion.question);
        setRecentQuestions(prev => {
          const newRecent = [...prev, newQuestion.question];
          return newRecent.slice(-3);
        });
      }
    }
    
    // FINAL SAFETY CHECK: If we somehow got here after the target questions, end the quiz
    const finalTargetQuestionCount = selectedDifficulty === 'brown' ? 10 : 10;
    if (totalQuestions >= finalTargetQuestionCount) {
      console.log('FINAL SAFETY CHECK: Quiz should have ended but continued. Forcing end now.');
      console.log('FINAL SAFETY CHECK: Questions asked:', totalQuestions, 'Target:', finalTargetQuestionCount);
      setShowResult(true);
      playSound('complete');
      setIsAnimating(false);
      return;
    }
  };

  // When resetting or leaving quiz, clear quizEndTime
  const resetQuiz = () => {
    playSound('click');
    setCurrentPage('picker');
    setSelectedTable(null);
    setCurrentQuestion(null);
    setScore(0);
    setTotalQuestions(0);
    setShowResult(false);
    setAnswerFeedback(null);
    setIsAnimating(false);
    setElapsedTime(0);
    setQuizStartTime(null);
    setPausedTime(0);
    setIsTimerPaused(false);
    setSavedQuizState(null);
    setQuestionStartTime(Date.now());
    setShowLevelUp(false);
    setHintsUsed(0);
    
    // Stop the session timer when quitting quiz
    setSessionTimerActive(false);
    setSessionTimerStart(null);
    setSessionTimerPaused(false);
    setSessionTimerPauseStart(null);
    
    // Reset tracking variables for adaptive difficulty
    setQuestionTimeTracker({});
    setAskedQuestions(new Set());
    setWrongQuestions(new Set());
    setSlowQuestions(new Set());
    setCorrectCountForCompletion(0);
    setShowWrongAnswerPopup(false);
    setWrongAnswerData(null);
    setWhiteBeltRandomNumber(null);
    setCorrectAnswerSelected(false);
    setShowCorrectText(false);
    setLastWhiteBeltNumber(null);
    // Reset popup states
    setShowSecondPopup(false);
    setShowWrongAnswerPopup(false);
    setWrongAnswerData(null);
    // Reset question tracking
    setLastQuestion('');
    setRecentQuestions([]);
    setQuestionAlternator('medium');
    setQuizProgress(0);
    setQuestionsWithPractice(new Set());
    // CRITICAL FIX: Reset white belt sequence when quitting quiz
    if (window.whiteBeltFullSequence) {
      delete window.whiteBeltFullSequence;
      delete window.whiteBeltQuestionCounter;
      delete window.whiteBeltCoreQuestionsAsked;
    }
    // CRITICAL FIX: Reset yellow belt sequence when quitting quiz
    if (window.yellowBeltFullSequence) {
      delete window.yellowBeltFullSequence;
      delete window.yellowBeltQuestionCounter;
      delete window.yellowBeltZeroPlusOneAsked;
      delete window.yellowBeltOnePlusZeroAsked;
    }
    
    // CRITICAL FIX: Reset green belt sequence when quitting quiz
    if (window.greenBeltFullSequence) {
      delete window.greenBeltFullSequence;
      delete window.greenBeltQuestionCounter;
      delete window.greenBeltTwoPlusZeroAsked;
      delete window.greenBeltZeroPlusTwoAsked;
    }
    
    // CRITICAL FIX: Reset blue belt sequence when quitting quiz
    if (window.blueBeltFullSequence) {
      delete window.blueBeltFullSequence;
      delete window.blueBeltQuestionCounter;
      delete window.blueBeltZeroPlusThreeAsked;
      delete window.blueBeltThreePlusZeroAsked;
    }
    
    // CRITICAL FIX: Reset red belt sequence when quitting quiz
    if (window.redBeltFullSequence) {
      delete window.redBeltFullSequence;
      delete window.redBeltQuestionCounter;
      delete window.redBeltZeroPlusFourAsked;
      delete window.redBeltFourPlusZeroAsked;
    }
    
    // CRITICAL FIX: Reset brown belt sequence when quitting quiz
    if (window.brownBeltFullSequence) {
      delete window.brownBeltFullSequence;
      delete window.brownBeltQuestionCounter;
      delete window.brownBeltZeroPlusFiveAsked;
      delete window.brownBeltFivePlusZeroAsked;
    }
  };

  // Wall-clock timer effect - counting up from 0
  useEffect(() => {
    if (currentPage !== 'quiz' || showResult || !quizStartTime || isTimerPaused) return;
    let frame;
    function update() {
      const now = Date.now();
      const elapsed = Math.round((now - quizStartTime) / 1000) + pausedTime;
      setElapsedTime(elapsed);
      
      // Stop timer at 999 and show try again popup
      if (elapsed >= 999) {
        setShowResult(true);
        playSound('complete');
        setElapsedTime(999); // Ensure it stays at 999
        return;
      }
      
      frame = requestAnimationFrame(update);
    }
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [currentPage, showResult, quizStartTime, isTimerPaused, pausedTime]);

  // For level up and badge unlock, play celebratory sound:
  useEffect(() => {
    if (showLevelUp) {
      // Removed streak sound - keeping only correct sound for answers
    }
  }, [showLevelUp]);


  // Generate or load daily challenge on mount:
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    let challengeData = JSON.parse(localStorage.getItem('math-daily-challenge') || '{}');
    if (challengeData.date !== today) {
      // Generate new challenge
      const table = Math.floor(Math.random() * 12) + 1;
      const minScore = 7 + Math.floor(Math.random() * 3); // 7, 8, or 9
      challengeData = {
        date: today,
        table,
        minScore,
        completed: false,
      };
      localStorage.setItem('math-daily-challenge', JSON.stringify(challengeData));
    }
  }, []);

  // Load daily correct count from localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    const dailyCorrect = parseInt(localStorage.getItem(`math-daily-correct-${today}`) || '0');
    setCorrectCount(dailyCorrect);
  }, []);
  // On mount, load table progress:
  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem('math-table-progress') || '{}');
    setTableProgress(progress);
  }, []);

  // After quiz end, update table progress for the specific difficulty:
  useEffect(() => {
    if (showResult && selectedTable && selectedDifficulty) {
      const progress = JSON.parse(localStorage.getItem('math-table-progress') || '{}');
      if (!progress[selectedTable]) progress[selectedTable] = {};
      
      // Calculate accuracy percentage
      const accuracy = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
      
      // Always save the accuracy for this difficulty level
      if (!progress[selectedTable][selectedDifficulty]) {
        progress[selectedTable][selectedDifficulty] = {};
      }
      
      // Update the accuracy for this difficulty level
      progress[selectedTable][selectedDifficulty].accuracy = accuracy;
      
      localStorage.setItem('math-table-progress', JSON.stringify(progress));
    }
    // eslint-disable-next-line
  }, [showResult]);

  // Name form submit handler:
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (childName.trim()) {
      localStorage.setItem('math-child-name', childName.trim());
      setScreen('theme');
      setShowThemePicker(true);
    }
  };

  // Name entry form component:
  const NameForm = () => {
    //const [showAgeWarning, setShowAgeWarning] = useState(false);
    const nameInputRef = useRef(null);
    const [pin, setPin] = useState("");
    const [showPinWarning, setShowPinWarning] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!pin) {
        setShowPinWarning(true);
        return;
      }
      /*if (!childAge) {
        setShowAgeWarning(true);
        return;
      }*/
      setShowPinWarning(false);
      //setShowAgeWarning(false);
      //localStorage.setItem('math-child-age', childAge);
      // Optionally store pin if needed: localStorage.setItem('math-pin', pin);
      setShowPreTestPopup(true);

      // Associate PINs with names
      let associatedName = '';
      if (pin === '1') associatedName = 'Richie';
      else if (pin === '2') associatedName = 'CJ';
      if (associatedName) {
        localStorage.setItem('math-child-name', associatedName);
        setChildName(associatedName);
      }
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative landscape-optimized portrait-optimized ios-notch" style={{
        backgroundImage: "url('/night_sky_landscape.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        paddingTop: 'max(env(safe-area-inset-top), 1rem)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)',
      }}>
        <div className="bg-white/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg max-w-sm sm:max-w-md w-full flex flex-col items-center relative z-10 mx-2 sm:mx-4">
                          <h1 className="text-xl sm:text-2xl md:text-3xl font-baloo text-white mb-3 sm:mb-4 drop-shadow-lg">Let's Get Started!</h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            {/* PIN Field */}
            <label className="text-lg sm:text-xl md:text-2xl font-comic text-white font-bold mb-1 sm:mb-2">PIN</label>
            <input
              type="password"
              value={pin || ''}
              onChange={e => setPin(e.target.value)}
              className="mb-3 sm:mb-4 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-sm sm:text-base border-2 border-white border-opacity-60 focus:outline-none focus:ring-2 focus:ring-white w-28 sm:w-32 text-center bg-gray-700 bg-opacity-80 text-white font-bold transition-all duration-200"
              required
              maxLength={8}
              id="pin-input"
              autoComplete="off"
            />
            {/*<label className="text-lg sm:text-xl md:text-2xl font-comic text-black font-bold mb-1 sm:mb-2">Grade</label>
            <select
              value={childAge}
              onChange={e => setChildAge(e.target.value)}
              className="mb-3 sm:mb-4 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-sm sm:text-base border-2 border-white border-opacity-60 focus:outline-none focus:ring-2 focus:ring-white w-28 sm:w-32 text-center bg-gray-700 bg-opacity-80 text-white font-bold transition-all duration-200"
              required
            >
              <option value="" disabled>Select grade</option>
              {[...Array(10)].map((_, i) => (
                <option key={i+1} value={i+1}>Grade {i+1}</option>
              ))}
            </select>
            {showAgeWarning && !childAge && (
              <div className="text-red-500 text-sm mb-2">Please select your age to continue.</div>
            )}*/}
            {showPinWarning && !pin && (
              <div className="text-red-500 text-sm mb-2">Please enter your PIN to continue.</div>
            )}
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-900 text-white font-bold py-1.5 sm:py-2 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-sm sm:text-lg mt-2 transition-all duration-300 transform hover:scale-105 active:scale-95"
              disabled={!pin /*|| !childAge*/}
            >
              Start
            </button>
          </form>
        </div>
        {/* Pre-test Popup */}
        {showPreTestPopup && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 safe-area-top safe-area-bottom p-2 sm:p-4">
            <div className="bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm sm:max-w-md w-full mx-2 sm:mx-4 border border-blue-200/30 popup-zoom-in">
              {preTestSection === 'intro' ? (
                <>
                  <div className="text-center mb-6">
                    <div className="text-4xl sm:text-5xl mb-4">🧠</div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-2">Ready to take a Pre-test?</h2>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs sm:text-sm shadow-lg whitespace-nowrap"
                      onClick={() => {
                        setPreTestSection('sections');
                      }}
                    >
                      Yes, I'm Ready! 🚀
                    </button>
                    <button
                      className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-2 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs sm:text-sm shadow-lg whitespace-nowrap"
                      onClick={() => {
                        setShowPreTestPopup(false);
                        setPreTestSection('intro');
                        setAdditionSubSection(null); // Reset addition sub-section
                        setScreen('theme');
                        setShowThemePicker(true);
                      }}
                    >
                      Skip Test
                    </button>
              </div>
                </>
              ) : preTestSection === 'sections' ? (
                <>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-baloo font-bold text-center mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Choose a Section</h2>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                    <button
                      className={`${completedSections.addition ? 'bg-blue-400 cursor-default' : 'bg-blue-300 hover:bg-blue-400'} text-blue-900 font-bold py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform ${completedSections.addition ? '' : 'hover:scale-105 active:scale-95'} relative overflow-hidden ${completedSections.addition ? 'completed-section' : ''}`}
                      style={{ position: 'relative' }}
                      onClick={() => {
                        if (!completedSections.addition) {
                          setPreTestSection('addition');
                          setAdditionSubSection(null); // Reset sub-section
                        }
                      }}
                      inputMode="none"
                    >
                      <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">➕</div>
                      <div className="text-sm sm:text-base md:text-lg">Addition</div>
            </button>
                    <button
                      className={`${completedSections.subtraction ? 'bg-indigo-400 cursor-default' : 'bg-indigo-300 hover:bg-indigo-400'} text-indigo-900 font-bold py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform ${completedSections.subtraction ? '' : 'hover:scale-105 active:scale-95'} relative overflow-hidden ${completedSections.subtraction ? 'completed-section' : ''}`}
                      style={{ position: 'relative' }}
                      onClick={() => {
                        if (!completedSections.subtraction) {
                          setPreTestSection('subtraction');
                          setLastPreTestQuestion(''); // Reset last question
                          setPreTestQuestions(generateSubtractionQuestions());
                          setPreTestCurrentQuestion(0);
                          setPreTestScore(0);
                          setPreTestInputValue('');
                        }
                      }}
                    >
                      <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">➖</div>
                      <div className="text-sm sm:text-base md:text-lg">Subtraction</div>
            </button>
                    <button
                      className={`${completedSections.multiplication ? 'bg-cyan-400 cursor-default' : 'bg-cyan-300 hover:bg-cyan-400'} text-cyan-900 font-bold py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform ${completedSections.multiplication ? '' : 'hover:scale-105 active:scale-95'} relative overflow-hidden ${completedSections.multiplication ? 'completed-section' : ''}`}
                      style={{ position: 'relative' }}
                      onClick={() => {
                        if (!completedSections.multiplication) {
                          setPreTestSection('multiplication');
                          setLastPreTestQuestion(''); // Reset last question
                          setPreTestQuestions(generateMultiplicationQuestions());
                          setPreTestCurrentQuestion(0);
                          setPreTestScore(0);
                          setPreTestInputValue('');
                        }
                      }}
                    >
                      <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">✖️</div>
                      <div className="text-sm sm:text-base md:text-lg">Multiplication</div>
                    </button>
                    <button
                      className={`${completedSections.division ? 'bg-sky-400 cursor-default' : 'bg-sky-300 hover:bg-sky-400'} text-sky-900 font-bold py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform ${completedSections.division ? '' : 'hover:scale-105 active:scale-95'} relative overflow-hidden ${completedSections.division ? 'completed-section' : ''}`}
                      style={{ position: 'relative' }}
                      onClick={() => {
                        if (!completedSections.division) {
                          setPreTestSection('division');
                          setLastPreTestQuestion(''); // Reset last question
                          setPreTestQuestions(generateDivisionQuestions());
                          setPreTestCurrentQuestion(0);
                          setPreTestScore(0);
                          setPreTestInputValue('');
                        }
                      }}
                    >
                      <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">➗</div>
                      <div className="text-sm sm:text-base md:text-lg">Division</div>
                    </button>
      </div>
                  <div className="flex justify-center gap-4">
                    {Object.values(completedSections).every(Boolean) ? (
                      <>
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs sm:text-sm whitespace-nowrap"
                          onClick={() => {
                            setShowPreTestPopup(false);
                            setPreTestSection('intro');
                            setAdditionSubSection(null); // Reset addition sub-section
                            setScreen('theme');
                            setShowThemePicker(true);
                          }}
                        >
                          Continue to Game 🎮
                        </button>
                        <button
                          className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-2 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs sm:text-sm shadow-lg whitespace-nowrap"
                          onClick={() => {
                            setShowPreTestPopup(false);
                            setPreTestSection('intro');
                            setAdditionSubSection(null); // Reset addition sub-section
                            setScreen('theme');
                            setShowThemePicker(true);
                          }}
                        >
                          Skip Test
                        </button>
                        <button
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs sm:text-sm whitespace-nowrap"
                          onClick={() => {
                            // Reset all completed sections
                            setCompletedSections({
                              addition: false,
                              subtraction: false,
                              multiplication: false,
                              division: false
                            });
                            setPreTestSection('sections');
                          }}
                        >
                          Reset Tests 🔄
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs sm:text-sm whitespace-nowrap relative"
                          disabled={true}
                        >
                          <div className="absolute inset-0 bg-black/40 rounded-lg sm:rounded-xl"></div>
                          Continue to Game 🎮
                        </button>
                        <button
                          className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-2 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs sm:text-sm shadow-lg whitespace-nowrap"
                          onClick={() => {
                            setShowPreTestPopup(false);
                            setPreTestSection('intro');
                            setAdditionSubSection(null); // Reset addition sub-section
                            setScreen('theme');
                            setShowThemePicker(true);
                          }}
                        >
                          Skip Test
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : preTestSection === 'addition' && !additionSubSection ? (
                <>
                  {/* Auto-start addition pre-test - handled by useEffect */}
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-800 mb-4">
                      Loading Sums up to 5...
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-3 sm:mb-4 text-green-800">
                    {preTestSection === 'addition' && 'Sums up to 5'}
                    {preTestSection === 'subtraction' && 'Subtraction Pre-test'}
                    {preTestSection === 'multiplication' && 'Multiplication Pre-test'}
                    {preTestSection === 'division' && 'Division Pre-test'}
                  </h2>


                  {preTestQuestions && preTestCurrentQuestion < preTestQuestions.length ? (
                    <div className="text-center px-2 sm:px-4">
                      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-blue-600 mb-4 sm:mb-6">
                        {preTestQuestions[preTestCurrentQuestion]?.question}
                      </div>
                      
                        {/* Number Input Display */}
                        <div className="mb-4 sm:mb-6">
                          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 sm:border-4 border-green-400 shadow-lg inline-block">
                            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 min-w-[60px] sm:min-w-[80px] md:min-w-[100px] text-center">
                              {preTestInputValue || '_'}
                            </div>
                          </div>
                        </div>
                      
                      {/* Number Pad */}
                      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                        {/* First row: 0, 1, 2 */}
                        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
                          {[0, 1, 2].map((num) => (
                            <button
                              key={num}
                              className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg border-2 border-white/30 text-xl sm:text-2xl md:text-3xl flex items-center justify-center"
                              onClick={() => {
                                if (preTestInputValue.length < 3) { // Limit to 3 digits
                                  setPreTestInputValue(prev => prev + num.toString());
                                }
                              }}
                              inputMode="none"
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                        {/* Second row: 3, 4, 5 */}
                        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
                          {[3, 4, 5].map((num) => (
                            <button
                              key={num}
                              className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg border-2 border-white/30 text-xl sm:text-2xl md:text-3xl flex items-center justify-center"
                              onClick={() => {
                                if (preTestInputValue.length < 3) { // Limit to 3 digits
                                  setPreTestInputValue(prev => prev + num.toString());
                                }
                              }}
                              inputMode="none"
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Submit and Clear Buttons */}
                      <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center">
                        <button
                          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base"
                          onClick={() => {
                            if (preTestInputValue) {
                              const userAnswer = parseInt(preTestInputValue);
                              const correctAnswer = preTestQuestions[preTestCurrentQuestion]?.correctAnswer;
                              
                              const isCorrect = userAnswer === correctAnswer;
                              const newScore = isCorrect ? preTestScore + 1 : preTestScore;
                              
                              // Move to next question immediately
                              if (preTestCurrentQuestion + 1 < preTestQuestions.length) {
                                setPreTestScore(newScore);
                                setPreTestCurrentQuestion(preTestCurrentQuestion + 1);
                                setPreTestInputValue('');
                                setShowCorrectAnswer(false);
                              } else {
                                // Section completed - check accuracy requirements
                                const totalQuestions = preTestQuestions.length;
                                const finalScore = isCorrect ? preTestScore + 1 : preTestScore;
                                const accuracy = (finalScore / totalQuestions) * 100;
                                const timeTaken = preTestTimer;
                                
                                // Update the score first
                                setPreTestScore(finalScore);
                                
                                // Prepare results
                                const getSectionDisplayName = () => {
                                  if (preTestSection === 'addition') {
                                    return 'Addition - Sums up to 5';
                                  }
                                  return preTestSection;
                                };
                                
                                const results = {
                                  section: getSectionDisplayName(),
                                  score: finalScore,
                                  totalQuestions: totalQuestions,
                                  timeTaken: timeTaken,
                                  accuracy: accuracy,
                                  timeFormatted: `${Math.floor(timeTaken / 60)}:${(timeTaken % 60).toString().padStart(2, '0')}`
                                };
                                
                                // Show results modal
                                setPreTestResults(results);
                                setShowResultsModal(true);
                                
                                // Send results via email (only for addition pre-tests)
                                if (preTestSection === 'addition') {
                                  sendPreTestResults(results);
                                }
                                
                                // For addition: require 100% accuracy
                                // For other sections: mark as completed regardless of accuracy
                                if (preTestSection === 'addition') {
                                  if (accuracy === 100) {
                                    setCompletedSections(prev => ({
                                      ...prev,
                                      [preTestSection]: true
                                    }));
                                  }
                                } else {
                                  // For subtraction, multiplication, division - mark as completed
                                  setCompletedSections(prev => ({
                                    ...prev,
                                    [preTestSection]: true
                                  }));
                                }
                                
                                setPreTestTimerActive(false); // Stop timer
                              }
                            }
                          }}
                          inputMode="none"
                        >
                          Submit
                        </button>
                                                  <button
                            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base"
                            onClick={() => setPreTestInputValue('')}
                            inputMode="none"
                          >
                            Clear
                          </button>
                      </div>
                      

        </div>
                  ) : null}
                </>
              )}
      </div>
          </div>
        )}
        
        {/* Pre-test Results Modal */}
        {showResultsModal && preTestResults && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 safe-area-top safe-area-bottom p-2 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl max-w-sm sm:max-w-md w-full mx-2 sm:mx-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-4 sm:mb-6 text-green-800">Pre-test Results</h2>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="text-center">
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">{preTestResults.section}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  <div className="bg-blue-100 rounded-lg p-2 sm:p-3 md:p-4 text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800">{preTestResults.score}/{preTestResults.totalQuestions}</div>
                    <div className="text-xs sm:text-sm text-blue-600">Correct Answers</div>
                  </div>
                  
                  <div className="bg-green-100 rounded-lg p-2 sm:p-3 md:p-4 text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-800">{preTestResults.accuracy.toFixed(1)}%</div>
                    <div className="text-xs sm:text-sm text-green-600">Accuracy</div>
                  </div>
                </div>
                
                <div className="bg-yellow-100 rounded-lg p-2 sm:p-3 md:p-4 text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-800">⏱️ {preTestResults.timeFormatted}</div>
                  <div className="text-xs sm:text-sm text-yellow-600">Time Taken</div>
                </div>
                
                <div className="bg-purple-100 rounded-lg p-2 sm:p-3 md:p-4 text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-800">
                                          {preTestResults.score > 0 ? (preTestResults.timeTaken / preTestResults.score).toFixed(1) : '0.0'} Seconds
                  </div>
                                          <div className="text-xs sm:text-sm text-purple-600">Average Time per Correct Answer</div>
                </div>

              </div>
              
              <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 md:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base"
                  onClick={() => {
                    setShowResultsModal(false);
                    setPreTestResults(null);
                    
                    // For non-addition tests, return to section selection screen
                    if (preTestResults && (preTestResults.section === 'subtraction' || 
                        preTestResults.section === 'multiplication' || 
                        preTestResults.section === 'division')) {
                      setPreTestSection('sections');
                    } else {
                      // For addition tests, return to addition section
                      setPreTestSection('addition');
                      setAdditionSubSection(null);
                    }
                    
                    setPreTestCurrentQuestion(0);
                    setPreTestScore(0);
                    setPreTestInputValue('');
                    setShowCorrectAnswer(false);
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
  };
  // Component to display the highest number of stars achieved for each table
  const TableStarsDisplay = ({ tableNumber }) => {
    const progress = tableProgress[tableNumber] || {};
    
    // Use the same logic as DifficultyPicker to determine star display
    // Check both state and localStorage for belt completion
    const whiteCleared = progress.white?.perfectPerformance === true;
    
    const yellowCleared = progress.yellow?.perfectPerformance === true;
    const greenCleared = progress.green?.perfectPerformance === true;
    const blueCleared = progress.blue?.perfectPerformance === true;
    const redCleared = progress.red?.perfectPerformance === true;
    const brownCleared = progress.brown?.perfectPerformance === true;
    
    // Check if higher belts are unlocked (which would show filled stars for lower belts)
    const isBlueUnlocked = greenCleared;
    const blueUnlockedForStars = isBlueUnlocked || blueCleared;
    
    // Show stars based on actual completion status, not unlocking status
    const whiteStar = whiteCleared;
    const yellowStar = yellowCleared;
    const greenStar = greenCleared;
    const blueStar = blueCleared;
    const redStar = redCleared;
    const brownStar = brownCleared;
    
    // Count filled stars based on the same logic as DifficultyPicker
    let filledStars = 0;
    if (whiteStar) filledStars++;
    if (yellowStar) filledStars++;
    if (greenStar) filledStars++;
    if (blueStar) filledStars++;
    if (redStar) filledStars++;
    if (brownStar) filledStars++;
    
    // Debug logging
    console.log('TableStarsDisplay Debug for table', tableNumber);
    console.log('- whiteCleared:', whiteCleared);
    console.log('- yellowCleared:', yellowCleared);
    console.log('- greenCleared:', greenCleared);
    console.log('- blueCleared:', blueCleared);
    console.log('- redCleared:', redCleared);
    console.log('- brownCleared:', brownCleared);
    console.log('- isBlueUnlocked:', isBlueUnlocked);
    console.log('- blueUnlockedForStars:', blueUnlockedForStars);
    console.log('- whiteStar:', whiteStar);
    console.log('- yellowStar:', yellowStar);
    console.log('- greenStar:', greenStar);
    console.log('- blueStar:', blueStar);
    console.log('- redStar:', redStar);
    console.log('- brownStar:', brownStar);
    console.log('- filledStars:', filledStars);
    
    // If no progress at all, show 6 empty stars
    if (!whiteCleared && !yellowCleared && !greenCleared && !blueCleared && !redCleared && !brownCleared) {
      return (
        <div className="flex justify-center items-center">
          <span className="text-yellow-300 text-lg opacity-30">⭐</span>
          <span className="text-yellow-300 text-lg opacity-30">⭐</span>
          <span className="text-yellow-300 text-lg opacity-30">⭐</span>
          <span className="text-yellow-300 text-lg opacity-30">⭐</span>
          <span className="text-yellow-300 text-lg opacity-30">⭐</span>
          <span className="text-yellow-300 text-lg opacity-30">⭐</span>
        </div>
      );
    }
    
    // Show filled stars based on the same logic as DifficultyPicker
                return (
                  <div className="flex justify-center items-center">
        <span className={`text-yellow-300 text-lg ${filledStars >= 1 ? '' : 'opacity-30'}`}>⭐</span>
        <span className={`text-yellow-300 text-lg ${filledStars >= 2 ? '' : 'opacity-30'}`}>⭐</span>
        <span className={`text-yellow-300 text-lg ${filledStars >= 3 ? '' : 'opacity-30'}`}>⭐</span>
        <span className={`text-yellow-300 text-lg ${filledStars >= 4 ? '' : 'opacity-30'}`}>⭐</span>
        <span className={`text-yellow-300 text-lg ${filledStars >= 5 ? '' : 'opacity-30'}`}>⭐</span>
        <span className={`text-yellow-300 text-lg ${filledStars >= 6 ? '' : 'opacity-30'}`}>⭐</span>
      </div>
    );
  };
  // Add this after CircularProgress
  const CircularTimer = ({ timeLeft, totalTime }) => {
    const radius = 50;
    const size = radius * 2;
    // Calculate percentage of time remaining
    const percent = Math.max(0, (timeLeft / totalTime) * 100);
    
    // For the arc path, we need to draw a circle that starts full and decreases
    // The arc starts at the top (12 o'clock position) and moves clockwise
    
    // Calculate the end angle based on remaining time (in radians)
    // At 60s (100%), we want a full circle, at 0s (0%), we want no circle
    const endAngle = 2 * Math.PI * (percent / 100);
    
    // Calculate the end point of our arc
    const endX = radius + radius * Math.sin(endAngle);
    const endY = radius - radius * Math.cos(endAngle);
    
    // Determine if we need the large arc flag (for arcs > 180 degrees)
    const largeArcFlag = percent > 50 ? 1 : 0;
    
    // Create the SVG path for our timer arc
    // We start at the top (12 o'clock) and draw clockwise
    const pathData = percent === 0
      ? '' // No path when timer is at 0
      : percent === 100
        ? `M${radius},0 A${radius},${radius} 0 1 1 ${radius-0.001},0 Z` // Full circle (slight offset to avoid rendering issues)
        : `M${radius},${radius} L${radius},0 A${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY} Z`;

    // Enhanced color scheme
    let fillColor;
    if (percent > 66) {
      // Gradient from blue to teal for 100%-66%
      fillColor = "#3b82f6"; // Blue
    } else if (percent > 33) {
      // Gradient from teal to amber for 66%-33%
      fillColor = "#06b6d4"; // Teal
    } else {
      // Gradient from amber to rose for 33%-0%
      fillColor = "#f59e0b"; // Amber
    }
    
    // Text color changes more dramatically near the end
    const textColor = percent <= 15 ? "#ef4444" : fillColor;

    return (
      <div className="flex flex-col items-center justify-center">
        <svg width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
          {/* Background circle */}
          <circle cx={radius} cy={radius} r={radius} fill="#e5e7eb" />
          
          {/* Timer arc with gradient effect */}
          {percent > 0 && (
            <>
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={fillColor} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={fillColor} stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <path d={pathData} fill="url(#timerGradient)" />
            </>
          )}
          
          {/* Inner circle (creates donut shape) */}
          <circle cx={radius} cy={radius} r={radius * 0.7} fill="#fff" />
          
          {/* Time text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy="0.35em"
            fontSize="2.2em"
            fontWeight="bold"
            fill={textColor}
          >
            {timeLeft}s
          </text>
        </svg>
      </div>
    );
  };

  // Generate 10 random questions for the daily challenge
  function generateDailyChallengeQuestions() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
      const table = Math.floor(Math.random() * 12) + 1;
      questions.push(generateQuestion(table, 'medium'));
    }
    return questions;
  }
  // Daily Challenge Panel UI
  const DailyChallengePanel = () => (
    <div className="bg-white/30 rounded-2xl p-6 shadow-lg mb-6 w-full max-w-xs flex flex-col items-center">
      <h2 className="text-2xl font-bold text-blue-700 mb-2 font-baloo drop-shadow">🌟 Daily Challenge</h2>
      <p className="text-blue-900 text-center mb-4 font-comic">10 random questions from tables 1-12. Can you get them all right?</p>
      <button
        className="kid-btn bg-blue-400 hover:bg-blue-500 text-white mb-2"
        onClick={() => {
          setDailyChallengeQuestions(generateDailyChallengeQuestions());
          setCurrentChallengeIndex(0);
          setChallengeScore(0);
          setChallengeDone(false);
          setChallengeAnswerFeedback(null);
          setShowDailyChallenge(true);
        }}
      >
        Start Challenge
      </button>
      {challengeDone && (
        <div className="mt-2 text-center">
          <div className="text-lg text-green-700 font-bold">Total score: {challengeScore}</div>
          <button
            className="kid-btn bg-green-400 hover:bg-green-500 text-white mt-2"
            onClick={() => {
              setDailyChallengeQuestions(generateDailyChallengeQuestions());
              setCurrentChallengeIndex(0);
              setChallengeScore(0);
              setChallengeDone(false);
              setChallengeAnswerFeedback(null);
              setShowDailyChallenge(true);
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
  
  const TablePicker = ({ sessionTimerActive, sessionTimerStart, sessionTimerPaused, sessionTimerPauseStart }) => {
    const theme = selectedTheme ? themeConfigs[selectedTheme.key || selectedTheme.id] : null;
    
    // Find the highest unlocked table
    let highestUnlocked = 1;
    for (let number = 1; number <= 12; number++) {
      if (number > 1) {
        const prevProgress = tableProgress[number - 1] || {};
        let completedBelts = 0;
        ['white', 'yellow', 'green', 'blue', 'red', 'brown'].forEach(belt => {
          if (prevProgress[belt]?.perfectPerformance === true) {
            completedBelts += 1;
          }
        });
        if (completedBelts < 6) break; // Need ALL 6 belts completed with perfect performance to unlock next table
      }
      highestUnlocked = number;
    }

    // Always start with Table 1 unless the user has completed all belts in Table 1
    // Check if Table 1 is completed
    const table1Progress = tableProgress[1] || {};
    const table1Completed = ['white', 'yellow', 'green', 'blue', 'red', 'brown'].every(belt => 
      table1Progress[belt]?.perfectPerformance === true
    );
    
    // If Table 1 is not completed, force show Table 1
    const tableToShow = table1Completed ? (selectedTable || highestUnlocked) : 1;
    // MODIFIED: Force start with Table 3 instead of Table 1
    //const tableToShow = 5; // Always show Table 3
    //const tableToShow = selectedTable || highestUnlocked;
    // Pills to show: only the current table
    const pills = [tableToShow];

    return (
      <div className="min-h-screen w-full relative bg-transparent px-1 sm:px-2 md:px-4 lg:px-6 flex flex-col items-center justify-center"
           style={{
             backgroundImage: "url('/night_sky_landscape.jpg')",
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat',
           }}>
        {/* Add a semi-transparent overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        
        <div className="flex flex-col items-center justify-center w-full h-full relative z-10 px-1 sm:px-2 md:px-4 lg:px-6">
          <button
            className="fixed top-1 sm:top-2 md:top-4 left-1 sm:left-2 md:left-4 z-50 bg-white/80 hover:bg-gray-200 text-gray-700 rounded-full p-1 sm:p-1.5 md:p-3 shadow-lg border-2 sm:border-3 md:border-4 border-gray-400 focus:outline-none transition-all duration-300 transform hover:scale-110 active:scale-95"
            style={{ 
              fontSize: 'clamp(0.6rem, 2.5vw, 1.5rem)', 
              borderWidth: 'clamp(1px, 0.5vw, 3px)', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)' 
            }}
            onClick={handleBackToThemePicker}
            aria-label="Back to Theme Picker"
          >
            <FaArrowLeft size={16} className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8" />
          </button>
          
          {/* Main content container */}
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto pt-2 sm:pt-4 md:pt-6 lg:pt-8">
            {/* Welcome text */}
            <div className="text-center mb-2 sm:mb-3 md:mb-4 lg:mb-6 px-1 sm:px-2">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 sm:mb-2 md:mb-3 drop-shadow-lg font-baloo leading-tight">
                Welcome, {childName}!
              </h1>
            </div>
            
            {/* Table pill container */}
            <div className="relative flex items-center justify-center w-full mt-1 sm:mt-2 md:mt-4 lg:mt-6 px-1 sm:px-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((number) => {
                // Only show the current table (tableToShow)
                if (number !== tableToShow) return null;
                
                // Style for current table
                let pillClass;
                if (number === 2) {
                  pillClass = `group relative rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 bg-blue-400 border-blue-700 shadow-lg sm:shadow-xl md:shadow-2xl border-2 sm:border-3 md:border-4 scale-100 sm:scale-105 md:scale-110 transition-all duration-300 flex flex-col items-center justify-center transform hover:scale-105 sm:hover:scale-110 md:hover:scale-125`;
                } else {
                  pillClass = `group relative rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 ${theme ? theme.tableColors[number-1] : tableBgColors[number-1]} shadow-lg sm:shadow-xl md:shadow-2xl border-2 sm:border-3 md:border-4 border-yellow-400 scale-100 sm:scale-105 md:scale-110 transition-all duration-300 flex flex-col items-center justify-center transform hover:scale-105 sm:hover:scale-110 md:hover:scale-125`;
                }
                const pillStyle = { 
                  width: 'clamp(140px, 60vw, 280px)', 
                  height: 'clamp(100px, 45vw, 200px)', 
                  backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 60%)' 
                };
                
                return (
                  <div
                    key={number}
                    className="relative z-10 mx-0.5 sm:mx-1 md:mx-2"
                  >
                    <button
                      onClick={() => startQuiz(number)}
                      className={`${pillClass} transition-all duration-300 transform hover:scale-105 active:scale-95`}
                      style={pillStyle}
                    >
                      <div className="flex flex-col items-center justify-center w-full h-full p-1 sm:p-1.5 md:p-2 lg:p-3 -mt-1 sm:-mt-2">
                        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-0.5 sm:mb-1 md:mb-1.5 group-hover:animate-bounce transition-transform duration-300">
                          {theme ? theme.tableEmojis[number-1] : tableEmojis[number-1]}
                        </div>
                                                  <div className="mb-0.5 sm:mb-1 md:mb-1.5 text-center w-full"
                            style={{ 
                              color: 'white', 
                              fontSize: 'clamp(1.1rem, 3.5vw, 1.8rem)', 
                              lineHeight: 1.1, 
                              maxWidth: '100%', 
                              whiteSpace: 'normal', 
                              wordBreak: 'break-word',
                              fontWeight: 'bold',
                              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                            }}>
                            {theme ? theme.tableNames[number-1] : number}
                          </div>
                        <div className="flex flex-col items-center w-full">
                                                     <div className="text-white/90 font-bold mb-0.5 sm:mb-1"
                                 style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.4rem)' }}>
                              Level {number}
                            </div>
                                                     <div className="flex justify-center w-full -mt-1 sm:-mt-2">
                             <TableStarsDisplay tableNumber={number} />
                           </div>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
        {/* Add the daily stats counter */}
        <div style={{ 
          position: 'fixed', 
          right: 'max(env(safe-area-inset-right), 1rem)', 
          bottom: 'max(env(safe-area-inset-bottom), 1rem)', 
          zIndex: 99999, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-end', 
          gap: 'clamp(0.5rem, 2vw, 1rem)' 
        }}>
          <DailyStatsCounter style={{ background: 'none', boxShadow: 'none', position: 'static' }} />
          <SessionTimer isActive={sessionTimerActive} startTime={sessionTimerStart} style={{ position: 'static' }} isPaused={sessionTimerPaused} pauseStartTime={sessionTimerPauseStart} accumulatedTime={sessionTimerAccumulated} />
      </div>
    </div>
  );
  };
  const DifficultyPicker = ({ sessionTimerActive, sessionTimerStart, sessionTimerPaused, sessionTimerPauseStart }) => {
    // Get the current progress for this table
    const tableProgressData = tableProgress[selectedTable] || {};
    // Determine if belts are cleared with perfect performance (100% accuracy, ≤30 seconds, <3s per question)
    // Check if white belt is cleared with perfect performance
    const whiteCleared = tableProgressData.white?.perfectPerformance === true;
    
    // Debug star logic
    console.log('WHITE BELT STAR DEBUG:');
    console.log('- selectedTable:', selectedTable);
    console.log('- tableProgressData:', tableProgressData);
    console.log('- whiteCleared:', whiteCleared);
    const yellowCleared = tableProgressData.yellow?.perfectPerformance === true;
    const greenCleared = tableProgressData.green?.perfectPerformance === true;
    const blueCleared = tableProgressData.blue?.perfectPerformance === true;
    const redCleared = tableProgressData.red?.perfectPerformance === true;
    const brownCleared = tableProgressData.brown?.perfectPerformance === true;
    
    // Determine which difficulties are unlocked (requires perfect performance)
    const isWhiteUnlocked = true; // White belt is always unlocked
    // Yellow belt only unlocks if white belt has perfect performance
    const isYellowUnlocked = tableProgressData.white?.perfectPerformance === true;
    // Green Belt only unlocks if Yellow Belt has perfect performance
    const isGreenUnlocked = tableProgressData.yellow?.perfectPerformance === true;
    // Blue belt only unlocks if green belt has perfect performance
    const isBlueUnlocked = tableProgressData.green?.perfectPerformance === true;
    // Red belt only unlocks if blue belt has perfect performance
    const isRedUnlocked = tableProgressData.blue?.perfectPerformance === true;
    // Brown belt only unlocks if red belt has perfect performance
    const isBrownUnlocked = tableProgressData.red?.perfectPerformance === true;
    // Black belt only unlocks if brown belt has perfect performance
    const isBlackUnlocked = tableProgressData.brown?.perfectPerformance === true;
    // Show stars based on actual completion status, not unlocking status
    const blueUnlockedForStars = isBlueUnlocked || blueCleared;
    const whiteStarForBlue = whiteCleared;
    const yellowStarForBlue = yellowCleared;
    const greenStarForBlue = greenCleared;
    return (
      <div className="min-h-screen p-2 sm:p-4 flex items-center justify-center"
           style={{
             backgroundImage: "url('/night_sky_landscape.jpg')",
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat',
             paddingTop: 'max(env(safe-area-inset-top), 1rem)',
             paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)',
           }}>
        {/* Add a semi-transparent overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        
          <button
            className="fixed top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 z-50 bg-white/80 hover:bg-gray-200 text-gray-700 rounded-full p-1.5 sm:p-2 md:p-3 shadow-lg border-2 sm:border-3 md:border-4 border-gray-400 focus:outline-none transition-all duration-300 transform hover:scale-110 active:scale-95"
            style={{ 
              fontSize: 'clamp(1rem, 4vw, 2rem)', 
              borderWidth: 'clamp(2px, 1vw, 4px)', 
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)' 
            }}
            onClick={() => {
              setShowDifficultyPicker(false);
              setCurrentPage('picker');
            }}
            aria-label="Back to Difficulty Picker"
          >
            <FaArrowLeft size={20} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </button>
        <div className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto w-full relative z-10 px-1 sm:px-2 md:px-4">
          {selectedTable && (
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center drop-shadow-lg">
              Level {selectedTable}
            </div>
          )}
          <div className="flex flex-col items-center justify-center min-h-[25vh] sm:min-h-[35vh]">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
              <button
                onClick={() => startQuizWithDifficulty('white')}
                className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg relative"
                style={{ minHeight: 'clamp(120px, 25vh, 180px)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-white rounded-t-lg"></div>
                <div className="text-xl sm:text-2xl md:text-3xl font-baloo mb-1 sm:mb-2">White Belt</div>
                <div className="flex justify-center mb-1 sm:mb-2">
                  <img 
                    src="/judo_white_belt.png" 
                    alt="White Belt" 
                    className="h-6 sm:h-7 md:h-8 w-auto"
                    style={{ maxHeight: 'clamp(1.5rem, 4vw, 2rem)' }}
                  />
                </div>
                <div className="text-sm sm:text-base font-comic mb-1 sm:mb-2">
                  <span style={{fontSize: 'clamp(1.4em, 4vw, 1.8em)'}}>{whiteStarForBlue ? '⭐' : '☆'}</span>
                </div>
                <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">10 Questions</div>
              </button>
              <button
                onClick={() => isYellowUnlocked ? startQuizWithDifficulty('yellow') : null}
                className={`bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg relative ${!isYellowUnlocked ? 'opacity-60' : ''}`}
                style={{ minHeight: 'clamp(120px, 25vh, 180px)' }}
              >
                {!isYellowUnlocked && (
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-lg">
                    <div className="text-gray-600 text-lg sm:text-xl">🔒</div>
                  </div>
                )}
                <div className="absolute top-0 left-0 right-0 h-2 bg-yellow-400 rounded-t-lg"></div>
                <div className="text-xl sm:text-2xl md:text-3xl font-baloo mb-1 sm:mb-2">Yellow Belt</div>
                                  <div className="flex justify-center mb-1 sm:mb-2">
                    <img 
                      src="/judo_yellow_belt.png" 
                      alt="Yellow Belt" 
                      className="h-6 sm:h-7 md:h-8 w-auto"
                      style={{ maxHeight: 'clamp(1.5rem, 4vw, 2rem)' }}
                    />
                  </div>
                <div className="text-sm sm:text-base font-comic mb-1 sm:mb-2">
                  <span style={{fontSize: 'clamp(1.4em, 4vw, 1.8em)'}}>{yellowStarForBlue ? '⭐' : '☆'}</span>
            </div>
                <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">10 Questions</div>
              </button>
              <button
                onClick={() => isGreenUnlocked ? startQuizWithDifficulty('green') : null}
                className={`bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg relative ${!isGreenUnlocked ? 'opacity-60' : ''}`}
                style={{ minHeight: 'clamp(120px, 25vh, 180px)' }}
              >
                {!isGreenUnlocked && (
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-lg">
                    <div className="text-gray-600 text-lg sm:text-xl">🔒</div>
                  </div>
                )}
                <div className="absolute top-0 left-0 right-0 h-2 bg-green-500 rounded-t-lg"></div>
                <div className="text-xl sm:text-2xl md:text-3xl font-baloo mb-1 sm:mb-2">Green Belt</div>
                <div className="flex justify-center mb-1 sm:mb-2">
                  <img 
                    src="/judo_green_belt.png" 
                    alt="Green Belt" 
                    className="h-6 sm:h-7 md:h-8 w-auto"
                    style={{ maxHeight: 'clamp(1.5rem, 4vw, 2rem)' }}
                  />
                </div>
                <div className="text-sm sm:text-base font-comic mb-1 sm:mb-2">
                  <span style={{fontSize: 'clamp(1.4em, 4vw, 1.8em)'}}>{greenStarForBlue ? '⭐' : '☆'}</span>
                </div>
                <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">10 Questions</div>
              </button>
              <button
                onClick={() => isBlueUnlocked ? startQuizWithDifficulty('blue') : null}
                className={`bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg relative ${!isBlueUnlocked ? 'opacity-60' : ''}`}
                style={{ minHeight: 'clamp(120px, 25vh, 180px)' }}
              >
                {!isBlueUnlocked && (
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-lg">
                    <div className="text-gray-600 text-lg sm:text-xl">🔒</div>
                  </div>
                )}
                <div className="absolute top-0 left-0 right-0 h-2 bg-blue-500 rounded-t-lg"></div>
                <div className="text-xl sm:text-2xl md:text-3xl font-baloo mb-1 sm:mb-2">Blue Belt</div>
                <div className="flex justify-center mb-1 sm:mb-2">
                  <img 
                    src="/judo_blue_belt.png" 
                    alt="Blue Belt" 
                    className="h-6 sm:h-7 md:h-8 w-auto"
                    style={{ maxHeight: 'clamp(1.5rem, 4vw, 2rem)' }}
                  />
                </div>
                <div className="text-sm sm:text-base font-comic mb-1 sm:mb-2">
                  <span style={{fontSize: 'clamp(1.4em, 4vw, 1.8em)'}}>{blueCleared ? '⭐' : '☆'}</span>
                </div>
                <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">10 Questions</div>
              </button>
              <button
                onClick={() => isRedUnlocked ? startQuizWithDifficulty('red') : null}
                className={`bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg relative ${!isRedUnlocked ? 'opacity-60' : ''}`}
                style={{ minHeight: 'clamp(120px, 25vh, 180px)' }}
              >
                {!isRedUnlocked && (
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-lg">
                    <div className="text-gray-600 text-lg sm:text-xl">🔒</div>
                  </div>
                )}
                <div className="absolute top-0 left-0 right-0 h-2 bg-red-500 rounded-t-lg"></div>
                <div className="text-xl sm:text-2xl md:text-3xl font-baloo mb-1 sm:mb-2">Red Belt</div>
                <div className="flex justify-center mb-1 sm:mb-2">
                  <img 
                    src="/judo_red_belt.png" 
                    alt="Red Belt" 
                    className="h-6 sm:h-7 md:h-8 w-auto"
                    style={{ maxHeight: 'clamp(1.5rem, 4vw, 2rem)' }}
                  />
                </div>
                <div className="text-sm sm:text-base font-comic mb-1 sm:mb-2">
                  <span style={{fontSize: 'clamp(1.4em, 4vw, 1.8em)'}}>{redCleared ? '⭐' : '☆'}</span>
                </div>
                <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">10 Questions</div>
              </button>
              <button
                onClick={() => isBrownUnlocked ? startQuizWithDifficulty('brown') : null}
                className={`bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg relative ${!isBrownUnlocked ? 'opacity-60' : ''}`}
                style={{ minHeight: 'clamp(120px, 25vh, 180px)' }}
              >
                {!isBrownUnlocked && (
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-lg">
                    <div className="text-gray-600 text-lg sm:text-xl">��</div>
                  </div>
                )}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gray-800 rounded-t-lg"></div>
                <div className="text-xl sm:text-2xl md:text-3xl font-baloo mb-1 sm:mb-2">Brown Belt</div>
                <div className="flex justify-center mb-1 sm:mb-2">
                  <img 
                    src="/judo_brown_belt.png" 
                    alt="Brown Belt" 
                    className="h-6 sm:h-7 md:h-8 w-auto"
                    style={{ maxHeight: 'clamp(1.5rem, 4vw, 2rem)' }}
                  />
                </div>
                <div className="text-sm sm:text-base font-comic mb-1 sm:mb-2">
                  <span style={{fontSize: 'clamp(1.4em, 4vw, 1.8em)'}}>{brownCleared ? '⭐' : '☆'}</span>
                </div>
                <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">10 Questions</div>
              </button>
            </div>
        </div>
      </div>
      {/* Add the daily stats counter */}
      <div className="fixed right-2 sm:right-4 md:right-6 lg:right-8 bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 z-50 flex flex-col items-end gap-2 sm:gap-3 md:gap-4">
        <DailyStatsCounter style={{ background: 'none', boxShadow: 'none', position: 'static' }} />
        <SessionTimer isActive={sessionTimerActive} startTime={sessionTimerStart} style={{ position: 'static' }} isPaused={sessionTimerPaused} pauseStartTime={sessionTimerPauseStart} accumulatedTime={sessionTimerAccumulated} />
      </div>
    </div>
  );
};
const QuizScreen = ({ elapsedTime, totalTime, sessionTimerActive, sessionTimerStart, sessionTimerPaused, sessionTimerPauseStart }) => {
  // Keyboard answer selection
  useEffect(() => {
    function handleKeyDown(e) {
      if (isAnimating || showResult || !currentQuestion) return;
      const keyMap = { a: 0, s: 1, d: 2, f: 3 };
      const idx = keyMap[e.key.toLowerCase()];
      if (idx !== undefined && currentQuestion.answers[idx] !== undefined) {
        handleAnswer(currentQuestion.answers[idx], idx);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating, showResult, currentQuestion]);

  

  // In QuizScreen, set the maxQuestions based on selectedDifficulty
  const maxQuestions = selectedDifficulty === 'white' ? 10 : 
                      selectedDifficulty === 'yellow' ? 10 : 
                      selectedDifficulty === 'green' ? 10 : 
                      selectedDifficulty === 'blue' ? 10 : 
                      selectedDifficulty === 'red' ? 10 : 
                      selectedDifficulty === 'brown' ? 10 : 10;

  return (
    <div
      className="App min-h-screen w-full relative landscape-optimized portrait-optimized ios-notch"
      style={{
        background: 'linear-gradient(135deg, #23272f 0%, #18181b 60%, #111113 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background 0.5s ease',
        paddingTop: 'max(env(safe-area-inset-top), 1rem)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)',
      }}
    >
      <div className="w-full min-h-screen flex flex-col items-center justify-center relative">
        {/* Progress Bar - Outside the quiz box */}
        <div className="w-full max-w-lg sm:max-w-xl mx-auto px-1 sm:px-2 md:px-4 mb-4 sm:mb-6">
          {/* Answer Symbols Above Progress Bar */}
          <div className="flex justify-center items-center mb-2 space-x-1">
            {answerSymbols.map((answer, index) => (
              <span 
                key={`answer-${index}`} 
                className={`text-2xl font-bold ${
                  answer.symbol === '⚡' ? 'text-yellow-400' :
                  answer.symbol === '⭐' ? 'text-yellow-500' :
                  answer.symbol === '✓' ? 'text-green-500' :
                  'text-red-500'
                }`}
                title={`${answer.timeTaken.toFixed(1)}s - ${answer.isCorrect ? 'Correct' : 'Wrong'}`}
              >
                {answer.symbol}
              </span>
            ))}
          </div>
          
          <div className="bg-gray-300 rounded-full h-3 sm:h-4 overflow-hidden shadow-lg">
            <div 
              className="bg-green-500 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${quizProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Main quiz content centered */}
        <div className="w-full max-w-lg sm:max-w-xl mx-auto px-1 sm:px-2 md:px-4">
          {/* Answer Feedback */}
          {answerFeedback && answerFeedback.type === 'wrong' && (
            <div className={`text-center mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-red-500/20 border-2 border-red-300`}>
              <p className={`text-base sm:text-lg md:text-xl font-bold text-red-200`}>
                {answerFeedback.message}
              </p>
            </div>
          )}

          <div className="bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 border-2 border-gray-200 min-h-[200px] sm:min-h-[300px] md:min-h-[400px] flex flex-col justify-center">
            <div className="text-center mb-3 sm:mb-4 md:mb-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-1 sm:mb-2 drop-shadow-lg">
                {currentQuestion?.question || "1 + 1"}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 w-full">
              {(currentQuestion?.answers || [1, 2, 3, 4]).map((answer, index) => (
                <button
                  key={index}
                  ref={answerRefs[index]}
                  onClick={() => handleAnswer(answer, index)}
                  disabled={isAnimating || !currentQuestion || currentPage !== 'quiz'}
                  className={`w-full bg-gray-200/80 border-gray-300/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border-2 no-transition ${
                    isAnimating || !currentQuestion || currentPage !== 'quiz' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  style={{
                    pointerEvents: answersInteractive ? 'auto' : 'none'
                  }}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl font-baloo text-gray-800 drop-shadow-md" style={{ fontFamily: 'Baloo 2, Comic Neue, cursive', letterSpacing: 2 }}>
                    {answer}
                  </div>
                </button>
              ))}
            </div>
          </div>
            </div>
          </div>
          
      {/* Black Belt Degrees Screen */}
      {console.log('RENDER DEBUG: showBlackBeltDegrees =', showBlackBeltDegrees)}
      {showBlackBeltDegrees && (
        <div className="min-h-screen p-2 sm:p-4 flex items-center justify-center fixed inset-0 z-[60]"
             style={{
               backgroundImage: "url('/night_sky_landscape.jpg')",
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               paddingTop: 'max(env(safe-area-inset-top), 1rem)',
               paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)',
             }}>
          {/* Add a semi-transparent overlay to ensure text is readable */}
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          
          <button
            className="fixed top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 z-50 bg-white/80 hover:bg-gray-200 text-gray-700 rounded-full p-1.5 sm:p-2 md:p-3 shadow-lg border-2 sm:border-3 md:border-4 border-gray-400 focus:outline-none transition-all duration-300 transform hover:scale-110 active:scale-95"
            style={{ 
              fontSize: 'clamp(1rem, 4vw, 2rem)', 
              borderWidth: 'clamp(2px, 1vw, 4px)', 
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)' 
            }}
            onClick={() => {
              //setShowBlackBeltDegrees(false);
              setCurrentPage('difficulty');
            }}
            aria-label="Back to Difficulty Picker"
          >
            <FaArrowLeft size={20} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </button>
          
          <div className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto w-full relative z-10 px-1 sm:px-2 md:px-4">
            {selectedTable && (
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center drop-shadow-lg">
                Level {selectedTable} - Black Belt Degrees
        </div>
            )}
            <div className="flex flex-col items-center justify-center min-h-[25vh] sm:min-h-[35vh]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                {/* Degree 1 */}
                <button
                  onClick={() => {
                    setCurrentDegree(1);
                    setShowBlackBeltDegrees(false);
                    // Start black belt quiz for degree 1
                    setSelectedDifficulty('black1');
                    setCurrentPage('quiz');
                    setScore(0);
                    setTotalQuestions(0);
                    setCorrectCount(0);
                    setCorrectCountForCompletion(0);
                    setWrongCount(0);
                    setShowResult(false);
                    setAnswerFeedback(null);
                    setIsAnimating(false);
                    setElapsedTime(0);
                    setQuizStartTime(Date.now());
                    setPausedTime(0);
                    setIsTimerPaused(false);
                    setQuestionStartTime(Date.now());
                    setShowLevelUp(false);
                    setHintsUsed(0);
                    setQuestionTimes([]);
                    setVisualAidHistory([]);
                    setAskedQuestions(new Set());
                    setWrongQuestions(new Set());
                    setSlowQuestions(new Set());
                    setAnswerSymbols([]);
                    setLastQuestion('');
                    setRecentQuestions([]);
                    
                    console.log('Starting Black Belt Degree 1 quiz');
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg relative"
                  style={{ minHeight: 'clamp(120px, 25vh, 180px)' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gray-800 rounded-t-lg"></div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-baloo mb-1 sm:mb-2 whitespace-nowrap w-full text-center">
  <div className="inline-block">Degree 1</div>
      </div>
                  <div className="flex justify-center mb-1 sm:mb-2">
                    <img 
                      src="/judo_black_belt.png" 
                      alt="Degree 1" 
                      className="h-6 sm:h-7 md:h-8 w-auto"
                      style={{ maxHeight: 'clamp(1.5rem, 4vw, 2rem)' }}
                    />
      </div>
                  <div className="text-sm sm:text-base font-comic mb-1 sm:mb-2">
                    <span style={{fontSize: 'clamp(1.4em, 4vw, 1.8em)'}}>{completedBlackBeltDegrees.includes(1) ? '⭐' : '☆'}</span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">20 Questions</div>
                  <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">60s</div>
                </button>

                {/* Degree 2 */}
                <button
                  onClick={() => {
                    if (unlockedDegrees.includes(2)) {
                      setCurrentDegree(2);
                      setShowBlackBeltDegrees(false);
                      console.log('Starting Degree 2 quiz');
                      // TODO: Implement black belt quiz logic
                      // For now, simulate completion after 2 seconds
                      setTimeout(() => {
                        setCompletedBlackBeltDegrees(prev => [...prev, 2]);
                        setUnlockedDegrees(prev => [...prev, 3]);
                        console.log('Degree 2 completed! Unlocking Degree 3');
                      }, 2000);
                    }
                  }}
                  className={`bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg relative ${!unlockedDegrees.includes(2) ? 'opacity-60' : ''}`}
                  style={{ minHeight: 'clamp(120px, 25vh, 180px)' }}
                >
                  {!unlockedDegrees.includes(2) && (
                    <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-lg">
                      <div className="text-gray-600 text-lg sm:text-xl">🔒</div>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gray-800 rounded-t-lg"></div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-baloo mb-1 sm:mb-2 whitespace-nowrap w-full grid place-items-center">Degree 2</div>
                  <div className="flex justify-center mb-1 sm:mb-2">
                    <img 
                      src="/judo_black_belt.png" 
                      alt="Degree 2" 
                      className="h-6 sm:h-7 md:h-8 w-auto"
                      style={{ maxHeight: 'clamp(1.5rem, 4vw, 2rem)' }}
                    />
                  </div>
                  <div className="text-sm sm:text-base font-comic mb-1 sm:mb-2">
                    <span style={{fontSize: 'clamp(1.4em, 4vw, 1.8em)'}}>{completedBlackBeltDegrees.includes(2) ? '⭐' : '☆'}</span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">20 Questions</div>
                  <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">55s</div>
                </button>

                {/* Degree 3 */}
                <button
                  onClick={() => {
                    if (unlockedDegrees.includes(3)) {
                      setCurrentDegree(3);
                      setShowBlackBeltDegrees(false);
                      console.log('Starting Degree 3 quiz');
                      // TODO: Implement black belt quiz logic
                      // For now, simulate completion after 2 seconds
                      setTimeout(() => {
                        setCompletedBlackBeltDegrees(prev => [...prev, 3]);
                        setUnlockedDegrees(prev => [...prev, 4]);
                        console.log('Degree 3 completed! Unlocking Degree 4');
                      }, 2000);
                    }
                  }}
                  className={`bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg relative ${!unlockedDegrees.includes(3) ? 'opacity-60' : ''}`}
                  style={{ minHeight: 'clamp(120px, 25vh, 180px)' }}
                >
                  {!unlockedDegrees.includes(3) && (
                    <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-lg">
                      <div className="text-gray-600 text-lg sm:text-xl">🔒</div>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gray-800 rounded-t-lg"></div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-baloo mb-1 sm:mb-2 whitespace-nowrap w-full grid place-items-center">Degree 3</div>
                  <div className="flex justify-center mb-1 sm:mb-2">
                    <img 
                      src="/judo_black_belt.png" 
                      alt="Degree 3" 
                      className="h-6 sm:h-7 md:h-8 w-auto"
                      style={{ maxHeight: 'clamp(1.5rem, 4vw, 2rem)' }}
                    />
                  </div>
                  <div className="text-sm sm:text-base font-comic mb-1 sm:mb-2">
                    <span style={{fontSize: 'clamp(1.4em, 4vw, 1.8em)'}}>{completedBlackBeltDegrees.includes(3) ? '⭐' : '☆'}</span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">20 Questions</div>
                  <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">50s</div>
                </button>

                {/* Degree 4 */}
                <button
                  onClick={() => {
                    if (unlockedDegrees.includes(4)) {
                      setCurrentDegree(4);
                      setShowBlackBeltDegrees(false);
                      console.log('Starting Degree 4 quiz');
                      // TODO: Implement black belt quiz logic
                      // For now, simulate completion after 2 seconds
                      setTimeout(() => {
                        setCompletedBlackBeltDegrees(prev => [...prev, 4]);
                        setUnlockedDegrees(prev => [...prev, 5]);
                        console.log('Degree 4 completed! Unlocking Degree 5');
                      }, 2000);
                    }
                  }}
                  className={`bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg relative ${!unlockedDegrees.includes(4) ? 'opacity-60' : ''}`}
                  style={{ minHeight: 'clamp(120px, 25vh, 180px)' }}
                >
                  {!unlockedDegrees.includes(4) && (
                    <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-lg">
                      <div className="text-gray-600 text-lg sm:text-xl">🔒</div>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gray-800 rounded-t-lg"></div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-baloo mb-1 sm:mb-2 whitespace-nowrap w-full grid place-items-center">Degree 4</div>
                  <div className="flex justify-center mb-1 sm:mb-2">
                    <img 
                      src="/judo_black_belt.png" 
                      alt="Degree 4" 
                      className="h-6 sm:h-7 md:h-8 w-auto"
                      style={{ maxHeight: 'clamp(1.5rem, 4vw, 2rem)' }}
                    />
                  </div>
                  <div className="text-sm sm:text-base font-comic mb-1 sm:mb-2">
                    <span style={{fontSize: 'clamp(1.4em, 4vw, 1.8em)'}}>{completedBlackBeltDegrees.includes(4) ? '⭐' : '☆'}</span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">20 Questions</div>
                  <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">45s</div>
                </button>

                {/* Degree 5 */}
                <button
                  onClick={() => {
                    if (unlockedDegrees.includes(5)) {
                      setCurrentDegree(5);
                      setShowBlackBeltDegrees(false);
                      console.log('Starting Degree 5 quiz');
                      // TODO: Implement black belt quiz logic
                      // For now, simulate completion after 2 seconds
                      setTimeout(() => {
                        setCompletedBlackBeltDegrees(prev => [...prev, 5]);
                        setUnlockedDegrees(prev => [...prev, 6]);
                        console.log('Degree 5 completed! Unlocking Degree 6');
                      }, 2000);
                    }
                  }}
                  className={`bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg relative ${!unlockedDegrees.includes(5) ? 'opacity-60' : ''}`}
                  style={{ minHeight: 'clamp(120px, 25vh, 180px)' }}
                >
                  {!unlockedDegrees.includes(5) && (
                    <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-lg">
                      <div className="text-gray-600 text-lg sm:text-xl">🔒</div>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gray-800 rounded-t-lg"></div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-baloo mb-1 sm:mb-2 whitespace-nowrap w-full grid place-items-center">Degree 5</div>
                  <div className="flex justify-center mb-1 sm:mb-2">
                    <img 
                      src="/judo_black_belt.png" 
                      alt="Degree 5" 
                      className="h-6 sm:h-7 md:h-8 w-auto"
                      style={{ maxHeight: 'clamp(1.5rem, 4vw, 2rem)' }}
                    />
                  </div>
                  <div className="text-sm sm:text-base font-comic mb-1 sm:mb-2">
                    <span style={{fontSize: 'clamp(1.4em, 4vw, 1.8em)'}}>{completedBlackBeltDegrees.includes(5) ? '⭐' : '☆'}</span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">20 Questions</div>
                  <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">40s</div>
                </button>

                {/* Degree 6 */}
                <button
                  onClick={() => {
                    if (unlockedDegrees.includes(6)) {
                      setCurrentDegree(6);
                      setShowBlackBeltDegrees(false);
                      console.log('Starting Degree 6 quiz');
                      // TODO: Implement black belt quiz logic
                      // For now, simulate completion after 2 seconds
                      setTimeout(() => {
                        setCompletedBlackBeltDegrees(prev => [...prev, 6]);
                        setUnlockedDegrees(prev => [...prev, 7]);
                        console.log('Degree 6 completed! Unlocking Degree 7');
                      }, 2000);
                    }
                  }}
                  className={`bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg relative ${!unlockedDegrees.includes(6) ? 'opacity-60' : ''}`}
                  style={{ minHeight: 'clamp(120px, 25vh, 180px)' }}
                >
                  {!unlockedDegrees.includes(6) && (
                    <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-lg">
                      <div className="text-gray-600 text-lg sm:text-xl">🔒</div>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gray-800 rounded-t-lg"></div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-baloo mb-1 sm:mb-2 whitespace-nowrap w-full grid place-items-center">Degree 6</div>
                  <div className="flex justify-center mb-1 sm:mb-2">
                    <img 
                      src="/judo_black_belt.png" 
                      alt="Degree 6" 
                      className="h-6 sm:h-7 md:h-8 w-auto"
                      style={{ maxHeight: 'clamp(1.5rem, 4vw, 2rem)' }}
                    />
                  </div>
                  <div className="text-sm sm:text-base font-comic mb-1 sm:mb-2">
                    <span style={{fontSize: 'clamp(1.4em, 4vw, 1.8em)'}}>{completedBlackBeltDegrees.includes(6) ? '⭐' : '☆'}</span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">20 Questions</div>
                  <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">35s</div>
                </button>

                {/* Degree 7 */}
                <button
                  onClick={() => {
                    if (unlockedDegrees.includes(7)) {
                      setCurrentDegree(7);
                      setShowBlackBeltDegrees(false);
                      console.log('Starting Degree 7 quiz');
                      // TODO: Implement black belt quiz logic
                      // For now, simulate completion after 2 seconds
                      setTimeout(() => {
                        setCompletedBlackBeltDegrees(prev => [...prev, 7]);
                        console.log('Degree 7 completed! All degrees finished!');
                      }, 2000);
                    }
                  }}
                  className={`bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg relative ${!unlockedDegrees.includes(7) ? 'opacity-60' : ''}`}
                  style={{ minHeight: 'clamp(120px, 25vh, 180px)' }}
                >
                  {!unlockedDegrees.includes(7) && (
                    <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-lg">
                      <div className="text-gray-600 text-lg sm:text-xl">🔒</div>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gray-800 rounded-t-lg"></div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-baloo mb-1 sm:mb-2 whitespace-nowrap w-full grid place-items-center">Degree 7</div>
                  <div className="flex justify-center mb-1 sm:mb-2">
                    <img 
                      src="/judo_black_belt.png" 
                      alt="Degree 7" 
                      className="h-6 sm:h-7 md:h-8 w-auto"
                      style={{ maxHeight: 'clamp(1.5rem, 4vw, 2rem)' }}
                    />
                  </div>
                  <div className="text-sm sm:text-base font-comic mb-1 sm:mb-2">
                    <span style={{fontSize: 'clamp(1.4em, 4vw, 1.8em)'}}>{completedBlackBeltDegrees.includes(7) ? '⭐' : '☆'}</span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">20 Questions</div>
                  <div className="text-sm sm:text-base md:text-lg font-comic whitespace-nowrap">30s</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Quiz Results */}
      {showResult && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/90 via-pink-900/85 to-rose-800/90 backdrop-blur-sm flex items-center justify-center z-50 safe-area-top safe-area-bottom">
          {/* Confetti for Level 1 belt completion */}
          {showConfetti()}
          <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl w-full mx-2 sm:mx-4 shadow-2xl min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
            <div className="text-center flex flex-col justify-start items-center h-full pt-2 sm:pt-4 md:pt-6">
              <div className="text-sm sm:text-base md:text-lg text-gray-700 mb-2 sm:mb-4 md:mb-6">
                {elapsedTime >= 999 ? (
                  <div className="inline-block p-4 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-full mb-4 shadow-lg">
                    <span className="text-4xl">⏰</span>
                  </div>
                ) : (
                  <div className="mb-3">
                    <div className="bg-gradient-to-r from-green-300 to-yellow-500 rounded-xl p-4 mb-6 shadow-lg">
                    <p className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-6 tracking-wide no-underline break-words overflow-hidden mt-4" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.05em', maxWidth: '100%' }}>
                        {correctCount === maxQuestions && elapsedTime <= 30 && (elapsedTime / maxQuestions) < 5 && slowQuestions.size === 0 && !questionTimes.some(time => time > 5) ? "CONGRATULATIONS" : "Way To Go!"}
                    </p>
                    </div>
                    <p className="text-green-400 font-bold text-2xl mt-2">You earned +10 points</p>
                    {/* Black Belt Transition Message for Brown Belt Completion */}
                    {selectedDifficulty === 'brown' && correctCount === 10 && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-green-600 to-yellow-600 rounded-xl shadow-lg">
                        <p className="text-white font-bold text-xl mb-2">Amazing! You got the Brown Belt!</p>
                        <p className="text-white font-bold text-xl">Moving to Black Belt in <span className="text-yellow-300">{blackBeltCountdown}</span> seconds... 🥋</p>
                        <div className="mt-2 text-center">
                        </div>
                      </div>
                    )}
                    {showShootingStars()}
                  </div>
                )}
              </div>
              <div className="text-center mb-3">
                {elapsedTime >= 999 ? (
                  <div className="bg-gradient-to-br from-red-100 to-pink-50 rounded-xl p-4 border border-red-200">
                    <p className="text-2xl mb-2 text-red-700 font-bold">⏰ Time's up!</p>
                    <p className="text-lg mb-4 text-red-600">Let's try again! ⚡</p>
                  </div>
                ) : (
                  <div className="p-3">
                    <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 mb-4 -mt-1">
                    <div className="text-center"> </div>
                    <div className="text-base text-gray-600 mb-2">Today's Score</div>
                    <p className="text-6xl sm:text-7xl md:text-8xl font-bold text-green-600 bg-black/10 border-2 border-black rounded-lg px-4 py-2">
                      {(() => {
                        const today = new Date().toLocaleDateString();
                        return parseInt(localStorage.getItem(`math-daily-correct-${today}`) || '0');
                      })()}
                      </p>
                    </div>
                       
                    <div className="p-3 mb-4 -mt-1">
                    <div className="text-center"> </div>
                    <div className="text-base text-gray-600 mb-2">Time Spent</div>
                    <p className="text-6xl sm:text-7xl md:text-8xl font-bold text-green-600 bg-black/10 border-2 border-black rounded-lg px-4 py-2">
                      {elapsedTime}s
                      </p>
                    </div>
                        {/*
                        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg p-2 shadow-md">
                          <p className="text-lg font-bold">⏱️ Time: {elapsedTime} seconds</p>
                        </div>
                        */}
                    </div>
                  </div>
                )}
                  {/* Check if conditions are met for unlocking next belt */}
                  {elapsedTime < 999 && (() => {
                    const allCorrect = correctCount === maxQuestions;
                    const withinTimeLimit = elapsedTime <= 30; // Updated to 30 seconds
                    const avgTimePerQuestion = elapsedTime / maxQuestions;
                    const fastPerQuestion = avgTimePerQuestion < 5;
                    const hasSlowQuestions = slowQuestions.size > 0;
                    const hasSlowQuestionsInArray = questionTimes.some(time => time > 5);
                    const canUnlockNext = allCorrect && withinTimeLimit && fastPerQuestion && !hasSlowQuestions && !hasSlowQuestionsInArray;
                    
                    if (canUnlockNext) {
                      const difficultyOrder = ['white', 'yellow', 'green', 'blue', 'red', 'brown'];
                      const currentIndex = difficultyOrder.indexOf(selectedDifficulty);
                      const hasNextBelt = currentIndex < difficultyOrder.length - 1;
                      
                      if (hasNextBelt) {
                        setShowNextButton(true);
                        return (
                          <div className="text-center">
                            <div className="mb-3">
                            <div className="relative">
                                <img 
                                  src={`/themes/${selectedTheme}.jpg`} 
                                  alt={`${selectedTheme} theme`}
                                  className="w-24 h-24 mx-auto rounded-2xl shadow-lg border-2 border-slate-300"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              </div>
                            </div>
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-3 mb-3 shadow-lg border border-emerald-300">
                            <p className="text-white font-bold text-2xl">🎉 Amazing! You got the {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Belt!</p>
                            </div>
                            {/* <button
                              onClick={() => {
                                setShowNextButton(false);
                                setShowResult(false);
                                
                                // Start the next belt using the proper function
                                const nextBelt = difficultyOrder[currentIndex + 1];
                                startQuizWithDifficulty(nextBelt);
                              }}
                              className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg border border-purple-500"
                            >
                              🚀 Next Belt!
                            </button> */}
                          </div> 
                        );
                      } else {
                        // Check if all belts in current table are completed
                        const currentTableProgress = tableProgress[selectedTable] || {};
                        const allBeltsCompleted = ['white', 'yellow', 'green', 'blue', 'red', 'brown'].every(belt => 
                          currentTableProgress[belt]?.perfectPerformance === true
                        );
                        const blackBeltCompleted = currentTableProgress.black1?.perfectPerformance === true &&
                          currentTableProgress.black2?.perfectPerformance === true &&
                          currentTableProgress.black3?.perfectPerformance === true &&
                          currentTableProgress.black4?.perfectPerformance === true &&
                          currentTableProgress.black5?.perfectPerformance === true &&
                          currentTableProgress.black6?.perfectPerformance === true &&
                          currentTableProgress.black7?.perfectPerformance === true;

                        // Only progress to next level if both basic belts AND black belt are completed
                        const canProgressToNextLevel = allBeltsCompleted && blackBeltCompleted;
                        
                        if (canProgressToNextLevel) {
                          // Automatically progress to Level 2 when Level 1 is completed
                          if (selectedTable === 1) {
                            // Add a small delay to show the completion message before progressing
                            setTimeout(() => {
                              setShowResult(false);
                              setSelectedTable(2); // Move to Level 2
                              setCurrentPage('picker'); // Go back to the level picker
                              // Play a celebration sound for the level progression
                              playSound('complete');
                            }, 5000); // 2 second delay
                          }
                          // Add this block for Level 2 to Level 3
                          if (selectedTable === 2) {
                            setTimeout(() => {
                              setShowResult(false);
                              setSelectedTable(3); // Move to Level 3
                              setCurrentPage('picker'); // Go back to the level picker
                              playSound('complete');
                            }, 5000);
                          }
                          // Add this block for Level 3 to Level 4
                          if (selectedTable === 3) {
                            setTimeout(() => {
                              setShowResult(false);
                              setSelectedTable(4); // Move to Level 4
                              setCurrentPage('picker'); // Go back to the level picker
                              playSound('complete');
                            }, 5000);
                          } 
                          // Add this block for Level 4 to Level 5
                          if (selectedTable === 4) {
                            setTimeout(() => {
                              setShowResult(false);
                              setSelectedTable(5); // Move to Level 5
                              setCurrentPage('picker'); // Go back to the level picker
                              playSound('complete');
                            }, 5000);
                          }
                          // Add this block for Level 5 to Level 6
                          if (selectedTable === 5) {
                            setTimeout(() => {
                              setShowResult(false);
                              setSelectedTable(6); // Move to Level 6
                              setCurrentPage('picker'); // Go back to the level picker
                              playSound('complete');
                            }, 5000);
                          }
                          
                          return (
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-3 mb-3 shadow-lg border border-emerald-300">
                              <p className="text-white font-bold text-xl font-serif">
                                🎉 All belts completed! {selectedTable === 1 ? 'Moving to Level 2 in 5 seconds... 🚀' : 
                                                        selectedTable === 2 ? 'Moving to Level 3 in 5 seconds... 🚀' :
                                                        selectedTable === 3 ? 'Moving to Level 4 in 5 seconds... 🚀' :
                                                        selectedTable === 4 ? 'Moving to Level 5 in 5 seconds... 🚀' :
                                                        selectedTable === 5 ? 'Moving to Level 6 in 5 seconds... 🚀' :
                                                        'Great Work'}
                              </p>
                              {selectedTable === 1 && (
                                <div className="mt-2 text-center">
                                  <div className="animate-bounce text-2xl">🎯</div>
                                  <p className="text-sm opacity-90">Get ready for Level 2!</p>
                                  <div className="mt-2 flex justify-center items-center space-x-2">
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                                  </div>
                                </div>
                              )}
              
                              {selectedTable === 2 && (
                                <div className="mt-2 text-center">
                                  <div className="animate-bounce text-2xl">🎯</div>
                                  <p className="text-sm opacity-90">Get ready for Level 3!</p>
                                  <div className="mt-2 flex justify-center items-center space-x-2">
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                                  </div>
                                </div>
                              )}

                              {selectedTable === 3 && (
                                <div className="mt-2 text-center">
                                  <div className="animate-bounce text-2xl">🎯</div>
                                  <p className="text-sm opacity-90">Get ready for Level 4!</p>
                                  <div className="mt-2 flex justify-center items-center space-x-2">
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        } else if (allBeltsCompleted) {
                          // Brown belt completed - show message about black belt unlock
                          return (
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-3 mb-3 shadow-lg border border-emerald-300">
                            <p className="text-white font-bold text-2xl">🎉 Amazing! You got the {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Belt!</p>
                            </div>
                          );
                        } else {
                          return (
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-3 mb-3 shadow-lg border border-emerald-300">
                              <p className="text-white font-bold text-xl font-serif">
                                🎉 Brown Belt Completed!
                              </p>
                            </div>
                          );
                        }
                      }
                    }  
                    else {
                      /*return (
                        <div className="bg-gradient-to-r from-purple-100 to-violet-50 text-gray-700 rounded-2xl p-4 mb-4 shadow-lg border border-purple-200">
                          <p className="text-gray-700 font-bold text-xl font-serif">💪 Great effort! To unlock the next belt, you need:</p>
                          <div className="bg-white/30 rounded-lg p-3 mt-3 border border-white/40">
                            <p className="text-gray-600 text-sm font-medium">
                              • All {maxQuestions} questions correct<br/>
                              • Complete within 30 seconds<br/>
                              • No more than 3 seconds per question
                            </p>
                          </div>
                        </div>
                      );*/
                    }
                  })()}
                </div>
                <div className="flex flex-col gap-2 items-center mt-0">
                    {/*<button
                      className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg border border-gray-500 w-48"
                      onClick={() => {
                        setShowResult(false);
                      
                        // Reset quiz state without changing page
                        setCurrentQuestion(null);
                        setScore(0);
                        setTotalQuestions(0);
                        setAnswerFeedback(null);
                        setIsAnimating(false);
                        setElapsedTime(0);
                        setQuizStartTime(null);
                        setPausedTime(0);
                        setIsTimerPaused(false);
                        setSavedQuizState(null);
                        setShowHint(false);
                        setQuestionStartTime(Date.now());
                        setShowLevelUp(false);
                        setHintsUsed(0);
                      
                      // Reset session timer
                        setSessionTimerActive(false);
                        setSessionTimerStart(null);
                        setSessionTimerPaused(false);
                        setSessionTimerPauseStart(null);
                      
                      // Reset tracking variables
                        setQuestionTimeTracker({});
                        setAskedQuestions(new Set());
                        setWrongQuestions(new Set());
                        setSlowQuestions(new Set());
                        setCorrectCountForCompletion(0);
                        setShowWrongAnswerPopup(false);
                        setWrongAnswerData(null);
                        setWhiteBeltRandomNumber(null);
                        setCorrectAnswerSelected(false);
                        setShowCorrectText(false);
                        setLastWhiteBeltNumber(null);
                      
                      // Reset popup states
                      setShowSecondPopup(false);
                      setShowWrongAnswerPopup(false);
                      setWrongAnswerData(null);
                      
                      // Reset question tracking
                      setLastQuestion('');
                      setRecentQuestions([]);
                      setQuestionAlternator('medium');
                      setQuizProgress(0);
                      setQuestionsWithPractice(new Set());
                      
                      // CRITICAL FIX: Reset yellow belt sequence when using Try Again
                        if (window.yellowBeltFullSequence) {
                          delete window.yellowBeltFullSequence;
                          delete window.yellowBeltQuestionCounter;
                          delete window.yellowBeltZeroPlusOneAsked;
                          delete window.yellowBeltOnePlusZeroAsked;
                        }
                      // CRITICAL FIX: Reset green belt sequence when using Try Again
                        if (window.greenBeltFullSequence) {
                          delete window.greenBeltFullSequence;
                          delete window.greenBeltQuestionCounter;
                          delete window.greenBeltTwoPlusZeroAsked;
                          delete window.greenBeltZeroPlusTwoAsked;
                        }
                      // CRITICAL FIX: Reset blue belt sequence when using Try Again
                        if (window.blueBeltFullSequence) {
                          delete window.blueBeltFullSequence;
                          delete window.blueBeltQuestionCounter;
                          delete window.blueBeltZeroPlusThreeAsked;
                          delete window.blueBeltThreePlusZeroAsked;
                        }
                      // CRITICAL FIX: Reset red belt sequence when using Try Again
                        if (window.redBeltFullSequence) {
                          delete window.redBeltFullSequence;
                          delete window.redBeltQuestionCounter;
                          delete window.redBeltZeroPlusFourAsked;
                          delete window.redBeltFourPlusZeroAsked;
                        }
                      // CRITICAL FIX: Reset brown belt sequence when using Try Again
                        if (window.brownBeltFullSequence) {
                          delete window.brownBeltFullSequence;
                          delete window.brownBeltQuestionCounter;
                          delete window.brownBeltZeroPlusFiveAsked;
                          delete window.brownBeltFivePlusZeroAsked;
                        }
                      
                        // Start the quiz again
                        startActualQuiz(selectedDifficulty);
                      }}
                    >
                      Keep Going
                    </button>*/}
                  <button
                    className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg border border-gray-600 w-48"
                    onClick={() => {
                      setShowResult(false);
                      // Don't reset the selected table, just reset quiz state
                      setCurrentQuestion(null);
                      setScore(0);
                      setTotalQuestions(0);
                      setAnswerFeedback(null);
                      setIsAnimating(false);
                      setElapsedTime(0);
                      setQuizStartTime(null);
                      setPausedTime(0);
                      setIsTimerPaused(false);
                      setSavedQuizState(null);
                      setShowHint(false);
                      setQuestionStartTime(Date.now());
                      setShowLevelUp(false);
                      setHintsUsed(0);
                      setSessionTimerActive(false);
                      setSessionTimerStart(null);
                      setSessionTimerPaused(false);
                      setSessionTimerPauseStart(null);
                      setQuestionTimeTracker({});
                      setAskedQuestions(new Set());
                      setWrongQuestions(new Set());
                      setSlowQuestions(new Set());
                      setCorrectCountForCompletion(0);
                      setShowWrongAnswerPopup(false);
                      setWrongAnswerData(null);
                      setWhiteBeltRandomNumber(null);
                      setCorrectAnswerSelected(false);
                      setShowCorrectText(false);
                      setLastWhiteBeltNumber(null);
                      setCurrentPage('difficulty');
                    }}
                  >
                    Go To Belts
                  </button>
                </div>
                {/* Add countdown message at the bottom for Way To Go screen */}
                {(() => {
                  const allCorrect = correctCount === (selectedDifficulty === 'brown' ? 10 : 10);
                  const withinTimeLimit = elapsedTime <= 30;
                  const hasSlowQuestions = slowQuestions.size > 0;
                  const hasSlowQuestionsInArray = questionTimes.some(time => time > 5);
                  const canUnlockNext = allCorrect && withinTimeLimit && !hasSlowQuestions && !hasSlowQuestionsInArray;
                  
                  // Only show countdown if user failed (Way To Go screen)
                  if (!canUnlockNext) {
                    return (
                      <div className="text-center mt-0">
                        <p className="text-xl font-bold text-black-600"> Restarting in <span className="text-red-600">{countdown}</span> seconds...</p>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            </div>
          </div>
        )}
        

        {/* Add the daily stats counter */}
        <div className="fixed right-2 sm:right-4 md:right-6 lg:right-8 bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 z-50 flex flex-col items-end gap-2 sm:gap-3 md:gap-4">
          <DailyStatsCounter style={{ background: 'none', boxShadow: 'none', position: 'static' }} />
          <SessionTimer isActive={sessionTimerActive} startTime={sessionTimerStart} style={{ position: 'static' }} isPaused={sessionTimerPaused} pauseStartTime={sessionTimerPauseStart} accumulatedTime={sessionTimerAccumulated} />
                </div>
        
        {/* Wrong Answer Popup */}
        {showWrongAnswerPopup && wrongAnswerData && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl w-full mx-2 sm:mx-4 shadow-2xl min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
              <div className="text-center flex flex-col justify-start items-center h-full pt-4 sm:pt-8 md:pt-12 lg:pt-16">
                <div className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 md:mb-8 lg:mb-12">
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center">{wrongAnswerData.question} = {wrongAnswerData.correctAnswer}</p>
              </div>
                
                <button
                  onClick={() => {
                    setShowWrongAnswerPopup(false);
                    setShowSecondPopup(true);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 sm:py-3 md:py-4 px-6 sm:px-8 md:px-12 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl"
                >
                  Next
                </button>
            </div>
          </div>
        </div>
        )}
        
        {/* Second Popup */}
        {showSecondPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl w-full mx-2 sm:mx-4 shadow-2xl min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px]">
              <div className="text-center flex flex-col justify-start items-center h-full pt-2">
                <div className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center">{wrongAnswerData.question}</p>
      </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 -mt-2 sm:-mt-3 md:-mt-4 w-full">
                  {wrongAnswerData.answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (answer === wrongAnswerData.correctAnswer) {
                          // Correct answer - move to next question
                          setShowSecondPopup(false);
                          setAnswerFeedback(null);
                          setIsAnimating(false);
                          setShowHint(false);
                          setQuestionStartTime(Date.now());                          
                          // Generate next question using generateBeltQuestion for consistency
                          let newQuestion;
                          if (selectedDifficulty === 'white') {
                            // Use generateBeltQuestion to ensure consistent logic across all white belt questions
                            newQuestion = generateBeltQuestion('white', totalQuestions, askedQuestions, lastQuestion, selectedTable);
                            // INCREMENT totalQuestions WHEN generating the new question
                            setTotalQuestions(prev => prev + 1);
                          } else if (selectedDifficulty === 'yellow') {
                            // Use generateBeltQuestion to ensure consistent logic across all yellow belt questions
                            newQuestion = generateBeltQuestion('yellow', totalQuestions, askedQuestions, lastQuestion, selectedTable);
                            // INCREMENT totalQuestions WHEN generating the new question
                            setTotalQuestions(prev => prev + 1);
                          } else {
                            // For other difficulties, use generateBeltQuestion as fallback
                            newQuestion = generateBeltQuestion(selectedDifficulty, totalQuestions, askedQuestions, lastQuestion, selectedTable);
                            // INCREMENT totalQuestions WHEN generating the new question
                            setTotalQuestions(prev => prev + 1);
                          }
                          
                          // Check if this was the last question and we need to show completion screen
                          const targetQuestionCount = selectedDifficulty === 'brown' ? 10 : (selectedDifficulty && selectedDifficulty.startsWith('black')) ? 20 : 10;
                          
                          if (totalQuestions >= targetQuestionCount) {
                            // This was the last question - show completion screen
                            console.log('Practice completed for last question - showing completion screen');
                            
                            // Check for 100% accuracy and strict time constraints for unlocking next difficulty
                            const finalCorrectCount = correctCountForCompletion;
                            const allCorrect = finalCorrectCount === targetQuestionCount;
                            const withinTimeLimit = elapsedTime <= 30; // Must complete within 30 seconds
                            const avgTimePerQuestion = elapsedTime / targetQuestionCount;
                            const fastPerQuestion = avgTimePerQuestion < 5; // Less than 5 seconds per question
                            // Check if any individual questions took more than 3 seconds
                            const hasSlowQuestions = slowQuestions.size > 0;
                            const hasSlowQuestionsInArray = questionTimes.some(time => time > 5);
                            const canUnlockNext = allCorrect && withinTimeLimit && fastPerQuestion && !hasSlowQuestions && !hasSlowQuestionsInArray;
                            // Update progress for unlocking next difficulty
                            if (canUnlockNext && selectedTable && selectedDifficulty) {
                              const progressKey = `math-table-progress-${selectedTable}-${selectedDifficulty}`;
                              localStorage.setItem(progressKey, 'completed');
                              
                              // Update tableProgress state with accuracy and time information
                              const accuracy = Math.round((correctCountForCompletion / targetQuestionCount) * 100);
                              
                              setTableProgress(prev => ({
                                ...prev,
                                [selectedTable]: {
                                  ...prev[selectedTable],
                                  [selectedDifficulty]: {
                                    accuracy: accuracy,
                                    completed: true,
                                    timeElapsed: elapsedTime,
                                    avgTimePerQuestion: elapsedTime / targetQuestionCount,
                                    perfectPerformance: true
                                  }
                                }
                              }));
                              // Unlock next belt if current is completed with perfect conditions
                              if (canUnlockNext && selectedTable && selectedDifficulty) {
                                const difficultyOrder = ['white', 'yellow', 'green', 'blue', 'red', 'brown'];
                                const currentIndex = difficultyOrder.indexOf(selectedDifficulty);
                                const hasNextDifficulty = currentIndex < difficultyOrder.length - 1;
                                
                                if (hasNextDifficulty) {
                                  const nextDifficulty = difficultyOrder[currentIndex + 1];
                                  const nextKey = `math-table-progress-${selectedTable}-${nextDifficulty}`;
                                  localStorage.setItem(nextKey, 'unlocked');
                                }
                                
                                // Save current belt progress to localStorage
                                const currentKey = `math-table-progress-${selectedTable}-${selectedDifficulty}`;
                                localStorage.setItem(currentKey, JSON.stringify({
                                  accuracy: 100,
                                  completed: true,
                                  perfectPerformance: true
                                }));
                                
                                // Force update the tableProgress state to ensure DifficultyPicker sees the change
                                setTableProgress(prev => {
                                  const newProgress = {
                                    ...prev,
                                    [selectedTable]: {
                                      ...prev[selectedTable],
                                      [selectedDifficulty]: {
                                        ...prev[selectedTable]?.[selectedDifficulty],
                                        perfectPerformance: true
                                      }
                                    }
                                  };
                                  console.log(`${selectedDifficulty.toUpperCase()} BELT: Setting perfectPerformance to true`);
                                  console.log(`${selectedDifficulty.toUpperCase()} BELT: New tableProgress:`, newProgress);
                                  return newProgress;
                                });
                              }
                            }
                          } else {
                            // Not the last question - continue with next question
                            // NOTE: Don't increment totalQuestions here since the practice question
                            // is not a new quiz question - it's just review of the wrong answer
                            
                            setCurrentQuestion(newQuestion);
                            startQuestionTimer(); // Start timing this question
                            setLastQuestion(newQuestion.question);
                          }
                        } else {
                          // Wrong answer - show answer review popup
                          setShowSecondPopup(false);
                          setShowWrongAnswerPopup(true);
                        }
                      }}
                      className="bg-gray-200/70 border-2 border-gray-300/75 hover:bg-gray-300/90 text-gray-800 font-bold py-3 sm:py-4 md:py-5 lg:py-6 px-4 sm:px-8 md:px-16 lg:px-32 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg sm:text-xl md:text-2xl lg:text-4xl"
                    >
                      {answer}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        

    </div>
  );
};
  const handleResetProgress = () => {
    // Clear all localStorage progress data
    const keysToRemove = [
      'math-table-progress',
      'math-completed-sections',

      'math-badges',
      'math-daily-correct',
      'math-reaction-speed',
      'math-child-age',
      'avatarUrl',
      'math-last-quiz-day',
      'math-saved-quiz-state',
      'math-quiz-progress'
    ];
    
    // Remove all table-specific progress keys
    for (let i = 1; i <= 12; i++) {
      keysToRemove.push(`math-table-progress-${i}-white`);
      keysToRemove.push(`math-table-progress-${i}-yellow`);
      keysToRemove.push(`math-table-progress-${i}-green`);
      keysToRemove.push(`math-table-progress-${i}-blue`);
      keysToRemove.push(`math-table-progress-${i}-red`);
      keysToRemove.push(`math-table-progress-${i}-brown`);
    }
    
    // Remove all keys
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Reset all state variables
    setTableProgress({});
    setCompletedSections({
      addition: false,
      subtraction: false,
      multiplication: false,
      division: false
    });
    setChildAge('');
    setStudentReactionSpeed(1.0);
    
    // Reset quiz-related state
    setScore(0);
    setTotalQuestions(0);
    setShowResult(false);
    setAnswerFeedback(null);
    setIsAnimating(false);
    setElapsedTime(0);
    setQuizStartTime(null);
    setPausedTime(0);
    setIsTimerPaused(false);
    setSavedQuizState(null);
    setShowHint(false);
    setQuestionStartTime(Date.now());
    setShowLevelUp(false);
    setHintsUsed(0);
    setCorrectCount(0);
    setCorrectCountForCompletion(0);
    setWrongCount(0);
    setQuestionTimes([]);
    setVisualAidHistory([]);
    setAskedQuestions(new Set());
    setWrongQuestions(new Set());
    setSlowQuestions(new Set());
    setQuestionsWithPractice(new Set());
    setQuizProgress(0);
    setCurrentQuestion(null);
    setLastQuestion('');
    setRecentQuestions([]);
    setQuestionAlternator('medium');
    setShowWrongAnswerPopup(false);
    setWrongAnswerData(null);
    setWhiteBeltRandomNumber(null);
    setCorrectAnswerSelected(false);
    setShowCorrectText(false);
    setLastWhiteBeltNumber(null);
    
    // Reset session timer
    setSessionTimerActive(false);
    setSessionTimerStart(null);
    setSessionTimerPaused(false);
    setSessionTimerPauseStart(null);
    // Reset speed test data
    setSpeedTestNumbers([]);
    setCurrentSpeedTestIndex(-1);
    setSpeedTestStartTime(null);
    setSpeedTestTimes([]);
    setSpeedTestComplete(false);
    setSpeedTestPopupVisible(false);
    setSpeedTestPopupAnimation('animate-pop-in');
    setSpeedTestStarted(false);
    setSpeedTestCorrectCount(0);
    setSpeedTestShowTick(false);
    
    // Reset daily challenge
    setDailyChallengeQuestions([]);
    setCurrentChallengeIndex(0);
    setChallengeScore(0);
    setChallengeDone(false);
    setChallengeAnswerFeedback(null);
    setChallengeIsAnimating(false);
        
    // Reset to table picker page
    setCurrentPage('picker');
    
    // Hide difficulty picker
    setShowDifficultyPicker(false);
    
    // Reset selected difficulty
    setSelectedDifficulty(null);
    
    // Reset learning module states
    setShowLearningModule(false);
    setShowLearningQuestion(false);
    setLearningQuestionIndex(0);
    setShowLearningNextButton(false);
    
    setShowSettings(false);
  };
  const SettingsModal = ({ currentPage }) => {
    const theme = selectedTheme ? themeConfigs[selectedTheme.key || selectedTheme.id] : null;
    const [isClosingSettings, setIsClosingSettings] = useState(false);

    const handleCloseSettings = () => {
      setIsClosingSettings(true);
      setTimeout(() => {
        setShowSettings(false);
        setIsClosingSettings(false);
      }, 400); // Match animation duration
    };

    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in">
        <div 
          className={`rounded-2xl p-8 shadow-xl max-w-xs w-full flex flex-col items-center ${isClosingSettings ? 'animate-pop-out' : 'animate-pop-in'}`}
          style={{
            background: theme ? 
              `linear-gradient(135deg, ${theme.gradientStart || '#a18cd1'} 0%, ${theme.gradientEnd || '#fbc2eb'} 100%)` : 
              'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
            border: '4px solid white',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25), 0 0 0 2px rgba(255, 255, 255, 0.2) inset'
          }}
        >
          {/* Decorative elements matching theme */}
          {theme && theme.decorativeElement && (
            <div className="absolute -top-6 -right-6 text-4xl animate-bounce-slow">{theme.decorativeElement}</div>
          )}
          
          <h2 className="text-2xl font-bold mb-6 text-center font-baloo text-white drop-shadow-md">
            Settings
              </h2>
              
          {currentPage === 'picker' && (
            <>
              <button
                className="kid-btn bg-red-400 hover:bg-red-500 text-white mb-4 w-full transform transition-transform hover:scale-105"
                onClick={handleResetProgress}
                style={{
                  boxShadow: '0 4px 10px rgba(0,0,0,0.15), 0 -2px 0 rgba(255,255,255,0.3) inset'
                }}
              >
                Reset Progress
              </button>

            </>
          )}
          
          <button
            className="kid-btn bg-yellow-500 hover:bg-yellow-600 text-white mb-4 w-full transform transition-transform hover:scale-105"
            onClick={handleQuit}
            style={{
              boxShadow: '0 4px 10px rgba(0,0,0,0.15), 0 -2px 0 rgba(255,255,255,0.3) inset'
            }}
          >
            Quit
          </button>
          
          <button
            className="kid-btn bg-blue-400 hover:bg-blue-500 text-white w-full transform transition-transform hover:scale-105"
            onClick={handleCloseSettings}
            style={{
              boxShadow: '0 4px 10px rgba(0,0,0,0.15), 0 -2px 0 rgba(255,255,255,0.3) inset'
            }}
          >
            Back to Game
          </button>
              </div>
      </div>
    );
  };
  // Add a function to quit to name entry:
  const handleQuit = () => {
    setShowQuitModal(true);
  };
  const handleConfirmQuit = () => {
    setSessionTimerActive(false);
    setSessionTimerStart(null);
    
    // Save the current quiz state if we're in a quiz
    if (currentPage === 'quiz' && !showResult) {
      const currentElapsed = Math.round((Date.now() - quizStartTime) / 1000) + pausedTime;
      const quizState = {
        selectedTable,
        selectedDifficulty,
        currentQuestion,
        score,
        totalQuestions,
        hintsUsed,
        correctCount,
        wrongCount,
        questionTimes,
        visualAidHistory,
        elapsedTime: currentElapsed,
        pausedTime: currentElapsed,
        isTimerPaused: true
      };
      setSavedQuizState(quizState);
      setPausedTime(currentElapsed);
      setIsTimerPaused(true);
    }
    // Add animation to modal before closing
    const modalElement = document.querySelector('.bg-white.rounded-2xl');
    if (modalElement) {
      modalElement.classList.add('animate-pop-out');
      setTimeout(() => {
        setShowQuitModal(false);
        setScreen('start');
        setShowNameForm(true);
        setCurrentPage('picker');
        setShowThemePicker(false);
        setShowSettings(false);
        setSelectedTheme(null);
        
        // Clear the daily target flag when quitting
        // This will make the target modal show again when they return
        localStorage.removeItem('math-has-set-daily-target-today');
        // Also clear the "has shown modal" flag to ensure modal shows once after quitting
        localStorage.removeItem('math-has-shown-modal-today');
      }, 500);
    } else {
      setShowQuitModal(false);
      setScreen('start');
      setShowNameForm(true);
      setCurrentPage('picker');
      setShowThemePicker(false);
      setShowSettings(false);
      setSelectedTheme(null);
      
      // Clear the daily target flag when quitting
      // This will make the target modal show again when they return
      localStorage.removeItem('math-has-set-daily-target-today');
      // Also clear the "has shown modal" flag to ensure modal shows once after quitting
      localStorage.removeItem('math-has-shown-modal-today');
    }
  };
  const handleCancelQuit = () => {
    // Add animation to modal before closing
    const modalElement = document.querySelector('.bg-white.rounded-2xl');
    if (modalElement) {
      modalElement.classList.add('animate-pop-out');
      setTimeout(() => {
        setShowQuitModal(false);
      }, 500);
    } else {
      setShowQuitModal(false);
    }
  };
  // Add function to calculate table completion percentage:
  const getTablePercentage = (tableNumber) => {
    const progress = tableProgress[tableNumber] || {};
    let completedDifficulties = 0;
    
    ['white', 'yellow', 'green', 'blue', 'red', 'brown'].forEach(difficulty => {
      if (progress[difficulty]?.completed) {
        completedDifficulties += 1;
      }
    });
    
    return Math.round((completedDifficulties / 6) * 100); // 6 total difficulties
  };

  // Helper to get fluency label and stars based on avg time and accuracy
  const getFluencyStats = (avgTime, accuracy) => {
    if (accuracy >= 95 && avgTime < 2) return { label: 'Hyperfluent', stars: 3 };
    if (accuracy >= 90 && accuracy < 95 && avgTime >= 2 && avgTime < 3) return { label: 'Fluent', stars: 2 };
    if (accuracy >= 70 && accuracy < 90 && avgTime >= 3 && avgTime < 5) return { label: 'Practicing', stars: 1 };
    return { label: 'Getting Started', stars: 0 };
  };

  // Theme Picker Screen
  const ThemePicker = () => {
    // Only show 6 themes based on age
    const themeKeys = ageThemeMap(childAge || '5'); // Default to age 5 if not set yet
    const themes = themeKeys.map(key => ({ key, ...themeConfigs[key] }));
    const [themePickerMode, setThemePickerMode] = useState('slide'); // 'slide' or 'grid'
    const [currentThemeIdx, setCurrentThemeIdx] = useState(0);
    const currentTheme = themes[currentThemeIdx];
  return (
      <div
        className={`min-h-screen flex flex-col items-center ${themePickerMode === 'grid' ? 'justify-start overflow-y-auto' : 'justify-center overflow-hidden'}`}
        style={{
          background: 'linear-gradient(135deg, #23272f 0%, #18181b 60%, #111113 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          minHeight: '100vh',
          paddingTop: 'max(env(safe-area-inset-top), 1rem)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)',
        }}
      >
        {/* Back button to name form */}
        <button
          className="fixed z-50 bg-white/80 hover:bg-gray-200 text-gray-700 rounded-full p-2 shadow-lg border-2 border-gray-400 focus:outline-none transition-all duration-300 transform hover:scale-110 active:scale-95"
          style={{ 
            fontSize: 'clamp(1rem, 4vw, 1.5rem)', 
            borderWidth: '2px', 
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            top: 'max(env(safe-area-inset-top), 0.5rem)',
            left: 'max(env(safe-area-inset-left), 0.5rem)'
          }}
          onClick={handleBackToNameForm}
          aria-label="Back to Name and Avatar"
        >
          <FaArrowLeft size={24} />
        </button>
                        <h1 className="font-baloo text-white text-center drop-shadow-lg" style={{ fontSize: 'clamp(1.5rem, 6vw, 2.5rem)' }}>Choose Your Adventure!</h1>
        {/* Slide/Carousel Mode */}
        {themePickerMode === 'slide' && (
          <>
            <div className="flex flex-row items-center justify-center w-full mb-4" style={{ minHeight: 'clamp(200px, 40vh, 320px)' }}>
              <button
                className="kid-btn bg-yellow-300 hover:bg-yellow-400 text-white rounded-full mr-1"
                style={{ 
                  fontSize: '16px',
                  padding: '1px',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => setCurrentThemeIdx((currentThemeIdx - 1 + themes.length) % themes.length)}
                aria-label="Previous Adventure"
              >
                &#8592;
              </button>
              <div className="flex flex-col items-center justify-center" style={{ 
                minWidth: 'clamp(200px, 60vw, 640px)', 
                maxWidth: 'clamp(300px, 80vw, 840px)' 
              }}>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={currentTheme.image}
                      alt={currentTheme.key}
                      className="rounded-2xl object-contain shadow-2xl"
                      style={{ 
                        height: 'clamp(150px, 35vh, 520px)', 
                        maxWidth: 'clamp(300px, 80vw, 840px)'
                      }}
                    />
                  </div>
                  <span className="font-baloo text-white drop-shadow-lg text-center font-bold bg-black bg-opacity-50 px-3 py-2 rounded-2xl border-2 border-yellow-200 mt-2" style={{ 
                    fontSize: 'clamp(0.75rem, 3vw, 1.5rem)'
                  }}>{currentTheme.key.charAt(0).toUpperCase() + currentTheme.key.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                </div>
              </div>
              <button
                className="kid-btn bg-yellow-300 hover:bg-yellow-400 text-white rounded-full ml-1"
                style={{ 
                  fontSize: '16px',
                  padding: '1px',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => setCurrentThemeIdx((currentThemeIdx + 1) % themes.length)}
                aria-label="Next Adventure"
              >
                &#8594;
              </button>
            </div>
            <button
              className="kid-btn bg-green-400 hover:bg-green-500 text-white font-bold rounded-2xl mt-2"
              style={{ 
                padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem)',
                fontSize: 'clamp(0.875rem, 3vw, 1.25rem)'
              }}
              onClick={() => { 
                setSelectedTheme(currentTheme); 
                setScreen('main');
                setCurrentPage('picker');
                setShowThemePicker(false);
              }}
            >
              Choose
            </button>
          </>
        )}
        {/* Grid/Tile Mode */}
        {themePickerMode === 'grid' && (
          <div className="w-full flex flex-col items-center px-4 pt-4 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
              {themes.map(theme => (
                <button
                  key={theme.key}
                  onClick={() => { 
                    setSelectedTheme(theme); 
                    setScreen('main');
                    setCurrentPage('picker');
                    setShowThemePicker(false);
                  }}
                  className="flex flex-col items-center justify-center rounded-2xl shadow-lg focus:outline-none transition-all duration-200 text-yellow-900 hover:shadow-2xl hover:scale-105 bg-transparent p-0 w-full"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src={theme.image}
                        alt={theme.key}
                        className="rounded-2xl object-contain shadow-2xl"
                        style={{ 
                          height: '200px',
                          maxWidth: '100%'
                        }}
                      />
                    </div>
                    <span className="font-baloo text-white drop-shadow-lg text-center font-bold bg-black bg-opacity-50 px-3 py-2 rounded-2xl text-lg mt-2">
                      {theme.key.charAt(0).toUpperCase() + theme.key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </span>
                  </div>
                </button>
                      ))}
                    </div>
                  </div>
        )}
        {/* Toggle Icons */}
        <div className="fixed flex flex-row gap-2 z-50" style={{ 
          bottom: 'max(env(safe-area-inset-bottom), 0.5rem)',
          right: 'max(env(safe-area-inset-right), 0.5rem)'
        }}>
          <button
            className={`flex items-center justify-center rounded-full shadow-lg transition-all duration-200 focus:outline-none ${themePickerMode === 'slide' ? 'bg-yellow-400 text-white scale-110' : 'bg-gray-200 text-gray-700 opacity-70 hover:opacity-100'}`}
            style={{ padding: 'clamp(0.5rem, 2vw, 1rem)' }}
            onClick={() => setThemePickerMode('slide')}
            aria-label="Slide View"
          >
            <FaRegImages size={24} />
          </button>
          <button
            className={`flex items-center justify-center rounded-full shadow-lg transition-all duration-200 focus:outline-none ${themePickerMode === 'grid' ? 'bg-yellow-400 text-white scale-110' : 'bg-gray-200 text-gray-700 opacity-70 hover:opacity-100'}`}
            style={{ padding: 'clamp(0.5rem, 2vw, 1rem)' }}
            onClick={() => setThemePickerMode('grid')}
            aria-label="Grid View"
          >
            <FaThLarge size={24} />
          </button>
        </div>
      </div>
    );
  };
  // In QuizScreen, update answerRefs for each render
  useEffect(() => {
    setAnswerRefs((refs) =>
      Array(currentQuestion?.answers.length || 0)
        .fill()
        .map((_, i) => refs[i] || React.createRef())
    );
  }, [currentQuestion]);

  useEffect(() => {
    // Shuffle colors for each new question
    setShuffledAnswerColors(
      answerColors
        .map((c) => ({ c, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ c }) => c)
    );
  }, [currentQuestion]);

  // Save avatarUrl to localStorage when it changes
  useEffect(() => {
    if (avatarUrl) localStorage.setItem('avatarUrl', avatarUrl);
  }, [avatarUrl]);

  // Add a handler to go back to the name form
  const handleBackToThemePicker = () => {
    setShowThemePicker(true);
    setCurrentPage('picker');
  };
  const handleBackToNameForm = () => {
    setScreen('name');
    setShowNameForm(true);
    setShowThemePicker(false);
  };
  console.log('Selected theme:', selectedTheme);

  // Start speed test
  const startSpeedTest = () => {
    setSpeedTestStarted(true);
    setCurrentSpeedTestIndex(0);
    setSpeedTestTimes([]);
    setSpeedTestComplete(false);
    setSpeedTestStartTime(Date.now());
    
    // Play a sound to indicate start
    playSound('click');
  };

  // Handle speed test number click or key press
  const handleSpeedTestInput = (number) => {
    if (!speedTestStarted || speedTestComplete) return;
    
    const currentTime = Date.now();
    
    // Check if the input matches the current number
    if (number === speedTestNumbers[currentSpeedTestIndex]) {
      // Calculate reaction time
      const reactionTime = (currentTime - speedTestStartTime) / 1000;
      
      // Add to times array
      setSpeedTestTimes(prev => [...prev, reactionTime]);
      
      // Increment correct count
      const newCorrectCount = speedTestCorrectCount + 1;
      setSpeedTestCorrectCount(newCorrectCount);
      
      // Move to next number or complete the test
      if (newCorrectCount < 5) {
        setCurrentSpeedTestIndex(prev => prev + 1);
        setSpeedTestStartTime(Date.now()); // Reset start time for next number
        playSound('correct');
      } else {
        // Test complete
        completeSpeedTest();
      }
    } else {
      // Wrong number - add a penalty
      setSpeedTestTimes(prev => [...prev, 3.0]); // 3 second penalty
      playSound('wrong');
      
      // Move to next number but don't increment correct count
      setCurrentSpeedTestIndex(prev => prev + 1);
      setSpeedTestStartTime(Date.now()); // Reset start time for next number
    }
  };
  
  // Complete the speed test and calculate average reaction time
  const completeSpeedTest = () => {
    // Calculate average reaction time (only from correct answers)
    const avgTime = speedTestTimes.slice(0, 5).reduce((sum, time) => sum + time, 0) / 5;
    
    // Normalize between 0.5 and 1.5
    const normalizedSpeed = Math.max(0.5, Math.min(1.5, avgTime / 1.5));
    
    // Save to localStorage
    localStorage.setItem('math-reaction-speed', normalizedSpeed.toFixed(2));
    
    // Update state
    setStudentReactionSpeed(normalizedSpeed);
    setSpeedTestComplete(true);
    
    // Play completion sound
    playSound('complete');
    
    // Show tick animation
    setSpeedTestShowTick(true);
    
    // After showing results, animate out and hide speed test popup
    setTimeout(() => {
      setSpeedTestPopupAnimation('animate-pop-out');
      
      // After animation completes, hide speed test
      setTimeout(() => {
        setShowSpeedTest(false);
        setSpeedTestPopupVisible(false);
      }, 500); // Animation duration
    }, 3000); // Show results for longer
  };
  // Render the SpeedTest component
  const SpeedTestScreen = () => {
    // Set up keyboard event listener
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (!speedTestStarted || speedTestComplete) return;
        
        const key = parseInt(e.key);
        if (!isNaN(key) && key >= 1 && key <= 9) {
          handleSpeedTestInput(key);
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [speedTestNumbers, currentSpeedTestIndex, speedTestStartTime, speedTestComplete, speedTestStarted]);
    if (!speedTestPopupVisible) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
        <div className={`bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl max-w-md w-full flex flex-col items-center ${speedTestPopupAnimation} mx-2 sm:mx-4`}>
                <button
                  onClick={() => {
              setSpeedTestPopupAnimation('animate-pop-out');
              setTimeout(() => {
                setShowSpeedTest(false);
                setSpeedTestPopupVisible(false);
              }, 500);
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Close"
          >
            ×
                </button>
                
          <h1 className="text-2xl sm:text-3xl font-baloo text-blue-700 mb-3 sm:mb-4 drop-shadow-lg">Speed Calibration</h1>
          
          {speedTestComplete ? (
            <div className="text-center">
              <div className="relative text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 font-bold">
                <div className={`${speedTestShowTick ? 'animate-bounce' : ''}`}>🎮</div>
                {speedTestShowTick && (
                  <div className="absolute top-0 right-0 text-2xl sm:text-3xl md:text-4xl text-green-500 animate-scale-in">
                    ✓
                  </div>
                )}
              </div>
              <p className="text-lg sm:text-xl text-blue-800 mb-3 sm:mb-4">Great job!</p>
              <p className="text-base sm:text-lg text-blue-700 mb-4 sm:mb-6">Your speed has been calibrated.</p>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-1000" 
                  style={{ width: '100%' }}
                ></div>
              </div>
              <p className="text-blue-600 mb-2">
                {studentReactionSpeed < 0.8 ? "Super fast! 🚀" : 
                 studentReactionSpeed < 1.0 ? "Quick! ⚡" : 
                 studentReactionSpeed < 1.2 ? "Good pace! 👍" : "Steady! 🐢"}
              </p>
            </div>
          ) : !speedTestStarted ? (
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 font-bold">🎯</div>
              <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3 sm:mb-4">Let's Test Your Speed!</h2>
              <p className="text-base sm:text-lg text-blue-600 mb-6 sm:mb-8">
                You'll see 5 numbers one by one.<br/>
                Click or press the matching number as fast as you can!
              </p>
                <button
                onClick={startSpeedTest}
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-xl text-lg sm:text-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
                >
                Start Test
                </button>
              </div>
          ) : (
            <>
              <p className="text-base sm:text-lg text-blue-700 mb-3 sm:mb-4">
                Correct: {speedTestCorrectCount} of 5
              </p>
              
              <p className="text-base sm:text-lg text-blue-600 mb-4 sm:mb-6">
                Click or press the number:
              </p>
              
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 animate-bounce">
                {speedTestNumbers[currentSpeedTestIndex]}
            </div>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full max-w-xs">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <button
                    key={num}
                    className="bg-white hover:bg-blue-100 text-blue-700 font-bold text-lg sm:text-xl md:text-2xl rounded-lg p-2 sm:p-3 md:p-4 shadow-md transition-all border border-blue-200"
                    onClick={() => handleSpeedTestInput(num)}
                  >
                    {num}
                  </button>
                      ))}
          </div>
              
              <div className="mt-6 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(speedTestCorrectCount / 5) * 100}%` }}
                ></div>
                  </div>
            </>
        )}
      </div>
    </div>
  );
  };
  // Open speed test popup
  const openSpeedTest = () => {
    // Generate more random numbers than needed (we'll use as many as required)
    const numbers = Array.from({ length: 15 }, () => Math.floor(Math.random() * 9) + 1);
    setSpeedTestNumbers(numbers);
    setCurrentSpeedTestIndex(-1);
    setSpeedTestTimes([]);
    setSpeedTestComplete(false);
    setSpeedTestStartTime(null);
    setSpeedTestStarted(false);
    setSpeedTestCorrectCount(0);
    setSpeedTestShowTick(false);
    setSpeedTestPopupVisible(true);
    setSpeedTestPopupAnimation('animate-pop-in');
    setShowSpeedTest(true);
    
    // Play a sound to indicate opening
    playSound('click');
  };

  // New StartScreen component
  const StartScreen = () => {
    // Check if user already has name and age saved
    const savedName = localStorage.getItem('math-child-name');
    const savedAge = localStorage.getItem('math-child-age');
    
    const handleStartClick = () => {
      setIsAnimating(true);
      // Reset pre-test state
      setShowPreTestPopup(false);
      setPreTestSection('intro');
      setCompletedSections({ addition: false, subtraction: false, multiplication: false, division: false });
      setPreTestCurrentQuestion(0);
      setPreTestScore(0);
      setScreen('name');
    };
    
    // Component definitions
    const FlyingPoints = ({ from, to, value }) => {
      const [progress, setProgress] = useState(0);
      useEffect(() => {
        let start;
        let frame;
        function animate(ts) {
          if (!start) start = ts;
          const elapsed = ts - start;
          const pct = Math.min(elapsed / 2000, 1); // 2 seconds
          setProgress(pct);
          if (pct < 1) {
            frame = requestAnimationFrame(animate);
          }
        }
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
      }, []);
      // Interpolate position
      const x = from.x + (to.x - from.x) * progress;
      const y = from.y + (to.y - from.y) * progress;
      // No scaling
      const scale = 1;
      const opacity = 1 - 0.2 * progress;
      return (
        <div
          style={{
            position: 'absolute',
            left: x,
            top: y,
            transform: `translate(-50%, -50%) scale(${scale})`,
            opacity,
            transition: 'none',
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: 48, minWidth: 60, textAlign: 'center', filter: 'drop-shadow(0 0 8px gold)' }}>
            {value}
          </div>
        </div>
      );
    };

    // DailyStatsCounter component
    const DailyStatsCounter = ({ style }) => {
      const [dailyCorrect, setDailyCorrect] = useState(0);
      useEffect(() => {
        const getTodayString = () => new Date().toLocaleDateString();
        const updateCount = () => {
          const today = getTodayString();
          const count = parseInt(localStorage.getItem(`math-daily-correct-${today}`) || '0');
          setDailyCorrect(count);
        };
        updateCount();
        const intervalId = setInterval(updateCount, 60000);
        return () => clearInterval(intervalId);
      }, []);
      return (
        <div style={style}>
          <div className="bg-blue-500 text-white font-bold rounded-lg sm:rounded-xl shadow-lg px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 flex items-center min-w-[150px] sm:min-w-[180px] md:min-w-[200px] min-h-[40px] sm:min-h-[50px] md:min-h-[60px]">
            <div className="mr-1 sm:mr-2 md:mr-3 text-lg sm:text-xl md:text-2xl">📝</div>
            <div>
              <div className="text-xs sm:text-xs md:text-sm opacity-80">Today's Score</div>
              <div className="text-sm sm:text-base md:text-lg lg:text-xl">{dailyCorrect} correct</div>
            </div>
          </div>
        </div>
      );
    };

    // LiquidTimer: visually engaging timer with a liquid fill effect
    const LiquidTimer = ({ timeLeft, totalTime }) => {
      // Calculate fill percentage (0 to 100) - for count up timer, we'll show the elapsed time
      const elapsed = timeLeft || 0;
      return (
        <div className="flex flex-col items-center justify-center" style={{ minWidth: 'clamp(60px, 15vw, 100px)' }}>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-300 rounded-full overflow-hidden shadow-lg border-2 sm:border-3 md:border-4 border-gray-500">
            {/* Clock face background */}
            <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
            
            {/* Clock numbers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-600 drop-shadow-lg select-none">
                {Math.min(elapsed, 999)}
              </div>
            </div>
          </div>
        </div>
      );
    };
    // Real-time session timer (bottom left, plain text, no CSS/overlay)
    const SessionTimer = ({ isActive, startTime, style, isPaused, pauseStartTime, accumulatedTime = 0 }) => {
      const [elapsed, setElapsed] = useState(0);
      const [pausedElapsed, setPausedElapsed] = useState(0);
      
      useEffect(() => {
        if (!isActive || !startTime) return;
        
        const update = () => {
          if (isPaused && pauseStartTime) {
            // When paused, show the time that was accumulated before pause
            const timeBeforePause = Math.floor((pauseStartTime - startTime) / 1000);
            setPausedElapsed(timeBeforePause);
          } else {
            // When active, calculate current elapsed time
            const currentElapsed = Math.floor((Date.now() - startTime) / 1000);
            setElapsed(currentElapsed);
          }
        };
        
        update();
        const interval = setInterval(update, 1000); // update every second
        return () => clearInterval(interval);
      }, [isActive, startTime, isPaused, pauseStartTime]);
      
      // Use paused time if paused, otherwise use current elapsed time, plus accumulated time
      const currentTime = isPaused ? pausedElapsed : elapsed;
      const displayTime = accumulatedTime + currentTime;
      const hours = Math.floor(displayTime / 3600);
      const mins = Math.floor((displayTime % 3600) / 60);
      const secs = displayTime % 60;
      
      return (
        <div style={style}>
          <div className={`text-white font-bold rounded-lg sm:rounded-xl shadow-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 flex items-center min-w-[200px] sm:min-w-[240px] md:min-w-[280px] min-h-[60px] sm:min-h-[75px] md:min-h-[90px] ${!isActive && displayTime === 0 ? 'bg-gray-400' : isPaused ? 'bg-gray-500' : 'bg-blue-500'}`}>
            <div className="mr-2 sm:mr-3 md:mr-4 text-xl sm:text-2xl md:text-3xl">{!isActive ? '⏰' : isPaused ? '⏸️' : '⏰'}</div>
            <div>
              <div className="text-xs sm:text-sm md:text-base opacity-80">Time Today</div>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl">{hours.toString().padStart(2, '0')}:{mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}</div>
              {!isActive && displayTime === 0 && <div className="text-xs sm:text-sm opacity-70">Not Started</div>}
              {isActive && isPaused && <div className="text-xs sm:text-sm opacity-70">Paused</div>}
            </div>
          </div>
        </div>
      );
    };
  return (
      <div
        className="flex flex-col items-center justify-center relative landscape-optimized portrait-optimized ios-notch overflow-hidden"
        style={{
          width: '100%',
          height: '100vh',
          minHeight: '100vh',
          paddingTop: 'max(env(safe-area-inset-top), 1rem)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)',
          paddingLeft: 'max(env(safe-area-inset-left), 0.5rem)',
          paddingRight: 'max(env(safe-area-inset-right), 0.5rem)',
          backgroundImage: "url('/night_sky_landscape.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Clock animation background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe
            src="/clock-logo.html"
            title="Clock Logo Animation"
            width="100%"
            height="100%"
            style={{
              border: 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        </div>
        
        {/* Game-style content overlay */}
        <div className="flex flex-col items-center justify-center w-full h-full relative z-10 px-2 sm:px-4" style={{ userSelect: 'none' }}>
          {/* Spacer for MATHNOW text in the image */}
          <div style={{ height: 'clamp(15vh, 20vw, 30vh)' }} />
          
          {/* Buttons positioned at 5% from bottom */}
          <div className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 sm:gap-6">
            <div className="px-2 sm:px-4">
              <button
                className="text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold"
                style={{ 
                  fontFamily: 'Arial, sans-serif',
                  letterSpacing: '0.05em',
                  fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)'
                }}
                inputMode="none"
                tabIndex="-1"
              >
                Version 1.92
              </button>
            </div>
            
            {/* Start button */}
            <div className="px-2 sm:px-4">
              <button
                onClick={handleStartClick}
                className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                disabled={isAnimating}
                inputMode="none"
                tabIndex="-1"
              >
                Start
              </button>
            </div>
          </div>
        </div>
    </div>
    );
  };

  // Add sessionActive state to App
  const [sessionActive, setSessionActive] = useState(false);
  useEffect(() => {
    if (currentPage === 'picker') setSessionActive(true);
    else setSessionActive(false);
  }, [currentPage]);

  const [sessionTimerActive, setSessionTimerActive] = useState(false);
  const [sessionTimerStart, setSessionTimerStart] = useState(null);
  const [sessionTimerPaused, setSessionTimerPaused] = useState(false);
  const [sessionTimerPauseStart, setSessionTimerPauseStart] = useState(null);
  const [sessionTimerAccumulated, setSessionTimerAccumulated] = useState(0);

  // In App component, after isAnimating is defined:
  useEffect(() => {
    if (screen === 'start') setIsAnimating(false);
  }, [screen]);
  // Reset accumulated time at the start of each new day
  useEffect(() => {
    const today = new Date().toDateString();
    const lastTimerDay = localStorage.getItem('math-timer-last-day');
    
    if (lastTimerDay !== today) {
      // It's a new day, reset accumulated time
      setSessionTimerAccumulated(0);
      localStorage.setItem('math-timer-last-day', today);
    } else {
      // Restore accumulated time from localStorage
      const savedAccumulated = localStorage.getItem('math-timer-accumulated');
      if (savedAccumulated) {
        setSessionTimerAccumulated(parseInt(savedAccumulated));
      }
    }
  }, []);

  // Save accumulated time to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('math-timer-accumulated', sessionTimerAccumulated.toString());
  }, [sessionTimerAccumulated]);
  return (
    <div className="ios-notch safe-area-top safe-area-bottom">
      {screen === 'start' && <StartScreen />}
      {screen === 'theme' && <ThemePicker />}
      {screen === 'name' && <NameForm />}

      {screen === 'main' && (
        <div
          className="App min-h-screen w-full relative landscape-optimized portrait-optimized"
          style={{
            background: 'linear-gradient(135deg, #23272f 0%, #18181b 60%, #111113 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'background 0.5s ease',
          }}
        >
          {/* Floating stars for playful background 
          <span className="kid-bg-star star1">⭐️</span>
          <span className="kid-bg-star star2">🌟</span>
          <span className="kid-bg-star star3">✨</span>
          <span className="kid-bg-star star4">⭐️</span>
          <span className="kid-bg-star star5">🌟</span> */}
          
          {/* Settings button */}
          <button
            className="fixed top-4 right-4 z-50 bg-white/80 hover:bg-gray-200 text-gray-700 rounded-full p-3 shadow-lg border-4 border-gray-400 focus:outline-none transition-all duration-300 transform hover:scale-110 active:scale-95"
            style={{ fontSize: '2rem', borderWidth: '4px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
            onClick={() => setShowSettings(true)}
            aria-label="Settings"
          >
            <FaCog />
          </button>
          
          {/* Main content based on current page */}
          {showThemePicker ? <ThemePicker /> : 
          currentPage === 'picker' ? <TablePicker sessionTimerActive={sessionTimerActive} sessionTimerStart={sessionTimerStart} sessionTimerPaused={sessionTimerPaused} sessionTimerPauseStart={sessionTimerPauseStart} /> :
          currentPage === 'difficulty' ? <DifficultyPicker sessionTimerActive={sessionTimerActive} sessionTimerStart={sessionTimerStart} sessionTimerPaused={sessionTimerPaused} sessionTimerPauseStart={sessionTimerPauseStart} /> :
          <QuizScreen elapsedTime={elapsedTime} totalTime={30} sessionTimerActive={sessionTimerActive} sessionTimerStart={sessionTimerStart} sessionTimerPaused={sessionTimerPaused} sessionTimerPauseStart={sessionTimerPauseStart} />}
          

          
          {/* Modals */}
          {showSettings && (
            <div className="animate-fade-in fixed inset-0 z-50">
              <SettingsModal currentPage={currentPage} />
              </div>
          )}
          
          
          {/* Quit confirmation modal */}
          {showQuitModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in">
              <div className="bg-white rounded-2xl p-8 shadow-lg max-w-xs w-full flex flex-col items-center animate-pop-in">
                <h2 className="text-xl font-bold mb-4">Are you sure you want to quit?</h2>
                <button
                  className="kid-btn bg-red-400 hover:bg-red-500 text-white mb-4"
                  onClick={handleConfirmQuit}
                >
                  Quit
                </button>
                <button
                  className="kid-btn bg-gray-300 hover:bg-gray-400 text-gray-800"
                  onClick={handleCancelQuit}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          {/* Speed test popup */}
          {showSpeedTest && <SpeedTestScreen />}
          
          {/* Learning Module Popup */}
          {showLearningModule && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 safe-area-top safe-area-bottom p-2 sm:p-4">
              <div className="bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm sm:max-w-md w-full mx-2 sm:mx-4 border border-blue-200/30 popup-zoom-in">
                <div className="text-center mb-6">
                                                    {(pendingDifficulty === 'white' || pendingDifficulty === 'yellow' || pendingDifficulty === 'green' || pendingDifficulty === 'blue' || pendingDifficulty === 'red' || pendingDifficulty === 'brown') ? (
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-green-600 mb-4">
                                      {
                                      pendingDifficulty === 'white' ? (
                                        <>
                                          {learningQuestionIndex === 0 ? (
                                            <div>
                                              {selectedTable === 1 ? '0 + 0 = 0' :
                                              selectedTable === 2 ? '1 + 1 = 2' : 
                                              selectedTable === 3 ? '0 + 6 = 6' : 
                                              selectedTable === 4 ? '1 + 6 = 7' :
                                              selectedTable === 5 ? '2 + 6 = 8' :
                                              selectedTable === 6 ? '3 + 6 = 9' :
                                              '0 + 0 = 0'
                                              }
                                              </div>
                                          ) : (
                                            <div>
                                              {selectedTable === 3 ? '6 + 0 = 6' : 
                                              selectedTable === 4 ? '6 + 1 = 7' :
                                              selectedTable === 5 ? '6 + 2 = 8' :
                                              selectedTable === 6 ? '6 + 3 = 9' :
                                              '0 + 0 = 0'
                                              }
                                              </div>
                                          )}
                                        </>
                                      ) : pendingDifficulty === 'yellow' ? (
                                        <>
                                          {learningQuestionIndex === 0 ? (
                                            <div>
                                              {selectedTable === 1 ? '0 + 1 = 1' :
                                              selectedTable === 2 ? '1 + 2 = 3' : 
                                              selectedTable === 3 ? '0 + 7 = 7' : 
                                              selectedTable === 4 ? '1 + 7 = 8' :
                                              selectedTable === 5 ? '2 + 7 = 9' :
                                              selectedTable === 6 ? '3 + 7 = 10' :
                                              '0 + 1 = 1'
                                              }
                                              </div>
                                          ) : (
                                            <div>
                                              {selectedTable === 1 ? '1 + 0 = 1' :
                                              selectedTable === 2 ? '2 + 1 = 3' : 
                                              selectedTable === 3 ? '7 + 0 = 7' : 
                                              selectedTable === 4 ? '7 + 1 = 8' :
                                              selectedTable === 5 ? '7 + 2 = 9' :
                                              selectedTable === 6 ? '7 + 3 = 10' :
                                              '1 + 0 = 1'}
                                              </div>
                                          )}
                                        </>
                                      ) : pendingDifficulty === 'green' ? (
                                        <>
                                          {learningQuestionIndex === 0 ? (
                                            <div>
                                              {selectedTable === 1 ? '0 + 2 = 2' :
                                              selectedTable === 2 ? '1 + 3 = 4' : 
                                              selectedTable === 3 ? '0 + 8 = 8' : 
                                              selectedTable === 4 ? '1 + 8 = 9' :
                                              selectedTable === 5 ? '2 + 8 = 10' :
                                              selectedTable === 6 ? '4 + 4 = 8' :
                                              '0 + 2 = 2'}</div>
                                          ) : (
                                            <div>
                                              {selectedTable === 1 ? '2 + 0 = 2' :
                                              selectedTable === 2 ? '3 + 1 = 4' : 
                                              selectedTable === 3 ? '8 + 0 = 8' : 
                                              selectedTable === 4 ? '8 + 1 = 9' :
                                              selectedTable === 5 ? '8 + 2 = 10' :
                                              '2 + 0 = 2'
                                              }</div>
                                          )}
                                        </>
                                      ) : pendingDifficulty === 'blue' ? (
                                        <>
                                          {learningQuestionIndex === 0 ? (
                                            <div>{selectedTable === 2 ? '1 + 4 = 5' : 
                                              selectedTable === 3 ? '0 + 9 = 9' : 
                                              selectedTable === 4 ? '1 + 9 = 10' :
                                              selectedTable === 5 ? '3 + 3 = 6' :
                                              selectedTable === 6 ? '4 + 5 = 9' :
                                              '0 + 3 = 3' 
                                              }</div>
                                          ) : (
                                            <div>{selectedTable === 2 ? '4 + 1 = 5' : 
                                              selectedTable === 3 ? '9 + 0 = 9' : 
                                              selectedTable === 4 ? '9 + 1 = 10' :
                                              selectedTable === 6 ? '5 + 4 = 9' :
                                              '3 + 0 = 3'}</div>
                                          )}
                                        </>
                                      ) : pendingDifficulty === 'red' ? (
                                            <>
                                              {learningQuestionIndex === 0 ? (
                                            <div>{selectedTable === 1 ? '0 + 4 = 4' :
                                              selectedTable === 2 ? '2 + 2 = 4' : 
                                              selectedTable === 3 ? '0 + 10 = 10' :
                                              selectedTable === 4 ? '2 + 4 = 6' :
                                              selectedTable === 5 ? '3 + 4 = 7' :
                                              selectedTable === 6 ? '4 + 6 = 10' :
                                              '0 + 4 = 4'}</div>
                                          ) : (
                                              <div>{selectedTable === 1 ? '4 + 0 = 4' :
                                              selectedTable === 2 ? '2 + 2 = 4' :
                                              selectedTable === 3 ? '10 + 0 = 10' : 
                                              selectedTable === 4 ? '4 + 2 = 6' :
                                              selectedTable === 5 ? '4 + 3 = 7' :
                                              selectedTable === 6 ? '6 + 4 = 10' :
                                              '4 + 0 = 4'}</div>
                                          )}
                                        </>
                                      ) : pendingDifficulty === 'brown' ? (
                                        <>
                                          {learningQuestionIndex === 0 ? (
                                            <div>{selectedTable === 2 ? '2 + 3 = 5' : 
                                              selectedTable === 3 ? '1 + 5 = 6' :
                                              selectedTable === 4 ? '2 + 5 = 7' :
                                              selectedTable === 5 ? '3 + 5 = 8' :
                                              selectedTable === 6 ? '5 + 5 = 10' :
                                              '0 + 5 = 5'}</div>
                                          ) : (
                                            <div>{selectedTable === 2 ? '3 + 2 = 5' :
                                              selectedTable === 3 ? '5 + 1 = 6' : 
                                              selectedTable === 4 ? '5 + 2 = 7' :
                                              selectedTable === 5 ? '5 + 3 = 8' :
                                              '5 + 0 = 5'}</div>
                                          )}
                                        </>
                                      ) : null}
                                    </div>
                                  ) : (
                                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-green-600 mb-4 whitespace-pre-line">
                                      {pendingDifficulty === 'white' && selectedTable === 1 ? (
                                        // Level 1 white belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '0 + 0 = 0' : '0 + 0 = 0'
                                      ) : pendingDifficulty === 'yellow' && selectedTable === 1 ? (
                                        // Level 1 yellow belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '0 + 1 = 1' : '1 + 0 = 1'
                                      ) : pendingDifficulty === 'green' && selectedTable === 1 ? (
                                        // Level 1 green belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '0 + 2 = 2' : '2 + 0 = 2'
                                      ) : pendingDifficulty === 'blue' && selectedTable === 1 ? (
                                        // Level 1 blue belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '0 + 3 = 3' : '3 + 0 = 3'
                                      ) : pendingDifficulty === 'red' && selectedTable === 1 ? (
                                        // Level 1 red belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '0 + 4 = 4' : '4 + 0 = 4'
                                      ) : pendingDifficulty === 'brown' && selectedTable === 1 ? (
                                        // Level 1 brown belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '0 + 5 = 5' : '5 + 0 = 5'
                                      ) : pendingDifficulty === 'white' && selectedTable === 2 ? (
                                        // Level 2 white belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '1 + 1 = 2' : '1 + 1 = 2'
                                      ) : pendingDifficulty === 'yellow' && selectedTable === 2 ? (
                                        // Level 2 yellow belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '1 + 2 = 3' : '2 + 1 = 3'
                                      ) : pendingDifficulty === 'green' && selectedTable === 2 ? (
                                        // Level 2 green belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '1 + 3 = 4' : '3 + 1 = 4'
                                      ) : pendingDifficulty === 'blue' && selectedTable === 2 ? (
                                        // Level 2 blue belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '1 + 4 = 5' : '4 + 1 = 5'
                                      ) : pendingDifficulty === 'red' && selectedTable === 2 ? (
                                        // Level 2 red belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '2 + 2 = 4' : '2 + 2 = 4'
                                      ) : pendingDifficulty === 'brown' && selectedTable === 2 ? (
                                        // Level 2 brown belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '2 + 3 = 5' : '3 + 2 = 5'
                                      ) : pendingDifficulty === 'white' && selectedTable === 3 ? (
                                        // Level 3 white belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '0 + 6 = 6' : '6 + 0 = 6'
                                      ) : pendingDifficulty === 'yellow' && selectedTable === 3 ? (
                                        // Level 3 yellow belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '0 + 7 = 7' : '7 + 0 = 7'
                                      ) : pendingDifficulty === 'green' && selectedTable === 3 ? (
                                        // Level 3 green belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '0 + 8 = 8' : '8 + 0 = 8'
                                      ) : pendingDifficulty === 'blue' && selectedTable === 3 ? (
                                        // Level 3 blue belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '0 + 9 = 9' : '9 + 0 = 9'
                                      ) : pendingDifficulty === 'red' && selectedTable === 3 ? (
                                        // Level 3 red belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '0 + 10 = 10' : '10 + 0 = 10'
                                      ) : pendingDifficulty === 'brown' && selectedTable === 3 ? (
                                        // Level 3 brown belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '1 + 5 = 6' : '5 + 1 = 6'
                                      ) : pendingDifficulty === 'white' && selectedTable === 4 ? (
                                        // Level 4 white belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '1 + 6 = 7' : '6 + 1 = 7'
                                      ) : pendingDifficulty === 'yellow' && selectedTable === 4 ? (
                                        // Level 4 yellow belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '1 + 7 = 8' : '7 + 1 = 8'
                                      ) : pendingDifficulty === 'green' && selectedTable === 4 ? (
                                        // Level 4 green belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '1 + 8 = 9' : '8 + 1 = 9'
                                      ) : pendingDifficulty === 'blue' && selectedTable === 4 ? (
                                        // Level 4 blue belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '1 + 9 = 10' : '9 + 1 = 10'
                                      ) : pendingDifficulty === 'red' && selectedTable === 4 ? (
                                        // Level 4 red belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '2 + 4 = 6' : '4 + 2 = 6'
                                      ) : pendingDifficulty === 'brown' && selectedTable === 4 ? (
                                        // Level 4 brown belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '2 + 5 = 7' : '5 + 2 = 7'
                                      ) : pendingDifficulty === 'white' && selectedTable === 5 ? (
                                        // Level 5 white belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '2 + 6 = 8' : '6 + 2 = 8'
                                      ) : pendingDifficulty === 'yellow' && selectedTable === 5 ? (
                                        // Level 5 yellow belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '2 + 7 = 9' : '7 + 2 = 9'
                                      ) : pendingDifficulty === 'green' && selectedTable === 5 ? (
                                        // Level 5 green belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '2 + 8 = 10' : '8 + 2 = 10'
                                      ) : pendingDifficulty === 'blue' && selectedTable === 5 ? (
                                        // Level 5 blue belt: show different facts based on question index
                                         '3 + 3 = 6'
                                      ) : pendingDifficulty === 'red' && selectedTable === 5 ? (
                                        // Level 5 red belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '3 + 4 = 7' : '4 + 3 = 7'
                                      ) : pendingDifficulty === 'brown' && selectedTable === 5 ? (
                                        // Level 5 brown belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '3 + 5 = 8' : '5 + 3 = 8'
                                      ) : pendingDifficulty === 'white' && selectedTable === 6 ? (
                                        // Level 6 white belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '3 + 6 = 9' : '6 + 3 = 9'
                                      ) : pendingDifficulty === 'yellow' && selectedTable === 6 ? (
                                        // Level 6 yellow belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '3 + 7 = 10' : '7 + 3 = 10'
                                      ) : pendingDifficulty === 'green' && selectedTable === 6 ? (
                                        // Level 6 green belt: show different facts based on question index
                                        '4 + 4 = 8'
                                      ) : pendingDifficulty === 'blue' && selectedTable === 6 ? (
                                        // Level 6 blue belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '4 + 5 = 9' : '5 + 4 = 9'
                                      ) : pendingDifficulty === 'red' && selectedTable === 6 ? (
                                        // Level 6 red belt: show different facts based on question index
                                        learningQuestionIndex === 0 ? '4 + 6 = 10' : '6 + 4 = 10'
                                      ) : pendingDifficulty === 'brown' && selectedTable === 6 ? (
                                        // Level 6 brown belt: show different facts based on question index
                                        '5 + 5 = 10'
                                      ) : (
                                        learningModuleContent
                                      )}
                                    </div>
                                    
                                  )}
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-gray-300 text-gray-700 font-bold py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base shadow-lg"
                    onClick={() => {
                      if (pendingDifficulty === 'white') {
                        // White belt practice questions lookup table
                        const whiteBeltQuestions = {
                          1: { // Level 1
                            0: { question: '0 + 0', answer: 0, answers: [0, 1, 2, 3] }
                          },
                          2: { // Level 2
                            0: { question: '1 + 1', answer: 2, answers: [1, 2, 3, 4] }
                          },
                          3: { // Level 3
                            0: { question: '0 + 6', answer: 6, answers: [5, 6, 7, 8] },
                            1: { question: '6 + 0', answer: 6, answers: [5, 6, 7, 8] }
                          },
                          4: { // Level 4
                            0: { question: '1 + 6', answer: 7, answers: [6, 7, 8, 9] },
                            1: { question: '6 + 1', answer: 7, answers: [6, 7, 8, 9] }
                          },
                          5: { // Level 5
                            0: { question: '2 + 6', answer: 8, answers: [7, 8, 9, 10] },
                            1: { question: '6 + 2', answer: 8, answers: [7, 8, 9, 10] }
                          },
                          6: { // Level 6
                            0: { question: '3 + 6', answer: 9, answers: [8, 9, 10, 11] },
                            1: { question: '6 + 3', answer: 9, answers: [8, 9, 10, 11] }
                          }
                        };

                        const currentQuestion = whiteBeltQuestions[selectedTable]?.[learningQuestionIndex];
                        if (currentQuestion) {
                        const question = {
                            question: currentQuestion.question,
                            correctAnswer: currentQuestion.answer,
                            answers: currentQuestion.answers
                        };
                        setLearningQuestion(question);
                          setLearningQuestionIndex(learningQuestionIndex);
                        setShowLearningModule(false);
                        setShowLearningQuestion(true);
                        }
                      } else if (pendingDifficulty === 'yellow') {
                        // Yellow belt practice questions lookup table
                        const yellowBeltQuestions = {
                          1: { // Level 1
                            0: { question: '0 + 1', answer: 1, answers: [0, 1, 2, 3] },
                            1: { question: '1 + 0', answer: 1, answers: [0, 1, 2, 3] }
                          },
                          2: { // Level 2
                            0: { question: '1 + 2', answer: 3, answers: [2, 3, 4, 5] },
                            1: { question: '2 + 1', answer: 3, answers: [2, 3, 4, 5] }
                          },
                          3: { // Level 3
                            0: { question: '0 + 7', answer: 7, answers: [6, 7, 8, 9] },
                            1: { question: '7 + 0', answer: 7, answers: [6, 7, 8, 9] }
                          },
                          4: { // Level 4
                            0: { question: '1 + 7', answer: 8, answers: [7, 8, 9, 10] },
                            1: { question: '7 + 1', answer: 8, answers: [7, 8, 9, 10] }
                          },
                          5: { // Level 5
                            0: { question: '2 + 7', answer: 9, answers: [8, 9, 10, 11] },
                            1: { question: '7 + 2', answer: 9, answers: [8, 9, 10, 11] }
                          },
                          6: { // Level 6
                            0: { question: '3 + 7', answer: 10, answers: [9, 10, 11, 12] },
                            1: { question: '7 + 3', answer: 10, answers: [9, 10, 11, 12] }
                          }
                        };

                        const currentQuestion = yellowBeltQuestions[selectedTable]?.[learningQuestionIndex];
                        if (currentQuestion) {
                              const question = {
                            question: currentQuestion.question,
                            correctAnswer: currentQuestion.answer,
                            answers: currentQuestion.answers
                              };
                              setLearningQuestion(question);
                          setLearningQuestionIndex(learningQuestionIndex);
                              setShowLearningModule(false);
                              setShowLearningQuestion(true);
                            }
                      } else if (pendingDifficulty === 'green') {
                            // Green belt practice questions lookup table
                        const greenBeltQuestions = {
                          1: { // Level 1
                            0: { question: '0 + 2', answer: 2, answers: [1, 2, 3, 4] },
                            1: { question: '2 + 0', answer: 2, answers: [1, 2, 3, 4] }
                          },
                          2: { // Level 2
                            0: { question: '1 + 3', answer: 4, answers: [3, 4, 5, 6] },
                            1: { question: '3 + 1', answer: 4, answers: [3, 4, 5, 6] }
                          },
                          3: { // Level 3
                            0: { question: '0 + 8', answer: 8, answers: [7, 8, 9, 10] },
                            1: { question: '8 + 0', answer: 8, answers: [7, 8, 9, 10] }
                          },
                          4: { // Level 4
                            0: { question: '1 + 8', answer: 9, answers: [8, 9, 10, 11] },
                            1: { question: '8 + 1', answer: 9, answers: [8, 9, 10, 11] }
                          },
                          5: { // Level 5
                            0: { question: '2 + 8', answer: 10, answers: [9, 10, 11, 12] },
                            1: { question: '8 + 2', answer: 10, answers: [9, 10, 11, 12] }
                          },
                          6: { // Level 6
                            0: { question: '4 + 4', answer: 8, answers: [7, 8, 9, 10] }
                          }
                        };

                        const currentQuestion = greenBeltQuestions[selectedTable]?.[learningQuestionIndex];
                        if (currentQuestion) {
                              const question = {
                            question: currentQuestion.question,
                            correctAnswer: currentQuestion.answer,
                            answers: currentQuestion.answers
                              };
                              setLearningQuestion(question);
                          setLearningQuestionIndex(learningQuestionIndex);
                              setShowLearningModule(false);
                              setShowLearningQuestion(true);
                            }
                      } else if (pendingDifficulty === 'blue') {
                        // Blue belt practice questions lookup table
                        const blueBeltQuestions = {
                          1: { // Level 1
                            0: { question: '0 + 3', answer: 3, answers: [2, 3, 4, 5] },
                            1: { question: '3 + 0', answer: 3, answers: [2, 3, 4, 5] }
                          },
                          2: { // Level 2
                            0: { question: '1 + 4', answer: 5, answers: [4, 5, 6, 7] },
                            1: { question: '4 + 1', answer: 5, answers: [4, 5, 6, 7] }
                          },
                          3: { // Level 3
                            0: { question: '0 + 9', answer: 9, answers: [8, 9, 10, 11] },
                            1: { question: '9 + 0', answer: 9, answers: [8, 9, 10, 11] }
                          },
                          4: { // Level 4
                            0: { question: '1 + 9', answer: 10, answers: [9, 10, 11, 12] },
                            1: { question: '9 + 1', answer: 10, answers: [9, 10, 11, 12] }
                          },
                          5: { // Level 5
                            0: { question: '3 + 3', answer: 6, answers: [5, 6, 7, 8] }      
                          },
                          6: { // Level 6
                            0: { question: '4 + 5', answer: 9, answers: [8, 9, 10, 11] },
                            1: { question: '5 + 4', answer: 9, answers: [8, 9, 10, 11] }
                          }
                        };

                        const currentQuestion = blueBeltQuestions[selectedTable]?.[learningQuestionIndex];
                        if (currentQuestion) {
                              const question = {
                            question: currentQuestion.question,
                            correctAnswer: currentQuestion.answer,
                            answers: currentQuestion.answers
                              };
                              setLearningQuestion(question);
                          setLearningQuestionIndex(learningQuestionIndex);
                              setShowLearningModule(false);
                              setShowLearningQuestion(true);
                            }
                      } else if (pendingDifficulty === 'red') {
                        // Red belt practice questions lookup table
                        const redBeltQuestions = {
                          1: { // Level 1
                            0: { question: '0 + 4', answer: 4, answers: [3, 4, 5, 6] },
                            1: { question: '4 + 0', answer: 4, answers: [3, 4, 5, 6] }
                          },
                          2: { // Level 2
                            0: { question: '2 + 2', answer: 4, answers: [3, 4, 5, 6] }
                          },
                          3: { // Level 3
                            0: { question: '0 + 10', answer: 10, answers: [9, 10, 11, 12] },
                            1: { question: '10 + 0', answer: 10, answers: [9, 10, 11, 12] }
                          },
                          4: { // Level 4
                            0: { question: '2 + 4', answer: 6, answers: [5, 6, 7, 8] },
                            1: { question: '4 + 2', answer: 6, answers: [5, 6, 7, 8] }
                          },
                          5: { // Level 5
                            0: { question: '3 + 4', answer: 7, answers: [6, 7, 8, 9] },
                            1: { question: '4 + 3', answer: 7, answers: [6, 7, 8, 9] }
                          },
                          6: { // Level 6
                            0: { question: '4 + 6', answer: 10, answers: [9, 10, 11, 12] },
                            1: { question: '6 + 4', answer: 10, answers: [9, 10, 11, 12] }
                          }
                        };

                        const currentQuestion = redBeltQuestions[selectedTable]?.[learningQuestionIndex];
                        if (currentQuestion) {
                                const question = {
                            question: currentQuestion.question,
                            correctAnswer: currentQuestion.answer,
                            answers: currentQuestion.answers
                                };
                                setLearningQuestion(question);
                          setLearningQuestionIndex(learningQuestionIndex);
                                setShowLearningModule(false);
                                setShowLearningQuestion(true);
                            }
                      } else if (pendingDifficulty === 'brown') {
                        // Brown belt practice questions lookup table
                        const brownBeltQuestions = {
                          1: { // Level 1
                            0: { question: '0 + 5', answer: 5, answers: [4, 5, 6, 7] },
                            1: { question: '5 + 0', answer: 5, answers: [4, 5, 6, 7] }
                          },
                          2: { // Level 2
                            0: { question: '2 + 3', answer: 5, answers: [4, 5, 6, 7] },
                            1: { question: '3 + 2', answer: 5, answers: [4, 5, 6, 7] }
                          },
                          3: { // Level 3
                            0: { question: '1 + 5', answer: 6, answers: [5, 6, 7, 8] },
                            1: { question: '5 + 1', answer: 6, answers: [5, 6, 7, 8] }
                          },
                          4: { // Level 4
                            0: { question: '2 + 5', answer: 7, answers: [6, 7, 8, 9] },
                            1: { question: '5 + 2', answer: 7, answers: [6, 7, 8, 9] }
                          },
                          5: { // Level 5
                            0: { question: '3 + 5', answer: 8, answers: [7, 8, 9, 10] },
                            1: { question: '5 + 3', answer: 8, answers: [7, 8, 9, 10] }
                          },
                          6: { // Level 6
                            0: { question: '5 + 5', answer: 10, answers: [9, 10, 11, 12] }
                          }
                        };

                        const currentQuestion = brownBeltQuestions[selectedTable]?.[learningQuestionIndex];
                        if (currentQuestion) {
                              const question = {
                            question: currentQuestion.question,
                            correctAnswer: currentQuestion.answer,
                            answers: currentQuestion.answers
                              };
                              setLearningQuestion(question);
                          setLearningQuestionIndex(learningQuestionIndex);
                              setShowLearningModule(false);
                              setShowLearningQuestion(true);
                            }
                      } else {
                        // For other difficulties, start the quiz directly
                        startActualQuiz(pendingDifficulty);
                      }
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Learning Question Popup */}
          {showLearningQuestion && learningQuestion && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 safe-area-top safe-area-bottom p-2 sm:p-4">
              <div className="bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm sm:max-w-md w-full mx-2 sm:mx-4 border border-blue-200/30 popup-zoom-in">
                <div className="text-center mb-6">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-blue-500 mb-6">
                    {learningQuestion.question} =
                  </div>
                </div>
                
                {/* Answer Options */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {learningQuestion.answers.map((answer, index) => (
                    <button
                      key={index}
                      className={`font-bold py-4 px-6 rounded-xl transition-all duration-500 transform ${
                        correctAnswerSelected && answer === learningQuestion.correctAnswer
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white scale-105'
                          : correctAnswerSelected
                          ? 'bg-gray-400 text-gray-600 opacity-50'
                          : 'bg-gray-300 hover:bg-gray-400 text-gray-700 hover:scale-105 active:scale-95'
                      } text-2xl sm:text-3xl shadow-lg ${showCorrectText && answer === learningQuestion.correctAnswer ? 'fade-in-correct' : ''}`}
                      onClick={() => {
                        // Check if answer is correct
                        if (answer === learningQuestion.correctAnswer) {
                          // Correct answer - show "Correct!" immediately
                          playSound('correct');
                          setCorrectAnswerSelected(true);
                          setShowCorrectText(true);
                          
                          // For Yellow Belt, Green Belt, Blue Belt, and Red Belt, show Next button for first question, Play the Quiz for second question
                          if (pendingDifficulty === 'white' || pendingDifficulty === 'yellow' || pendingDifficulty === 'green' || pendingDifficulty === 'blue' || pendingDifficulty === 'red' || pendingDifficulty === 'brown') {
                            if (learningQuestionIndex === 0) {
                               // For first question, check if we should show Next button
                               if (pendingDifficulty === 'white' && (selectedTable === 3 || selectedTable === 4 || selectedTable === 5 || selectedTable === 6)) {
                                // Level 3,4,5,6 white belt has two facts, show Next button
                                setShowLearningNextButton(true);
                              // For first question, check if we should show Next button
                              } else if (pendingDifficulty === 'yellow' && (selectedTable === 1 ||selectedTable === 2 || selectedTable === 3 || selectedTable === 4 || selectedTable === 5 || selectedTable === 6)) {
                                // Level 1, 2, 3, 4, 5, 6 yellow belt have two facts, show Next button
                                setShowLearningNextButton(true);
                              } else if (pendingDifficulty === 'green' && (selectedTable === 1 ||selectedTable === 2 || selectedTable === 3 || selectedTable === 4 || selectedTable === 5 )) {
                                // Level 1, 2, 3, 4, 5 green belt have two facts, show Next button
                                setShowLearningNextButton(true);
                              } else if (pendingDifficulty === 'blue' && (selectedTable === 1 ||selectedTable === 2 || selectedTable === 3 || selectedTable === 4 || selectedTable === 6)) {
                                // Level 1, 2, 3, 4, 6 blue belt have two facts, show Next button
                                setShowLearningNextButton(true);
                              } else if (pendingDifficulty === 'red' && (selectedTable === 1 || selectedTable === 3 || selectedTable === 4 || selectedTable === 5 || selectedTable === 6)) {
                                // Level 1, 3, 4, 5, 6 red belt have two facts, show Next button
                                setShowLearningNextButton(true);
                              } else if (pendingDifficulty === 'brown' && (selectedTable === 1 || selectedTable === 2 || selectedTable === 3 || selectedTable === 4 || selectedTable === 5 )) {
                                // Level 1, 2, 3, 4, 5 black belt have two facts, show Next button
                                setShowLearningNextButton(true);
                              } else {
                                // Dont show Next button for other cases
                                setShowLearningNextButton(false);
                              }
                            } else {
                              // Second question answered correctly, show Play the Quiz
                              setShowLearningNextButton(false);
                            }
                          }
                        } else {
                          // Wrong answer - go back to learning module
                          playSound('wrong');
                          setShowLearningQuestion(false);
                          setCorrectAnswerSelected(false);
                          setShowCorrectText(false);
                          setShowLearningNextButton(false);
                          setLearningQuestionIndex(0);
                          setShowLearningModule(true);
                        }
                      }}
                      disabled={correctAnswerSelected}
                    >
                      {showCorrectText && answer === learningQuestion.correctAnswer ? 'Correct!' : answer}
                    </button>
                  ))}
                </div>
                {/* Next Button or Play the Quiz Button - only show when correct text is displayed */}
                {showCorrectText && (
                  <div className="flex justify-center animate-fade-in-up">
                    {(pendingDifficulty === 'white' || pendingDifficulty === 'yellow' || pendingDifficulty === 'green' || pendingDifficulty === 'blue' || pendingDifficulty === 'red' || pendingDifficulty === 'brown') && showLearningNextButton ? (
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-base sm:text-lg shadow-lg"
                      onClick={() => {
                        if (pendingDifficulty === 'white') {
                          // For white belt, handle based on table level
                          if (selectedTable === 1) {
                            // Level 1 white belt has two facts, go to second fact
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setLearningQuestionIndex(1);
                            setShowLearningModule(true);
                          } else if (selectedTable === 2) {
                            // Level 2 white belt has two facts, go to second fact
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setLearningQuestionIndex(1);
                            setShowLearningModule(true);
                          } else if (selectedTable === 3) {
                            // Level 3 white belt has two facts, go to second fact
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setLearningQuestionIndex(1);
                            setShowLearningModule(true);
                          } else if (selectedTable === 4) {
                            // Level 4 white belt has two facts, go to second fact
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setLearningQuestionIndex(1);
                            setShowLearningModule(true);
                          } else if (selectedTable === 5) {
                            // Level 5 white belt has two facts, go to second fact
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setLearningQuestionIndex(1);
                            setShowLearningModule(true);
                          } else if (selectedTable === 6) {
                            // Level 5 white belt has two facts, go to second fact
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setLearningQuestionIndex(1);
                            setShowLearningModule(true);
                          } else {
                            // Level 1 and 2 white belt only have one fact, go directly to quiz
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setShowLearningNextButton(false);
                            setLearningQuestionIndex(0);
                            startActualQuiz(pendingDifficulty);
                          }
                        } else if (pendingDifficulty === 'yellow') {
                          if (selectedTable === 1) {
                            // Level 1 yellow belt has two facts, go to second fact
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setLearningQuestionIndex(1);
                            setShowLearningModule(true);
                          } else if (selectedTable === 2) {
                            // Level 2 yellow belt has two facts, go to second fact
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setLearningQuestionIndex(1);
                            setShowLearningModule(true);
                          } else if (selectedTable === 3) {
                            // Level 3 yellow belt has two facts, go to second fact
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setLearningQuestionIndex(1);
                            setShowLearningModule(true);
                          } else if (selectedTable === 4) {
                            // Level 4 yellow belt has two facts, go to second fact
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setLearningQuestionIndex(1);
                            setShowLearningModule(true);
                          } else if (selectedTable === 5) {
                            // Level 5 yellow belt has two facts, go to second fact
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setLearningQuestionIndex(1);
                            setShowLearningModule(true);
                          } else if (selectedTable === 6) {
                            // Level 6 yellow belt has two facts, go to second fact
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setLearningQuestionIndex(1);
                            setShowLearningModule(true);
                          } else {
                            // Level 1, 2, 3, 4, 5, 6 yellow belt only has one fact, go directly to quiz
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setShowLearningNextButton(false);
                            setLearningQuestionIndex(0);
                            startActualQuiz(pendingDifficulty);
                          }
                          } else if (pendingDifficulty === 'green') {
                            // For green belt, go back to learning module to show second fact (2 + 0 = 2)
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setLearningQuestionIndex(1);
                            setShowLearningModule(true);
                          } else if (pendingDifficulty === 'blue') {
                            // For blue belt, go back to learning module to show second fact (3 + 0 = 3)
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setLearningQuestionIndex(1);
                            setShowLearningModule(true);
                                                    } else if (pendingDifficulty === 'red') {
                            // For red belt, handle based on table level
                            if (selectedTable === 2) {
                              // Level 2 red belt only has one fact, go directly to quiz
                              setShowLearningQuestion(false);
                              setCorrectAnswerSelected(false);
                              setShowCorrectText(false);
                              setShowLearningNextButton(false);
                              setLearningQuestionIndex(0);
                              startActualQuiz(pendingDifficulty);
                            } else {
                              // Level 1 red belt, go back to learning module to show second fact (4 + 0 = 4)
                              setShowLearningQuestion(false);
                              setCorrectAnswerSelected(false);
                              setShowCorrectText(false);
                              setLearningQuestionIndex(1);
                              setShowLearningModule(true);
                            }
                          } else if (pendingDifficulty === 'brown') {
                            // For brown belt, go back to learning module to show second fact (5 + 0 = 5)
                            setShowLearningQuestion(false);
                            setCorrectAnswerSelected(false);
                            setShowCorrectText(false);
                            setLearningQuestionIndex(1);
                            setShowLearningModule(true);
                          }
                        }}
                      >
                        Next
                      </button>
                    ) : (
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-base sm:text-lg shadow-lg"
                      onClick={() => {
                        setShowLearningQuestion(false);
                        setCorrectAnswerSelected(false);
                        setShowCorrectText(false);
                          setShowLearningNextButton(false);
                          setLearningQuestionIndex(0);
                        startActualQuiz(pendingDifficulty);
                      }}
                    >
                        Start Quiz
                    </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
}
export default App;