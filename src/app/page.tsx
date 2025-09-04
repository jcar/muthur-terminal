import MUTHURTerminal from '../components/MUTHURTerminal';
import ErrorBoundary from '../components/ErrorBoundary';

export default function Home() {
  return (
    <ErrorBoundary>
      <MUTHURTerminal />
    </ErrorBoundary>
  );
}
