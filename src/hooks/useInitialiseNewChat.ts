import React from 'react';
import useStore from '@store/store';
import { MessageInterface } from '@type/chat';
import { generateDefaultChat } from '@constants/chat';

const useInitialiseNewChat = () => {
  const setChats = useStore((state) => state.setChats);
  const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

  const initialiseNewChat = () => {
    let conversations: any[] = [];
    let chats: any[] = [];

    conversations = [
      {
        title: "Algorithms Challenge",
        message: "Let's consider an n × n matrix A whose each row and each column is sorted. That is, A[i, j] ≤ A[i, j+1] and A[i, j] ≤ A[i+1, j]. Given a number x, we want to find whether x exists in this matrix or not. We try to generalize the Binary Search algorithm to 2 dimensions. We use divide-and-conquer (or reduce-and-conquer) approach. Probe the element at the center of the matrix. Based on the result, eliminate some part of the matrix from your search space and focus on the part(s) where your answer could lie." + "\n" +
        "(a) Give a pseudocode and English explanation for this algorithm." + "\n" +
        "(b) Set up a recurrence for the analysis of running time of this algorithm and obtain the best possible big-O complexity." + "\n" +
        "(c) Is there a better algorithm possible which is based on binary search? Is there a better algorithm possible, if we do not use binary search?" + "\n" +
        "(d) (*) What is the minimum number of probes any algorithm must do in the worst case in order to solve this problem?"
      },
      {
        title: "Ruby Challenges",
        message: "Write an algorithm to solve palidromes in Ruby"
      }
    ];

    conversations.forEach(obj => chats.push(generateDefaultChat(obj.title, "", obj.message, obj.message)));

    setChats(chats);
    setCurrentChatIndex(0);
  };

  return initialiseNewChat;
};

export default useInitialiseNewChat;
