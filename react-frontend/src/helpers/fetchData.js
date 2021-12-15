import axios from 'axios';

export async function fetchOrigData() {
  try {
    const result = await axios.get("http://localhost:8080/api/data/original")
    console.log("fetching results from original layout...", result.data);
  } catch (error) {
    console.error(error);
  }
};

export async function fetchProgData() {
  try {
    const result = await axios.get("http://localhost:8080/api/data/progress")
    console.log("fetching results from progress layout...", result.data);
  } catch (error) {
    console.error(error);
  }
};

