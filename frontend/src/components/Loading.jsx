import CircularProgress from "@mui/material/CircularProgress";

export const Loading = () => {
  return (
    <div className="flex items-center flex-col justify-center h-screen gap-4">
      <CircularProgress color="gray" />
      <span className="text-gray-500">Загрузка...</span>
    </div>
  );
};
