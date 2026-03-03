/**
 * LoadingSpinner — A full-screen centered spinning loader.
 * Displayed while weather data is being fetched.
 */
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-12 w-12 rounded-full border-4 border-white/30 border-t-white animate-spin" />
    </div>
  );
}

export default LoadingSpinner;
