import { useState } from "react";
import "./App.css";
import { getFolderFiles, type DriveFile } from "./utils/sheets.api";
import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { QuestionCards } from "./QuestionCards/QuestionCards";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
  const [selectedSheet, setSelectedSheet] = useState<DriveFile | null>(null);

  const { data } = useQuery({
    queryKey: ["files"],
    queryFn: getFolderFiles,
  });

  const onSheetChange = (e: SelectChangeEvent) => {
    const selectedFile = data?.find((file) => file.id === e.target.value);
    if (selectedFile) setSelectedSheet(selectedFile);
  };

  return (
    <>
      {data && data?.length > 0 && (
        <Select onChange={onSheetChange} value={selectedSheet?.id ?? ""}>
          {data?.map((file) => (
            <MenuItem key={file.id} value={file.id}>
              {file.name}
            </MenuItem>
          ))}
        </Select>
      )}
      {selectedSheet && <QuestionCards fileInfo={selectedSheet} />}
    </>
  );
}

const AppWrapper = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
