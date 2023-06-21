import { jest } from '@jest/globals';

console.error = jest.fn();
jest.spyOn(process, 'exit').mockImplementation(error => error);
