import React from 'react';
import useStore from '@store/store';
import { MessageInterface } from '@type/chat';
import { generateDefaultChat } from '@constants/chat';

const useInitialiseNewChat = () => {
  const setChats = useStore((state) => state.setChats);
  const setTasks = useStore((state) => state.setTasks);
  const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

  const initialiseNewChat = () => {
    let tasks: any[] = [];
    let chats: any[] = [];

    tasks = [
      {
        title: "HumanEval/0",
        prompt: "[1.0, 2.0, 3.0], 0.5 write code for it in Ruby",
        additionalPrompt:  "Check if in given list of numbers, are any two numbers closer to each other than given threshold." + "\n\n" +
        "Test cases:" + "\n" +
        "[1.0, 2.0, 3.0], 0.5 == False" + "\n" +
        "[1.0, 2.8, 3.0, 4.0, 5.0, 2.0], 0.3 == True" + "\n" +
        "[1.0, 2.0, 3.9, 4.0, 5.0, 2.2], 0.3 == True" + "\n" +
        "[1.0, 2.0, 3.9, 4.0, 5.0, 2.2], 0.05 == False" + "\n" +
        "[1.0, 2.0, 5.9, 4.0, 5.0], 0.95 == True " + "\n" +
        "[1.0, 2.0, 5.9, 4.0, 5.0], 0.8 == False " + "\n" +
        "[1.0, 2.0, 3.0, 4.0, 5.0, 2.0], 0.1 == True" + "\n" +
        "[1.1, 2.2, 3.1, 4.1, 5.1], 1.0 == True " + "\n" +
        "[1.1, 2.2, 3.1, 4.1, 5.1], 0.5 == False",
      },
      {
        title: "HumanEval/4",
        prompt: "[1.0, 2.0, 3.0, 4.0], 1.0 write code for it in Ruby",
        additionalPrompt:  "For a given list of input numbers, calculate Mean Absolute Deviation around the mean of this dataset. Mean Absolute Deviation is the average absolute difference between each element and a centerpoint (mean in this case):\n  MAD = average | x - x_mean |" + "\n\n" +
        "Test cases:" + "\n" +
        "[1.0, 2.0, 3.0]) - 2.0/3.0) < 1e-6" + "\n" +
        "([1.0, 2.0, 3.0, 4.0]) - 1.0) < 1e-6" + "\n" +
        "[1.0, 2.0, 3.0, 4.0, 5.0]) - 6.0/5.0) < 1e-6",
      },
      {
        title: "HumanEval/8",
        prompt: "[1, 2, 3, 4], (10, 24) write code for it in Ruby",
        additionalPrompt: "For a given list of integers, return a tuple consisting of a sum and a product of all the integers in a list.\n Empty sum should be equal to 0 and empty product should be equal to 1." + "\n\n" +
        "Test cases:" + "\n" +
        "[1, 1, 1] == (3, 1)" + "\n" +
        "[100, 0] == (100, 0)" + "\n" +
        "[3, 5, 7] == (3 + 5 + 7, 3 * 5 * 7)" + "\n" +
        "[10] == (10, 10)" + "\n" +
        "[] == (0, 1)",
      },
      {
        title: "HumanEval/11",
        prompt: "('010', '110'), '100' write code for it in Ruby",
        additionalPrompt: "Input are two strings a and b consisting only of 1s and 0s. Perform binary XOR on these inputs and return result also as a string." + "\n\n" +
        "Test cases:" + "\n" +
        "'010', '110' == '100'" + "\n" +
        "'111000', '101010' == '010010'" + "\n" +
        "'1', '1' == '0'" + "\n" +
        "'0101', '0000' == '0101'",
      },
      {
        title: "HumanEval/13",
        prompt: "(3, 5), 1 write code for it in Ruby",
        additionalPrompt: "Return a greatest common divisor of two integers a and b." + "\n\n" +
        "Test cases:" + "\n" +
        "3, 5 => 1" + "\n" +
        "25, 15 => 5" + "\n" +
        "49, 14 => 7" + "\n" +
        "144, 60 => 12",
      },
      {
        title: "HumanEval/16",
        prompt: "('xyzXYZ'), 3 write code for it in Ruby",
        additionalPrompt: "Given a string, find out how many distinct characters (regardless of case) does it consist of" + "\n\n" +
        "Test cases:" + "\n" +
        "'Jerry' => 4" + "\n" +
        "'' => 0" + "\n" +
        "'abcde' => 5" + "\n" +
        "'abcde' + 'cade' + 'CADE' => 5" + "\n" +
        "'aaaaAAAAaaaa' => 1" + "\n" +
        "'Jerry jERRY JeRRRY' => 5",
      },
      {
        title: "HumanEval/19",
        prompt: "'three one five', 'one three five' write code for it in Ruby",
        additionalPrompt: "Input is a space-delimited string of numberals from 'zero' to 'nine'. Valid choices are 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight' and 'nine'.\nReturn the string with numbers sorted from smallest to largest" + "\n\n" +
        "Test cases:" + "\n" +
        "'' => ''" + "\n" +
        "'three' => 'three'" + "\n" +
        "'three five nine' => 'three five nine'" + "\n" +
        "'five zero four seven nine eight' => 'zero four five seven eight nine'" + "\n" +
        "'six five four three two one zero' => 'zero one two three four five six'" + "\n" +
        "'three one five' => 'one three five'",
      },
      {
        title: "HumanEval/25",
        prompt: "8 => [2, 2, 2] write code for it in Ruby",
        additionalPrompt: "Return list of prime factors of given integer in the order from smallest to largest. Each of the factors should be listed number of times corresponding to how many times it appeares in factorization.\n Input number should be equal to the product of all factors" + "\n\n" +
        "Test cases:" + "\n" +
        "8 => [2, 2, 2]" + "\n" +
        "25 => [5, 5]" + "\n" +
        "70 => [2, 5, 7]" + "\n" +
        "2 => [2]" + "\n" +
        "4 => [2, 2]" + "\n" +
        "3 * 19 => [3, 19]" + "\n" +
        "3 * 19 * 3 * 19 => [3, 3, 19, 19]" + "\n" +
        "3 * 19 * 3 * 19 * 3 * 19 => [3, 3, 3, 19, 19, 19]" + "\n" +
        "3 * 19 * 19 * 19 => [3, 19, 19, 19]" + "\n" +
        "3 * 2 * 3 => [2, 3, 3]",
      },
      {
        title: "HumanEval/30",
        prompt: "[-1, -2] == [] write code for it in Ruby",
        additionalPrompt: "Return only positive numbers in the list." + "\n\n" +
        "Test cases:" + "\n" +
        "[-1, 2, -4, 5, 6] => [2, 5, 6]" + "\n" +
        "[5, 3, -5, 2, -3, 3, 9, 0, 123, 1, -10] => [5, 3, 2, 3, 9, 123, 1]" + "\n" +
        "[-1, -2, 4, 5, 6] => [4, 5, 6]" + "\n" +
        "[5, 3, -5, 2, 3, 3, 9, 0, 123, 1, -10] => [5, 3, 2, 3, 3, 9, 123, 1]" + "\n" +
        "[-1, -2] => []" + "\n" +
        "[] => []",
      },
      {
        title: "HumanEval/32",
        prompt: "write code for it in Ruby",
        additionalPrompt: "" + "\n\n" +
        "Test cases:" + "\n" +
        "[-1, 2, -4, 5, 6] => [2, 5, 6]" + "\n" +
        "[] == []",
      },
      {
        title: "HumanEval/33",
        prompt: "write code for it in Ruby",
        additionalPrompt: "This function takes a list l and returns a list l' such that l' is identical to l in the indicies that are not divisible by three, while its values at the indicies that are divisible by three are equal to the values of the corresponding indicies of l, but sorted" + "\n\n" +
        "Test cases:" + "\n" +
        "[-1, 2, -4, 5, 6] => [2, 5, 6]" + "\n" +
        "[] == []",
      },
      {
        title: "HumanEval/38",
        prompt: "write code for it in Ruby",
        additionalPrompt: "" + "\n\n" +
        "Test cases:" + "\n" +
        "[-1, 2, -4, 5, 6] => [2, 5, 6]" + "\n" +
        "[] == []",
      },
      {
        title: "HumanEval/109",
        prompt: "write code for it in Ruby",
        additionalPrompt: "" + "\n\n" +
        "Test cases:" + "\n" +
        "[-1, 2, -4, 5, 6] => [2, 5, 6]" + "\n" +
        "[] == []",
      },
      {
        title: "HumanEval/115",
        prompt: "write code for it in Ruby",
        additionalPrompt: "" + "\n\n" +
        "Test cases:" + "\n" +
        "[-1, 2, -4, 5, 6] => [2, 5, 6]" + "\n" +
        "[] == []",
      },
      {
        title: "HumanEval/123",
        prompt: "write code for it in Ruby",
        additionalPrompt: "" + "\n\n" +
        "Test cases:" + "\n" +
        "[-1, 2, -4, 5, 6] => [2, 5, 6]" + "\n" +
        "[] == []",
      },
      {
        title: "HumanEval/129",
        prompt: "write code for it in Ruby",
        additionalPrompt: "" + "\n\n" +
        "Test cases:" + "\n" +
        "[-1, 2, -4, 5, 6] => [2, 5, 6]" + "\n" +
        "[] == []",
      },
      {
        title: "HumanEval/70",
        prompt: "write code for it in Ruby",
        additionalPrompt: "" + "\n\n" +
        "Test cases:" + "\n" +
        "[-1, 2, -4, 5, 6] => [2, 5, 6]" + "\n" +
        "[] == []",
      },
      {
        title: "HumanEval/159",
        prompt: "write code for it in Ruby",
        additionalPrompt: "" + "\n\n" +
        "Test cases:" + "\n" +
        "[-1, 2, -4, 5, 6] => [2, 5, 6]" + "\n" +
        "[] == []",
      },
      {
        title: "HumanEval/106",
        prompt: "write code for it in Ruby",
        additionalPrompt: "" + "\n\n" +
        "Test cases:" + "\n" +
        "[-1, 2, -4, 5, 6] => [2, 5, 6]" + "\n" +
        "[] == []",
      },
      {
        title: "HumanEval/119",
        prompt: "write code for it in Ruby",
        additionalPrompt: "" + "\n\n" +
        "Test cases:" + "\n" +
        "[-1, 2, -4, 5, 6] => [2, 5, 6]" + "\n" +
        "[] == []",
      },
    ];

    tasks.forEach(obj => chats.push(generateDefaultChat(obj.title, "", obj.prompt, obj.additionalPrompt)));

    setTasks(tasks);
    setChats(chats);
    setCurrentChatIndex(0);
  };

  return initialiseNewChat;
};

export default useInitialiseNewChat;
