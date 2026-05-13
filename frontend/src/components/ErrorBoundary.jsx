import { useRouteError, useNavigate } from "react-router";
import {
  pageBackground,
  formCard,
  pageTitleClass,
  primaryBtn,
  bodyText
} from "../styles/common";

function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const { status, statusText, data } = error;

  return (
    <div className={`${pageBackground} flex items-center justify-center p-6 bg-slate-50`}>
      <div className={`${formCard} max-w-2xl w-full text-center flex flex-col items-center gap-6`}>
        
        {/* Illustration or Icon */}
        <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mb-2 animate-bounce">
          <svg
            className="w-12 h-12 text-violet-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Details */}
        <div>
          <h1 className={`${pageTitleClass} leading-none`}>
            {status || "Oops!"}
          </h1>
          <h2 className="text-2xl font-bold text-slate-800 mb-4 italic">
            {statusText || "Something went wrong"}
          </h2>
          <p className={`${bodyText} mb-6`}>
            {data || "The page you are looking for might have been moved or doesn't exist anymore."}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate("/")}
          className={`${primaryBtn} scale-110 active:scale-95`}
        >
          Go Back Home
        </button>

        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-violet-200/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-indigo-200/30 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
}

export default ErrorBoundary;