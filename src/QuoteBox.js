import { GiNextButton } from "react-icons/gi";

export default function QuoteBox(props) {
    return (
      <figure className="border outer">

        {/* Quote */}
        <blockquote>
          <p id="text">{props.quote.quote}</p>
        </blockquote>

        {/* Author */}
        <figcaption id="author">-- {props.quote.author}</figcaption>

        {/* Button to change quote */}
        <button onClick={props.getNewQuote} id="new-quote">
          <GiNextButton className = "fa-step-forward" />
          <span>Next Quote</span>
        </button>
      </figure>
    );
  }
  