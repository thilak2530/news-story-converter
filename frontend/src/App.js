import { useState } from "react";
import axios from "axios";
import "./styles/index.css"

function App() {
  const [news, setNews] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);




  const handleConvert = async () => {
    setLoading(true);
    setStory("");

    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/news-story`, {
        newsText: news 
      });
      setStory(res.data.story);
    }  catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message); 
      } else {
        alert("Something went wrong! Please try again.");
      }
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="box">
        <h2 >News → Story</h2> 
        <div className="box1" style={{ display: story ? "none" : "flex" }}>      
          <br></br>
          <label htmlFor="newsInput">Paste your news article here:</label>
          <textarea
            id="newsInput"    
            name="newsInput"      
            rows="8"
            value={news}
            onChange={(e) => setNews(e.target.value)}
            placeholder="Enter the news article..."
            
          />
          

          <button onClick={handleConvert} disabled={loading}>
            {loading ? "Converting..." : "Convert to Story"}
          </button>
        </div> 
        {story && (
          
          <div className="story">
            <h3>Story Output:</h3>
            <p className="output">{story}</p>
            <button onClick={()=>{setStory(""); setNews("") }}>Completed</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;