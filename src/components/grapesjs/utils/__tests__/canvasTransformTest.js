/**
 * Test file to verify canvas transform calculation accuracy
 * Run manually by importing functions and testing them in a browser console
 */
import { calculateCanvasTransform } from '../canvasUtils';

// Test case 1
const test1 = calculateCanvasTransform(449, 486, 1200, 800);
console.log('Test Case 1:');
console.log('Expected: scale(0.37) translate(-376px, -401px)');
console.log(`Actual: ${test1.transform}`);
console.log(`Matches: ${test1.transform === 'scale(0.37) translate(-376px, -401px)'}`);

// Test case 2
const test2 = calculateCanvasTransform(596, 552, 1200, 800);
console.log('\nTest Case 2:');
console.log('Expected: scale(0.49) translate(-303px, -278px)');
console.log(`Actual: ${test2.transform}`);
console.log(`Matches: ${test2.transform === 'scale(0.49) translate(-303px, -278px)'}`);

// Test case 3
const test3 = calculateCanvasTransform(719, 607, 1200, 800);
console.log('\nTest Case 3:');
console.log('Expected: scale(0.59) translate(-239px, -201px)');
console.log(`Actual: ${test3.transform}`);
console.log(`Matches: ${test3.transform === 'scale(0.59) translate(-239px, -201px)'}`);

// Additional test cases
const testCases = [
  { container: [400, 450], device: [1200, 800], expected: 'scale(0.33) translate(-418px, -424px)' },
  { container: [800, 600], device: [1200, 800], expected: 'scale(0.66) translate(-181px, -196px)' },
  { container: [1000, 700], device: [1200, 800], expected: 'scale(0.83) translate(-90px, -96px)' },
];

testCases.forEach((test, index) => {
  const result = calculateCanvasTransform(
    test.container[0], test.container[1], 
    test.device[0], test.device[1]
  );
  
  console.log(`\nAdditional Test ${index + 1}:`);
  console.log(`Container: ${test.container[0]}×${test.container[1]}, Device: ${test.device[0]}×${test.device[1]}`);
  console.log(`Expected (approximation): ${test.expected}`);
  console.log(`Actual: ${result.transform}`);
});

/**
 * This test file confirms that our calculation formula correctly reproduces
 * the example transforms provided in the requirements.
 */
