import { fireEvent, screen } from '@testing-library/react';
import { renderApp } from '@/utils/tests';
import { FoodItemForm } from '..';

describe('foodItemForm', () => {
  it('should have a field for food name', async () => {
    renderApp(<FoodItemForm />);

    expect(await screen.findByLabelText(/name/i)).toBeDefined();
  });

  it('should have a field for calories per serving', async () => {
    renderApp(<FoodItemForm />);

    expect(await screen.findByLabelText(/calories/i)).toBeDefined();
  });

  it('should have a field for serving size', async () => {
    renderApp(<FoodItemForm />);

    expect(await screen.findByLabelText(/serving size/i)).toBeDefined();
  });

  it('should have a field for search visiblity', async () => {
    renderApp(<FoodItemForm />);

    expect(await screen.findByLabelText(/visibility/i)).toBeDefined();
  });

  it('should have a submit button', async () => {
    renderApp(<FoodItemForm />);

    expect(await screen.findByRole('button')).toHaveTextContent(/submit/i);
  });

  it('should show errors when submitting empty fields', async () => {
    renderApp(<FoodItemForm />);

    fireEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText(/must contain/i)).toBeDefined();
  });
});
