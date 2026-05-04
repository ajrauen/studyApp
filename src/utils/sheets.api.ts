// src/services/googleDriveService.ts

export interface DriveFile {
  name: string;
  id: string;
  url: string;
  type: string;
}

export interface Question{
  id: string
  question: string
  category: string
  questionCategory: string
  answer: string
  occuranceRating: number
}

const GAS_URL = "https://script.google.com/macros/s/AKfycbyTR_en0983973EeJRARtD6iyNU4JCEGS5Ipzfb6-hzej2pUlafoJ-9lUyPc5jorCsk/exec";
const SECRET_KEY = "your_secure_random_string_here";

/**
 * Fetches a list of files from a specific Google Drive folder.
 * @param folderId The ID of the folder (found in the URL of the folder in Drive)
 */
export const getFolderFiles = async (): Promise<DriveFile[]> => {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      // Note: GAS sometimes requires 'text/plain' to avoid CORS preflight issues
      // but the script will still parse it as JSON.
      body: JSON.stringify({
        idToken: SECRET_KEY,
        action: "getList"
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Handle the case where the script returns an error message
    if (typeof data === 'string' && data.includes("POST JSON")) {
      console.error("The Script didn't recognize the request format:", data);
      return [];
    }

    return data as DriveFile[];
  } catch (error) {
    console.error("Error fetching file list:", error);
    return [];
  }
};


/**
 * Fetches a list of files from a specific Google Drive folder.
 * @param folderId The ID of the folder (found in the URL of the folder in Drive)
 */
export const getFileDetails = async (fileId: string): Promise<Question[]> => {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      // Note: GAS sometimes requires 'text/plain' to avoid CORS preflight issues
      // but the script will still parse it as JSON.
      body: JSON.stringify({
        idToken: SECRET_KEY,
        action: "getFileDetails",
        fileId: fileId
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Handle the case where the script returns an error message
    if (typeof data === 'string' && data.includes("POST JSON")) {
      console.error("The Script didn't recognize the request format:", data);
      return [];
    }

    return data as Question[];
  } catch (error) {
    console.error("Error fetching file list:", error);
    return [];
  }
};