function Quote() {
  const quotes = [
    "Dance like nobody is watching, code like everybody is.",
    "A deployed MVP is worth two prototyped.",
    "A/B Test twice, deploy changes once.",
    "Don't commit on master when drunk.",
    "Sleep on a force push.",
    "A git pull a day, keeps the doctor away.",
    "Sometimes you have to cut legacy support to allow the new product to bloom.",
    "More hours worked, more commits made. Mostly reverts and bug-causing features.",
    "Even a wizened engineer will drop production DB.",
    "Scope creep makes a mountain.",
    "A hundred programmers won't make a two-year project in a week.",
    "Facebook wasn't built in a day.",
    "A poor programmer blames the language.",
    "Anger and stubborness make bad allies in code review",
    "Learning obscure and strange languages, yields better understanding and broader horizons.",
    "The better job you do, the easier others discount the level of difficulty.",
    "Testing is easier than debugging.",
    "Customers are the best testers.",
    "Absence is beauty, in error logs.",
    "Eternal sunshine of the stateless mind.",
    "Laziness is your best friend.  Never do twice what you can automate once.",
    "Good test coverage + automated workflows = quiet cell phones and better sleep.",
    "The best code is no code at all.",
    "The best request is the one you don't make.",
    "Leave architecture for applications that require long-term support.",
    "Architecture and design are preparations for problems and changes, not a key to runtime.",
    "Without a prototype, don't build a final product.",
    "Code frustration is a bad advisor for a refactor.",
    "The more technology you learn, the more you realize how little you know.",
    "All applications are pretty when your screen is off.",
    "Commit or do not commit, there is no try",
    "A poor programmer blames the language.",
    "Don't put all your logic in one method basket",
    "Diff before you Push",
    "Anger and stubborness make bad allies in code review",
    "There is no test without first a failure",
    "Small bug becomes a huge problem.",
    "Your code might be perfect but you aren't",
    "Learn a programming language, become a new developer.",
  ];

  const getRandomIndex = (length) => {
    return parseInt(Math.random() * length);
  };

  return (
    <div style={{ fontSize: "1.2rem" }}>
      {quotes[getRandomIndex(quotes.length)]}
    </div>
  );
}

export default Quote;
