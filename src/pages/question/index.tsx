/* eslint-disable prettier/prettier */
import WrapperLayouts from "../../layouts/wrapper/wrapper.layouts.tsx";
import { useEffect, useState } from "react";
import RenderQuestion from "./RenderQuestion.tsx";
import useQuiz from "@services/api/quiz";
import { QuizSubmitItem } from "@services/api/quiz/type";
import { useNavigate } from "react-router-dom";
import { ctaAction, formOptions, formSubmitTrigger, pageTrack } from "@hooks/useAdobe.ts";

const question_ids = [1, 2, 3];
const Question = () => {
  const navigate = useNavigate();
  const quiz_service = useQuiz();
  const [selected, setSelected] = useState<number | null>(1);
  const [lastChoice, setLastChoice] = useState<number | null>(null);
  const [answers, setAnswers] = useState<QuizSubmitItem[]>([]);
  const pushAnswer = (values: QuizSubmitItem) => {
    const newAnswers = answers.filter((item) => item.quiz_id !== values.quiz_id);
    setAnswers([...newAnswers, values]);
  };
  const handleChanges = (values: QuizSubmitItem) => {
    pushAnswer(values);
  };
  const handleBack = (id: number) => {
    const isAvailable = question_ids.find((item) => item === id);
    if (!isAvailable) {
      ctaAction("question-back-home|button", "Back Question");
      navigate("/");
      return;
    }
    const answer = answers.find((item) => item.quiz_id === id - 1);
    ctaAction("question-back|button", "Back Question");
    setLastChoice(answer?.answer_id ?? 1);
    setSelected(id);
  };
  const handleNext = () => {
    const next = (selected ?? 1) + 1;
    const isAvailable = question_ids.find((item) => item === next);
    if (!isAvailable) {
      return;
    }
    const answer = answers.find((item) => item.quiz_id === selected);
    setLastChoice(answer?.answer_id ?? 1);
    setSelected(next);
    ctaAction("question-next|button", "Next Question");
  };
  const selectAnswer = (id: number) => {
    return answers.find((item) => item.quiz_id === id)?.answer_id;
  };
  const handleSubmit = () => {
    quiz_service
      .submitQuizRPCDo({
        answers
      })
      .then((response) => {
        sessionStorage.removeItem("image");
        if (response?.errors) {
          return;
        }
        let choicesAll: string[] = [];
        answers.map((item) => {
          //extract item.choices flatten it
          if (item?.text) {
            choicesAll.push(item?.text);
          }
          return item;
        });
        formOptions(choicesAll.join("|"));
        formSubmitTrigger();
        ctaAction("question-submit|button", "Submit Question");
        navigate(
          `/tracking/question-${response?.entry_id}-${response?.dream_no}`
        );
      });
  };
  useEffect(() => {
    pageTrack();
  }, [window.location.pathname]);

  return (
    <WrapperLayouts isFull={true}>
      <div>
        <RenderQuestion
          handleBack={handleBack}
          selected={selected ?? 1}
          index={selected ? selected - 1 : 0}
          lastChoice={lastChoice}
          onChange={handleChanges}
          value={{
            quiz_id: selected ?? 1,
            answer_id: selectAnswer(selected ?? 1) ?? 0,
            text: ""
          }}
          handleNext={handleNext}
          isLast={selected === question_ids.length}
          handleSubmit={handleSubmit}
        />
      </div>
    </WrapperLayouts>
  );
};

export default Question;
