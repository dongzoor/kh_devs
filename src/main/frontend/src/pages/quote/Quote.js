import styled from "styled-components";

const Content = styled.div`
  font-size: 1.5rem;
  text-align: center;
  white-space: pre-wrap;
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
function Quote() {
  const quotes = [
    "훌륭한 코드는 훌륭한 문서보다 낫다.",
    "A deployed MVP is worth two prototyped.",
    "컴퓨터 언어를 설계하는 건 공원을 산책하는 것과 같다. \n 쥬라기 공원!!!",
    "Don't commit on master when drunk.",
    "세상에는 딱 두 가지 프로그래밍 언어가 있다. \n 사람들이 욕하는 언어와 아무도 사용하지 않는 언어.",
    "A git pull a day, keeps the doctor away.",
    "우리는 프로그래머 3대 미덕을 잘 알고 있다. \n 게으름, 괴팍함, 그리고 자만심.",
    "사람은 반복문을 쓰고, \n 신은 재귀함수를 쓴다.",
    "Even a wizened engineer will drop production DB.",
    "Boolean 이 좋은 것은 \n 당신이 설령 잘못했더라도 한 bit만 바꾸면 된다는 것이다.",
    "A hundred programmers won't make a two-year project in a week.",
    "Facebook wasn't built in a day.",
    "A poor programmer blames the language.",
    "Anger and stubborness make bad allies in code review",
    "프로그래머의 문제점은 일이 너무 늦어질 때까지, \n 뭘하고 있는지 절대 물어볼 수 없다는 점이다.",
    "The better job you do, \n the easier others discount the level of difficulty.",
    "Testing is easier than debugging.",
    "Customers are the best testers.",
    "Absence is beauty, in error logs.",
    "Eternal sunshine of the stateless mind.",
    "Laziness is your best friend. \n Never do twice what you can automate once.",
    "올바로 작동하지 않는다고 걱정하지 마라. \n 모든 게 잘 되었다면, 내가 할 일이 없어진다.",
    "The best code is no code at all.",
    "The best request is the one you don't make.",
    "아무리 구조가 잘 되어 있더라도, \n 프로그래머가 나쁜 프로그램을 만드는 걸 \n 막아주는 프로그래밍 언어는 없다.",
    "먼저 문제를 풀고 그 다음에 개발을 하라.",
    "Without a prototype, don't build a final product.",
    "Code frustration is a bad advisor for a refactor.",
    "The more technology you learn, \n the more you realize how little you know.",
    "All applications are pretty when your screen is off.",
    "Commit or do not commit, there is no try",
    "A poor programmer blames the language.",
    "당신이 6개월 이상 한 번도 보지 않은 코드는 \n 다른 사람이 다시 만드는 게 훨씬 더 나을 수 있다.",
    "당신의 컴퓨터에서 돌아가는 건 중요하지 않다. \n 당신의 컴퓨터로 서비스하는 게 아니기 때문이다.",
    "Anger and stubborness make bad allies in code review",
    "There is no test without first a failure",
    "Small bug becomes a huge problem.",
    "Your code might be perfect but you aren't",
    "Learn a programming language, become a new developer.",
  ];

  const getRandomIndex = (length) => {
    return parseInt(Math.random() * length);
  };

  return <Content>"{quotes[getRandomIndex(quotes.length)]}"</Content>;
}

export default Quote;
