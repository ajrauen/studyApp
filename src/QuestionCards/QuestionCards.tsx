import { useEffect, useState } from "react";
import { getFileDetails, type DriveFile } from "../utils/sheets.api";

interface QuestionCardsProps {
    fileInfo: DriveFile
}

const QuestionCards = ({ fileInfo }: QuestionCardsProps) => {
    const [data, setData] = useState<DriveFile[]>([])

useEffect(() => {
    loadQuestionday()
}, [fileInfo?.id])  

const loadQuestionday = async () => {
    const data = await getFileDetails(fileInfo.id);
    setData(data);
    console.log("data", data);
}

return (<div>
  <h1>Question of the Day</h1>
  <ul>
    {data && data.map((item, index) => (
      <li key={index}>{item.Question}</li>
    ))}
  </ul>
</div>)

}

export { QuestionCards }