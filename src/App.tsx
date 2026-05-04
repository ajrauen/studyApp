import { useState, useEffect } from 'react'
import './App.css'
import { getFolderFiles, type DriveFile } from './utils/sheets.api'
import { MenuItem, Select, type SelectChangeEvent } from '@mui/material'

function App() {
  const [files , setFiles] = useState<DriveFile[]>()
  const [selectedSheet, setSelectedSheet] = useState<DriveFile>()

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    const data = await getFolderFiles();
    setFiles(data);
  };

  console.log(selectedSheet)

  const onSheetChange = (e: SelectChangeEvent) => {
    const selectedFile = files?.find(file => e.target.value);
    if(selectedFile) setSelectedSheet(selectedFile)
  }

  return (
    <>
    {
      files?.length > 0 && (
      <Select onChange={onSheetChange}>
        {
          files?.map(file => (
            <MenuItem value={file.id}>{file.name}</MenuItem>
          ))
        }
      </Select>
      )
    }
    
      hi
    </>
  )
}

export default App
