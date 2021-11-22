window.App = function App(a) 
{
  return (
    <main id = "main_wrapper">
        <window.Box opponent = {a.opponent} player = {username} />
      <div className = "board_wrapper">
        <window.Board/>
      </div>
    </main>
  );
}
export default App;
