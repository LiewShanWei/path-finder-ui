import Table from './components/Table';

function App() {
  const rowCount = 20;
  const colCount = 20;

  return (
    <Table rowCount={rowCount} colCount={colCount}></Table>
  );
}

export default App;
