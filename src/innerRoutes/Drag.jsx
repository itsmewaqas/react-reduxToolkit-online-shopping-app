import { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col, Table, Button, ListGroup, Form } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { BiPlayCircle, BiBookAdd, BiStopCircle, BiError, BiErrorCircle, BiArrowToBottom, BiSave, BiGlobe, BiMouse, BiFile, BiGridVertical, BiTrash, BiPencil, BiPlusCircle, BiDuplicate, BiPlus, BiMinus } from "react-icons/bi";

function Drag(props) {

    const [formData, setFormData] = useState(
        [
            {
                id: 0,
                title: 'Invoice Date',
            },
            {
                id: 1,
                title: 'Invoice Description',
            },
            {
                id: 2,
                title: 'Invoice Amount',
            },
            {
                id: 3,
                title: 'Corporate Address City',
            },
            {
                id: 4,
                title: 'Corporate Address Email',
            },
            {
                id: 5,
                title: 'Invoice Number',
            },
            {
                id: 6,
                title: 'Addtional Details 2',
            },
        ]);


    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const newBox = Array.from(formData);
        const [draggedItem] = newBox.splice(result.source.index, 1);
        newBox.splice(result.destination.index, 0, draggedItem);
        setFormData(newBox);
        console.log(newBox)
    }

    const removeDraggablePanel = (index) => {
        const newList = [...formData];
        newList.splice(index, 1);
        setFormData([...newList]);
        console.log(newList);
    }

    return (
        <div>

            <Row>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="boxes">

                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {formData.map((item, index) =>
                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef}  {...provided.draggableProps}>
                                                <div className={`draggableBox2 clearfix`}>
                                                    <div className='draggableBox2Header clearfix'>
                                                        <h1><span>No:{item.id}</span> {item.title}</h1>

                                                        <a {...provided.dragHandleProps} style={{ cursor: 'grab' }}><BiGridVertical size={18} /></a>
                                                        <a onClick={() => removeDraggablePanel(index)}><BiTrash color='red' size={18} /></a>

                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Row>
        </div>
    );
}

export default Drag;