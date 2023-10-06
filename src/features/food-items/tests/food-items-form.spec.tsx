import { fireEvent, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
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

  it("should have a field for serving size in grams after clicking 'Grams' Serving Type", async () => {
    const user = userEvent.setup();
    renderApp(<FoodItemForm />);

    const trigger = screen.getByRole('combobox', { name: 'Serving Type' });

    expect(trigger).toBeInTheDocument();
    expect(
      within(trigger).getByText('Select Serving Type'),
    ).toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('option', { name: 'Grams' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Units' })).toBeInTheDocument();

    await user.click(screen.getByRole('option', { name: 'Grams' }));

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(await screen.findByLabelText('Serving Size In Grams')).toBeDefined();
  });

  it("should have a field for serving size in units after clicking 'Units' Serving Type", async () => {
    const user = userEvent.setup();
    renderApp(<FoodItemForm />);

    const trigger = screen.getByRole('combobox', { name: 'Serving Type' });

    expect(trigger).toBeInTheDocument();
    expect(
      within(trigger).getByText('Select Serving Type'),
    ).toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('option', { name: 'Grams' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Units' })).toBeInTheDocument();

    await user.click(screen.getByRole('option', { name: 'Units' }));

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(await screen.findByLabelText('Serving Size In Units')).toBeDefined();
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
