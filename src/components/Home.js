import Notes from "./Notes.js";

const Home = (props) => {
  const { showAlert } = props;
  return (
    <>
      <Notes showAlert={showAlert} />
    </>
  );
};

export default Home;
