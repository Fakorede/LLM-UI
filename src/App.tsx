import React, { useEffect, useState } from 'react';
import useStore from '@store/store';
import i18n from './i18n';

import Chat from '@components/Chat';
import Menu from '@components/Menu';

import useRestoreChatFromFile from '@hooks/useRestoreChatFromFile';
import useInitialiseNewChat from '@hooks/useInitialiseNewChat';
import { ChatInterface } from '@type/chat';
import { Theme } from '@type/theme';
import SessionPopup from '@components/SessionPopup';
import Toast from '@components/Toast';

function App() {
  const restoreChatsFromFile = useRestoreChatFromFile();
  const initialiseNewChat = useInitialiseNewChat();
  const setChats = useStore((state) => state.setChats);
  const setTasks = useStore((state) => state.setTasks);
  const setTheme = useStore((state) => state.setTheme);
  const setApiKey = useStore((state) => state.setApiKey);
  const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

  const userId = useStore((state) => state.userId);
  const [retreivedChats, setRetreivedChats] = useState(null);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    i18n.on('languageChanged', (lng) => {
      document.documentElement.lang = lng;
    });
  }, []);

  useEffect(() => {
    // legacy local storage
    const oldChats = localStorage.getItem('chats');
    const apiKey = localStorage.getItem('apiKey');
    const theme = localStorage.getItem('theme');

    if (apiKey) {
      // legacy local storage
      setApiKey(apiKey);
      localStorage.removeItem('apiKey');
    }

    if (theme) {
      // legacy local storage
      setTheme(theme as Theme);
      localStorage.removeItem('theme');
    }

    if (oldChats) {
      // legacy local storage
      try {
        const chats: ChatInterface[] = JSON.parse(oldChats);
        if (chats.length > 0) {
          setChats(chats);
          setCurrentChatIndex(0);
        } else {
          initialiseNewChat();
        }
      } catch (e: unknown) {
        console.log(e);
        initialiseNewChat();
      }
      localStorage.removeItem('chats');
    } else {
      // existing local storage
      const chats = useStore.getState().chats;
      const currentChatIndex = useStore.getState().currentChatIndex;
      if (!chats || chats.length === 0) {
        initialiseNewChat();
      }

      if (userId == "mfakor1@lsu.edu") {
        const rawData = localStorage.getItem('free-chat-gpt')
        if (!rawData) return;
        const parsedData = JSON.parse(rawData);
        let chats = parsedData?.state?.chats;

        restoreChatsFromFile(userId);
        const retreivedChats = localStorage.getItem(`${userId}.json`)
        if (retreivedChats !== null) {
          let parsedRetreivedData = JSON.parse(retreivedChats)
          chats = parsedRetreivedData

          localStorage.setItem('free-chat-gpt', JSON.stringify(parsedData));

          setChats(chats);
        }
      }

      if (
        chats &&
        !(currentChatIndex >= 0 && currentChatIndex < chats.length)
      ) {
        setCurrentChatIndex(0);
      }

      if (chats && chats.length > 0) {
        const rawData = localStorage.getItem('free-chat-gpt')

        if (!rawData) return;
        
        const parsedData = JSON.parse(rawData);
        const tasks = parsedData?.state?.tasks;
        const tasksChat = parsedData?.state?.chats;

        if (tasks && tasks.length > 3) {
          tasks[3].additionalPrompt = "Input are two strings a and b consisting only of 1s and 0s.\nPerform binary XOR on these inputs and return result also as a string.\n\n\nTest Cases: \n\n('111000', '101010') == '010010' \n\n('1', '1') == '0' \n\n('0101', '0000') == '0101' \n\n";
        }

        if (tasksChat && tasksChat.length > 3) {
          tasksChat[3].moreInfo = "Input are two strings a and b consisting only of 1s and 0s.\nPerform binary XOR on these inputs and return result also as a string.\n\n\nTest Cases: \n\n('111000', '101010') == '010010' \n\n('1', '1') == '0' \n\n('0101', '0000') == '0101' \n\n";
        }

        if (tasks && tasks.length > 9) {
          tasks[9].additionalPrompt = "poly(xs: list, x: float):\n    \"\"\"\n    Evaluates polynomial with coefficients xs at point x.\n    return xs[0] + xs[1] * x + xs[1] * x^2 + .... xs[n] * x^n\n    \"\"\"\n    return sum([coeff * math.pow(x, i) for i, coeff in enumerate(xs)])\n\n find_zero(xs: list):\n    \"\"\" xs are coefficients of a polynomial.\n    find_zero find x such that poly(x) = 0.\n    find_zero returns only only zero point, even if there are many.\n    Moreover, find_zero only takes list xs having even number of coefficients\n    and largest non zero coefficient as it guarantees\n    a solution.\n\"\"\"\n"
            + "\nTESTCASE:\n\n    import math\n    import random\n    rng = random.Random(42)\n    import copy\n    for _ in range(100):\n        ncoeff = 2 * rng.randint(1, 4)\n        coeffs = []\n        for _ in range(ncoeff):\n            coeff = rng.randint(-10, 10)\n            if coeff == 0:\n                coeff = 1\n            coeffs.append(coeff)\n        solution = find_zero(copy.deepcopy(coeffs))\n        assert math.fabs(poly(coeffs, solution)) < 1e-4\n\n"
        }

        if (tasksChat && tasksChat.length > 9) {
          tasksChat[9].moreInfo = "poly(xs: list, x: float):\n    \"\"\"\n    Evaluates polynomial with coefficients xs at point x.\n    return xs[0] + xs[1] * x + xs[1] * x^2 + .... xs[n] * x^n\n    \"\"\"\n    return sum([coeff * math.pow(x, i) for i, coeff in enumerate(xs)])\n\n find_zero(xs: list):\n    \"\"\" xs are coefficients of a polynomial.\n    find_zero find x such that poly(x) = 0.\n    find_zero returns only only zero point, even if there are many.\n    Moreover, find_zero only takes list xs having even number of coefficients\n    and largest non zero coefficient as it guarantees\n    a solution.\n\"\"\"\n"
            + "\nTESTCASE:\n\n    import math\n    import random\n    rng = random.Random(42)\n    import copy\n    for _ in range(100):\n        ncoeff = 2 * rng.randint(1, 4)\n        coeffs = []\n        for _ in range(ncoeff):\n            coeff = rng.randint(-10, 10)\n            if coeff == 0:\n                coeff = 1\n            coeffs.append(coeff)\n        solution = find_zero(copy.deepcopy(coeffs))\n        assert math.fabs(poly(coeffs, solution)) < 1e-4\n\n"
        }

        if (tasks && tasks.length > 10) {
          tasks[10].additionalPrompt = 
            "This function takes a list l and returns a list l' such that l' is identical to l in the indicies that are not divisible by three, while its values at the indicies that are divisible by three are equal to the values of the corresponding indicies of l, but sorted" + "\n\n" +
            "Test cases:" + "\n" +
            "tuple(sort_third([5, 6, 3, 4, 8, 9, 2])) == tuple([2, 6, 3, 4, 8, 9, 5])\ntuple(sort_third([5, 8, 3, 4, 6, 9, 2])) == tuple([2, 8, 3, 4, 6, 9, 5])\ntuple(sort_third([5, 6, 9, 4, 8, 3, 2])) == tuple([2, 6, 9, 4, 8, 3, 5])\ntuple(sort_third([5, 6, 3, 4, 8, 9, 2, 1])) == tuple([2, 6, 3, 4, 8, 9, 5, 1])";
        }
        
        if (tasksChat && tasksChat.length > 10) {
          tasksChat[10].moreInfo = 
            "This function takes a list l and returns a list l' such that l' is identical to l in the indicies that are not divisible by three, while its values at the indicies that are divisible by three are equal to the values of the corresponding indicies of l, but sorted" + "\n\n" +
            "Test cases:" + "\n" +
            "tuple(sort_third([5, 6, 3, 4, 8, 9, 2])) == tuple([2, 6, 3, 4, 8, 9, 5])\ntuple(sort_third([5, 8, 3, 4, 6, 9, 2])) == tuple([2, 8, 3, 4, 6, 9, 5])\ntuple(sort_third([5, 6, 9, 4, 8, 3, 2])) == tuple([2, 6, 9, 4, 8, 3, 5])\ntuple(sort_third([5, 6, 3, 4, 8, 9, 2, 1])) == tuple([2, 6, 3, 4, 8, 9, 5, 1])";
        }

        if (tasks && tasks.length > 11) {
          tasks[11].additionalPrompt = 
            "def encode_cyclic(s: str):\n    \"\"\"\n    returns encoded string by cycling groups of three characters.\n    \"\"\"\n    # split string to groups. Each of length 3.\n    groups = [s[(3 * i):min((3 * i + 3), len(s))] for i in range((len(s) + 2) // 3)]\n    # cycle elements in each group. Unless group has fewer elements than 3.\n    groups = [(group[1:] + group[0]) if len(group) == 3 else group for group in groups]\n    return \"\".join(groups)\n\ndef decode_cyclic(s: str):\n    \"\"\"\n    takes as input string encoded with encode_cyclic function. Returns decoded string.\n    \"\"\"\n"
            + "\n\TESTCASE:\ndef check(candidate):\n    from random import randint, choice\n    import string\n\n    letters = string.ascii_lowercase\n    for _ in range(100):\n        str = ''.join(choice(letters) for i in range(randint(10, 20)))\n        encoded_str = encode_cyclic(str)\n        assert decode_cyclic(encoded_str) == str\n\n";
        }
        
        if (tasksChat && tasksChat.length > 11) {
          tasksChat[11].moreInfo = 
            "def encode_cyclic(s: str):\n    \"\"\"\n    returns encoded string by cycling groups of three characters.\n    \"\"\"\n    # split string to groups. Each of length 3.\n    groups = [s[(3 * i):min((3 * i + 3), len(s))] for i in range((len(s) + 2) // 3)]\n    # cycle elements in each group. Unless group has fewer elements than 3.\n    groups = [(group[1:] + group[0]) if len(group) == 3 else group for group in groups]\n    return \"\".join(groups)\n\ndef decode_cyclic(s: str):\n    \"\"\"\n    takes as input string encoded with encode_cyclic function. Returns decoded string.\n    \"\"\"\n"
            + "\n\TESTCASE:\ndef check(candidate):\n    from random import randint, choice\n    import string\n\n    letters = string.ascii_lowercase\n    for _ in range(100):\n        str = ''.join(choice(letters) for i in range(randint(10, 20)))\n        encoded_str = encode_cyclic(str)\n        assert decode_cyclic(encoded_str) == str\n\n";
        }

        localStorage.setItem('free-chat-gpt', JSON.stringify(parsedData));

        setTasks(tasks);
        setChats(tasksChat);
      }
    }
  }, []);

  return (
    <div className='overflow-hidden w-full h-full relative'>
      <Menu />
      <Chat />
      <SessionPopup />
      <Toast />
    </div>
  );
}

export default App;
