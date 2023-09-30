import { renderApp } from '@/utils/tests';
import { FoodItemForm } from '..';
import { fireEvent } from '@testing-library/react';

describe('FoodItemForm', () => {
  it('should have a field for food name', async () => {
    const result = renderApp(<FoodItemForm />);

    expect(await result.findByLabelText(/name/i)).toBeDefined();
  });

  it('should have a field for calories per serving', async () => {
    const result = renderApp(<FoodItemForm />);

    expect(await result.findByLabelText(/calories/i)).toBeDefined();
  });

  it('should have a field for serving size', async () => {
    const result = renderApp(<FoodItemForm />);

    expect(await result.findByLabelText(/serving size/i)).toBeDefined();
  });

  it('should have a field for search visiblity', async () => {
    const result = renderApp(<FoodItemForm />);

    expect(await result.findByLabelText(/visibility/i)).toBeDefined();
  });

  it('should have a submit button', async () => {
    const result = renderApp(<FoodItemForm />);

    expect(await result.findByRole('button')).toHaveTextContent(/submit/i);
  });

  it('should show errors when submitting empty fields', async () => {
    const result = renderApp(<FoodItemForm />);

    fireEvent.click(result.getByText('Submit'));

    expect(await result.findByText(/must contain/i)).toBeDefined();
  });
});
