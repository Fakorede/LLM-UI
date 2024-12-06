import useStore from '@store/store';

const useRestoreChatFromFile = () => {
  const restoreChatFromFile = async (userId: string) => {
    let retreivedChats: any[] = [];
    let fileName = `${userId}.json`

    await fetch(`/${fileName}`)
      .then(response => response.json())
      .then(data => {
        retreivedChats = data
    });

    localStorage.setItem(fileName, JSON.stringify(retreivedChats))
  }

  return restoreChatFromFile
};
  
export default useRestoreChatFromFile;
  