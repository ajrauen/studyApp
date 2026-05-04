import { useMemo, useState, useEffect } from "react";
import "./App.css";
import { getFolderFiles, type DriveFile } from "./utils/sheets.api";
import { MenuItem, Select, type SelectChangeEvent, CssBaseline, FormControl, InputLabel } from "@mui/material";
import { QuestionCards } from "./QuestionCards/QuestionCards";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";


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
        <FormControl fullWidth className="max-w-[700px] mx-auto mb-6">
          <InputLabel id="sheet-select">Questions File</InputLabel>
          <Select
            id="sheet-select"
            onChange={onSheetChange}
            value={selectedSheet?.id ?? ""}
          >
            {data?.map((file) => (
              <MenuItem key={file.id} value={file.id}>
                {file.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {selectedSheet && <QuestionCards fileInfo={selectedSheet} />}
    </>
  );
}

const AppWrapper = () => {
  const queryClient = new QueryClient();
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setPrefersDarkMode(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersDarkMode(event.matches);
    };

    mediaQuery.addEventListener?.("change", handleChange);
    return () => mediaQuery.removeEventListener?.("change", handleChange);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
