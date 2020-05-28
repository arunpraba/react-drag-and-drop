import React, { useState, Fragment } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TimeLineCard = () => {
  const [columnOrder, setColumnOrder] = useState([
    "intro",
    "written",
    "video",
    "outro"
  ]);

  const [questions, setQuestions] = useState({
    video: {
      question1: {
        id: "question1",
        question: "Tell me about yourself.?"
      },
      question2: {
        id: "question2",
        question: "What are your strengths?"
      },
      practice1: {
        id: "practice1",
        question: "What are your strengths?"
      },
      practice2: {
        id: "practice2",
        question: "Why do you want this job?"
      }
    },
    audio: {
      practice1: {
        id: "practice1",
        question: "What are your strengths?"
      },
      question1: {
        id: "practice2",
        question: "Why do you want this job?"
      }
    }
  });

  const [columns] = useState({
    intro: {
      id: "intro",
      title: "Intro"
    },
    video: {
      id: "video",
      title: "Video",
      questionIds: ["practice1", "practice2", "question1", "question2"]
    },
    audio: {
      id: "video",
      title: "Video",
      questionIds: ["practice1", "question1"]
    },
    written: {
      id: "written",
      title: "Written"
    },
    outro: {
      id: "outro",
      title: "Outro"
    }
  });

  const handleDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    const newList = [...columnOrder];

    newList.splice(source.index, 1);
    newList.splice(destination.index, 0, draggableId);

    setColumnOrder(newList);
  };

  return (
    <Fragment>
      <h1>Questions</h1>
      <div className="card p-2 shadow flex-row">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable type="COLUMN" droppableId="column" direction="horizontal">
            {provided => (
              <div
                className="d-flex flex-row overflow-auto"
                ref={provided.innerRef}
              >
                {columnOrder.map((col, index) => (
                  <Draggable key={col} draggableId={col} index={index}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="card m-2 p-2"
                      >
                        <div className="card-title">{columns[col].title}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </Fragment>
  );
};

export default TimeLineCard;
