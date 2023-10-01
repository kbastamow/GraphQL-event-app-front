import Concerts from "../components/Concerts";

const Home = () => {
  return (
    <>
      <div className="col-sm-12 col-md-6 bg bg-transparent">
        <div className="d-flex justify-content-center align-items-center py-5 mt-5">
          <h1> Concert Schedule</h1>
        </div>
      </div>
      <div className="col-md-6">
        <div className="d-flex flex-column justify-content-center align-items-center h-75 pb-5">
          <Concerts></Concerts>
        </div>
      </div>
    </>
  );
};

export default Home;
