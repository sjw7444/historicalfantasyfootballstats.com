import { FilterBar } from './components/FilterBar';
import { StatsTable } from './components/StatsTable';
import { ScoringModal } from './components/ScoringModal';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-emerald-800 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold">Fantasy MVP</h1>
          <p className="text-emerald-200 text-sm">Historical Fantasy Football Stats (1970-2024)</p>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto">
        <FilterBar />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <StatsTable />
        </div>
      </main>

      {/* Scoring Config Modal */}
      <ScoringModal />
    </div>
  );
}

export default App;
