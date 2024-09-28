import { Link } from "react-router-dom";

const Card = ({ question, author }) => {
  return (
    <Link to={`/questions/${question.id}`}>
      <div className="m-3 p-2 rounded-xl shadow-md hover:shadow-xl transition bg-zinc-300 max-w-sm mx-auto flex items-center space-x-4">
        <div className="shrink-0">
          <img className="h-12 w-12" src={author?.avatarURL} alt="Author" />
        </div>
        <div>
          <div className="text-xl font-medium text-black">
            {question.author}
          </div>
          <p className="text-xs italic">
            {new Date(question.timestamp).toDateString()}
          </p>
          <p className="underline underline-offset-4">Show</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
