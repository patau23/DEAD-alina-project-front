import { useState } from "react";
import items from "./mini-api";

function Home() {
  const [Active, setActive] = useState(null);
  console.log(items);
  const getCoursesofBranch = () => {};

  return (
    <>
      <div className="split navigation">
        <TopContentNavigationBar
          title={"Разделы"}
          buttonText={"+ Другие разделы"}
        />
        <div className="internal">
          <div className="scroller-wrapper">
            <div className="tabs-wrapper">
              {items.map((item, i) => (
                <button
                  key={i}
                  className={`tab ${i === Active ? " active" : ""}`}
                  onClick={(e) => setActive(+e.target.dataset.index)}
                  data-title={item}
                  data-index={i}
                >
                  <p
                    onClick={(e) => setActive(+e.target.dataset.index)}
                    data-index={i}
                  >
                    {item.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="split content">
        <div className="split maincontent">
          {items[Active] && <TabContent {...items[Active]} /> ? (
            items[Active] && <TabContent {...items[Active]} />
          ) : (
            <div id="choseTab">
              <h1>
                Выберите из навигационного меню, пункт, который вам больше всего
                приглянулся
              </h1>
            </div>
          )}
        </div>

        <div className="split profile">
          {/*
           */}
        </div>
      </div>
    </>
  );
}

const TabContent = ({ title, courses }) => (
  <div className="tabcontent">
    <h3>{title}</h3>
    {courses.map((course, i) => (
      <>
        <p key={i}>{course.title}</p>
        <p key={i}>{course.description}</p>
      </>
    ))}
  </div>
);

const Card = (course, i) => {};

const TopContentNavigationBar = ({ title, buttonText, onClickEvent }) => {
  return (
    <div className="external">
      <h1>{title}</h1>
      <button className="but" onClick={() => onClickEvent()}>
        {buttonText}
      </button>
    </div>
  );
};

export default Home;
