// App.js
import { useState } from 'react';
import Dashboard from './Dashboard';
import PredictForm from './Foundation';

function App() {
  const [lastPrediction, setLastPrediction] = useState(null);

  const updatePrediction = (prediction) => {
    setLastPrediction(prediction);
  };

  return (
    <div>
      <Dashboard lastPrediction={lastPrediction} />
      <PredictForm onPrediction={updatePrediction} />
    </div>
  );
}

export default App;
