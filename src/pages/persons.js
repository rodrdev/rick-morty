import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/loading";
import "../styles/index.css";
import useQuery from "../hooks/useQuery";

function Persons() {
  let query = useQuery();
  const [persons, setPersons] = useState([]);
  const [inputPerson, setInputPerson] = useState("");
  const [filteredPerson, setFilteredPerson] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(
    parseInt(query.get("page")) || 1
  );
  const [isError, setIsError] = useState(false);

  const prev = () => {
    setCurrentPage(currentPage - 1);

    window.history.replaceState(null, null, `?page=${currentPage - 1}`);
  };

  const next = () => {
    setCurrentPage(currentPage + 1);
    window.history.replaceState(null, null, `?page=${currentPage + 1}`);
  };

  const getPersons = (page) => {
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(function (response) {
        setPersons(response.data.results);
        setCurrentPage(page);
        setTotalPages(response.data.info.pages);
      })
      .catch(() => setIsError(true));
  };

  useEffect(() => {
    getPersons(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (inputPerson) {
      setFilteredPerson(
        persons.filter((person) =>
          person.name.toLowerCase().includes(inputPerson.toLowerCase())
        )
      );
    } else {
      setFilteredPerson([]);
    }
  }, [inputPerson]);

  return (
    <div>
      {isError ? (
        <div>
          <img
            style={{ margin: "auto", display: "block", marginTop: "100px" }}
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/8c9a4232133393.5670691c3aec5.gif"
            alt=""
          />
          <h1 className="title">Not Found </h1>
        </div>
      ) : (
        <>
          <h1 className="title">The Rick & Morty </h1>

          {persons.length > 0 ? (
            <>
              <div className="input">
                <input
                  onChange={(e) => setInputPerson(e.target.value)}
                  type="text"
                  placeholder="
                  search for a character"
                />
              </div>

              <div className="grid">
                {(filteredPerson.length ? filteredPerson : persons).map(
                  (person) => (
                    <div key={person.id} className="box">
                      <div className="row">
                        <div className="col">
                          <img src={person.image} alt="" />
                        </div>
                        <div className="col">
                          <p className="name">{person.name}</p>
                          <div>
                            <p>
                              {person.status} - {person.species}
                            </p>
                          </div>
                          <div>
                            <p className="origin">Origin:</p>
                            <p>{person.origin.name}</p>
                          </div>
                          <div>
                            <p className="origin">Location:</p>
                            <p>{person.location.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <Loading />
          )}
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={prev}>
              Prev
            </button>

            <button style={{ background: "#f5f5f5", color: "#3c3e44" }}>
              {currentPage}
            </button>
            <button disabled={currentPage === totalPages} onClick={next}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default Persons;
