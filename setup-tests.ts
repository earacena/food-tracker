/* eslint-disable jest/require-top-level-describe -- this is a configuration file for all tests run, enabling this rule here will increase code duplication */
import '@testing-library/jest-dom/vitest';
import { setupServer } from 'msw/node';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { foodItemsRequestHandlers } from './src/features/food-items';

export const server = setupServer(...foodItemsRequestHandlers);

// Start API mocking before all tests
beforeAll(() => {
  server.listen();
});

afterEach(() => {
  // Reset request handlers to avoid a test interfering with other tests
  server.resetHandlers();

  // Runs a cleanup after each test case (e.g. clearing jsdom)
  cleanup();
});

// Clean up after all tests
afterAll(() => {
  server.close();
});
class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button ?? 0;
    this.ctrlKey = props.ctrlKey ?? false;
    this.pointerType = props.pointerType ?? 'mouse';
  }
}
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- necessary for setup
window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
