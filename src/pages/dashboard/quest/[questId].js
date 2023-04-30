import { useRouter } from "next/router";

const QuestPage = () => {
  const router = useRouter();
  const { questId } = router.query;

  // fetch the data for the quest with the given quest_id here...

  return (
    <div>
      <h1>Quest {questId}</h1>
      {/* render the quest details here... */}
    </div>
  );
};

export default QuestPage;
