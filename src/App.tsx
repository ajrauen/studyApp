import { useState, useEffect } from 'react'
import './App.css'
import { getFolderFiles, type DriveFile } from './utils/sheets.api'
import { MenuItem, Select, type SelectChangeEvent } from '@mui/material'
import { QuestionCards } from './QuestionCards/QuestionCards'

function App() {
  const [files , setFiles] = useState<DriveFile[]>([])
  const [selectedSheet, setSelectedSheet] = useState<DriveFile | null>(null)

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    const data = await getFolderFiles();
    setFiles(data);
  };


  const onSheetChange = (e: SelectChangeEvent) => {
    const selectedFile = files.find(file => file.id === e.target.value);
    if (selectedFile) setSelectedSheet(selectedFile)
  }

  return (
    <>
    {
      files.length > 0 && (
      <Select onChange={onSheetChange} value={selectedSheet?.id ?? ''}>
        {
          files.map(file => (
            <MenuItem key={file.id} value={file.id}>{file.name}</MenuItem>
          ))
        }
      </Select>
      )
    }
    {selectedSheet && <QuestionCards fileInfo={selectedSheet} />}
    
      hi
    </>
  )
}

export default App
