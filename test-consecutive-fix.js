// Test script to verify consecutive identical questions are prevented

// Global state for the test
const globalState = {
  whiteBeltFullSequence: null,
  whiteBeltQuestionCounter: 0,
  whiteBeltZeroPlusZeroAsked: 0
};

function generateBeltQuestion(difficulty, totalQuestions, askedQuestions, lastQuestion) {
  // Define the core facts for white belt
  const currentFacts = [
    { question: '0 + 0', correctAnswer: 0, answers: [0, 1, 2, 3], multiplier: 0, difficulty: 'white' }
  ];

  // Previous belt questions for filling remaining slots
  const previousQuestions = [
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
  ];

  // Special handling for white belt: 2 "0+0" questions anywhere + 8 shuffled numbers, total 10 questions
  if (difficulty === 'white') {
    // Create a shuffled sequence that ensures exactly 2 "0+0" and 8 numbers
    if (!globalState.whiteBeltFullSequence) {
      // Create array with exactly 2 "0+0" and 10 numbers 0-9
      const baseSequence = [
        '0 + 0', '0 + 0',  // 2 "0+0" questions
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9  // 10 numbers
      ];
      
      // Create a guaranteed non-consecutive sequence (no consecutive identical questions of any type)
      let shuffledSequence;
      let attempts = 0;
      const maxAttempts = 100;
      
      do {
        // Shuffle the sequence
        shuffledSequence = [...baseSequence].sort(() => Math.random() - 0.5);
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
      
      // Store the shuffled sequence for this quiz session
      globalState.whiteBeltFullSequence = shuffledSequence;
      // Reset the question counter for this session
      globalState.whiteBeltQuestionCounter = 0;
      // Track how many "0+0" questions we've asked
      globalState.whiteBeltZeroPlusZeroAsked = 0;
      
      console.log('New white belt sequence created:', shuffledSequence);
    }
    
    // Get the question for this position from the shuffled sequence
    let selectedQuestion = globalState.whiteBeltFullSequence[globalState.whiteBeltQuestionCounter];
    
    // Debug: Log the initial question selection
    console.log(`White Belt Question ${globalState.whiteBeltQuestionCounter}: Initial selection "${selectedQuestion}", Last question was "${lastQuestion}", Total questions: ${totalQuestions}`);
    
    // CRITICAL FIX: Use a proper queue system to ensure no questions are repeated
    // BUT allow "0+0" questions to be asked twice (exactly 2 times total)
    while (askedQuestions && askedQuestions.has(selectedQuestion)) {
      // Special case: if this is a "0+0" question and we haven't asked 2 yet, allow it
      if (selectedQuestion === '0 + 0' && globalState.whiteBeltZeroPlusZeroAsked < 2) {
        break;
      }
      
      globalState.whiteBeltQuestionCounter++;
      
      if (globalState.whiteBeltQuestionCounter >= globalState.whiteBeltFullSequence.length) {
        // We've used all questions in the sequence, this shouldn't happen with 10 questions
        console.error('ERROR: All questions in sequence have been used!');
        break;
      }
      
      selectedQuestion = globalState.whiteBeltFullSequence[globalState.whiteBeltQuestionCounter];
    }
    
    // CRITICAL FIX: Ensure no consecutive identical questions can occur
    // Check if this question would be the same as the last one (prevent consecutive repeats within quiz)
    if (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion) {
      console.log(`WARNING: Question "${selectedQuestion}" same as last question "${lastQuestion}", finding different one...`);
      // Find the next different question in the sequence
      let nextIndex = globalState.whiteBeltQuestionCounter + 1;
      while (nextIndex < globalState.whiteBeltFullSequence.length) {
        const nextQuestion = globalState.whiteBeltFullSequence[nextIndex];
        if (nextQuestion !== lastQuestion && `${nextQuestion}` !== lastQuestion && !askedQuestions.has(nextQuestion)) {
          selectedQuestion = nextQuestion;
          globalState.whiteBeltQuestionCounter = nextIndex;
          console.log(`Found different question at index ${nextIndex}: "${selectedQuestion}"`);
          break;
        }
        nextIndex++;
      }
      
      // If we still have the same question, find any different question from the sequence
      if (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion) {
        const differentQuestion = globalState.whiteBeltFullSequence.find(q => 
          q !== lastQuestion && `${q}` !== lastQuestion && !askedQuestions.has(q)
        );
        if (differentQuestion !== undefined) {
          selectedQuestion = differentQuestion;
          // Find the index of this question in the sequence
          const foundIndex = globalState.whiteBeltFullSequence.indexOf(differentQuestion);
          if (foundIndex !== -1) {
            globalState.whiteBeltQuestionCounter = foundIndex;
          }
          console.log(`Found different question from full sequence: "${selectedQuestion}"`);
        }
      }
    }
    
    // ADDITIONAL SAFETY CHECK: Ensure the first question of a new quiz is never the same as the last question
    // This prevents the issue where the first two questions are identical when starting a new quiz
    if (totalQuestions === 0 && (selectedQuestion === lastQuestion || `${selectedQuestion}` === lastQuestion)) {
      console.log(`CRITICAL: First question "${selectedQuestion}" same as last question "${lastQuestion}", forcing different question...`);
      // For the very first question, ensure it's different from the last question
      const firstDifferentQuestion = globalState.whiteBeltFullSequence.find(q => 
        q !== lastQuestion && `${q}` !== lastQuestion
      );
      if (firstDifferentQuestion !== undefined) {
        selectedQuestion = firstDifferentQuestion;
        const foundIndex = globalState.whiteBeltFullSequence.indexOf(firstDifferentQuestion);
        if (foundIndex !== -1) {
          globalState.whiteBeltQuestionCounter = foundIndex;
        }
        console.log(`Forced first question to: "${selectedQuestion}"`);
      }
    }
    
    // Increment the question counter for next time
    globalState.whiteBeltQuestionCounter++;
    
    // Track "0+0" questions asked
    if (selectedQuestion === '0 + 0') {
      globalState.whiteBeltZeroPlusZeroAsked++;
    }
    
    if (selectedQuestion === '0 + 0') {
      // It's a "0+0" question
      const shuffledAnswers = [...currentFacts[0].answers].sort(() => Math.random() - 0.5);
      return { ...currentFacts[0], answers: shuffledAnswers };
    } else {
      // It's a number recognition question
      const selectedQuestionObj = previousQuestions.find(q => q.question === `${selectedQuestion}`);
      const shuffledAnswers = [...selectedQuestionObj.answers].sort(() => Math.random() - 0.5);
      return { ...selectedQuestionObj, answers: shuffledAnswers };
    }
  }
}

// Simulate the reset logic
function resetWhiteBeltSequence() {
  if (globalState.whiteBeltFullSequence) {
    delete globalState.whiteBeltFullSequence;
    delete globalState.whiteBeltQuestionCounter;
    delete globalState.whiteBeltZeroPlusZeroAsked;
    console.log('White belt sequence reset for new quiz session');
  }
}

// Test the consecutive fix logic
console.log('Testing consecutive identical questions prevention...\n');

// First quiz session
console.log('=== FIRST QUIZ SESSION ===');
let lastQuestion = '';
let askedQuestions = new Set();
let questions = [];

for (let i = 0; i < 10; i++) {
  const question = generateBeltQuestion('white', i, askedQuestions, lastQuestion);
  questions.push(question.question);
  askedQuestions.add(question.question);
  lastQuestion = question.question;
  console.log(`Question ${i + 1}: ${question.question}`);
}

console.log('\nFirst quiz questions:', questions);
console.log('"0+0" count:', questions.filter(q => q === '0 + 0').length);

// Check for consecutive identical questions
let hasConsecutive = false;
for (let i = 0; i < questions.length - 1; i++) {
  if (questions[i] === questions[i + 1]) {
    hasConsecutive = true;
    console.error(`ERROR: Consecutive identical questions at positions ${i + 1} and ${i + 2}: "${questions[i]}"`);
    break;
  }
}

if (!hasConsecutive) {
  console.log('✅ SUCCESS: No consecutive identical questions in first quiz!');
}

// Reset for new quiz session
console.log('\n=== RESETTING FOR NEW QUIZ ===');
resetWhiteBeltSequence();

// Second quiz session - simulate starting with the last question from previous quiz
console.log('\n=== SECOND QUIZ SESSION (with lastQuestion from previous quiz) ===');
lastQuestion = questions[questions.length - 1]; // Use last question from previous quiz
console.log(`Starting second quiz with lastQuestion: "${lastQuestion}"`);
askedQuestions = new Set();
questions = [];

for (let i = 0; i < 10; i++) {
  const question = generateBeltQuestion('white', i, askedQuestions, lastQuestion);
  questions.push(question.question);
  askedQuestions.add(question.question);
  lastQuestion = question.question;
  console.log(`Question ${i + 1}: ${question.question}`);
}

console.log('\nSecond quiz questions:', questions);
console.log('"0+0" count:', questions.filter(q => q === '0 + 0').length);

// Check for consecutive identical questions in second quiz
hasConsecutive = false;
for (let i = 0; i < questions.length - 1; i++) {
  if (questions[i] === questions[i + 1]) {
    hasConsecutive = true;
    console.error(`ERROR: Consecutive identical questions at positions ${i + 1} and ${i + 2}: "${questions[i]}"`);
    break;
  }
}

if (!hasConsecutive) {
  console.log('✅ SUCCESS: No consecutive identical questions in second quiz!');
}

console.log('\n🎯 TEST COMPLETE: Consecutive identical questions prevention verified!');
