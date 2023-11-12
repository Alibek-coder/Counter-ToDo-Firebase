import { useEffect } from "react"
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setText, setToDo, getToDo, rmvToDo } from "../../Redux/todo.slice";
import './ToDo.css'
import { Loader } from "../Loader/Loader";

export const ToDo = () => {
    const { text, data, loading, state, error } = useSelector((store: RootState) => store.todo)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getToDo());
    }, [state]);


    const saveTask = async () => {
        if (text.trim() !== "") {
            dispatch(setToDo({text}));
        }        
        dispatch(setText(""))
    }

    const deleteTask = (id:string) => {
        dispatch(rmvToDo(id));
    }

    return (
        <>            
            <div>{loading ? <Loader/> : null}</div>
            {error ? <div className="error">Error 404</div> : null}
            <div className="newTask">
                <h3>New Task</h3>                
                <input value={text} onChange={(e) => dispatch(setText(e.target.value))}></input><button className="save" onClick={saveTask}>+</button>
                <div></div>                
            </div>
            <div className="allTasks">
                <h3>All Tasks</h3>
                {data.map((item: any) => (<div key={item.id} className="itemBlock"><div className="text">{item.text}</div><button className="delete" onClick={() => deleteTask(item.id)}></button></div>))}
            </div>
        </>
    )
}

