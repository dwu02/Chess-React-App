window.BotApp = function App(a) 
{
  let bot = "bot"
  return (
    <main id = "main_wrapper">
        <window.Box opponent = {bot} player = {username} />
      <div className = "board_wrapper">
        <window.BotBoard/>
      </div>
    </main>
  );
}
export default BotApp;
