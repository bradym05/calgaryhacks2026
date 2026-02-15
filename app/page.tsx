import QuestionPage from "@/pages/question/[id]";

export default function Home() {
  return (
    <QuestionPage params={{id: "1"}}/>
  );
}
