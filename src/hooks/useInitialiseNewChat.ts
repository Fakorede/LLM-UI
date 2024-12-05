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
        title: "Problem 1",
        prompt: "[1.0, 2.0, 3.0], 0.5 == False, write code for it in Ruby",
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
        title: "Problem 2",
        prompt: "[1.0, 2.0, 3.0, 4.0], 1.0 write code for it in Ruby",
        additionalPrompt:  "For a given list of input numbers, calculate Mean Absolute Deviation around the mean of this dataset. Mean Absolute Deviation is the average absolute difference between each element and a centerpoint (mean in this case):\n  MAD = average | x - x_mean |" + "\n\n" +
        "Test cases:" + "\n" +
        "[1.0, 2.0, 3.0]) - 2.0/3.0) < 1e-6" + "\n" +
        "([1.0, 2.0, 3.0, 4.0]) - 1.0) < 1e-6" + "\n" +
        "[1.0, 2.0, 3.0, 4.0, 5.0]) - 6.0/5.0) < 1e-6",
      },
      {
        title: "Problem 3",
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
        title: "Problem 4",
        prompt: "('010', '110'), '100' write code for it in Ruby",
        additionalPrompt: "Input are two strings a and b consisting only of 1s and 0s.\nPerform binary XOR on these inputs and return result also as a string.\n\n\nTest Cases: \n\n('111000', '101010') == '010010' \n\n('1', '1') == '0' \n\n('0101', '0000') == '0101' \n\n",
      },
      {
        title: "Problem 5",
        prompt: "(3, 5), 1 write code for it in Ruby",
        additionalPrompt: "Return a greatest common divisor of two integers a and b." + "\n\n" +
        "Test cases:" + "\n" +
        "3, 5 => 1" + "\n" +
        "25, 15 => 5" + "\n" +
        "49, 14 => 7" + "\n" +
        "144, 60 => 12",
      },
      {
        title: "Problem 6",
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
        title: "Problem 7",
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
        title: "Problem 8",
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
        title: "Problem 9",
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
        title: "Problem 10",
        prompt: "round(find_zero([1, 2]), 2), -0.5, write code for it in Ruby",
        additionalPrompt: "round(find_zero([1, 2]), 2), -0.5, write code for it in Ruby" + "\n\n" +
        "Test cases:" + "\n" +
        "Evaluates polynomial with coefficients xs at point x.\n    return xs[0] + xs[1] * x + xs[1] * x^2 + .... xs[n] * x^n\n    \"\"\"\n    return sum([coeff * math.pow(x, i) for i, coeff in enumerate(xs)])\n\n\ndef find_zero(xs: list):\n    \"\"\" xs are coefficients of a polynomial.\n    find_zero find x such that poly(x) = 0.\n    find_zero returns only only zero point, even if there are many.\n    Moreover, find_zero only takes list xs having even number of coefficients\n    and largest non zero coefficient as it guarantees\n    a solution.\n\n\nTest Cases: import math\n import random\n  rng = random.Random(42)\n  import copy\n for _ in range(100):\n ncoeff = 2 * rng.randint(1, 4)\n  coeffs = []\n for _ in range(ncoeff):\n coeff = rng.randint(-10, 10)\n if coeff == 0:\n coeff = 1\n coeffs.append(coeff)\n  solution = find_zero(copy.deepcopy(coeffs))\n assert math.fabs(poly(coeffs, solution)) \u003C 1e-4\n\n"
        + "\n" + "",
      },
      {
        title: "Problem 11",
        prompt: "([5, 6, 3, 4, 8, 9, 2]), [2, 6, 3, 4, 8, 9, 5], write code for it in Ruby",
        additionalPrompt: "This function takes a list l and returns a list l' such that l' is identical to l in the indicies that are not divisible by three, while its values at the indicies that are divisible by three are equal to the values of the corresponding indicies of l, but sorted" + "\n\n" +
        "Test cases:" + "\n" +
        "tuple(sort_third([5, 6, 3, 4, 8, 9, 2])) == tuple([2, 6, 3, 4, 8, 9, 5])\ntuple(sort_third([5, 8, 3, 4, 6, 9, 2])) == tuple([2, 8, 3, 4, 6, 9, 5])\ntuple(sort_third([5, 6, 9, 4, 8, 3, 2])) == tuple([2, 6, 9, 4, 8, 3, 5])\ntuple(sort_third([5, 6, 3, 4, 8, 9, 2, 1])) == tuple([2, 6, 3, 4, 8, 9, 5, 1])",
      },
      {
        title: "Problem 12",
        prompt: "encode_cyclic(abcdefgh) = (bcaefdgh), decode_cyclic(bcaefdgh) = (abcdefgh), write code for it in Ruby",
        additionalPrompt: "returns encoded string by cycling groups of three characters.\n    \"\"\"\n    # split string to groups. Each of length 3.\n    groups = [s[(3 * i):min((3 * i + 3), len(s))] for i in range((len(s) + 2) // 3)]\n    # cycle elements in each group. Unless group has fewer elements than 3.\n    groups = [(group[1:] + group[0]) if len(group) == 3 else group for group in groups]\n    return \"\".join(groups)\n\n\ndef decode_cyclic(s: str):\n    \"\"\"\n    takes as input string encoded with encode_cyclic function. Returns decoded string.\n\n\nTest Cases:  from random import randint, choice\n    import string\n\n    letters = string.ascii_lowercase\n    for _ in range(100):\n        str = ''.join(choice(letters) for i in range(randint(10, 20)))\n        encoded_str = encode_cyclic(str)\n        assert encode_cyclic(encoded_str) == str\n\n\n\n" +
        ""
      },
      {
        title: "Problem 13",
        prompt: "[3, 4, 5, 1, 2] => True write code for it in Ruby",
        additionalPrompt: "We have an array 'arr' of N integers arr[1], arr[2], ..., arr[N]. The numbers in the array will be randomly ordered. Your task is to determine if it is possible to get an array sorted in non-decreasing order by performing the following operation on the given array:\nYou are allowed to perform right shift operation any number of times.\nOne right shift operation means shifting all elements of the array by one position in the right direction. The last element of the array will be moved to the starting position in the array i.e. 0th index. \nIf it is possible to obtain the sorted array by performing the above operation then return True else return False. If the given array is empty then return True.\nNote: The given list is guaranteed to have unique elements." + "\n\n" +
        "For example:" + "\n" +
        "[3, 4, 5, 1, 2] => True\nExplanation: By performin 2 right shift operations, non-decreasing order can be achieved for the given array." + "\n" +
        "[3, 5, 4, 1, 2] => False\nExplanation: It is not possible to get non-decreasing order for the given array by performing any number of right shift operations." + "\n" +
        "Test cases:" + "\n" +
        "[3, 4, 5, 1, 2] => True" + "\n" +
        "[3, 5, 10, 1, 2] => True" + "\n" +
        "[4, 3, 1, 2] => False" + "\n" +
        "[3, 5, 4, 1, 2] => True" + "\n" +
        "[] => True",
      },
      {
        title: "Problem 14",
        prompt: "([[0,0,1,0], [0,1,0,0], [1,1,1,1]], 1) => 6, write code for it in Ruby",
        additionalPrompt: "You are given a rectangular grid of wells. Each row represents a single well, and each 1 in a row represents a single unit of water. Each well has a corresponding bucket that can be used to extract water from it, and all buckets have the same capacity.\nYour task is to use the buckets to empty the wells. Output the number of times you need to lower the buckets." + "\n\n" +
        "Example 1:\nInput:\ngrid: [[0,0,1,0], [0,1,0,0], [1,1,1,1]]\nbucket_capacity : 1\nOutput: 6" + "\n\n" +
        "Example 2:\nInput:\ngrid: [[0,0,1,1], [0,0,0,0], [1,1,1,1], [0,1,1,1]]\nbucket_capacity : 2\nOutput: 5" + "\n\n" +
        "Example 3:\nInput:\ngrid: [[0,0,0], [0,0,0]]\nbucket_capacity : 5\nOutput: 0" + "\n\n" +
        "Constraints:\n* all wells have the same length\n* 1 \u003C= grid.length \u003C= 10^2\n* 1 \u003C= grid[:,1].length \u003C= 10^2\n* grid[i][j] -\u003E 0 | 1\n* 1 \u003C= capacity \u003C= 10" + "\n\n" +
        "Test cases:" + "\n" +
        "([[0,0,1,0], [0,1,0,0], [1,1,1,1]], 1) => 6" + "\n" +
        "([[0,0,1,1], [0,0,0,0], [1,1,1,1], [0,1,1,1]], 2) => 5" + "\n" +
        "([[0,0,0], [0,0,0]], 5) => 0" + "\n" +
        "([[1,1,1,1], [1,1,1,1]], 2) => 4" + "\n" +
        "([[1,1,1,1], [1,1,1,1]], 9) => 2",
      },
      {
        title: "Problem 15",
        prompt: "(5), [1, 5], write code for it in Ruby",
        additionalPrompt: "Given a positive integer n, return a sorted list that has the odd numbers in collatz sequence.\n\n    The Collatz conjecture is a conjecture in mathematics that concerns a sequence defined\n    as follows: start with any positive integer n. Then each term is obtained from the \n    previous term as follows: if the previous term is even, the next term is one half of \n    the previous term. If the previous term is odd, the next term is 3 times the previous\n    term plus 1. The conjecture is that no matter what value of n, the sequence will always reach 1.\n\n    Note: \n        1. Collatz(1) is [1].\n        2. returned list sorted in increasing order.\n\n    For example:\n    get_odd_collatz(5) returns [1, 5] # The collatz sequence for 5 is [5, 16, 8, 4, 2, 1], so the odd numbers are only 1, and 5." + "\n\n" +
        "Test cases:" + "\n" +
        "(14) == [1, 5, 7, 11, 13, 17]" + "\n" +
        "(5) == [1, 5]" + "\n" +
        "(12) == [1, 3, 5]" + "\n" +
        "(1) == [1]",
      },
      {
        title: "Problem 16",
        prompt: "([[5,9,3], [4,1,6], [7,8,2]], 1), [1], write code for it in Ruby",
        additionalPrompt: "Given a grid with N rows and N columns (N \u003E= 2) and a positive integer k, \n    each cell of the grid contains a value. Every integer in the range [1, N * N]\n    inclusive appears exactly once on the cells of the grid.\n\n    You have to find the minimum path of length k in the grid. You can start\n    from any cell, and in each step you can move to any of the neighbor cells,\n    in other words, you can go to cells which share an edge with you current\n    cell.\n    Please note that a path of length k means visiting exactly k cells (not\n    necessarily distinct).\n    You CANNOT go off the grid.\n    A path A (of length k) is considered less than a path B (of length k) if\n    after making the ordered lists of the values on the cells that A and B go\n    through (let's call them lst_A and lst_B), lst_A is lexicographically less\n    than lst_B, in other words, there exist an integer index i (1 \u003C= i \u003C= k)\n    such that lst_A[i] \u003C lst_B[i] and for any j (1 \u003C= j \u003C i) we have\n    lst_A[j] = lst_B[j].\n    It is guaranteed that the answer is unique.\n    Return an ordered list of the values on the cells that the minimum path go through." + "\n\n" +
        "Examples:\n\n        Input: grid = [ [1,2,3], [4,5,6], [7,8,9]], k = 3\n        Output: [1, 2, 1]\n\n        Input: grid = [ [5,9,3], [4,1,6], [7,8,2]], k = 1\n        Output: [1]" + "\n\n" +
        "Test cases:" + "\n\n" +
        "([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 3) == [1, 2, 1] \n\n([[5, 9, 3], [4, 1, 6], [7, 8, 2]], 1) == [1] \n\n([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]], 4) == [1, 2, 1, 2] \n\n([[6, 4, 13, 10], [5, 7, 12, 1], [3, 16, 11, 15], [8, 14, 9, 2]], 7) == [1, 10, 1, 10, 1, 10, 1] \n\n([[8, 14, 9, 2], [6, 4, 13, 15], [5, 7, 1, 12], [3, 10, 11, 16]], 5) == [1, 7, 1, 7, 1] \n\n([[11, 8, 7, 2], [5, 16, 14, 4], [9, 3, 15, 6], [12, 13, 10, 1]], 9) == [1, 6, 1, 6, 1, 6, 1, 6, 1] \n\n([[12, 13, 10, 1], [9, 3, 15, 6], [5, 16, 14, 4], [11, 8, 7, 2]], 12) == [1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6] \n\n([[2, 7, 4], [3, 1, 5], [6, 8, 9]], 8) == [1, 3, 1, 3, 1, 3, 1, 3] \n\n([[6, 1, 5], [3, 8, 9], [2, 7, 4]], 8) == [1, 5, 1, 5, 1, 5, 1, 5] \n\n([[1, 2], [3, 4]], 10) == [1, 2, 1, 2, 1, 2, 1, 2, 1, 2] \n\n([[1, 3], [3, 2]], 10) == [1, 3, 1, 3, 1, 3, 1, 3, 1, 3]",
      },
      {
        title: "Problem 17",
        prompt: "([1, 2, 3, 4]), [1, 4, 2, 3], write code for it in Ruby",
        additionalPrompt: "Given list of integers, return list in strange order.\n    Strange sorting, is when you start with the minimum value,\n    then maximum of the remaining integers, then minimum and so on.\n\n    Examples:\n    strange_sort_list([1, 2, 3, 4]) == [1, 4, 2, 3]\n    strange_sort_list([5, 5, 5, 5]) == [5, 5, 5, 5]\n    strange_sort_list([]) == []" + "\n\n" +
        "Test cases:" + "\n\n" +
        "([1, 2, 3, 4]) == [1, 4, 2, 3] \n\n([5, 6, 7, 8, 9]) == [5, 9, 6, 8, 7] \n\n([1, 2, 3, 4, 5]) == [1, 5, 2, 4, 3] \n\n([5, 6, 7, 8, 9, 1]) == [1, 9, 5, 8, 6, 7] \n\n([5, 5, 5, 5]) == [5, 5, 5, 5] \n\n([]) == [] \n\n([1,2,3,4,5,6,7,8]) == [1, 8, 2, 7, 3, 6, 4, 5] \n\n([0,2,2,2,5,5,-5,-5]) == [-5, 5, -5, 5, 0, 2, 2, 2] \n\n([111111]) == [111111]",
      },
      {
        title: "Problem 18",
        prompt: "(5, 6, 10), [11, 4], write code for it in Ruby",
        additionalPrompt: "You're a hungry rabbit, and you already have eaten a certain number of carrots, but now you need to eat more carrots to complete the day's meals.\nYou should return an array of [ total number of eaten carrots after your meals, the number of carrots left after your meals ]\nif there are not enough remaining carrots, you will eat all remaining carrots, but will still be hungry." + "\n\n" +
        "Example:\n    * eat(5, 6, 10) -\u003E [11, 4]\n    * eat(4, 8, 9) -\u003E [12, 1]\n    * eat(1, 10, 10) -\u003E [11, 0]\n    * eat(2, 11, 5) -\u003E [7, 0]\n    \n    Variables:\n    @number : integer\n        the number of carrots that you have eaten.\n    @need : integer\n        the number of carrots that you need to eat.\n    @remaining : integer\n        the number of remaining carrots thet exist in stock\n    \n    Constrain:\n    * 0 \u003C= number \u003C= 1000\n    * 0 \u003C= need \u003C= 1000\n    * 0 \u003C= remaining \u003C= 1000\n\n    Have fun :)\n\n" +
        "Test cases:" + "\n" +
        "(5, 6, 10) == [11, 4]\n(4, 8, 9) == [12, 1]\n(1, 10, 10) == [11, 0]\n(2, 11, 5) == [7, 0]\n(4, 5, 7) == [9, 2]\n(4, 5, 1) == [5, 0]",
      },
      {
        title: "Problem 19",
        prompt: "(5), [1, 2, 6, 24, 15], write code for it in Ruby",
        additionalPrompt: "Implement the function f that takes n as a parameter,\n    and returns a list of size n, such that the value of the element at index i is the factorial of i if i is even\n    or the sum of numbers from 1 to i otherwise.\n    i starts from 1.\n    the factorial of i is the multiplication of the numbers from 1 to i (1 * 2 * ... * i).\n    Example:\n    f(5) == [1, 2, 6, 24, 15]" + "\n\n" +
        "Test cases:" + "\n\n" +
        "(5) == [1, 2, 6, 24, 15]\n(7) == [1, 2, 6, 24, 15, 720, 28]\n(1) == [1]\n(3) == [1, 2, 6]",
      },
      {
        title: "Problem 20",
        prompt: "(['()(', ')']), 'Yes', write code for it in Ruby",
        additionalPrompt: "You are given a list of two strings, both strings consist of open\n    parentheses '(' or close parentheses ')' only.\n    Your job is to check if it is possible to concatenate the two strings in\n    some order, that the resulting string will be good.\n    A string S is considered to be good if and only if all parentheses in S\n    are balanced. For example: the string '(())()' is good, while the string\n    '())' is not.\n    Return 'Yes' if there's a way to make a good string, and return 'No' otherwise.\n\n    Examples:\n    match_parens(['()(', ')']) == 'Yes'\n    match_parens([')', ')']) == 'No'" + "\n\n" +
        "Test cases:" + "\n" +
        "(['()(', ')']) == 'Yes'\n  ([')', ')']) == 'No'\n  (['(()(())', '())())']) == 'No'\n   ([')())', '(()()(']) == 'Yes'\n  (['(())))', '(()())((']) == 'Yes'\n   (['()', '())']) == 'No'\n  (['(()(', '()))()']) == 'Yes'\n  (['((((', '((())']) == 'No'\n  ([')(()', '(()(']) == 'No'\n   ([')(', ')(']) == 'No'\n    \n\n   (['(', ')']) == 'Yes'\n  [')', '(']) == 'Yes'",
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
