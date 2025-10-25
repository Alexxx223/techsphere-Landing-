import { Loader2 } from "lucide-react";

const PageLoading = () => {
  return (
    <div className="min-h-screen bg-richblack flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
        <p className="text-white/70 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoading;