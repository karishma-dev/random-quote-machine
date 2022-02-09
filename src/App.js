import { useEffect, useState } from "react";
import "./style.css";
import { FaQuoteLeft, FaQuoteRight, FaTwitterSquare} from "react-icons/fa";
import QuoteBox from "./QuoteBox";

// Color for border, button
const color = [
  { left: "#fc0303", right: "#b50202" },
  { left: "#fa4d02", right: "#b53802" },
  { left: "#fab402", right: "#b58202" },
  { left: "#e9fa02", right: "#98a300" },
  { left: "#54fc00", right: "#36a300" },
  { left: "#00fc8f", right: "#02a860" },
  { left: "#05ddfa", right: "#0295a8" },
  { left: "#dd05fa", right: "#a002b5" },
  { left: "#fa02c4", right: "#b5028e" },
  { left: "#fa025d", right: "#c20248" }
];

// Default quote
const defaultQuote = {
  quote: "Life isn’t about getting and having, it’s about giving and being.",
  author: "Kevin Kruse"
};

// App Component
export default function App() {
  // States
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [quoteObject, setQuoteObject] = useState(defaultQuote);

  //Fetch data from an API.
  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setData(result.quotes);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  // Displaying the result
  if (error) {
    return <div> Error: {error.message}</div>;
  }

  if (!isLoaded) {
    return <div> Loading...</div>;
  }

  //Method to change quote, author and certain UI components colors.
  function getNewIndex() {
    let quoteIndex = Math.floor(Math.random() * data.length + 0);
    let colorIndex = Math.floor(Math.random() * color.length + 0);
    document.documentElement.style.setProperty(
      "--left",
      color[colorIndex].left
    );
    document.documentElement.style.setProperty(
      "--right",
      color[colorIndex].right
    );
    setQuoteObject(data[quoteIndex]);
  }

  // Function to share quote on twitter
  const shareTweet = () => {
    var url = "twitter.com";
    let text = `${quoteObject.author} - ${quoteObject.quote}`;
    window.open(
      "http://twitter.com/share?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(text),
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
  };

  //Card to display Quote.
  return (
    <div className="border" id="quote-box">

      {/* Quotes icon */}
      <FaQuoteLeft className="fa-quote-left" />
      <FaQuoteRight className = "fa-quote-right" />

      {/* QuoteBox component */}
      <QuoteBox quote={quoteObject} getNewQuote={getNewIndex}/>
      
      {/* Button to share quote on twitter */}
      <button onClick={() => shareTweet} id="tweet-quote">
        <FaTwitterSquare className="fa-twitter-square"/>
        <span>Tweet Quote</span>
      </button>
      
    </div>
  );
}
