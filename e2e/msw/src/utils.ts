export const fetchData = async (url: string, setData: (data: any) => void) => {
  try {
    const data = await fetch(url);
    const json = await data.json();
    setData(json);
  } catch (e) {
    console.error(e);
  }
};
