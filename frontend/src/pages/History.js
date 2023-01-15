import {React, useEffect} from 'react';
import {Table, Container, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {loadRecords, deleteRecord, deleteRecords} from '../redux/actions';
import * as Icon from 'react-bootstrap-icons';

function History () {
    const dispatch = useDispatch();
    const {records} = useSelector( state => state.data);
    useEffect(() => {
        dispatch(loadRecords());
    }, []);

    const handleDelete = (id) => {
        if(window.confirm("Are you sure that you want to delete this record ?")){
          dispatch(deleteRecord(id));
        }
      }
    const handleDeleteAll = () => {
        if(window.confirm("Are you sure that you want to clear your history ?")){
          dispatch(deleteRecords());
        }
      }
    return (
        <>
            <Container style={{marginTop: "70px"}}>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Poids</th>
                            <th>Debit</th>
                            <th>Coordinates</th>
                            <th>Creation Date</th>
                        </tr>
                    </thead>
                    {records && records.map((item, index) => (
                        <tbody key={index}>
                            <tr>
                                <td>{index+1}</td>
                                <td>{item.properties.Poids}</td>
                                <td>{item.properties.Debit}</td>
                                <td>{item.geometry.coordinates}</td>
                                <td>{item.properties.Date_created}</td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}><Icon.Trash /> </Button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                    
                </Table>
                <div className="centerButton">
                    <Button variant="danger"
                        onClick={() => handleDeleteAll()}
                        style={{ marginBottom: "20px"}}
                    >
                        Clear History
                    </Button>
                </div>
            </Container>
        </>
    );
}

export default History;

