import './App.css';
import { logo } from './assets';
import Post from './Post';

function App() {
  return (
    <div className="app">
      {/* header */}
      <div className="app-header">
        <img src={logo} alt="" />
      </div>

      <h1>Hello</h1>

      <Post
        username="giannurwana19"
        caption="This is caption by gian"
        imageUrl="https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
      <Post
        username="zahra"
        caption="This is caption by gian"
        imageUrl="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
    </div>
  );
}

export default App;
