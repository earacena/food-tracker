import { Activities } from '../activity';
import { CalorieCounter } from './calorie-counter';

export function Dashboard(): JSX.Element {
  return (
    <>
      <CalorieCounter />
      <Activities mainHeader={false} pastActivity={false} todayHeader />
    </>
  );
}
